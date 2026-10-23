"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { useAuth } from "@/context/AuthContext";

function RegisterForm() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const nextTarget = searchParams.get("next") || "/";

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true); // checked by default for convenience

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Quick Demo Login helper
  async function quickLogin(demoEmail: string) {
    setError("");
    setPending(true);
    setSuccessMsg("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: demoEmail, password: "password123" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSuccessMsg("Signed in! Redirecting to marketplace...");
        if (data.token && data.user) {
          login(data.user, data.token);
        }
        setTimeout(() => {
          window.location.href = nextTarget;
        }, 300);
      } else {
        setPending(false);
        setError(data.error || "Demo sign-in failed");
      }
    } catch {
      setPending(false);
      setError("Network error connecting. Please try again.");
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy to create an account.");
      return;
    }

    setPending(true);
    const cleanEmail = email.trim().toLowerCase();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: cleanEmail,
          phone: phone.trim() || null,
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPending(false);
        setError(data.error || "Could not create account");
        return;
      }

      setSuccessMsg("Account created! Redirecting to marketplace...");
      if (data.token && data.user) {
        try {
          const regMapRaw = localStorage.getItem("sq_registered_users");
          const regMap = regMapRaw ? JSON.parse(regMapRaw) : {};
          regMap[cleanEmail] = {
            ...data.user,
            phone: phone.trim() || null,
            password,
          };
          localStorage.setItem("sq_registered_users", JSON.stringify(regMap));
          localStorage.setItem("sq_last_email", cleanEmail);
        } catch {}
        login(data.user, data.token);
      }

      setTimeout(() => {
        window.location.href = nextTarget;
      }, 300);
    } catch (err: any) {
      setPending(false);
      setError(err?.message || "Network error. Please try again.");
    }
  }

  return (
    <main className="container py-5" style={{ maxWidth: 520 }}>
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4 p-md-5">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="fs-3">📝</span>
            <h1 className="h4 fw-bold mb-0">Create Account</h1>
          </div>
          <p className="text-secondary small mb-3">
            Join SellQuickest Nigeria to post ads, manage listings, and connect with buyers.
          </p>

          {/* Quick Demo Access Bar */}
          <div
            className="p-3 mb-4 rounded-3 border"
            style={{ backgroundColor: "#f8fafc", fontSize: "13px" }}
          >
            <div className="fw-semibold text-dark mb-1">⚡ Quick Demo Test:</div>
            <div className="text-muted small mb-2">
              Want to test posting ads or managing listings instantly?
            </div>
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                disabled={pending}
                onClick={() => quickLogin("corneliusokabichi@gmail.com")}
                className="btn btn-sm btn-outline-success bg-white px-2.5 py-1 fw-semibold"
                style={{ fontSize: "12px", borderRadius: "8px" }}
              >
                👑 Cornelius (Creator)
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => quickLogin("ada@classi.local")}
                className="btn btn-sm btn-outline-secondary bg-white px-2.5 py-1"
                style={{ fontSize: "12px", borderRadius: "8px" }}
              >
                👤 Ada Obi (Seller)
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => quickLogin("chidi@classi.local")}
                className="btn btn-sm btn-outline-secondary bg-white px-2.5 py-1"
                style={{ fontSize: "12px", borderRadius: "8px" }}
              >
                👤 Chidi Eze (Verified)
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tunde Balogun"
                className="form-control px-3 py-2"
                style={{ borderRadius: "10px" }}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="form-control px-3 py-2"
                style={{ borderRadius: "10px" }}
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Phone Number <span className="text-muted fw-normal">(Optional)</span>
              </label>
              <input
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08012345678"
                className="form-control px-3 py-2"
                style={{ borderRadius: "10px" }}
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label small fw-semibold text-secondary mb-0">
                  Password <span className="text-danger">*</span>
                </label>
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none small text-sq fw-semibold"
                  style={{ fontSize: "12px" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="input-group">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="form-control px-3 py-2"
                  style={{
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary px-3"
                  style={{
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label small fw-semibold text-secondary mb-0">
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none small text-sq fw-semibold"
                  style={{ fontSize: "12px" }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="input-group">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className={`form-control px-3 py-2 ${
                    confirmPassword && password !== confirmPassword ? "is-invalid" : ""
                  }`}
                  style={{
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary px-3"
                  style={{
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? "👁️" : "🙈"}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <div className="text-danger small mt-1">Passwords do not match</div>
              )}
            </div>

            {/* Terms & Privacy Agreement */}
            <div className="form-check mb-4 mt-2">
              <input
                id="agreeTerms"
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="form-check-input"
                style={{ cursor: "pointer" }}
              />
              <label
                htmlFor="agreeTerms"
                className="form-check-label small text-secondary"
                style={{ cursor: "pointer", lineHeight: 1.4 }}
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  className="fw-semibold text-sq text-decoration-none"
                >
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="fw-semibold text-sq text-decoration-none"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {successMsg && (
              <div className="alert alert-success py-2.5 px-3 small rounded-3 mb-3 d-flex align-items-center gap-2 border-0 shadow-2xs">
                <span className="spinner-border spinner-border-sm text-success" role="status" />
                <div>
                  <span className="fw-bold">Success!</span> {successMsg}
                </div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger py-2 small rounded-3 mb-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="btn btn-sq text-white w-100 fw-bold py-2.5 d-flex align-items-center justify-content-center gap-2"
              style={{
                borderRadius: "10px",
                fontSize: "15px",
                backgroundColor: successMsg ? "#059669" : "#10b981",
                border: "none",
                transition: "all 0.2s ease",
              }}
            >
              {pending ? (
                <>
                  <span className="spinner-border spinner-border-sm text-white" role="status" />
                  <span>{successMsg ? "Redirecting…" : "Creating Account…"}</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          <p className="mt-4 mb-0 small text-center text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="fw-semibold text-sq text-decoration-none">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
