"use client";

import { ListingCard } from "@/components/ListingCard";
import { ListingListCard } from "@/components/ListingListCard";

interface ListingGridOrListProps {
  listings: any[];
  viewMode: "grid" | "list";
  gridColClass?: string;
  emptyMessage?: string;
}

export function ListingGridOrList({
  listings,
  viewMode,
  gridColClass = "col-6 col-md-4 col-lg-3",
  emptyMessage = "No listings found.",
}: ListingGridOrListProps) {
  if (listings.length === 0) {
    return (
      <div className="p-5 text-center text-muted bg-white rounded-4 border">
        {emptyMessage}
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="row g-3">
        {listings.map((listing) => (
          <div key={`grid-${listing.id}`} className={gridColClass}>
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {listings.map((listing, index) => (
        <ListingListCard key={`list-${listing.id}`} listing={listing} index={index} />
      ))}
    </div>
  );
}

export function ViewModeToggle({
  viewMode,
  onChange,
}: {
  viewMode: "grid" | "list";
  onChange: (mode: "grid" | "list") => void;
}) {
  return (
    <div
      className="p-1 bg-light d-inline-flex align-items-center"
      style={{ borderRadius: "10px" }}
    >
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={`btn btn-sm border-0 px-2 py-1 shadow-none transition-all ${
          viewMode === "grid"
            ? "bg-white text-success fw-bold"
            : "text-muted"
        }`}
        style={{ borderRadius: "8px", fontSize: "0.75rem" }}
        title="Grid view"
      >
        Grid
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        className={`btn btn-sm border-0 px-2 py-1 shadow-none transition-all ${
          viewMode === "list"
            ? "bg-white text-success fw-bold"
            : "text-muted"
        }`}
        style={{ borderRadius: "8px", fontSize: "0.75rem" }}
        title="List view"
      >
        List
      </button>
    </div>
  );
}
