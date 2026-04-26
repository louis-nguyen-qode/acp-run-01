import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import { type Metadata } from 'next'

import { theme } from '@/theme/tokens'

import './globals.css'

export const metadata: Metadata = {
  title: 'App',
  description: 'Next.js + Ant Design application',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
