'use client'

import { Input as AntInput } from 'antd'
import type { InputProps as AntInputProps, PasswordProps } from 'antd/es/input'

export type InputProps = Pick<
  AntInputProps,
  | 'value'
  | 'onChange'
  | 'placeholder'
  | 'disabled'
  | 'size'
  | 'prefix'
  | 'suffix'
  | 'maxLength'
  | 'id'
  | 'name'
  | 'autoComplete'
>

export type PasswordInputProps = Pick<
  PasswordProps,
  'value' | 'onChange' | 'placeholder' | 'disabled' | 'size' | 'id' | 'name' | 'autoComplete'
>

/** Text input. Use inside AntD <Form.Item> for validation display. */
export function Input(props: InputProps) {
  return <AntInput {...props} />
}

/** Password input with visibility toggle. */
export function PasswordInput(props: PasswordInputProps) {
  return <AntInput.Password {...props} />
}
