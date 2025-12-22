import jwt from 'jsonwebtoken'
import User from '../../users/models/user.model.js'

export const authMiddleware = async (req, res, next) => {

  try {
    let token

    // 🌐 Browser: token from cookie
    if (req.cookies?.access_token) {
      token = req.cookies.access_token
    }

    // 📱 Mobile: token from Authorization header
    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    // ❌ No token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    // 🔐 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)


    // 🔍 Optional: fetch user (recommended)
    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      })
    }

    // ✅ Attach user to request
    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    })
  }
}
