import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import type * as ReactDOM from 'react-dom'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { RegisterForm } from './RegisterForm'

const { mockUseFormState } = vi.hoisted(() => ({
  mockUseFormState: vi.fn(),
}))

vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof ReactDOM>()
  return { ...actual, useFormState: mockUseFormState }
})

vi.mock('./actions', () => ({
  registerAction: vi.fn(),
}))

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

describe('RegisterForm', () => {
  beforeEach(() => {
    mockUseFormState.mockReturnValue([{}, vi.fn()])
  })

  it('renders email input', () => {
    render(<RegisterForm />)
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
  })

  it('renders password input', () => {
    render(<RegisterForm />)
    expect(screen.getByPlaceholderText('At least 8 characters')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<RegisterForm />)
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('renders sign in link', () => {
    render(<RegisterForm />)
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
  })

  it('renders email and password labels', () => {
    render(<RegisterForm />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
  })

  it('shows error alert when state contains an error', () => {
    mockUseFormState.mockReturnValue([{ error: 'Email already registered' }, vi.fn()])
    render(<RegisterForm />)
    expect(screen.getByText('Email already registered')).toBeInTheDocument()
  })

  it('does not show error alert when state has no error', () => {
    mockUseFormState.mockReturnValue([{}, vi.fn()])
    render(<RegisterForm />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('calls formAction when form is submitted with valid data', async () => {
    const mockDispatch = vi.fn()
    mockUseFormState.mockReturnValue([{}, mockDispatch])
    render(<RegisterForm />)
    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com')
    await userEvent.type(screen.getByPlaceholderText('At least 8 characters'), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /create account/i }))
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1))
  })
})
