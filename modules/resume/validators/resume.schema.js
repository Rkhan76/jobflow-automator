import { z } from 'zod'

export const resumeUploadSchema = z.object({
  resume: z.any(),
})
