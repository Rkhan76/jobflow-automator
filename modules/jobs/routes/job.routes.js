import { Router } from 'express'
import { getJobs } from '../controllers/job.controller.js'
import { authMiddleware } from '../../auth/middlewares/auth.middleware.js'
import { getRecommendedJobs } from '../controllers/jobRecommendation.controller.js'

const router = Router()

// GET /api/jobs
router.get('/recommended', authMiddleware, getRecommendedJobs)
router.get('/', authMiddleware, getJobs)


export default router
