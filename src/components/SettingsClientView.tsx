"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { SettingsLogoutButton } from "@/components/SettingsLogoutButton";

export function SettingsClientView({ serverUser }: { serverUser?: any }) {
  const router = useRouter();
  const { user: authUser, isLoggedIn, isLoading, login } = useAuth();
  const user = serverUser || authUser;

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  const [kycBusinessName, setKycBusinessName] = useState(user?.name || "");
  const [kycDocType, setKycDocType] = useState("NIN (National Identity Number)");
  const [kycDocNumber, setKycDocNumber] = useState("");
  const [kycDocUrl, setKycDocUrl] = useState("");
  const [kycUploading, setKycUploading] = useState(false);
  const [kycSubmitting, setKycSubmitting] = useState(false);
  const [kycRequests, setKycRequests] = useState<any[]>([]);
  const [myTickets, setMyTickets] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      setName((prev: string) => prev || user.name || "");
      setPhone((prev: string) => prev || user.phone || "");
      setKycBusinessName((prev: string) => prev || user.name || "");
    }
  }, [user]);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("sq_token") || "" : "";
    const headers: Record<string, string> = token
      ? { "x-session-token": token, Authorization: `Bearer ${token}` }
      : {};

    fetch("/api/kyc?mine=1", { headers })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.requests)) {
          setKycRequests(data.requests);
        }
      })
      .catch(() => {});

    fetch("/api/contact?mine=1", { headers })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.tickets)) {
          setMyTickets(data.tickets);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!isLoading && !isLoggedIn && !serverUser) {
      router.replace("/login?next=/settings");
    }
  }, [isLoading, isLoggedIn, serverUser, router]);

  if (isLoading && !serverUser) {
    return (
      <main className="container py-5 text-center" style={{ maxWidth: "800px" }}>
        <div className="spinner-border text-success" role="status" />
        <p className="text-secondary small mt-2">Loading settings…</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const handleKycDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setKycUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        setKycDocUrl(data.url);
      }
    } catch {
      // ignore
    } finally {
      setKycUploading(false);
      e.target.value = "";
    }
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kycBusinessName.trim() || !kycDocNumber.trim()) {
      setStatusMsg({ type: "danger", text: "Please provide your Business/Full Name and ID Number." });
      return;
    }
    setKycSubmitting(true);
    setStatusMsg(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("sq_token") || "" : "";
      const res = await fetch("/api/kyc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "x-session-token": token, Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          businessName: kycBusinessName.trim(),
          documentType: kycDocType,
          documentNumber: kycDocNumber.trim(),
          documentUrl: kycDocUrl || null,
        }),
      });
      const data = await res.json();
      if (res.ok && data.request) {
        setKycRequests((prev) => [data.request, ...prev]);
        setKycDocNumber("");
        setStatusMsg({
          type: "success",
          text: "KYC Verification submitted! Our moderation team will review your ID shortly.",
        });
        window.dispatchEvent(new Event("sq_notifications_updated"));
      } else {
        setStatusMsg({ type: "danger", text: data.error || "Failed to submit KYC verification." });
      }
    } catch {
      setStatusMsg({ type: "danger", text: "Network error submitting KYC request." });
    } finally {
      setKycSubmitting(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (!name.trim()) {
      setStatusMsg({ type: "danger", text: "Please enter your full name." });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setStatusMsg({ type: "danger", text: "New passwords do not match." });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setStatusMsg({ type: "danger", text: "New password must be at least 6 characters." });
      return;
    }

    setSaving(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("sq_token") || "" : "";
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "x-session-token": token, Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          ...(newPassword ? { newPassword } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMsg({ type: "danger", text: data.error || "Failed to update settings." });
      } else {
        if (data.user) {
          login(data.user, data.token);
        }
        setNewPassword("");
        setConfirmPassword("");
        setStatusMsg({ type: "success", text: data.message || "Account settings saved!" });
        router.refresh();
      }
    } catch {
      setStatusMsg({ type: "danger", text: "Network error saving settings. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const latestKyc = kycRequests[0];

  return (
    <main className="container py-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Account Settings</h1>
          <p className="text-secondary small mb-0">
            Manage your account security, merchant KYC verification, and preferences
          </p>
        </div>
        <Link href="/profile" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
          My Profile
        </Link>
      </div>

      {statusMsg && (
        <div className={`alert alert-${statusMsg.type} rounded-3 py-2.5 px-3 small mb-4`}>
          {statusMsg.text}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
          <h2 className="h6 fw-bold mb-3 text-dark">Personal Information</h2>
          <div className="mb-3">
            <label className="form-label text-secondary small fw-medium">Full Name *</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary small fw-medium">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+234 803 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary small fw-medium">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={user.email}
              disabled
              readOnly
            />
            <div className="form-text small text-muted">
              Contact support to change your primary registered email address.
            </div>
          </div>

          <hr className="my-3 text-muted" />

          <h2 className="h6 fw-bold mb-3 text-dark">Change Password (Optional)</h2>
          <div className="row g-3 mb-3">
            <div className="col-sm-6">
              <label className="form-label text-secondary small fw-medium">New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Leave blank to keep current"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label text-secondary small fw-medium">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn btn-sq text-white fw-semibold rounded-pill px-4 py-2 shadow-sm"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>

      {/* SELLER KYC & ID VERIFICATION CARD */}
      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <div>
            <h2 className="h6 fw-bold mb-1 text-dark">🛡️ Seller KYC &amp; Merchant Verification</h2>
            <p className="text-secondary small mb-0">
              Verify your identity or business registration (CAC / NIN) to earn the green Verified Seller badge.
            </p>
          </div>
          {latestKyc ? (
            <span
              className={`badge rounded-pill px-3 py-1.5 fw-bold ${
                latestKyc.status === "APPROVED"
                  ? "bg-success text-white"
                  : latestKyc.status === "REJECTED"
                  ? "bg-danger text-white"
                  : "bg-warning text-dark"
              }`}
            >
              {latestKyc.status === "APPROVED"
                ? "✓ Verified Merchant"
                : latestKyc.status === "REJECTED"
                ? "✕ Rejected"
                : "⏳ Pending Admin Review"}
            </span>
          ) : (
            <span className="badge bg-light text-secondary border rounded-pill px-3 py-1.5">
              Unverified
            </span>
          )}
        </div>

        <form onSubmit={handleKycSubmit} className="row g-3">
          <div className="col-sm-6">
            <label className="form-label text-secondary small fw-medium">Registered Business / Full Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Chidi Motors Ltd"
              value={kycBusinessName}
              onChange={(e) => setKycBusinessName(e.target.value)}
              required
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label text-secondary small fw-medium">Document Type *</label>
            <select
              className="form-select"
              value={kycDocType}
              onChange={(e) => setKycDocType(e.target.value)}
            >
              <option value="NIN (National Identity Number)">NIN (National Identity Number)</option>
              <option value="CAC Business Registration">CAC Business Registration</option>
              <option value="Driver's License">Driver&apos;s License</option>
              <option value="International Passport">International Passport</option>
              <option value="Voter's Card (PVC)">Voter&apos;s Card (PVC)</option>
            </select>
          </div>
          <div className="col-sm-6">
            <label className="form-label text-secondary small fw-medium">ID / RC Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. RC-1948204 or 11-digit NIN"
              value={kycDocNumber}
              onChange={(e) => setKycDocNumber(e.target.value)}
              required
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label text-secondary small fw-medium">Upload ID Document Photo (Optional)</label>
            <div className="d-flex align-items-center gap-2">
              <label className="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1.5 mb-0" style={{ cursor: "pointer" }}>
                {kycUploading ? "Uploading..." : kycDocUrl ? "✓ Document Attached" : "📎 Upload ID / CAC"}
                <input
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleKycDocUpload}
                  disabled={kycUploading}
                />
              </label>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-end pt-2">
            <button
              type="submit"
              disabled={kycSubmitting}
              className="btn btn-outline-success fw-bold rounded-pill px-4 py-2"
            >
              {kycSubmitting ? "Submitting..." : "Submit for Verification ✓"}
            </button>
          </div>
        </form>
      </div>

      {/* MY SUPPORT TICKETS & ADMIN REPLIES CARD */}
      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <div>
            <h2 className="h6 fw-bold mb-1 text-dark">🎧 My Support Tickets &amp; Replies</h2>
            <p className="text-secondary small mb-0">
              Track inquiries you submitted and read official responses from SellQuickest Support.
            </p>
          </div>
          <Link href="/contact" className="btn btn-outline-success btn-sm rounded-pill px-3 fw-semibold">
            + Open New Ticket
          </Link>
        </div>

        {myTickets.length === 0 ? (
          <div className="p-3 rounded-3 bg-light border text-center small text-secondary">
            You haven&apos;t submitted any support tickets yet. Need help?{" "}
            <Link href="/contact" className="text-sq fw-semibold text-decoration-none">
              Contact Support →
            </Link>
          </div>
        ) : (
          <div className="d-flex flex-column gap-2.5">
            {myTickets.map((t) => {
              const parts = String(t.message || "").split("\n\n--- ADMIN REPLY ---\n");
              const userInquiry = parts[0];
              const adminReply = parts[1] || "";

              return (
                <div key={t.id} className="p-3 rounded-3 bg-light border small">
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-1.5">
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-dark text-white">{t.subject}</span>
                      <span className="text-muted" style={{ fontSize: "11px" }}>
                        {new Date(t.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span
                      className={`badge rounded-pill ${
                        t.status === "RESOLVED" ? "bg-success text-white" : "bg-warning text-dark"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <p className="mb-0 text-dark">{userInquiry}</p>
                  {adminReply && (
                    <div className="mt-2 p-2.5 rounded-3 bg-success bg-opacity-10 border border-success border-opacity-25">
                      <strong className="text-success d-block mb-0.5">
                        ✓ SellQuickest Support Reply:
                      </strong>
                      <span className="text-dark">{adminReply}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
        <h2 className="h6 fw-bold mb-3 text-dark">Security &amp; Session</h2>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="fw-medium text-dark d-block">Log out of this device</span>
            <span className="text-secondary small">End your current active session on SellQuickest</span>
          </div>
          <SettingsLogoutButton />
        </div>
      </div>
    </main>
  );
}
