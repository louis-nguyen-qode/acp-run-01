'use server'

/**
 * Reference: Server Action for form submission.
 * Returns { error: string } on failure, { data: T } on success.
 * Never throws — caller checks the return value.
 */

import { z } from 'zod'

const CreateItemSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(1, 'Description is required'),
})

type CreateItemInput = z.infer<typeof CreateItemSchema>

type ActionResult<T> =
  | { data: T; error?: never }
  | { data?: never; error: string }

export async function createItemAction(input: CreateItemInput): Promise<ActionResult<{ id: string }>> {
  const parsed = CreateItemSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Validation failed' }
  }

  try {
    // Replace with actual Prisma call:
    // const item = await prisma.item.create({ data: parsed.data })
    // return { data: { id: item.id } }

    // Stub:
    return { data: { id: crypto.randomUUID() } }
  } catch (err) {
    console.error('createItemAction failed:', err)
    return { error: 'Failed to create item. Please try again.' }
  }
}
