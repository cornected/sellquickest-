"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "rgb(232, 247, 240)", // 🎨 Your exact fresh minty pastel tint canvas base
        color: "#334155", // High-end slate charcoal text for premium legibility
        paddingTop: "11rem", // Spacious margin allows the deep S-curve graphics to float freely
        paddingBottom: "3rem",
        marginTop: "8rem",
        overflow: "hidden",
      }}
    >
      {/* =============================================================================
          💎 PIXEL-PERFECT VERTICAL 3D S-CURVE TRANSITION LAYER (SVG Architecture)
          ============================================================================= */}
      <div
        style={{
          position: "absolute",
          top: "-2px", // Safe sub-pixel alignment overlap checks
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          height: "120px",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,

          /* Generates the deep 3D drop-shadow matching your reference image split precisely */
          filter:
            "drop-shadow(0 15px 20px rgba(15, 23, 42, 0.10)) drop-shadow(0 4px 6px rgba(16, 185, 129, 0.04))",
        }}
      >
        <svg
          viewBox="0 0 1920 120"
          fill="none"
          xmlns="http://w3.org"
          style={{ width: "100%", height: "100%", display: "block" }}
          preserveAspectRatio="none"
        >
          {/* Main S-Curve Path: Top section remains pure white, bottom rolls organically into your mint footer */}
          <path
            d="M0,0 L1920,0 L1920,40 C1440,110 960,10 480,80 L0,40 Z"
            fill="#ffffff"
          />

          {/* THE 3D HIGHLIGHT REFLECTION STRING: Matches the bright glowing white beam on the image edge */}
          <path
            d="M0,41 C480,81 960,11 1440,111 L1920,41"
            stroke="#ffffff"
            strokeWidth="2.5"
            opacity="0.95"
          />

          {/* Micro Accent Core Tint Line String */}
          <path
            d="M0,42 C480,82 960,12 1440,112 L1920,42"
            stroke="rgba(16, 185, 129, 0.12)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* =============================================================================
          MASTER PLATFORM DIRECTORY & NAVIGATION GRID CONTAINER
          ============================================================================= */}
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="row g-4 mb-5">
          {/* PLATFORM IDENTITY COLUMN HUB (Left Alignment Anchor) */}
          <div className="col-12 col-xl-4 mb-4 mb-xl-0">
            <h2
              style={{
                color: "#0f172a",
                fontSize: "1.3rem",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                margin: "0 0 0.5rem 0",
              }}
            >
              SELLQUICKEST
            </h2>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#10b981",
                letterSpacing: "0.2px",
                marginBottom: "0.5rem",
              }}
            >
              Buy. Sell. Find. Quickly.
            </div>
            <p
              style={{
                fontSize: "13px",
                lineHeight: "1.6",
                color: "#475569",
                maxWidth: "280px",
                margin: 0,
              }}
            >
              Nigeria's marketplace for buying and selling premium items locally
              and securely.
            </p>
          </div>

          {/* THE 4-COLUMN MARKETPLACE DIRECTORY SITE-MAP MATRIX */}
          <div className="col-12 col-xl-8">
            <div className="row g-4">
              {/* Column 1: Explore Directory */}
              <div className="col-6 col-sm-3">
                <h3
                  style={{
                    color: "#0f172a",
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "1.25rem",
                  }}
                >
                  Explore
                </h3>
                <ul
                  className="list-unstyled d-flex flex-column gap-2.5"
                  style={{ fontSize: "13px", margin: 0, padding: 0 }}
                >
                  <li>
                    <Link
                      href="/browse"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      Browse Ads
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categories"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/locations"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      Locations
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Sell Directory */}
              <div className="col-6 col-sm-3">
                <h3
                  style={{
                    color: "#0f172a",
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "1.25rem",
                  }}
                >
                  Sell
                </h3>
                <ul
                  className="list-unstyled d-flex flex-column gap-2.5"
                  style={{ fontSize: "13px", margin: 0, padding: 0 }}
                >
                  <li>
                    <Link
                      href="/post"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      Post an Ad
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/manage"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      Manage Ads
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/promote"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      Promote Ad
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/seller-guide"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      Seller Guide
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Help & Safety Directory */}
              <div className="col-6 col-sm-3">
                <h3
                  style={{
                    color: "#0f172a",
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "1.25rem",
                  }}
                >
                  Help & Safety
                </h3>
                <ul
                  className="list-unstyled d-flex flex-column gap-2.5"
                  style={{ fontSize: "13px", margin: 0, padding: 0 }}
                >
                  <li>
                    <Link
                      href="/safety"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      Safety Tips
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/report"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      Report an Ad
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/support"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      Contact Support
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4: Company Corporate Directory */}
              <div className="col-6 col-sm-3">
                <h3
                  style={{
                    color: "#0f172a",
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "1.25rem",
                  }}
                >
                  Company
                </h3>
                <ul
                  className="list-unstyled d-flex flex-column gap-2.5"
                  style={{ fontSize: "13px", margin: 0, padding: 0 }}
                >
                  <li>
                    <Link
                      href="/about"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/how-it-works"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      How It works
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-decoration-none hover:text-success"
                      style={{ color: "#475569" }}
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================================
            🛡️ MID-TIER CORE PLATFORM STANDALONE VALUE PROPOSITIONS STRIP
            ============================================================================= */}
        <div
          style={{
            borderTop: "1px solid rgba(15, 23, 42, 0.05)",
            borderBottom: "1px solid rgba(15, 23, 42, 0.05)",
            padding: "1.25rem 0",
            margin: "2.5rem 0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem row",
            columnGap: "3rem",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>🛡</span> Safe Marketplace
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>🔒</span> Privacy Protected
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>⚡</span> Sell Quickly
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>🤝</span> Buy Confidently
          </span>
        </div>

        {/* =============================================================================
            💳 BASE REGULATORY ROW: REGULATION METADATA AND SOCIAL HANDLES
            ============================================================================= */}
        {/* =============================================================================
            💳 BASE REGULATORY ROW: REGULATION METADATA AND SOCIAL HANDLES
            ============================================================================= */}
        <div
          style={{
            borderTop: "1px solid rgba(15, 23, 42, 0.08)",
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          {/* Left Block: Copyright Metadata Parameter */}
          <div>
            © {new Date().getFullYear()} SellQuickest Premium Marketplace. All
            rights reserved.
          </div>

          {/* Center Block: Micro Operational Legal Links */}
          <div className="d-flex align-items-center gap-3">
            <Link
              href="/terms"
              className="text-decoration-none text-reset hover:text-success"
            >
              Terms
            </Link>
            <span style={{ color: "#cbd5e1" }}>•</span>
            <Link
              href="/privacy"
              className="text-decoration-none text-reset hover:text-success"
            >
              Privacy
            </Link>
            <span style={{ color: "#cbd5e1" }}>•</span>
            <Link
              href="/cookies"
              className="text-decoration-none text-reset hover:text-success"
            >
              Cookies
            </Link>
          </div>

          {/* Right Block: Active Social Hub Pipeline Anchor Links */}
          <div
            className="d-flex align-items-center gap-3"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-reset hover:text-success"
              style={{ color: "#475569" }}
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-reset hover:text-success"
              style={{ color: "#475569" }}
            >
              Instagram
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-reset hover:text-success"
              style={{ color: "#475569" }}
            >
              X
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-reset hover:text-success"
              style={{ color: "#475569" }}
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
