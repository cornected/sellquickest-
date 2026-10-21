import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";

export async function POST() {
  await clearSession();
  const response = NextResponse.json({ ok: true, message: "Logged out successfully" });
  
  // Clear cross-origin iframe cookie (SameSite=None; Secure)
  response.cookies.set("classi_session", "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  response.cookies.set("classi_session_client", "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });

  // Clear standard Lax cookie
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

  response.cookies.delete("classi_session");
  response.cookies.delete("classi_session_client");
  return response;
}

export async function GET(request: Request) {
  await clearSession();
  const response = NextResponse.redirect(new URL("/?logged_out=" + Date.now(), request.url), 303);

  // Clear cross-origin iframe cookie (SameSite=None; Secure)
  response.cookies.set("classi_session", "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  response.cookies.set("classi_session_client", "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });

  // Clear standard Lax cookie
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

  response.cookies.delete("classi_session");
  response.cookies.delete("classi_session_client");
  return response;
}
