import Link from "next/link";
import type { Metadata } from "next";
import { ReportForm } from "./ReportForm";

export const metadata: Metadata = {
  title: "Report an Ad or Scam — SellQuickest Nigeria Trust & Safety",
  description:
    "Report suspicious listings, fraudulent sellers, or prohibited items on SellQuickest. Help us keep the marketplace safe.",
};

export default function ReportPage() {
  return (
    <main className="container py-4 pb-5" style={{ maxWidth: "860px" }}>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            Report an Ad
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white text-center">
        <span className="badge bg-danger bg-opacity-10 text-danger fw-bold px-3 py-1.5 rounded-pill mx-auto mb-2">
          🚩 TRUST &amp; SAFETY DESK
        </span>
        <h1 className="fw-bold text-dark mb-2">Report a Suspicious Ad or Seller</h1>
        <p className="lead text-secondary mx-auto mb-0" style={{ maxWidth: "600px" }}>
          We investigate all reports within 4 hours. Help us eliminate fraud, counterfeit items, and dishonest sellers.
        </p>
      </div>

      <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
        <ReportForm />
      </div>

      <div className="card border-0 rounded-4 shadow-sm p-4 bg-light">
        <h2 className="h6 fw-bold text-dark mb-2">What happens after you submit?</h2>
        <ol className="text-secondary small mb-0 d-flex flex-column gap-1.5 ps-3" style={{ lineHeight: "1.6" }}>
          <li>Our Trust &amp; Safety team verifies the ad details against our fraud detection database.</li>
          <li>If fraudulent, the listing is permanently deleted and the seller&apos;s phone/account is blacklisted.</li>
          <li>In serious cases involving theft or financial extortion, records are forwarded to relevant authorities.</li>
        </ol>
      </div>
    </main>
  );
}
