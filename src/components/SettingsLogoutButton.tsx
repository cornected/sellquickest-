"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function SettingsLogoutButton() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await logout();
      }}
      className="btn btn-outline-danger btn-sm px-3 fw-semibold"
    >
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}
