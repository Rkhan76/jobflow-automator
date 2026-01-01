export const calculateSkillScore = (userProfile, job) => {
  const userSkills = userProfile.skills?.map((s) => s.name.toLowerCase()) || []

  const jobSkills = job.requiredSkills?.map((s) => s.toLowerCase()) || []

  if (!jobSkills.length) return 0

  const matched = jobSkills.filter((skill) => userSkills.includes(skill))

  return (matched.length / jobSkills.length) * 40
}
