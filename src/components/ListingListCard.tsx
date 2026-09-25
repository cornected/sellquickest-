"use client";

import Image from "next/image";
import Link from "next/link";
import { formatNaira, timeAgo } from "@/lib/format";
import { SaveAdButton } from "@/components/SaveAdButton";

export function ListingListCard({
  listing,
  index,
}: {
  listing: any;
  index?: number;
}) {
  // Safe image extraction matching comma separated image strings
  let displayImage = "/placeholder.png";
  if (listing.imageUrl && listing.imageUrl.trim() !== "") {
    if (listing.imageUrl.startsWith("[")) {
      try {
        const parsed = JSON.parse(listing.imageUrl);
        if (Array.isArray(parsed) && parsed.length > 0) {
          displayImage = parsed[0];
        }
      } catch {
        displayImage = "/placeholder.png";
      }
    } else if (listing.imageUrl.includes(",")) {
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
      className="text-decoration-none text-reset d-block w-100"
    >
      <div
        className="d-flex align-items-center bg-white border-0 w-100 position-relative transition-all"
        style={{
          height: "115px",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(15, 23, 42, 0.01)",
          padding: "12px",
          gap: "14px",
          opacity: isSold ? 0.8 : 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 18px rgba(0, 0, 0, 0.06)";
        }}
      >
        {/* Left Side: Curved Square Image Wrapper */}
        <div
          className="position-relative overflow-hidden flex-shrink-0 d-flex align-items-center justify-content-center bg-light"
          style={{
            width: "85px",
            height: "85px",
            borderRadius: "14px",
            backgroundColor: "#f1f5f9",
          }}
        >
          <Image
            src={displayImage}
            alt={listing.title || "Ad"}
            fill
            className="object-fit-cover"
            sizes="85px"
          />

          {/* FLOATING TOP-LEFT VERIFIED BADGE */}
          {!isSold && (
            <div
              className="position-absolute top-0 start-0 m-1"
              style={{ zIndex: 3 }}
            >
              <span
                className="d-inline-flex align-items-center gap-0.5 text-white shadow-xs"
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.72)",
                  backdropFilter: "blur(6px)",
                  fontSize: "8px",
                  fontWeight: 600,
                  padding: "2px 5px",
                  borderRadius: "5px",
                  letterSpacing: "0.2px",
                }}
              >
                <span style={{ color: "#10b981", fontSize: "8.5px" }}>✓</span>
                <span>Verified</span>
              </span>
            </div>
          )}

          {isSold && (
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.55)",
                zIndex: 3,
              }}
            >
              <span
                className="badge bg-danger text-white fw-bold px-2 py-0.5"
                style={{ fontSize: "9px", letterSpacing: "1px" }}
              >
                SOLD
              </span>
            </div>
          )}
        </div>

        {/* Center: Structured Text Info Metadata */}
        <div
          className="flex-grow-1 overflow-hidden"
          style={{ paddingRight: "36px" }}
        >
          {/* Item Title Container */}
          <h4
            style={{
              fontSize: "13px",
              fontWeight: 400,
              color: "#1e293b",
              lineHeight: "1.4",
              marginBottom: "8px",
              margin: "0 0 4px 0",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {listing.title}
          </h4>

          {/* Pricing Row with Status Capsule Inline & Star Rating */}
          <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                backgroundColor: "#e8f5e9",
                padding: "4px 15px",
                borderRadius: "7px",
                color: "#10b981",
              }}
            >
              {formatNaira(listing.price)}
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#64748b",
                backgroundColor: "#f1f5f9",
                padding: "2px 6px",
                borderRadius: "4px",
                textTransform: "uppercase",
              }}
            >
              {listing.condition || "New"}
            </span>
            <span
              className="d-inline-flex align-items-center gap-0.5"
              style={{
                color: "#eab308",
                fontWeight: 600,
                fontSize: "11px",
              }}
            >
              <span>★</span>
              <span>4.8</span>
            </span>
          </div>

          {/* Bottom Location and Time Meta Row */}
          <div
            className="d-flex align-items-center text-muted"
            style={{ fontSize: "12px", marginTop: "6px" }}
          >
            <span style={{ marginRight: "4px" }}>📍</span>
            <span className="text-truncate">
              {listing.location || "Lagos, Nigeria"} •{" "}
              <span suppressHydrationWarning>
                {timeAgo(listing.createdAt)}
              </span>
            </span>
          </div>
        </div>

        {/* Right Side: Floating Save / Favorite Button */}
        <div
          className="position-absolute"
          style={{
            right: "10px",
            top: "10px",
            zIndex: 4,
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <SaveAdButton listingId={listing.id} />
        </div>
      </div>
    </Link>
  );
}

// Export SidebarChecklistCard as an alias for backwards compatibility
export const SidebarChecklistCard = ListingListCard;
