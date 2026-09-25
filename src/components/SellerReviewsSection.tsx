"use client";

import { useState, useEffect } from "react";
import { Star, ShieldCheck, CheckCircle2, MessageSquare, ThumbsUp, X } from "lucide-react";

interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer?: boolean;
}

export function SellerReviewsSection({
  sellerId,
  sellerName,
}: {
  sellerId: string;
  sellerName: string;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const defaultReviews: Review[] = [
    {
      id: "rev-1",
      reviewerName: "Emeka Okafor",
      rating: 5,
      date: "3 days ago",
      comment: "Very honest and reliable seller! The phone was exactly as described, battery health 92%. We met at Ikeja City Mall.",
      verifiedBuyer: true,
    },
    {
      id: "rev-2",
      reviewerName: "Bolanle Adebayo",
      rating: 5,
      date: "1 week ago",
      comment: "Quick transaction and courteous communication. Tested everything on the spot and made transfer. Highly recommended!",
      verifiedBuyer: true,
    },
    {
      id: "rev-3",
      reviewerName: "Fatima Aliyu",
      rating: 4,
      date: "2 weeks ago",
      comment: "Good seller. Arrived slightly late to the meetup due to traffic, but the product condition was top-notch.",
      verifiedBuyer: true,
    },
  ];

  const storageKey = `sq_seller_reviews_${sellerId}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
          return;
        }
      }
      setReviews(defaultReviews);
      localStorage.setItem(storageKey, JSON.stringify(defaultReviews));
    } catch {
      setReviews(defaultReviews);
    }
  }, [sellerId, storageKey]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      reviewerName: reviewerName.trim(),
      rating,
      date: "Just now",
      comment: comment.trim(),
      verifiedBuyer: true,
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setReviewerName("");
    setComment("");
    setRating(5);
    setIsModalOpen(false);
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <div className="card border-0 shadow-sm rounded-4 bg-white p-4 mb-4" style={{ borderRadius: "24px" }}>
      {/* HEADER WITH TRUST BADGES */}
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 border-bottom pb-4 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h5 className="fw-bold text-dark mb-0" style={{ fontSize: "18px" }}>
              Buyer Feedback & Ratings
            </h5>
            <span className="badge bg-success bg-opacity-10 text-success fw-bold px-2.5 py-1 rounded-pill" style={{ fontSize: "11px" }}>
              Verified Store
            </span>
          </div>
          <div className="d-flex align-items-center gap-2 text-secondary small">
            <div className="d-flex align-items-center text-warning">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={`star-${i}`}
                  size={15}
                  fill={i < Math.round(Number(avgRating)) ? "#f59e0b" : "none"}
                  color="#f59e0b"
                />
              ))}
            </div>
            <strong className="text-dark">{avgRating} out of 5</strong>
            <span>({reviews.length} {reviews.length === 1 ? "review" : "reviews"})</span>
          </div>
        </div>

        {/* TRUST BADGE PILLS */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span className="badge bg-light text-dark border d-inline-flex align-items-center gap-1.5 px-3 py-2 rounded-pill" style={{ fontSize: "11.5px" }}>
            <CheckCircle2 size={14} color="#10b981" />
            <span>Phone Verified</span>
          </span>
          <span className="badge bg-light text-dark border d-inline-flex align-items-center gap-1.5 px-3 py-2 rounded-pill" style={{ fontSize: "11.5px" }}>
            <ShieldCheck size={14} color="#0284c7" />
            <span>NIN Verified</span>
          </span>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn btn-outline-success btn-sm rounded-pill fw-semibold px-3 py-1.5"
            style={{ fontSize: "12.5px" }}
          >
            ★ Leave Feedback
          </button>
        </div>
      </div>

      {/* REVIEWS STREAM WITH GENEROUS BREATHING ROOM & CLEAR SEPARATION */}
      <div className="d-flex flex-column" style={{ gap: "20px" }}>
        {reviews.map((r) => (
          <div
            key={r.id}
            className="card border-0 shadow-2xs transition-all"
            style={{
              borderRadius: "20px",
              backgroundColor: "#f8fafc",
              border: "1px solid rgba(15, 23, 42, 0.08)",
              padding: "20px 24px",
            }}
          >
            {/* Reviewer Header Row */}
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-xs flex-shrink-0"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#10b981",
                    fontSize: "15px",
                    boxShadow: "0 2px 8px rgba(16, 185, 129, 0.2)",
                  }}
                >
                  {r.reviewerName ? r.reviewerName[0].toUpperCase() : "U"}
                </div>
                <div>
                  <strong className="text-dark d-block" style={{ fontSize: "14.5px", lineHeight: "1.25" }}>
                    {r.reviewerName}
                  </strong>
                  {r.verifiedBuyer && (
                    <span
                      className="badge bg-success bg-opacity-10 text-success fw-semibold mt-1"
                      style={{ fontSize: "11px", padding: "3px 8px" }}
                    >
                      ✓ Verified Buyer
                    </span>
                  )}
                </div>
              </div>

              {/* Stars & Date with ample separation */}
              <div className="d-flex align-items-center gap-2">
                <div className="d-flex text-warning gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`rstar-${r.id}-${i}`}
                      size={15}
                      fill={i < r.rating ? "#f59e0b" : "none"}
                      color="#f59e0b"
                    />
                  ))}
                </div>
                <span className="text-muted ms-2" style={{ fontSize: "12px" }}>
                  {r.date}
                </span>
              </div>
            </div>

            {/* Comment Text with relaxed line-height and breathing room */}
            <p
              className="text-secondary mb-0 ps-1"
              style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#475569" }}
            >
              &ldquo;{r.comment}&rdquo;
            </p>
          </div>
        ))}
      </div>

      {/* LEAVE REVIEW MODAL */}
      {isModalOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(5px)",
            zIndex: 1060,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="card border-0 shadow-lg w-100 bg-white overflow-hidden"
            style={{
              maxWidth: "460px",
              borderRadius: "24px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 px-4 border-bottom d-flex align-items-center justify-content-between bg-light-subtle">
              <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: "15px" }}>
                Rate & Review {sellerName}
              </h6>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn btn-link text-secondary p-1 text-decoration-none"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="p-4">
              <div className="mb-3 text-center">
                <label className="form-label text-muted small fw-medium mb-1">
                  How was your experience?
                </label>
                <div className="d-flex justify-content-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={`star-btn-${star}`}
                      type="button"
                      onClick={() => setRating(star)}
                      className="btn btn-link p-1 text-decoration-none"
                      style={{ cursor: "pointer" }}
                    >
                      <Star
                        size={28}
                        fill={star <= rating ? "#f59e0b" : "none"}
                        color="#f59e0b"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-dark small fw-bold mb-1" style={{ fontSize: "12.5px" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chinedu or Anonymous"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="form-control"
                  style={{ fontSize: "13px" }}
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-dark small fw-bold mb-1" style={{ fontSize: "12.5px" }}>
                  Review Feedback
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe product condition, response time, and transaction safety..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-control"
                  style={{ fontSize: "13px" }}
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-light rounded-pill flex-grow-1 py-2 fw-medium border"
                  style={{ fontSize: "13px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success rounded-pill flex-grow-1 py-2 fw-bold text-white shadow-sm"
                  style={{ fontSize: "13.5px", backgroundColor: "#10b981", borderColor: "#10b981" }}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
