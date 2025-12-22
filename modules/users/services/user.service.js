import User from '../models/user.model.js'
import UserProfile from '../models/userProfile.model.js'
import mongoose from 'mongoose'

/**
 * =========================
 * HELPERS
 * =========================
 */

const ensureUserProfileExists = async (userId) => {
  let profile = await UserProfile.findOne({ userId })

  if (!profile) {
    profile = await UserProfile.create({ userId })
  }

  return profile
}

/**
 * =========================
 * PROFILE
 * =========================
 */

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password').lean()

  if (!user) {
    throw new Error('User not found')
  }

  const profile = await UserProfile.findOne({ userId }).lean()

  return {
    ...user,
    profile: profile || null,
  }
}

export const updateUserProfile = async (userId, payload) => {
  await ensureUserProfileExists(userId)

  const updatedProfile = await UserProfile.findOneAndUpdate(
    { userId },
    { $set: payload },
    { new: true }
  )

  return updatedProfile
}

/**
 * =========================
 * PREFERENCES
 * =========================
 */

export const getUserPreferences = async (userId) => {
  const profile = await ensureUserProfileExists(userId)

  return profile.preferences || {}
}

export const updateUserPreferences = async (userId, preferences) => {
  const profile = await ensureUserProfileExists(userId)

  profile.preferences = {
    ...profile.preferences,
    ...preferences,
  }

  await profile.save()

  return profile.preferences
}

/**
 * =========================
 * SKILLS
 * =========================
 */

export const addSkill = async (userId, skill) => {
  const profile = await ensureUserProfileExists(userId)

  const exists = profile.skills.find(
    (s) => s.name.toLowerCase() === skill.name.toLowerCase()
  )

  if (exists) {
    throw new Error('Skill already exists')
  }

  profile.skills.push(skill)
  await profile.save()

  return profile.skills
}

export const addSkillsBulk = async (userId, skills) => {
  const profile = await ensureUserProfileExists(userId)

  // Existing skill names (case-insensitive)
  const existingSkillNames = new Set(
    profile.skills.map((s) => s.name.toLowerCase())
  )

  // Remove duplicates from incoming request
  const uniqueSkills = []
  const seen = new Set()

  for (const skill of skills) {
    const name = skill.name.toLowerCase()

    if (existingSkillNames.has(name)) continue
    if (seen.has(name)) continue

    seen.add(name)
    uniqueSkills.push(skill)
  }

  if (uniqueSkills.length === 0) {
    throw new Error('All skills already exist')
  }

  profile.skills.push(...uniqueSkills)
  await profile.save()

  return profile.skills
}


export const removeSkill = async (userId, skillId) => {
  const profile = await ensureUserProfileExists(userId)

  profile.skills = profile.skills.filter(
    (skill) => skill._id.toString() !== skillId
  )

  await profile.save()

  return profile.skills
}

export const deleteSkillsBulk = async (userId, skillIds) => {
  
  const profile = await ensureUserProfileExists(userId)

  const initialCount = profile.skills.length

  profile.skills = profile.skills.filter(
    (skill) => !skillIds.includes(skill._id.toString())
  )

  if (profile.skills.length === initialCount) {
    throw new Error('No matching skills found')
  }

  await profile.save()

  return profile.skills
}


/**
 * =========================
 * EXPERIENCE
 * =========================
 */

export const addExperience = async (userId, experience) => {
  const profile = await ensureUserProfileExists(userId)

  // ✅ Ensure only ONE current experience
  if (experience.isCurrent) {
    profile.experience.forEach((exp) => {
      exp.isCurrent = false
      exp.endDate = exp.endDate || new Date()
    })
  }

  profile.experience.push(experience)
  await profile.save()

  return profile.experience
}


export const updateExperience = async (userId, experienceId, payload) => {
  const profile = await ensureUserProfileExists(userId)

  const exp = profile.experience.id(experienceId)
  if (!exp) throw new Error('Experience not found')

  // Merge existing + payload
  const merged = {
    isCurrent: exp.isCurrent,
    startDate: exp.startDate,
    endDate: exp.endDate,
    ...payload,
  }

  // 🔴 BUSINESS RULES (MERGED STATE)
  if (merged.isCurrent && merged.endDate) {
    throw new Error('endDate must not exist for current experience')
  }

  if (!merged.isCurrent && !merged.endDate) {
    throw new Error('endDate is required for non-current experience')
  }

  if (merged.endDate && merged.endDate < merged.startDate) {
    throw new Error('endDate cannot be before startDate')
  }

  // Ensure only one current job
  if (payload.isCurrent === true) {
    profile.experience.forEach((e) => {
      if (e._id.toString() !== experienceId) {
        e.isCurrent = false
        e.endDate = e.endDate || new Date()
      }
    })
  }

  Object.assign(exp, payload)
  await profile.save()

  return profile.experience
}



export const deleteExperience = async (userId, experienceId) => {
  const profile = await ensureUserProfileExists(userId)

  profile.experience = profile.experience.filter(
    (exp) => exp._id.toString() !== experienceId
  )

  await profile.save()

  return profile.experience
}

/**
 * =========================
 * DASHBOARD
 * =========================
 */

export const getDashboardData = async (userId) => {
  const profile = await ensureUserProfileExists(userId)

  // Placeholder – will be replaced by jobs & AI modules
  return {
    profileCompletion: calculateProfileCompletion(profile),
    skillsCount: profile.skills.length,
    experienceCount: profile.experience.length,
    preferences: profile.preferences,
    recommendedJobs: [], // from jobs module
    appliedJobs: [], // from applications module
  }
}

/**
 * =========================
 * UTILS
 * =========================
 */

const calculateProfileCompletion = (profile) => {
  let score = 0
  const total = 5

  if (profile.headline) score++
  if (profile.skills.length > 0) score++
  if (profile.experience.length > 0) score++
  if (profile.preferences?.jobType?.length) score++
  if (profile.resume?.originalUrl) score++

  return Math.round((score / total) * 100)
}
