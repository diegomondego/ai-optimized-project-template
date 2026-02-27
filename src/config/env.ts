/**
 * env.ts
 *
 * Parse and validate environment variables at startup.
 * This is the ONLY place that reads process.env.
 * Import from here in feature code — never read process.env directly.
 *
 * Uses Zod for runtime validation. If any required variable is missing,
 * the app will throw at startup rather than fail silently at runtime.
 */

import { z } from "zod";

const envSchema = z.object({
  // App
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url(),

  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // Auth (replace with your auth provider's variables)
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters"),

  // Stripe (billing)
  STRIPE_SECRET_KEY: z.string().startsWith("sk_").optional(),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_").optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_").optional(),

  // Email (replace with your provider: Resend, SendGrid, etc.)
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().default("noreply@example.com"),
});

// Throws if any required variable is missing
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables. Check the logs above.");
}

export const env = parsed.data;
