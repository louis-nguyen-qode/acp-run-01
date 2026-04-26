---
title: "Contracts Index"
type: "contract"
status: "active"
updated: "2026-04-26"
---

# Module Contracts

A contract describes the public interface of a module: what it exports, what it accepts, what invariants it maintains. Workers read contracts before implementing anything that crosses a module boundary.

## Index

*(No contracts yet — populated by workers as modules are established)*

## Template

```markdown
---
title: "lib/auth contract"
type: "contract"
status: "active"
updated: "YYYY-MM-DD"
linear: "QOD-XX"
---

## Exports

- `hashPassword(plaintext: string): Promise<string>`
- `verifyPassword(plaintext: string, hash: string): Promise<boolean>`

## Invariants

- Passwords are hashed with bcrypt cost 10
- Hash is never returned to the client
- Plaintext is never stored
```
