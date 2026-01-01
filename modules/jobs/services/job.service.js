import Job from '../models/job.model.js'

export const incrementApplicationCount = async (jobId) => {
  await Job.findByIdAndUpdate(jobId, {
    $inc: { totalApplications: 1 },
  })
}
