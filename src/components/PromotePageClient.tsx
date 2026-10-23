"use client";

import { useState } from "react";
import Link from "next/link";
import { formatNaira } from "@/lib/format";
import { PromoteAdModal } from "@/components/PromoteAdModal";

interface PromotePageClientProps {
  listings: {
    id: string;
    title: string;
    price: number;
    imageUrl?: string;
    boostTier?: string | null;
  }[];
}

export function PromotePageClient({ listings }: PromotePageClientProps) {
  const [selectedId, setSelectedId] = useState<string>(listings[0]?.id || "");
  const selectedListing = listings.find((l) => l.id === selectedId) || listings[0];

  if (!listings.length) {
    return (
      <div className="card border-0 rounded-4 p-4 bg-white shadow-sm mb-4 text-center">
        <h2 className="h5 fw-bold text-dark mb-1">Ready to Boost an Ad?</h2>
        <p className="text-secondary small mb-3">
          Post your first item on SellQuickest to unlock instant Paystack &amp; Flutterwave ad promotions.
        </p>
        <div>
          <Link href="/post" className="btn btn-sq text-white fw-bold rounded-pill px-4 py-2">
            + Post a New Ad Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 rounded-4 p-4 bg-white shadow-sm mb-4 border-start border-4 border-success">
      <div className="row align-items-center g-3">
        <div className="col-12 col-md-7">
          <span className="badge bg-success bg-opacity-10 text-success fw-bold px-2.5 py-1 rounded-pill mb-2">
            ⚡ INSTANT CHECKOUT (PAYSTACK &amp; FLUTTERWAVE)
          </span>
          <h2 className="h5 fw-bold text-dark mb-1">Select an Ad to Promote Right Now</h2>
          <p className="text-secondary small mb-2">
            Choose any of your active listings below and launch the instant boost checkout modal:
          </p>
          <select
            className="form-select rounded-3 py-2 fw-medium"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {listings.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} — {formatNaira(item.price)}
                {item.boostTier ? ` [${item.boostTier}]` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-5 d-flex flex-column align-items-md-end justify-content-center">
          {selectedListing && (
            <div className="p-3 rounded-4 bg-light border w-100 text-center">
              <div className="small text-muted mb-1">Selected Listing:</div>
              <div className="fw-bold text-dark text-truncate mb-2">{selectedListing.title}</div>
              <div className="d-flex justify-content-center">
                <PromoteAdModal
                  listing={{
                    id: selectedListing.id,
                    title: selectedListing.title,
                    price: selectedListing.price,
                    imageUrl: selectedListing.imageUrl,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
