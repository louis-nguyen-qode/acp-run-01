'use client'

import { Button as AntButton } from 'antd'

export type ButtonProps = {
  type?: 'primary' | 'default' | 'text' | 'link'
  size?: 'small' | 'middle' | 'large'
  loading?: boolean
  disabled?: boolean
  danger?: boolean
  icon?: React.ReactNode
  htmlType?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLElement>
  children?: React.ReactNode
  className?: string
  block?: boolean
  style?: React.CSSProperties
  'aria-label'?: string
}

/** Opinionated wrapper around AntD Button. Use `type="primary"` for the main CTA only. */
export function Button({ type = 'default', size = 'middle', ...rest }: ButtonProps) {
  return <AntButton type={type} size={size} {...rest} />
}
