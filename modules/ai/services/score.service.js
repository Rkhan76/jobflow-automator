import { calculateSkillScore } from './skillMatch.service.js'
import { calculateResumeScore } from './resumeMatch.service.js'

export const calculateMatchScore = ({ userProfile, job }) => {
  let score = 0

  /* ======================
     JOB TYPE (20)
     ====================== */
  if (userProfile.preferences?.jobType?.includes(job.jobType)) {
    score += 20
  }

  /* ======================
     LOCATION / REMOTE (20)
     ====================== */
  if (job.location?.isRemote && userProfile.location?.remotePreference) {
    score += 20
  }

  /* ======================
     SKILLS (40)
     ====================== */
  score += calculateSkillScore(userProfile, job)

  /* ======================
     RESUME MATCH (10)
     ====================== */
  score += calculateResumeScore(userProfile, job)

  /* ======================
     EXPERIENCE BONUS (10)
     ====================== */
  if (
    userProfile.experience?.some((exp) =>
      job.description.toLowerCase().includes(exp.company.toLowerCase())
    )
  ) {
    score += 10
  }

  return Math.min(100, Math.round(score))
}
