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
            try {
              document.cookie = `classi_session=${storedToken}; path=/; max-age=1209600; SameSite=None; Secure`;
              document.cookie = `classi_session_client=${storedToken}; path=/; max-age=1209600; SameSite=None; Secure`;
              document.cookie = `classi_session=${storedToken}; path=/; max-age=1209600; SameSite=Lax`;
              document.cookie = `classi_session_client=${storedToken}; path=/; max-age=1209600; SameSite=Lax`;
            } catch {}
          }
          setIsLoading(false);
          return;
        }
      }

      // 2. If explicit logout flag exists in this tab, prioritize logged-out state over server cookie
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

        // Set cookies with full cross-environment parameters
        document.cookie = `classi_session=${userToken}; path=/; max-age=1209600; SameSite=None; Secure`;
        document.cookie = `classi_session_client=${userToken}; path=/; max-age=1209600; SameSite=None; Secure`;
        document.cookie = `classi_session=${userToken}; path=/; max-age=1209600; SameSite=Lax`;
        document.cookie = `classi_session_client=${userToken}; path=/; max-age=1209600; SameSite=Lax`;
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

        // Expire all cookies
        document.cookie = "classi_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=None; Secure";
        document.cookie = "classi_session_client=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=None; Secure";
        document.cookie = "classi_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax";
        document.cookie = "classi_session_client=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax";
        document.cookie = "classi_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";
        document.cookie = "classi_session_client=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";

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
