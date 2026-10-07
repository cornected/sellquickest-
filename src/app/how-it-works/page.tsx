import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — Buy and Sell on SellQuickest Nigeria",
  description:
    "Discover how easy it is to buy and sell on SellQuickest. Follow our 3-step guide for buyers and sellers across Nigeria.",
};

export default function HowItWorksPage() {
  return (
    <main className="container py-4 pb-5" style={{ maxWidth: "940px" }}>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            How It Works
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white text-center">
        <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-1.5 rounded-pill mx-auto mb-2">
          SIMPLE 3-STEP PROCESS
        </span>
        <h1 className="fw-bold text-dark mb-2">How SellQuickest Works</h1>
        <p className="lead text-secondary mx-auto mb-0" style={{ maxWidth: "620px" }}>
          Whether you want to declutter pre-owned items, grow your merchant business, or find great deals nearby, trading is fast and secure.
        </p>
      </div>

      {/* For Sellers */}
      <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white mb-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <span className="fs-3">💼</span>
          <div>
            <h2 className="h4 fw-bold mb-0 text-dark">For Sellers: Turn Items into Cash</h2>
            <span className="text-muted small">Post in under 2 minutes</span>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-3 bg-light rounded-4 h-100 border">
              <div
                className="rounded-circle bg-success text-white fw-bold d-flex align-items-center justify-content-center mb-3"
                style={{ width: "36px", height: "36px" }}
              >
                1
              </div>
              <h3 className="h6 fw-bold text-dark mb-2">Snap &amp; Post</h3>
              <p className="text-secondary small mb-0" style={{ lineHeight: "1.6" }}>
                Take 3 to 10 clear photos of your item, choose the right category, write a truthful description, and set your asking price.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 bg-light rounded-4 h-100 border">
              <div
                className="rounded-circle bg-success text-white fw-bold d-flex align-items-center justify-content-center mb-3"
                style={{ width: "36px", height: "36px" }}
              >
                2
              </div>
              <h3 className="h6 fw-bold text-dark mb-2">Chat with Buyers</h3>
              <p className="text-secondary small mb-0" style={{ lineHeight: "1.6" }}>
                Receive instant notifications and chat messages from interested buyers directly on SellQuickest or via phone/WhatsApp.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 bg-light rounded-4 h-100 border">
              <div
                className="rounded-circle bg-success text-white fw-bold d-flex align-items-center justify-content-center mb-3"
                style={{ width: "36px", height: "36px" }}
              >
                3
              </div>
              <h3 className="h6 fw-bold text-dark mb-2">Meet &amp; Get Paid</h3>
              <p className="text-secondary small mb-0" style={{ lineHeight: "1.6" }}>
                Meet the buyer in a public place. Once they inspect and confirm the item, receive your payment and mark the ad as sold!
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link href="/post" className="btn btn-sq text-white fw-bold px-4 py-2 rounded-pill shadow-sm">
            + Post Your First Ad
          </Link>
        </div>
      </div>

      {/* For Buyers */}
      <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white mb-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <span className="fs-3">🛍️</span>
          <div>
            <h2 className="h4 fw-bold mb-0 text-dark">For Buyers: Find What You Need</h2>
            <span className="text-muted small">Quality deals right in your neighborhood</span>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-3 bg-light rounded-4 h-100 border">
              <div
                className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center mb-3"
                style={{ width: "36px", height: "36px" }}
              >
                1
              </div>
              <h3 className="h6 fw-bold text-dark mb-2">Search &amp; Filter</h3>
              <p className="text-secondary small mb-0" style={{ lineHeight: "1.6" }}>
                Browse by state, city, price range, and condition. Find electronics, cars, fashion, or apartments near you.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 bg-light rounded-4 h-100 border">
              <div
                className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center mb-3"
                style={{ width: "36px", height: "36px" }}
              >
                2
              </div>
              <h3 className="h6 fw-bold text-dark mb-2">Reach the Seller</h3>
              <p className="text-secondary small mb-0" style={{ lineHeight: "1.6" }}>
                Send a free chat message on the platform or call the seller to negotiate price and ask any questions.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 bg-light rounded-4 h-100 border">
              <div
                className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center mb-3"
                style={{ width: "36px", height: "36px" }}
              >
                3
              </div>
              <h3 className="h6 fw-bold text-dark mb-2">Inspect &amp; Collect</h3>
              <p className="text-secondary small mb-0" style={{ lineHeight: "1.6" }}>
                Meet the seller in a safe public spot, inspect the item thoroughly to confirm it matches the listing, and pay securely.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link href="/search" className="btn btn-outline-primary fw-semibold px-4 py-2 rounded-pill">
            Explore All Listings →
          </Link>
        </div>
      </div>
    </main>
  );
}
