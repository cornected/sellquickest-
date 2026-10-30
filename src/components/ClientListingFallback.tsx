"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatNaira, timeAgo } from "@/lib/format";
import { Eye, ShieldCheck, MapPin, Clock, Tag } from "lucide-react";
import { SaveAdButton } from "@/components/SaveAdButton";
import { ShareAdButton } from "@/components/ShareAdButton";
import { SafetyTipsCard } from "@/components/SafetyTipsCard";
import { ReportAdModal } from "@/components/ReportAdModal";
import { BuyWithEscrowModal } from "@/components/BuyWithEscrowModal";
import { MakeOfferModal } from "@/components/MakeOfferModal";
import { ListingCard } from "@/components/ListingCard";
import { RecentlyViewedAds } from "@/components/RecentlyViewedAds";
import { DEMO_LISTINGS } from "@/lib/demoData";
import { extractListingSpecs } from "@/lib/listingSpecs";

export function ClientListingFallback({ id }: { id: string }) {
  const [listing, setListing] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [sellerAds, setSellerAds] = useState<any[]>(DEMO_LISTINGS.slice(0, 4));
  const [relatedAds, setRelatedAds] = useState<any[]>(DEMO_LISTINGS.slice(4, 8));
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    try {
      const sessionRaw = localStorage.getItem("sq_session");
      if (sessionRaw) {
        setCurrentUser(JSON.parse(sessionRaw));
      }
    } catch {
      // ignore
    }

    async function loadFallback() {
      let foundListing: any | null = null;

      // 1. Check sessionStorage and localStorage cache of user-posted listings first
      try {
        const latestRaw = sessionStorage.getItem("sq_latest_listing");
        if (latestRaw) {
          const latestItem = JSON.parse(latestRaw);
          if (latestItem && String(latestItem?.id) === String(id)) {
            foundListing = latestItem;
          }
        }
      } catch {
        // ignore
      }

      if (!foundListing) {
        try {
          const postedRaw = localStorage.getItem("sq_my_posted_listings");
          if (postedRaw) {
            const postedList = JSON.parse(postedRaw);
            if (Array.isArray(postedList)) {
              const match = postedList.find((item: any) => String(item?.id) === String(id));
              if (match) {
                foundListing = match;
              }
            }
          }
        } catch {
          // ignore
        }
      }

      // 2. Also query /api/listings to fetch live server listings + recommendations
      try {
        const res = await fetch(`/api/listings?status=ALL`);
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data?.listings) ? data.listings : [];
          const match = list.find((item: any) => String(item?.id) === String(id));
          if (match) {
            if (!foundListing) {
              foundListing = match;
            } else {
              // Merge latest server seller details (e.g., avatarUrl) into locally cached listing
              foundListing = {
                ...foundListing,
                ...match,
                seller: {
                  ...(foundListing.seller || {}),
                  ...(match.seller || {}),
                  avatarUrl:
                    match.seller?.avatarUrl ||
                    foundListing.seller?.avatarUrl ||
                    null,
                },
              };
            }
          }
          if (list.length > 0 && mounted) {
            const others = list.filter((item: any) => String(item?.id) !== String(id));
            if (others.length >= 4) {
              setSellerAds(others.slice(0, 4));
              setRelatedAds(others.slice(4, 8).length >= 4 ? others.slice(4, 8) : others.slice(0, 4));
            }
          }
        }
      } catch {
        // ignore
      }

      if (mounted) {
        if (foundListing) {
          setListing(foundListing);
        }
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
        <p className="text-secondary fw-medium">Loading listing details...</p>
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

  const isSold = listing.status === "SOLD";
  const { specs, features, resolvedCondition } = extractListingSpecs(listing);

  // Parse images
  let verifiedImages: string[] = ["/placeholder.png"];
  if (listing.imageUrl && String(listing.imageUrl).trim() !== "") {
    try {
      const parsed = JSON.parse(listing.imageUrl);
      if (Array.isArray(parsed) && parsed.length > 0) {
        verifiedImages = parsed.filter(
          (u) => typeof u === "string" && u.trim() !== "" && u.trim() !== "https://unsplash.com"
        );
      } else if (typeof listing.imageUrl === "string" && listing.imageUrl.trim() !== "https://unsplash.com") {
        verifiedImages = [listing.imageUrl.trim()];
      }
    } catch {
      if (String(listing.imageUrl).startsWith("data:")) {
        verifiedImages = [String(listing.imageUrl).trim()];
      } else {
        verifiedImages = String(listing.imageUrl)
          .split(",")
          .map((u) => u.trim())
          .filter((u) => Boolean(u) && u !== "https://unsplash.com");
      }
    }
  }
  if (verifiedImages.length === 0) {
    verifiedImages = ["/placeholder.png"];
  }

  const sellerId = listing.sellerId || listing.seller?.id || currentUser?.id || "user-cornelius-admin";
  const isCurrentUserSeller =
    Boolean(currentUser?.id && String(sellerId) === String(currentUser.id)) ||
    Boolean(
      currentUser?.email &&
        listing.seller?.email &&
        String(currentUser.email).toLowerCase() === String(listing.seller.email).toLowerCase()
    );
  const sellerName =
    listing.seller?.name || (isCurrentUserSeller ? currentUser?.name : null) || "SellQuickest Merchant";
  const sellerAvatar =
    listing.seller?.avatarUrl || (isCurrentUserSeller ? currentUser?.avatarUrl : "") || "";
  const rawPhone = listing.seller?.phone || currentUser?.phone || "+2348031234567";
  const digitsOnly = rawPhone.replace(/\D/g, "");
  let waNumber = digitsOnly;
  if (waNumber.startsWith("0")) {
    waNumber = "234" + waNumber.slice(1);
  } else if (waNumber.length === 10) {
    waNumber = "234" + waNumber;
  }
  const waText = encodeURIComponent(
    `Hello! I saw your ad on SellQuickest: "${listing.title}" (${formatNaira(Number(listing.price) || 0)}). Is it still available?`
  );
  const waUrl = `https://wa.me/${waNumber || "2348031234567"}?text=${waText}`;

  const memberYear = listing.seller?.createdAt
    ? new Date(listing.seller.createdAt).getFullYear()
    : 2024;

  return (
    <main className="container py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ fontSize: "14px" }}>
          <li className="breadcrumb-item">
            <Link
              href="/"
              className="text-sq text-decoration-none"
              style={{ color: "#10b981" }}
            >
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              href="/browse"
              className="text-sq text-decoration-none"
              style={{ color: "#10b981" }}
            >
              {listing.category?.name || listing.subcategory || "Marketplace"}
            </Link>
          </li>
          <li
            className="breadcrumb-item active text-dark"
            aria-current="page"
            style={{ fontWeight: 500 }}
          >
            Ad Detail
          </li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* LEFT COLUMN PANEL: GALLERY & CONTENT (Identical to Demo Ad Detail Design) */}
        <div className="col-lg-8">
          <div
            className="card border-0 shadow-sm overflow-hidden mb-4"
            style={{ borderRadius: "24px", backgroundColor: "#ffffff" }}
          >
            {/* MAIN PAGE SLIDER SYSTEM */}
            <div className="position-relative bg-black" style={{ height: "500px" }}>
              <div
                className="position-relative w-100 h-100"
                style={{ cursor: "zoom-in" }}
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={verifiedImages[activeSlide] || verifiedImages[0]}
                  alt={`${listing.title} - View ${activeSlide + 1}`}
                  fill
                  className="object-fit-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* SLIDER DOT INDICATORS */}
              {verifiedImages.length > 1 && (
                <div className="carousel-indicators mb-2">
                  {verifiedImages.map((_, idx) => (
                    <button
                      key={`indicator-${idx}`}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      className={idx === activeSlide ? "active" : ""}
                      aria-current={idx === activeSlide ? "true" : "false"}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* MAIN PAGE SIDE ARROWS */}
              {verifiedImages.length > 1 && (
                <>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) =>
                        prev === 0 ? verifiedImages.length - 1 : prev - 1
                      )
                    }
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) =>
                        prev === verifiedImages.length - 1 ? 0 : prev + 1
                      )
                    }
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
            </div>

            {/* INTERACTIVE THUMBNAIL INDICATOR TRACK */}
            {verifiedImages.length > 1 && (
              <div
                className="p-3 bg-light border-bottom d-flex gap-2 overflow-x-auto"
                style={{
                  scrollbarWidth: "thin",
                  whiteSpace: "nowrap",
                  scrollBehavior: "smooth",
                }}
              >
                {verifiedImages.map((imgUrl, idx) => (
                  <button
                    key={`thumb-node-${idx}`}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className="position-relative rounded-3 overflow-hidden p-0 bg-transparent flex-shrink-0"
                    style={{
                      width: "76px",
                      height: "76px",
                      cursor: "pointer",
                      border:
                        idx === activeSlide
                          ? "3px solid #10b981"
                          : "2px solid #e2e8f0",
                      transition: "all 0.2s ease-in-out",
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-fit-cover"
                      sizes="76px"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* CORE PRODUCT METRICS AND DATA LAYOUT */}
            <div className="card-body p-4">
              {/* 1. TITLE & PRICE WITH ACTION TOOLBAR */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-2">
                <div>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <h1 className="h3 fw-bold m-0" style={{ color: "#0f172a" }}>
                      {listing.title}
                    </h1>
                    {isSold && (
                      <span className="badge bg-danger text-white fw-bold px-2.5 py-1 rounded-pill">
                        SOLD
                      </span>
                    )}
                  </div>

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
                    <span
                      className="d-inline-flex align-items-center gap-1"
                      suppressHydrationWarning
                    >
                      <Clock size={14} className="text-muted" />
                      {timeAgo(listing.createdAt || new Date().toISOString())}
                    </span>
                    <span className="d-inline-flex align-items-center gap-1 text-muted">
                      <Eye size={14} />
                      {(listing.views || 0) + 1} views
                    </span>
                    <span className="badge bg-light text-secondary border fw-normal">
                      ID: #{String(listing.id).slice(-6).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-md-end gap-2">
                  <div className="d-flex align-items-baseline gap-2">
                    <span
                      className="h3 fw-bold m-0 text-nowrap"
                      style={{
                        color: isSold ? "#94a3b8" : "#10b981",
                        letterSpacing: "-1px",
                      }}
                    >
                      {formatNaira(Number(listing.price) || 0)}
                    </span>
                    <span className="badge bg-success-subtle text-success border-0 px-2 py-1 small rounded-pill">
                      Negotiable
                    </span>
                  </div>

                  {/* ACTION UTILITY TOOLBAR: SAVE & SHARE */}
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <SaveAdButton listingId={listing.id} variant="detail" />
                    <ShareAdButton
                      title={listing.title}
                      price={formatNaira(Number(listing.price) || 0)}
                    />
                  </div>
                </div>
              </div>

              {/* SPECIFICATION SUMMARY BOXES */}
              <div className="row g-2 my-3">
                <div className="col-6 col-sm-4">
                  <div
                    className="rounded-3 h-100 d-flex flex-column justify-content-center"
                    style={{
                      padding: "11px 15px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #f1f5f9",
                    }}
                  >
                    <div
                      className="text-secondary fw-medium"
                      style={{ fontSize: "11.5px", marginBottom: "3px" }}
                    >
                      Condition
                    </div>
                    <div
                      className="fw-bold text-dark"
                      style={{ fontSize: "13.5px" }}
                    >
                      {resolvedCondition}
                    </div>
                  </div>
                </div>

                {listing.subcategory && (
                  <div className="col-6 col-sm-4">
                    <div
                      className="rounded-3 h-100 d-flex flex-column justify-content-center"
                      style={{
                        padding: "11px 15px",
                        backgroundColor: "#f8fafc",
                        border: "1px solid #f1f5f9",
                      }}
                    >
                      <div
                        className="text-secondary fw-medium"
                        style={{ fontSize: "11.5px", marginBottom: "3px" }}
                      >
                        Subcategory
                      </div>
                      <div
                        className="fw-bold text-dark"
                        style={{ fontSize: "13.5px" }}
                      >
                        {listing.subcategory}
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-6 col-sm-4">
                  <div
                    className="rounded-3 h-100 d-flex flex-column justify-content-center"
                    style={{
                      padding: "11px 15px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #f1f5f9",
                    }}
                  >
                    <div
                      className="text-secondary fw-medium"
                      style={{ fontSize: "11.5px", marginBottom: "3px" }}
                    >
                      Status
                    </div>
                    <div
                      className="fw-bold text-success"
                      style={{ fontSize: "13.5px" }}
                    >
                      Active
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. NEAT DATA TABLE FORMAT DIRECTLY UNDERNEATH */}
              <div
                className="table-responsive my-3 rounded-3 overflow-hidden"
                style={{ border: "1px solid #f1f5f9" }}
              >
                <table
                  className="table table-borderless m-0"
                  style={{ fontSize: "13.5px" }}
                >
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td
                        className="text-secondary"
                        style={{
                          width: "40%",
                          padding: "10px 15px",
                          backgroundColor: "#fcfcfd",
                          verticalAlign: "middle",
                        }}
                      >
                        Location
                      </td>
                      <td
                        className="fw-semibold text-dark"
                        style={{
                          padding: "10px 15px",
                          verticalAlign: "middle",
                        }}
                      >
                        {listing.location || "Lagos"}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td
                        className="text-secondary"
                        style={{
                          padding: "10px 15px",
                          backgroundColor: "#fcfcfd",
                          verticalAlign: "middle",
                        }}
                      >
                        Item Condition
                      </td>
                      <td
                        className="fw-semibold text-dark"
                        style={{
                          padding: "10px 15px",
                          verticalAlign: "middle",
                        }}
                      >
                        {resolvedCondition}
                      </td>
                    </tr>
                    {listing.subcategory && (
                      <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td
                          className="text-secondary"
                          style={{
                            padding: "10px 15px",
                            backgroundColor: "#fcfcfd",
                            verticalAlign: "middle",
                          }}
                        >
                          Subcategory
                        </td>
                        <td
                          className="fw-semibold text-dark"
                          style={{
                            padding: "10px 15px",
                            verticalAlign: "middle",
                          }}
                        >
                          {listing.subcategory}
                        </td>
                      </tr>
                    )}
                    {specs.map((spec) => (
                      <tr
                        key={`tbl-${spec.key}`}
                        style={{ borderBottom: "1px solid #f1f5f9" }}
                      >
                        <td
                          className="text-secondary"
                          style={{
                            padding: "10px 15px",
                            backgroundColor: "#fcfcfd",
                            verticalAlign: "middle",
                          }}
                        >
                          {spec.label}
                        </td>
                        <td
                          className="fw-semibold text-dark"
                          style={{
                            padding: "10px 15px",
                            verticalAlign: "middle",
                          }}
                        >
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        className="text-secondary"
                        style={{
                          padding: "10px 15px",
                          backgroundColor: "#fcfcfd",
                          verticalAlign: "middle",
                        }}
                      >
                        Ad Placement Status
                      </td>
                      <td
                        className="fw-semibold text-success"
                        style={{
                          padding: "10px 15px",
                          verticalAlign: "middle",
                        }}
                      >
                        Verified ✓
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 3. FULL-WIDTH DESCRIPTION PARAGRAPH BLOCK */}
              <div
                className="my-3 pt-3"
                style={{ borderTop: "1px solid #f1f5f9" }}
              >
                <h2
                  className="text-uppercase fw-bold mb-2"
                  style={{
                    color: "#0f172a",
                    fontSize: "12.5px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Description
                </h2>
                <p
                  className="mb-0 text-secondary w-100"
                  style={{
                    whiteSpace: "pre-wrap",
                    fontSize: "14px",
                    lineHeight: "1.65",
                  }}
                >
                  {listing.description}
                </p>
              </div>

              {/* 4. KEY SPECIFICATIONS & SELECTED FEATURES (NEATLY ORGANIZED & SPACED) */}
              {(specs.length > 0 || features.length > 0) && (
                <div
                  className="mt-3 pt-3"
                  style={{ borderTop: "1px solid #f1f5f9" }}
                >
                  {specs.length > 0 && (
                    <div className="mb-3">
                      <h3
                        className="text-uppercase fw-bold mb-2"
                        style={{
                          color: "#0f172a",
                          fontSize: "12.5px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Key Specifications
                      </h3>
                      <div className="row g-2">
                        {specs.map((spec) => (
                          <div
                            key={`card-${spec.key}`}
                            className="col-12 col-sm-6"
                          >
                            <div
                              className="d-flex flex-column justify-content-center h-100"
                              style={{
                                padding: "11px 15px",
                                borderRadius: "12px",
                                backgroundColor: "#f8fafc",
                                border: "1px solid #f1f5f9",
                                gap: "3px",
                              }}
                            >
                              <span
                                className="text-secondary fw-medium"
                                style={{ fontSize: "11.5px" }}
                              >
                                {spec.label}
                              </span>
                              <span
                                className="fw-bold text-dark"
                                style={{
                                  fontSize: "13.5px",
                                  lineHeight: "1.35",
                                  wordBreak: "break-word",
                                }}
                              >
                                {spec.value}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {features.length > 0 && (
                    <div className="mt-3 pt-1">
                      <h4
                        className="text-uppercase fw-bold mb-2"
                        style={{
                          color: "#0f172a",
                          fontSize: "12.5px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Features &amp; Highlights
                      </h4>
                      <div
                        className="d-flex flex-wrap"
                        style={{ gap: "8px" }}
                      >
                        {features.map((feat, idx) => (
                          <span
                            key={`feat-${idx}`}
                            className="badge text-dark fw-medium rounded-pill"
                            style={{
                              fontSize: "12.5px",
                              padding: "7px 14px",
                              backgroundColor: "#f8fafc",
                              border: "1px solid #e2e8f0",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <span
                              style={{
                                color: "#10b981",
                                fontWeight: 700,
                                fontSize: "13px",
                              }}
                            >
                              ✓
                            </span>
                            <span>{feat}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* MORE FROM THIS SELLER SECTION (Same width as Ad Details info, leaving space for right sidebar) */}
          {sellerAds.length > 0 && (
            <section style={{ marginTop: "52px", paddingTop: "8px" }}>
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ marginBottom: "26px" }}
              >
                <h2
                  className="h5 fw-bold m-0"
                  style={{ color: "#0f172a", letterSpacing: "-0.3px" }}
                >
                  More from this Seller
                </h2>
                <Link
                  href={`/seller/${sellerId}`}
                  className="text-decoration-none small fw-semibold"
                  style={{ color: "#10b981" }}
                >
                  View all ({sellerAds.length + 1}) →
                </Link>
              </div>
              <div className="row g-3">
                {sellerAds.map((item) => (
                  <div key={`seller-${item.id}`} className="col-6 col-md-3">
                    <ListingCard
                      listing={{
                        ...item,
                        imageUrl: item.imageUrl || null,
                        location: item.location || null,
                        medalTier: null,
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SIMILAR ADS SECTION (Same width as Ad Details info) */}
          {relatedAds.length > 0 && (
            <section style={{ marginTop: "48px", paddingTop: "8px" }}>
              <h2
                className="h5 fw-bold"
                style={{
                  color: "#0f172a",
                  letterSpacing: "-0.3px",
                  marginBottom: "26px",
                }}
              >
                Similar ads
              </h2>
              <div className="row g-3">
                {relatedAds.map((item) => (
                  <div key={`related-${item.id}`} className="col-6 col-md-3">
                    <ListingCard
                      listing={{
                        ...item,
                        imageUrl: item.imageUrl || null,
                        location: item.location || null,
                        medalTier: null,
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* RECENTLY VIEWED ADS ROW (Same width as Ad Details info) */}
          <RecentlyViewedAds
            currentListing={{
              id: listing.id,
              title: listing.title,
              price: Number(listing.price) || 0,
              imageUrl: listing.imageUrl || "/placeholder.png",
              location: listing.location || "Lagos",
              condition: listing.condition || "Used",
            }}
          />
        </div>

        {/* RIGHT COLUMN PANEL: REFINED SELLER INFORMATION WITH 5-STAR RATING MATRIX */}
        <div className="col-12 col-lg-4 ms-auto" style={{ maxWidth: "390px" }}>
          <div
            className="d-flex flex-column gap-4"
            style={{ position: "sticky", top: "2rem" }}
          >
            {/* HIGH-UTILITY SELLER INFORMATION CARD */}
            <aside
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* TOP RIGHT CORNER STATUS BADGE ICON */}
              <div
                style={{
                  position: "absolute",
                  top: "55px",
                  right: "22px",
                  fontSize: "35px",
                  zIndex: 10,
                  filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.12))",
                }}
                title="Verified Top Seller"
              >
                🔰
              </div>

              <div className="card-body p-4">
                <p
                  className="text-uppercase text-muted small mb-3 font-weight-bold"
                  style={{ letterSpacing: "0.8px", fontSize: "11px" }}
                >
                  Seller Information
                </p>

                {/* Identity Hub (Avatar & Name) */}
                <Link
                  href={`/seller/${sellerId}`}
                  className="d-flex align-items-center gap-3 mb-2 text-decoration-none text-dark"
                  title="View seller profile and storefront"
                >
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
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {sellerAvatar ? (
                      <Image
                        src={sellerAvatar}
                        alt={sellerName}
                        fill
                        className="object-fit-cover"
                        sizes="56px"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      sellerName.charAt(0).toUpperCase() || "S"
                    )}
                  </div>
                  <div style={{ paddingRight: "35px" }}>
                    <h2
                      className="h6 fw-bold mb-1"
                      style={{ color: "#0f172a", margin: 0 }}
                    >
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
                </Link>

                {/* SEPARATOR LINE */}
                <div
                  style={{
                    borderBottom: "1px solid rgba(15, 23, 42, 0.12)",
                    width: "100%",
                  }}
                />

                {/* STRUCTURED SELLER METRICS ROWS CONTAINER */}
                <div
                  style={{ fontSize: "13px", color: "#475569" }}
                  className="mb-4"
                >
                  <div className="d-flex justify-content-between py-2">
                    <span>Seller Type:</span>
                    <strong style={{ color: "#0f172a", fontWeight: 500 }}>
                      Individual Seller
                    </strong>
                  </div>
                  <div className="border-bottom border-light w-100" />

                  <div className="d-flex justify-content-between py-2">
                    <span>Location:</span>
                    <strong style={{ color: "#0f172a", fontWeight: 500 }}>
                      {listing.location || "Lagos, Nigeria"}
                    </strong>
                  </div>
                  <div className="border-bottom border-light w-100" />

                  <div className="d-flex justify-content-between py-2">
                    <span>Member since:</span>
                    <strong style={{ color: "#0f172a", fontWeight: 500 }}>
                      {memberYear}
                    </strong>
                  </div>
                  <div className="border-bottom border-light w-100" />

                  <div className="d-flex justify-content-between py-2">
                    <span>Seller activity:</span>
                    <strong style={{ color: "#10b981", fontWeight: 500 }}>
                      ● Active now
                    </strong>
                  </div>
                  <div className="border-bottom border-light w-100" />

                  {/* SELLER RATING ROW */}
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span>Seller rating:</span>
                    <div className="d-flex align-items-center">
                      <span
                        className="fw-bold"
                        style={{ color: "#f59e0b", fontSize: "14px" }}
                      >
                        ★ 5.0
                      </span>
                      <span
                        className="text-secondary small ms-2"
                        style={{ fontSize: "12px" }}
                      >
                        (1 review)
                      </span>
                    </div>
                  </div>

                  {/* SELLER VERIFICATION BADGES WITH SPACIOUS PILLS */}
                  <div className="d-flex align-items-center gap-2 flex-wrap my-3 pt-1 pb-1">
                    <span
                      className="badge bg-light text-dark border d-inline-flex align-items-center py-2 px-3 rounded-pill"
                      style={{ fontSize: "11.5px", backgroundColor: "#f8fafc", gap: "6px" }}
                    >
                      <span style={{ color: "#10b981", fontWeight: "bold" }}>
                        ✓
                      </span>
                      <span>Phone Verified</span>
                    </span>
                    <span
                      className="badge bg-light text-dark border d-inline-flex align-items-center py-2 px-3 rounded-pill"
                      style={{ fontSize: "11.5px", backgroundColor: "#f8fafc", gap: "6px" }}
                    >
                      <span>⚡</span>
                      <span>Replies in ~15m</span>
                    </span>
                  </div>
                </div>

                {/* SPACIOUS ACTION BUTTONS CONTAINER */}
                {isSold ? (
                  <div className="alert alert-danger rounded-4 py-3 px-3 text-center my-3">
                    <strong className="d-block" style={{ fontSize: "14.5px" }}>
                      ❌ Item Sold
                    </strong>
                    <span className="small text-muted">
                      This listing has been marked as sold by the seller.
                    </span>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3 w-100 my-2">
                    {/* WHATSAPP DIRECT CHAT ACTION BUTTON */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn fw-bold d-flex align-items-center justify-content-center gap-2 text-decoration-none w-100 shadow-sm"
                      style={{
                        height: "50px",
                        backgroundColor: "#25D366",
                        color: "#ffffff",
                        borderRadius: "25px",
                        border: "none",
                        fontSize: "14.5px",
                        boxShadow: "0 4px 14px rgba(37, 211, 102, 0.28)",
                      }}
                    >
                      <span style={{ fontSize: "18px" }}>💬</span> Chat on WhatsApp
                    </a>

                    <div className="d-flex gap-2 w-100">
                      <a
                        href={`tel:${rawPhone.replace(/\s/g, "")}`}
                        className="btn fw-bold d-flex align-items-center justify-content-center gap-2 text-decoration-none flex-grow-1"
                        style={{
                          height: "48px",
                          backgroundColor: "#10b981",
                          color: "#ffffff",
                          borderRadius: "24px",
                          border: "none",
                          fontSize: "13.5px",
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
                        }}
                      >
                        📞 Call Seller
                      </a>

                      <Link
                        href={`/messages/chat?listingId=${listing.id}`}
                        className="btn d-flex align-items-center justify-content-center text-decoration-none flex-grow-1"
                        style={{
                          height: "48px",
                          backgroundColor: "#ffffff",
                          color: "#10b981",
                          borderRadius: "24px",
                          fontWeight: 600,
                          fontSize: "13.5px",
                          border: "1.5px solid rgba(16, 185, 129, 0.3)",
                          boxShadow: "0 2px 6px rgba(16, 185, 129, 0.06)",
                        }}
                      >
                        💬 Live Chat
                      </Link>
                    </div>

                    {/* BUY SAFELY WITH ESCROW CHECKOUT BUTTON */}
                    <div className="w-100">
                      <BuyWithEscrowModal
                        listing={listing}
                        currentUser={currentUser}
                      />
                    </div>

                    {/* MAKE AN OFFER BARGAIN BUTTON */}
                    <div className="w-100">
                      <MakeOfferModal
                        listing={listing}
                        currentUser={currentUser}
                      />
                    </div>

                    {/* Master Vendor Profile Navigation Baseline Hook */}
                    <Link
                      href={`/seller/${sellerId}`}
                      className="btn btn-outline-secondary btn-sm w-100 d-flex align-items-center justify-content-center text-decoration-none rounded-pill py-2.5"
                      style={{
                        height: "46px",
                        fontSize: "13.5px",
                        fontWeight: 500,
                        borderRadius: "23px",
                      }}
                    >
                      🏪 Visit Seller Storefront →
                    </Link>
                  </div>
                )}
              </div>
            </aside>

            {/* Protective Safe Trading Tips Component */}
            <SafetyTipsCard />

            {/* REPORT AD MODAL LINK */}
            <div className="text-center pt-1 pb-3">
              <ReportAdModal
                listingId={listing.id}
                listingTitle={listing.title}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX OVERLAY */}
      {lightboxOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.92)", zIndex: 1055 }}
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="position-relative w-100 h-100 d-flex align-items-center justify-content-center p-3 p-md-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="btn-close btn-close-white position-absolute top-0 end-0 m-4"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
            />
            <div
              className="position-relative w-100 rounded-4 overflow-hidden"
              style={{ maxWidth: "1000px", height: "75vh" }}
            >
              <Image
                src={verifiedImages[activeSlide] || verifiedImages[0]}
                alt={listing.title}
                fill
                className="object-fit-contain"
                sizes="100vw"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
