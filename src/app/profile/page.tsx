import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProfileAvatarUploader } from "@/components/ProfileAvatarUploader";

export default async function ProfilePage() {
  const sessionUser = await getSession();
  if (!sessionUser) redirect("/login?next=/profile");

  const dbUser = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    include: {
      _count: {
        select: { listings: true },
      },
    },
  });

  return (
    <main className="container py-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">My Profile</h1>
          <p className="text-secondary small mb-0">Manage your merchant profile and personal details</p>
        </div>
        <div className="d-flex gap-2">
          <Link href={`/seller/${sessionUser.id}`} className="btn btn-outline-success btn-sm rounded-pill px-3">
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
          initialAvatarUrl={dbUser?.avatarUrl}
          userName={sessionUser.name}
          userEmail={sessionUser.email}
        />

        <div className="row g-3 pt-2">
          <div className="col-12 col-sm-6">
            <div className="p-3 bg-light rounded-3">
              <span className="text-muted small d-block">Phone Number</span>
              <strong className="text-dark">{dbUser?.phone || "Not provided"}</strong>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="p-3 bg-light rounded-3">
              <span className="text-muted small d-block">Total Ads Posted</span>
              <strong className="text-dark">{dbUser?._count.listings ?? 0} ads</strong>
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
              <strong className="text-dark">
                {dbUser?.createdAt ? new Date(dbUser.createdAt).getFullYear() : "2024"}
              </strong>
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
