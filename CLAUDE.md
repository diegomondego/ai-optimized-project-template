# Project: [Your Project Name] — [One-line description]

## Quick commands

```bash
pnpm dev       # Start dev server
pnpm test      # Run unit tests
pnpm lint      # Lint + type-check
pnpm build     # Production build
pnpm e2e       # Playwright E2E tests
```

## About

[What it does, who it's for, core problem it solves — one paragraph.]

## Architecture

[Next.js 15 / React / Node.js / Python] project. See @ARCHITECTURE.md for full design.

- `src/features/` — **All business logic.** Domain modules (auth, billing, dashboard…)
- `src/components/` — Shared UI only (Button, Modal, Input)
- `src/lib/` — Shared utilities (api-client, formatters)
- `src/config/` — Environment variables, constants
- `src/app/` — Routing layer only. Pages delegate to features.
- `tests/` — E2E tests (Playwright)
- `docs/decisions/` — Architecture Decision Records

## Code conventions

- **TypeScript** strict mode, no `any` — use `unknown` + type guard
- **Naming**: files `kebab-case` · components `PascalCase` · functions `camelCase`
- **Suffixes**: `.service.ts` · `.types.ts` · `.test.ts` · `.schema.ts` · `.config.ts` · `.hook.ts`
- **Max 300 lines** per file. Multiple responsibilities → split it.
- **Imports**: `@/` path alias only. No relative imports deeper than `../`
- **No barrel files** (`index.ts` re-exports). Import from source directly.
- **Tests colocated**: `feature.test.ts` next to `feature.ts`. Run `pnpm test` after changes.

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
- **Before creating files or making structural changes, read @ARCHITECTURE.md in full.** Features never import from each other — composition happens only at `src/app/`.

## See also

- @ARCHITECTURE.md — *(read before any structural change)*
- @docs/decisions/ — Architectural decision records
- @tasks/lessons.md — Review at session start
