"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface FilterBarProps {
  basePath: string;
  totalResults: number;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
}

export function FilterBar({
  basePath,
  totalResults,
  viewMode,
  onViewModeChange,
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [condition, setCondition] = useState(searchParams.get("condition") || "all");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [isOpen, setIsOpen] = useState(false);

  const sub = searchParams.get("sub") || "";
  const q = searchParams.get("q") || "";

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (sub) params.set("sub", sub);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (condition && condition !== "all") params.set("condition", condition);
    if (sort && sort !== "newest") params.set("sort", sort);

    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setCondition("all");
    setSort("newest");
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (sub) params.set("sub", sub);
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  };

  const hasActiveFilters = !!(
    minPrice ||
    maxPrice ||
    (condition && condition !== "all") ||
    (sort && sort !== "newest")
  );

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 bg-white mb-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        {/* Toggle & Filter Summary */}
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-sm btn-light rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 border"
            style={{ fontSize: "13px" }}
          >
            <span>⚡ Filters & Sort</span>
            {hasActiveFilters && (
              <span className="badge bg-success rounded-circle p-1" style={{ width: "8px", height: "8px" }} />
            )}
            <span style={{ fontSize: "10px" }}>{isOpen ? "▲" : "▼"}</span>
          </button>

          <span className="text-muted small">
            <strong>{totalResults}</strong> {totalResults === 1 ? "listing" : "listings"} found
          </span>
        </div>

        {/* Quick Sort & Grid/List View Toggle directly on bar */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <label className="text-muted small fw-medium text-nowrap mb-0" style={{ fontSize: "12px" }}>
            Sort:
          </label>
          <select
            className="form-select form-select-sm rounded-pill border-light-subtle"
            style={{ fontSize: "12px", width: "auto" }}
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              const params = new URLSearchParams(searchParams.toString());
              if (e.target.value === "newest") {
                params.delete("sort");
              } else {
                params.set("sort", e.target.value);
              }
              const qs = params.toString();
              router.push(qs ? `${basePath}?${qs}` : basePath);
            }}
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>

          {/* Grid / List View Toggle Pill */}
          {onViewModeChange && (
            <div
              className="p-1 bg-light d-flex align-items-center border rounded-pill ms-1 shadow-2xs"
            >
              <button
                type="button"
                onClick={() => onViewModeChange("grid")}
                className={`btn btn-sm border-0 px-2.5 py-1 shadow-none transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-success fw-bold shadow-2xs"
                    : "text-muted"
                }`}
                style={{ borderRadius: "20px", fontSize: "12px" }}
                title="Grid view"
              >
                ⊞ Grid
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange("list")}
                className={`btn btn-sm border-0 px-2.5 py-1 shadow-none transition-all ${
                  viewMode === "list"
                    ? "bg-white text-success fw-bold shadow-2xs"
                    : "text-muted"
                }`}
                style={{ borderRadius: "20px", fontSize: "12px" }}
                title="List view"
              >
                ☰ List
              </button>
            </div>
          )}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="btn btn-link text-danger text-decoration-none small p-0 ms-1"
              style={{ fontSize: "12px" }}
            >
              ✕ Reset
            </button>
          )}
        </div>
      </div>

      {/* EXPANDABLE FILTER DRAWER: BALANCED AND ALIGNED */}
      {isOpen && (
        <div className="mt-3 pt-3 border-top">
          <div className="row g-3 align-items-start">
            {/* 1. Price Range Column */}
            <div className="col-12 col-md-5">
              <label className="form-label text-secondary small fw-semibold mb-1.5" style={{ fontSize: "12px" }}>
                Price Range (₦)
              </label>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="form-control rounded-3 shadow-none border"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  style={{ fontSize: "13px", height: "38px" }}
                />
                <span className="text-muted fw-bold">–</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="form-control rounded-3 shadow-none border"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={{ fontSize: "13px", height: "38px" }}
                />
              </div>

              {/* Price Quick Presets: Spaced cleanly below Min/Max input */}
              <div
                className="d-flex align-items-center gap-2 flex-wrap"
                style={{ marginTop: "10px" }}
              >
                <span className="text-muted" style={{ fontSize: "11px" }}>Quick:</span>
                {[
                  { label: "< 50k", max: "50000" },
                  { label: "50k-250k", min: "50000", max: "250000" },
                  { label: "250k-1M", min: "250000", max: "1000000" },
                  { label: "1M+", min: "1000000" },
                ].map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setMinPrice(p.min || "");
                      setMaxPrice(p.max || "");
                    }}
                    className="btn btn-light btn-sm py-1 px-2.5 rounded-pill text-secondary border shadow-2xs transition-all hover-shadow"
                    style={{ fontSize: "11px", fontWeight: 500 }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Condition Filter Column */}
            <div className="col-12 col-md-4">
              <label className="form-label text-secondary small fw-semibold mb-1.5" style={{ fontSize: "12px" }}>
                Item Condition
              </label>
              <select
                className="form-select rounded-3 shadow-none border"
                style={{ fontSize: "13px", height: "38px" }}
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="all">All Conditions</option>
                <option value="brand_new">Brand New</option>
                <option value="foreign_used">Foreign Used (Tokunbo)</option>
                <option value="local_used">Local / Nigerian Used</option>
              </select>
            </div>

            {/* 3. Apply Action Column: Perfectly aligned with input controls */}
            <div className="col-12 col-md-3">
              <label className="form-label d-none d-md-block text-transparent small mb-1.5" style={{ fontSize: "12px" }}>
                &nbsp;
              </label>
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  onClick={applyFilters}
                  className="btn btn-sq text-white rounded-pill px-3.5 fw-semibold flex-grow-1 shadow-2xs d-flex align-items-center justify-content-center"
                  style={{ fontSize: "13px", height: "38px" }}
                >
                  Apply Filters
                </button>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="btn btn-outline-secondary rounded-pill px-3 shadow-2xs"
                    style={{ fontSize: "12px", height: "38px" }}
                    title="Reset filters"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
