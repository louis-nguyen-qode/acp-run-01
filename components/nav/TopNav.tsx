'use client'

import { CompassOutlined, HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import Link from 'next/link'

import { BrandMark } from '@/components/brand/BrandMark'
import { Button } from '@/components/ui/Button'
import { signOut } from '@/lib/auth'
import { tokens } from '@/theme/tokens'

import styles from './TopNav.module.css'

const NAV_ITEMS = [
  { key: 'home', href: '/', icon: <HomeOutlined />, label: 'Home' },
  { key: 'explore', href: '/explore', icon: <CompassOutlined />, label: 'Explore' },
  { key: 'profile', href: '/profile', icon: <UserOutlined />, label: 'Profile' },
] as const

export function TopNav() {
  function handleSignOut() {
    void signOut()
  }

  return (
    <nav
      className={styles.nav}
      style={{
        position: 'sticky',
        top: 0,
        height: tokens.spacing.navHeight,
        background: tokens.colors.bg,
        borderBottom: `1px solid ${tokens.colors.borderSubtle}`,
        zIndex: 100,
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        style={{ height: '100%', paddingLeft: tokens.spacing.md, paddingRight: tokens.spacing.md }}
      >
        <BrandMark size="md" />
        <Flex align="center" gap={tokens.spacing.md}>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.key}
              href={item.href}
              aria-label={item.label}
              style={{
                color: tokens.colors.textMuted,
                fontSize: tokens.fontSize.xl,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {item.icon}
            </Link>
          ))}
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleSignOut}
            aria-label="Logout"
            style={{ color: tokens.colors.textMuted, fontSize: tokens.fontSize.xl, padding: 0 }}
          />
        </Flex>
      </Flex>
    </nav>
  )
}
