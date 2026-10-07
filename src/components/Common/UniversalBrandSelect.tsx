"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BrandItem, BrandOrigin } from "@/lib/brandCatalogs";

type OriginFilter = "ALL" | "NIGERIAN" | "CELEBRITY" | "AFRICAN" | "GLOBAL";

export type UniversalBrandSelectProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  customValue?: string;
  onCustomChange?: (value: string) => void;
  category?: string; // Subcategory or item type tag
  label?: string;
  placeholder?: string;
  brands: BrandItem[];
  allowNoBrand?: boolean;
  allowCustomBespoke?: boolean;
};

export function UniversalBrandSelect({
  id = "brand-select",
  value = "",
  onChange,
  customValue = "",
  onCustomChange,
  category,
  label = "Brand / Maker",
  placeholder = "Select Brand / Maker",
  brands,
  allowNoBrand = true,
  allowCustomBespoke = false,
}: UniversalBrandSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [originFilter, setOriginFilter] = useState<OriginFilter>("ALL");
  const [internalCustom, setInternalCustom] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (customValue !== undefined) {
      setInternalCustom(customValue);
    }
  }, [customValue]);

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
    let pool: BrandItem[] = brands;
    if (category) {
      const normalizedCat = category.toLowerCase().trim();
      const filtered = brands.filter((brand) =>
        brand.category?.some((c) => {
          const normC = c.toLowerCase().trim();
          return (
            normC === normalizedCat ||
            normalizedCat.includes(normC) ||
            normC.includes(normalizedCat)
          );
        })
      );
      if (filtered.length > 0) {
        pool = filtered;
      }
    }

    // Origin counts before text query filter
    const counts = {
      ALL: pool.length,
      NIGERIAN: pool.filter((b) => b.origin === "Nigerian").length,
      CELEBRITY: pool.filter((b) => b.origin === "Celebrity").length,
      AFRICAN: pool.filter((b) => b.origin === "African").length,
      GLOBAL: pool.filter((b) => !b.origin || b.origin === "Global").length,
    };

    // Filter by origin tab
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

    // Filter by search query
    const query = search.trim().toLowerCase();
    const searched = query
      ? originFiltered.filter((brand) => brand.name.toLowerCase().includes(query))
      : originFiltered;

    // Separate into Popular and Others
    const popular: BrandItem[] = [];
    const others: BrandItem[] = [];
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

    popular.sort((a, b) => a.name.localeCompare(b.name));
    others.sort((a, b) => a.name.localeCompare(b.name));

    return {
      popularBrands: popular,
      otherBrands: others,
      totalMatches: popular.length + others.length,
      originCounts: counts,
    };
  }, [brands, category, search, originFilter]);

  const handleSelect = (brandName: string) => {
    onChange(brandName);
    setSearch("");
    setOpen(false);
  };

  const handleCustomInput = (text: string) => {
    setInternalCustom(text);
    if (onCustomChange) {
      onCustomChange(text);
    } else {
      onChange(text.trim() ? text : "Other");
    }
  };

  const getOriginBadge = (origin?: BrandOrigin) => {
    if (origin === "Nigerian") {
      return (
        <span
          title="Nigerian Brand"
          style={{ fontSize: "14px", lineHeight: 1 }}
        >
          🇳🇬
        </span>
      );
    }
    if (origin === "Celebrity") {
      return (
        <span
          title="Merch / Celebrity Brand"
          style={{ fontSize: "13px", lineHeight: 1 }}
        >
          🏷️
        </span>
      );
    }
    if (origin === "African") {
      return (
        <span
          title="African Brand"
          style={{ fontSize: "14px", lineHeight: 1 }}
        >
          🌍
        </span>
      );
    }
    return null;
  };

  const isOtherActive =
    value === "Other" ||
    (value !== "" &&
      value !== "Unbranded" &&
      value !== "No Brand / Unbranded" &&
      value !== "Custom / Bespoke Tailored" &&
      !brands.some((b) => b.name.toLowerCase() === value.toLowerCase()));

  const currentInputValue =
    customValue !== undefined
      ? customValue
      : value === "Other"
        ? internalCustom
        : !brands.some((b) => b.name.toLowerCase() === value.toLowerCase())
          ? value
          : internalCustom;

  return (
    <div ref={dropdownRef} className="position-relative">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <label
          htmlFor={id}
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
        id={id}
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
          {value || placeholder}
        </span>
      </button>

      {open && (
        <div
          className="position-absolute start-0 end-0 bg-white border shadow-lg"
          style={{
            zIndex: 1250,
            borderRadius: "10px",
            top: "calc(100% + 4px)",
            maxHeight: "440px",
            overflowY: "auto",
          }}
        >
          {/* SEARCH INPUT */}
          <div className="p-2 sticky-top bg-white border-bottom">
            <div className="position-relative">
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${category || label.toLowerCase()} brands...`}
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
          </div>

          {/* LIST OF BRANDS */}
          <div>
            {allowNoBrand &&
              (!search || "unbranded".includes(search.toLowerCase())) && (
                <button
                  type="button"
                  onClick={() => handleSelect("Unbranded")}
                  className={`brand-option-item ${
                    value === "Unbranded" || value === "No Brand / Unbranded"
                      ? "selected"
                      : ""
                  }`}
                >
                  <span>Unbranded</span>
                  {(value === "Unbranded" ||
                    value === "No Brand / Unbranded") && (
                    <span className="text-success fw-bold">✓</span>
                  )}
                </button>
              )}

            {/* SECTION 1: POPULAR BRANDS WITH EXTRA SPACING */}
            {popularBrands.length > 0 && (
              <div className="my-2">
                <div
                  className="px-3 py-2 text-uppercase fw-semibold text-secondary d-flex align-items-center"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.8px",
                    backgroundColor: "#f8fafc",
                    borderTop: "1px solid rgba(0, 0, 0, 0.045)",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.045)",
                  }}
                >
                  Popular Brands
                </div>
                {popularBrands.map((brand) => (
                  <button
                    key={`pop-${brand.name}`}
                    type="button"
                    onClick={() => handleSelect(brand.name)}
                    className={`brand-option-item ${
                      value === brand.name ? "selected" : ""
                    }`}
                  >
                    <span>
                      {brand.name}
                      {brand.origin === "Celebrity" && (
                        <span
                          className="text-secondary ms-1.5"
                          style={{ fontSize: "11px", fontWeight: 400 }}
                        >
                          (Merch)
                        </span>
                      )}
                    </span>
                    {value === brand.name && (
                      <span className="text-success fw-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* SECTION 2: ALL OTHER BRANDS (A-Z) */}
            {otherBrands.length > 0 && (
              <div className="mb-2">
                <div
                  className="px-3 py-2 text-uppercase fw-semibold text-secondary d-flex align-items-center"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.8px",
                    backgroundColor: "#f8fafc",
                    borderTop: "1px solid rgba(0, 0, 0, 0.045)",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.045)",
                  }}
                >
                  All Other Brands
                </div>
                {otherBrands.map((brand) => (
                  <button
                    key={`oth-${brand.name}`}
                    type="button"
                    onClick={() => handleSelect(brand.name)}
                    className={`brand-option-item ${
                      value === brand.name ? "selected" : ""
                    }`}
                  >
                    <span>
                      {brand.name}
                      {brand.origin === "Celebrity" && (
                        <span
                          className="text-secondary ms-1.5"
                          style={{ fontSize: "11px", fontWeight: 400 }}
                        >
                          (Merch)
                        </span>
                      )}
                    </span>
                    {value === brand.name && (
                      <span className="text-success fw-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* "OTHER" OPTION AMONG THE LIST */}
            <button
              type="button"
              onClick={() => handleSelect("Other")}
              className={`brand-option-item ${
                value === "Other" ? "selected" : ""
              }`}
            >
              <span className="text-secondary">Other</span>
              {value === "Other" && (
                <span className="text-success fw-bold">✓</span>
              )}
            </button>
          </div>

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

      {/* CUSTOM BRAND INPUT IF "OTHER" OR UNLISTED BRAND */}
      {isOtherActive && (
        <div className="mt-2">
          <input
            type="text"
            value={currentInputValue ?? ""}
            onChange={(e) => handleCustomInput(e.target.value)}
            placeholder={`Type your ${label.toLowerCase()}...`}
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
