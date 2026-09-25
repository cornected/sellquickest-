"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatNaira } from "@/lib/format";
import { Tag, Paperclip, X, Check, Image as ImageIcon, Sparkles } from "lucide-react";

interface ChatOffer {
  amount: number;
  listedPrice: number;
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "COUNTERED";
  note?: string;
  createdAt?: string;
}

interface ChatMessage {
  id: string;
  sender: "me" | "seller";
  text: string;
  time: string;
  image?: string;
  offer?: ChatOffer;
}

export function ChatWindow({
  listing,
  currentUser,
}: {
  listing: any;
  currentUser: { id: string; name: string; email: string };
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerInputAmount, setOfferInputAmount] = useState<number>(Math.round(listing.price * 0.9));
  const [offerNote, setOfferNote] = useState("");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extract display image
  let displayImage = "/placeholder.png";
  try {
    if (listing.imageUrl) {
      if (listing.imageUrl.includes(",")) {
        displayImage = listing.imageUrl.split(",")[0].trim();
      } else {
        displayImage = listing.imageUrl.trim();
      }
    }
  } catch {
    displayImage = "/placeholder.png";
  }

  const storageKey = `sq_chat_${listing.id}_${currentUser.id}`;

  // Load saved chat
  useEffect(() => {
    let initialCount = 1;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setMessages(parsed);
        initialCount = parsed.length;
      } else {
        // Initial welcome message from seller
        const initial: ChatMessage = {
          id: "welcome-1",
          sender: "seller",
          text: `Hello ${currentUser.name || "there"}! Thanks for your interest in "${listing.title}". Feel free to ask questions or make a price offer!`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages([initial]);
        localStorage.setItem(storageKey, JSON.stringify([initial]));
        initialCount = 1;
      }

      // Record in conversation list
      const convListRaw = localStorage.getItem("sq_conversations_list");
      let convList: any[] = convListRaw ? JSON.parse(convListRaw) : [];
      const existingIdx = convList.findIndex((c) => c.listingId === listing.id);
      const convItem = {
        listingId: listing.id,
        listingTitle: listing.title,
        listingPrice: listing.price,
        listingImage: displayImage,
        sellerName: listing.seller?.name || "Seller",
        messageCount: initialCount,
        lastUpdated: new Date().toISOString(),
      };
      if (existingIdx >= 0) {
        convList[existingIdx] = { ...convList[existingIdx], ...convItem };
      } else {
        convList.unshift(convItem);
      }
      localStorage.setItem("sq_conversations_list", JSON.stringify(convList));
    } catch {
      // ignore
    }
  }, [listing.id, currentUser.id, listing.title, listing.price, displayImage, listing.seller?.name, currentUser.name, storageKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateConvCount = (newCount: number) => {
    try {
      const convListRaw = localStorage.getItem("sq_conversations_list");
      if (convListRaw) {
        const convList = JSON.parse(convListRaw);
        const idx = convList.findIndex((c: any) => c.listingId === listing.id);
        if (idx >= 0) {
          convList[idx].messageCount = newCount;
          convList[idx].lastUpdated = new Date().toISOString();
          localStorage.setItem("sq_conversations_list", JSON.stringify(convList));
        }
      }
    } catch {
      // ignore
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Read as Base64 dataUrl
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text && !selectedImage) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "me",
      text: text || "Sent an image",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      image: selectedImage || undefined,
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    setInputText("");
    setSelectedImage(null);
    updateConvCount(updated.length);

    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));

      // Record in notifications
      const notifsRaw = localStorage.getItem("sq_user_notifications");
      const notifs = notifsRaw ? JSON.parse(notifsRaw) : [];
      notifs.unshift({
        id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type: "message",
        title: `Message sent on "${listing.title}"`,
        senderName: "You",
        text: text || "Sent an attachment",
        listingId: listing.id,
        listingTitle: listing.title,
        createdAt: new Date().toISOString(),
        read: true,
      });
      localStorage.setItem("sq_user_notifications", JSON.stringify(notifs.slice(0, 30)));
      setTimeout(() => {
        window.dispatchEvent(new Event("sq_notifications_updated"));
      }, 0);
    } catch {
      // ignore
    }

    // Auto response from seller after 1.2 seconds if it's user message
    setTimeout(() => {
      let replyText = "Thank you! I am available. Where are you located so we can arrange a physical inspection?";
      const lower = text.toLowerCase();
      if (selectedImage) {
        replyText = "Thanks for the photo! The item looks great. When would you like to meet to inspect it?";
      } else if (lower.includes("available")) {
        replyText = "Yes, it is still available and ready for immediate pickup or delivery inspection!";
      } else if (lower.includes("price") || lower.includes("last")) {
        replyText = `The advertised price is ${formatNaira(listing.price)}. You can tap 'Make an Offer' above to send your proposal!`;
      } else if (lower.includes("meet") || lower.includes("location") || lower.includes("inspect")) {
        replyText = `We can meet in a safe public spot in ${listing.location || "Lagos"} during daylight hours.`;
      }

      const replyMsg: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        sender: "seller",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => {
        const next = [...prev, replyMsg];
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });

      updateConvCount(updated.length + 1);
      try {
        const notifsRaw = localStorage.getItem("sq_user_notifications");
        const notifs = notifsRaw ? JSON.parse(notifsRaw) : [];
        notifs.unshift({
          id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          type: "message",
          title: `New reply from ${listing.seller?.name || "Seller"}`,
          senderName: listing.seller?.name || "Seller",
          text: replyText,
          listingId: listing.id,
          listingTitle: listing.title,
          createdAt: new Date().toISOString(),
          read: false,
        });
        localStorage.setItem("sq_user_notifications", JSON.stringify(notifs.slice(0, 30)));
        setTimeout(() => {
          window.dispatchEvent(new Event("sq_notifications_updated"));
        }, 0);
      } catch {
        // ignore
      }
    }, 1200);
  };

  const handleUpdateOfferStatus = (msgId: string, status: "ACCEPTED" | "DECLINED") => {
    const updated = messages.map((m) => {
      if (m.id === msgId && m.offer) {
        return {
          ...m,
          offer: {
            ...m.offer,
            status,
          },
        };
      }
      return m;
    });

    const statusMsg: ChatMessage = {
      id: `sys-${Date.now()}`,
      sender: "seller",
      text: status === "ACCEPTED"
        ? `🎉 Offer accepted! Please proceed to schedule an in-person meeting in ${listing.location || "a public location"} to inspect and pay.`
        : "The offer was declined. Feel free to make another reasonable proposal.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const finalMessages = [...updated, statusMsg];
    setMessages(finalMessages);
    try {
      localStorage.setItem(storageKey, JSON.stringify(finalMessages));
      window.dispatchEvent(new Event("sq_conversations_updated"));
    } catch {
      // ignore
    }
  };

  const handleCreateInChatOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (offerInputAmount <= 0) return;

    const offerMsg: ChatMessage = {
      id: `offer-${Date.now()}`,
      sender: "me",
      text: offerNote ? `Offer proposed: ${formatNaira(offerInputAmount)}. "${offerNote}"` : `I would like to offer ${formatNaira(offerInputAmount)} for this item.`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      offer: {
        amount: offerInputAmount,
        listedPrice: listing.price,
        status: "PENDING",
        note: offerNote.trim() || undefined,
        createdAt: new Date().toISOString(),
      },
    };

    const updated = [...messages, offerMsg];
    setMessages(updated);
    setIsOfferModalOpen(false);
    setOfferNote("");
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      window.dispatchEvent(new Event("sq_conversations_updated"));
    } catch {
      // ignore
    }
  };

  const quickPrompts = [
    "Is this still available?",
    "What is your last price?",
    "Can I inspect it today?",
    "Is the price negotiable?",
  ];

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white" style={{ borderRadius: "24px" }}>
      {/* 1. TOP HEADER WITH SELLER INFO AND PRODUCT SUMMARY */}
      <div
        className="border-bottom d-flex align-items-center justify-content-between gap-3 flex-wrap flex-sm-nowrap"
        style={{
          backgroundColor: "#f8fafc",
          padding: "16px 24px",
          minHeight: "80px",
        }}
      >
        {/* Left: Back button + Avatar + Space + Name & replies */}
        <div className="d-flex align-items-center gap-3">
          <Link
            href="/messages"
            className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center bg-white shadow-2xs"
            style={{ width: "38px", height: "38px", fontSize: "16px" }}
            title="Back to all messages"
          >
            ←
          </Link>

          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm flex-shrink-0 position-relative overflow-hidden"
              style={{
                width: "46px",
                height: "46px",
                backgroundColor: "#10b981",
                fontSize: "18px",
                border: "2px solid #ffffff",
              }}
            >
              {listing.seller?.avatarUrl ? (
                <Image
                  src={listing.seller.avatarUrl}
                  alt={listing.seller.name || "Seller"}
                  fill
                  className="object-fit-cover"
                  sizes="46px"
                  referrerPolicy="no-referrer"
                />
              ) : (
                listing.seller?.name ? listing.seller.name[0].toUpperCase() : "S"
              )}
            </div>

            <div>
              <div className="d-flex align-items-center gap-2">
                <strong className="text-dark" style={{ fontSize: "15px" }}>
                  {listing.seller?.name || "Merchant"}
                </strong>
                <span
                  className="badge bg-success bg-opacity-10 text-success fw-semibold"
                  style={{ fontSize: "10.5px", padding: "2px 7px" }}
                >
                  Active now
                </span>
              </div>
              <div className="text-secondary small" style={{ fontSize: "12px" }}>
                Replies usually in under 1 hour
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product box + Make Offer button */}
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOfferModalOpen(true)}
            className="btn btn-sm d-inline-flex align-items-center gap-1.5 fw-bold px-3 py-2 rounded-pill shadow-2xs"
            style={{
              backgroundColor: "#fef3c7",
              color: "#92400e",
              border: "1px solid #fde68a",
              fontSize: "12.5px",
            }}
          >
            <Tag size={14} />
            <span>Make Offer</span>
          </button>

          <Link
            href={`/listing/${listing.id}`}
            className="d-flex align-items-center gap-2.5 text-decoration-none bg-white border shadow-2xs transition-all hover-shadow"
            style={{
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "8px 14px",
              maxWidth: "280px",
            }}
            title="Click to view listing details"
          >
            <div
              className="position-relative overflow-hidden flex-shrink-0"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#f1f5f9",
                borderRadius: "10px",
              }}
            >
              <Image
                src={displayImage}
                alt={listing.title}
                fill
                className="object-fit-cover"
                sizes="40px"
              />
            </div>
            <div className="overflow-hidden d-flex flex-column justify-content-center">
              <div
                className="text-dark text-truncate fw-medium"
                style={{ fontSize: "12.5px", lineHeight: "1.2" }}
              >
                {listing.title}
              </div>
              <div className="text-success fw-bold" style={{ fontSize: "13px" }}>
                {formatNaira(listing.price)}
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 2. CHAT MESSAGES BODY */}
      <div
        className="p-4 overflow-y-auto d-flex flex-column gap-3.5"
        style={{
          height: "540px",
          minHeight: "500px",
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="text-center my-1">
          <span
            className="badge text-secondary border bg-white px-3.5 py-1.5 rounded-pill shadow-2xs"
            style={{ fontSize: "11px", fontWeight: "normal" }}
          >
            🔒 Keep messages within SellQuickest for your safety and protection.
          </span>
        </div>

        {messages.map((m, idx) => {
          const isMe = m.sender === "me";
          const hasOffer = !!m.offer;

          return (
            <div
              key={m.id}
              className={`d-flex flex-column ${
                isMe ? "align-items-end" : "align-items-start"
              } ${idx > 0 ? "mt-2" : ""}`}
            >
              <div className={`d-flex align-items-end gap-2.5 ${isMe ? "flex-row-reverse" : "w-100"}`} style={{ maxWidth: "85%" }}>
                {!isMe && (
                  <div
                    className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0 shadow-2xs position-relative overflow-hidden mb-1"
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "#10b981",
                      fontSize: "13px",
                    }}
                  >
                    {listing.seller?.avatarUrl ? (
                      <Image
                        src={listing.seller.avatarUrl}
                        alt="Seller"
                        fill
                        className="object-fit-cover"
                        sizes="32px"
                      />
                    ) : (
                      listing.seller?.name ? listing.seller.name[0].toUpperCase() : "S"
                    )}
                  </div>
                )}

                <div className={`d-flex flex-column ${isMe ? "align-items-end" : "align-items-start"}`}>
                  {/* INTERACTIVE OFFER CARD BUBBLE */}
                  {hasOffer && m.offer ? (
                    <div
                      className="p-3 shadow-sm rounded-4 border mb-1"
                      style={{
                        backgroundColor: m.offer.status === "ACCEPTED" ? "#f0fdf4" : m.offer.status === "DECLINED" ? "#f8fafc" : "#fffbeb",
                        borderColor: m.offer.status === "ACCEPTED" ? "#86efac" : m.offer.status === "DECLINED" ? "#e2e8f0" : "#fde68a",
                        borderRadius: "18px",
                        maxWidth: "360px",
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-between gap-2 border-bottom pb-2 mb-2">
                        <div className="d-flex align-items-center gap-1.5">
                          <Tag size={16} color={m.offer.status === "ACCEPTED" ? "#16a34a" : "#b45309"} />
                          <span className="fw-bold" style={{ fontSize: "13px", color: m.offer.status === "ACCEPTED" ? "#166534" : "#92400e" }}>
                            PRICE OFFER
                          </span>
                        </div>
                        <span
                          className={`badge rounded-pill fw-bold ${
                            m.offer.status === "ACCEPTED"
                              ? "bg-success text-white"
                              : m.offer.status === "DECLINED"
                              ? "bg-secondary text-white"
                              : "bg-warning text-dark"
                          }`}
                          style={{ fontSize: "10.5px" }}
                        >
                          {m.offer.status}
                        </span>
                      </div>

                      <div className="d-flex align-items-baseline justify-content-between mb-1">
                        <span className="text-secondary small">Offered Amount:</span>
                        <span className="fw-bold text-dark" style={{ fontSize: "17px" }}>
                          {formatNaira(m.offer.amount)}
                        </span>
                      </div>

                      <div className="d-flex align-items-baseline justify-content-between mb-2">
                        <span className="text-muted" style={{ fontSize: "11px" }}>Listed Price:</span>
                        <span className="text-muted text-decoration-line-through" style={{ fontSize: "12px" }}>
                          {formatNaira(m.offer.listedPrice)}
                        </span>
                      </div>

                      {m.offer.note && (
                        <div className="p-2 rounded bg-white bg-opacity-75 small text-secondary mb-2" style={{ fontSize: "11.5px" }}>
                          &ldquo;{m.offer.note}&rdquo;
                        </div>
                      )}

                      {/* SELLER ACTION BUTTONS IF PENDING */}
                      {m.offer.status === "PENDING" && (
                        <div className="d-flex gap-2 pt-1 border-top">
                          <button
                            type="button"
                            onClick={() => handleUpdateOfferStatus(m.id, "ACCEPTED")}
                            className="btn btn-sm btn-success rounded-pill flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-1 py-1.5"
                            style={{ fontSize: "12px" }}
                          >
                            <Check size={14} /> Accept
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateOfferStatus(m.id, "DECLINED")}
                            className="btn btn-sm btn-light border rounded-pill flex-grow-1 fw-medium py-1.5"
                            style={{ fontSize: "12px" }}
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {/* ATTACHED IMAGE (IF PRESENT) */}
                  {m.image && (
                    <div
                      className="position-relative overflow-hidden mb-1 shadow-sm rounded-4 cursor-pointer"
                      style={{
                        width: "220px",
                        height: "170px",
                        borderRadius: "16px",
                        border: "1px solid rgba(0,0,0,0.06)",
                        cursor: "pointer",
                      }}
                      onClick={() => setLightboxImage(m.image || null)}
                    >
                      <Image
                        src={m.image}
                        alt="Photo attachment"
                        fill
                        className="object-fit-cover"
                        sizes="220px"
                      />
                    </div>
                  )}

                  {/* STANDARD MESSAGE BUBBLE */}
                  {(!hasOffer || m.text) && (
                    <div
                      className="p-3 px-3.5 shadow-2xs"
                      style={{
                        borderRadius: isMe ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                        backgroundColor: isMe ? "#10b981" : "#ffffff",
                        color: isMe ? "#ffffff" : "#1e293b",
                        border: isMe ? "none" : "1px solid #e2e8f0",
                        fontSize: "14px",
                        lineHeight: "1.45",
                        boxShadow: isMe ? "0 3px 10px rgba(16, 185, 129, 0.18)" : "0 2px 8px rgba(15, 23, 42, 0.04)",
                      }}
                    >
                      {m.text}
                    </div>
                  )}

                  <span className="text-muted mt-1 px-1" style={{ fontSize: "10px" }}>
                    {m.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. QUICK SUGGESTION CHIPS */}
      <div
        className="border-top d-flex gap-2 overflow-x-auto"
        style={{
          backgroundColor: "#ffffff",
          padding: "12px 20px",
        }}
      >
        {quickPrompts.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => handleSendMessage(q)}
            className="btn btn-sm btn-white border rounded-pill text-nowrap shadow-2xs fw-medium"
            style={{
              fontSize: "12.5px",
              backgroundColor: "#ffffff",
              borderColor: "#cbd5e1",
              color: "#334155",
              padding: "6px 14px",
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* IMAGE PREVIEW DRAWER (IF USER SELECTED AN IMAGE) */}
      {selectedImage && (
        <div className="px-4 py-2 border-top bg-light d-flex align-items-center gap-3">
          <div
            className="position-relative overflow-hidden rounded-3 border shadow-2xs"
            style={{ width: "50px", height: "50px" }}
          >
            <Image src={selectedImage} alt="Selected attachment" fill className="object-fit-cover" sizes="50px" />
          </div>
          <span className="text-secondary small">Photo attachment ready</span>
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="btn btn-sm btn-light border rounded-circle p-1 ms-auto"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 4. MESSAGE INPUT FORM WITH PHOTO ATTACHMENT */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="bg-white border-top d-flex align-items-center gap-2.5 p-3 px-4"
        style={{ borderTop: "1px solid #e2e8f0" }}
      >
        {/* HIDDEN FILE INPUT FOR PHOTO UPLOADS */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="d-none"
          onChange={handleImageUpload}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center text-secondary shadow-2xs flex-shrink-0"
          style={{ width: "48px", height: "48px" }}
          title="Attach a photo"
        >
          <Paperclip size={18} />
        </button>

        <input
          type="text"
          className="form-control px-3.5 border flex-grow-1"
          placeholder="Type your message to seller..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            height: "48px",
            fontSize: "14px",
            borderRadius: "28px",
            borderColor: "#cbd5e1",
          }}
        />

        <button
          type="submit"
          className="btn btn-sq text-white px-4 fw-bold d-flex align-items-center gap-1.5 shadow-sm flex-shrink-0"
          disabled={!inputText.trim() && !selectedImage}
          style={{
            height: "48px",
            borderRadius: "28px",
            fontSize: "14px",
          }}
        >
          <span>Send</span>
          <span style={{ fontSize: "14px" }}>➤</span>
        </button>
      </form>

      {/* QUICK IN-CHAT MAKE OFFER MODAL */}
      {isOfferModalOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 1060,
          }}
          onClick={() => setIsOfferModalOpen(false)}
        >
          <div
            className="card border-0 shadow-lg bg-white overflow-hidden w-100"
            style={{ maxWidth: "420px", borderRadius: "24px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 px-4 bg-warning bg-opacity-15 border-bottom d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <Tag size={18} color="#b45309" />
                <h6 className="fw-bold mb-0 text-dark">Send Price Offer</h6>
              </div>
              <button
                type="button"
                onClick={() => setIsOfferModalOpen(false)}
                className="btn btn-link text-secondary p-0"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateInChatOffer} className="p-4">
              <div className="mb-3">
                <label className="form-label text-dark small fw-bold mb-1">
                  Your Offer Amount (₦)
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={offerInputAmount}
                  onChange={(e) => setOfferInputAmount(Number(e.target.value))}
                  className="form-control form-control-lg fw-bold text-success"
                  style={{ fontSize: "18px" }}
                />
                <div className="form-text small text-muted">
                  Listed Price: {formatNaira(listing.price)}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-dark small fw-bold mb-1">
                  Optional Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Can pick up today with cash"
                  value={offerNote}
                  onChange={(e) => setOfferNote(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="btn btn-light rounded-pill flex-grow-1 border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-warning rounded-pill flex-grow-1 fw-bold text-dark"
                >
                  Send Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX FOR ATTACHMENTS */}
      {lightboxImage && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(8px)",
            zIndex: 1080,
          }}
          onClick={() => setLightboxImage(null)}
        >
          <div className="position-relative" style={{ maxWidth: "90vw", maxHeight: "90vh" }}>
            <img
              src={lightboxImage}
              alt="Fullscreen attachment"
              style={{
                maxWidth: "100%",
                maxHeight: "85vh",
                borderRadius: "16px",
                objectFit: "contain",
              }}
            />
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2 p-1.5"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
