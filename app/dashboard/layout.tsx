'use client'

import { Layout } from 'antd'

import { BottomNav } from '@/components/nav/BottomNav'
import { TopNav } from '@/components/nav/TopNav'
import { tokens } from '@/theme/tokens'

type Props = { children: React.ReactNode }

export default function DashboardLayout({ children }: Props) {
  return (
    <Layout>
      <TopNav />
      <Layout.Content
        data-testid="dashboard-content"
        style={{ paddingBottom: tokens.spacing.bottomNavHeight }}
      >
        {children}
      </Layout.Content>
      <BottomNav />
    </Layout>
  )
}
