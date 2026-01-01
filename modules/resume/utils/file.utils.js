export const isValidResumeType = (file) => {
  const allowed = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]

  return allowed.includes(file.mimetype)
}
