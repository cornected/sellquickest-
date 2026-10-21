import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";

export async function POST() {
  await clearSession();
  const response = NextResponse.json({ ok: true, message: "Logged out successfully" });
  response.cookies.delete("classi_session");
  response.cookies.delete("classi_session_client");
  response.cookies.set("classi_session", "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    sameSite: "lax",
  });
  response.cookies.set("classi_session_client", "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    sameSite: "lax",
  });
  return response;
}

export async function GET(request: Request) {
  await clearSession();
  const response = NextResponse.redirect(new URL("/", request.url), 303);
  response.cookies.delete("classi_session");
  response.cookies.delete("classi_session_client");
  response.cookies.set("classi_session", "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    sameSite: "lax",
  });
  response.cookies.set("classi_session_client", "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    sameSite: "lax",
  });
  return response;
}
