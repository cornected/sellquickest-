import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";

export async function POST() {
  await clearSession();
  const response = NextResponse.json({ ok: true, message: "Logged out successfully" });
  
  const cookieNames = ["classi_session", "classi_session_iframe", "classi_session_client"];
  const variations = [
    { sameSite: "lax" as const, secure: true },
    { sameSite: "none" as const, secure: true },
    { sameSite: "lax" as const, secure: false },
  ];

  for (const name of cookieNames) {
    for (const v of variations) {
      try {
        response.cookies.set(name, "", {
          path: "/",
          maxAge: 0,
          expires: new Date(0),
          ...v,
        });
      } catch {}
    }
    try {
      response.cookies.delete(name);
    } catch {}
  }

  return response;
}

export async function GET(request: Request) {
  await clearSession();
  const response = NextResponse.redirect(new URL("/?logged_out=" + Date.now(), request.url), 303);

  const cookieNames = ["classi_session", "classi_session_iframe", "classi_session_client"];
  const variations = [
    { sameSite: "lax" as const, secure: true },
    { sameSite: "none" as const, secure: true },
    { sameSite: "lax" as const, secure: false },
  ];

  for (const name of cookieNames) {
    for (const v of variations) {
      try {
        response.cookies.set(name, "", {
          path: "/",
          maxAge: 0,
          expires: new Date(0),
          ...v,
        });
      } catch {}
    }
    try {
      response.cookies.delete(name);
    } catch {}
  }

  return response;
}
