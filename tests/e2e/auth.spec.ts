/**
 * auth.spec.ts — End-to-end auth flows
 *
 * Run: pnpm e2e
 * Runs against a live (local) dev server — ensure `pnpm dev` is running.
 *
 * Playwright configuration is in playwright.config.ts at the project root.
 */

import { test, expect } from "@playwright/test";

test.describe("Authentication flows", () => {
  test("visitor sees the home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/your project name/i);
  });

  test("unauthenticated user is redirected to login from protected routes", async ({ page }) => {
    await page.goto("/dashboard");
    // Expect redirect to login page
    await expect(page).toHaveURL(/\/login/);
  });

  test("user can log in and reach the dashboard", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill("user@example.com");
    await page.getByLabel("Password").fill("Password1");
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
  });

  test("user sees error message for wrong password", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill("user@example.com");
    await page.getByLabel("Password").fill("WrongPassword1");
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page.getByRole("alert")).toContainText(/incorrect password/i);
  });
});
