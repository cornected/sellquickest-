"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("ada@classi.local");
  const [password, setPassword] = useState("password123");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });
    setPending(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not sign in");
      return;
    }
    let nextUrl = params.get("next") || "/";
    if (nextUrl.startsWith("/login")) {
      nextUrl = "/";
    }
    router.push(nextUrl);
    router.refresh();
  }

  return (
    <main className="container py-5" style={{ maxWidth: 480 }}>
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4 p-md-5">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="fs-3">🔐</span>
            <h1 className="h4 fw-bold mb-0">Sign In</h1>
          </div>
          <p className="text-secondary small mb-3">
            Access your SellQuickest account, manage your ads, and chat with buyers.
          </p>

          <div
            className="p-3 mb-4 rounded-3 border"
            style={{ backgroundColor: "#f8fafc", fontSize: "13px" }}
          >
            <div className="fw-semibold text-dark mb-1">💡 Quick Demo Logins:</div>
            <div className="d-flex flex-wrap gap-2 mt-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-success fw-medium"
                style={{ fontSize: "12px", borderRadius: "8px" }}
                onClick={() => {
                  setEmail("ada@classi.local");
                  setPassword("password123");
                }}
              >
                👤 Ada (Seller / Buyer)
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary fw-medium"
                style={{ fontSize: "12px", borderRadius: "8px" }}
                onClick={() => {
                  setEmail("chidi@classi.local");
                  setPassword("password123");
                }}
              >
                👤 Chidi (Seller)
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary">
                Email Address
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

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label small fw-semibold text-secondary mb-0">
                  Password
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
                  className="btn btn-outline-secondary px-3"
                  style={{
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="alert alert-danger py-2 small rounded-3"
                role="alert"
              >
                {error}
              </div>
            )}

            <button
              disabled={pending}
              className="btn btn-sq text-white w-100 fw-bold py-2 mt-2"
              style={{ borderRadius: "10px" }}
            >
              {pending ? "Signing in…" : "Sign In"}
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
