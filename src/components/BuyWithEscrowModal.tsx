"use client";

import { useState } from "react";
import { formatNaira } from "@/lib/format";
import { ShieldCheck, Lock, Truck, CheckCircle2, X } from "lucide-react";

interface BuyWithEscrowModalProps {
  listing: {
    id: string;
    title: string;
    price: number;
    location?: string | null;
    sellerId?: string;
    seller?: {
      name?: string | null;
    } | null;
  };
  currentUser?: {
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
  } | null;
}

export function BuyWithEscrowModal({ listing, currentUser }: BuyWithEscrowModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [gateway, setGateway] = useState<"PAYSTACK" | "FLUTTERWAVE">("PAYSTACK");
  const [deliveryLocation, setDeliveryLocation] = useState(listing.location || "Lagos, Nigeria");
  const [buyerPhone, setBuyerPhone] = useState(currentUser?.phone || "");
  const [isProcessing, setIsProcessing] = useState(false);
  const [escrowSuccess, setEscrowSuccess] = useState<{
    reference: string;
    totalAmount: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const escrowFee = Math.min(Math.round(listing.price * 0.015), 5000);
  const totalPayable = listing.price + escrowFee;

  const handleEscrowPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryLocation.trim() || !buyerPhone.trim()) {
      setErrorMsg("Please enter your delivery/inspection city and contact phone number.");
      return;
    }

    setErrorMsg("");
    setIsProcessing(true);

    try {
      const refCode = `SQ-ESC-${gateway === "FLUTTERWAVE" ? "FLW" : "PAY"}-${Date.now().toString().slice(-6)}`;

      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gateway,
          planName: `ESCROW ORDER: ${listing.title.slice(0, 42)}`,
          tier: "escrow",
          amount: totalPayable,
          listingId: listing.id,
          reference: refCode,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data.error || "Could not process escrow deposit. Please try again.");
        setIsProcessing(false);
        return;
      }

      // Also notify seller via in-app message thread
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          receiverId: listing.sellerId,
          content: `🛡️ [ESCROW DEPOSIT CONFIRMED - Ref: ${refCode}] I have deposited ${formatNaira(totalPayable)} into SellQuickest Escrow for "${listing.title}". Preferred inspection/delivery location: ${deliveryLocation.trim()} (Phone: ${buyerPhone.trim()}).`,
        }),
      }).catch(() => {});

      window.dispatchEvent(new Event("sq_notifications_updated"));

      setEscrowSuccess({
        reference: data?.transaction?.reference || refCode,
        totalAmount: totalPayable,
      });
    } catch {
      setErrorMsg("Network error connecting to escrow payment gateway.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setEscrowSuccess(null);
          setErrorMsg("");
          setIsOpen(true);
        }}
        className="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
        style={{
          height: "48px",
          backgroundColor: "#0f172a",
          color: "#ffffff",
          borderRadius: "24px",
          fontSize: "13.5px",
          border: "1.5px solid #1e293b",
        }}
      >
        <ShieldCheck size={17} style={{ color: "#10b981" }} />
        <span>Buy Safely with Escrow</span>
      </button>

      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.72)",
            backdropFilter: "blur(4px)",
            zIndex: 1065,
          }}
          onClick={() => !isProcessing && setIsOpen(false)}
        >
          <div
            className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white w-100"
            style={{ maxWidth: "520px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="p-3.5 px-4 text-white d-flex align-items-center justify-content-between"
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #064e3b 100%)",
              }}
            >
              <div className="d-flex align-items-center gap-2.5">
                <ShieldCheck size={22} className="text-success" />
                <div>
                  <h3 className="h6 fw-bold mb-0 text-white">SellQuickest Escrow Checkout</h3>
                  <span className="small text-white text-opacity-75" style={{ fontSize: "11.5px" }}>
                    100% Buyer Protection • Funds Held Until Inspection
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link text-white p-1"
                onClick={() => setIsOpen(false)}
                disabled={isProcessing}
              >
                <X size={18} />
              </button>
            </div>

            <div className="card-body p-4">
              {escrowSuccess ? (
                <div className="text-center py-3">
                  <div
                    className="rounded-circle bg-success bg-opacity-10 text-success d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "64px", height: "64px" }}
                  >
                    <CheckCircle2 size={34} />
                  </div>
                  <h4 className="h5 fw-bold text-dark mb-1">Escrow Deposit Secured!</h4>
                  <p className="text-secondary small mb-3">
                    Your payment of <strong>{formatNaira(escrowSuccess.totalAmount)}</strong> is now locked in
                    SellQuickest Escrow. The seller has been notified via chat to arrange inspection/delivery.
                  </p>
                  <div className="p-3 rounded-3 bg-light border text-start small mb-4">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Escrow Reference:</span>
                      <strong className="font-monospace text-dark">{escrowSuccess.reference}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Item Protected:</span>
                      <strong className="text-dark text-truncate ms-2" style={{ maxWidth: "240px" }}>
                        {listing.title}
                      </strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Escrow Status:</span>
                      <span className="badge bg-success text-white">FUNDS LOCKED SAFELY</span>
                    </div>
                  </div>
                  <div className="d-flex gap-2 justify-content-center">
                    <a
                      href={`/messages?listingId=${listing.id}`}
                      className="btn btn-sq text-white fw-bold rounded-pill px-4 py-2"
                    >
                      Open Seller Chat →
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="btn btn-outline-secondary rounded-pill px-4 py-2"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEscrowPayment}>
                  {/* How Escrow Works Strip */}
                  <div className="row g-2 mb-3 text-center">
                    <div className="col-4">
                      <div className="p-2 rounded-3 bg-light border h-100">
                        <Lock size={16} className="text-success mb-1" />
                        <div className="fw-bold text-dark" style={{ fontSize: "11px" }}>
                          1. Pay Escrow
                        </div>
                        <div className="text-muted" style={{ fontSize: "10px" }}>
                          Money held safely
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-2 rounded-3 bg-light border h-100">
                        <Truck size={16} className="text-primary mb-1" />
                        <div className="fw-bold text-dark" style={{ fontSize: "11px" }}>
                          2. Inspect Item
                        </div>
                        <div className="text-muted" style={{ fontSize: "10px" }}>
                          Verify condition
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-2 rounded-3 bg-light border h-100">
                        <CheckCircle2 size={16} className="text-success mb-1" />
                        <div className="fw-bold text-dark" style={{ fontSize: "11px" }}>
                          3. Approve
                        </div>
                        <div className="text-muted" style={{ fontSize: "10px" }}>
                          Seller gets paid
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="p-3 rounded-3 bg-light border mb-3 small">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-secondary">Item Price:</span>
                      <strong className="text-dark">{formatNaira(listing.price)}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-1.5 pb-1.5 border-bottom">
                      <span className="text-secondary">Escrow Protection Fee (1.5% capped):</span>
                      <strong className="text-dark">{formatNaira(escrowFee)}</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-dark">Total Escrow Deposit:</span>
                      <span className="h6 fw-bold text-success mb-0">{formatNaira(totalPayable)}</span>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">{errorMsg}</div>
                  )}

                  <div className="mb-2.5">
                    <label className="form-label small fw-semibold text-secondary mb-1">
                      Preferred Delivery / Inspection Location *
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-3 py-2"
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      placeholder="e.g. Ikeja City Mall, Lagos"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary mb-1">
                      Your Active Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-sm rounded-3 py-2"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="e.g. 0803 000 0000"
                      required
                    />
                  </div>

                  {/* Gateway Selector */}
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary mb-1">
                      Select Escrow Payment Gateway
                    </label>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        onClick={() => setGateway("PAYSTACK")}
                        className={`btn btn-sm flex-grow-1 py-2 rounded-3 fw-semibold border ${
                          gateway === "PAYSTACK"
                            ? "border-success bg-success bg-opacity-10 text-success"
                            : "bg-white text-secondary"
                        }`}
                      >
                        💳 Paystack (Card / Transfer)
                      </button>
                      <button
                        type="button"
                        onClick={() => setGateway("FLUTTERWAVE")}
                        className={`btn btn-sm flex-grow-1 py-2 rounded-3 fw-semibold border ${
                          gateway === "FLUTTERWAVE"
                            ? "border-warning bg-warning bg-opacity-15 text-dark"
                            : "bg-white text-secondary"
                        }`}
                      >
                        🦋 Flutterwave (USSD / Bank)
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn btn-sq text-white w-100 fw-bold py-2.5 rounded-pill shadow-sm"
                  >
                    {isProcessing
                      ? "Securing Escrow Deposit..."
                      : `🔒 Deposit ${formatNaira(totalPayable)} into Escrow`}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
