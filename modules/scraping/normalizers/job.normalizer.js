import { generateJobHash } from '../services/hash.service.js'

const JOB_TYPE_MAP = {
  full_time: 'full-time',
  part_time: 'part-time',
  contract: 'contract',
  internship: 'internship',
  freelance: 'contract',
}

export const normalizeRemotiveJob = (raw) => {
  const isEmailApply = raw.url?.startsWith('mailto:')

  const jobType = JOB_TYPE_MAP[raw.job_type] || 'full-time'

  const job = {
    title: raw.title,
    description: raw.description,
    company: {
      name: raw.company_name,
      website: raw.company_website,
      logo: raw.company_logo,
    },
    jobType,
    location: {
      country: raw.candidate_required_location || 'Worldwide',
      isRemote: true,
    },
    requiredSkills: raw.tags || [],
    application: {
      method: isEmailApply ? 'email' : 'external-link',
      applyEmail: isEmailApply ? raw.url.replace('mailto:', '') : undefined,
      applyUrl: !isEmailApply ? raw.url : undefined,
    },
    source: 'api',
    sourcePostUrl: raw.url,
    scrapedAt: new Date(),
  }

  job.hash = generateJobHash(job)

  return job
}
