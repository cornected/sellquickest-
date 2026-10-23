"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email.trim() || !newPassword) {
      setError("Please enter your registered email address and a new password.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Your new password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim(),
          newPassword,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not reset password. Please check your email.");
        setLoading(false);
        return;
      }

      setSuccessMsg(
        data.message || "Password reset successful! Redirecting you to Sign In..."
      );
      setTimeout(() => {
        router.push("/login");
      }, 1600);
    } catch {
      setError("Network error while resetting password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="container py-5" style={{ maxWidth: 490 }}>
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="card-body p-4 p-md-5">
          <div className="d-flex align-items-center gap-2.5 mb-3">
            <span className="fs-3">🔑</span>
            <div>
              <h1 className="h4 fw-bold mb-0 text-dark">Reset Password</h1>
              <p className="text-secondary small mb-0">
                Recover access to your SellQuickest Nigeria account
              </p>
            </div>
          </div>

          {successMsg && (
            <div className="alert alert-success py-2.5 px-3 small rounded-3 mb-3">
              <strong>✓ {successMsg}</strong>
            </div>
          )}

          {error && (
            <div className="alert alert-danger py-2.5 px-3 small rounded-3 mb-3">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Registered Email Address *
              </label>
              <input
                type="email"
                className="form-control px-3 py-2"
                style={{ borderRadius: "10px" }}
                placeholder="e.g. ada@classi.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Registered Phone Number (Optional Verification)
              </label>
              <input
                type="tel"
                className="form-control px-3 py-2"
                style={{ borderRadius: "10px" }}
                placeholder="e.g. 0803 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary mb-1">
                New Password *
              </label>
              <input
                type="password"
                className="form-control px-3 py-2"
                style={{ borderRadius: "10px" }}
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                className="form-control px-3 py-2"
                style={{ borderRadius: "10px" }}
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-sq text-white w-100 fw-bold py-2.5 mt-2"
              style={{ borderRadius: "10px" }}
            >
              {loading ? "Resetting Password..." : "Reset Password & Sign In"}
            </button>
          </form>

          <p className="mt-4 mb-0 small text-center text-secondary">
            Remembered your password?{" "}
            <Link href="/login" className="fw-semibold text-sq text-decoration-none">
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
