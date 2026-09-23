"use client";

import { useEffect } from "react";

export function BootstrapClient() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Dynamic import in browser environment
      import("bootstrap/dist/js/bootstrap.bundle.min.js").catch(() => {});
    }
  }, []);
  return null;
}
