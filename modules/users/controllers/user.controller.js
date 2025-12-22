import * as userService from '../services/user.service.js'

/**
 * =========================
 * PROFILE
 * =========================
 */

// GET /users/me
export const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id

    const userWithProfile = await userService.getUserById(userId)

    return res.status(200).json({
      success: true,
      data: userWithProfile,
    })
  } catch (error) {
    next(error)
  }
}

// PUT /users/me
export const updateMyProfile = async (req, res, next) => {
  try {
    const { headline, location } = req.body
    const { _id: userId} = req.user
    

    const payload = {
      ...(headline && { headline }),
      ...(location && { location }),
    }

    const updatedProfile = await userService.updateUserProfile(userId, payload)

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * =========================
 * PREFERENCES
 * =========================
 */

// GET /users/me/preferences
export const getPreferences = async (req, res, next) => {
  try {
    const userId = req.user.id

    const preferences = await userService.getUserPreferences(userId)

    return res.status(200).json({
      success: true,
      data: preferences,
    })
  } catch (error) {
    next(error)
  }
}

// PUT /users/me/preferences
export const updatePreferences = async (req, res, next) => {
  try {
    const userId = req.user.id

    const updatedPreferences = await userService.updateUserPreferences(
      userId,
      req.body
    )

    res.status(200).json({
      success: true,
      message: 'Preferences updated successfully',
      data: updatedPreferences,
    })
  } catch (error) {
    next(error)
  }
}


/**
 * =========================
 * SKILLS
 * =========================
 */

// POST /users/me/skills
export const addSkill = async (req, res, next) => {
  try {
    const userId = req.user.id

    const skills = await userService.addSkill(userId, req.body)

    res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      data: skills,
    })
  } catch (error) {
    next(error)
  }
}


// DELETE /users/me/skills/:skillId
export const removeSkill = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { skillId } = req.params

    const skills = await userService.removeSkill(userId, skillId)

    return res.status(200).json({
      success: true,
      message: 'Skill removed successfully',
      data: skills,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * =========================
 * EXPERIENCE
 * =========================
 */

// POST /users/me/experience
export const addExperience = async (req, res, next) => {
  try {
    const userId = req.user.id
    const experience = req.body

    const experiences = await userService.addExperience(userId, experience)

    return res.status(201).json({
      success: true,
      message: 'Experience added successfully',
      data: experiences,
    })
  } catch (error) {
    next(error)
  }
}

// PUT /users/me/experience/:experienceId
export const updateExperience = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { experienceId } = req.params
    const payload = req.body

    const experiences = await userService.updateExperience(
      userId,
      experienceId,
      payload
    )

    return res.status(200).json({
      success: true,
      message: 'Experience updated successfully',
      data: experiences,
    })
  } catch (error) {
    next(error)
  }
}

// DELETE /users/me/experience/:experienceId
export const deleteExperience = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { experienceId } = req.params

    const experiences = await userService.deleteExperience(userId, experienceId)

    return res.status(200).json({
      success: true,
      message: 'Experience deleted successfully',
      data: experiences,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * =========================
 * DASHBOARD
 * =========================
 */

// GET /users/me/dashboard
export const getUserDashboardData = async (req, res, next) => {
  try {
    const userId = req.user.id

    const dashboardData = await userService.getDashboardData(userId)

    return res.status(200).json({
      success: true,
      data: dashboardData,
    })
  } catch (error) {
    next(error)
  }
}
