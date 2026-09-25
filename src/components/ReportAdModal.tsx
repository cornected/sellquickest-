"use client";

import { useState } from "react";

export function ReportAdModal({
  listingId,
  listingTitle,
}: {
  listingId: string;
  listingTitle: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("Scam / Fraudulent listing");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Save report in localStorage / state
    try {
      const reports = JSON.parse(localStorage.getItem("sq_ad_reports") || "[]");
      reports.push({
        listingId,
        listingTitle,
        reason,
        details,
        date: new Date().toISOString(),
      });
      localStorage.setItem("sq_ad_reports", JSON.stringify(reports));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setDetails("");
      }, 2200);
    }, 400);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn btn-link text-secondary text-decoration-none p-0 d-inline-flex align-items-center gap-1.5"
        style={{ fontSize: "12px" }}
      >
        <span style={{ fontSize: "14px" }}>🚩</span>
        <span>Report this ad</span>
      </button>

      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            zIndex: 9999,
            backdropFilter: "blur(4px)",
          }}
          onClick={() => !sending && setIsOpen(false)}
        >
          <div
            className="card border-0 shadow-lg rounded-4 p-4 w-100"
            style={{ maxWidth: "480px", backgroundColor: "#ffffff" }}
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="text-center py-4">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: "56px",
                    height: "56px",
                    backgroundColor: "#ecfdf5",
                    fontSize: "26px",
                  }}
                >
                  ✅
                </div>
                <h3 className="h5 fw-bold text-dark mb-2">Report Submitted</h3>
                <p className="text-secondary small mb-0">
                  Thank you for keeping SellQuickest safe! Our moderation and safety team will review this listing within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ fontSize: "20px" }}>🚩</span>
                    <h3 className="h6 fw-bold mb-0 text-dark">Report this Listing</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-sm btn-light rounded-circle"
                    style={{ width: "32px", height: "32px", lineHeight: "1" }}
                  >
                    ✕
                  </button>
                </div>

                <div className="p-2.5 rounded-3 bg-light mb-3 border">
                  <div className="text-muted small" style={{ fontSize: "11px" }}>Ad Title</div>
                  <strong className="text-dark small text-truncate d-block">
                    {listingTitle}
                  </strong>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary small fw-medium mb-1">
                    Reason for reporting
                  </label>
                  <select
                    className="form-select form-select-sm rounded-3"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  >
                    <option value="Scam / Fraudulent seller">Scam / Fraudulent seller</option>
                    <option value="Item already sold or unavailable">Item already sold or unavailable</option>
                    <option value="Incorrect or misleading price">Incorrect or misleading price</option>
                    <option value="Counterfeit, illegal, or prohibited item">Counterfeit, illegal, or prohibited item</option>
                    <option value="Duplicate listing">Duplicate listing</option>
                    <option value="Wrong category / spam">Wrong category / spam</option>
                    <option value="Offensive content">Offensive content</option>
                    <option value="Other issue">Other issue</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary small fw-medium mb-1">
                    Additional details (optional)
                  </label>
                  <textarea
                    className="form-control rounded-3"
                    rows={3}
                    placeholder="Provide any context that helps our trust & safety team investigate..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    style={{ fontSize: "13px" }}
                  />
                </div>

                <div className="d-flex justify-content-end gap-2 pt-2 border-top">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-light btn-sm rounded-pill px-3"
                    disabled={sending}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger btn-sm rounded-pill px-4 fw-semibold"
                    disabled={sending}
                  >
                    {sending ? "Submitting..." : "Submit Report"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
