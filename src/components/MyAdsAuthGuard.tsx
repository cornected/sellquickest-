"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MyAdsManager } from "@/app/my-ads/MyAdsManager";

interface MyAdsAuthGuardProps {
  serverUser: any;
  initialListings: any[];
}

export function MyAdsAuthGuard({ serverUser, initialListings }: MyAdsAuthGuardProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(!serverUser);
  const [authorized, setAuthorized] = useState(!!serverUser);

  useEffect(() => {
    if (serverUser) {
      setAuthorized(true);
      setChecking(false);
      return;
    }

    try {
      const stored = localStorage.getItem("sq_session");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id) {
          setAuthorized(true);
          setChecking(false);
          return;
        }
      }
    } catch {}

    // Not authorized in either cookie or localStorage
    router.replace("/login?next=/my-ads");
  }, [serverUser, router]);

  if (checking) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
        <p className="text-secondary small mt-2">Checking account session…</p>
      </div>
    );
  }

  if (!authorized) return null;

  return <MyAdsManager initialListings={initialListings} />;
}
