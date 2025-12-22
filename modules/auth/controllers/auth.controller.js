import User from '../../users/models/user.model.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/token.js'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import axios from "axios";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

/* =========================
   Register (Email + Password)
========================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      authProvider: 'local',
    })

    res.status(201).json({
      token: generateToken(user._id),
      user,
    })
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' })
  }
}

/* =========================
   Login (Email + Password)
========================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({
      email,
      authProvider: 'local',
    })

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user._id)


    // Detect client type
    const isMobileClient = req.headers['x-client-type'] === 'mobile'

    // 🌐 Browser → send cookie
   res.cookie('access_token', token, {
     httpOnly: true,
     secure: false, // http
     sameSite: 'lax',
     maxAge: 7 * 24 * 60 * 60 * 1000,
   })


    // 📱 Mobile → send token in response
    res.status(200).json({
      success: true,
      token: isMobileClient ? token : undefined,
      user,
    })
  } catch (error) {
    res.status(500).json({ message: 'Login failed' })
  }
}

/* =========================
   Google Auth
========================= */
/* =========================
   Google Auth (Browser + Mobile)
========================= */
export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body // Google ID token from frontend

    // ✅ Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { email, name, picture, sub: googleId } = payload

    // 🔍 Check if user exists
    let user = await User.findOne({ email })

    // 🆕 Signup if not exists
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture,
        authProvider: 'google',
      })
    }

    // 🔐 Generate JWT
    const jwtToken = generateToken(user._id)

    // Detect client type
    const isMobileClient = req.headers['x-client-type'] === 'mobile'

    // 🌐 Browser → set httpOnly cookie
    if (!isMobileClient) {
      res.cookie('access_token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
    }

    // 📱 Mobile → return token in response
    res.status(200).json({
      success: true,
      token: isMobileClient ? jwtToken : undefined,
      user,
    })
  } catch (err) {
    res.status(401).json({ message: 'Google authentication failed' })
  }
}

/* =========================
   GitHub Auth
========================= */

export const githubAuth = async (req, res) => {
  try {
  

    const { code } = req.body;
  

    if (!code) {
      return res
        .status(400)
        .json({ message: "GitHub authorization code required" });
    }

    /* --------------------------------------------------
       1️⃣ Exchange CODE → ACCESS TOKEN (SECURE)
    -------------------------------------------------- */
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return res
        .status(400)
        .json({ message: "Failed to obtain GitHub access token" });
    }

    /* --------------------------------------------------
       2️⃣ Fetch GitHub USER PROFILE
    -------------------------------------------------- */
    const githubUserResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const {
      id: githubId,
      name,
      avatar_url: avatar,
      email,
    } = githubUserResponse.data;

    /* --------------------------------------------------
       3️⃣ Fetch EMAIL if not public
    -------------------------------------------------- */
    let userEmail = email;

    if (!userEmail) {
      const emailResponse = await axios.get(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/vnd.github+json",
          },
        }
      );

      const primaryEmail = emailResponse.data.find(
        (e) => e.primary && e.verified
      );

      userEmail = primaryEmail?.email;
    }

    if (!userEmail) {
      return res
        .status(400)
        .json({ message: "GitHub email not found or not verified" });
    }

    /* --------------------------------------------------
       4️⃣ CREATE or LINK USER
    -------------------------------------------------- */
    let user = await User.findOne({ email: userEmail });

    if (!user) {
      user = await User.create({
        name: name || "GitHub User",
        email: userEmail,
        avatar,
        githubId,
        authProvider: "github",
      });
    } else if (!user.githubId) {
      user.githubId = githubId;
      await user.save();
    }

    /* --------------------------------------------------
       5️⃣ Generate JWT
    -------------------------------------------------- */
    const jwtToken = generateToken(user._id);

    const isMobileClient = req.headers["x-client-type"] === "mobile";

    // 🌐 Web → httpOnly cookie
    if (!isMobileClient) {
      res.cookie("access_token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    // 📱 Mobile → token in response
    res.status(200).json({
      success: true,
      token: isMobileClient ? jwtToken : undefined,
      user,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "GitHub authentication failed" });
  }
};


/* =========================
   Get Current User
========================= */
export const getCurrentUser = async (req, res) => {
  res.json(req.user)
}
