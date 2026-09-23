"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FASHION_BRANDS, FashionBrand, FashionBrandOrigin } from "@/lib/fashionBrands";

type FashionBrandSelectProps = {
  value: string;
  onChange: (value: string) => void;
  customValue?: string;
  onCustomChange?: (value: string) => void;
  category?: string; // e.g. "Women's Fashion", "Men's Fashion", "Shoes & Footwear", "Bags & Luggage", etc.
  label?: string;
};

type OriginFilter = "ALL" | "NIGERIAN" | "CELEBRITY" | "AFRICAN" | "GLOBAL";

export function FashionBrandSelect({
  value,
  onChange,
  customValue = "",
  onCustomChange,
  category,
  label = "Brand / Maker",
}: FashionBrandSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [originFilter, setOriginFilter] = useState<OriginFilter>("ALL");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  // Filter brands based on category, origin tab, and search query
  const { popularBrands, otherBrands, totalMatches, originCounts } = useMemo(() => {
    // 1. Filter by category if category is specified
    let pool: FashionBrand[] = FASHION_BRANDS;
    if (category) {
      const normalizedCat = category.toLowerCase().trim();
      pool = FASHION_BRANDS.filter((brand) =>
        brand.category.some(
          (c) =>
            c.toLowerCase().trim() === normalizedCat ||
            (normalizedCat.includes("women") && c.toLowerCase().includes("women")) ||
            (normalizedCat.includes("men") && !normalizedCat.includes("women") && c.toLowerCase().includes("men")) ||
            (normalizedCat.includes("shoe") && c.toLowerCase().includes("shoe")) ||
            (normalizedCat.includes("bag") && c.toLowerCase().includes("bag")) ||
            (normalizedCat.includes("watch") && c.toLowerCase().includes("watch")) ||
            (normalizedCat.includes("kid") && c.toLowerCase().includes("kid")) ||
            (normalizedCat.includes("jewel") && c.toLowerCase().includes("jewel")) ||
            (normalizedCat.includes("beauty") && c.toLowerCase().includes("beauty")) ||
            (normalizedCat.includes("hair") && c.toLowerCase().includes("hair")) ||
            (normalizedCat.includes("fabric") && c.toLowerCase().includes("fabric")) ||
            (normalizedCat.includes("service") && c.toLowerCase().includes("service"))
        )
      );
      if (pool.length === 0) {
        pool = FASHION_BRANDS;
      }
    }

    // Origin counts before query filter for tabs
    const counts = {
      ALL: pool.length,
      NIGERIAN: pool.filter((b) => b.origin === "Nigerian").length,
      CELEBRITY: pool.filter((b) => b.origin === "Celebrity").length,
      AFRICAN: pool.filter((b) => b.origin === "African").length,
      GLOBAL: pool.filter((b) => !b.origin || b.origin === "Global").length,
    };

    // Filter by origin tab if not ALL
    let originFiltered = pool;
    if (originFilter === "NIGERIAN") {
      originFiltered = pool.filter((b) => b.origin === "Nigerian");
    } else if (originFilter === "CELEBRITY") {
      originFiltered = pool.filter((b) => b.origin === "Celebrity");
    } else if (originFilter === "AFRICAN") {
      originFiltered = pool.filter((b) => b.origin === "African");
    } else if (originFilter === "GLOBAL") {
      originFiltered = pool.filter((b) => !b.origin || b.origin === "Global");
    }

    // 2. Filter by search query if any
    const query = search.trim().toLowerCase();
    const searched = query
      ? originFiltered.filter((brand) => brand.name.toLowerCase().includes(query))
      : originFiltered;

    // 3. Separate into Popular and Others
    const popular: FashionBrand[] = [];
    const others: FashionBrand[] = [];

    // Deduplicate brand names within the pool
    const seenNames = new Set<string>();

    searched.forEach((brand) => {
      const key = brand.name.toLowerCase();
      if (seenNames.has(key)) return;
      seenNames.add(key);

      if (brand.popular) {
        popular.push(brand);
      } else {
        others.push(brand);
      }
    });

    // Sort popular alphabetically
    popular.sort((a, b) => a.name.localeCompare(b.name));

    // Sort other brands alphabetically
    others.sort((a, b) => a.name.localeCompare(b.name));

    return {
      popularBrands: popular,
      otherBrands: others,
      totalMatches: popular.length + others.length,
      originCounts: counts,
    };
  }, [category, search, originFilter]);

  const handleSelect = (brandName: string) => {
    onChange(brandName);
    setSearch("");
    setOpen(false);
  };

  const getOriginBadge = (origin?: FashionBrandOrigin) => {
    if (origin === "Nigerian") {
      return (
        <span
          className="badge bg-success-subtle text-success-emphasis border border-success-subtle rounded px-1.5 py-0.5 fw-bold"
          style={{ fontSize: "10px", letterSpacing: "0.5px" }}
        >
          NG
        </span>
      );
    }
    if (origin === "Celebrity") {
      return (
        <span
          className="badge bg-danger-subtle text-danger-emphasis border border-danger-subtle rounded-pill px-2 py-0.5"
          style={{ fontSize: "10px" }}
        >
          🌟 Celebrity / Merch
        </span>
      );
    }
    if (origin === "African") {
      return (
        <span
          className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-2 py-0.5"
          style={{ fontSize: "10px" }}
        >
          🌍 African
        </span>
      );
    }
    return null;
  };

  return (
    <div ref={dropdownRef} className="position-relative">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <label
          className="form-label text-secondary small fw-semibold mb-0"
          style={{ fontSize: "12.5px" }}
        >
          {label}
        </label>
        {category && (
          <span
            className="badge rounded-pill bg-light text-secondary border border-light-subtle px-2 py-1"
            style={{ fontSize: "10.5px" }}
          >
            {category}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="form-select w-100 text-start px-3 py-2 border-light-subtle text-dark d-flex align-items-center justify-content-between"
        style={{
          borderRadius: "8px",
          fontSize: "13px",
          minHeight: "42px",
          backgroundColor: "#fff",
        }}
      >
        <span className={value ? "text-dark fw-medium" : "text-secondary"}>
          {value || "Select Brand / Maker"}
        </span>
      </button>

      {open && (
        <div
          className="position-absolute start-0 end-0 bg-white border shadow-lg p-2"
          style={{
            zIndex: 1250,
            borderRadius: "10px",
            top: "calc(100% + 4px)",
            maxHeight: "440px",
            overflowY: "auto",
          }}
        >
          {/* SEARCH INPUT */}
          <div className="p-1 mb-2 sticky-top bg-white border-bottom pb-2">
            <div className="position-relative mb-2">
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${category || "fashion"} brands (e.g. Zip Republic, Ashluxe, Nike)...`}
                className="form-control px-3"
                style={{
                  fontSize: "13px",
                  borderRadius: "8px",
                  height: "38px",
                }}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="btn btn-sm btn-link text-secondary position-absolute end-0 top-50 translate-middle-y text-decoration-none pe-2"
                  style={{ fontSize: "12px" }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* ORIGIN FILTER PILLS (Nigerian, Celebrity, African, Global) */}
            <div className="d-flex gap-1 flex-wrap mb-1">
              <button
                type="button"
                onClick={() => setOriginFilter("ALL")}
                className={`btn btn-sm px-2 py-0.5 rounded-pill ${
                  originFilter === "ALL"
                    ? "btn-dark text-white fw-semibold"
                    : "btn-light text-secondary border border-light-subtle"
                }`}
                style={{ fontSize: "11px" }}
              >
                All ({originCounts.ALL})
              </button>
              {originCounts.NIGERIAN > 0 && (
                <button
                  type="button"
                  onClick={() => setOriginFilter("NIGERIAN")}
                  className={`btn btn-sm px-2 py-0.5 rounded-pill ${
                    originFilter === "NIGERIAN"
                      ? "btn-success text-white fw-semibold"
                      : "btn-light text-success-emphasis border border-success-subtle"
                  }`}
                  style={{ fontSize: "11px" }}
                >
                  🇳🇬 Nigerian ({originCounts.NIGERIAN})
                </button>
              )}
              {originCounts.CELEBRITY > 0 && (
                <button
                  type="button"
                  onClick={() => setOriginFilter("CELEBRITY")}
                  className={`btn btn-sm px-2 py-0.5 rounded-pill ${
                    originFilter === "CELEBRITY"
                      ? "btn-danger text-white fw-semibold"
                      : "btn-light text-danger-emphasis border border-danger-subtle"
                  }`}
                  style={{ fontSize: "11px" }}
                >
                  🌟 Celebrity / Merch ({originCounts.CELEBRITY})
                </button>
              )}
              {originCounts.AFRICAN > 0 && (
                <button
                  type="button"
                  onClick={() => setOriginFilter("AFRICAN")}
                  className={`btn btn-sm px-2 py-0.5 rounded-pill ${
                    originFilter === "AFRICAN"
                      ? "btn-warning text-dark fw-semibold"
                      : "btn-light text-warning-emphasis border border-warning-subtle"
                  }`}
                  style={{ fontSize: "11px" }}
                >
                  🌍 African ({originCounts.AFRICAN})
                </button>
              )}
              {originCounts.GLOBAL > 0 && (
                <button
                  type="button"
                  onClick={() => setOriginFilter("GLOBAL")}
                  className={`btn btn-sm px-2 py-0.5 rounded-pill ${
                    originFilter === "GLOBAL"
                      ? "btn-secondary text-white fw-semibold"
                      : "btn-light text-secondary border border-light-subtle"
                  }`}
                  style={{ fontSize: "11px" }}
                >
                  🌐 Global ({originCounts.GLOBAL})
                </button>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-1 px-1">
              <span className="text-muted" style={{ fontSize: "11px" }}>
                {totalMatches} {totalMatches === 1 ? "brand" : "brands"} available
              </span>
              <span className="text-muted" style={{ fontSize: "11px" }}>
                Popular first • A–Z
              </span>
            </div>
          </div>

          {/* QUICK ACTIONS: NO BRAND, CUSTOM, & OTHER */}
          <div className="d-flex gap-1 mb-2 px-1">
            <button
              type="button"
              onClick={() => handleSelect("No Brand / Unbranded")}
              className={`btn btn-sm flex-fill text-center border location-option ${
                value === "No Brand / Unbranded"
                  ? "btn-dark text-white fw-semibold"
                  : "btn-light text-secondary"
              }`}
              style={{ fontSize: "12px", borderRadius: "6px" }}
            >
              No Brand / Unbranded
            </button>
            <button
              type="button"
              onClick={() => handleSelect("Custom / Bespoke Tailored")}
              className={`btn btn-sm flex-fill text-center border location-option ${
                value === "Custom / Bespoke Tailored"
                  ? "btn-dark text-white fw-semibold"
                  : "btn-light text-secondary"
              }`}
              style={{ fontSize: "12px", borderRadius: "6px" }}
            >
              Custom / Bespoke
            </button>
            <button
              type="button"
              onClick={() => handleSelect("Other")}
              className={`btn btn-sm border location-option ${
                value === "Other"
                  ? "btn-dark text-white fw-semibold"
                  : "btn-light text-secondary"
              }`}
              style={{ fontSize: "12px", borderRadius: "6px" }}
            >
              Other
            </button>
          </div>

          {/* SECTION 1: POPULAR BRANDS */}
          {popularBrands.length > 0 && (
            <div className="mb-2">
              <div
                className="px-2 py-1 mb-1 text-uppercase fw-bold text-dark bg-light rounded d-flex align-items-center justify-content-between"
                style={{ fontSize: "11px", letterSpacing: "0.5px" }}
              >
                <span>⭐ Popular Brands</span>
                <span className="badge bg-secondary-subtle text-secondary" style={{ fontSize: "10px" }}>
                  {popularBrands.length}
                </span>
              </div>
              <div className="d-flex flex-column gap-1">
                {popularBrands.map((brand) => (
                  <button
                    key={`pop-${brand.name}`}
                    type="button"
                    onClick={() => handleSelect(brand.name)}
                    className={`btn w-100 text-start border-0 d-flex justify-content-between align-items-center dropdown-option ${
                      value === brand.name
                        ? "bg-light text-dark fw-semibold active-option"
                        : "bg-white text-secondary"
                    }`}
                    style={{
                      borderRadius: "6px",
                      fontSize: "13px",
                      padding: "8px 14px",
                    }}
                  >
                    <span className="fw-medium">{brand.name}</span>
                    {getOriginBadge(brand.origin)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: OTHER BRANDS (A-Z) */}
          {otherBrands.length > 0 && (
            <div>
              <div
                className="px-2 py-1 mb-1 text-uppercase fw-bold text-dark bg-light rounded d-flex align-items-center justify-content-between"
                style={{ fontSize: "11px", letterSpacing: "0.5px" }}
              >
                <span>All Other Brands (A–Z)</span>
                <span className="badge bg-secondary-subtle text-secondary" style={{ fontSize: "10px" }}>
                  {otherBrands.length}
                </span>
              </div>
              <div className="d-flex flex-column gap-1">
                {otherBrands.map((brand) => (
                  <button
                    key={`oth-${brand.name}`}
                    type="button"
                    onClick={() => handleSelect(brand.name)}
                    className={`btn w-100 text-start border-0 d-flex justify-content-between align-items-center dropdown-option ${
                      value === brand.name
                        ? "bg-light text-dark fw-semibold active-option"
                        : "bg-white text-secondary"
                    }`}
                    style={{
                      borderRadius: "6px",
                      fontSize: "13px",
                      padding: "8px 14px",
                    }}
                  >
                    <span>{brand.name}</span>
                    {getOriginBadge(brand.origin)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {popularBrands.length === 0 && otherBrands.length === 0 && (
            <div className="p-3 text-center text-secondary small">
              No matching brands found for &quot;{search}&quot;.
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => handleSelect("Other")}
                  className="btn btn-sm btn-outline-dark"
                  style={{ fontSize: "12px" }}
                >
                  Use &quot;Other&quot; to specify custom brand
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CUSTOM BRAND INPUT IF "OTHER" SELECTED */}
      {value === "Other" && (
        <div className="mt-2">
          <input
            type="text"
            value={customValue}
            onChange={(e) => onCustomChange?.(e.target.value)}
            placeholder="Type your brand name..."
            className="form-control"
            style={{
              borderRadius: "8px",
              fontSize: "13px",
              minHeight: "42px",
            }}
          />
        </div>
      )}
    </div>
  );
}
