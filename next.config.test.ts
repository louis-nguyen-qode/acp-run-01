import type { NextConfig } from 'next'
import { beforeAll, describe, expect, it } from 'vitest'

describe('next.config', () => {
  let config: NextConfig

  beforeAll(async () => {
    const mod = (await import('./next.config.js')) as { default: NextConfig }
    config = mod.default
  })

  it('does not include antd in experimental.optimizePackageImports', () => {
    const optimized = config.experimental?.optimizePackageImports ?? []
    expect(optimized).not.toContain('antd')
  })

  it('includes antd in transpilePackages', () => {
    expect(config.transpilePackages).toContain('antd')
  })

  it('includes rc-* and icon packages in transpilePackages', () => {
    const pkgs = config.transpilePackages ?? []
    expect(pkgs).toContain('rc-util')
    expect(pkgs).toContain('@ant-design/icons')
    expect(pkgs).toContain('@ant-design/icons-svg')
    expect(pkgs).toContain('rc-pagination')
    expect(pkgs).toContain('rc-picker')
    expect(pkgs).toContain('rc-notification')
    expect(pkgs).toContain('rc-tooltip')
    expect(pkgs).toContain('rc-tree')
    expect(pkgs).toContain('rc-table')
  })

  it('does not have antd in modularizeImports', () => {
    const entries = Object.keys(config.modularizeImports ?? {})
    expect(entries).not.toContain('antd')
  })
})
