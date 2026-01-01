import { Router } from 'express'
import { uploadResume, getMyResume } from '../controllers/resume.controller.js'
import { authMiddleware } from '../../auth/middlewares/auth.middleware.js'
import multer from 'multer'

const router = Router()

const upload = multer({ dest: 'uploads/' })

router.post('/me', authMiddleware, upload.single('resume'), uploadResume)

router.get('/me', authMiddleware, getMyResume)

export default router
