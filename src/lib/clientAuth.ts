"use client";

/**
 * Universal client-side sign out helper.
 * Completely cleanses localStorage, client cookies across all attribute variations,
 * calls server logout route, and forces a hard authoritative reload to bust any cached user state.
 */
export async function performSignOut() {
  try {
    // 1. Clear all local application storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("sq_session");
      localStorage.removeItem("sq_token");
      sessionStorage.clear();

      // Explicitly mark an explicit logged-out flag for 60 seconds
      sessionStorage.setItem("sq_explicit_logout", "true");

      // Expire client-accessible cookies across SameSite=None, Lax, and default
      document.cookie =
        "classi_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=None; Secure";
      document.cookie =
        "classi_session_iframe=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=None; Secure";
      document.cookie =
        "classi_session_client=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=None; Secure";

      document.cookie =
        "classi_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax; Secure";
      document.cookie =
        "classi_session_iframe=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax; Secure";
      document.cookie =
        "classi_session_client=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax; Secure";

      document.cookie =
        "classi_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";
      document.cookie =
        "classi_session_iframe=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";
      document.cookie =
        "classi_session_client=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";

      // Dispatch event to immediately flip UI
      window.dispatchEvent(new Event("auth-state-change"));
    }

    // 2. Call server route to remove HTTP-only cookies
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Sign out error:", err);
  } finally {
    // 3. Force a complete fresh navigation to '/' with timestamp cache-buster
    if (typeof window !== "undefined") {
      window.location.replace("/?logout=" + Date.now());
    }
  }
}
