export const recommendJobsForUser = (userProfile, jobs) => {
  const userSkills = userProfile.skills.map((s) => s.name.toLowerCase())
  const userLocations = userProfile.preferences?.locations || []
  const preferredJobTypes = userProfile.preferences?.jobType || []
  const remotePreferred = userProfile.location?.remotePreference
  const resumeText = userProfile.resume?.parsedText?.toLowerCase() || ''
  const experienceCompanies = userProfile.experience.map((exp) =>
    exp.company.toLowerCase()
  )

  return jobs
    .map((job) => {
      let score = 0

      /* ======================
         JOB TYPE MATCH (20)
         ====================== */
      if (preferredJobTypes.includes(job.jobType)) {
        score += 20
      }

      /* ======================
         LOCATION / REMOTE (20)
         ====================== */
      if (job.location?.isRemote && remotePreferred) {
        score += 20
      } else if (
        job.location?.city &&
        userLocations.includes(job.location.city)
      ) {
        score += 15
      }

      /* ======================
         SKILL MATCH (40)
         ====================== */
      const jobSkills = (job.requiredSkills || []).map((s) => s.toLowerCase())
      const matchedSkills = jobSkills.filter((skill) =>
        userSkills.includes(skill)
      )

      if (jobSkills.length > 0) {
        score += (matchedSkills.length / jobSkills.length) * 40
      }

      /* ======================
         EXPERIENCE MATCH (10)
         ====================== */
      if (
        experienceCompanies.some((company) =>
          job.description.toLowerCase().includes(company)
        )
      ) {
        score += 10
      }

      /* ======================
         RESUME KEYWORDS (10)
         ====================== */
      const resumeMatches = jobSkills.filter((skill) =>
        resumeText.includes(skill)
      )
      score += Math.min(10, resumeMatches.length * 2)

      return {
        job,
        score: Math.round(score),
        matchedSkills,
      }
    })
    .filter((item) => item.score >= 60)
    .sort((a, b) => b.score - a.score)
}
