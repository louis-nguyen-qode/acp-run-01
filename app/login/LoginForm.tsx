'use client'

import { Alert, Flex, Typography } from 'antd'
import Link from 'next/link'
import { useTransition } from 'react'
import { useFormState } from 'react-dom'

import { BrandMark } from '@/components/brand/BrandMark'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Form, FormItem } from '@/components/ui/Form'
import { Input, PasswordInput } from '@/components/ui/Input'
import { Content, Layout } from '@/components/ui/Layout'
import { tokens } from '@/theme/tokens'

import { loginAction } from './actions'

type Props = { registered: boolean }
type FormValues = { email: string; password: string }

const cardStyle = {
  borderColor: tokens.colors.borderSubtle,
}

const accentButtonStyle = {
  backgroundColor: tokens.colors.accent,
  borderColor: tokens.colors.accent,
}

export function LoginForm({ registered }: Props) {
  const [form] = Form.useForm<FormValues>()
  const [state, formAction] = useFormState(loginAction, {})
  const [isPending, startTransition] = useTransition()

  const handleFinish = (values: FormValues) => {
    const fd = new FormData()
    fd.set('email', values.email)
    fd.set('password', values.password)
    startTransition(() => {
      formAction(fd)
    })
  }

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: tokens.colors.bgElevated }}>
      <Content>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{ minHeight: '100vh', padding: tokens.spacing.lg }}
        >
          <Flex vertical style={{ width: '100%', maxWidth: 350, gap: tokens.spacing.sm }}>
            <Card bordered style={cardStyle}>
              <Flex vertical align="center" gap={tokens.spacing.lg}>
                <BrandMark size="lg" />
                {registered && (
                  <Alert
                    type="success"
                    message="Account created! You can now sign in."
                    style={{ width: '100%', marginBottom: tokens.spacing.md }}
                  />
                )}
                <Form form={form} onFinish={handleFinish} name="login">
                  <FormItem
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Email is required' },
                      { type: 'email', message: 'Please enter a valid email' },
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
                  {state.error && (
                    <Alert
                      type="error"
                      message={state.error}
                      style={{ marginBottom: tokens.spacing.md }}
                    />
                  )}
                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isPending}
                      block
                      style={accentButtonStyle}
                    >
                      Log In
                    </Button>
                  </FormItem>
                </Form>
              </Flex>
            </Card>
            <Card bordered style={cardStyle}>
              <Flex justify="center">
                <Typography.Text>
                  Don&apos;t have an account?{' '}
                  <Link href="/register">Sign up</Link>
                </Typography.Text>
              </Flex>
            </Card>
          </Flex>
        </Flex>
      </Content>
    </Layout>
  )
}
