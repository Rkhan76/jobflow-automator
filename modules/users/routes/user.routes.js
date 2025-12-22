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
import { updatePreferencesSchema } from '../validators/preferences.schema.js'
import { validate } from '../middlewares/validate.middleware.js'
import { addSkillSchema } from '../validators/skill.schema.js'

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
router.get('/me/preferences', authMiddleware, getPreferences)

// Update job preferences
router.put(
  '/me/preferences',
  authMiddleware,
  validate(updatePreferencesSchema),
  updatePreferences
)

/**
 * =============================
 * Skills
 * =============================
 */

// Add a skill
router.post('/me/skills', authMiddleware, validate(addSkillSchema), addSkill)

// Remove a skill
router.delete('/me/skills/:skillId', authMiddleware, removeSkill)

// /users/me/skills/bulk

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
