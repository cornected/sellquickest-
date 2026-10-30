"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProfileAvatarUploader } from "@/components/ProfileAvatarUploader";

export function ProfileClientView({
  serverSessionUser,
  dbUser,
}: {
  serverSessionUser?: any;
  dbUser?: any;
}) {
  const router = useRouter();
  const { user: authUser, isLoggedIn, isLoading } = useAuth();
  const user = serverSessionUser || authUser;
  const [clientAdsCount, setClientAdsCount] = useState<number | null>(
    typeof dbUser?._count?.listings === "number" ? dbUser._count.listings : null
  );

  useEffect(() => {
    if (!isLoading && !isLoggedIn && !serverSessionUser) {
      router.replace("/login?next=/profile");
    }
  }, [isLoading, isLoggedIn, serverSessionUser, router]);

  useEffect(() => {
    if (!user?.id && !user?.email) return;
    const qs = new URLSearchParams({ status: "ALL" });
    if (user.id) qs.set("sellerId", String(user.id));
    if (user.email) qs.set("sellerEmail", String(user.email));
    if (user.name) qs.set("sellerName", String(user.name));
    fetch(`/api/listings?${qs.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.listings)) {
          setClientAdsCount(data.listings.length);
        }
      })
      .catch(() => {});
  }, [user?.id, user?.email, user?.name]);

  if (isLoading && !serverSessionUser) {
    return (
      <main className="container py-5 text-center" style={{ maxWidth: "800px" }}>
        <div className="spinner-border text-success" role="status" />
        <p className="text-secondary small mt-2">Loading profile…</p>
      </main>
    );
  }

  if (!user) return null;

  const phone = dbUser?.phone || user.phone || "Not provided";
  const listingsCount = clientAdsCount ?? dbUser?._count?.listings ?? 2;
  const memberSince = dbUser?.createdAt
    ? new Date(dbUser.createdAt).getFullYear()
    : "2026";

  return (
    <main className="container py-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">My Profile</h1>
          <p className="text-secondary small mb-0">Manage your merchant profile and personal details</p>
        </div>
        <div className="d-flex gap-2">
          <Link href={`/seller/${user.id}`} className="btn btn-outline-success btn-sm rounded-pill px-3">
            View My Storefront 🏪
          </Link>
          <Link href="/my-ads" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
            Manage Ads
          </Link>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
        {/* INTERACTIVE AVATAR UPLOADER */}
        <ProfileAvatarUploader
          initialAvatarUrl={dbUser?.avatarUrl || user.avatarUrl}
          userId={user.id}
          userName={user.name}
          userEmail={user.email}
        />

        <div className="row g-3 pt-2">
          <div className="col-12 col-sm-6">
            <div className="p-3 bg-light rounded-3">
              <span className="text-muted small d-block">Phone Number</span>
              <strong className="text-dark">{phone}</strong>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="p-3 bg-light rounded-3">
              <span className="text-muted small d-block">Total Ads Posted</span>
              <strong className="text-dark">{listingsCount} ads</strong>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="p-3 bg-light rounded-3">
              <span className="text-muted small d-block">Merchant Status</span>
              <strong className="text-success">Active & Verified ✓</strong>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="p-3 bg-light rounded-3">
              <span className="text-muted small d-block">Member Since</span>
              <strong className="text-dark">{memberSince}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3.5 flex-wrap pt-1">
        <Link href="/post" className="btn btn-sq text-white fw-semibold rounded-pill px-4 py-2.5 shadow-sm">
          + Post New Ad
        </Link>
        <Link href="/settings" className="btn btn-outline-secondary rounded-pill px-4 py-2.5 fw-medium">
          Account Settings
        </Link>
      </div>
    </main>
  );
}
