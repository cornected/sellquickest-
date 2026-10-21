"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PostAdForm } from "@/components/PostAdForm";

interface PostAuthGuardProps {
  serverUser: any;
  categories: any[];
}

export function PostAuthGuard({ serverUser, categories }: PostAuthGuardProps) {
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

    // Not authorized in either cookie or localStorage -> redirect to login
    router.replace("/login?next=/post");
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

  return <PostAdForm categories={categories} />;
}
