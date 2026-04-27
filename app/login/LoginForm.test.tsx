import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import type * as ReactDOM from 'react-dom'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { LoginForm } from './LoginForm'

const { mockUseFormState } = vi.hoisted(() => ({
  mockUseFormState: vi.fn(),
}))

vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof ReactDOM>()
  return { ...actual, useFormState: mockUseFormState }
})

vi.mock('./actions', () => ({
  loginAction: vi.fn(),
}))

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))

vi.mock('@/components/brand/BrandMark', () => ({
  BrandMark: ({ size }: { size?: string }) => (
    <div data-testid="brand-mark" data-size={size}>qode.world</div>
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

describe('LoginForm', () => {
  beforeEach(() => {
    mockUseFormState.mockReturnValue([{}, vi.fn()])
  })

  it('renders the BrandMark with lg size', () => {
    render(<LoginForm registered={false} />)
    const brand = screen.getByTestId('brand-mark')
    expect(brand).toBeInTheDocument()
    expect(brand).toHaveAttribute('data-size', 'lg')
  })

  it('renders email input', () => {
    render(<LoginForm registered={false} />)
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
  })

  it('renders password input', () => {
    render(<LoginForm registered={false} />)
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
  })

  it('renders Log In button', () => {
    render(<LoginForm registered={false} />)
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('renders sign up link', () => {
    render(<LoginForm registered={false} />)
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument()
  })

  it('renders email and password labels', () => {
    render(<LoginForm registered={false} />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
  })

  it('shows registered success banner when registered is true', () => {
    render(<LoginForm registered={true} />)
    expect(screen.getByText('Account created! You can now sign in.')).toBeInTheDocument()
  })

  it('does not show registered banner when registered is false', () => {
    render(<LoginForm registered={false} />)
    expect(screen.queryByText('Account created! You can now sign in.')).not.toBeInTheDocument()
  })

  it('shows error alert when state contains an error', () => {
    mockUseFormState.mockReturnValue([{ error: 'Invalid email or password' }, vi.fn()])
    render(<LoginForm registered={false} />)
    expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
  })

  it('does not show error alert when state has no error', () => {
    mockUseFormState.mockReturnValue([{}, vi.fn()])
    render(<LoginForm registered={false} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('calls formAction when form is submitted with valid data', async () => {
    const mockDispatch = vi.fn()
    mockUseFormState.mockReturnValue([{}, mockDispatch])
    render(<LoginForm registered={false} />)
    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'user@example.com')
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1))
  })
})
