import crypto from 'crypto'

export const generateJobHash = (job) => {
  const raw = `${job.title}-${job.company.name}-${job.application.applyUrl || job.application.applyEmail}`
  return crypto.createHash('sha256').update(raw).digest('hex')
}
