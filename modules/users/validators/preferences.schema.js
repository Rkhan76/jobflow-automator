import { z } from 'zod'

export const updatePreferencesSchema = z
  .object({
    jobType: z
      .array(z.enum(['full-time', 'part-time', 'internship', 'contract']))
      .optional(),

    locations: z.array(z.string()).optional(),

    remoteOnly: z.boolean().optional(),

    salaryRange: z
      .object({
        min: z.number().min(0),
        max: z.number().min(0),
      })
      .refine((data) => data.min <= data.max, {
        message: 'salaryRange min cannot be greater than max',
      })
      .optional(),
  })
  .strict() // 🚫 rejects unknown fields
