import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    // Common profile fields
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    avatar: {
      type: String,
    },

    resumeUrl: {
      type: String,
    },

    // Authentication provider info
    authProvider: {
      type: String,
      enum: ['local', 'google', 'github'],
      required: true,
      default: 'local',
    },

    // Local (email/password) auth
    password: {
      type: String,
      required: function () {
        return this.authProvider === 'local'
      },
    },

    // Google auth data
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // GitHub auth data
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // Account status
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', userSchema)
