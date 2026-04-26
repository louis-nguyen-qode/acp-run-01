import { type Metadata } from 'next'

import { AppShell } from '@/components/layout/AppShell'

import { Providers } from './providers'

import './globals.css'

export const metadata: Metadata = {
  title: 'App',
  description: 'Next.js + Ant Design application',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  )
}
