import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety Tips & Fraud Prevention — SellQuickest Nigeria",
  description:
    "Essential tips to stay safe while buying and selling on SellQuickest. Learn how to avoid scams, inspect items, and transact securely.",
};

export default function SafetyPage() {
  return (
    <main className="container py-4 pb-5" style={{ maxWidth: "920px" }}>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            Safety Tips
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white">
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="badge bg-warning bg-opacity-25 text-dark fw-bold px-3 py-1.5 rounded-pill">
            🛡️ TRUST &amp; SECURITY
          </span>
        </div>
        <h1 className="fw-bold text-dark mb-2">
          Your Safety is Our Top Priority
        </h1>
        <p className="lead text-secondary mb-0">
          SellQuickest is committed to providing a secure marketplace for everyone. While most transactions happen smoothly, being cautious and following these fundamental safety guidelines ensures a hassle-free experience.
        </p>
      </div>

      {/* Buyer Safety Tips */}
      <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="fs-3">🛍️</span>
          <h2 className="h4 fw-bold mb-0 text-dark">Safety Tips for Buyers</h2>
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <h3 className="h6 fw-bold text-dark d-flex align-items-center gap-2">
                <span className="text-danger fw-bold">1.</span> Never pay in advance
              </h3>
              <p className="text-secondary small mb-0">
                Do not send bank transfers, delivery fees, or commitment deposits before meeting the seller and holding the item in your hands.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <h3 className="h6 fw-bold text-dark d-flex align-items-center gap-2">
                <span className="text-success fw-bold">2.</span> Meet in busy public places
              </h3>
              <p className="text-secondary small mb-0">
                Arrange meetings in well-lit, crowded locations such as shopping malls, bank premises, gas stations, or fast-food outlets during daytime.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <h3 className="h6 fw-bold text-dark d-flex align-items-center gap-2">
                <span className="text-primary fw-bold">3.</span> Inspect thoroughly before paying
              </h3>
              <p className="text-secondary small mb-0">
                For phones/gadgets, verify IMEI, test camera, battery health, and iCloud/Google lock. For vehicles, test drive and inspect with a trusted mechanic.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <h3 className="h6 fw-bold text-dark d-flex align-items-center gap-2">
                <span className="text-warning fw-bold">4.</span> Beware of deals that seem &quot;Too Good to Be True&quot;
              </h3>
              <p className="text-secondary small mb-0">
                If an iPhone 15 Pro is listed for ₦100,000, it is almost certainly a scam or stolen property. Real market prices reflect true value.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Safety Tips */}
      <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="fs-3">💼</span>
          <h2 className="h4 fw-bold mb-0 text-dark">Safety Tips for Sellers</h2>
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <h3 className="h6 fw-bold text-dark d-flex align-items-center gap-2">
                <span className="text-danger fw-bold">1.</span> Verify bank credit alerts inside your banking app
              </h3>
              <p className="text-secondary small mb-0">
                Never hand over your item based solely on an SMS alert or screenshot of a transfer receipt. Always log in directly to your mobile bank app to confirm available balance.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <h3 className="h6 fw-bold text-dark d-flex align-items-center gap-2">
                <span className="text-success fw-bold">2.</span> Keep someone informed
              </h3>
              <p className="text-secondary small mb-0">
                If meeting a buyer, let a family member or friend know where you are going and who you are meeting. Bring a companion whenever possible.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <h3 className="h6 fw-bold text-dark d-flex align-items-center gap-2">
                <span className="text-primary fw-bold">3.</span> Avoid unusual payment methods
              </h3>
              <p className="text-secondary small mb-0">
                Do not accept cheques, fake escrow links sent via WhatsApp, or overpayment requests where the buyer asks for a refund of excess funds.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <h3 className="h6 fw-bold text-dark d-flex align-items-center gap-2">
                <span className="text-warning fw-bold">4.</span> Protect personal confidential data
              </h3>
              <p className="text-secondary small mb-0">
                Never share bank OTPs, BVN, ATM card PINs, or sensitive identity documents with prospective buyers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Red Flags Card */}
      <div className="card border-0 rounded-4 shadow-sm p-4 bg-danger bg-opacity-10 border-danger mb-4">
        <h3 className="h5 fw-bold text-danger mb-3 d-flex align-items-center gap-2">
          <span>🚩</span> Major Red Flags to Watch Out For
        </h3>
        <ul className="text-secondary small mb-0 d-flex flex-column gap-2" style={{ lineHeight: "1.7" }}>
          <li>The buyer/seller refuses to meet in person or talk on the phone.</li>
          <li>The seller asks for advance payment via gift cards, crypto, or third-party bank accounts.</li>
          <li>The buyer claims they sent someone to pick up the item and claims the bank transfer will clear tomorrow.</li>
          <li>The listing has copied stock images and the seller cannot provide real photos of the item.</li>
        </ul>
      </div>

      {/* Report Ad Banner */}
      <div className="card border-0 rounded-4 p-4 text-center bg-white shadow-sm">
        <h3 className="h5 fw-bold text-dark mb-2">Spotted suspicious activity or an ad?</h3>
        <p className="text-secondary small mb-3">
          Our moderation team acts swiftly against bad actors. Help keep SellQuickest safe for all Nigerians.
        </p>
        <div>
          <Link href="/report" className="btn btn-outline-danger btn-sm rounded-pill px-4 py-2 fw-medium">
            🚩 Report a Suspicious Ad
          </Link>
        </div>
      </div>
    </main>
  );
}
