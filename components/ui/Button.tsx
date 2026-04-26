'use client'

import { Button as AntButton } from 'antd'

type AllowedType = 'primary' | 'default' | 'text' | 'link'
type AllowedSize = 'small' | 'middle' | 'large'

type Props = {
  type?: AllowedType
  size?: AllowedSize
  loading?: boolean
  disabled?: boolean
  danger?: boolean
  icon?: React.ReactNode
  htmlType?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLElement>
  children?: React.ReactNode
  className?: string
  block?: boolean
}

/** Opinionated wrapper around AntD Button. Use `type="primary"` for the main CTA only. */
export function Button({ type = 'default', size = 'middle', ...rest }: Props) {
  return <AntButton type={type} size={size} {...rest} />
}
