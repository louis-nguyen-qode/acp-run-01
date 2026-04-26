# Target Repo Template

A fully-configured Next.js 14 + Ant Design + Vitest + Prisma + NextAuth v5 scaffold that agent workers clone as the product repo.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict)
- **UI:** Ant Design 5 — no other component library
- **Design tokens:** `theme/tokens.ts` — no hardcoded values anywhere
- **Testing:** Vitest + @testing-library/react (80% per-file coverage required)
- **ORM:** Prisma + SQLite (dev) / Postgres (prod)
- **Auth:** NextAuth v5 (`next-auth@beta`)
- **Lint:** ESLint (strict) + Prettier

## For Workers

Read these files before writing any code:

1. `CLAUDE.md` — the worker contract
2. `STANDARDS.md` — engineering rules
3. `DESIGN.md` — UI rules

Then read the relevant `_reference/` example for your task type.

## Quick Start (Human Dev)

```bash
pnpm install
pnpm dev       # http://localhost:3000
pnpm test      # unit tests
pnpm build     # production build
pnpm lint      # lint + typecheck
```

## Repository Layout

```
target-repo-template/
├── CLAUDE.md              # worker contract
├── STANDARDS.md           # engineering rules
├── DESIGN.md              # UI rules (AntD)
├── theme/tokens.ts        # design tokens (single source of truth)
├── components/ui/         # AntD wrappers
├── app/                   # Next.js App Router pages
├── lib/                   # shared utilities (populated by workers)
├── prisma/                # schema + migrations
├── _reference/            # canonical patterns to imitate
├── .context/              # living architecture documentation
├── scripts/               # CI custom checks
└── .github/workflows/     # CI
```
