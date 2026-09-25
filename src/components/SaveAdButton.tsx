"use client";

import { useEffect, useState } from "react";

export function SaveAdButton({
  listingId,
  variant = "card",
  className = "",
}: {
  listingId: string;
  variant?: "card" | "detail";
  className?: string;
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sq_saved_ads");
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        setIsSaved(ids.includes(listingId));
      }
    } catch {
      // ignore
    }

    const handler = () => {
      try {
        const stored = localStorage.getItem("sq_saved_ads");
        if (stored) {
          const ids: string[] = JSON.parse(stored);
          setIsSaved(ids.includes(listingId));
        } else {
          setIsSaved(false);
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener("sq_favorites_updated", handler);
    return () => window.removeEventListener("sq_favorites_updated", handler);
  }, [listingId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const stored = localStorage.getItem("sq_saved_ads");
      let ids: string[] = stored ? JSON.parse(stored) : [];

      if (ids.includes(listingId)) {
        ids = ids.filter((id) => id !== listingId);
        setIsSaved(false);
      } else {
        ids.push(listingId);
        setIsSaved(true);
      }

      localStorage.setItem("sq_saved_ads", JSON.stringify(ids));
      window.dispatchEvent(new Event("sq_favorites_updated"));
      setAnimating(true);
      setTimeout(() => setAnimating(false), 300);
    } catch {
      // ignore
    }
  };

  if (variant === "detail") {
    return (
      <button
        type="button"
        onClick={toggleFavorite}
        className={`btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center border shadow-sm ${className}`}
        style={{
          width: "44px",
          height: "44px",
          transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: animating ? "scale(1.25)" : "scale(1)",
          backgroundColor: isSaved ? "#fef2f2" : "#ffffff",
          borderColor: isSaved ? "#fca5a5" : "#e2e8f0",
        }}
        title={isSaved ? "Remove from Saved Ads" : "Save to Liked Ads"}
        aria-label={isSaved ? "Saved" : "Save ad"}
      >
        <span style={{ fontSize: "20px", lineHeight: 1 }}>
          {isSaved ? "❤️" : "🤍"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={`btn btn-light rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center border-0 ${className}`}
      style={{
        width: "36px",
        height: "36px",
        backgroundColor: isSaved
          ? "rgba(254, 242, 242, 0.95)"
          : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(4px)",
        transition: "transform 0.2s ease, background-color 0.2s ease",
        transform: animating ? "scale(1.2)" : "scale(1)",
      }}
      title={isSaved ? "Remove from saved" : "Save to favorites"}
      aria-label={isSaved ? "Saved" : "Save"}
    >
      <span style={{ fontSize: "16px", lineHeight: 1 }}>
        {isSaved ? "❤️" : "🤍"}
      </span>
    </button>
  );
}
