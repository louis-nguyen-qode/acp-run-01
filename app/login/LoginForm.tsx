'use client'

import { Alert, Col, Row, Typography } from 'antd'
import Link from 'next/link'
import { useTransition } from 'react'
import { useFormState } from 'react-dom'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Form, FormItem } from '@/components/ui/Form'
import { Input, PasswordInput } from '@/components/ui/Input'
import { Content, Layout } from '@/components/ui/Layout'
import { tokens } from '@/theme/tokens'

import { loginAction } from './actions'

type Props = { registered: boolean }
type FormValues = { email: string; password: string }

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
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: tokens.spacing.lg }}>
          <Col xs={22} sm={20} md={16} lg={12} xl={8}>
            <Card title="Sign in">
              {registered && (
                <Alert
                  type="success"
                  message="Account created! You can now sign in."
                  style={{ marginBottom: tokens.spacing.md }}
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
                  <Button type="primary" htmlType="submit" loading={isPending} block>
                    Sign in
                  </Button>
                </FormItem>
              </Form>
              <Row justify="center" style={{ marginTop: tokens.spacing.sm }}>
                <Typography.Text>
                  Don&apos;t have an account?{' '}
                  <Link href="/register">Create one</Link>
                </Typography.Text>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
