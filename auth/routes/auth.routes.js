import express from 'express'
import {
  registerUser,
  loginUser,
  googleAuth,
  githubAuth,
  getCurrentUser,
} from '../controllers/auth.controller.js'
// import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/google', googleAuth)
router.post('/github', githubAuth)
// router.get("/me", protect, getCurrentUser);

export default router
