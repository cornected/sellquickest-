"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  id: string;
  category: "general" | "buying" | "selling" | "boost";
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "g1",
    category: "general",
    question: "What is SellQuickest?",
    answer:
      "SellQuickest is a modern Nigerian classifieds marketplace connecting local buyers and sellers across all 36 states. You can sell anything from cars and real estate to mobile phones, laptops, and fashion.",
  },
  {
    id: "g2",
    category: "general",
    question: "Is it completely free to post an ad?",
    answer:
      "Yes! Basic ad posting on SellQuickest is 100% free. You can upload up to 10 photos and list your products without paying any listing fee. Optional paid boost packages are available if you want faster sales and top visibility.",
  },
  {
    id: "s1",
    category: "selling",
    question: "How long does it take for my ad to go live?",
    answer:
      "Ads posted on SellQuickest go live instantly! Our automated moderation filters check images and descriptions in real time to ensure they follow our community guidelines.",
  },
  {
    id: "s2",
    category: "selling",
    question: "How do I edit or delete my ad after posting?",
    answer:
      "Go to 'My Ads' from the top navigation menu. Beside each ad, you will find options to 'Edit', 'Mark as Sold', or 'Delete' your listing.",
  },
  {
    id: "b1",
    category: "buying",
    question: "How do I contact a seller?",
    answer:
      "On any listing page, you can click 'Chat with Seller' to send an in-app instant message, or click 'Show Phone Number' to call or WhatsApp the seller directly.",
  },
  {
    id: "b2",
    category: "buying",
    question: "Can I pay online through SellQuickest?",
    answer:
      "SellQuickest is a direct peer-to-peer marketplace. For your maximum safety, always inspect the item in person before making payment. Never send money in advance.",
  },
  {
    id: "boost1",
    category: "boost",
    question: "What are Ad Boost packages (Top Ad, Urgent, Bump)?",
    answer:
      "Ad Boost packages place your listing in prominent front-row positions. 'Top Ad' pins your listing at the top of category searches for 7 days. 'Urgent' adds a standout badge to attract fast buyers. 'Bump to Top' refreshes the listing timestamp as if just posted.",
  },
  {
    id: "boost2",
    category: "boost",
    question: "How do I boost an existing ad?",
    answer:
      "Visit 'My Ads', click the '🚀 Promote / Boost Ad' button under your listing, select your preferred promotion package, and confirm.",
  },
];

export function HelpCenterClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openId, setOpenId] = useState<string | null>("g1");
  const [hoveredPill, setHoveredPill] = useState<string | null>(null);
  const [hoveredFaq, setHoveredFaq] = useState<string | null>(null);

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search Header */}
      <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white text-center">
        <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-1.5 rounded-pill mx-auto mb-2">
          FAQ &amp; KNOWLEDGE BASE
        </span>
        <h1 className="fw-bold text-dark mb-2">How can we help you today?</h1>
        <p className="lead text-secondary mx-auto mb-3" style={{ maxWidth: "560px" }}>
          Search our knowledge base or browse common topics below.
        </p>

        <div className="mx-auto" style={{ maxWidth: "540px" }}>
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0 rounded-start-pill ps-3">
              🔍
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0 py-2.5 rounded-end-pill"
              placeholder="Search help topics (e.g. boost ad, delete listing, safety)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center">
        {[
          { key: "all", label: "All Questions" },
          { key: "general", label: "General & Account" },
          { key: "selling", label: "Selling on SellQuickest" },
          { key: "buying", label: "Buying & Safety" },
          { key: "boost", label: "Ad Boosts & Promotion" },
        ].map((cat) => {
          const isActive = activeCategory === cat.key;
          const isHovered = hoveredPill === cat.key;

          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              onMouseEnter={() => setHoveredPill(cat.key)}
              onMouseLeave={() => setHoveredPill(null)}
              className="btn btn-sm rounded-pill px-3.5 py-2 fw-semibold transition-all border-0"
              style={{
                backgroundColor: isActive
                  ? "#059669"
                  : isHovered
                  ? "#e2e8f0"
                  : "#f1f5f9",
                color: isActive
                  ? "#ffffff"
                  : "#0f172a",
                boxShadow: isActive ? "0 2px 8px rgba(5, 150, 105, 0.25)" : "none",
                cursor: "pointer",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Accordion FAQ List */}
      <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-secondary mb-3">No answers matched your search.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="btn btn-sm rounded-pill px-4 py-2 fw-semibold"
              style={{
                backgroundColor: "#ecfdf5",
                color: "#059669",
                border: "1px solid #10b981",
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              const isHovered = hoveredFaq === faq.id;

              return (
                <div
                  key={faq.id}
                  className="rounded-3 overflow-hidden transition-all"
                  style={{
                    border: isOpen
                      ? "1px solid #10b981"
                      : "1px solid #e2e8f0",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    onMouseEnter={() => setHoveredFaq(faq.id)}
                    onMouseLeave={() => setHoveredFaq(null)}
                    className="w-100 p-3 text-start border-0 d-flex justify-content-between align-items-center transition-all"
                    style={{
                      fontWeight: 600,
                      backgroundColor: isOpen
                        ? "#f0fdf4"
                        : isHovered
                        ? "#f8fafc"
                        : "#ffffff",
                      color: isOpen
                        ? "#047857"
                        : isHovered
                        ? "#059669"
                        : "#0f172a",
                      fontSize: "0.96rem",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ color: "inherit" }}>{faq.question}</span>
                    <span
                      className="ms-2 fs-5"
                      style={{
                        color: isOpen ? "#059669" : "#64748b",
                        lineHeight: 1,
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      className="p-3 text-secondary small border-top bg-light bg-opacity-25"
                      style={{ lineHeight: "1.7", color: "#334155" }}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Still need help? */}
      <div className="card border-0 rounded-4 shadow-sm p-4 text-center bg-white">
        <h2 className="h5 fw-bold text-dark mb-1">Still have questions?</h2>
        <p className="text-secondary small mb-3">
          Our friendly support team is always available to help you resolve any questions.
        </p>
        <div>
          <Link
            href="/contact"
            className="btn btn-sq text-white btn-sm rounded-pill px-4 py-2 fw-medium shadow-sm"
          >
            Contact Support Desk →
          </Link>
        </div>
      </div>
    </div>
  );
}
