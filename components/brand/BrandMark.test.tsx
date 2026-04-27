import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { tokens } from '@/theme/tokens'

import { BrandMark } from './BrandMark'

describe('BrandMark', () => {
  it('renders the app name', () => {
    render(<BrandMark />)
    expect(screen.getByText('qode.world')).toBeInTheDocument()
  })

  it('applies sm font size', () => {
    render(<BrandMark size="sm" />)
    const el = screen.getByText('qode.world')
    expect(el).toHaveStyle({ fontSize: `${tokens.fontSize.xl}px` })
  })

  it('applies md font size by default', () => {
    render(<BrandMark />)
    const el = screen.getByText('qode.world')
    expect(el).toHaveStyle({ fontSize: `${tokens.fontSize.xxl}px` })
  })

  it('applies lg font size', () => {
    render(<BrandMark size="lg" />)
    const el = screen.getByText('qode.world')
    expect(el).toHaveStyle({ fontSize: `${tokens.fontSize.display}px` })
  })

  it('applies the brand font', () => {
    render(<BrandMark />)
    expect(screen.getByText('qode.world')).toHaveStyle({
      fontFamily: tokens.typography.brandFont,
    })
  })

  it('applies brandBlack color', () => {
    render(<BrandMark />)
    expect(screen.getByText('qode.world')).toHaveStyle({
      color: tokens.colors.brandBlack,
    })
  })

  it('forwards className', () => {
    render(<BrandMark className="custom-class" />)
    expect(screen.getByText('qode.world')).toHaveClass('custom-class')
  })
})
