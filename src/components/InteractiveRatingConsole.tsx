"use client";

import React, { useState } from "react";

interface InteractiveRatingConsoleProps {
  initialRating: number;
  initialReviews: number;
}

export function InteractiveRatingConsole({
  initialRating,
  initialReviews,
}: InteractiveRatingConsoleProps) {
  const [currentRating, setCurrentRating] = useState<number>(initialRating);
  const [reviewCount, setReviewCount] = useState<number>(initialReviews);
  const [userRating, setUserRating] = useState<number | null>(null);

  const handleStarClick = (selectedStars: number) => {
    if (userRating === selectedStars) {
      setUserRating(null);
      setReviewCount(initialReviews);
      setCurrentRating(initialRating);
    } else {
      const wasRated = userRating !== null;
      setUserRating(selectedStars);
      if (!wasRated) {
        setReviewCount(initialReviews + 1);
      }
      const totalScore = initialRating * initialReviews + selectedStars;
      const divisor = wasRated ? initialReviews : initialReviews + 1;
      const newAverage = totalScore / divisor;
      setCurrentRating(parseFloat(newAverage.toFixed(1)));
    }
  };

  return (
    <div className="w-100">
      {/* 1. SELLER RATING DISPLAY (Updates dynamically above) */}
      <div className="d-flex justify-content-between align-items-center py-2">
        <span>Seller rating:</span>
        <strong
          style={{
            color: "#fcd34d",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          ⭐ {currentRating}{" "}
          <span style={{ color: "#64748b", fontWeight: 400, fontSize: "11px" }}>
            ({reviewCount} reviews)
          </span>
        </strong>
      </div>
      <div
        style={{
          borderBottom: "1px solid rgba(15, 23, 42, 0.12)",
          width: "100%",
        }}
      />

      {/* 2. BORDERLESS INTERACTIVE STAR SELECTION DRAWER */}
      <div className="p-0 d-flex align-items-center justify-content-between bg-transparent mt-3 mb-4">
        <span style={{ fontSize: "12px", fontWeight: 500, color: "#475569" }}>
          {userRating ? "Your rating logged:" : "Rate this merchant:"}
        </span>
        <div className="d-flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => {
            const isLit =
              userRating !== null
                ? star <= userRating
                : star <= Math.round(currentRating);
            return (
              <button
                key={`star-click-node-${star}`}
                type="button"
                onClick={() => handleStarClick(star)}
                className="btn p-0 border-0 bg-transparent"
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                  outline: "none",
                }}
                title={`Rate ${star} Stars`}
              >
                {isLit ? "⭐" : "☆"}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
