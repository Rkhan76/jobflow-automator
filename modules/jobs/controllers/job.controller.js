import { fetchJobsForUser } from '../services/jobQuery.service.js'

export const getJobs = async (req, res, next) => {
  try {
    const userId = req.user.id
    const filters = req.query

    const jobs = await fetchJobsForUser(userId, filters)

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    })
  } catch (error) {
    next(error)
  }
}
