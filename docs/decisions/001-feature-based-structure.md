# ADR 001: Feature-based folder organization

**Date**: [YYYY-MM-DD]
**Status**: Accepted
**Deciders**: [Team / Author]

---

## Context

We needed to decide how to organize our source code. The two main options were:

**Layer-based (horizontal)**: Group by technical type.
```
src/
  components/
  hooks/
  services/
  types/
  utils/
```

**Feature-based (vertical slice)**: Group by business domain.
```
src/
  features/
    auth/
    billing/
    dashboard/
  components/   ← shared UI only
  lib/          ← shared utilities only
```

## Decision

We chose **feature-based organization** (vertical slice / screaming architecture).

## Consequences

### Positive

- **Better AI output**: When Claude Code or Cursor needs to modify auth flows, it loads `src/features/auth/` and has complete context — service, types, schema, tests, and components — without traversing 6 unrelated directories.
- **Faster navigation**: Related files are colocated. Finding everything about billing means looking in one place.
- **Enforced boundaries**: The "no cross-feature imports" rule creates explicit module boundaries, reducing coupling.
- **Screaming architecture**: The top-level folder structure reveals what the system *does* (`auth`, `billing`, `dashboard`) rather than what framework it uses (`components`, `services`).
- **New feature consistency**: Adding a new feature means copying the existing folder structure — type-safe scaffolding by convention.

### Negative / Trade-offs

- **Initial learning curve**: Developers used to layer-based structures need to adjust.
- **Shared code decisions**: Determining whether something belongs in `features/` vs `lib/` vs `components/` requires judgement. Our rule: only extract to shared when used by 2+ features.

## Alternatives considered

**Layer-based organization**: Rejected. Forces AI tools to load context from 6+ directories for a single feature change. High token cost and context fragmentation.

**Flat structure (all files in src/)**: Rejected. Works for small projects but collapses at scale.

## References

- [Bulletproof React](https://github.com/alan2207/bulletproof-react) — 33k stars, gold standard implementation
- Robert C. Martin — Screaming Architecture (Clean Architecture)
- Kent C. Dodds — [Colocation principle](https://kentcdodds.com/blog/colocation)
- Research: Feature-based structures reduce AI context window usage, improving output quality
