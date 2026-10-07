import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — SellQuickest Nigeria",
  description:
    "Understand how SellQuickest uses cookies and local storage to keep your session secure and enhance your marketplace browsing experience.",
};

export default function CookiesPage() {
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
            Cookie Policy
          </li>
        </ol>
      </nav>

      <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
        <div className="border-bottom pb-3 mb-3">
          <span className="badge bg-secondary bg-opacity-10 text-secondary fw-semibold px-3 py-1.5 rounded-pill mb-2">
            TRANSPARENCY
          </span>
          <h1 className="fw-bold text-dark mb-1">Cookie &amp; Storage Policy</h1>
          <p className="text-muted small mb-0">How we use cookies to provide a smooth marketplace experience</p>
        </div>

        <div className="text-secondary d-flex flex-column gap-4" style={{ lineHeight: "1.75", fontSize: "0.95rem" }}>
          <section>
            <h2 className="h5 fw-bold text-dark mb-2">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your computer or mobile device when you browse websites. They help the platform remember your actions and preferences (such as your login session, location filters, and saved ads) so you do not have to re-enter them whenever you return to the site.
            </p>
          </section>

          <section>
            <h2 className="h5 fw-bold text-dark mb-2">2. Types of Cookies We Use</h2>
            <ul>
              <li>
                <strong>Essential / Authentication Cookies:</strong> Necessary to keep you securely signed in to your account, manage your ads, and protect against cross-site request forgery.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your selected state, city filters, and view modes (grid vs list view).
              </li>
              <li>
                <strong>Saved Items &amp; Bookmarks:</strong> Cache ads you have saved to your wishlist so you can revisit them anytime.
              </li>
              <li>
                <strong>Performance &amp; Analytics:</strong> Help us understand which categories and search features are most valuable to buyers and sellers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="h5 fw-bold text-dark mb-2">3. Managing Your Cookies</h2>
            <p>
              You can control and disable cookies through your browser settings. However, disabling essential cookies may impact your ability to log in, post advertisements, or manage your existing listings on SellQuickest.
            </p>
          </section>

          <section className="pt-3 border-top">
            <h2 className="h6 fw-bold text-dark mb-1">Related Information</h2>
            <p className="small mb-0">
              For more details on how we safeguard your personal data, read our full{" "}
              <Link href="/privacy" className="text-success text-decoration-none fw-medium">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
