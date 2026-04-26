import { Card as AntCard, type CardProps } from 'antd'

type Props = Pick<CardProps, 'title' | 'extra' | 'children' | 'loading' | 'bordered' | 'className' | 'size'>

/** Standard content card. Title lives in header; actions live in `extra`. */
export function Card({ bordered = true, ...props }: Props) {
  return <AntCard bordered={bordered} {...props} />
}
