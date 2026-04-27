'use client'

import { Layout } from 'antd'

import { tokens } from '@/theme/tokens'

import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'
import { AppSidebar } from './AppSidebar'

type Props = { children: React.ReactNode }

export function AppShell({ children }: Props) {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSidebar />
        <Layout.Content
          data-testid="app-content"
          style={{ padding: tokens.spacing.lg }}
        >
          {children}
        </Layout.Content>
      </Layout>
      <AppFooter />
    </Layout>
  )
}
