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
  addSkillsBulk,
  deleteSkillsBulk,
} from '../controllers/user.controller.js'
import { authMiddleware } from '../../auth/middlewares/auth.middleware.js'
import { updatePreferencesSchema } from '../validators/preferences.schema.js'
import { validate } from '../middlewares/validate.middleware.js'
import {
  addSkillsBulkSchema,
  addSkillSchema,
  deleteSkillsBulkSchema,
} from '../validators/skill.schema.js'



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

// Add multiple skills at once
router.post(
  '/me/skills/bulk',
  authMiddleware,
  validate(addSkillsBulkSchema),
  addSkillsBulk
)

// ✅ BULK DELETE FIRST (STATIC)
router.delete(
  '/me/skills/bulk',
  authMiddleware,
  validate(deleteSkillsBulkSchema),
  deleteSkillsBulk
)

// ❌ SINGLE DELETE AFTER (DYNAMIC)
router.delete(
  '/me/skills/:skillId',
  authMiddleware,
  removeSkill
)



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
