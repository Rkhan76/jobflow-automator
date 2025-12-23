import { fetchRemotiveJobs } from '../sources/remotive.source.js'
import { normalizeRemotiveJob } from '../normalizers/job.normalizer.js'
import { saveJobs } from './saveJobs.service.js'

export const fetchAndSaveRemotiveJobs = async () => {
  console.log('🔄 Fetching Remotive jobs...')

  const rawJobs = await fetchRemotiveJobs()
  const normalizedJobs = rawJobs.map(normalizeRemotiveJob)

  await saveJobs(normalizedJobs)
}

