"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatNaira } from "@/lib/format";

interface ChatMessage {
  id: string;
  sender: "me" | "seller";
  text: string;
  time: string;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          text: `Hello ${currentUser.name || "there"}! Thanks for your interest in "${listing.title}". How can I help you today?`,
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

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "me",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    setInputText("");
    updateConvCount(updated.length);

    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));

      // Record in notifications
      const notifsRaw = localStorage.getItem("sq_user_notifications");
      const notifs = notifsRaw ? JSON.parse(notifsRaw) : [];
      const notifId = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      notifs.unshift({
        id: notifId,
        type: "message",
        title: `Message sent on "${listing.title}"`,
        senderName: "You",
        text: text,
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
      if (lower.includes("available")) {
        replyText = "Yes, it is still available and ready for immediate pickup or delivery inspection!";
      } else if (lower.includes("price") || lower.includes("last")) {
        replyText = `The advertised price is ${formatNaira(listing.price)}. Make me a serious close offer and we can talk!`;
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

      // Side-effects performed outside React state updater:
      updateConvCount(updated.length + 1);
      try {
        const notifsRaw = localStorage.getItem("sq_user_notifications");
        const notifs = notifsRaw ? JSON.parse(notifsRaw) : [];
        const replyNotifId = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        notifs.unshift({
          id: replyNotifId,
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

  const quickPrompts = [
    "Is this still available?",
    "What is your last price?",
    "Can I inspect it today?",
    "Is the price negotiable?",
  ];

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white" style={{ borderRadius: "24px" }}>
      {/* 1. TOP HEADER WITH SELLER INFO AND PRODUCT SUMMARY WITH GENEROUS BREATHING ROOM */}
      <div
        className="border-bottom d-flex align-items-center justify-content-between gap-3 flex-wrap flex-sm-nowrap"
        style={{
          backgroundColor: "#f8fafc",
          padding: "20px 24px",
          minHeight: "86px",
        }}
      >
        {/* Left: Back button + Avatar + Space + Name & replies */}
        <div className="d-flex align-items-center gap-3">
          <Link
            href="/messages"
            className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center bg-white shadow-2xs"
            style={{ width: "40px", height: "40px", fontSize: "16px" }}
            title="Back to all messages"
          >
            ←
          </Link>

          {/* Profile Display with clear spacing separation */}
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm flex-shrink-0"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#10b981",
                fontSize: "19px",
                border: "2px solid #ffffff",
                boxShadow: "0 2px 8px rgba(16, 185, 129, 0.25)",
              }}
            >
              {listing.seller?.name ? listing.seller.name[0].toUpperCase() : "S"}
            </div>

            {/* Generous margin/gap after avatar so text is not joined/cramped */}
            <div className="ps-1">
              <div className="d-flex align-items-center gap-2">
                <strong className="text-dark" style={{ fontSize: "15px" }}>
                  {listing.seller?.name || "Merchant"}
                </strong>
                <span
                  className="badge bg-success bg-opacity-10 text-success fw-semibold"
                  style={{ fontSize: "11px", padding: "3px 8px" }}
                >
                  Active now
                </span>
              </div>
              <div className="text-secondary small mt-0.5" style={{ fontSize: "12px" }}>
                Replies usually in under 1 hour
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product box with extra space at the top and bottom so it is never choked */}
        <div className="my-auto">
          <Link
            href={`/listing/${listing.id}`}
            className="d-flex align-items-center gap-3 text-decoration-none bg-white border shadow-2xs transition-all hover-shadow"
            style={{
              maxWidth: "310px",
              borderRadius: "18px",
              border: "1px solid #e2e8f0",
              padding: "12px 18px",
            }}
            title="Click to view listing details"
          >
            <div
              className="position-relative overflow-hidden flex-shrink-0"
              style={{
                width: "46px",
                height: "46px",
                backgroundColor: "#f1f5f9",
                borderRadius: "12px",
              }}
            >
              <Image
                src={displayImage}
                alt={listing.title}
                fill
                className="object-fit-cover"
                sizes="46px"
              />
            </div>
            <div className="overflow-hidden d-flex flex-column justify-content-center py-0.5">
              <div
                className="text-dark text-truncate fw-medium mb-1"
                style={{ fontSize: "13px", lineHeight: "1.3" }}
                title={listing.title}
              >
                {listing.title}
              </div>
              <div className="text-success fw-bold" style={{ fontSize: "14px", lineHeight: "1.2" }}>
                {formatNaira(listing.price)}
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 2. CHAT MESSAGES BODY - ENLARGED / BIGGER CHAT AREA */}
      <div
        className="p-4 overflow-y-auto d-flex flex-column gap-3.5"
        style={{
          height: "560px",
          minHeight: "520px",
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="text-center my-2">
          <span
            className="badge text-secondary border bg-white px-3.5 py-2 rounded-pill shadow-2xs"
            style={{ fontSize: "11px", fontWeight: "normal" }}
          >
            🔒 Keep messages within SellQuickest for your safety and protection.
          </span>
        </div>

        {messages.map((m) => {
          const isMe = m.sender === "me";
          return (
            <div
              key={m.id}
              className={`d-flex flex-column ${
                isMe ? "align-items-end" : "align-items-start"
              }`}
            >
              <div
                className="p-3 px-3.5 shadow-2xs"
                style={{
                  maxWidth: "75%",
                  borderRadius: isMe
                    ? "20px 20px 4px 20px"
                    : "20px 20px 20px 4px",
                  backgroundColor: isMe ? "#10b981" : "#ffffff",
                  color: isMe ? "#ffffff" : "#1e293b",
                  border: isMe ? "none" : "1px solid #e2e8f0",
                  fontSize: "14.5px",
                  lineHeight: "1.5",
                  boxShadow: isMe
                    ? "0 3px 10px rgba(16, 185, 129, 0.18)"
                    : "0 2px 8px rgba(15, 23, 42, 0.04)",
                }}
              >
                {m.text}
              </div>
              <span
                className="text-muted mt-1 px-1.5"
                style={{ fontSize: "10.5px" }}
              >
                {m.time}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. QUICK SUGGESTION CHIPS - ENLARGED TOP AND BOTTOM SPACING */}
      <div
        className="border-top d-flex gap-2.5 overflow-x-auto"
        style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e2e8f0",
          padding: "18px 24px",
        }}
      >
        {quickPrompts.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => handleSendMessage(q)}
            className="btn btn-sm btn-white border rounded-pill text-nowrap shadow-2xs fw-medium"
            style={{
              fontSize: "13px",
              backgroundColor: "#ffffff",
              borderColor: "#cbd5e1",
              color: "#334155",
              padding: "10px 20px",
              transition: "all 0.15s ease",
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* 4. ENLARGED MESSAGE INPUT FORM WITH GENEROUS TOP & BOTTOM PADDING */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="bg-white border-top d-flex align-items-center gap-3"
        style={{
          borderTop: "1px solid #e2e8f0",
          padding: "24px 24px 28px 24px",
        }}
      >
        <input
          type="text"
          className="form-control px-4 border"
          placeholder="Type your message to the seller..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            height: "54px",
            fontSize: "15px",
            borderRadius: "32px",
            borderColor: "#cbd5e1",
          }}
        />
        <button
          type="submit"
          className="btn btn-sq text-white px-4 fw-bold d-flex align-items-center gap-2 shadow-sm flex-shrink-0"
          disabled={!inputText.trim()}
          style={{
            height: "54px",
            borderRadius: "32px",
            fontSize: "15px",
            paddingLeft: "26px",
            paddingRight: "26px",
          }}
        >
          <span>Send</span>
          <span style={{ fontSize: "16px" }}>➤</span>
        </button>
      </form>
    </div>
  );
}
