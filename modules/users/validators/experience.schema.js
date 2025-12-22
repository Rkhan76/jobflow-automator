import { z } from 'zod'

/**
 * =========================
 * BASE EXPERIENCE FIELDS
 * (shared shape only)
 * =========================
 */
const baseExperienceSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, 'Company name cannot be empty')
    .max(100, 'Company name is too long'),

  role: z
    .string()
    .trim()
    .min(1, 'Role cannot be empty')
    .max(100, 'Role is too long'),

  startDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),

  endDate: z
    .string()
    .or(z.date())
    .transform((val) => (val ? new Date(val) : undefined))
    .optional(),

  isCurrent: z.boolean().optional(),

  description: z.string().trim().max(1000, 'Description too long').optional(),
})

/**
 * =========================
 * CREATE EXPERIENCE
 * POST /users/me/experience
 * =========================
 * Payload is COMPLETE → strict rules apply
 */
export const createExperienceSchema = baseExperienceSchema
  .strict()
  .refine((data) => (data.isCurrent ? !data.endDate : true), {
    message: 'endDate must not be provided if isCurrent is true',
    path: ['endDate'],
  })
  .refine((data) => (!data.isCurrent ? !!data.endDate : true), {
    message: 'endDate is required if isCurrent is false',
    path: ['endDate'],
  })
  .refine((data) => (!data.endDate ? true : data.endDate >= data.startDate), {
    message: 'endDate cannot be before startDate',
    path: ['endDate'],
  })

/**
 * =========================
 * UPDATE EXPERIENCE
 * PUT /users/me/experience/:experienceId
 * =========================
 * Payload is PARTIAL → do NOT assume missing fields
 */
export const updateExperienceSchema = baseExperienceSchema
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  })
