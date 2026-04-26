'use client'

/**
 * Reference: Sign-in page using NextAuth v5 Credentials + AntD Form.
 */

import { App, Layout, Space, Typography } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Form, FormItem } from '@/components/ui/Form'
import { Input, PasswordInput } from '@/components/ui/Input'

const { Content } = Layout
const { Title } = Typography

type FormValues = {
  email: string
  password: string
}

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const { notification } = App.useApp()

  const callbackUrl = (() => {
    const raw = searchParams.get('callbackUrl') ?? '/dashboard'
    // Validate same-origin: must start with / and not //
    if (raw.startsWith('/') && !raw.startsWith('//')) return raw
    return '/dashboard'
  })()

  const handleFinish = async (values: FormValues) => {
    setIsLoading(true)
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    setIsLoading(false)

    if (!result || result.error) {
      notification.error({ message: 'Invalid email or password' })
      return
    }

    router.push(callbackUrl as `/${string}`)
    router.refresh()
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Space direction="vertical" style={{ width: 360 }}>
          <Title level={3} style={{ textAlign: 'center' }}>Sign in</Title>
          <Form onFinish={handleFinish}>
            <FormItem
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Enter a valid email' },
              ]}
            >
              <Input placeholder="you@example.com" autoComplete="email" />
            </FormItem>

            <FormItem
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <PasswordInput placeholder="••••••••" autoComplete="current-password" />
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" loading={isLoading} block>
                Sign in
              </Button>
            </FormItem>
          </Form>
        </Space>
      </Content>
    </Layout>
  )
}
