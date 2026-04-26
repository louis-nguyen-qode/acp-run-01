'use client'

import { DashboardOutlined, FolderOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons'
import { Drawer, Grid, Layout, Menu } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { sidebarNav } from '@/lib/navigation/config'
import { tokens } from '@/theme/tokens'

const SIDER_WIDTH = tokens.spacing.xxl * 5

const iconMap: Record<string, React.ReactNode> = {
  home: <HomeOutlined />,
  dashboard: <DashboardOutlined />,
  folder: <FolderOutlined />,
  setting: <SettingOutlined />,
}

const menuItems = sidebarNav.map(item => ({
  key: item.href,
  icon: iconMap[item.icon ?? ''] ?? null,
  label: <Link href={item.href}>{item.label}</Link>,
}))

export function AppSidebar() {
  const pathname = usePathname()
  const screens = Grid.useBreakpoint()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const isMobile = screens.md === false

  useEffect(() => {
    const handleToggle = () => setIsDrawerOpen(prev => !prev)
    window.addEventListener('app:toggle-sidebar', handleToggle)
    return () => window.removeEventListener('app:toggle-sidebar', handleToggle)
  }, [])

  const sidebarMenu = (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      items={menuItems}
      style={{ height: '100%', borderRight: 0 }}
    />
  )

  if (isMobile) {
    return (
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        placement="left"
        width={SIDER_WIDTH}
        styles={{ body: { padding: 0 } }}
        destroyOnClose
      >
        {sidebarMenu}
      </Drawer>
    )
  }

  return (
    <Layout.Sider width={SIDER_WIDTH}>
      {sidebarMenu}
    </Layout.Sider>
  )
}
