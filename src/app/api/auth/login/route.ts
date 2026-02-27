/**
 * route.ts — POST /api/auth/login
 *
 * Thin API route handler. Three responsibilities only:
 * 1. Validate input
 * 2. Call the auth service
 * 3. Return a response
 *
 * No business logic lives here.
 */

import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/features/auth/auth.schema";
import { authService } from "@/features/auth/auth.service";
import { AuthError } from "@/features/auth/auth.types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const result = await authService.login(parsed.data);

    // Set session cookie (or return token — depends on your auth strategy)
    const response = NextResponse.json({ user: result.user }, { status: 200 });
    response.cookies.set("session", result.session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: result.session.expiresAt,
      path: "/",
    });
    return response;
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: 401 });
    }
    console.error("[POST /api/auth/login]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
