# Database — Prisma + SQLite

## Singleton pattern

The Prisma client is a singleton exported from `lib/db.ts`. Import it wherever you need database access:

```typescript
import { prisma } from '@/lib/db'

const user = await prisma.user.findUnique({ where: { email } })
```

The singleton is guarded via `globalThis` so that Next.js HMR hot-reloads in development do not create additional database connections:

```typescript
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

In production, modules are evaluated once so the `globalThis` guard is not needed.

## Schema location

`prisma/schema.prisma` — all models live here. The datasource is SQLite at `file:./dev.db` in development (controlled by the `DATABASE_URL` env var).

## Adding a new model

1. Add the model to `prisma/schema.prisma`.
2. Run `pnpm db:migrate` to create and apply a migration.
3. Run `pnpm db:generate` if you need to regenerate the client without migrating.
4. Import the new delegate from `prisma` — it is available automatically after generation.

## Current models

### User

| Field          | Type       | Notes                     |
| -------------- | ---------- | ------------------------- |
| `id`           | `String`   | CUID, primary key         |
| `email`        | `String`   | Unique                    |
| `passwordHash` | `String`   | bcrypt hash               |
| `createdAt`    | `DateTime` | Set automatically on insert |

## Environment variables

| Variable       | Example            | Purpose                      |
| -------------- | ------------------ | ---------------------------- |
| `DATABASE_URL` | `file:./dev.db`    | SQLite file path for Prisma  |
| `AUTH_SECRET`  | `change-me`        | NextAuth session signing key |

Copy `.env.example` to `.env` and fill in values before running locally.

## Scripts

| Script            | Command               | Purpose                              |
| ----------------- | --------------------- | ------------------------------------ |
| `pnpm db:migrate` | `prisma migrate dev`  | Create and apply a new migration     |
| `pnpm db:generate`| `prisma generate`     | Regenerate the TypeScript client     |
