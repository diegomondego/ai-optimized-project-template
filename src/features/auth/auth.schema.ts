/**
 * auth.schema.ts
 *
 * Zod validation schemas for the auth feature.
 * Use these schemas at the API boundary (route handlers) to validate input
 * before it reaches service functions.
 * Never trust raw user input — always validate first.
 */

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Must be a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Must be a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
});

// Infer types from schemas to avoid duplication between Zod and TypeScript types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
