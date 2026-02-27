# Architecture — [Your Project Name]

> **Keep this file short.** Every contributor and every AI session reads it.
> If you need more depth, link to docs/decisions/ ADRs.
> Replace everything in [brackets].

## Bird's-eye overview

[2–3 sentences on what the system does and the main architectural shape.
Example: "A multi-tenant SaaS platform. Users authenticate, create organizations, manage billing via Stripe, and access a dashboard. The frontend is a Next.js app that calls a REST API backed by PostgreSQL."]

## System diagram

```
[Browser / Mobile]
       │
       ▼
[Next.js Frontend]  ─── API Routes (src/app/api/)
       │
       ▼
[Feature Services]  (src/features/<name>/<name>.service.ts)
       │
       ▼
[Database / External APIs]
  PostgreSQL · Stripe · Resend · S3
```

## Codemap — what lives where

| Path | Purpose |
|---|---|
| `src/app/` | Next.js routing layer — layouts, pages, API routes. **No business logic.** |
| `src/app/(marketing)/` | Public marketing pages (no auth required) |
| `src/app/(dashboard)/` | Authenticated user dashboard pages |
| `src/app/api/` | API route handlers — thin, delegates to services |
| `src/features/auth/` | Authentication: login, register, sessions, guards |
| `src/features/billing/` | Billing: Stripe integration, subscription state |
| `src/features/dashboard/` | Core dashboard: user data, metrics, settings |
| `src/components/ui/` | Primitive shared components (Button, Input, Modal, etc.) |
| `src/lib/api-client.ts` | Typed HTTP client for external API calls |
| `src/lib/formatting.ts` | Date, currency, and string formatters |
| `src/config/` | Environment variable parsing and app constants |
| `tests/e2e/` | Playwright end-to-end flows |
| `docs/decisions/` | Architecture Decision Records (ADRs) |
| `scripts/` | Developer scripts: seed, migrate, deploy helpers |

## Key architectural invariants

These rules must never be broken. If you think one should be, write an ADR first.

1. **Features do not depend on each other.** All cross-feature composition happens in `src/app/`.
2. **API routes are thin.** They parse/validate input → call a service → return a response. No business logic in route handlers.
3. **Services are pure.** Feature services have no direct knowledge of HTTP, UI, or the database connection layer. They receive typed inputs and return typed outputs.
4. **Shared code earns its place.** Nothing moves to `src/lib/` or `src/components/` unless it is used by two or more features.
5. **Environment variables are parsed once.** In `src/config/env.ts` with schema validation. Never read `process.env` directly in feature code.

## Data flow example (auth)

```
User submits login form
  → LoginForm component (src/features/auth/components/login-form.tsx)
  → POST /api/auth/login (src/app/api/auth/login/route.ts)
  → authService.login(credentials) (src/features/auth/auth.service.ts)
  → Database query + token creation
  → Response → cookie set → redirect to dashboard
```

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15 / React 19] |
| Language | TypeScript (strict) |
| Styling | [Tailwind CSS] |
| Database | [PostgreSQL via Prisma] |
| Auth | [Next-Auth / Clerk / custom JWT] |
| Testing | [Vitest + React Testing Library + Playwright] |
| Package manager | [pnpm] |
| Deployment | [Vercel / Railway / Fly.io] |

## Decisions log

See `docs/decisions/` for full ADRs. Key decisions:

- [001-framework-choice.md](docs/decisions/001-framework-choice.md) — Why [Next.js / this stack]
- [002-feature-based-structure.md](docs/decisions/002-feature-based-structure.md) — Why feature-based over layer-based organization
- [003-no-barrel-files.md](docs/decisions/003-no-barrel-files.md) — Why we avoid index.ts re-exports
