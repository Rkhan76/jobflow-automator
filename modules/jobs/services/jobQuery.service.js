import Job from '../models/job.model.js'
import UserProfile from '../../users/models/userProfile.model.js'
import { calculateMatchScore } from '../../ai/services/score.service.js'

export const fetchJobsForUser = async (userId, filters) => {
  const profile = await UserProfile.findOne({ userId })

  const query = {
    status: 'open',
    isActive: true,
    visibility: 'public',
  }

  // 🔍 Filters
  if (filters.remote === 'true') {
    query['location.isRemote'] = true
  }

  if (filters.country) {
    query['location.country'] = {
      $in: [filters.country, 'Worldwide'],
    }
  }

  if (filters.jobType) {
    query.jobType = filters.jobType
  }

  const jobs = await Job.find(query).sort({ createdAt: -1 }).limit(50).lean()

  // 🧠 AI MATCH SCORE (rule-based)
  if (profile) {
    return jobs.map((job) => ({
      ...job,
      aiMatchScore: calculateMatchScore(profile, job),
    }))
  }

  return jobs
}
