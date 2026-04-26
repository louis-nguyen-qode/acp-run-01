import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SignOutButton } from './SignOutButton'

vi.mock('./actions', () => ({
  signOutAction: vi.fn(),
}))

describe('SignOutButton', () => {
  it('renders a sign-out button', () => {
    render(<SignOutButton />)
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument()
  })

  it('button has type submit', () => {
    render(<SignOutButton />)
    expect(screen.getByRole('button', { name: /sign out/i })).toHaveAttribute('type', 'submit')
  })

  it('renders within a form element', () => {
    const { container } = render(<SignOutButton />)
    expect(container.querySelector('form')).toBeInTheDocument()
  })
})
