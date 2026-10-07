"use client";

import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Save inquiry to localStorage mock queue or alert
    setTimeout(() => {
      try {
        const inquiries = JSON.parse(localStorage.getItem("sq_contact_inquiries") || "[]");
        inquiries.push({
          name,
          email,
          phone,
          subject,
          message,
          date: new Date().toISOString(),
        });
        localStorage.setItem("sq_contact_inquiries", JSON.stringify(inquiries));
      } catch {
        // ignore
      }
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="text-center py-5">
        <div className="fs-1 mb-3">✅</div>
        <h3 className="h5 fw-bold text-success mb-2">Message Sent Successfully!</h3>
        <p className="text-secondary small mb-4">
          Thank you for reaching out, <strong>{name}</strong>. Our customer support desk has received your ticket and will respond to <strong>{email}</strong> shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
          }}
          className="btn btn-outline-secondary btn-sm rounded-pill px-4"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      <div className="row g-3">
        <div className="col-sm-6">
          <label className="form-label small fw-semibold text-dark">Your Name *</label>
          <input
            type="text"
            className="form-control rounded-3"
            placeholder="e.g. Tunde Adeyemi"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label small fw-semibold text-dark">Email Address *</label>
          <input
            type="email"
            className="form-control rounded-3"
            placeholder="tunde@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-sm-6">
          <label className="form-label small fw-semibold text-dark">Phone Number (Optional)</label>
          <input
            type="tel"
            className="form-control rounded-3"
            placeholder="0801 234 5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label small fw-semibold text-dark">Subject *</label>
          <select
            className="form-select rounded-3"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Ad Posting & Promotion">Ad Posting &amp; Promotion</option>
            <option value="Report Fraud / Scam">Report Fraud / Scam</option>
            <option value="Account Support">Account Support</option>
            <option value="Merchant Partnership">Merchant Partnership</option>
          </select>
        </div>
      </div>

      <div>
        <label className="form-label small fw-semibold text-dark">Message *</label>
        <textarea
          rows={5}
          className="form-control rounded-3"
          placeholder="How can we assist you today? Please provide any listing links or details if applicable..."
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-sq text-white fw-bold py-2.5 rounded-pill mt-2 shadow-sm"
      >
        {submitting ? "Sending Ticket..." : "Send Message ✉️"}
      </button>
    </form>
  );
}
