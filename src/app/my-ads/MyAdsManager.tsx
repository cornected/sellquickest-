"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatNaira, timeAgo } from "@/lib/format";
import { PromoteAdModal } from "@/components/PromoteAdModal";

export function MyAdsManager({ initialListings }: { initialListings: any[] }) {
  const [listings, setListings] = useState<any[]>(initialListings);
  const [filterTab, setFilterTab] = useState<"all" | "active" | "sold">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [promotedMap, setPromotedMap] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadPromos = () => {
      try {
        const saved = localStorage.getItem("sq_promoted_ads");
        if (saved) setPromotedMap(JSON.parse(saved));
      } catch {
        // ignore
      }
    };
    loadPromos();
    window.addEventListener("sq_promoted_ads_updated", loadPromos);
    return () => window.removeEventListener("sq_promoted_ads_updated", loadPromos);
  }, []);

  // Sync listings with client session user and locally cached posted ads
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { syncClientDataToServer, getLocalUserAds } = await import("@/lib/clientSync");
        await syncClientDataToServer();

        const localPosted = getLocalUserAds();

        const mergeWithoutDuplicates = (baseList: any[], incomingList: any[]) => {
          const merged = [...baseList];
          for (const item of incomingList) {
            if (!item || !item.id) continue;
            const isDuplicateId = merged.some((m) => m.id === item.id);
            const isDuplicateSuitFallback =
              (item.id === "ad-cornected-suit" &&
                merged.some(
                  (m) => String(m.title || "").toLowerCase().trim() === "hvgfhvjgvgvghv"
                )) ||
              (String(item.title || "").toLowerCase().trim() === "hvgfhvjgvgvghv" &&
                merged.some((m) => m.id === "ad-cornected-suit"));
            if (!isDuplicateId && !isDuplicateSuitFallback) {
              merged.push(item);
            }
          }
          return merged;
        };

        const stored = localStorage.getItem("sq_session");
        if (stored) {
          const u = JSON.parse(stored);
          if (u?.id || u?.email || u?.name) {
            const qs = new URLSearchParams({ status: "ALL" });
            if (u.id) qs.set("sellerId", String(u.id));
            if (u.email) qs.set("sellerEmail", String(u.email));
            if (u.name) qs.set("sellerName", String(u.name));
            fetch(`/api/listings?${qs.toString()}`)
              .then((r) => r.json())
              .then((data) => {
                if (!mounted) return;
                const serverList = data.success && Array.isArray(data.listings) ? data.listings : [];
                const merged = mergeWithoutDuplicates(localPosted, serverList);
                if (merged.length > 0) {
                  setListings(merged);
                }
              })
              .catch(() => {
                if (mounted && localPosted.length > 0) {
                  setListings((prev) => mergeWithoutDuplicates(localPosted, prev));
                }
              });
            return;
          }
        }

        if (mounted && localPosted.length > 0) {
          setListings((prev) => mergeWithoutDuplicates(localPosted, prev));
        }
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sq_my_ads_view");
      if (saved === "grid" || saved === "list") {
        setViewMode(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const changeViewMode = (mode: "grid" | "list") => {
    setViewMode(mode);
    try {
      localStorage.setItem("sq_my_ads_view", mode);
    } catch {
      // ignore
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "SOLD" ? "ACTIVE" : "SOLD";
    setUpdatingId(id);

    try {
      const res = await fetch("/api/listings/manage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });

      if (res.ok) {
        setListings((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: nextStatus } : l))
        );
      }
    } catch (err) {
      console.error("Network error updating listing:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteListing = async (id: string, _title: string) => {
    setUpdatingId(id);

    try {
      const res = await fetch(`/api/listings/manage?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setListings((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error("Network error deleting listing:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const displayedListings = listings.filter((l) => {
    if (filterTab === "active") return l.status !== "SOLD";
    if (filterTab === "sold") return l.status === "SOLD";
    return true;
  });

  const activeCount = listings.filter((l) => l.status !== "SOLD").length;
  const soldCount = listings.filter((l) => l.status === "SOLD").length;

  if (listings.length === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-3">
        <div
          className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: "72px",
            height: "72px",
            backgroundColor: "#f1f5f9",
            fontSize: "2rem",
          }}
        >
          📦
        </div>
        <h2 className="h5 fw-bold mb-2">You haven&apos;t posted any ads yet</h2>
        <p
          className="text-muted mx-auto mb-4"
          style={{ maxWidth: "420px", fontSize: "0.95rem" }}
        >
          Reach millions of buyers across Nigeria by posting your first advertisement in minutes.
        </p>
        <div>
          <Link
            href="/post"
            className="btn btn-sq text-white fw-semibold px-4 py-2.5 rounded-pill shadow-sm"
          >
            + Post Your First Ad
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* FILTER TABS & GRID/LIST VIEW TOGGLE */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2">
        {/* View All / Active / Sold Filter Buttons */}
        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={`btn btn-sm rounded-pill px-3.5 py-2 fw-medium transition-all ${
              filterTab === "all"
                ? "btn-sq text-white shadow-sm"
                : "btn-light text-secondary border"
            }`}
            style={{ fontSize: "13.5px" }}
          >
            View All ({listings.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("active")}
            className={`btn btn-sm rounded-pill px-3.5 py-2 fw-medium transition-all ${
              filterTab === "active"
                ? "btn-sq text-white shadow-sm"
                : "btn-light text-secondary border"
            }`}
            style={{ fontSize: "13.5px" }}
          >
            Active ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("sold")}
            className={`btn btn-sm rounded-pill px-3.5 py-2 fw-medium transition-all ${
              filterTab === "sold"
                ? "btn-sq text-white shadow-sm"
                : "btn-light text-secondary border"
            }`}
            style={{ fontSize: "13.5px" }}
          >
            Sold ({soldCount})
          </button>
        </div>

        {/* Grid / List View Toggle Control */}
        <div
          className="d-flex align-items-center bg-light p-1 rounded-pill border shadow-2xs"
          style={{ width: "fit-content" }}
        >
          <button
            type="button"
            onClick={() => changeViewMode("grid")}
            className={`btn btn-sm border-0 px-3.5 py-1.5 rounded-pill fw-semibold transition-all ${
              viewMode === "grid"
                ? "bg-white text-success shadow-2xs"
                : "text-muted"
            }`}
            style={{ fontSize: "13px" }}
          >
            ⊞ Grid
          </button>
          <button
            type="button"
            onClick={() => changeViewMode("list")}
            className={`btn btn-sm border-0 px-3.5 py-1.5 rounded-pill fw-semibold transition-all ${
              viewMode === "list"
                ? "bg-white text-success shadow-2xs"
                : "text-muted"
            }`}
            style={{ fontSize: "13px" }}
          >
            ☰ List
          </button>
        </div>
      </div>

      {displayedListings.length === 0 ? (
        <div className="p-5 text-center text-muted bg-white rounded-4 border">
          No {filterTab} listings found.
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW LAYOUT WITH AMPLE SPACING FOR TEXT */
        <div className="row g-4">
          {displayedListings.map((listing) => {
            let displayImage = "/placeholder.png";
            try {
              if (listing.imageUrl) {
                const raw = String(listing.imageUrl).trim();
                if (raw.startsWith("[")) {
                  const parsed = JSON.parse(raw);
                  if (Array.isArray(parsed) && parsed.length > 0) displayImage = parsed[0];
                } else if (raw.startsWith("data:")) {
                  displayImage = raw;
                } else if (raw.includes(",")) {
                  displayImage = raw.split(",")[0].trim();
                } else {
                  displayImage = raw;
                }
              }
            } catch {
              displayImage = "/placeholder.png";
            }

            const isSold = listing.status === "SOLD";
            const isBusy = updatingId === listing.id;

            return (
              <div
                key={`grid-${listing.id}`}
                className="col-12 col-sm-6 col-lg-4"
                style={{ opacity: isBusy ? 0.6 : 1 }}
              >
                <div
                  className="card border-0 shadow-sm bg-white overflow-hidden d-flex flex-column h-100 transition-all hover-shadow"
                  style={{
                    borderRadius: "22px",
                  }}
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/listing/${listing.id}`}
                    className="position-relative w-100 d-block text-decoration-none"
                    style={{ height: "190px", backgroundColor: "#f1f5f9", cursor: "pointer" }}
                  >
                    <Image
                      src={displayImage}
                      alt={listing.title}
                      fill
                      className="object-fit-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* SOLD OVERLAY */}
                    {isSold && (
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: "rgba(15, 23, 42, 0.65)",
                          zIndex: 2,
                        }}
                      >
                        <span
                          className="badge bg-danger text-white fw-bold px-3 py-1.5"
                          style={{ fontSize: "12px", letterSpacing: "1px" }}
                        >
                          SOLD
                        </span>
                      </div>
                    )}

                    {/* Status Pill Badge & Promo Badges */}
                    <div
                      className="position-absolute top-0 start-0 m-3 d-flex align-items-center gap-1.5 flex-wrap"
                      style={{ zIndex: 3 }}
                    >
                      <span
                        className={`badge ${
                          isSold ? "bg-secondary" : "bg-success"
                        } text-white shadow-sm px-2.5 py-1.5`}
                        style={{ fontSize: "11px", borderRadius: "20px" }}
                      >
                        {isSold ? "● Sold" : "● Active"}
                      </span>

                      {promotedMap[listing.id] && !isSold && (
                        <span
                          className="badge text-dark shadow-sm px-2 py-1 fw-bold"
                          style={{
                            fontSize: "10.5px",
                            borderRadius: "20px",
                            backgroundColor: promotedMap[listing.id].tier === "top" ? "#fef08a" : "#fee2e2",
                            border: promotedMap[listing.id].tier === "top" ? "1px solid #facc15" : "1px solid #f87171",
                          }}
                        >
                          {promotedMap[listing.id].tier === "top" ? "👑 TOP AD" : "🔥 URGENT"}
                        </span>
                      )}
                    </div>

                    {/* Views Count Badge */}
                    <div
                      className="position-absolute top-0 end-0 m-3"
                      style={{ zIndex: 3 }}
                    >
                      <span
                        className="badge bg-dark bg-opacity-75 text-white shadow-sm px-2.5 py-1.5"
                        style={{ fontSize: "11px", borderRadius: "20px" }}
                      >
                        👁 {listing.views ?? 0} views
                      </span>
                    </div>
                  </Link>

                  {/* Body Content with generous spacing across all text */}
                  <div
                    className="d-flex flex-column flex-grow-1"
                    style={{ padding: "22px 24px 24px 24px" }}
                  >
                    <Link
                      href={`/listing/${listing.id}`}
                      className="text-decoration-none d-block"
                      style={{ cursor: "pointer" }}
                    >
                      {/* Item Title with top clearance and bottom spacing */}
                      <h3
                        className="fw-bold text-dark text-truncate"
                        style={{
                          fontSize: "16px",
                          lineHeight: "1.4",
                          marginBottom: "12px",
                        }}
                        title={listing.title}
                      >
                        {listing.title}
                      </h3>

                      {/* Price with generous bottom spacing */}
                      <div
                        className="text-success fw-bold"
                        style={{
                          fontSize: "18px",
                          letterSpacing: "-0.2px",
                          marginBottom: "14px",
                        }}
                      >
                        {formatNaira(listing.price)}
                      </div>

                      {/* Location & Time Metadata with generous bottom spacing */}
                      <div
                        className="d-flex align-items-center justify-content-between text-secondary small"
                        style={{
                          fontSize: "13px",
                          marginBottom: "20px",
                        }}
                      >
                        <span className="d-flex align-items-center gap-1.5 text-truncate" style={{ maxWidth: "62%" }}>
                          <span>📍</span>
                          <span className="text-truncate">{listing.location || "Lagos"}</span>
                        </span>
                        <span className="text-muted text-nowrap">{timeAgo(listing.createdAt)}</span>
                      </div>
                    </Link>

                    {/* Action buttons with clean, sleek proportions */}
                    <div className="mt-auto d-flex flex-column gap-2 pt-1">
                      <div className="d-flex align-items-center gap-2">
                        {!isSold && (
                          <PromoteAdModal listing={listing} compact />
                        )}

                        <Link
                          href={`/listing/${listing.id}`}
                          className="btn btn-outline-secondary btn-sm rounded-pill flex-grow-1 d-flex align-items-center justify-content-center text-nowrap"
                          style={{
                            height: "30px",
                            fontSize: "11.5px",
                            fontWeight: 500,
                            padding: "0 10px",
                          }}
                        >
                          View Ad
                        </Link>
                      </div>

                      <div className="d-flex align-items-center gap-1.5">
                        <Link
                          href={`/listing/${listing.id}/edit`}
                          className="btn btn-outline-primary btn-sm rounded-pill flex-grow-1 fw-medium d-flex align-items-center justify-content-center text-nowrap"
                          style={{
                            height: "30px",
                            fontSize: "11.5px",
                            padding: "0 8px",
                          }}
                          title="Edit listing details"
                        >
                          ✏️ Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => toggleStatus(listing.id, listing.status || "ACTIVE")}
                          disabled={isBusy}
                          className={`btn btn-sm rounded-pill flex-grow-1 fw-medium d-flex align-items-center justify-content-center text-nowrap ${
                            isSold
                              ? "btn-outline-success"
                              : "btn-outline-warning text-dark"
                          }`}
                          style={{
                            height: "30px",
                            fontSize: "11.5px",
                            padding: "0 8px",
                          }}
                        >
                          {isSold ? "Reactivate" : "Mark as Sold"}
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteListing(listing.id, listing.title)}
                          disabled={isBusy}
                          className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            width: "30px",
                            height: "30px",
                            fontSize: "12px",
                          }}
                          title="Delete listing"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW LAYOUT WITH AMPLE SPACING BETWEEN IMAGE AND TEXT & GENEROUS BOTTOM PADDING */
        <div className="d-flex flex-column gap-4" style={{ paddingBottom: "80px" }}>
          {displayedListings.map((listing) => {
            let displayImage = "/placeholder.png";
            try {
              if (listing.imageUrl) {
                const raw = String(listing.imageUrl).trim();
                if (raw.startsWith("[")) {
                  const parsed = JSON.parse(raw);
                  if (Array.isArray(parsed) && parsed.length > 0) displayImage = parsed[0];
                } else if (raw.startsWith("data:")) {
                  displayImage = raw;
                } else if (raw.includes(",")) {
                  displayImage = raw.split(",")[0].trim();
                } else {
                  displayImage = raw;
                }
              }
            } catch {
              displayImage = "/placeholder.png";
            }

            const isSold = listing.status === "SOLD";
            const isBusy = updatingId === listing.id;

            return (
              <div
                key={`list-${listing.id}`}
                className="card border-0 shadow-sm bg-white d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between transition-all hover-shadow"
                style={{
                  opacity: isBusy ? 0.6 : 1,
                  borderRadius: "24px",
                  padding: "26px 32px 36px 32px", // Generous bottom padding inside each list card
                  gap: "24px",
                }}
              >
                {/* Ad Details Left Section: Generous gap between Image and Text Column */}
                <Link
                  href={`/listing/${listing.id}`}
                  className="d-flex align-items-center overflow-hidden w-100 w-md-auto my-auto text-decoration-none flex-grow-1"
                  style={{ gap: "24px", cursor: "pointer" }} // Explicit spacious separation between image and text
                >
                  {/* Image Thumbnail */}
                  <div
                    className="position-relative overflow-hidden flex-shrink-0"
                    style={{
                      width: "88px",
                      height: "88px",
                      backgroundColor: "#f1f5f9",
                      borderRadius: "16px",
                    }}
                  >
                    <Image
                      src={displayImage}
                      alt={listing.title}
                      fill
                      className="object-fit-cover"
                      sizes="88px"
                    />

                    {/* FLOATING TOP-LEFT VERIFIED BADGE */}
                    {!isSold && (
                      <div
                        className="position-absolute top-0 start-0 m-1.5"
                        style={{ zIndex: 3 }}
                      >
                        <span
                          className="d-inline-flex align-items-center gap-0.5 text-white shadow-xs"
                          style={{
                            backgroundColor: "rgba(15, 23, 42, 0.72)",
                            backdropFilter: "blur(6px)",
                            fontSize: "8.5px",
                            fontWeight: 600,
                            padding: "2px 5px",
                            borderRadius: "5px",
                            letterSpacing: "0.2px",
                          }}
                        >
                          <span style={{ color: "#10b981", fontSize: "9px" }}>✓</span>
                          <span>Verified</span>
                        </span>
                      </div>
                    )}

                    {isSold && (
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: "rgba(15, 23, 42, 0.65)",
                        }}
                      >
                        <span
                          className="badge bg-danger text-white fw-bold"
                          style={{ fontSize: "10px" }}
                        >
                          SOLD
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text Column with vertical spacing from .active down to price */}
                  <div className="overflow-hidden flex-grow-1 d-flex flex-column justify-content-center">
                    {/* Top Badges Row (.active to views/time) with clean bottom space */}
                    <div
                      className="d-flex align-items-center gap-2 flex-wrap"
                      style={{ marginBottom: "10px" }}
                    >
                      <span
                        className={`badge ${
                          isSold
                            ? "bg-secondary"
                            : "bg-success bg-opacity-10 text-success"
                        }`}
                        style={{
                          fontSize: "11.5px",
                          padding: "4px 11px",
                          borderRadius: "20px",
                          fontWeight: 600,
                        }}
                      >
                        {isSold ? "● Sold" : "● Active"}
                      </span>

                      {promotedMap[listing.id] && !isSold && (
                        <span
                          className="badge text-dark shadow-sm px-2.5 py-1 fw-bold"
                          style={{
                            fontSize: "11px",
                            borderRadius: "20px",
                            backgroundColor: promotedMap[listing.id].tier === "top" ? "#fef08a" : "#fee2e2",
                            border: promotedMap[listing.id].tier === "top" ? "1px solid #facc15" : "1px solid #f87171",
                          }}
                        >
                          {promotedMap[listing.id].tier === "top" ? "👑 TOP AD" : "🔥 URGENT"}
                        </span>
                      )}

                      <span
                        className="badge bg-light text-secondary border"
                        style={{
                          fontSize: "11.5px",
                          padding: "4px 11px",
                          borderRadius: "20px",
                        }}
                      >
                        👁 {listing.views ?? 0} views
                      </span>

                      <span
                        className="text-muted small ms-1"
                        style={{ fontSize: "12px" }}
                      >
                        Posted {timeAgo(listing.createdAt)}
                      </span>
                    </div>

                    {/* Ad Title with clean vertical margin */}
                    <h3
                      className="fw-bold text-dark text-truncate"
                      style={{
                        maxWidth: "480px",
                        fontSize: "16px",
                        lineHeight: "1.4",
                        marginBottom: "10px",
                      }}
                      title={listing.title}
                    >
                      {listing.title}
                    </h3>

                    {/* Price, Location, Condition metadata row with clean spacing */}
                    <div
                      className="d-flex align-items-center gap-3.5 text-secondary small flex-wrap"
                      style={{ paddingBottom: "6px", paddingTop: "2px" }}
                    >
                      <strong
                        className="text-success fw-bold"
                        style={{ fontSize: "16px" }}
                      >
                        {formatNaira(listing.price)}
                      </strong>
                      <span>📍 {listing.location || "Lagos"}</span>
                      <span>🏷️ {listing.condition || "Used"}</span>
                    </div>
                  </div>
                </Link>

                {/* Seller Actions Right Section: Explicit 14px gap between action buttons */}
                <div
                  className="d-flex align-items-center flex-wrap w-100 w-md-auto justify-content-end my-auto pt-2 pt-md-0"
                  style={{ gap: "14px" }}
                >
                  {!isSold && (
                    <PromoteAdModal listing={listing} />
                  )}

                  <Link
                    href={`/listing/${listing.id}`}
                    className="btn btn-outline-secondary btn-sm rounded-pill px-3.5 py-2 fw-medium text-nowrap"
                    style={{ fontSize: "13px" }}
                  >
                    View Ad
                  </Link>

                  <Link
                    href={`/listing/${listing.id}/edit`}
                    className="btn btn-outline-primary btn-sm rounded-pill px-3.5 py-2 fw-medium text-nowrap"
                    style={{ fontSize: "13px" }}
                    title="Edit listing details"
                  >
                    ✏️ Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleStatus(listing.id, listing.status || "ACTIVE")}
                    disabled={isBusy}
                    className={`btn btn-sm rounded-pill px-3.5 py-2 fw-medium text-nowrap ${
                      isSold
                        ? "btn-outline-success"
                        : "btn-outline-warning text-dark"
                    }`}
                    style={{ fontSize: "13px" }}
                  >
                    {isSold ? "Reactivate (Mark Active)" : "Mark as Sold"}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteListing(listing.id, listing.title)}
                    disabled={isBusy}
                    className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "38px",
                      height: "38px",
                      fontSize: "14px",
                    }}
                    title="Delete this listing"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
