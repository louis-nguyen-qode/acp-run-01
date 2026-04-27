import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Content, Footer, Header, Layout, Sider } from './index'

describe('Layout', () => {
  it('renders children', () => {
    render(<Layout><div>layout content</div></Layout>)
    expect(screen.getByText('layout content')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<Layout className="my-layout"><div>x</div></Layout>)
    expect(container.firstChild).toHaveClass('my-layout')
  })

  it('forwards style', () => {
    const { container } = render(<Layout style={{ minHeight: '100vh' }}><div>x</div></Layout>)
    expect(container.firstChild).toHaveStyle({ minHeight: '100vh' })
  })
})

describe('Header', () => {
  it('renders children', () => {
    render(<Header><span>header text</span></Header>)
    expect(screen.getByText('header text')).toBeInTheDocument()
  })

  it('forwards className', () => {
    render(<Header className="my-header"><span>x</span></Header>)
    expect(document.querySelector('.my-header')).toBeInTheDocument()
  })
})

describe('Content', () => {
  it('renders children', () => {
    render(<Content><p>content text</p></Content>)
    expect(screen.getByText('content text')).toBeInTheDocument()
  })

  it('forwards style', () => {
    render(<Content style={{ padding: 24 }}><p>x</p></Content>)
    expect(document.querySelector('[style]')).toBeInTheDocument()
  })
})

describe('Footer', () => {
  it('renders children', () => {
    render(<Footer><span>footer text</span></Footer>)
    expect(screen.getByText('footer text')).toBeInTheDocument()
  })

  it('forwards className', () => {
    render(<Footer className="my-footer"><span>x</span></Footer>)
    expect(document.querySelector('.my-footer')).toBeInTheDocument()
  })
})

describe('Sider', () => {
  it('renders children', () => {
    render(<Sider><nav>sidebar</nav></Sider>)
    expect(screen.getByText('sidebar')).toBeInTheDocument()
  })

  it('forwards className', () => {
    render(<Sider className="my-sider"><nav>x</nav></Sider>)
    expect(document.querySelector('.my-sider')).toBeInTheDocument()
  })

  it('accepts width prop', () => {
    render(<Sider width={240}><nav>x</nav></Sider>)
    expect(screen.getByText('x')).toBeInTheDocument()
  })
})
