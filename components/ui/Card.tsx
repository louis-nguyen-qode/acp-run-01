'use client'

import { Card as AntCard, type CardProps as AntCardProps } from 'antd'

export type CardProps = Pick<AntCardProps, 'title' | 'extra' | 'children' | 'loading' | 'bordered' | 'className' | 'size' | 'style'>

/** Standard content card. Title lives in header; actions live in `extra`. */
export function Card({ bordered = true, ...props }: CardProps) {
  return <AntCard bordered={bordered} {...props} />
}
