/**
 * formatting.ts
 *
 * Shared string, date, and number formatters.
 * Pure functions only — no side effects, no external dependencies.
 * Name files by what they do: "formatting", not "utils" or "helpers".
 */

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

/**
 * Format a date as a human-readable relative string.
 * @example formatRelativeDate(new Date(Date.now() - 60000)) → "1 minute ago"
 */
export function formatRelativeDate(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

/**
 * Format a date as ISO date string (YYYY-MM-DD).
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0]!;
}

// ---------------------------------------------------------------------------
// Currency / number formatting
// ---------------------------------------------------------------------------

/**
 * Format a cent amount as a currency string.
 * @example formatCurrency(4999, "USD") → "$49.99"
 */
export function formatCurrency(amountInCents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amountInCents / 100);
}

/**
 * Format a number with thousands separators.
 * @example formatNumber(1234567) → "1,234,567"
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

// ---------------------------------------------------------------------------
// String formatting
// ---------------------------------------------------------------------------

/**
 * Truncate a string to a maximum length, appending "…" if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 1)}…`;
}

/**
 * Convert a string to title case.
 * @example toTitleCase("hello world") → "Hello World"
 */
export function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Convert a camelCase or PascalCase string to kebab-case.
 * @example toKebabCase("myFeatureName") → "my-feature-name"
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
}
