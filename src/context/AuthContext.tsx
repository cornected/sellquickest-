"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (userData: AuthUser, userToken: string) => void;
  logout: () => Promise<void>;
  updateUser: (partial: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: true,
  login: () => {},
  logout: async () => {},
  updateUser: () => {},
});

function applyClientCookies(userToken: string) {
  if (typeof document === "undefined") return;
  try {
    // 1. Primary cookie for top-level shared link visits (Safari, Chrome, mobile)
    document.cookie = `classi_session=${userToken}; path=/; max-age=1209600; SameSite=Lax; Secure`;
    // 2. Iframe cookie for AI Studio internal preview
    document.cookie = `classi_session_iframe=${userToken}; path=/; max-age=1209600; SameSite=None; Secure`;
    // 3. Client accessible cookie
    document.cookie = `classi_session_client=${userToken}; path=/; max-age=1209600; SameSite=Lax; Secure`;
  } catch {}
}

function clearClientCookies() {
  if (typeof document === "undefined") return;
  try {
    const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/";
    document.cookie = `classi_session=; ${expired}; SameSite=Lax; Secure`;
    document.cookie = `classi_session_iframe=; ${expired}; SameSite=None; Secure`;
    document.cookie = `classi_session_client=; ${expired}; SameSite=Lax; Secure`;
    document.cookie = `classi_session=; ${expired}`;
    document.cookie = `classi_session_client=; ${expired}`;
  } catch {}
}

export function AuthProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: AuthUser | null;
}) {
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync auth state on mount and across storage events
  const syncState = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      // 1. Check local application storage first (set on login/register)
      const storedUser = localStorage.getItem("sq_session");
      const storedToken = localStorage.getItem("sq_token");

      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.id) {
          sessionStorage.removeItem("sq_explicit_logout");
          setUser(parsed);
          setToken(storedToken || null);
          if (storedToken) {
            applyClientCookies(storedToken);
          }
          setIsLoading(false);
          return;
        }
      }

      // 2. If explicit logout flag exists in this tab, prioritize logged-out state
      if (sessionStorage.getItem("sq_explicit_logout") === "true") {
        setUser(null);
        setToken(null);
        setIsLoading(false);
        return;
      }

      // 3. Fallback to server-provided session
      if (initialUser) {
        setUser(initialUser);
      } else {
        setUser(null);
        setToken(null);
      }
    } catch {
      setUser(initialUser || null);
    } finally {
      setIsLoading(false);
    }
  }, [initialUser]);

  useEffect(() => {
    syncState();

    window.addEventListener("auth-state-change", syncState);
    window.addEventListener("storage", syncState);
    return () => {
      window.removeEventListener("auth-state-change", syncState);
      window.removeEventListener("storage", syncState);
    };
  }, [syncState]);

  // Self-heal session and push any local profile/listings to server in background
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedToken = localStorage.getItem("sq_token");
    const storedUserRaw = localStorage.getItem("sq_session");

    let localUser: AuthUser | null = null;
    try {
      if (storedUserRaw) localUser = JSON.parse(storedUserRaw);
    } catch {}

    import("@/lib/clientSync")
      .then(({ syncClientDataToServer }) => {
        syncClientDataToServer();
      })
      .catch(() => {});

    const onFocusSync = () => {
      import("@/lib/clientSync")
        .then(({ syncClientDataToServer }) => {
          syncClientDataToServer();
        })
        .catch(() => {});
    };
    window.addEventListener("focus", onFocusSync);
    const intervalId = window.setInterval(onFocusSync, 6000);

    if (!storedToken) {
      return () => {
        window.removeEventListener("focus", onFocusSync);
        window.clearInterval(intervalId);
      };
    }

    fetch(`/api/auth/session`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok && data.user) {
          setUser((prev) => {
            const merged: AuthUser = {
              ...(prev || {}),
              ...data.user,
              avatarUrl: data.user.avatarUrl || prev?.avatarUrl || localUser?.avatarUrl || null,
            };
            try {
              localStorage.setItem("sq_session", JSON.stringify(merged));
            } catch {}
            return merged;
          });
          applyClientCookies(storedToken);
        }
      })
      .catch(() => {});

    return () => {
      window.removeEventListener("focus", onFocusSync);
      window.clearInterval(intervalId);
    };
  }, []);

  const login = useCallback((userData: AuthUser, userToken: string) => {
    setUser(userData);
    setToken(userToken);

    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem("sq_explicit_logout");
        localStorage.setItem("sq_session", JSON.stringify(userData));
        localStorage.setItem("sq_token", userToken);
        if (userData.email) {
          localStorage.setItem("sq_last_email", userData.email);
        }
        applyClientCookies(userToken);
      } catch {}

      window.dispatchEvent(new Event("auth-state-change"));
    }
  }, []);

  const logout = useCallback(async () => {
    // 1. Instantly clear local state so UI flips immediately
    setUser(null);
    setToken(null);

    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("sq_session");
        localStorage.removeItem("sq_token");
        sessionStorage.setItem("sq_explicit_logout", "true");
        clearClientCookies();
        window.dispatchEvent(new Event("auth-state-change"));
      } catch {}
    }

    // 2. Call server route
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch {}

    // 3. Force clean navigation
    if (typeof window !== "undefined") {
      window.location.replace("/?logout=" + Date.now());
    }
  }, []);

  const updateUser = useCallback((partial: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...partial };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("sq_session", JSON.stringify(updated));
        } catch {}
      }
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
