"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatNaira } from "@/lib/format";
import { Tag, Sparkles, Check, X, ShieldCheck } from "lucide-react";

interface MakeOfferModalProps {
  listing: {
    id: string;
    title: string;
    price: number;
    imageUrl?: string;
    seller?: {
      id?: string;
      name?: string;
    };
  };
  currentUser?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export function MakeOfferModal({ listing, currentUser }: MakeOfferModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState<number>(Math.round(listing.price * 0.9));
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Safe thumbnail extraction
  let displayImage = "/placeholder.png";
  if (listing.imageUrl) {
    displayImage = listing.imageUrl.includes(",")
      ? listing.imageUrl.split(",")[0].trim()
      : listing.imageUrl.trim();
  }

  const applyDiscount = (percent: number) => {
    const discounted = Math.round(listing.price * (1 - percent / 100));
    setOfferAmount(discounted);
  };

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      router.push(`/login?next=/listing/${listing.id}`);
      return;
    }

    if (offerAmount <= 0 || offerAmount >= listing.price * 2) {
      return;
    }

    setIsSubmitting(true);

    try {
      const storageKey = `sq_chat_${listing.id}_${currentUser.id}`;
      const savedRaw = localStorage.getItem(storageKey);
      const existingMessages = savedRaw ? JSON.parse(savedRaw) : [];

      const offerMsg = {
        id: `offer-${Date.now()}`,
        sender: "me",
        text: note ? `I would like to offer ${formatNaira(offerAmount)}. Note: "${note}"` : `I would like to offer ${formatNaira(offerAmount)} for this item.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        offer: {
          amount: offerAmount,
          listedPrice: listing.price,
          status: "PENDING",
          note: note.trim() || undefined,
          createdAt: new Date().toISOString(),
        },
      };

      const updated = [...existingMessages, offerMsg];
      localStorage.setItem(storageKey, JSON.stringify(updated));

      // Update conversation list
      const convListRaw = localStorage.getItem("sq_conversations_list");
      let convList: any[] = convListRaw ? JSON.parse(convListRaw) : [];
      const existingIdx = convList.findIndex((c) => c.listingId === listing.id);
      const convItem = {
        listingId: listing.id,
        listingTitle: listing.title,
        listingPrice: listing.price,
        listingImage: displayImage,
        sellerName: listing.seller?.name || "Seller",
        messageCount: updated.length,
        lastUpdated: new Date().toISOString(),
      };
      if (existingIdx >= 0) {
        convList[existingIdx] = { ...convList[existingIdx], ...convItem };
      } else {
        convList.unshift(convItem);
      }
      localStorage.setItem("sq_conversations_list", JSON.stringify(convList));

      // Create notification for seller & user
      const notifRaw = localStorage.getItem("sq_user_notifications");
      const notifs = notifRaw ? JSON.parse(notifRaw) : [];
      notifs.unshift({
        id: `offer-notif-${Date.now()}`,
        title: `Offer sent: ${formatNaira(offerAmount)}`,
        text: `You offered ${formatNaira(offerAmount)} for "${listing.title}". Waiting for response.`,
        type: "success",
        listingId: listing.id,
        listingTitle: listing.title,
        createdAt: new Date().toISOString(),
        read: false,
      });
      localStorage.setItem("sq_user_notifications", JSON.stringify(notifs.slice(0, 20)));

      // Dispatch global events
      window.dispatchEvent(new Event("sq_conversations_updated"));
      window.dispatchEvent(new Event("sq_notifications_updated"));

      setIsOpen(false);
      router.push(`/messages/chat?listingId=${listing.id}`);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => {
          if (!currentUser) {
            router.push(`/login?next=/listing/${listing.id}`);
            return;
          }
          setIsOpen(true);
        }}
        className="btn w-100 d-flex align-items-center justify-content-center gap-2 fw-bold rounded-pill transition-all shadow-xs"
        style={{
          height: "48px",
          backgroundColor: "#fffbeb",
          color: "#b45309",
          border: "1.5px solid #fde68a",
          fontSize: "14px",
          boxShadow: "0 2px 6px rgba(245, 158, 11, 0.08)",
        }}
      >
        <Tag size={16} />
        <span>Make an Offer</span>
      </button>

      {/* MODAL BACKDROP */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(5px)",
            zIndex: 1060,
          }}
          onClick={() => setIsOpen(false)}
        >
          {/* MODAL CARD */}
          <div
            className="card border-0 shadow-lg w-100 bg-white overflow-hidden"
            style={{
              maxWidth: "460px",
              borderRadius: "24px",
              boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div
              className="p-3 px-4 d-flex align-items-center justify-content-between border-bottom"
              style={{
                backgroundColor: "#fffbeb",
              }}
            >
              <div className="d-flex align-items-center gap-2">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "34px",
                    height: "34px",
                    backgroundColor: "#fde68a",
                    color: "#b45309",
                  }}
                >
                  <Tag size={18} />
                </div>
                <div>
                  <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: "15px" }}>
                    Make a Price Offer
                  </h6>
                  <span className="text-secondary" style={{ fontSize: "11px" }}>
                    Negotiate directly with {listing.seller?.name || "the seller"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn btn-link text-secondary p-1 d-flex align-items-center justify-content-center text-decoration-none"
                style={{ borderRadius: "50%" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* AD PREVIEW BANNER */}
            <div className="p-3 px-4 border-bottom bg-light-subtle d-flex align-items-center gap-3">
              <div
                className="position-relative overflow-hidden flex-shrink-0 shadow-xs"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  backgroundColor: "#e2e8f0",
                }}
              >
                <Image
                  src={displayImage}
                  alt={listing.title}
                  fill
                  className="object-fit-cover"
                  sizes="50px"
                />
              </div>
              <div className="overflow-hidden flex-grow-1">
                <div className="fw-semibold text-truncate text-dark" style={{ fontSize: "13px" }}>
                  {listing.title}
                </div>
                <div className="d-flex align-items-baseline gap-2 mt-0.5">
                  <span className="text-muted small" style={{ fontSize: "11px" }}>
                    Original Price:
                  </span>
                  <span className="fw-bold text-success" style={{ fontSize: "13.5px" }}>
                    {formatNaira(listing.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* FORM BODY */}
            <form onSubmit={handleSubmitOffer} className="p-4">
              {/* QUICK PERCENTAGE CHIPS */}
              <div className="mb-3">
                <label className="form-label text-muted small fw-medium mb-1.5" style={{ fontSize: "12px" }}>
                  Quick Bargain Suggestions
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {[5, 10, 15, 20].map((pct) => {
                    const discounted = Math.round(listing.price * (1 - pct / 100));
                    const isSelected = offerAmount === discounted;
                    return (
                      <button
                        key={`pct-${pct}`}
                        type="button"
                        onClick={() => applyDiscount(pct)}
                        className={`btn btn-sm rounded-pill fw-medium px-2.5 py-1 ${
                          isSelected ? "btn-success" : "btn-light border"
                        }`}
                        style={{ fontSize: "12px" }}
                      >
                        -{pct}% ({formatNaira(discounted)})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* OFFER AMOUNT INPUT */}
              <div className="mb-3">
                <label className="form-label fw-bold text-dark mb-1" style={{ fontSize: "13px" }}>
                  Your Offer Amount (₦)
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light fw-bold text-dark" style={{ fontSize: "14px" }}>
                    ₦
                  </span>
                  <input
                    type="number"
                    required
                    min={1}
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(Number(e.target.value))}
                    className="form-control form-control-lg fw-bold text-success"
                    style={{ fontSize: "18px" }}
                  />
                </div>
                <div className="form-text text-muted" style={{ fontSize: "11px" }}>
                  {offerAmount < listing.price ? (
                    <span className="text-success">
                      ▼ You are asking for a {formatNaira(listing.price - offerAmount)} (
                      {Math.round(((listing.price - offerAmount) / listing.price) * 100)}%) discount
                    </span>
                  ) : offerAmount > listing.price ? (
                    <span className="text-primary">▲ Above asking price</span>
                  ) : (
                    <span>Matches current asking price</span>
                  )}
                </div>
              </div>

              {/* OPTIONAL NOTE */}
              <div className="mb-3">
                <label className="form-label text-muted small fw-medium mb-1" style={{ fontSize: "12px" }}>
                  Message to Seller (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ready for instant pickup in Ikeja with cash"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="form-control form-control-sm"
                  style={{ fontSize: "12.5px" }}
                  maxLength={100}
                />
              </div>

              {/* BUYER SAFETY GUARANTEE */}
              <div
                className="p-2.5 rounded-3 mb-4 d-flex align-items-center gap-2"
                style={{
                  backgroundColor: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  fontSize: "11px",
                  color: "#166534",
                }}
              >
                <ShieldCheck size={16} className="flex-shrink-0" />
                <span>
                  <strong>Safe Negotiation:</strong> You pay nothing right now. Payment only happens after you inspect and accept the item in person.
                </span>
              </div>

              {/* ACTIONS */}
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-light rounded-pill flex-grow-1 py-2 fw-medium border"
                  style={{ fontSize: "13.5px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || offerAmount <= 0}
                  className="btn btn-success rounded-pill flex-grow-1 py-2 fw-bold d-inline-flex align-items-center justify-content-center gap-1.5 shadow-sm"
                  style={{ fontSize: "13.5px", backgroundColor: "#10b981", borderColor: "#10b981" }}
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Send Offer {formatNaira(offerAmount)}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
