import fs from 'fs'

export const parseResumeText = async (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch {
    return ''
  }
}
