export type NavItem = {
  key: string
  label: string
  href: string
  icon?: string
}

export type FooterGroup = {
  title: string
  links: { label: string; href: string }[]
}
