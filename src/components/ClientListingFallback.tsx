"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatNaira, timeAgo } from "@/lib/format";
import { Eye, ShieldCheck, MapPin, Clock, Tag, CheckCircle2 } from "lucide-react";
import { SaveAdButton } from "@/components/SaveAdButton";
import { ShareAdButton } from "@/components/ShareAdButton";
import { SafetyTipsCard } from "@/components/SafetyTipsCard";

export function ClientListingFallback({ id }: { id: string }) {
  const [listing, setListing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function loadFallback() {
      // 1. Check sessionStorage and localStorage cache of user-posted listings first
      try {
        const latestRaw = sessionStorage.getItem("sq_latest_listing");
        if (latestRaw) {
          const latestItem = JSON.parse(latestRaw);
          if (latestItem && String(latestItem?.id) === String(id) && mounted) {
            setListing(latestItem);
            setLoading(false);
            return;
          }
        }
      } catch {
        // ignore
      }

      try {
        const postedRaw = localStorage.getItem("sq_my_posted_listings");
        if (postedRaw) {
          const postedList = JSON.parse(postedRaw);
          if (Array.isArray(postedList)) {
            const match = postedList.find((item: any) => String(item?.id) === String(id));
            if (match && mounted) {
              setListing(match);
              setLoading(false);
              return;
            }
          }
        }
      } catch {
        // ignore
      }

      // 2. Fallback: query /api/listings
      try {
        const res = await fetch(`/api/listings?status=ALL`);
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data?.listings) ? data.listings : [];
          const match = list.find((item: any) => String(item?.id) === String(id));
          if (match && mounted) {
            setListing(match);
            setLoading(false);
            return;
          }
        }
      } catch {
        // ignore
      }

      if (mounted) {
        setLoading(false);
      }
    }

    loadFallback();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="container py-5 text-center">
        <div className="spinner-border text-success mb-3" role="status" />
        <p className="text-secondary fw-medium">Loading your listing details...</p>
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="container py-5 text-center" style={{ maxWidth: 560 }}>
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          <div className="fs-1 mb-3">🔍</div>
          <h1 className="h4 fw-bold text-dark mb-2">Listing Not Found</h1>
          <p className="text-secondary small mb-4">
            We couldn&apos;t find the listing you&apos;re looking for. It may have been removed or the link may have expired.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link href="/browse" className="btn btn-sq text-white fw-bold px-4 py-2 rounded-pill">
              Browse Marketplace
            </Link>
            <Link href="/my-ads" className="btn btn-outline-secondary fw-semibold px-4 py-2 rounded-pill">
              View My Ads
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Parse images
  let verifiedImages: string[] = ["/placeholder.png"];
  if (listing.imageUrl && String(listing.imageUrl).trim() !== "") {
    try {
      const parsed = JSON.parse(listing.imageUrl);
      if (Array.isArray(parsed) && parsed.length > 0) {
        verifiedImages = parsed.filter((u) => typeof u === "string" && u.trim() !== "");
      } else if (typeof listing.imageUrl === "string") {
        verifiedImages = [listing.imageUrl.trim()];
      }
    } catch {
      verifiedImages = String(listing.imageUrl)
        .split(",")
        .map((u) => u.trim())
        .filter(Boolean);
    }
  }
  if (verifiedImages.length === 0) {
    verifiedImages = ["/placeholder.png"];
  }

  // Parse structured specifications
  let genericSpecs: Record<string, any> | null = null;
  try {
    if (listing.spareDetails) {
      const parsed =
        typeof listing.spareDetails === "string"
          ? JSON.parse(listing.spareDetails)
          : listing.spareDetails;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        genericSpecs = parsed;
      }
    }
  } catch {
    // ignore
  }

  const sellerName = listing.seller?.name || "Verified Seller";
  const sellerPhone = listing.seller?.phone || "";
  const digitsOnly = sellerPhone.replace(/\D/g, "");
  let waNumber = digitsOnly;
  if (waNumber.startsWith("0")) {
    waNumber = "234" + waNumber.slice(1);
  } else if (waNumber.length === 10) {
    waNumber = "234" + waNumber;
  }
  const waText = encodeURIComponent(
    `Hello! I saw your ad on SellQuickest: "${listing.title}" (${formatNaira(listing.price)}). Is it still available?`
  );
  const waUrl = waNumber ? `https://wa.me/${waNumber}?text=${waText}` : null;

  return (
    <main className="container py-4">
      <div className="alert alert-success border-0 shadow-2xs rounded-4 d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4 py-2.5 px-3.5">
        <div className="d-flex align-items-center gap-2">
          <CheckCircle2 size={18} className="text-success flex-shrink-0" />
          <span className="small fw-semibold">
            Your ad is live on SellQuickest!
          </span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Link href="/my-ads" className="btn btn-sm btn-success rounded-pill px-3 fw-semibold">
            Manage in My Ads
          </Link>
          <Link href="/post" className="btn btn-sm btn-outline-success bg-white rounded-pill px-3 fw-semibold">
            + Post Another Ad
          </Link>
        </div>
      </div>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ fontSize: "14px" }}>
          <li className="breadcrumb-item">
            <Link href="/" className="text-sq text-decoration-none" style={{ color: "#10b981" }}>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/browse" className="text-sq text-decoration-none" style={{ color: "#10b981" }}>
              {listing.category?.name || listing.subcategory || "Marketplace"}
            </Link>
          </li>
          <li className="breadcrumb-item active text-dark" aria-current="page" style={{ fontWeight: 500 }}>
            {listing.title}
          </li>
        </ol>
      </nav>

      <div className="row g-4">
        <div className="col-lg-8">
          <div
            className="card border-0 shadow-sm overflow-hidden mb-4"
            style={{ borderRadius: "24px", backgroundColor: "#ffffff" }}
          >
            {/* Image Gallery */}
            <div className="position-relative bg-black" style={{ height: "460px" }}>
              <img
                src={verifiedImages[activeSlide] || verifiedImages[0]}
                alt={listing.title}
                className="w-100 h-100 object-fit-cover"
              />
              {verifiedImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) => (prev === 0 ? verifiedImages.length - 1 : prev - 1))
                    }
                    className="btn btn-dark bg-opacity-75 rounded-circle position-absolute top-50 start-0 translate-middle-y ms-3"
                    style={{ width: 42, height: 42 }}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) => (prev === verifiedImages.length - 1 ? 0 : prev + 1))
                    }
                    className="btn btn-dark bg-opacity-75 rounded-circle position-absolute top-50 end-0 translate-middle-y me-3"
                    style={{ width: 42, height: 42 }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {verifiedImages.length > 1 && (
              <div className="p-3 bg-light border-bottom d-flex gap-2 overflow-x-auto">
                {verifiedImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className="position-relative rounded-3 overflow-hidden p-0 bg-transparent flex-shrink-0"
                    style={{
                      width: "76px",
                      height: "76px",
                      border: idx === activeSlide ? "3px solid #10b981" : "2px solid #e2e8f0",
                    }}
                  >
                          <img src={imgUrl} alt={`Thumb ${idx + 1}`} className="w-100 h-100 object-fit-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="card-body p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-2">
                <div>
                  <h1 className="h3 fw-bold m-0" style={{ color: "#0f172a" }}>
                    {listing.title}
                  </h1>
                  <div
                    className="d-flex align-items-center gap-3 mt-2 text-secondary flex-wrap"
                    style={{ fontSize: "13px" }}
                  >
                    <span className="d-inline-flex align-items-center gap-1">
                      <MapPin size={14} className="text-muted" />
                      {listing.location || "Lagos"}
                    </span>
                    <span className="d-inline-flex align-items-center gap-1">
                      <Tag size={14} className="text-muted" />
                      {listing.condition || "Used"}
                    </span>
                    <span className="d-inline-flex align-items-center gap-1" suppressHydrationWarning>
                      <Clock size={14} className="text-muted" />
                      {timeAgo(listing.createdAt || new Date().toISOString())}
                    </span>
                    <span className="d-inline-flex align-items-center gap-1 text-muted">
                      <Eye size={14} />
                      {(listing.views || 1)} views
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-md-end gap-2">
                  <div className="d-flex align-items-baseline gap-2">
                    <span
                      className="h3 fw-bold m-0 text-nowrap"
                      style={{ color: "#10b981", letterSpacing: "-1px" }}
                    >
                      {formatNaira(Number(listing.price) || 0)}
                    </span>
                    <span className="badge bg-success-subtle text-success border-0 px-2 py-1 small rounded-pill">
                      Negotiable
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <SaveAdButton listingId={listing.id} variant="detail" />
                    <ShareAdButton
                      title={listing.title}
                      price={formatNaira(Number(listing.price) || 0)}
                    />
                  </div>
                </div>
              </div>

              <div className="row g-2 my-4">
                <div className="col-6 col-sm-4">
                  <div className="p-3 bg-light rounded-4">
                    <div className="text-secondary" style={{ fontSize: "11px" }}>
                      Condition
                    </div>
                    <div className="fw-bold text-dark mt-1" style={{ fontSize: "14px" }}>
                      {listing.condition || "Used"}
                    </div>
                  </div>
                </div>
                {listing.subcategory && (
                  <div className="col-6 col-sm-4">
                    <div className="p-3 bg-light rounded-4">
                      <div className="text-secondary" style={{ fontSize: "11px" }}>
                        Subcategory
                      </div>
                      <div className="fw-bold text-dark mt-1 text-truncate" style={{ fontSize: "14px" }}>
                        {listing.subcategory}
                      </div>
                    </div>
                  </div>
                )}
                <div className="col-6 col-sm-4">
                  <div className="p-3 bg-light rounded-4">
                    <div className="text-secondary" style={{ fontSize: "11px" }}>
                      Status
                    </div>
                    <div className="fw-bold text-success mt-1" style={{ fontSize: "14px" }}>
                      Active ✓
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-bottom border-light w-100 my-4" />

              <h2 className="h5 mt-4 fw-bold" style={{ color: "#0f172a" }}>
                Description
              </h2>
              <p
                className="mb-0 text-muted w-100"
                style={{ whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: "1.6" }}
              >
                {listing.description}
              </p>

              {genericSpecs && Object.keys(genericSpecs).length > 0 && (
                <div className="mt-4 pt-3 border-top border-light-subtle">
                  <h3 className="h6 fw-bold mb-3 text-dark">Key Specifications</h3>
                  <div className="row g-2">
                    {Object.entries(genericSpecs)
                      .filter(([k, v]) => !k.startsWith("custom") && v && (!Array.isArray(v) || v.length > 0))
                      .map(([key, rawVal]) => {
                        const val = Array.isArray(rawVal) ? rawVal.join(", ") : String(rawVal);
                        const label = key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase());
                        return (
                          <div key={key} className="col-12 col-sm-6">
                            <div className="p-2.5 rounded-3 bg-light d-flex flex-column">
                              <span className="text-secondary" style={{ fontSize: "11px" }}>
                                {label}
                              </span>
                              <span className="fw-semibold text-dark text-truncate mt-0.5" style={{ fontSize: "13px" }}>
                                {val}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Seller Card */}
        <div className="col-12 col-lg-4 ms-auto" style={{ maxWidth: "390px" }}>
          <div className="d-flex flex-column gap-4">
            <aside className="card border-0 shadow-sm" style={{ borderRadius: "24px", overflow: "hidden" }}>
              <div className="card-body p-4">
                <p
                  className="text-uppercase text-muted small mb-3 font-weight-bold"
                  style={{ letterSpacing: "0.8px", fontSize: "11px" }}
                >
                  Seller Information
                </p>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      backgroundColor: "rgb(232, 247, 240)",
                      color: "#10b981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      fontWeight: 700,
                    }}
                  >
                    {sellerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="h6 fw-bold mb-1" style={{ color: "#0f172a", margin: 0 }}>
                      {sellerName}
                    </h2>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#10b981",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <ShieldCheck size={14} /> Verified Profile
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "13px", color: "#475569" }} className="mb-4">
                  <div className="d-flex justify-content-between py-2 border-bottom border-light">
                    <span>Location:</span>
                    <strong className="text-dark">{listing.location || "Lagos, Nigeria"}</strong>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom border-light">
                    <span>Seller activity:</span>
                    <strong style={{ color: "#10b981" }}>● Active now</strong>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2.5">
                  {waUrl && (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn fw-bold d-flex align-items-center justify-content-center gap-2 text-decoration-none w-100 shadow-sm"
                      style={{
                        height: "48px",
                        backgroundColor: "#25D366",
                        color: "#ffffff",
                        borderRadius: "24px",
                      }}
                    >
                      💬 Chat on WhatsApp
                    </a>
                  )}
                  <Link
                    href="/my-ads"
                    className="btn btn-outline-secondary w-100 rounded-pill py-2 fw-semibold"
                  >
                    Manage My Listings →
                  </Link>
                </div>
              </div>
            </aside>
            <SafetyTipsCard />
          </div>
        </div>
      </div>
    </main>
  );
}
