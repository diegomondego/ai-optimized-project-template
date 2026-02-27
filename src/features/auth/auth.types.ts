/**
 * auth.types.ts
 *
 * TypeScript types and interfaces for the auth feature.
 * Colocate types next to the code that uses them.
 * Only export from here if types are needed outside this feature.
 * If types are needed cross-feature, consider moving them to src/lib/types/.
 */

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export type UserRole = "admin" | "member" | "viewer";

export interface Session {
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface AuthResult {
  user: User;
  session: Session;
}

// Typed error class — prefer typed errors over throwing plain strings
export class AuthError extends Error {
  constructor(
    message: string,
    public readonly code: "InvalidCredentials" | "UserNotFound" | "TokenExpired" | "Unauthorized"
  ) {
    super(message);
    this.name = "AuthError";
  }
}
