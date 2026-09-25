"use client";

import React, { useState, useEffect } from "react";
import { Star, CheckCircle, RotateCcw } from "lucide-react";

interface InteractiveRatingConsoleProps {
  sellerId?: string;
  sellerName?: string;
  initialRating?: number;
  initialReviews?: number;
}

const STAR_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent!",
};

export function InteractiveRatingConsole({
  sellerId = "default",
  sellerName = "Seller",
  initialRating = 4.8,
  initialReviews = 14,
}: InteractiveRatingConsoleProps) {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(initialRating);
  const [reviewCount, setReviewCount] = useState<number>(initialReviews);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const storageKey = `sq_seller_rating_${sellerId}`;

  // Load existing rating on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const val = parseInt(stored, 10);
        if (val >= 1 && val <= 5) {
          setUserRating(val);
          const totalScore = initialRating * initialReviews + val;
          const newAvg = totalScore / (initialReviews + 1);
          setCurrentRating(parseFloat(newAvg.toFixed(1)));
          setReviewCount(initialReviews + 1);
        }
      }
    } catch {
      // ignore
    }
  }, [sellerId, initialRating, initialReviews, storageKey]);

  const handleRate = (star: number) => {
    const wasAlreadyRated = userRating !== null;
    setUserRating(star);
    setShowSuccessToast(true);

    try {
      localStorage.setItem(storageKey, star.toString());
    } catch {
      // ignore
    }

    const totalScore = initialRating * initialReviews + star;
    const count = wasAlreadyRated ? reviewCount : initialReviews + 1;
    const newAvg = totalScore / count;
    setCurrentRating(parseFloat(newAvg.toFixed(1)));
    setReviewCount(count);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  const handleReset = () => {
    setUserRating(null);
    setHoverRating(null);
    setCurrentRating(initialRating);
    setReviewCount(initialReviews);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  };

  const activeStarIndex = hoverRating || userRating || 0;

  return (
    <div className="w-100 my-2">
      {/* 1. SELLER RATING SUMMARY ROW */}
      <div className="d-flex justify-content-between align-items-center py-2.5">
        <span className="text-secondary" style={{ fontSize: "13px" }}>Seller rating:</span>
        <div className="d-flex align-items-center gap-1.5">
          <span
            className="fw-bold"
            style={{ color: "#f59e0b", fontSize: "14.5px" }}
          >
            ★ {currentRating}
          </span>
          <span className="text-muted" style={{ fontSize: "12px" }}>
            ({reviewCount} reviews)
          </span>
        </div>
      </div>

      <div
        style={{
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
          width: "100%",
        }}
      />

      {/* 2. INTERACTIVE RATING WIDGET WITH GENEROUS BREATHING PADDING */}
      <div
        className="rounded-4 mt-3"
        style={{
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          padding: "16px 18px",
        }}
      >
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span
            style={{ fontSize: "12.5px", fontWeight: 600, color: "#334155" }}
          >
            {userRating ? "Your rating:" : "Rate this merchant:"}
          </span>
          {activeStarIndex > 0 && (
            <span
              className="badge text-dark border-0 fw-semibold px-2 py-1"
              style={{ fontSize: "11px", backgroundColor: "#fef3c7", color: "#b45309" }}
            >
              {STAR_LABELS[activeStarIndex]}
            </span>
          )}
        </div>

        <div className="d-flex align-items-center justify-content-between gap-1 pt-0.5">
          <div className="d-flex gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= (hoverRating || userRating || 0);
              return (
                <button
                  key={`star-${star}`}
                  type="button"
                  onClick={() => handleRate(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="btn p-1 border-0 bg-transparent"
                  style={{
                    lineHeight: 1,
                    cursor: "pointer",
                    transition: "transform 0.15s ease",
                    transform:
                      hoverRating === star ? "scale(1.25)" : "scale(1)",
                  }}
                  title={`Rate ${star} star - ${STAR_LABELS[star]}`}
                >
                  <Star
                    size={22}
                    fill={isFilled ? "#f59e0b" : "none"}
                    color={isFilled ? "#f59e0b" : "#cbd5e1"}
                    strokeWidth={isFilled ? 0 : 2}
                  />
                </button>
              );
            })}
          </div>

          {userRating && (
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-link text-secondary text-decoration-none p-0 d-flex align-items-center gap-1"
              style={{ fontSize: "11.5px" }}
              title="Change your rating"
            >
              <RotateCcw size={12} />
              <span>Change</span>
            </button>
          )}
        </div>

        {/* 3. FEEDBACK TOAST */}
        {showSuccessToast && (
          <div
            className="alert alert-success py-2 px-2.5 mt-2.5 mb-0 d-flex align-items-center gap-2 rounded-3"
            style={{ fontSize: "11.5px" }}
          >
            <CheckCircle size={15} className="text-success flex-shrink-0" />
            <span>Thank you! Your rating for {sellerName} has been saved.</span>
          </div>
        )}
      </div>
    </div>
  );
}
