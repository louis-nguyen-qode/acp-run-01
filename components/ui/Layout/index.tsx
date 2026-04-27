'use client'

import { Layout as AntLayout, type LayoutProps as AntLayoutProps, type SiderProps as AntSiderProps } from 'antd'

export type LayoutProps = AntLayoutProps
export type HeaderProps = AntLayoutProps
export type ContentProps = AntLayoutProps
export type FooterProps = AntLayoutProps
export type SiderProps = AntSiderProps

export function Layout(props: LayoutProps) {
  return <AntLayout {...props} />
}

export function Header(props: HeaderProps) {
  return <AntLayout.Header {...props} />
}

export function Content(props: ContentProps) {
  return <AntLayout.Content {...props} />
}

export function Footer(props: FooterProps) {
  return <AntLayout.Footer {...props} />
}

export function Sider(props: SiderProps) {
  return <AntLayout.Sider {...props} />
}
