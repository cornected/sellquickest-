"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FilterBar } from "@/components/FilterBar";
import { ListingGridOrList } from "@/components/ListingGridOrList";

interface CategoryListingSectionProps {
  filteredListings: any[];
  slug: string;
  categoryName: string;
  selectedSub?: string;
}

export function CategoryListingSection({
  filteredListings,
  slug,
  categoryName,
  selectedSub,
}: CategoryListingSectionProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sq_general_view");
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
      localStorage.setItem("sq_general_view", mode);
      window.dispatchEvent(new Event("sq_view_mode_changed"));
    } catch {
      // ignore
    }
  };

  return (
    <div>
      {/* FILTER & SORT BAR WITH EMBEDDED GENERAL GRID / LIST TOGGLE */}
      <FilterBar
        basePath={`/category/${slug}`}
        totalResults={filteredListings.length}
        viewMode={viewMode}
        onViewModeChange={changeViewMode}
      />

      {/* FILTER ACTIVE STATUS BANNER */}
      {selectedSub && (
        <div className="d-flex align-items-center justify-content-between alert alert-light border border-light-subtle rounded-3 py-2 px-3 mb-4">
          <div className="d-flex align-items-center gap-2 small">
            <span className="badge bg-success bg-opacity-10 text-success fw-bold px-2 py-1">
              Active Filter
            </span>
            <span>
              Filtering by: <strong>{selectedSub}</strong>
            </span>
          </div>
          <Link
            href={`/category/${slug}`}
            className="btn btn-outline-secondary btn-sm py-0 px-2"
            style={{ fontSize: "0.8rem" }}
          >
            Show All {categoryName} Ads
          </Link>
        </div>
      )}

      {/* LISTINGS RESULTS: GENERAL GRID OR GENERAL LIST (EXACT HOME MATCH) */}
      {filteredListings.length === 0 ? (
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
            🔍
          </div>
          <h2 className="h5 fw-bold mb-2">
            {selectedSub
              ? `No ads found in "${selectedSub}"`
              : `No ads in ${categoryName} yet`}
          </h2>
          <p
            className="text-muted mx-auto mb-4"
            style={{ maxWidth: "420px", fontSize: "0.95rem" }}
          >
            {selectedSub
              ? `Be the first to post a listing under ${selectedSub} or explore other subcategories.`
              : `Check back soon or be the first person to post an ad in this category.`}
          </p>
          <div className="d-flex justify-content-center gap-2">
            {selectedSub && (
              <Link
                href={`/category/${slug}`}
                className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold"
              >
                View all in {categoryName}
              </Link>
            )}
            <Link
              href="/post"
              className="btn btn-sq text-white px-4 py-2 rounded-pill fw-semibold"
            >
              Post an Ad
            </Link>
          </div>
        </div>
      ) : (
        <ListingGridOrList
          listings={filteredListings}
          viewMode={viewMode}
          gridColClass="col-6 col-md-4 col-lg-3"
          emptyMessage={`No ads in ${categoryName} yet.`}
        />
      )}
    </div>
  );
}
