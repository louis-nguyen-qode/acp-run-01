import { Button } from '@/components/ui'

import { signOutAction } from './actions'

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button htmlType="submit" danger>
        Sign out
      </Button>
    </form>
  )
}
