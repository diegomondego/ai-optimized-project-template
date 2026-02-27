# ADR 002: No barrel files (no index.ts re-exports)

**Date**: [YYYY-MM-DD]
**Status**: Accepted
**Deciders**: [Team / Author]

---

## Context

Barrel files are `index.ts` files that re-export everything from a directory:

```ts
// src/features/auth/index.ts (BANNED)
export * from "./auth.service";
export * from "./auth.types";
export * from "./auth.schema";
```

These feel convenient — they allow clean-looking imports:
```ts
import { authService, AuthError } from "@/features/auth"; // uses barrel
```

vs. direct imports:
```ts
import { authService } from "@/features/auth/auth.service"; // direct
import { AuthError } from "@/features/auth/auth.types";     // direct
```

## Decision

**No barrel files.** Import directly from source files always.

The only acceptable barrel is a library's public package entry point (e.g., the `exports` field in a `packages/ui/package.json` monorepo package).

## Reasoning

1. **Build performance**: Atlassian reported 75% faster builds after removing barrel files. One Next.js project reduced module loading from 11,000 to 3,500 modules (-68%) after removal.

2. **Circular dependency risk**: Barrel files are the primary source of circular imports. Auto-import features in AI tools and IDEs routinely create circular imports through barrels.

3. **AI context loading**: When an AI tool sees `import { X } from "@/features/auth"`, it must resolve the barrel and potentially load many more files than needed. Direct imports tell the AI exactly what file to look at.

4. **Explicit over implicit**: Direct imports make it immediately clear where code comes from. Refactoring is simpler because the dependency graph is explicit.

5. **Tree-shaking**: Bundlers tree-shake more effectively with direct imports.

## Consequences

- Import statements are slightly more verbose but unambiguous.
- Use the `@/` path alias to keep imports short: `@/features/auth/auth.service` instead of `../../../features/auth/auth.service`.
- IDE auto-import will suggest the correct direct path.
- Add ESLint rule `import/no-cycle` to detect circular imports early.

## References

- Atlassian Engineering — barrel file performance study
- TanStack Query maintainer post on circular import bugs from barrels
- [Avoid barrel files](https://tkdodo.eu/blog/please-stop-using-barrel-files) — Dominik Dorfmeister
