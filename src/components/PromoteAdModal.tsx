"use client";

import { useState } from "react";
import Image from "next/image";
import { formatNaira } from "@/lib/format";
import { Sparkles, Flame, Zap, X, Check, Crown } from "lucide-react";

interface PromoteAdModalProps {
  listing: {
    id: string;
    title: string;
    price: number;
    imageUrl?: string;
  };
  onSuccess?: () => void;
}

export function PromoteAdModal({ listing, onSuccess }: PromoteAdModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"top" | "urgent" | "bump">("top");
  const [isPromoting, setIsPromoting] = useState(false);
  const [applied, setApplied] = useState(false);

  let displayImage = "/placeholder.png";
  if (listing.imageUrl) {
    displayImage = listing.imageUrl.includes(",")
      ? listing.imageUrl.split(",")[0].trim()
      : listing.imageUrl.trim();
  }

  const handleApplyPromo = () => {
    setIsPromoting(true);

    setTimeout(() => {
      try {
        const promoRaw = localStorage.getItem("sq_promoted_ads");
        const promoMap = promoRaw ? JSON.parse(promoRaw) : {};

        const expiresAt = new Date();
        if (selectedPlan === "top") expiresAt.setDate(expiresAt.getDate() + 7);
        else if (selectedPlan === "urgent") expiresAt.setDate(expiresAt.getDate() + 3);
        else expiresAt.setDate(expiresAt.getDate() + 1);

        promoMap[listing.id] = {
          tier: selectedPlan,
          label: selectedPlan === "top" ? "TOP AD" : selectedPlan === "urgent" ? "URGENT" : "BOOSTED",
          expiresAt: expiresAt.toISOString(),
          promotedAt: new Date().toISOString(),
        };

        localStorage.setItem("sq_promoted_ads", JSON.stringify(promoMap));

        // Add to notifications
        const notifRaw = localStorage.getItem("sq_user_notifications");
        const notifs = notifRaw ? JSON.parse(notifRaw) : [];
        notifs.unshift({
          id: `promo-notif-${Date.now()}`,
          title: `🚀 Ad Boosted: ${listing.title}`,
          text: `Your listing is now promoted as ${selectedPlan.toUpperCase()} with higher visibility!`,
          type: "success",
          listingId: listing.id,
          listingTitle: listing.title,
          createdAt: new Date().toISOString(),
          read: false,
        });
        localStorage.setItem("sq_user_notifications", JSON.stringify(notifs.slice(0, 25)));

        window.dispatchEvent(new Event("sq_promoted_ads_updated"));
        window.dispatchEvent(new Event("sq_notifications_updated"));

        setApplied(true);
        setTimeout(() => {
          setIsPromoting(false);
          setIsOpen(false);
          setApplied(false);
          if (onSuccess) onSuccess();
        }, 800);
      } catch (err) {
        console.error(err);
        setIsPromoting(false);
      }
    }, 600);
  };

  return (
    <>
      {/* TRIGGER BUTTON ON AD CARD */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn btn-sm rounded-pill px-3 fw-bold d-inline-flex align-items-center justify-content-center gap-1.5 text-nowrap transition-all shadow-2xs"
        style={{
          height: "38px",
          backgroundColor: "#fef3c7",
          color: "#b45309",
          border: "1px solid #fde68a",
          fontSize: "13px",
        }}
        title="Boost and promote this ad to sell 5x faster"
      >
        <Sparkles size={14} color="#d97706" />
        <span>Boost Ad</span>
      </button>

      {/* MODAL DIALOG */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 1070,
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="card border-0 shadow-lg w-100 bg-white overflow-hidden"
            style={{
              maxWidth: "500px",
              borderRadius: "24px",
              boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div
              className="p-3 px-4 d-flex align-items-center justify-content-between border-bottom"
              style={{
                background: "linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%)",
              }}
            >
              <div className="d-flex align-items-center gap-2">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#f59e0b",
                    color: "#ffffff",
                    boxShadow: "0 2px 8px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  <Crown size={20} />
                </div>
                <div>
                  <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: "15px" }}>
                    Promote & Boost Listing
                  </h6>
                  <span className="text-secondary" style={{ fontSize: "11px" }}>
                    Get up to 10x more inquiries and sell in 24 hours
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn btn-link text-secondary p-1 d-flex align-items-center justify-content-center text-decoration-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* AD SUMMARY */}
            <div className="p-3 px-4 border-bottom bg-light-subtle d-flex align-items-center gap-3">
              <div
                className="position-relative overflow-hidden flex-shrink-0"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: "#e2e8f0",
                }}
              >
                <Image
                  src={displayImage}
                  alt={listing.title}
                  fill
                  className="object-fit-cover"
                  sizes="48px"
                />
              </div>
              <div className="overflow-hidden flex-grow-1">
                <div className="fw-semibold text-truncate text-dark" style={{ fontSize: "13px" }}>
                  {listing.title}
                </div>
                <div className="text-success fw-bold" style={{ fontSize: "13.5px" }}>
                  {formatNaira(listing.price)}
                </div>
              </div>
            </div>

            {/* PROMOTION TIERS SELECTION */}
            <div className="p-4 d-flex flex-column gap-3">
              {/* TIER 1: TOP AD */}
              <div
                className={`p-3 rounded-4 border transition-all cursor-pointer ${
                  selectedPlan === "top"
                    ? "border-warning bg-warning bg-opacity-10 shadow-sm"
                    : "border-light-subtle bg-white hover-bg-light"
                }`}
                style={{ cursor: "pointer", borderRadius: "18px" }}
                onClick={() => setSelectedPlan("top")}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2.5">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-warning"
                      style={{
                        width: "36px",
                        height: "36px",
                        backgroundColor: "#fef3c7",
                      }}
                    >
                      <Crown size={18} />
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <strong className="text-dark" style={{ fontSize: "14px" }}>
                          TOP AD (7 Days)
                        </strong>
                        <span className="badge bg-warning text-dark fw-bold" style={{ fontSize: "10px" }}>
                          RECOMMENDED
                        </span>
                      </div>
                      <span className="text-secondary small" style={{ fontSize: "12px" }}>
                        Pinned above regular search results with gold ribbon banner
                      </span>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                      FREE Promo
                    </span>
                  </div>
                </div>
              </div>

              {/* TIER 2: URGENT SALE */}
              <div
                className={`p-3 rounded-4 border transition-all cursor-pointer ${
                  selectedPlan === "urgent"
                    ? "border-danger bg-danger bg-opacity-10 shadow-sm"
                    : "border-light-subtle bg-white hover-bg-light"
                }`}
                style={{ cursor: "pointer", borderRadius: "18px" }}
                onClick={() => setSelectedPlan("urgent")}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2.5">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-danger"
                      style={{
                        width: "36px",
                        height: "36px",
                        backgroundColor: "#fee2e2",
                      }}
                    >
                      <Flame size={18} />
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <strong className="text-dark" style={{ fontSize: "14px" }}>
                          URGENT SALE (3 Days)
                        </strong>
                        <span className="badge bg-danger text-white fw-bold" style={{ fontSize: "10px" }}>
                          HOT DEAL
                        </span>
                      </div>
                      <span className="text-secondary small" style={{ fontSize: "12px" }}>
                        Eye-catching crimson badge alerting ready cash buyers
                      </span>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                      FREE Promo
                    </span>
                  </div>
                </div>
              </div>

              {/* TIER 3: BUMP TO TOP */}
              <div
                className={`p-3 rounded-4 border transition-all cursor-pointer ${
                  selectedPlan === "bump"
                    ? "border-success bg-success bg-opacity-10 shadow-sm"
                    : "border-light-subtle bg-white hover-bg-light"
                }`}
                style={{ cursor: "pointer", borderRadius: "18px" }}
                onClick={() => setSelectedPlan("bump")}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2.5">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-success"
                      style={{
                        width: "36px",
                        height: "36px",
                        backgroundColor: "#dcfce7",
                      }}
                    >
                      <Zap size={18} />
                    </div>
                    <div>
                      <strong className="d-block text-dark" style={{ fontSize: "14px" }}>
                        BUMP TO TOP
                      </strong>
                      <span className="text-secondary small" style={{ fontSize: "12px" }}>
                        Instantly refreshes listing timestamp back to page 1
                      </span>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                      Instant
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-3 px-4 border-top bg-light-subtle d-flex align-items-center justify-content-between">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn btn-light rounded-pill px-4 fw-medium border"
                style={{ fontSize: "13px" }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApplyPromo}
                disabled={isPromoting || applied}
                className="btn btn-warning rounded-pill px-4 py-2 fw-bold text-dark shadow-sm d-inline-flex align-items-center gap-2"
                style={{
                  fontSize: "13.5px",
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  color: "#ffffff",
                  border: "none",
                }}
              >
                {applied ? (
                  <>
                    <Check size={16} />
                    <span>Boost Activated!</span>
                  </>
                ) : isPromoting ? (
                  <span>Activating...</span>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Activate {selectedPlan.toUpperCase()} Free</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
