# AGENTS.md — [Your Project Name]

> Open standard (Linux Foundation / Agentic AI Foundation). Loaded by Codex, Cursor, Aider, Gemini CLI, Copilot, and 20+ tools. Keep under 32 KiB combined.

## Project overview

**What**: [What this project does — one clear paragraph.]
**Who**: [Target users / customers.]
**Stack**: [e.g., Next.js 15 · TypeScript · Tailwind · Prisma · PostgreSQL]

## Quick commands

```bash
pnpm install   # Install dependencies
pnpm dev       # Start dev server
pnpm test      # Run unit tests
pnpm lint      # Lint + type-check
pnpm build     # Production build
pnpm e2e       # Playwright E2E tests
```

## Repository layout

```
src/
  app/          Routing only — no business logic
  features/     All business logic (auth, billing, dashboard…)
  components/   Shared UI only (used by 2+ features)
  lib/          Shared utilities (api-client, formatters)
  config/       Environment variables, constants
tests/          E2E and integration tests (Playwright)
docs/decisions/ Architecture Decision Records
tasks/          Session planning (todo.md) and lessons (lessons.md)
```

## Code conventions

- **TypeScript** strict mode, no `any` — use `unknown` + type guard
- **Naming**: files `kebab-case` · components `PascalCase` · functions `camelCase` · constants `UPPER_SNAKE_CASE`
- **Suffixes**: `.service.ts` · `.types.ts` · `.test.ts` · `.schema.ts` · `.config.ts` · `.hook.ts`
- **Max 300 lines** per file (target 100–200). One responsibility per file.
- **Imports**: `@/` path alias only. No relative imports deeper than `../`
- **No barrel files** (`index.ts` re-exports). Import from source directly.
- **Tests colocated**: `feature.test.ts` next to `feature.ts`. Run `pnpm test` after changes.

## Feature module structure

Every feature in `src/features/` follows the same layout:

```
src/features/<name>/
  <name>.service.ts    Business logic (pure, testable)
  <name>.types.ts      TypeScript interfaces and enums
  <name>.schema.ts     Zod / Valibot validation schemas
  <name>.test.ts       Unit tests
  components/          UI components specific to this feature
```

**Features do not import from other features.** Shared logic goes in `src/lib/` only when used by 2+ features.

---

## Workflow Orchestration

### 1. Plan Node Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately – don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes – don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests – then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

---

## Task Management

1. **Plan First:** Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan:** Check in before starting implementation
3. **Track Progress:** Mark items complete as you go
4. **Explain Changes:** High-level summary at each step
5. **Document Results:** Add review section to `tasks/todo.md`
6. **Capture Lessons:** Update `tasks/lessons.md` after corrections

---

## Principles & Constraints

- **Simplicity First:** Make every change as simple as possible. Impact minimal code.
- **No Laziness:** Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact:** Changes should only touch what's necessary. Avoid introducing bugs.
- **Before creating files or making structural changes, read ARCHITECTURE.md in full.** Features never import from each other — composition happens only at `src/app/`.

## See also

- ARCHITECTURE.md — *(read before any structural change)*
- docs/decisions/ — Architectural decision records
- tasks/lessons.md — Review at session start
