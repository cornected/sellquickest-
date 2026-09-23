"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        password: form.get("password"),
      }),
    });
    setPending(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not create account");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="container py-5" style={{ maxWidth: 480 }}>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 p-md-5">
          <h1 className="h3 fw-bold">Create account</h1>
          <form onSubmit={onSubmit} className="mt-3">
            <div className="mb-3">
              <label className="form-label">Full name</label>
              <input name="name" required className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input name="email" type="email" required className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input name="phone" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input name="password" type="password" required minLength={6} className="form-control" />
            </div>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <button disabled={pending} className="btn btn-sq text-white w-100 fw-bold">
              {pending ? "Creating…" : "Create account"}
            </button>
          </form>
          <p className="mt-3 mb-0 small text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="fw-semibold text-sq text-decoration-none">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
