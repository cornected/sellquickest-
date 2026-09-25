"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ListingGridOrList, ViewModeToggle } from "@/components/ListingGridOrList";

export function SavedAdsClient() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

  const fetchSavedListings = async () => {
    try {
      const stored = localStorage.getItem("sq_saved_ads");
      if (!stored) {
        setListings([]);
        setLoading(false);
        return;
      }

      const ids: string[] = JSON.parse(stored);
      if (ids.length === 0) {
        setListings([]);
        setLoading(false);
        return;
      }

      const res = await fetch("/api/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      if (res.ok) {
        const data = await res.json();
        setListings(data.listings || []);
      }
    } catch (e) {
      console.error("Error loading saved ads:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedListings();

    const handler = () => {
      fetchSavedListings();
    };

    window.addEventListener("sq_favorites_updated", handler);
    return () => window.removeEventListener("sq_favorites_updated", handler);
  }, []);

  const clearAllSaved = () => {
    if (confirm("Are you sure you want to clear all your saved ads?")) {
      localStorage.removeItem("sq_saved_ads");
      window.dispatchEvent(new Event("sq_favorites_updated"));
      setListings([]);
    }
  };

  if (loading) {
    return (
      <div className="py-5 text-center text-secondary">
        <div className="spinner-border spinner-border-sm text-success me-2" role="status" />
        Loading your saved ads...
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
        <div
          className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: "72px",
            height: "72px",
            backgroundColor: "#fef2f2",
            fontSize: "2rem",
          }}
        >
          ❤️
        </div>
        <h2 className="h5 fw-bold mb-2">No saved ads yet</h2>
        <p
          className="text-muted mx-auto mb-4"
          style={{ maxWidth: "420px", fontSize: "0.95rem" }}
        >
          Click the heart icon (🤍) on any ad listing to save it here for quick access later.
        </p>
        <div>
          <Link
            href="/"
            className="btn btn-sq text-white fw-semibold px-4 py-2 rounded-pill"
          >
            Discover Great Deals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <span className="text-secondary small">
          Showing <strong>{listings.length}</strong> saved {listings.length === 1 ? "ad" : "ads"}
        </span>

        <div className="d-flex align-items-center gap-2.5">
          <ViewModeToggle viewMode={viewMode} onChange={changeViewMode} />

          <button
            onClick={clearAllSaved}
            className="btn btn-outline-danger btn-sm rounded-pill px-3"
            style={{ fontSize: "0.8rem" }}
          >
            Clear All Saved
          </button>
        </div>
      </div>

      <ListingGridOrList
        listings={listings}
        viewMode={viewMode}
        gridColClass="col-6 col-md-4 col-lg-3"
        emptyMessage="No saved ads found."
      />
    </div>
  );
}
