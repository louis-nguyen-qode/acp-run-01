'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'

import { antdTheme } from '@/theme/antd-theme'

type Props = { children: React.ReactNode }

export function Providers({ children }: Props) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
    </AntdRegistry>
  )
}
