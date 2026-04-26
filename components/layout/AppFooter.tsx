import { footerGroups } from '@/lib/navigation/config'

import { AppFooterContent } from './AppFooterContent'

export function AppFooter() {
  return <AppFooterContent groups={footerGroups} year={new Date().getFullYear()} />
}
