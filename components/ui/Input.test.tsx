import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Input, PasswordInput } from './Input'

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('calls onChange when typing', async () => {
    const onChange = vi.fn()
    render(<Input onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'hello')
    expect(onChange).toHaveBeenCalled()
  })

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('renders with prefix', () => {
    render(<Input prefix="@" placeholder="Username" />)
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
  })
})

describe('PasswordInput', () => {
  it('renders with placeholder', () => {
    render(<PasswordInput placeholder="Enter password" />)
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument()
  })

  it('renders as password type', () => {
    const { container } = render(<PasswordInput placeholder="secret" />)
    expect(container.querySelector('input[type="password"]')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is set', () => {
    const { container } = render(<PasswordInput disabled placeholder="secret" />)
    expect(container.querySelector('input')).toBeDisabled()
  })
})
