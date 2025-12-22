import { Router } from 'express'
import {
  getMyProfile,
  updateMyProfile,
  updatePreferences,
  getPreferences,
  addSkill,
  removeSkill,
  addExperience,
  updateExperience,
  deleteExperience,
  getUserDashboardData,
} from '../controllers/user.controller.js'
import { authMiddleware } from '../../auth/middlewares/auth.middleware.js'

// import { authenticate } from '../../auth/middlewares/auth.middleware.js'
// import { validate } from '../middlewares/user.middleware.js'
// import {
//   updateProfileSchema,
//   updatePreferencesSchema,
//   skillSchema,
//   experienceSchema,
// } from '../validators/user.schema.js'

const router = Router()

/**
 * =============================
 * Profile
 * =============================
 */

// Get logged-in user's profile
router.get('/me', authMiddleware, getMyProfile)

// Update profile (name, bio, location, etc.)
router.put('/me',authMiddleware, updateMyProfile)

/**
 * =============================
 * Preferences
 * =============================
 */

// Get user job preferences
// router.get('/me/preferences', authenticate, getPreferences)

// Update job preferences
// router.put(
//   '/me/preferences',
//   authenticate,
//   validate(updatePreferencesSchema),
//   updatePreferences
// )

/**
 * =============================
 * Skills
 * =============================
 */

// Add a skill
// router.post('/me/skills', authenticate, validate(skillSchema), addSkill)

// Remove a skill
// router.delete('/me/skills/:skillId', authenticate, removeSkill)

/**
 * =============================
 * Experience
 * =============================
 */

// Add experience
// router.post(
//   '/me/experience',
//   authenticate,
//   validate(experienceSchema),
//   addExperience
// )

// Update experience
// router.put(
//   '/me/experience/:experienceId',
//   authenticate,
//   validate(experienceSchema),
//   updateExperience
// )

// Delete experience
// router.delete('/me/experience/:experienceId', authenticate, deleteExperience)

/**
 * =============================
 * Dashboard
 * =============================
 */

// User dashboard data (jobs, stats, recommendations)
// router.get('/me/dashboard', authenticate, getUserDashboardData)

export default router
