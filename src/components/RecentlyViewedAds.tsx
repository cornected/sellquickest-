"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatNaira } from "@/lib/format";

interface RecentlyViewedItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  location: string;
  condition: string;
}

interface RecentlyViewedAdsProps {
  currentListing?: RecentlyViewedItem;
}

export function RecentlyViewedAds({ currentListing }: RecentlyViewedAdsProps) {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    try {
      const storedRaw = localStorage.getItem("sq_recently_viewed");
      let storedList: RecentlyViewedItem[] = storedRaw ? JSON.parse(storedRaw) : [];

      if (currentListing) {
        // Remove duplicate of the current listing
        storedList = storedList.filter((item) => item.id !== currentListing.id);
        // Prepend current listing to history
        storedList.unshift(currentListing);
        // Limit to 10 stored
        storedList = storedList.slice(0, 10);
        localStorage.setItem("sq_recently_viewed", JSON.stringify(storedList));
      }

      // Display all except the current listing
      const displayList = currentListing
        ? storedList.filter((item) => item.id !== currentListing.id)
        : storedList;

      setItems(displayList);
    } catch {
      // Ignore localStorage errors
    }
  }, [currentListing]);

  const clearHistory = () => {
    try {
      localStorage.removeItem("sq_recently_viewed");
      setItems([]);
    } catch {
      // Ignore
    }
  };

  if (items.length === 0) return null;

  return (
    <section className="mt-5 pt-4 border-top">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <span style={{ fontSize: "1.2rem" }}>🕒</span>
          <h3 className="h6 fw-bold text-dark mb-0">Recently Viewed</h3>
          <span className="badge bg-light text-secondary border small">
            {items.length}
          </span>
        </div>

        <button
          type="button"
          onClick={clearHistory}
          className="btn btn-sm btn-link text-muted text-decoration-none small p-0"
          style={{ fontSize: "12px" }}
        >
          Clear history
        </button>
      </div>

      <div className="row g-3">
        {items.slice(0, 4).map((item) => {
          let displayImage = "/placeholder.png";
          try {
            if (item.imageUrl) {
              if (item.imageUrl.startsWith("[")) {
                const parsed = JSON.parse(item.imageUrl);
                if (Array.isArray(parsed) && parsed.length > 0) displayImage = parsed[0];
              } else if (item.imageUrl.includes(",")) {
                displayImage = item.imageUrl.split(",")[0].trim();
              } else {
                displayImage = item.imageUrl.trim();
              }
            }
          } catch {
            displayImage = "/placeholder.png";
          }

          return (
            <div key={`recent-${item.id}`} className="col-6 col-md-3">
              <Link
                href={`/listing/${item.id}`}
                className="card border-0 shadow-2xs rounded-4 h-100 bg-white text-decoration-none overflow-hidden transition-all hover-shadow d-flex flex-column p-2.5"
                style={{
                  border: "1px solid rgba(0,0,0,0.04)",
                  borderRadius: "16px",
                }}
              >
                <div
                  className="position-relative w-100 rounded-3 overflow-hidden mb-2"
                  style={{ height: "120px", backgroundColor: "#f8fafc" }}
                >
                  <Image
                    src={displayImage}
                    alt={item.title}
                    fill
                    className="object-fit-cover"
                    sizes="(max-width: 768px) 50vw, 220px"
                  />
                </div>

                <div className="d-flex flex-column flex-grow-1">
                  <h4
                    className="text-dark small fw-medium mb-1 text-truncate"
                    title={item.title}
                    style={{ fontSize: "13px" }}
                  >
                    {item.title}
                  </h4>

                  <div className="text-success fw-bold small mb-1">
                    {formatNaira(item.price)}
                  </div>

                  <div className="text-muted small mt-auto" style={{ fontSize: "11px" }}>
                    📍 {item.location || "Lagos"}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
