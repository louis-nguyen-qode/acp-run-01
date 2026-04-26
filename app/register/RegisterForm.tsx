'use client'

import { Alert, Col, Layout, Row, Typography } from 'antd'
import Link from 'next/link'
import { useTransition } from 'react'
import { useFormState } from 'react-dom'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Form, FormItem } from '@/components/ui/Form'
import { Input, PasswordInput } from '@/components/ui/Input'
import { tokens } from '@/theme/tokens'

import { registerAction } from './actions'

type FormValues = { email: string; password: string }

export function RegisterForm() {
  const [form] = Form.useForm<FormValues>()
  const [state, formAction] = useFormState(registerAction, {})
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
      <Layout.Content>
        <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: tokens.spacing.lg }}>
          <Col xs={22} sm={20} md={16} lg={12} xl={8}>
            <Card title="Create account">
              <Form form={form} onFinish={handleFinish} name="register">
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
                  rules={[
                    { required: true, message: 'Password is required' },
                    { min: 8, message: 'Password must be at least 8 characters' },
                  ]}
                >
                  <PasswordInput placeholder="At least 8 characters" autoComplete="new-password" />
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
                    Create account
                  </Button>
                </FormItem>
              </Form>
              <Row justify="center" style={{ marginTop: tokens.spacing.sm }}>
                <Typography.Text>
                  Already have an account?{' '}
                  <Link href="/login">Sign in</Link>
                </Typography.Text>
              </Row>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  )
}
