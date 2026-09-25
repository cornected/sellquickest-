import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { NotificationsClient } from "./NotificationsClient";

export default async function NotificationsPage() {
  const user = await getSession();
  if (!user) redirect("/login?next=/notifications");

  return (
    <main className="container py-4" style={{ maxWidth: "800px" }}>
      {/* BREADCRUMB */}
      <nav aria-label="breadcrumb" className="mb-2">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            Notifications
          </li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Notifications & Alerts</h1>
          <p className="text-secondary small mb-0">
            Important updates about your ads, buyer inquiries, and chat messages
          </p>
        </div>
        <Link href="/my-ads" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
          My Ads
        </Link>
      </div>

      <NotificationsClient />
    </main>
  );
}
