/**
 * NextAuth v5 route handler.
 * Re-exports the handlers from auth.ts — do not add logic here.
 */

import { handlers } from '@/_reference/example-auth-flow/auth'

export const { GET, POST } = handlers
