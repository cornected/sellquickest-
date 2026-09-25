"use client";

import { useState, useEffect } from "react";
import { ListingGridOrList, ViewModeToggle } from "@/components/ListingGridOrList";

interface SellerStorefrontViewProps {
  initialListings: any[];
  sellerName: string;
}

export function SellerStorefrontView({
  initialListings,
  sellerName,
}: SellerStorefrontViewProps) {
  const [filter, setFilter] = useState<"all" | "active" | "sold">("all");
  const [search, setSearch] = useState("");
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

  const activeCount = initialListings.filter((l) => l.status !== "SOLD").length;
  const soldCount = initialListings.filter((l) => l.status === "SOLD").length;

  const filtered = initialListings.filter((l) => {
    if (filter === "active" && l.status === "SOLD") return false;
    if (filter === "sold" && l.status !== "SOLD") return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = l.title?.toLowerCase().includes(q);
      const matchLoc = l.location?.toLowerCase().includes(q);
      const matchCond = l.condition?.toLowerCase().includes(q);
      return matchTitle || matchLoc || matchCond;
    }
    return true;
  });

  return (
    <div>
      {/* TABS, SEARCH BAR & GENERAL VIEW TOGGLE */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        {/* Tabs */}
        <div className="d-flex gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`btn btn-sm rounded-pill px-3.5 py-1.5 fw-medium transition-all ${
              filter === "all"
                ? "btn-sq text-white shadow-sm"
                : "btn-light text-secondary border"
            }`}
            style={{ fontSize: "13px" }}
          >
            All Items ({initialListings.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("active")}
            className={`btn btn-sm rounded-pill px-3.5 py-1.5 fw-medium transition-all ${
              filter === "active"
                ? "btn-sq text-white shadow-sm"
                : "btn-light text-secondary border"
            }`}
            style={{ fontSize: "13px" }}
          >
            Active ({activeCount})
          </button>
          {soldCount > 0 && (
            <button
              type="button"
              onClick={() => setFilter("sold")}
              className={`btn btn-sm rounded-pill px-3.5 py-1.5 fw-medium transition-all ${
                filter === "sold"
                  ? "btn-sq text-white shadow-sm"
                  : "btn-light text-secondary border"
              }`}
              style={{ fontSize: "13px" }}
            >
              Sold ({soldCount})
            </button>
          )}
        </div>

        {/* Right side: Search within store & Grid/List Toggle on the same row */}
        <div className="d-flex align-items-center gap-2 flex-nowrap">
          <div style={{ width: "230px" }}>
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white border-end-0 rounded-start-pill text-muted ps-3 pe-1">
                🔍
              </span>
              <input
                type="text"
                className="form-control border-start-0 rounded-end-pill py-1.5 shadow-none"
                placeholder={`Search in store...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ fontSize: "13px" }}
              />
            </div>
          </div>

          <div className="flex-shrink-0">
            <ViewModeToggle viewMode={viewMode} onChange={changeViewMode} />
          </div>
        </div>
      </div>

      {/* LISTINGS RESULTS: GENERAL GRID OR GENERAL LIST (EXACT HOME MATCH) */}
      <ListingGridOrList
        listings={filtered}
        viewMode={viewMode}
        gridColClass="col-6 col-md-4 col-lg-3"
        emptyMessage="No listings found matching your search or tab."
      />
    </div>
  );
}
