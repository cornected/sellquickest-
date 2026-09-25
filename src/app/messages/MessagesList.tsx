"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatNaira } from "@/lib/format";

export function MessagesList() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sq_conversations_list");
      if (stored) {
        const parsed: any[] = JSON.parse(stored);
        // Enrich each conversation with message count from local chat storage
        const enriched = parsed.map((conv) => {
          let count = conv.messageCount || 0;
          try {
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              if (key && key.startsWith(`sq_chat_${conv.listingId}`)) {
                const chatData = JSON.parse(localStorage.getItem(key) || "[]");
                if (Array.isArray(chatData)) {
                  count = Math.max(count, chatData.length);
                }
              }
            }
          } catch {
            // ignore
          }
          return {
            ...conv,
            messageCount: count > 0 ? count : 1,
          };
        });
        setConversations(enriched);
      }
    } catch {
      // ignore
    } finally {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return (
      <div className="py-4 text-center text-muted">
        Loading conversations...
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
        <div
          className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: "72px",
            height: "72px",
            backgroundColor: "#ecfdf5",
            fontSize: "2rem",
          }}
        >
          💬
        </div>
        <h2 className="h5 fw-bold mb-2">No conversations yet</h2>
        <p className="text-muted mx-auto mb-4" style={{ maxWidth: "420px", fontSize: "0.95rem" }}>
          When you click &quot;Live Chat&quot; on any ad listing, your chats and seller conversations will appear here.
        </p>
        <div>
          <Link href="/" className="btn btn-sq text-white fw-semibold px-4 py-2 rounded-pill">
            Explore Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-4">
      {conversations.map((conv, idx) => (
        <div
          key={conv.listingId}
          className={`card border-0 shadow-sm bg-white d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 hover-shadow transition-all ${
            idx > 0 ? "mt-1" : ""
          }`}
          style={{
            borderRadius: "26px",
            padding: "24px 28px",
          }}
        >
          {/* LEFT: Profile / Listing Picture and text details with generous spacing */}
          <div className="d-flex align-items-center gap-4 overflow-hidden my-auto">
            <div
              className="position-relative overflow-hidden flex-shrink-0 shadow-2xs"
              style={{
                width: "78px",
                height: "78px",
                backgroundColor: "#f1f5f9",
                borderRadius: "20px",
                border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              <Image
                src={conv.listingImage || "/placeholder.png"}
                alt={conv.listingTitle || "Ad"}
                fill
                className="object-fit-cover"
                sizes="78px"
              />
            </div>

            {/* TEXT DETAILS WITH PROPER MARGIN FROM PICTURE */}
            <div className="overflow-hidden d-flex flex-column justify-content-center py-1 ps-2">
              <div className="d-flex align-items-center gap-2 mb-1.5 flex-wrap">
                <strong className="text-dark" style={{ fontSize: "16px" }}>
                  {conv.sellerName}
                </strong>
                <span
                  className="badge bg-success bg-opacity-10 text-success fw-semibold"
                  style={{ fontSize: "11px", padding: "3px 8px" }}
                >
                  Active
                </span>
              </div>
              <div
                className="text-muted text-truncate mb-1.5"
                style={{ fontSize: "13.5px", maxWidth: "440px" }}
                title={conv.listingTitle}
              >
                {conv.listingTitle}
              </div>
              <div className="text-success fw-bold" style={{ fontSize: "15px" }}>
                {formatNaira(conv.listingPrice || 0)}
              </div>
            </div>
          </div>

          {/* RIGHT: Message counter badge & Open Chat button */}
          <div className="d-flex align-items-center gap-3 ms-auto ms-sm-0 my-auto pt-2 pt-sm-0">
            {/* Live Message Counter */}
            <span
              className="badge bg-success bg-opacity-10 text-success d-flex align-items-center gap-1.5 px-3 py-2"
              style={{
                borderRadius: "30px",
                fontSize: "12px",
                fontWeight: 600,
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}
              title={`${conv.messageCount} messages in this conversation`}
            >
              <span>💬</span>
              <span>
                {conv.messageCount} {conv.messageCount === 1 ? "chat" : "chats"}
              </span>
            </span>

            {/* Elevated, rounder Open Chat Button */}
            <Link
              href={`/messages/chat?listingId=${conv.listingId}`}
              className="btn btn-sq text-white px-4 py-2.5 fw-semibold text-nowrap shadow-sm d-inline-flex align-items-center justify-content-center"
              style={{
                borderRadius: "36px",
                fontSize: "13.5px",
                minHeight: "44px",
                paddingLeft: "22px",
                paddingRight: "22px",
                transition: "all 0.15s ease",
              }}
            >
              Open Chat →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
