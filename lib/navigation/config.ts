import type { FooterGroup, NavItem } from '@/lib/navigation/types'

export const primaryNav: NavItem[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'features', label: 'Features', href: '#features' },
  { key: 'pricing', label: 'Pricing', href: '#pricing' },
  { key: 'docs', label: 'Docs', href: '#docs' },
]

export const sidebarNav: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'home' },
  { key: 'projects', label: 'Projects', href: '/projects', icon: 'folder' },
  { key: 'settings', label: 'Settings', href: '/settings', icon: 'setting' },
]

export const footerGroups: FooterGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#changelog' },
      { label: 'Roadmap', href: '#roadmap' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
    ],
  },
]
