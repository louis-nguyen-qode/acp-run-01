# Worker Contract

You are a Claude Code agent assigned a single, scoped task on this repository. Read this file completely before writing any code.

## Read Order (mandatory, before any edits)

1. This file (`CLAUDE.md`)
2. `STANDARDS.md` — engineering rules
3. `DESIGN.md` — UI rules
4. Your task spec (path in env var `TASK_SPEC_PATH`)
5. `.context/architecture/overview.md`
6. `.context/architecture/contracts/` — anything related to your task
7. `.context/primitives/` — so you don't rebuild what exists
8. `.context/conventions/` — patterns this codebase uses
9. The closest `_reference/` example for your task type

If your task mentions a specific module or contract, read that file in full.
Use `context-tree query "<topic>"` to discover relevant nodes.

## File Claims (before editing any file)

```bash
context-tree claim --files "<glob1>,<glob2>" --task $LINEAR_ISSUE_ID
```

If claim is rejected (collision with another worker): STOP and surrender (see below).

## Workflow

1. Branch is already created by the entrypoint: `feat/${LINEAR_ISSUE_ID}-<slug>`
2. Implement the task
3. Write Vitest tests beside every source file: `Foo.tsx` → `Foo.test.tsx`
4. Update `.context/` if you create primitives, change contracts, or add conventions
5. Run locally and fix until all green:
   - `pnpm lint`
   - `pnpm typecheck`
   - `pnpm test --coverage`
6. Verify coverage ≥80% per changed file
7. Commit with conventional format + footer `Refs: $LINEAR_ISSUE_ID`
8. `git push -u origin <branch>`
9. `gh pr create` using `.github/PULL_REQUEST_TEMPLATE.md` — fill it in completely
10. `gh issue comment $LINEAR_ISSUE_ID --body "PR: <pr_url>"`
11. Exit 0

## Hard Rules

Violations will cause CI failure or be caught by the pre-merge check:

- No `any` type. No `as any`. No `@ts-ignore`. No `@ts-expect-error`.
- No `useEffect` for data fetching — use Server Components or Server Actions.
- No raw `<form>`, `<input>`, `<button>` — use `components/ui/` wrappers.
- No hardcoded colors, spacing, or typography — use `theme/tokens.ts`.
- No file > 300 lines. Decompose into smaller files.
- No PR diff > 300 lines. If your task is too big, surrender.
- No skipped tests (`.skip`, `.only`).
- No real network or DB calls in unit tests — mock with `vi.mock()`.
- No `console.log` or `debugger` left in committed code.
- No `--no-verify` git flags. No `[skip ci]`.
- No modification of `.github/workflows/`, `next.config.js`, `middleware.ts`, or `lib/auth/`
  unless your task explicitly requires it AND you create an ADR in `.context/architecture/decisions/`.

## When to Surrender

Surrender (do not loop or retry) when:

- Spec is ambiguous about user-facing behavior
- Implementing would violate an existing contract
- A required primitive doesn't exist and building it would change the architecture
- A claim collision blocks you and can't be resolved
- You can't reach 80% coverage after a reasonable effort
- You've used 50%+ of your task budget without a working solution

**To surrender:**

```bash
mkdir -p .agent
# Write a clear explanation to .agent/needs-human.md:
# - What you tried
# - What failed
# - What you need

gh issue comment $LINEAR_ISSUE_ID --body-file .agent/needs-human.md
exit 2
```

## Definition of Done

A PR merged to master by the orchestrator. You don't merge. After `gh pr create` succeeds: exit 0. Do not keep editing.

## Style

Write code other agents and one human will read. Match existing patterns. No new dependencies unless the task requires them — justify in the PR description if so.
