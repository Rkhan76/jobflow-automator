import { fetchRemotiveJobs } from '../sources/remotive.source.js'
import { fetchGithubJobs } from '../sources/github.source.js'
import { fetchWeWorkRemotelyJobs } from '../sources/weworkremotely.source.js'

import {
  normalizeRemotiveJob,
  normalizeGithubJob,
  normalizeWeWorkRemotelyJob,
} from '../normalizers/job.normalizer.js'

import { saveJobs } from './saveJobs.service.js'

export const fetchAndSaveAllJobs = async () => {
  console.log('🔄 Fetching jobs from all sources...')

  // 1️⃣ Remotive
  const remotiveRaw = await fetchRemotiveJobs()
  const remotiveJobs = remotiveRaw.map(normalizeRemotiveJob)

  // 2️⃣ GitHub
  const githubRaw = await fetchGithubJobs()
  const githubJobs = githubRaw.map(normalizeGithubJob)

  // 3️⃣ We Work Remotely
  const wwrRaw = await fetchWeWorkRemotelyJobs()
  const wwrJobs = wwrRaw.map(normalizeWeWorkRemotelyJob)

  const allJobs = [...remotiveJobs, ...wwrJobs]

  await saveJobs(allJobs)
}

