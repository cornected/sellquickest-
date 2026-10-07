"use client";

import { useState } from "react";
import Link from "next/link";

export function ReportForm() {
  const [adLinkOrTitle, setAdLinkOrTitle] = useState("");
  const [reason, setReason] = useState("Suspected Scam / Fraud");
  const [details, setDetails] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      try {
        const reports = JSON.parse(localStorage.getItem("sq_ad_reports") || "[]");
        reports.push({
          adLinkOrTitle,
          reason,
          details,
          reporterEmail,
          date: new Date().toISOString(),
          status: "PENDING_REVIEW",
        });
        localStorage.setItem("sq_ad_reports", JSON.stringify(reports));
      } catch {
        // ignore
      }
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="fs-1 mb-3">🛡️</div>
        <h3 className="h5 fw-bold text-success mb-2">Report Submitted</h3>
        <p className="text-secondary small mb-4" style={{ maxWidth: "480px", margin: "0 auto" }}>
          Thank you for helping protect the SellQuickest community. Our security desk has logged your report and is investigating.
        </p>
        <div className="d-flex justify-content-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setAdLinkOrTitle("");
              setDetails("");
            }}
            className="btn btn-outline-secondary btn-sm rounded-pill px-3"
          >
            Submit Another Report
          </button>
          <Link href="/" className="btn btn-success btn-sm rounded-pill px-3">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      <div>
        <label className="form-label small fw-semibold text-dark">
          Listing Link or Ad Title *
        </label>
        <input
          type="text"
          className="form-control rounded-3"
          placeholder="Paste URL (e.g. /listing/...) or type the exact ad title"
          required
          value={adLinkOrTitle}
          onChange={(e) => setAdLinkOrTitle(e.target.value)}
        />
      </div>

      <div className="row g-3">
        <div className="col-sm-6">
          <label className="form-label small fw-semibold text-dark">Reason for Report *</label>
          <select
            className="form-select rounded-3"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="Suspected Scam / Fraud">Suspected Scam / Fraud</option>
            <option value="Asked for advance payment before meeting">Asked for advance payment before meeting</option>
            <option value="Counterfeit or fake item">Counterfeit or fake item</option>
            <option value="Stolen item">Stolen item</option>
            <option value="Prohibited item (weapons, drugs, etc.)">Prohibited item</option>
            <option value="Wrong category / Spam / Duplicate ad">Wrong category / Spam / Duplicate ad</option>
            <option value="Incorrect price (e.g. ₦1 price trick)">Incorrect / Deceptive price</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-sm-6">
          <label className="form-label small fw-semibold text-dark">Your Email (Optional)</label>
          <input
            type="email"
            className="form-control rounded-3"
            placeholder="For investigation updates"
            value={reporterEmail}
            onChange={(e) => setReporterEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="form-label small fw-semibold text-dark">
          Specific Details / Evidence *
        </label>
        <textarea
          rows={4}
          className="form-control rounded-3"
          placeholder="Please describe what happened (e.g. seller refused to meet, requested bank transfer to another account, suspicious behavior)..."
          required
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-danger text-white fw-bold py-2.5 rounded-pill mt-2 shadow-sm"
      >
        {submitting ? "Submitting Report..." : "Submit Incident Report 🚩"}
      </button>
    </form>
  );
}
