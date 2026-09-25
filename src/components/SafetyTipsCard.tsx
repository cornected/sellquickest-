"use client";

import { useState } from "react";
import { ShieldCheck, ChevronDown, ChevronUp, AlertTriangle, MapPin, Eye, CheckCircle2, ShieldAlert } from "lucide-react";

export function SafetyTipsCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="card border-0 shadow-sm overflow-hidden mb-4 mt-4"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        borderRadius: "24px",
        boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
      }}
    >
      {/* CARD HEADER WITH GENEROUS PADDING */}
      <div
        className="d-flex align-items-center justify-content-between cursor-pointer transition-all"
        style={{
          backgroundColor: "#f8fafc",
          borderBottom: isExpanded ? "1px solid #f1f5f9" : "none",
          padding: "18px 22px",
          cursor: "pointer",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: "38px",
              height: "38px",
              minWidth: "38px",
              minHeight: "38px",
              borderRadius: "12px",
              backgroundColor: "#dcfce7",
              color: "#16a34a",
              boxShadow: "0 2px 6px rgba(22, 163, 74, 0.12)",
            }}
          >
            <ShieldCheck size={20} strokeWidth={2.2} />
          </div>
          <div>
            <div className="fw-bold text-dark" style={{ fontSize: "14.5px", letterSpacing: "-0.2px" }}>
              Buyer Safety Tips
            </div>
            <div className="text-secondary small mt-0.5" style={{ fontSize: "12px" }}>
              Avoid scam: Never pay in advance
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-link text-secondary p-1.5 rounded-circle d-flex align-items-center justify-content-center text-decoration-none"
          style={{ width: "32px", height: "32px", backgroundColor: "#f1f5f9" }}
          aria-label={isExpanded ? "Collapse safety tips" : "Expand safety tips"}
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* QUICK HIGHLIGHT ALWAYS VISIBLE (COLLAPSED) */}
      {!isExpanded && (
        <div className="bg-white" style={{ padding: "22px 26px 24px 26px", borderTop: "1px solid #f1f5f9" }}>
          <ul className="list-unstyled mb-0 d-flex flex-column gap-3.5" style={{ fontSize: "13.5px", color: "#475569" }}>
            <li className="d-flex align-items-start gap-3">
              <span
                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 fw-bold shadow-2xs"
                style={{
                  width: "22px",
                  height: "22px",
                  backgroundColor: "#fee2e2",
                  color: "#ef4444",
                  fontSize: "12px",
                  marginTop: "1px",
                }}
              >
                ✕
              </span>
              <span style={{ lineHeight: "1.5" }}>Do not send money before inspecting the item.</span>
            </li>
            <li className="d-flex align-items-start gap-3">
              <span
                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 fw-bold shadow-2xs"
                style={{
                  width: "22px",
                  height: "22px",
                  backgroundColor: "#dcfce7",
                  color: "#16a34a",
                  fontSize: "12px",
                  marginTop: "1px",
                }}
              >
                ✓
              </span>
              <span style={{ lineHeight: "1.5" }}>Meet in a public, well-lit place (e.g. shopping mall or station).</span>
            </li>
          </ul>
        </div>
      )}

      {/* DETAILED EXPANDED ACCORDION CONTENT WITH GENEROUS BREATHING ROOM */}
      {isExpanded && (
        <div className="bg-white d-flex flex-column gap-4" style={{ padding: "24px 26px" }}>
          {/* TIP 1 */}
          <div className="d-flex align-items-start gap-3">
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0 shadow-2xs"
              style={{
                width: "38px",
                height: "38px",
                minWidth: "38px",
                minHeight: "38px",
                borderRadius: "12px",
                backgroundColor: "#fee2e2",
                color: "#ef4444",
                marginTop: "2px",
              }}
            >
              <AlertTriangle size={18} strokeWidth={2.2} />
            </div>
            <div className="flex-grow-1">
              <strong className="d-block text-dark mb-1" style={{ fontSize: "14px", lineHeight: "1.3" }}>
                1. Never Pay in Advance
              </strong>
              <p className="text-secondary mb-0" style={{ fontSize: "12.5px", lineHeight: "1.55" }}>
                Do not pay any deposit, commitment fee, or courier fee before you have physically seen and verified the product.
              </p>
            </div>
          </div>

          <div className="border-bottom border-light w-100" />

          {/* TIP 2 */}
          <div className="d-flex align-items-start gap-3">
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0 shadow-2xs"
              style={{
                width: "38px",
                height: "38px",
                minWidth: "38px",
                minHeight: "38px",
                borderRadius: "12px",
                backgroundColor: "#e0f2fe",
                color: "#0284c7",
                marginTop: "2px",
              }}
            >
              <MapPin size={18} strokeWidth={2.2} />
            </div>
            <div className="flex-grow-1">
              <strong className="d-block text-dark mb-1" style={{ fontSize: "14px", lineHeight: "1.3" }}>
                2. Meet in a Safe Public Location
              </strong>
              <p className="text-secondary mb-0" style={{ fontSize: "12.5px", lineHeight: "1.55" }}>
                Always arrange meetings in crowded public spaces like shopping malls, fuel stations, banks, or eateries during daylight.
              </p>
            </div>
          </div>

          <div className="border-bottom border-light w-100" />

          {/* TIP 3 */}
          <div className="d-flex align-items-start gap-3">
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0 shadow-2xs"
              style={{
                width: "38px",
                height: "38px",
                minWidth: "38px",
                minHeight: "38px",
                borderRadius: "12px",
                backgroundColor: "#fef9c3",
                color: "#ca8a04",
                marginTop: "2px",
              }}
            >
              <Eye size={18} strokeWidth={2.2} />
            </div>
            <div className="flex-grow-1">
              <strong className="d-block text-dark mb-1" style={{ fontSize: "14px", lineHeight: "1.3" }}>
                3. Thoroughly Inspect & Test
              </strong>
              <p className="text-secondary mb-0" style={{ fontSize: "12.5px", lineHeight: "1.55" }}>
                Check electronic gadgets, vehicles, and clothing carefully. For phones, check IMEI and iCloud/Google lock status before paying.
              </p>
            </div>
          </div>

          <div className="border-bottom border-light w-100" />

          {/* TIP 4 */}
          <div className="d-flex align-items-start gap-3">
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0 shadow-2xs"
              style={{
                width: "38px",
                height: "38px",
                minWidth: "38px",
                minHeight: "38px",
                borderRadius: "12px",
                backgroundColor: "#dcfce7",
                color: "#16a34a",
                marginTop: "2px",
              }}
            >
              <CheckCircle2 size={18} strokeWidth={2.2} />
            </div>
            <div className="flex-grow-1">
              <strong className="d-block text-dark mb-1" style={{ fontSize: "14px", lineHeight: "1.3" }}>
                4. Pay Electronically After Collecting
              </strong>
              <p className="text-secondary mb-0" style={{ fontSize: "12.5px", lineHeight: "1.55" }}>
                Make an instant bank transfer only after you are 100% satisfied with the item in hand.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
