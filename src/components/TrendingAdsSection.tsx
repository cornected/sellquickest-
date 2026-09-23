"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ListingCard } from "@/components/ListingCard";
import { formatNaira, timeAgo } from "@/lib/format";

interface TrendingAdsSectionProps {
  initialListings: any[];
}

export function TrendingAdsSection({
  initialListings = [],
}: TrendingAdsSectionProps) {
  // Track left area view style with browser memory persistence
  const [leftViewMode, setLeftViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // Custom dropdown open state
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Read saved layout state parameters upon hydration
  useEffect(() => {
    const savedView = localStorage.getItem("sellquickest_trending_view");
    if (savedView === "grid" || savedView === "list") {
      setLeftViewMode(savedView);
    }
  }, []);

  const toggleViewMode = (mode: "grid" | "list") => {
    setLeftViewMode(mode);
    localStorage.setItem("sellquickest_trending_view", mode);
  };

  // Compute sorting variations across active listings collections
  const getSortedListings = (items: any[]) => {
    if (selectedFilter === "low-price")
      return [...items].sort((a, b) => a.price - b.price);
    if (selectedFilter === "high-price")
      return [...items].sort((a, b) => b.price - a.price);

    // 🆕 Date sorting calculation: Newest items show up first
    if (selectedFilter === "date")
      return [...items].sort(
        (a, b) =>
          new Date(b.createdAt || b.date).getTime() -
          new Date(a.createdAt || a.date).getTime(),
      );

    // 🆕 Rating sorting calculation: Highest rating score show up first
    if (selectedFilter === "rating")
      return [...items].sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return items;
  };

  // 1. Get the unified sorted pool of listings (Your 19 unique ads)
  const sortedPool = getSortedListings(initialListings);

  // 2. Dynamic slicing: 12 ads for grid layout, 8 ads for list layout (LOCKED)
  const activeLeftAds =
    leftViewMode === "grid" ? sortedPool.slice(0, 12) : sortedPool.slice(0, 8);

  // 3. FIXED & LOCKED: Sidebar now ALWAYS pulls items 12 to 19.
  // It completely ignores 'leftViewMode', making it 100% standalone!
  const activeRightFeedAds = sortedPool.slice(12, 19);

  // Label dictionary to cleanly map keys to the UI trigger button text
  const filterLabels: Record<string, string> = {
    all: "All listings",
    "low-price": "Lowest Price",
    "high-price": "Highest Price",
    date: "Recently Added",
    rating: "Rating",
  };

  return (
    <section id="trending" className="container py-4 mt-2">
      {/* MASTER GLOBAL HEADER ROW CONTAINER */}
      <div className="row g-4 align-items-center mb-4">
        {/* Left Grid Heading Column */}
        <div className="col-12 col-lg-8">
          <div className="d-flex align-items-center justify-content-between">
            {/* 1. Lighter Trending Ads Header Title */}
            <h2
              className="text-dark tracking-tight mb-0"
              style={{
                fontWeight: 650,
                fontSize: "1.10rem",
                letterSpacing: "-0.1px",
              }}
            >
              Trending ads
            </h2>

            {/* Global Controls Panel */}
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <label className="text-secondary small fw-medium d-none d-sm-inline">
                  Sort by:
                </label>

                {/* PREMIUM CUSTOM ISOLATED SELECT DROPDOWN WRAPPER */}
                <div
                  ref={dropdownRef}
                  style={{
                    position: "relative",
                    width: "150px",
                    height: "38px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "between",
                      padding: "0 14px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "24px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#1e293b",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        flexGrow: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {filterLabels[selectedFilter]}
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        color: "#94a3b8",
                        marginLeft: "6px",
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  {/* FLOATING DROPDOWN LIST */}
                  {isDropdownOpen && (
                    <ul
                      style={{
                        position: "absolute",
                        top: "44px",
                        left: 0,
                        width: "100%",
                        zIndex: 999,
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "14px",
                        boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",
                        padding: "6px 0",
                        margin: 0,
                        listStyle: "none",
                      }}
                    >
                      {[
                        { key: "all", label: "All listings" },
                        { key: "low-price", label: "Lowest Price" },
                        { key: "high-price", label: "Highest Price" },
                        { key: "date", label: "Recently Added" },
                        { key: "rating", label: "Rating" },
                      ].map((opt) => (
                        <li
                          key={opt.key}
                          onClick={() => {
                            setSelectedFilter(opt.key);
                            setIsDropdownOpen(false);
                          }}
                          style={{
                            padding: "8px 14px",
                            fontWeight: 400,
                            fontSize: "13px",
                            color:
                              selectedFilter === opt.key
                                ? "#198754"
                                : "#334155",
                            backgroundColor:
                              selectedFilter === opt.key
                                ? "#f1f5f9"
                                : "transparent",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f8fafc")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              selectedFilter === opt.key
                                ? "#f1f5f9"
                                : "transparent")
                          }
                        >
                          {opt.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div
                className="p-1 bg-light d-flex align-items-center"
                style={{ borderRadius: "10px" }}
              >
                <button
                  onClick={() => toggleViewMode("grid")}
                  className={`btn btn-sm border-0 px-2 py-1 shadow-none transition-all ${leftViewMode === "grid" ? "bg-white text-success fw-bold" : "text-muted"}`}
                  style={{ borderRadius: "8px", fontSize: "0.75rem" }}
                >
                  Grid
                </button>
                <button
                  onClick={() => toggleViewMode("list")}
                  className={`btn btn-sm border-0 px-2 py-1 shadow-none transition-all ${leftViewMode === "list" ? "bg-white text-success fw-bold" : "text-muted"}`}
                  style={{ borderRadius: "8px", fontSize: "0.75rem" }}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Heading Column */}
        <div className="col-12 col-lg-4">
          <h2
            className="text-dark tracking-tight mb-0"
            style={{
              fontWeight: 650,
              fontSize: "1.10rem",
              letterSpacing: "-0.1px",
            }}
          >
            Featured Feed
          </h2>
        </div>
      </div>

      {/* =============================================================================
    LOWER CONTENT BODIES ROW CANVASES
    ============================================================================= */}

      <div className="row g-4">
        {/* LEFT DYNAMIC WORKSPACE SLOTS (Takes up 8 columns) */}
        <div className="col-12 col-lg-8">
          {leftViewMode === "grid" ? (
            /* 💡 THE SECRET INTERVIEW FIX: 
             - Ensure 'bg-white' or 'card' wrappers are REMOVED from this grid layer!
             - Using 'g-3' creates the perfect responsive gutter margins between individual listings.
          */
            <div className="row g-3 bg-transparent p-0 m-0">
              {activeLeftAds.map((listing) => (
                <div key={`grid-${listing.id}`} className="col-6 col-md-3">
                  {/* 
                  The clean white 'ListingCard' component sits inside this transparent grid slot, 
                  automatically separated from adjacent cards by Bootstrap's native gutters!
                */}
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          ) : (
            <div className="d-flex flex-column gap-3 bg-transparent">
              {activeLeftAds.map((listing, index) => (
                <SidebarChecklistCard
                  key={`list-left-${listing.id}`}
                  listing={listing}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT FIXED SIDEBAR FEED SLOTS */}
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column gap-3">
            {activeRightFeedAds.map((listing, index) => (
              <SidebarChecklistCard
                key={`sidebar-fixed-${listing.id}-${index}`} // 💡 Explicit prefix completely locks this column
                listing={listing}
                index={index} // Stays static regardless of left workspace toggles
              />
            ))}
          </div>
        </div>
      </div>

      {/* =============================================================================
          PREMIUM MINIMAL ADVERTISEMENT DIVIDER BANNER
          ============================================================================= */}
      <div className="row mt-5">
        <div className="col-12">
          <div
            style={{
              marginTop: "50px",
              marginBottom: "80px",
              width: "100%",
              height: "120px", // Compact, premium banner profile height
              backgroundColor: "#f1f5f9", // Isolated premium canvas backdrop tone
              borderRadius: "24px/14px", // Asymmetric outer geometric layout curve rule
              border: "1px solid rgba(0, 0, 0, 0.03)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.02)", // Micro ambient shadow canvas profile
              padding: "0 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            {/* Left Info Body Segment */}
            <div className="d-flex align-items-center gap-3">
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#ffffff",
                  backgroundColor: "#64748b",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.9px",
                }}
              >
                Ad
              </span>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                  fontWeight: 400, // Lightweight typography standard
                  color: "#334155",
                }}
              >
                Reach 5x more buyers instantly. Sell your premium listings on
                the SellQuickest Spotlight.
              </p>
            </div>

            {/* Right Action Trigger Link Segment */}
            <Link
              href="/premium-promote"
              className="text-decoration-none"
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#198754",
                backgroundColor: "#ffffff",
                padding: "8px 18px",
                borderRadius: "10px",
                border: "1px solid rgba(25, 135, 84, 0.15)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#198754";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#198754";
              }}
            >
              Promote Ad
            </Link>
          </div>
        </div>
      </div>
    </section> // Ends the main structural section container
  );
}

// Sub-Component: Clean horizontal checklist capsule card layout
function SidebarChecklistCard({
  listing,
  index = 0,
}: {
  listing: any;
  index?: number;
}) {
  let tierEmoji = "🥇";
  const tierCycle = index % 3;
  if (tierCycle === 0) tierEmoji = "🥇";
  if (tierCycle === 1) tierEmoji = "🥈";
  if (tierCycle === 2) tierEmoji = "🥉";

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="text-decoration-none text-reset d-block w-100"
    >
      <div
        className="d-flex align-items-center bg-white border-0 w-100"
        style={{
          height: "115px",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(15, 23, 42, 0.01)",
          padding: "12px",
          gap: "14px",
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
            src={
              listing.imageUrl &&
              listing.imageUrl.trim() !== "" &&
              listing.imageUrl !== "https://unsplash.com" // 💡 CATCHES AND BLOCKS THE INVALID STRING
                ? listing.imageUrl
                : "/placeholder.png" // 💡 FALLS BACK SAFELY TO YOUR LOCAL ASSET
            }
            alt={listing.title || "Trending Ad"}
            fill
            className="object-fit-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Center: Structured Text Info Metadata */}
        <div
          className="ms-3 flex-grow-1 overflow-hidden"
          style={{ paddingRight: "40px" }}
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

          {/* Pricing Row with Status Capsule Inline */}
          <div className="d-flex align-items-center gap-2 mb-1">
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
              New
            </span>
          </div>

          {/* Bottom Location and Time Meta Row */}
          <div
            className="d-flex align-items-center text-muted"
            style={{ fontSize: "12px", marginTop: "8px" }}
          >
            <span style={{ marginRight: "4px" }}>📍</span>
            <span className="text-truncate">
              {listing.location || "Accra, Makola"} •{" "}
              <span suppressHydrationWarning>
                {timeAgo(listing.createdAt)}
              </span>
            </span>
          </div>
        </div>

        {/* Right Side: Clean Isolated Premium Tier Medal Badge */}
        <div
          className="position-absolute d-flex align-items-center justify-content-center"
          style={{
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.25rem",
            zIndex: 2,
          }}
        >
          <Image
            // 💡 Check if the imageUrl string is empty, missing, or broken, and route to fallback asset
            src={
              listing.imageUrl &&
              listing.imageUrl.trim() !== "" &&
              listing.imageUrl.trim() !== "https://unsplash.com"
                ? listing.imageUrl
                : "/placeholder.png"
            }
            alt={listing.title}
            fill
            className="object-fit-cover"
            style={{ borderRadius: "14px" }}
            sizes="90px"
            // Prevents Next.js optimization from failing on missing remote domains
            unoptimized={true}
          />

          {tierEmoji}
        </div>
      </div>
    </Link>
  );
}
