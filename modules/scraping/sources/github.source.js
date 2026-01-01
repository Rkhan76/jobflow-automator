import axios from 'axios'

// Community mirror of GitHub Jobs
const GITHUB_JOBS_API =
  'https://remoteok.com/api'

export const fetchGithubJobs = async () => {
  try {
    const res = await axios.get(GITHUB_JOBS_API, {
      headers: {
        'User-Agent': 'JobFlow-Aggregator',
      },
    })

    return res.data || []
  } catch (error) {
    console.error('GitHub jobs fetch failed:', error.message)
    return []
  }
}
