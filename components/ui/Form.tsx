'use client'

import { Form as AntForm, type FormProps as AntFormProps, type FormItemProps as AntFormItemProps } from 'antd'

export type FormProps<T = unknown> = {
  form?: AntFormProps<T>['form']
  onFinish?: AntFormProps<T>['onFinish']
  onFinishFailed?: AntFormProps<T>['onFinishFailed']
  initialValues?: AntFormProps<T>['initialValues']
  layout?: AntFormProps<T>['layout']
  className?: string
  name?: string
  children?: React.ReactNode
}

export type FormItemProps = Pick<
  AntFormItemProps,
  'label' | 'name' | 'rules' | 'children' | 'help' | 'validateStatus' | 'required' | 'tooltip' | 'extra'
>

/** Enforces standard AntD Form layout. Always use with FormItem for validation. */
export function Form<T = unknown>({ layout = 'vertical', ...props }: FormProps<T>) {
  return <AntForm<T> layout={layout} {...props} />
}

Form.useForm = AntForm.useForm

/** Form.Item with sensible defaults for error display. */
export function FormItem(props: FormItemProps) {
  return <AntForm.Item hasFeedback={false} {...props} />
}
