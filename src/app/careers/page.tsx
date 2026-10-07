import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at SellQuickest — Join Our Team",
  description:
    "Explore career opportunities at SellQuickest. Help us build Nigeria's most trusted, fast-moving digital marketplace.",
};

export default function CareersPage() {
  const roles = [
    {
      title: "Senior Full-Stack Engineer (Next.js / TypeScript)",
      department: "Engineering",
      location: "Lagos / Remote (Nigeria)",
      type: "Full-Time",
      description:
        "Architect and scale high-performance marketplace features, real-time messaging, and mobile web experiences for millions of Nigerian shoppers.",
    },
    {
      title: "Trust, Safety & Moderation Specialist",
      department: "Operations",
      location: "Lagos (Hybrid)",
      type: "Full-Time",
      description:
        "Proactively monitor listings, verify merchant storefronts, investigate fraudulent patterns, and protect our buyer community.",
    },
    {
      title: "Growth & Merchant Acquisition Manager",
      department: "Marketing",
      location: "Lagos / Abuja",
      type: "Full-Time",
      description:
        "Drive merchant partnerships across major commercial hubs (Computer Village, Alaba, Trade Fair, Wuse Market) to bring top sellers onto SellQuickest.",
    },
  ];

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
            Careers
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white text-center">
        <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-1.5 rounded-pill mx-auto mb-2">
          JOIN OUR MISSION
        </span>
        <h1 className="fw-bold text-dark mb-2">Build the Future of Commerce in Nigeria</h1>
        <p className="lead text-secondary mx-auto mb-0" style={{ maxWidth: "620px" }}>
          We are assembling a mission-driven team of builders, creators, and operators passionate about empowering local merchants and buyers.
        </p>
      </div>

      {/* Perks */}
      <div className="row g-3 mb-5">
        <div className="col-md-4">
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white text-center h-100">
            <div className="fs-1 mb-2">🚀</div>
            <h2 className="h6 fw-bold text-dark mb-1">Fast-Paced Impact</h2>
            <p className="text-secondary small mb-0">Directly see the impact of your code and ideas on hundreds of thousands of daily trades.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white text-center h-100">
            <div className="fs-1 mb-2">💡</div>
            <h2 className="h6 fw-bold text-dark mb-1">Autonomy &amp; Ownership</h2>
            <p className="text-secondary small mb-0">Work with smart, humble colleagues who value results and customer happiness over bureaucracy.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white text-center h-100">
            <div className="fs-1 mb-2">🌿</div>
            <h2 className="h6 fw-bold text-dark mb-1">Competitive Rewards</h2>
            <p className="text-secondary small mb-0">Competitive compensation, health insurance, flexible work arrangements, and modern tech gear.</p>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
        <h2 className="h4 fw-bold text-dark mb-3">Open Positions</h2>
        <div className="d-flex flex-column gap-3">
          {roles.map((role, idx) => (
            <div key={idx} className="p-3 border rounded-3 bg-light">
              <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
                <div>
                  <h3 className="h6 fw-bold text-dark mb-1">{role.title}</h3>
                  <div className="d-flex flex-wrap gap-2 text-muted small">
                    <span>🏢 {role.department}</span>
                    <span>•</span>
                    <span>📍 {role.location}</span>
                    <span>•</span>
                    <span className="badge bg-success bg-opacity-10 text-success fw-semibold">{role.type}</span>
                  </div>
                </div>
                <a
                  href={`mailto:careers@sellquickest.com?subject=Application: ${encodeURIComponent(role.title)}`}
                  className="btn btn-outline-success btn-sm rounded-pill px-3 fw-medium"
                >
                  Apply Now →
                </a>
              </div>
              <p className="text-secondary small mb-0" style={{ lineHeight: "1.6" }}>
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* General application */}
      <div className="card border-0 rounded-4 p-4 text-center bg-white shadow-sm">
        <h2 className="h5 fw-bold text-dark mb-1">Don&apos;t see your role?</h2>
        <p className="text-secondary small mb-3">
          We are always looking for exceptional talent. Send your resume and portfolio to{" "}
          <a href="mailto:careers@sellquickest.com" className="text-success text-decoration-none fw-semibold">
            careers@sellquickest.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
