import express from 'express'
import authRoutes from '../auth/routes/auth.routes.js'


const router = express.Router()

// Mount feature routes
router.use('/auth', authRoutes)

// future routes example
// router.use("/jobs", jobRoutes);
// router.use("/applications", applicationRoutes);

export default router
