# AI-Optimized Project Template

A production-ready project template engineered for **Claude Code** and **Cursor** — and any AI coding assistant. Every structural decision is backed by research showing measurable improvement in AI output quality.

> **Based on**: [AI-Optimized File Organization research](https://github.com/your-org/ai-optimized-project-template/blob/main/docs/decisions) — studies across Claude Code, Cursor, Codex, Windsurf, and Aider showing that clean context reduces low-quality AI-generated code from 5.85% → 2.16%.

---

## Quick start

```bash
# 1. Clone the template (or download the zip from GitHub)
git clone https://github.com/your-org/ai-optimized-project-template.git my-project

# 2. Enter the directory
cd my-project

# 3. Remove the original git history and start your own
rm -rf .git
git init
git branch -m main

# 4. Make your first commit
git add .
git commit -m "chore: initialize project from ai-optimized-template"

# 5. Connect to your GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/MY_PROJECT.git
git push -u origin main

# 6. Install dependencies
pnpm install          # or: npm install / yarn install

# 7. Set up environment variables
cp .env.example .env
# Edit .env with your values

# 8. Start developing
pnpm dev
```

---

## What's in this template

```
.
├── CLAUDE.md                    ← AI instructions for Claude Code (load on every session)
├── AGENTS.md                    ← Cross-tool AI instructions (Codex, Cursor, Aider, Gemini CLI…)
├── ARCHITECTURE.md              ← System design overview + codemap
├── .claudeignore                ← Exclude noise from Claude Code's context
├── .cursorignore                ← Exclude noise from Cursor's index
├── .llmignore                   ← Universal LLM ignore (emerging standard)
├── .env.example                 ← Environment variable template
├── .cursor/
│   └── rules/
│       ├── project.mdc          ← Always-on Cursor rules
│       ├── react.mdc            ← Auto-attached for *.tsx files
│       ├── api.mdc              ← Auto-attached for src/app/api/**
│       └── testing.mdc          ← Auto-attached for *.test.* files
├── src/
│   ├── app/                     ← Next.js App Router (routing only)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── api/auth/login/      ← Example API route
│   ├── features/                ← ★ All business logic lives here
│   │   ├── auth/                ← Auth feature (service + types + schema + tests)
│   │   ├── billing/             ← Billing feature (Stripe)
│   │   └── dashboard/           ← Dashboard feature
│   ├── components/ui/           ← Shared UI primitives (Button, etc.)
│   ├── lib/                     ← Shared utilities (api-client, formatting)
│   └── config/env.ts            ← Validated environment variables
├── tests/e2e/                   ← Playwright end-to-end tests
├── docs/decisions/              ← Architecture Decision Records (ADRs)
│   ├── 001-feature-based-structure.md
│   ├── 002-no-barrel-files.md
│   └── 003-file-size-limit.md
├── package.json
└── tsconfig.json
```

---

## Personalizing the template

After cloning, do a find-and-replace for the following placeholders:

| Placeholder | Replace with |
|---|---|
| `[Your Project Name]` | Your actual project name |
| `[one-line description]` | A one-sentence description of what it does |
| `[Your App Name]` | Display name for browser titles |
| `[YYYY-MM-DD]` in ADRs | Today's date |
| `[Team / Author]` in ADRs | Your name or team name |

Then update `CLAUDE.md` and `AGENTS.md` with your real stack and architecture details.

---

## Using with Claude Code

Claude Code automatically loads `CLAUDE.md` hierarchically when you open a project. To get the best results:

**1. Always start a session by referencing CLAUDE.md**

Claude Code loads it automatically, but you can also explicitly reference it:
```
claude  # Claude Code will load CLAUDE.md on startup
```

**2. Keep CLAUDE.md updated as your project evolves**

When you add a major new feature or change conventions, update `CLAUDE.md`. The rule of thumb: if you'd tell a new developer something on their first day, put it in `CLAUDE.md`.

**3. Use feature-specific CLAUDE.md files for large projects**

You can add a `CLAUDE.md` inside individual feature folders for feature-specific context. Claude Code loads them when working in that subdirectory.

**4. Reference ARCHITECTURE.md for deep context**

Ask Claude Code: *"Read ARCHITECTURE.md, then implement X"* — this gives it the bird's-eye view before touching code.

**5. Use the living context pattern**

After a major session, ask Claude Code: *"Update CLAUDE.md with what we built today."* This prevents context loss across sessions.

---

## Using with Cursor

Cursor reads `.cursor/rules/*.mdc` files automatically based on activation type:

| File | When it activates |
|---|---|
| `project.mdc` | Always (every prompt) |
| `react.mdc` | Automatically when editing `*.tsx` / `*.jsx` |
| `api.mdc` | Automatically when editing `src/app/api/**` |
| `testing.mdc` | Automatically when editing `*.test.*` files |

**Best practices for Cursor:**

- Keep each `.mdc` rule file focused on one concern (not a dump of everything)
- Use `globs:` frontmatter to scope rules to relevant files
- Rules under 500 lines each perform best; the project total should stay under 6,000 characters
- Use `@CLAUDE.md` in your Cursor chat to bring the project overview into context

---

## Using with other AI tools

| Tool | What it reads | Notes |
|---|---|---|
| **OpenAI Codex** | `AGENTS.md` | Walks from git root down, loads all AGENTS.md in path |
| **Aider** | `AGENTS.md`, `CONVENTIONS.md` | Also uses `tree-sitter` AST analysis |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Add this file with the same content as AGENTS.md |
| **Gemini CLI** | `GEMINI.md` | Add this file; mirrors CLAUDE.md content |
| **Windsurf** | `.windsurf/rules/*.md` | Add rules in Windsurf-specific format (6K char limit each) |

**One-command setup for all tools** (using [Ruler](https://github.com/intellectronica/ruler)):
```bash
npx ruler sync   # Distributes .ruler/ instructions to all agent config files
```

---

## Core principles (why this structure works)

### Feature-based organization (screaming architecture)

Every feature lives in `src/features/<name>/`. The folder structure reveals what the system *does*, not what framework it uses. When an AI tool needs to modify auth, it loads one directory and has complete context — instead of hunting across `components/`, `services/`, `hooks/`, `types/`.

### Three-level nesting maximum

`src/features/auth/auth.service.ts` — three levels deep. Beyond three levels, import paths become unwieldy and AI navigation degrades. This is a hard rule enforced by convention.

### No cross-feature imports

Features only compose at the `src/app/` level. This creates explicit boundaries that both humans and AI can reason about cleanly.

### Files under 300 lines

AI inline editing degrades noticeably past ~250 lines. Target 100–200 lines per file. One responsibility per file — if you can't name it clearly, it's doing too much.

### No barrel files

Direct imports only (`import { X } from "@/features/auth/auth.service"`). Barrel `index.ts` re-exports create circular imports, inflate module counts, and obscure the dependency graph.

### Concise AI instruction files

`CLAUDE.md` stays under 60 lines at the root level. Bloated instruction files get partially ignored. Every line should earn its place.

---

## Development commands

```bash
pnpm dev              # Start Next.js development server
pnpm build            # Production build
pnpm test             # Run unit tests (Vitest)
pnpm test:watch       # Watch mode for unit tests
pnpm test:coverage    # Unit test coverage report
pnpm e2e              # Run Playwright end-to-end tests
pnpm lint             # ESLint + TypeScript type check
```

---

## Adding a new feature

Follow this pattern to scaffold a new feature (e.g., `notifications`):

```bash
mkdir src/features/notifications
touch src/features/notifications/notifications.types.ts
touch src/features/notifications/notifications.schema.ts
touch src/features/notifications/notifications.service.ts
touch src/features/notifications/notifications.service.test.ts
```

Then tell Claude Code or Cursor:
> *"Look at src/features/auth/ as a reference. Add a new `notifications` feature with the same structure."*

The AI will pattern-match against the existing feature modules and generate consistent, correctly structured code.

---

## Architecture decisions

See `docs/decisions/` for the full reasoning behind each major choice:

- [001 — Feature-based structure](docs/decisions/001-feature-based-structure.md)
- [002 — No barrel files](docs/decisions/002-no-barrel-files.md)
- [003 — File size limit](docs/decisions/003-file-size-limit.md)

When you make a new architectural decision, add an ADR:
```bash
touch docs/decisions/004-your-decision.md
```

ADRs help future developers (and AI sessions) understand *why* the code is shaped the way it is — not just what it does.

---

## Research behind this template

This template implements findings from research across Claude Code, Cursor, OpenAI Codex, Windsurf, and Aider:

- Feature-based structures keep related code in a single context window load
- LLM output quality degrades past ~40% context window usage
- Clean context reduces low-quality generated code by over 60% (5.85% → 2.16%)
- AI tools degrade noticeably on files over 250–300 lines
- Barrel files inflate module counts by 68%+ and create circular import bugs
- CLAUDE.md files under 60 lines are reliably followed; longer files get partially ignored

The core insight: **what makes code AI-friendly is exactly what makes code good** — clear naming, focused files, cohesive modules, explicit architecture, and documented decisions.

---

## License

MIT — use freely, adapt as needed.
