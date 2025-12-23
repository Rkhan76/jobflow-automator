import axios from 'axios'

const REMOTIVE_API = 'https://remotive.com/api/remote-jobs'

export const fetchRemotiveJobs = async () => {
  const res = await axios.get(REMOTIVE_API)
  return res.data.jobs || []
}
