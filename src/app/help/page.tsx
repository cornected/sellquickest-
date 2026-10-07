import Link from "next/link";
import type { Metadata } from "next";
import { HelpCenterClient } from "./HelpCenterClient";

export const metadata: Metadata = {
  title: "Help Center & FAQ — SellQuickest Nigeria",
  description:
    "Find answers to frequently asked questions about buying, selling, boosting ads, and staying secure on SellQuickest.",
};

export default function HelpPage() {
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
            Help &amp; Support
          </li>
        </ol>
      </nav>

      <HelpCenterClient />
    </main>
  );
}
