import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — SellQuickest Nigeria Customer Support",
  description:
    "Get in touch with SellQuickest support. We are here to help buyers and sellers with ad management, verification, safety, and business partnerships.",
};

export default function ContactPage() {
  return (
    <main className="container py-4 pb-5" style={{ maxWidth: "980px" }}>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            Contact Support
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white text-center">
        <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-1.5 rounded-pill mx-auto mb-2">
          WE ARE HERE TO HELP
        </span>
        <h1 className="fw-bold text-dark mb-2">Get in Touch With SellQuickest</h1>
        <p className="lead text-secondary mx-auto mb-0" style={{ maxWidth: "600px" }}>
          Have a question about an ad, need assistance with your merchant storefront, or want to report an issue? Our Lagos-based team responds promptly.
        </p>
      </div>

      <div className="row g-4">
        {/* Contact Info Cards */}
        <div className="col-lg-5">
          <div className="d-flex flex-column gap-3">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
              <div className="d-flex align-items-start gap-3">
                <div
                  className="rounded-3 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center fs-4 flex-shrink-0"
                  style={{ width: "48px", height: "48px" }}
                >
                  📧
                </div>
                <div>
                  <h2 className="h6 fw-bold text-dark mb-1">Email Support</h2>
                  <p className="text-secondary small mb-1">Our dedicated team is ready to assist you.</p>
                  <a
                    href="mailto:support@sellquickest.com"
                    className="text-success fw-semibold text-decoration-none small"
                  >
                    support@sellquickest.com
                  </a>
                </div>
              </div>
            </div>

            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
              <div className="d-flex align-items-start gap-3">
                <div
                  className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fs-4 flex-shrink-0"
                  style={{ width: "48px", height: "48px" }}
                >
                  📞
                </div>
                <div>
                  <h2 className="h6 fw-bold text-dark mb-1">Phone &amp; WhatsApp</h2>
                  <p className="text-secondary small mb-1">Monday to Saturday: 8:00 AM – 6:00 PM (WAT)</p>
                  <a
                    href="tel:+2348000000000"
                    className="text-primary fw-semibold text-decoration-none small d-block"
                  >
                    +234 (0) 700-SELLQUICK
                  </a>
                </div>
              </div>
            </div>

            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
              <div className="d-flex align-items-start gap-3">
                <div
                  className="rounded-3 bg-warning bg-opacity-15 text-dark d-flex align-items-center justify-content-center fs-4 flex-shrink-0"
                  style={{ width: "48px", height: "48px" }}
                >
                  📍
                </div>
                <div>
                  <h2 className="h6 fw-bold text-dark mb-1">Head Office</h2>
                  <p className="text-secondary small mb-0">
                    Opebi Road, Ikeja, Lagos State, Nigeria
                  </p>
                </div>
              </div>
            </div>

            <div className="card border-0 rounded-4 shadow-sm p-4 bg-light">
              <h2 className="h6 fw-bold text-dark mb-2">Need Instant Answers?</h2>
              <p className="text-secondary small mb-3">
                Check our Frequently Asked Questions for quick help with posting, boosting ads, and safety rules.
              </p>
              <Link href="/help" className="btn btn-outline-dark btn-sm rounded-pill px-3 fw-medium">
                Visit Help Center &amp; FAQ →
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-lg-7">
          <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white h-100">
            <h2 className="h4 fw-bold text-dark mb-1">Send Us a Direct Message</h2>
            <p className="text-secondary small mb-4">
              Fill out this form and an agent will follow up with you within 24 hours.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
