'use client'

import { MenuOutlined } from '@ant-design/icons'
import { Button, Flex, Grid, Layout, Menu } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { primaryNav } from '@/lib/navigation/config'
import { tokens } from '@/theme/tokens'

export function AppHeader() {
  const pathname = usePathname()
  const screens = Grid.useBreakpoint()
  const isMobile = !screens.md

  const selectedKey = primaryNav.find(item => item.href === pathname)?.key ?? ''

  const menuItems = primaryNav.map(item => ({
    key: item.key,
    label: <Link href={item.href}>{item.label}</Link>,
  }))

  function handleMobileMenuClick() {
    window.dispatchEvent(new CustomEvent('app:toggle-sidebar'))
  }

  return (
    <Layout.Header
      style={{
        padding: `0 ${tokens.spacing.lg}px`,
        background: tokens.colors.bg,
        borderBottom: `1px solid ${tokens.colors.border}`,
      }}
    >
      <Flex align="center" justify="space-between" style={{ height: '100%' }}>
        <Link
          href="/"
          style={{
            fontSize: tokens.fontSize.lg,
            fontWeight: 700,
            color: tokens.colors.primary,
          }}
        >
          qode.world
        </Link>

        {!isMobile && (
          <Menu
            mode="horizontal"
            selectedKeys={selectedKey ? [selectedKey] : []}
            items={menuItems}
            style={{
              flex: 1,
              marginLeft: tokens.spacing.lg,
              border: 'none',
              background: tokens.colors.bg,
            }}
          />
        )}

        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={handleMobileMenuClick}
            aria-label="Toggle navigation menu"
          />
        )}
      </Flex>
    </Layout.Header>
  )
}
