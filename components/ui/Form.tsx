'use client'

import { Form as AntForm, type FormProps, type FormItemProps } from 'antd'

type FormWrapperProps<T> = {
  form?: FormProps<T>['form']
  onFinish?: FormProps<T>['onFinish']
  onFinishFailed?: FormProps<T>['onFinishFailed']
  initialValues?: FormProps<T>['initialValues']
  layout?: FormProps<T>['layout']
  className?: string
  name?: string
  children?: React.ReactNode
}

/** Enforces standard AntD Form layout. Always use with FormItem for validation. */
export function Form<T = unknown>({ layout = 'vertical', ...props }: FormWrapperProps<T>) {
  return <AntForm<T> layout={layout} {...props} />
}

Form.useForm = AntForm.useForm

type ItemProps = Pick<
  FormItemProps,
  'label' | 'name' | 'rules' | 'children' | 'help' | 'validateStatus' | 'required' | 'tooltip' | 'extra'
>

/** Form.Item with sensible defaults for error display. */
export function FormItem(props: ItemProps) {
  return <AntForm.Item hasFeedback={false} {...props} />
}
