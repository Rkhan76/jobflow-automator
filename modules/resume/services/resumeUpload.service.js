import fs from 'fs'
import path from 'path'
import { parseResumeText } from './resumeParser.service.js'
import UserProfile from '../../users/models/userProfile.model.js'

export const handleResumeUpload = async (userId, file) => {
  const profile =
    (await UserProfile.findOne({ userId })) ||
    (await UserProfile.create({ userId }))

  const filePath = path.resolve(file.path)

  const parsedText = await parseResumeText(filePath)

  profile.resume = {
    originalUrl: `/uploads/${file.filename}`,
    parsedText,
    lastUpdated: new Date(),
  }

  await profile.save()

  return profile.resume
}
