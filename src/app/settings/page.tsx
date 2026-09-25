import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await getSession();
  if (!user) redirect("/login?next=/settings");

  return (
    <main className="container py-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Account Settings</h1>
          <p className="text-secondary small mb-0">
            Manage your account security and preferences
          </p>
        </div>
        <Link href="/profile" className="btn btn-outline-secondary btn-sm">
          My Profile
        </Link>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
        <h2 className="h6 fw-bold mb-3 text-dark">Personal Information</h2>
        <div className="mb-3">
          <label className="form-label text-secondary small fw-medium">Full Name</label>
          <input
            type="text"
            className="form-control"
            defaultValue={user.name}
            disabled
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-secondary small fw-medium">Email Address</label>
          <input
            type="email"
            className="form-control"
            defaultValue={user.email}
            disabled
            readOnly
          />
          <div className="form-text small text-muted">
            Contact support to change your primary registered email address.
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
        <h2 className="h6 fw-bold mb-3 text-dark">Security & Session</h2>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="fw-medium text-dark d-block">Log out of this device</span>
            <span className="text-secondary small">End your current active session on SellQuickest</span>
          </div>
          <Link href="/api/auth/logout" className="btn btn-outline-danger btn-sm px-3">
            Log out
          </Link>
        </div>
      </div>
    </main>
  );
}
