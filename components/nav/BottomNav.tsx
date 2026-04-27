'use client'

import { CompassOutlined, HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { signOut } from '@/lib/auth'
import { tokens } from '@/theme/tokens'

import styles from './BottomNav.module.css'

const NAV_ITEMS = [
  { key: 'home', href: '/', icon: <HomeOutlined />, label: 'Home' },
  { key: 'explore', href: '/explore', icon: <CompassOutlined />, label: 'Explore' },
  { key: 'profile', href: '/profile', icon: <UserOutlined />, label: 'Profile' },
] as const

export function BottomNav() {
  const pathname = usePathname()

  function handleSignOut() {
    void signOut()
  }

  return (
    <nav
      className={styles.nav}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: tokens.spacing.bottomNavHeight,
        background: tokens.colors.bg,
        borderTop: `1px solid ${tokens.colors.borderSubtle}`,
        zIndex: 100,
      }}
    >
      <Flex justify="space-around" align="center" style={{ height: '100%', width: '100%' }}>
        {NAV_ITEMS.map(item => (
          <Link
            key={item.key}
            href={item.href}
            aria-label={item.label}
            style={{
              color: pathname === item.href ? tokens.colors.brandBlack : tokens.colors.textMuted,
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
    </nav>
  )
}
