"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "authenticating" | "success">("idle");

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    try {
      const lastEmail = localStorage.getItem("sq_last_email");
      if (lastEmail) {
        setEmail(lastEmail);
      }
    } catch {}
  }, []);

  const isPending = status !== "idle";

  async function executeLogin(targetEmail: string, targetPass: string) {
    setError("");
    setStatus("authenticating");

    const cleanEmail = targetEmail.trim().toLowerCase();
    let localAccount: any = null;
    try {
      const regMapRaw = localStorage.getItem("sq_registered_users");
      if (regMapRaw) {
        const regMap = JSON.parse(regMapRaw);
        if (regMap && regMap[cleanEmail]) {
          localAccount = regMap[cleanEmail];
        }
      }
    } catch {}

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          password: targetPass,
          name: localAccount?.name || undefined,
          phone: localAccount?.phone || undefined,
          clientVerified:
            Boolean(localAccount && localAccount.password === targetPass) || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Invalid email or password. Please try again.");
        setStatus("idle");
        return;
      }

      // Success state
      setStatus("success");

      if (data.token && data.user) {
        try {
          const regMapRaw = localStorage.getItem("sq_registered_users");
          const regMap = regMapRaw ? JSON.parse(regMapRaw) : {};
          regMap[cleanEmail] = {
            ...data.user,
            password: targetPass,
          };
          localStorage.setItem("sq_registered_users", JSON.stringify(regMap));
          localStorage.setItem("sq_last_email", cleanEmail);
        } catch {}
        login(data.user, data.token);
      }

      let nextUrl = params.get("next") || "/";
      if (nextUrl.startsWith("/login")) {
        nextUrl = "/";
      }

      // Perform clean navigation
      setTimeout(() => {
        router.push(nextUrl);
        router.refresh();
      }, 250);
    } catch {
      setError("Network error connecting to authentication service. Please retry.");
      setStatus("idle");
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    await executeLogin(email, password);
  }

  async function handleQuickDemo(demoEmail: string) {
    setEmail(demoEmail);
    setPassword("password123");
    await executeLogin(demoEmail, "password123");
  }

  return (
    <main className="container py-5" style={{ maxWidth: 490 }}>
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        {/* Top Loading Progress Bar */}
        {isPending && (
          <div
            className="progress"
            style={{ height: "4px", borderRadius: 0, backgroundColor: "#e2e8f0" }}
          >
            <div
              className={`progress-bar progress-bar-striped progress-bar-animated ${
                status === "success" ? "bg-success" : "bg-primary"
              }`}
              style={{ width: status === "success" ? "100%" : "70%", transition: "width 0.4s ease" }}
            />
          </div>
        )}

        <div className="card-body p-4 p-md-5">
          <div className="d-flex align-items-center gap-2.5 mb-2">
            <span className="fs-3">🔐</span>
            <div>
              <h1 className="h4 fw-bold mb-0 text-dark">Sign In</h1>
              <p className="text-secondary small mb-0">
                Welcome back to SellQuickest Nigeria
              </p>
            </div>
          </div>

          {/* Quick 1-Click Demo Login Bar */}
          <div
            className="p-3 my-3.5 rounded-3 border"
            style={{ backgroundColor: "#f8fafc", fontSize: "13px" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-1.5">
              <span className="fw-bold text-dark">⚡ 1-Click Demo Sign In:</span>
              <span className="text-muted small" style={{ fontSize: "11px" }}>
                Instant Access
              </span>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleQuickDemo("ada@classi.local")}
                className="btn btn-sm btn-outline-success bg-white px-2.5 py-1.5 fw-medium d-inline-flex align-items-center gap-1.5 shadow-2xs"
                style={{ fontSize: "12px", borderRadius: "8px" }}
              >
                <span>👤</span> Ada Obi (Seller)
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleQuickDemo("chidi@classi.local")}
                className="btn btn-sm btn-outline-secondary bg-white px-2.5 py-1.5 fw-medium d-inline-flex align-items-center gap-1.5 shadow-2xs"
                style={{ fontSize: "12px", borderRadius: "8px" }}
              >
                <span>👤</span> Chidi Eze (Verified)
              </button>
            </div>
          </div>

          {/* Success Banner */}
          {status === "success" && (
            <div className="alert alert-success d-flex align-items-center gap-2 py-2.5 px-3 rounded-3 small mb-3 border-0 shadow-2xs">
              <span className="spinner-border spinner-border-sm text-success" role="status" />
              <div>
                <span className="fw-bold">Sign in successful!</span> Redirecting to marketplace...
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && status !== "success" && (
            <div
              className="alert alert-danger py-2 px-3 small rounded-3 mb-3 d-flex align-items-center gap-2 border-0 shadow-2xs"
              role="alert"
            >
              <span>⚠️</span>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={onSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                disabled={isPending}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="form-control px-3 py-2"
                style={{ borderRadius: "10px" }}
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label small fw-semibold text-secondary mb-0">
                  Password
                </label>
                <div className="d-flex align-items-center gap-3">
                  <Link
                    href="/forgot-password"
                    className="text-decoration-none small text-secondary"
                    style={{ fontSize: "12px" }}
                  >
                    Forgot password?
                  </Link>
                  <button
                    type="button"
                    tabIndex={-1}
                    disabled={isPending}
                    className="btn btn-link p-0 text-decoration-none small text-sq fw-semibold"
                    style={{ fontSize: "12px" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="input-group">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isPending}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="form-control px-3 py-2"
                  style={{
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                />
                <button
                  type="button"
                  disabled={isPending}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-sq text-white w-100 fw-bold py-2.5 mt-2 d-flex align-items-center justify-content-center gap-2"
              style={{
                borderRadius: "10px",
                backgroundColor: status === "success" ? "#059669" : "#10b981",
                border: "none",
                fontSize: "15px",
                transition: "all 0.2s ease",
              }}
            >
              {status === "authenticating" ? (
                <>
                  <span className="spinner-border spinner-border-sm text-white" role="status" />
                  <span>Signing in…</span>
                </>
              ) : status === "success" ? (
                <>
                  <span>✓</span>
                  <span>Verified! Redirecting…</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          <p className="mt-4 mb-0 small text-center text-secondary">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="fw-semibold text-sq text-decoration-none"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
