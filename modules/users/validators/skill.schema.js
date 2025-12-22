import { z } from 'zod'

export const addSkillSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Skill name is required')
      .max(50, 'Skill name is too long'),

    level: z
      .enum(['beginner', 'intermediate', 'advanced'])
      .optional()
      .default('intermediate'),
  })
  .strict()
