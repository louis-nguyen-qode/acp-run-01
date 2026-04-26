'use client'

/**
 * Reference: Form with server action.
 * Use this pattern for any create/update form.
 */

import { App, Form as AntForm, Space, Typography } from 'antd'
import { useTransition } from 'react'

import { Button } from '@/components/ui/Button'
import { Form, FormItem } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'

import { createItemAction } from './actions'

const { Title } = Typography

// ── Types ──────────────────────────────────────────────────────────────────

type FormValues = {
  name: string
  description: string
}

// ── Component ──────────────────────────────────────────────────────────────

export default function ExampleFormPage() {
  const [form] = AntForm.useForm<FormValues>()
  const [isPending, startTransition] = useTransition()
  const { notification } = App.useApp()

  const handleFinish = (values: FormValues) => {
    startTransition(async () => {
      const result = await createItemAction(values)
      if (result.error) {
        notification.error({ message: result.error })
        return
      }
      notification.success({ message: 'Item created' })
      form.resetFields()
    })
  }

  return (
    <Space direction="vertical" size="large" style={{ maxWidth: 480, width: '100%', padding: 24 }}>
      <Title level={3}>Create item</Title>
      <Form form={form} onFinish={handleFinish}>
        <FormItem
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Name is required' },
            { min: 2, message: 'Name must be at least 2 characters' },
          ]}
        >
          <Input placeholder="Enter name" autoComplete="off" />
        </FormItem>

        <FormItem
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Description is required' }]}
        >
          <Input placeholder="Enter description" />
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" loading={isPending} block>
            Create
          </Button>
        </FormItem>
      </Form>
    </Space>
  )
}
