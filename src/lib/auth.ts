import { createHmac, timingSafeEqual } from "crypto";
import { cookies, headers } from "next/headers";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

const COOKIE = "classi_session";
const COOKIE_IFRAME = "classi_session_iframe";
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
  
  // 1. Standard first-party cookie (SameSite=Lax) for people accessing via the shared link in Safari, Chrome, Edge, mobile
  try {
    jar.set(COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });
  } catch {}

  // 2. Cross-origin iframe cookie (SameSite=None) for internal AI Studio dev preview
  try {
    jar.set(COOKIE_IFRAME, token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });
  } catch {}

  // 3. Client-accessible cookie
  try {
    jar.set(CLIENT_COOKIE, token, {
      httpOnly: false,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });
  } catch {}

  return token;
}

export async function clearSession() {
  const jar = await cookies();
  const clearOpts = [
    { sameSite: "lax" as const, secure: true },
    { sameSite: "none" as const, secure: true },
    { sameSite: "lax" as const, secure: false },
  ];

  for (const opts of clearOpts) {
    try {
      jar.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0, expires: new Date(0), ...opts });
    } catch {}
    try {
      jar.set(COOKIE_IFRAME, "", { httpOnly: true, path: "/", maxAge: 0, expires: new Date(0), ...opts });
    } catch {}
    try {
      jar.set(CLIENT_COOKIE, "", { httpOnly: false, path: "/", maxAge: 0, expires: new Date(0), ...opts });
    } catch {}
  }

  try { jar.delete(COOKIE); } catch {}
  try { jar.delete(COOKIE_IFRAME); } catch {}
  try { jar.delete(CLIENT_COOKIE); } catch {}
}

export async function getSession(): Promise<SessionUser | null> {
  // 1. Try cookies across all standard and iframe variations
  try {
    const jar = await cookies();
    const token =
      jar.get(COOKIE)?.value ||
      jar.get(COOKIE_IFRAME)?.value ||
      jar.get(CLIENT_COOKIE)?.value;
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
