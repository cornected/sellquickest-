"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatNaira, timeAgo } from "@/lib/format";
import { SaveAdButton } from "@/components/SaveAdButton";

export function ListingCard({ listing }: { listing: any }) {
  const [promoTier, setPromoTier] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sq_promoted_ads");
      if (saved) {
        const map = JSON.parse(saved);
        if (map[listing.id]) {
          setPromoTier(map[listing.id].tier);
        }
      }
    } catch {
      // ignore
    }
  }, [listing.id]);
  // Safe extraction matching comma separated image strings
  let displayImage = "/placeholder.png";
  if (listing.imageUrl && listing.imageUrl.trim() !== "") {
    if (listing.imageUrl.includes(",")) {
      const parts = listing.imageUrl.split(",");
      if (parts[0] && parts[0].trim() !== "https://unsplash.com") {
        displayImage = parts[0].trim();
      }
    } else if (listing.imageUrl.trim() !== "https://unsplash.com") {
      displayImage = listing.imageUrl.trim();
    }
  }

  const isSold = listing.status === "SOLD";

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="text-decoration-none d-block h-100"
    >
      {/* 💡 PERFECT FRAME CHASSIS: Added p-3 padding to create that exact white border channel around the image box */}
      <div
        className="card h-100 border-0 shadow-sm p-3"
        style={{
          borderRadius: "24px",
          marginTop: "-14px",
          backgroundColor: "#ffffff",
          transition: "transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
          opacity: isSold ? 0.8 : 1,
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
        }}
      >
        {/* 1. SHORTENED IMAGE BOX (Sitting completely inside the white container frame padding bounds) */}
        <div
          className="position-relative w-100 rounded-4 overflow-hidden mb-2"
          style={{ height: "155px", backgroundColor: "#f8fafc" }}
        >
          <Image
            src={displayImage}
            alt={listing.title || "Product Image"}
            fill
            className="object-fit-cover"
            sizes="(max-width: 770px) 50vw, 250px"
          />

          {/* SOLD OVERLAY IF MARKED AS SOLD */}
          {isSold && (
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                zIndex: 3,
                backdropFilter: "blur(2px)",
              }}
            >
              <span
                className="badge bg-danger text-white fw-bold px-3 py-1.5 shadow"
                style={{ fontSize: "12px", letterSpacing: "1px" }}
              >
                SOLD
              </span>
            </div>
          )}

          {/* FLOATING TOP-LEFT VERIFIED & PROMOTED BADGES */}
          {!isSold && (
            <div
              className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1"
              style={{ zIndex: 3 }}
            >
              {promoTier === "top" ? (
                <span
                  className="d-inline-flex align-items-center gap-1 text-dark shadow-sm"
                  style={{
                    backgroundColor: "#fef08a",
                    border: "1px solid #facc15",
                    fontSize: "9px",
                    fontWeight: 700,
                    padding: "3px 7px",
                    borderRadius: "6px",
                    letterSpacing: "0.2px",
                  }}
                >
                  <span>👑</span>
                  <span>TOP AD</span>
                </span>
              ) : promoTier === "urgent" ? (
                <span
                  className="d-inline-flex align-items-center gap-1 text-white shadow-sm"
                  style={{
                    backgroundColor: "#ef4444",
                    border: "1px solid #dc2626",
                    fontSize: "9px",
                    fontWeight: 700,
                    padding: "3px 7px",
                    borderRadius: "6px",
                    letterSpacing: "0.2px",
                  }}
                >
                  <span>🔥</span>
                  <span>URGENT</span>
                </span>
              ) : (
                <span
                  className="d-inline-flex align-items-center gap-1 text-white shadow-xs"
                  style={{
                    backgroundColor: "rgba(15, 23, 42, 0.72)",
                    backdropFilter: "blur(6px)",
                    fontSize: "9px",
                    fontWeight: 600,
                    padding: "3px 7px",
                    borderRadius: "6px",
                    letterSpacing: "0.2px",
                  }}
                >
                  <span style={{ color: "#10b981", fontSize: "9.5px" }}>✓</span>
                  <span>Verified</span>
                </span>
              )}
            </div>
          )}

          {/* FLOATING TOP-RIGHT FAVORITE BUTTON */}
          <div
            className="position-absolute top-0 end-0 m-1.5"
            style={{ zIndex: 4 }}
          >
            <SaveAdButton listingId={listing.id} />
          </div>
        </div>

        {/* 2. SPECIFIC TEXT CONTENT LAYERS (Padded and left-aligned) */}
        <div className="w-100 d-flex flex-column gap-1 flex-grow-1 p-0 text-start align-items-start">
          {/* 💡 FIXED: LINE CLAMPED PRODUCT TITLE (Wraps onto 2 lines instead of cutting off immediately) */}
          <h5
            style={{
              fontWeight: 400,
              fontSize: "13px",
              marginBottom: "-1px",
              color: "#334155",
              lineHeight: "1.4",
              height:
                "40px" /* 💡 LOCKS HEIGHT: Keeps all grid box boundaries aligned if a title is short */,
              display: "-webkit-box",
              WebkitLineClamp: 2 /* 💡 Locks text to exactly 2 lines maximum */,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            title={listing.title}
          >
            {listing.title}
          </h5>

          {/* Condition, Star Review rating tracking, and Relative Timestamp metadata strip */}
          <div
            className="d-flex align-items-center text-start justify-content-start gap-1 text-secondary w-100"
            style={{ fontSize: "11px", opacity: 0.85 }}
          >
            <span
              className="text-uppercase fw-bold text-dark"
              style={{ fontSize: "10px", letterSpacing: "0.2px" }}
            >
              {listing.condition || "NEW"}
            </span>
            <span className="text-muted" style={{ fontSize: "8px" }}>
              •
            </span>
            <span style={{ color: "#eab308", fontWeight: 500 }}>★ 4.8</span>
            <span className="text-muted" style={{ fontSize: "8px" }}>
              •
            </span>
            <span suppressHydrationWarning style={{ color: "#94a3b8" }}>
              {timeAgo(listing.createdAt)}
            </span>
          </div>

          {/* MINT-GREEN CAPSULE PRICE PILL (Floating centered below left-aligned headers) */}
          <div className="mt-2 mb-1.5 w-100 d-flex justify-content-center">
            <div
              style={{
                backgroundColor: "#e8f5e9",
                fontWeight: 700,
                color: "#10b981",
                fontSize: "13px",
                padding: "4px 55px",
                borderRadius: "7px",
                marginTop: "3px",
                display: "inline-block",
              }}
            >
              {formatNaira(listing.price || 0)}
            </div>
          </div>

          {/* BASELINE RED LOCATION PIN LABEL STRIP */}
          <div
            className="d-flex align-items-center justify-content-center gap-1 text-secondary mt-auto pt-1 w-100"
            style={{ fontSize: "11px", color: "#64748b", opacity: 0.9 }}
          >
            <span style={{ color: "#ef4444", fontSize: "10px" }}>📍</span>
            <span>
              {listing.location
                ? listing.location.split(",")[0].trim()
                : "Lagos"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
