import express from 'express'
import authRoutes from '../modules/auth/routes/auth.routes.js'
import userRoutes from '../modules/users/routes/user.routes.js'
import resumeRoutes from '../modules/resume/routes/resume.routes.js'
import jobRoutes from '../modules/jobs/routes/job.routes.js'

const router = express.Router()

// Mount feature routes
router.use('/auth', authRoutes)

// Routes for users
router.use('/users', userRoutes)

router.use('/jobs', jobRoutes)

router.use('/resume', resumeRoutes)


export default router
