import { createHmac, timingSafeEqual } from "crypto";
import { cookies, headers } from "next/headers";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

const COOKIE = "classi_session";
const CLIENT_COOKIE = "classi_session_client";

function secret() {
  return process.env.SESSION_SECRET ?? "classi-dev-secret-change-in-production";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSessionToken(user: SessionUser): string {
  const payload = Buffer.from(JSON.stringify(user), "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string): SessionUser | null {
  if (!token) return null;
  const clean = token.replace(/^Bearer\s+/i, "").trim();
  const [payload, signature] = clean.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SessionUser;
  } catch {
    return null;
  }
}

export async function setSession(user: SessionUser): Promise<string> {
  const token = createSessionToken(user);
  const jar = await cookies();
  
  // Set SameSite=None and Secure=true for cross-origin iframe compatibility in AI Studio preview
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  jar.set(CLIENT_COOKIE, token, {
    httpOnly: false,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return token;
}

export async function clearSession() {
  const jar = await cookies();
  try {
    jar.set(COOKIE, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
    jar.delete(COOKIE);
  } catch {}

  try {
    jar.set(CLIENT_COOKIE, "", {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
    jar.delete(CLIENT_COOKIE);
  } catch {}
}

export async function getSession(): Promise<SessionUser | null> {
  // 1. Try primary HTTP-only cookie
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE)?.value || jar.get(CLIENT_COOKIE)?.value;
    if (token) {
      const user = verifySessionToken(token);
      if (user) return user;
    }
  } catch {}

  // 2. Try headers fallback (for API requests passing Authorization or session headers)
  try {
    const reqHeaders = await headers();
    const authHeader = reqHeaders.get("authorization") || reqHeaders.get("x-session-token");
    if (authHeader) {
      const user = verifySessionToken(authHeader);
      if (user) return user;
    }
  } catch {}

  return null;
}
