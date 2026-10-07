import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — SellQuickest Nigeria",
  description:
    "Terms and conditions for using the SellQuickest marketplace. Understand your rights, responsibilities, and guidelines for listing items.",
};

export default function TermsPage() {
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
            Terms of Service
          </li>
        </ol>
      </nav>

      <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
        <div className="border-bottom pb-3 mb-3">
          <span className="badge bg-secondary bg-opacity-10 text-secondary fw-semibold px-3 py-1.5 rounded-pill mb-2">
            LEGAL AGREEMENT
          </span>
          <h1 className="fw-bold text-dark mb-1">Terms of Service</h1>
          <p className="text-muted small mb-0">Last updated: October 2026</p>
        </div>

        <div className="text-secondary d-flex flex-column gap-4" style={{ lineHeight: "1.75", fontSize: "0.95rem" }}>
          <section>
            <h2 className="h5 fw-bold text-dark mb-2">1. Acceptance of Terms</h2>
            <p>
              Welcome to SellQuickest (&quot;the Platform&quot;). By creating an account, browsing listings, posting advertisements, or communicating with buyers and sellers, you agree to be bound by these Terms of Service, our Privacy Policy, and all applicable laws and regulations of the Federal Republic of Nigeria.
            </p>
          </section>

          <section>
            <h2 className="h5 fw-bold text-dark mb-2">2. Eligibility &amp; Account Responsibility</h2>
            <p>
              You must be at least 18 years old to post advertisements or enter into legally binding transactions. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. SellQuickest reserves the right to suspend or terminate accounts that provide misleading, inaccurate, or fraudulent information.
            </p>
          </section>

          <section>
            <h2 className="h5 fw-bold text-dark mb-2">3. Marketplace Nature of Service</h2>
            <p>
              SellQuickest acts solely as an online venue connecting independent buyers and sellers. We do not manufacture, store, own, inspect, or deliver items listed on the Platform. All contracts for sale are made directly between the buyer and the seller. Consequently, users agree to exercise due diligence, inspect items in person, and transact safely.
            </p>
          </section>

          <section>
            <h2 className="h5 fw-bold text-dark mb-2">4. Prohibited Content &amp; Items</h2>
            <p>Users are strictly prohibited from listing, offering, or advertising:</p>
            <ul className="mb-2">
              <li>Stolen goods, illegal contraband, or property without lawful title.</li>
              <li>Counterfeit goods, replicas, or copyright-infringing materials.</li>
              <li>Firearms, ammunition, explosives, and dangerous weapons.</li>
              <li>Controlled drugs, unregistered pharmaceuticals, or narcotics.</li>
              <li>Fraudulent financial schemes, pyramid schemes, or unverified loan offers.</li>
              <li>Explicit, adult, or offensive materials.</li>
            </ul>
            <p>
              Any violation will result in immediate removal of the listing, permanent account ban, and referral to relevant law enforcement agencies when applicable.
            </p>
          </section>

          <section>
            <h2 className="h5 fw-bold text-dark mb-2">5. Ad Promotion &amp; Paid Services</h2>
            <p>
              SellQuickest offers optional visibility packages (such as &quot;Top Ad&quot;, &quot;Urgent&quot;, and &quot;Bump to Top&quot;). Paid boost fees are charged for enhanced placement and visibility and are non-refundable once the promotion period commences, except where mandated by applicable consumer protection laws.
            </p>
          </section>

          <section>
            <h2 className="h5 fw-bold text-dark mb-2">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, SellQuickest and its affiliates shall not be liable for any indirect, incidental, or consequential damages resulting from user transactions, unauthorized access, or inaccuracies in listings provided by third-party users.
            </p>
          </section>

          <section>
            <h2 className="h5 fw-bold text-dark mb-2">7. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising under these Terms shall be subject to the jurisdiction of the competent courts in Nigeria.
            </p>
          </section>

          <section className="pt-3 border-top">
            <h2 className="h6 fw-bold text-dark mb-1">Questions or Concerns?</h2>
            <p className="small mb-0">
              For legal inquiries regarding these terms, please contact our legal desk at{" "}
              <a href="mailto:legal@sellquickest.com" className="text-success text-decoration-none fw-medium">
                legal@sellquickest.com
              </a>{" "}
              or via our{" "}
              <Link href="/contact" className="text-success text-decoration-none fw-medium">
                Contact Page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
