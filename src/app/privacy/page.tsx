import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SellQuickest Nigeria",
  description:
    "Learn how SellQuickest collects, protects, and handles your personal data in compliance with the Nigeria Data Protection Act (NDPA).",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </li>
        </ol>
      </nav>

      <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
        <div className="border-bottom pb-3 mb-3">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold px-3 py-1.5 rounded-pill mb-2">
            DATA PROTECTION
          </span>
          <h1 className="fw-bold text-dark mb-1">Privacy Policy</h1>
          <p className="text-muted small mb-0">Compliant with Nigeria Data Protection Regulation (NDPR / NDPA)</p>
        </div>

        <div className="text-secondary d-flex flex-column gap-4" style={{ lineHeight: "1.75", fontSize: "0.95rem" }}>
          <section>
            <h2 className="h5 fw-bold text-dark mb-2">1. Overview</h2>
            <p>
              At SellQuickest, we are committed to respecting and protecting your privacy. This policy describes how we collect, store, utilize, and protect your information when you access our platform, mobile web application, and related services.
            </p>
          </section>

          <section>
            <h2 className="h5 fw-bold text-dark mb-2">2. Information We Collect</h2>
            <p>We may collect information you provide directly to us:</p>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, phone number, and optional profile image.</li>
              <li><strong>Listing Data:</strong> Titles, descriptions, photos, prices, condition, and location details of items you post.</li>
              <li><strong>Communications:</strong> Messages exchanged with other users through our in-app chat system and customer support inquiries.</li>
              <li><strong>Usage &amp; Device Information:</strong> Browser type, operating system, and IP address for security and anti-fraud monitoring.</li>
            </ul>
          </section>

          <section>
            <h2 className="h5 fw-bold text-dark mb-2">3. How We Use Your Data</h2>
            <p>Your data is utilized solely to:</p>
            <ul>
              <li>Operate, maintain, and enhance the SellQuickest marketplace.</li>
              <li>Facilitate contact between buyers and sellers for legitimate marketplace transactions.</li>
              <li>Detect and prevent fraud, spam, abuse, and unauthorized access.</li>
              <li>Send transaction updates, safety alerts, and account notifications.</li>
            </ul>
          </section>

          <section>
            <h2 className="h5 fw-bold text-dark mb-2">4. Data Sharing &amp; Third Parties</h2>
            <p>
              We do <strong>not</strong> sell your personal contact details to third-party advertisers. When you post an ad, your chosen display name, location, and optional phone number (if you choose to reveal it) become visible to prospective buyers to enable smooth trade.
            </p>
          </section>

          <section>
            <h2 className="h5 fw-bold text-dark mb-2">5. Data Security</h2>
            <p>
              We implement industry-standard encryption, SSL protocols, and restricted access controls to safeguard your personal records against unauthorized disclosure, loss, or alteration.
            </p>
          </section>

          <section>
            <h2 className="h5 fw-bold text-dark mb-2">6. Your Rights</h2>
            <p>
              Under applicable data protection legislation, you have the right to request access to your data, update your information in your Account Settings, or request deletion of your account and associated listings by contacting our support team.
            </p>
          </section>

          <section className="pt-3 border-top">
            <h2 className="h6 fw-bold text-dark mb-1">Contact Our Data Protection Officer</h2>
            <p className="small mb-0">
              If you have inquiries regarding your personal data, reach out to{" "}
              <a href="mailto:privacy@sellquickest.com" className="text-success text-decoration-none fw-medium">
                privacy@sellquickest.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
