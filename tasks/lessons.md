# Lessons learned

> This file is updated by Claude after any user correction.
> Review at the start of each new session to avoid repeating past mistakes.
> Format: date · what went wrong · the rule that prevents it.

---

<!-- Example entry (delete when you add real ones):
## 2026-02-01 · Imported across feature boundaries
**What happened**: Added a `billingService` call inside `src/features/auth/auth.service.ts`.
**Root cause**: Thought it was a shortcut; it created a circular dependency.
**Rule**: Features never import from each other. If both need the same logic, extract it to `src/lib/`.
-->
