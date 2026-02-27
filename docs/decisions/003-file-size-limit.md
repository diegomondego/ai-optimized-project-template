# ADR 003: Maximum file size of 300 lines

**Date**: [YYYY-MM-DD]
**Status**: Accepted
**Deciders**: [Team / Author]

---

## Context

As projects grow, individual files accumulate logic. Without a convention, single service files can grow to 1,000+ lines ("god files"), with multiple responsibilities bundled together.

## Decision

**Files must stay under 300 lines.** The target is 100–200 lines. When a file exceeds 300 lines, it must be split by responsibility.

## Reasoning

1. **AI inline editing quality**: Cursor users document that AI assistance degrades noticeably past ~250 lines per file. The model loses track of the full context of the file when editing.

2. **Single responsibility**: A file under 200 lines is forced to do one thing. A 500-line service is almost certainly doing two or three things that deserve their own modules.

3. **Cognitive load**: A 100-line file can be understood in one read. A 500-line file requires context-switching.

4. **Token efficiency**: When an AI tool reads a file to understand context, a 100-line file uses fewer tokens than a 500-line file, leaving more budget for generation.

## How to split a large file

When `feature.service.ts` grows past 300 lines, split by sub-concern:
```
feature.service.ts       → feature-create.service.ts
                           feature-update.service.ts
                           feature-query.service.ts
```

Or extract a focused helper:
```
feature.service.ts       → feature.service.ts (core)
                           feature-notifications.ts (email/push sending)
                           feature-export.ts (CSV/PDF generation)
```

## Enforcement

- Code review convention (not currently automated).
- Consider adding an ESLint `max-lines` rule as a warning at 300 lines.

## Consequences

More files, each smaller and more focused. Navigation is easier. AI tools work more effectively within each file.
