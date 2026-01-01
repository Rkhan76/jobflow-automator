import { handleResumeUpload } from '../services/resumeUpload.service.js'
import UserProfile from '../../users/models/userProfile.model.js'

export const uploadResume = async (req, res, next) => {
  try {
    const userId = req.user.id
    const file = req.file

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required',
      })
    }

    const resume = await handleResumeUpload(userId, file)

    res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully',
      data: resume,
    })
  } catch (err) {
    next(err)
  }
}

export const getMyResume = async (req, res, next) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user.id })

    res.json({
      success: true,
      data: profile?.resume || null,
    })
  } catch (err) {
    next(err)
  }
}
