import Job from '../../jobs/models/job.model.js'

export const saveJobs = async (jobs) => {
  let saved = 0

  for (const job of jobs) {
    try {
      await Job.create(job)
      saved++
    } catch (err) {
      // Duplicate job (hash unique)
      if (err.code !== 11000) {
        console.error('Job save error:', err.message)
      }
    }
  }

  console.log(`✅ Saved ${saved} new jobs`)
}
