import { z } from 'zod'

export const schemaTranslateNovel = z.object({
  content: z.string().min(1, { message: 'Content is required' }),
  context: z.string().optional(),
  toLanguage: z.enum(['English', 'Vietnamese', 'Japanese'])
})
