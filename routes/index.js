import express from 'express'
import authRoutes from '../modules/auth/routes/auth.routes.js'
import userRoutes from '../modules/users/routes/user.routes.js'


const router = express.Router()

// Mount feature routes
router.use('/auth', authRoutes)

// Routes for users
router.use('/users', userRoutes)

// future routes example
// router.use("/jobs", jobRoutes);
// router.use("/applications", applicationRoutes);

export default router
