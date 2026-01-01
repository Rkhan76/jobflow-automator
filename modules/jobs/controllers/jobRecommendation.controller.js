import Job from '../models/job.model.js'
import UserProfile from '../../users/models/userProfile.model.js'
import { recommendJobsForUser } from '../services/jobRecommendation.service.js'

export const getRecommendedJobs = async (req, res, next) => {
  try {
    const userId = req.user.id

    const userProfile = await UserProfile.findOne({ userId })
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found',
      })
    }

    const jobs = await Job.find({
      isActive: true,
      status: 'open',
    }).limit(200)

    const recommendations = recommendJobsForUser(userProfile, jobs)

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations.slice(0, 20), // top 20
    })
  } catch (error) {
    next(error)
  }
}
