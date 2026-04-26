'use client'

import { Col, Divider, Layout, Row, Space, Typography } from 'antd'

import type { FooterGroup } from '@/lib/navigation/types'
import { tokens } from '@/theme/tokens'

export type AppFooterContentProps = {
  groups: FooterGroup[]
  year: number
}

export function AppFooterContent({ groups, year }: AppFooterContentProps) {
  return (
    <Layout.Footer>
      <Row gutter={[tokens.spacing.lg, tokens.spacing.lg]}>
        {groups.map((group) => (
          <Col key={group.title} xs={24} md={6}>
            <Typography.Title level={5}>{group.title}</Typography.Title>
            <Space direction="vertical" size={tokens.spacing.xs}>
              {group.links.map((link) => (
                <Typography.Link key={link.label} href={link.href}>
                  {link.label}
                </Typography.Link>
              ))}
            </Space>
          </Col>
        ))}
      </Row>
      <Divider />
      <Row justify="center">
        <Col>
          <Typography.Text type="secondary">
            © {year} qode.world. All rights reserved.
          </Typography.Text>
        </Col>
      </Row>
    </Layout.Footer>
  )
}
