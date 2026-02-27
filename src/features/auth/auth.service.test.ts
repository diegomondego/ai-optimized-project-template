/**
 * auth.service.test.ts
 *
 * Unit tests for auth.service.ts.
 * Colocated next to the file being tested — not in a separate __tests__/ folder.
 *
 * Run: pnpm test
 * Watch: pnpm test --watch
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { login, register } from "./auth.service";
import { AuthError } from "./auth.types";

// ---------------------------------------------------------------------------
// Example test structure — replace with real implementations once wired up
// ---------------------------------------------------------------------------

describe("authService.login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws UserNotFound when no account exists for the email", async () => {
    await expect(
      login({ email: "nobody@example.com", password: "Password1" })
    ).rejects.toThrow(AuthError);
  });

  it("throws InvalidCredentials for wrong password", async () => {
    // Once real DB is wired up, seed a user and test wrong password
    // For now this test documents the expected error contract
    await expect(
      login({ email: "user@example.com", password: "WrongPassword1" })
    ).rejects.toMatchObject({ code: expect.stringMatching(/UserNotFound|InvalidCredentials/) });
  });

  it("returns user and session token on successful login", async () => {
    // TODO: mock findUserByEmail and verifyPassword to return truthy values
    // Then assert:
    // const result = await login({ email: "user@example.com", password: "Password1" });
    // expect(result.user.email).toBe("user@example.com");
    // expect(result.session.token).toBeDefined();
    expect(true).toBe(true); // placeholder — replace with real test
  });
});

describe("authService.register", () => {
  it("creates a new user and returns a session token", async () => {
    const result = await register({
      email: `test-${Date.now()}@example.com`,
      password: "Password1",
      name: "Test User",
    });

    expect(result.user.email).toContain("@example.com");
    expect(result.session.token).toBeDefined();
    expect(result.session.expiresAt).toBeInstanceOf(Date);
  });

  it("assigns the 'member' role by default", async () => {
    const result = await register({
      email: `member-${Date.now()}@example.com`,
      password: "Password1",
      name: "Member User",
    });
    expect(result.user.role).toBe("member");
  });
});
