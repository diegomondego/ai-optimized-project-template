/**
 * auth.service.ts
 *
 * Business logic for the auth feature.
 *
 * Rules for service files:
 * - Pure functions wherever possible (easier to test)
 * - No knowledge of HTTP, Next.js, or UI
 * - Receives typed inputs, returns typed outputs
 * - Throws typed errors (AuthError) — never raw strings
 * - Keep this file under 300 lines; split if it grows beyond that
 */

import type { LoginInput, RegisterInput } from "./auth.schema";
import type { AuthResult, User } from "./auth.types";
import { AuthError } from "./auth.types";

// ---------------------------------------------------------------------------
// Replace these stubs with your actual database / auth library calls
// ---------------------------------------------------------------------------

async function findUserByEmail(email: string): Promise<User | null> {
  // TODO: replace with: return db.user.findUnique({ where: { email } });
  void email;
  return null;
}

async function verifyPassword(plain: string, hashed: string): Promise<boolean> {
  // TODO: replace with: return bcrypt.compare(plain, hashed);
  void plain;
  void hashed;
  return false;
}

async function createSession(userId: string): Promise<string> {
  // TODO: replace with JWT signing or database session creation
  void userId;
  return "session-token-placeholder";
}

// ---------------------------------------------------------------------------
// Exported service functions
// ---------------------------------------------------------------------------

/**
 * Authenticate a user with email + password.
 * Returns user and session on success; throws AuthError on failure.
 */
export async function login(credentials: LoginInput): Promise<AuthResult> {
  const user = await findUserByEmail(credentials.email);

  if (!user) {
    throw new AuthError("No account found with that email address.", "UserNotFound");
  }

  // TODO: pass user.passwordHash from the database record
  const passwordHash = "hashed-password-placeholder";
  const isValid = await verifyPassword(credentials.password, passwordHash);

  if (!isValid) {
    throw new AuthError("Incorrect password.", "InvalidCredentials");
  }

  const token = await createSession(user.id);

  return {
    user,
    session: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  };
}

/**
 * Register a new user account.
 * Returns user and session on success; throws AuthError if email already exists.
 */
export async function register(payload: RegisterInput): Promise<AuthResult> {
  const existing = await findUserByEmail(payload.email);

  if (existing) {
    throw new AuthError("An account with this email already exists.", "InvalidCredentials");
  }

  // TODO: hash the password and create the user in the database
  const newUser: User = {
    id: crypto.randomUUID(),
    email: payload.email,
    name: payload.name,
    role: "member",
    createdAt: new Date(),
  };

  const token = await createSession(newUser.id);

  return {
    user: newUser,
    session: {
      userId: newUser.id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  };
}

// Export as a namespace object for convenience
export const authService = { login, register };
