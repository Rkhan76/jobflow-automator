export const calculateResumeScore = (userProfile, job) => {
  const resumeText = userProfile.resume?.parsedText?.toLowerCase() || ''

  const jobSkills = job.requiredSkills?.map((s) => s.toLowerCase()) || []

  if (!resumeText || !jobSkills.length) return 0

  const matches = jobSkills.filter((skill) => resumeText.includes(skill))

  return Math.min(10, matches.length * 2)
}
