"use client";

import { useState, useEffect } from "react";
import { FilterBar } from "@/components/FilterBar";
import { ListingCard } from "@/components/ListingCard";
import { ListingListCard } from "@/components/ListingListCard";

interface AllAdsListingViewProps {
  listings: any[];
  basePath: string;
}

export function AllAdsListingView({
  listings,
  basePath,
}: AllAdsListingViewProps) {
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
      {/* FILTER BAR WITH EMBEDDED GENERAL GRID / LIST TOGGLE */}
      <FilterBar
        basePath={basePath}
        totalResults={listings.length}
        viewMode={viewMode}
        onViewModeChange={changeViewMode}
      />

      {/* LISTINGS RESULTS: GENERAL GRID OR GENERAL LIST (MATCHING HOME) */}
      {listings.length === 0 ? (
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
          <h2 className="h5 fw-bold mb-2">No matching ads found</h2>
          <p
            className="text-muted mx-auto mb-4"
            style={{ maxWidth: "420px", fontSize: "0.95rem" }}
          >
            Try adjusting your search query, clearing filters, or exploring different price ranges and categories.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="row g-3">
          {listings.map((listing) => (
            <div key={`grid-${listing.id}`} className="col-6 col-md-4 col-lg-3">
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {listings.map((listing, index) => (
            <ListingListCard key={`list-${listing.id}`} listing={listing} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
