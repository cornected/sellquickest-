"use client";

import { useState } from "react";
import { Share2, Check, Copy, MessageCircle } from "lucide-react";

interface ShareAdButtonProps {
  title: string;
  price: string;
  url?: string;
  className?: string;
}

export function ShareAdButton({
  title,
  price,
  url,
  className = "",
}: ShareAdButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const getFullUrl = () => {
    if (typeof window !== "undefined") {
      return url || window.location.href;
    }
    return url || "";
  };

  const handleShareClick = async () => {
    const fullUrl = getFullUrl();
    const shareText = `Check out this listing on SellQuickest: ${title} (${price})`;

    // Try native share if on mobile or supported
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: fullUrl,
        });
        return;
      } catch {
        // User cancelled or not supported, fall through to modal/dropdown
      }
    }

    setShowDropdown((prev) => !prev);
  };

  const handleCopyLink = () => {
    const fullUrl = getFullUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowDropdown(false);
      }, 2000);
    }
  };

  const shareToWhatsApp = () => {
    const fullUrl = getFullUrl();
    const text = encodeURIComponent(
      `Check out "${title}" on SellQuickest (${price}):\n${fullUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
    setShowDropdown(false);
  };

  const shareToTwitter = () => {
    const fullUrl = getFullUrl();
    const text = encodeURIComponent(
      `Check out "${title}" on SellQuickest (${price}):\n${fullUrl}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    setShowDropdown(false);
  };

  return (
    <div className={`position-relative d-inline-block ${className}`}>
      <button
        type="button"
        onClick={handleShareClick}
        className="btn btn-light border-0 d-inline-flex align-items-center gap-1.5 px-3 py-1.5 rounded-pill shadow-2xs"
        style={{
          fontSize: "13px",
          fontWeight: 500,
          backgroundColor: "#f1f5f9",
          color: "#475569",
        }}
        title="Share this ad"
      >
        <Share2 size={15} />
        <span>Share</span>
      </button>

      {/* DROPDOWN MENU */}
      {showDropdown && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ zIndex: 1050 }}
            onClick={() => setShowDropdown(false)}
          />
          <div
            className="position-absolute end-0 mt-2 bg-white rounded-4 shadow-lg border p-2"
            style={{ zIndex: 1055, minWidth: "220px", top: "100%" }}
          >
            <div className="px-2 py-1.5 mb-1 text-secondary small fw-semibold border-bottom">
              Share this listing
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className="btn btn-link text-dark text-decoration-none w-100 text-start px-2 py-2 d-flex align-items-center justify-content-between rounded-3 hover-bg-light"
              style={{ fontSize: "13px" }}
            >
              <div className="d-flex align-items-center gap-2">
                <Copy size={16} className="text-secondary" />
                <span>{copied ? "Link Copied!" : "Copy Link"}</span>
              </div>
              {copied && <Check size={16} className="text-success" />}
            </button>

            <button
              type="button"
              onClick={shareToWhatsApp}
              className="btn btn-link text-dark text-decoration-none w-100 text-start px-2 py-2 d-flex align-items-center gap-2 rounded-3 hover-bg-light"
              style={{ fontSize: "13px" }}
            >
              <MessageCircle size={16} style={{ color: "#25D366" }} />
              <span>Share to WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={shareToTwitter}
              className="btn btn-link text-dark text-decoration-none w-100 text-start px-2 py-2 d-flex align-items-center gap-2 rounded-3 hover-bg-light"
              style={{ fontSize: "13px" }}
            >
              <span style={{ fontSize: "14px", fontWeight: 700 }}>𝕏</span>
              <span>Share on X</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
