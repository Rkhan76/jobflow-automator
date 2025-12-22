import { z } from 'zod'

/**
 * Base schema – SINGLE source of truth
 */
export const singleSkillSchema = z
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

/**
 * Single skill add
 * POST /users/me/skills
 */
export const addSkillSchema = singleSkillSchema

/**
 * Bulk skills add
 * POST /users/me/skills/bulk
 */
export const addSkillsBulkSchema = z
  .object({
    skills: z
      .array(singleSkillSchema)
      .min(1, 'At least one skill is required')
      .max(20, 'You can add at most 20 skills at once'),
  })
  .strict()

  export const deleteSkillsBulkSchema = z
    .object({
      skillIds: z
        .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid skill ID'))
        .min(1, 'At least one skill ID is required')
        .max(20, 'You can delete at most 20 skills at once'),
    })
    .strict()
