"use client";

import { useState } from "react";
import { performSignOut } from "@/lib/clientAuth";

export function SettingsLogoutButton() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await performSignOut();
      }}
      className="btn btn-outline-danger btn-sm px-3 fw-semibold"
    >
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}
