"use client";

import React, { useState } from "react";
import Link from "next/link";

interface CategoryGridExpanderProps {
  categories?: any[];
}

export default function CategoryGridExpander({
  categories = [],
}: CategoryGridExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Soft pastel color palette distributed cyclically across your capsule components
  const premiumPastelColors = [
    "#e8f7f0",
    "#e0f2fe",
    "#fef3e7",
    "#f3e8ff",
    "#ffe4e6",
    "#f0fdf4",
    "#fff7ed",
    "#f8fafc",
  ];

  // Safeguard array references before performing structural operations
  const safeCategories = Array.isArray(categories) ? [...categories] : [];

  // We map ALL safe categories now so that CSS transitions can animate the hidden rows into view smoothly
  return (
    <>
      {/* Title Header Section */}
      <div className="d-flex align-items-center justify-content-between mb-4 px-1">
        <div>
          <h2
            style={{
              fontWeight: 650,
              fontSize: "1.10rem",
              letterSpacing: "-0.1px",
            }}
          >
            Categories
          </h2>
        </div>

        {safeCategories.length > 12 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-link text-success fw-bold text-decoration-none small p-0 border-0 shadow-none"
            style={{ cursor: "pointer", fontSize: "0.9rem" }}
          >
            {isExpanded ? (
              <>
                Show less <i className="bi bi-chevron-up ms-1"></i>
              </>
            ) : (
              <>
                View all <i className="bi bi-chevron-down ms-1"></i>
              </>
            )}
          </button>
        )}
      </div>

      {/* Smooth Animate Height Shield Wrapper */}
      <div
        style={{
          maxHeight: isExpanded ? "1200px" : "310px", // 310px perfectly hugs exactly 2 rows of cards + gap
          overflow: "hidden",
          transition: "max-height 0.7s cubic-bezier(0.4, 0, 0.2, 1)", // Premium fluid glide easing curve
          width: "100%",
          paddingBottom: "1.0rem", // Slight padding to prevent clipping of shadows on the last row
        }}
      >
        {/* Categories Grid Matrix Wrapper */}
        <div className="category-grid-container">
          {safeCategories.map((cat, index) => {
            const assignedBg =
              premiumPastelColors[index % premiumPastelColors.length] ||
              "transparent";

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="category-image-capsule-card"
                style={{
                  backgroundColor: assignedBg,
                  // FORCES THE CARD TO HAVE A SOFT RESTING FLOATING SHADOW INSTANTLY
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.04)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                // FORCES THE DEEP HOVER SHADOW TO ENGAGE WHEN THE CURSOR TOUCHES IT
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 28px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0, 0, 0, 0.04)";
                }}
              >
                <div className="category-capsule-graphic">{cat.icon}</div>
                <div className="category-capsule-title">{cat.name}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
