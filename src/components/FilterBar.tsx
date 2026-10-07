"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

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
  const [isSavedSearch, setIsSavedSearch] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortLabels: Record<string, string> = {
    newest: "Newest First",
    price_asc: "Lowest Price",
    price_desc: "Highest Price",
  };

  const sub = searchParams.get("sub") || "";
  const q = searchParams.get("q") || "";

  const handleSaveSearch = () => {
    try {
      const searchesRaw = localStorage.getItem("sq_saved_searches");
      const list = searchesRaw ? JSON.parse(searchesRaw) : [];
      const item = {
        id: `search-${Date.now()}`,
        query: q || "All Ads",
        sub,
        basePath,
        savedAt: new Date().toISOString(),
      };
      list.unshift(item);
      localStorage.setItem("sq_saved_searches", JSON.stringify(list.slice(0, 15)));

      // Send alert
      const notifsRaw = localStorage.getItem("sq_user_notifications");
      const notifs = notifsRaw ? JSON.parse(notifsRaw) : [];
      notifs.unshift({
        id: `notif-${Date.now()}`,
        title: `Search Saved: "${q || 'All Ads'}"`,
        text: `You will receive alert notifications when new ads matching this search are published!`,
        type: "info",
        createdAt: new Date().toISOString(),
        read: false,
      });
      localStorage.setItem("sq_user_notifications", JSON.stringify(notifs.slice(0, 25)));
      window.dispatchEvent(new Event("sq_notifications_updated"));

      setIsSavedSearch(true);
      setTimeout(() => setIsSavedSearch(false), 3000);
    } catch {
      // ignore
    }
  };

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
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-sm btn-light px-3 py-1.5 d-flex align-items-center gap-1.5 border"
            style={{ borderRadius: "10px", fontSize: "11.5px", fontWeight: 500 }}
          >
            <span>⚡ Filters & Sort</span>
            {hasActiveFilters && (
              <span className="badge bg-success rounded-circle p-1" style={{ width: "8px", height: "8px" }} />
            )}
            <span style={{ fontSize: "10px" }}>{isOpen ? "▲" : "▼"}</span>
          </button>

          <button
            type="button"
            onClick={handleSaveSearch}
            className={`btn btn-sm px-3 py-1.5 d-flex align-items-center gap-1.5 border transition-all ${
              isSavedSearch ? "btn-success text-white" : "btn-light text-dark"
            }`}
            style={{ borderRadius: "10px", fontSize: "11.5px", fontWeight: 500 }}
            title="Save this search and receive alert notifications when new ads match"
          >
            <span>{isSavedSearch ? "✓" : "🔔"}</span>
            <span>{isSavedSearch ? "Search Saved!" : "Save Search"}</span>
          </button>

          <span className="text-muted small ms-1">
            <strong>{totalResults}</strong> {totalResults === 1 ? "listing" : "listings"} found
          </span>
        </div>

        {/* Quick Sort & Grid/List View Toggle directly on bar */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <label
            className="text-secondary fw-medium d-none d-sm-inline"
            style={{ fontSize: "11px", color: "#64748b", margin: 0 }}
          >
            Sort by:
          </label>

          {/* ELASTIC PREMIUM CUSTOM SELECT DROPDOWN WRAPPER */}
          <div
            ref={sortDropdownRef}
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <button
              type="button"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              style={{
                height: "30px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "0 10px",
                backgroundColor: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                fontWeight: 500,
                fontSize: "11px",
                color: "#1e293b",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.18s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f8fafc";
                e.currentTarget.style.borderColor = "#94a3b8";
                e.currentTarget.style.boxShadow =
                  "0 2px 6px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.borderColor = "#cbd5e1";
                e.currentTarget.style.boxShadow =
                  "0 1px 3px rgba(0,0,0,0.04)";
              }}
            >
              <span>{sortLabels[sort] || "Newest First"}</span>
              <span
                style={{
                  fontSize: "8px",
                  color: "#94a3b8",
                  display: "inline-block",
                  transition: "transform 0.2s ease, color 0.18s ease",
                  transform: isSortDropdownOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                ▼
              </span>
            </button>

            {/* FLOATING DROPDOWN LIST */}
            {isSortDropdownOpen && (
              <ul
                style={{
                  position: "absolute",
                  top: "34px",
                  left: 0,
                  minWidth: "100%",
                  width: "max-content",
                  zIndex: 999,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                  padding: "4px 0",
                  margin: 0,
                  listStyle: "none",
                  overflow: "hidden",
                }}
              >
                {[
                  { key: "newest", label: "Newest First" },
                  { key: "price_asc", label: "Lowest Price" },
                  { key: "price_desc", label: "Highest Price" },
                ].map((opt) => (
                  <li
                    key={opt.key}
                    onClick={() => {
                      setSort(opt.key);
                      setIsSortDropdownOpen(false);
                      const params = new URLSearchParams(searchParams.toString());
                      if (opt.key === "newest") {
                        params.delete("sort");
                      } else {
                        params.set("sort", opt.key);
                      }
                      const qs = params.toString();
                      router.push(qs ? `${basePath}?${qs}` : basePath);
                    }}
                    style={{
                      padding: "6px 12px",
                      fontWeight: sort === opt.key ? 600 : 400,
                      fontSize: "11px",
                      color:
                        sort === opt.key
                          ? "#059669"
                          : "#334155",
                      backgroundColor:
                        sort === opt.key
                          ? "#ecfdf5"
                          : "transparent",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                      transition:
                        "background-color 0.15s ease, color 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        sort === opt.key
                          ? "#d1fae5"
                          : "#f1f5f9";
                      if (sort !== opt.key) {
                        e.currentTarget.style.color = "#0f172a";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        sort === opt.key
                          ? "#ecfdf5"
                          : "transparent";
                      e.currentTarget.style.color =
                        sort === opt.key
                          ? "#059669"
                          : "#334155";
                    }}
                  >
                    <span>{opt.label}</span>
                    {sort === opt.key && (
                      <span
                        style={{ fontSize: "10px", color: "#059669" }}
                      >
                        ✓
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Grid / List View Toggle */}
          {onViewModeChange && (
            <div
              className="p-1 bg-light d-flex align-items-center ms-1"
              style={{ borderRadius: "10px" }}
            >
              <button
                type="button"
                onClick={() => onViewModeChange("grid")}
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
                onClick={() => onViewModeChange("list")}
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
