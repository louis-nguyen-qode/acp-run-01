import { describe, expect, it } from 'vitest'

import { createItemAction } from './actions'

describe('createItemAction', () => {
  it('returns data on valid input', async () => {
    const result = await createItemAction({ name: 'Test item', description: 'A description' })
    expect(result.error).toBeUndefined()
    expect(result.data?.id).toBeDefined()
  })

  it('returns error when name is too short', async () => {
    const result = await createItemAction({ name: 'A', description: 'desc' })
    expect(result.error).toBeDefined()
    expect(result.data).toBeUndefined()
  })

  it('returns error when description is empty', async () => {
    const result = await createItemAction({ name: 'Valid name', description: '' })
    expect(result.error).toBeDefined()
  })
})
