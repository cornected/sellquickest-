"use client";

/**
 * Universal client-side sign out helper.
 * Completely cleanses localStorage, client cookies, calls server logout route,
 * and forces a hard authoritative reload to the homepage to bust any cached user state.
 */
export async function performSignOut() {
  try {
    // 1. Clear all local application storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("sq_session");
      localStorage.removeItem("sq_token");
      sessionStorage.clear();

      // Expire client-accessible cookies immediately
      document.cookie = "classi_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";
      document.cookie = "classi_session_client=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";
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
    // 3. Force a complete, fresh page navigation to '/' with clean browser state
    if (typeof window !== "undefined") {
      window.location.replace("/");
    }
  }
}
