import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { Form, FormItem } from './Form'

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

describe('Form', () => {
  it('renders children', () => {
    render(<Form><div>form content</div></Form>)
    expect(screen.getByText('form content')).toBeInTheDocument()
  })

  it('renders a form element', () => {
    const { container } = render(<Form name="test-form"><div /></Form>)
    expect(container.querySelector('form')).toBeInTheDocument()
  })

  it('exposes useForm static method', () => {
    expect(typeof Form.useForm).toBe('function')
  })
})

describe('FormItem', () => {
  it('renders label text', () => {
    render(
      <Form>
        <FormItem label="Username" name="username">
          <input />
        </FormItem>
      </Form>,
    )
    expect(screen.getByText('Username')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <Form>
        <FormItem name="field">
          <input placeholder="field input" />
        </FormItem>
      </Form>,
    )
    expect(screen.getByPlaceholderText('field input')).toBeInTheDocument()
  })

  it('renders required marker when required', () => {
    render(
      <Form>
        <FormItem label="Email" name="email" required>
          <input />
        </FormItem>
      </Form>,
    )
    expect(screen.getByText('Email')).toBeInTheDocument()
  })
})
