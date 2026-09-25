"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare, MessageCircle, ArrowRight } from "lucide-react";
import { formatNaira } from "@/lib/format";

interface ConversationItem {
  listingId: string;
  listingTitle: string;
  listingPrice: number;
  listingImage: string;
  sellerName: string;
  messageCount?: number;
  lastUpdated?: string;
}

export function HeaderChatDropdown({
  initialCount = 0,
}: {
  initialCount?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadConversations = () => {
    try {
      const convRaw = localStorage.getItem("sq_conversations_list");
      if (convRaw) {
        const list = JSON.parse(convRaw);
        if (Array.isArray(list)) {
          setConversations(list.slice(0, 5));
          return;
        }
      }
      setConversations([]);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadConversations();

    const handler = () => {
      loadConversations();
    };

    window.addEventListener("sq_conversations_updated", handler);
    return () => window.removeEventListener("sq_conversations_updated", handler);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const displayCount = conversations.length > 0 ? conversations.length : initialCount;

  return (
    <div
      ref={dropdownRef}
      className={`dropdown position-relative ${isOpen ? "show" : ""}`}
      onMouseEnter={() => loadConversations()}
    >
      <style>{`
        .chat-toast-card {
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.22s ease;
          cursor: pointer;
        }
        .chat-toast-card:hover {
          transform: translateY(-2px) scale(1.012);
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.09), 0 2px 6px rgba(0, 0, 0, 0.04) !important;
        }
        .chat-toast-card:hover .chat-icon-box {
          transform: scale(1.06);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }
        .chat-toast-card:hover .chat-arrow-btn {
          color: #10b981 !important;
          background-color: rgba(16, 185, 129, 0.12) !important;
          transform: translateX(2px);
        }
      `}</style>

      {/* 1. CHAT TRIGGER BUTTON */}
      <Link
        href="/messages"
        className="nav-pill-item text-center position-relative text-decoration-none dropdown-toggle border-0 bg-transparent d-flex flex-column align-items-center"
        id="chatMenuButton"
        aria-expanded={isOpen}
        onClick={(e) => {
          if (typeof window !== "undefined" && window.innerWidth < 768 && !isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <span className="nav-icon-placeholder">💬</span>
        <span className="d-none d-sm-inline">Chat</span>

        {/* UNREAD CHAT BADGE */}
        {displayCount > 0 && (
          <span
            className="position-absolute shadow-sm"
            style={{
              top: "2px",
              right: "12px",
              backgroundColor: "#10b981",
              borderRadius: "50%",
              width: "9px",
              height: "9px",
              display: "block",
              border: "1.5px solid #ffffff",
            }}
            title={`${displayCount} active conversation`}
          />
        )}
      </Link>

      {/* 2. CHAT DROPDOWN MENU MATCHING ALERT TOAST STYLE */}
      <div
        className={`dropdown-menu chat-dropdown-menu shadow-lg p-0 ${
          isOpen ? "show" : ""
        }`}
        aria-labelledby="chatMenuButton"
        style={{
          display: isOpen ? "block" : undefined,
          visibility: isOpen ? "visible" : undefined,
          opacity: isOpen ? 1 : undefined,
          transform: isOpen ? "translateX(-50%) translateY(0)" : undefined,
          backgroundColor: "#f8fafc",
          borderRadius: "24px",
          border: "1px solid rgba(15, 23, 42, 0.08)",
          boxShadow: "0 20px 48px rgba(15, 23, 42, 0.12)",
        }}
      >
        {/* HEADER */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white rounded-top-4">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold text-dark" style={{ fontSize: "14px" }}>
              Messages & Chats
            </span>
            {displayCount > 0 && (
              <span
                className="badge bg-success bg-opacity-15 text-success rounded-pill fw-semibold"
                style={{ fontSize: "10.5px", padding: "3px 8px" }}
              >
                {displayCount} active
              </span>
            )}
          </div>
          <Link
            href="/messages"
            onClick={() => setIsOpen(false)}
            className="text-decoration-none small text-success fw-semibold"
            style={{ fontSize: "12px" }}
          >
            Open Inbox →
          </Link>
        </div>

        {/* CONVERSATIONS STREAM: FLOATING TOAST CARDS */}
        <div
          className="p-3 d-flex flex-column gap-3 overflow-y-auto"
          style={{ maxHeight: "390px" }}
        >
          {conversations.length === 0 ? (
            <div
              className="text-center py-4 px-3 bg-white"
              style={{
                borderRadius: "18px",
                border: "1px dashed rgba(15, 23, 42, 0.12)",
              }}
            >
              <div
                className="mx-auto mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  backgroundColor: "#ecfdf5",
                  boxShadow: "0 2px 8px rgba(16, 185, 129, 0.12)",
                }}
              >
                <MessageSquare size={22} color="#10b981" />
              </div>
              <div className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                No chats yet
              </div>
              <div className="text-secondary small mt-0.5" style={{ fontSize: "12px" }}>
                Click &quot;Live Chat&quot; on any ad to message a seller.
              </div>
            </div>
          ) : (
            conversations.map((c, idx) => (
              <Link
                key={`chat-toast-${c.listingId}-${idx}`}
                href={`/messages/chat?listingId=${c.listingId}`}
                onClick={() => setIsOpen(false)}
                className="chat-toast-card position-relative overflow-hidden text-decoration-none d-block"
                style={{
                  backgroundColor: "#ffffff",
                  backgroundImage: "linear-gradient(to right, rgba(220, 252, 231, 0.75) 0%, rgba(255, 255, 255, 0) 42%)",
                  borderRadius: "18px",
                  border: "1px solid rgba(34, 197, 94, 0.18)",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
                  padding: "16px 18px",
                }}
              >
                {/* PERFECTLY CENTRALIZED ROW: ICON/THUMBNAIL - TEXT - ACTION ARROW */}
                <div className="d-flex align-items-center gap-3 w-100">
                  {/* SQUIRCLE THUMBNAIL CONTAINER - 100% VERTICALLY CENTRALIZED */}
                  <div
                    className="chat-icon-box d-flex align-items-center justify-content-center flex-shrink-0 position-relative overflow-hidden"
                    style={{
                      width: "42px",
                      height: "42px",
                      minWidth: "42px",
                      minHeight: "42px",
                      borderRadius: "14px",
                      backgroundColor: "#ffffff",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                      border: "1px solid rgba(0, 0, 0, 0.04)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                  >
                    {c.listingImage ? (
                      <Image
                        src={c.listingImage}
                        alt={c.listingTitle || "Ad"}
                        fill
                        className="object-fit-cover"
                        sizes="42px"
                      />
                    ) : (
                      <MessageCircle size={20} color="#16a34a" strokeWidth={2.2} />
                    )}
                  </div>

                  {/* CONTENT DETAILS - 100% VERTICALLY CENTRALIZED */}
                  <div className="flex-grow-1 overflow-hidden pe-1 d-flex flex-column justify-content-center">
                    <div className="d-flex align-items-center justify-content-between gap-1 mb-0.5">
                      <strong
                        className="fw-bold text-truncate"
                        style={{
                          fontSize: "13.5px",
                          color: "#0f172a",
                          letterSpacing: "-0.2px",
                          lineHeight: "1.25",
                        }}
                      >
                        {c.sellerName}
                      </strong>
                      <span
                        className="text-success fw-semibold flex-shrink-0 ms-1"
                        style={{ fontSize: "11.5px" }}
                      >
                        {formatNaira(c.listingPrice || 0)}
                      </span>
                    </div>
                    <div
                      className="text-truncate"
                      style={{
                        fontSize: "12.5px",
                        color: "#64748b",
                        lineHeight: "1.35",
                      }}
                    >
                      {c.listingTitle}
                    </div>
                  </div>

                  {/* ACTION INDICATOR - 100% VERTICALLY CENTRALIZED */}
                  <div
                    className="chat-arrow-btn d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      color: "#94a3b8",
                      width: "26px",
                      height: "26px",
                      minWidth: "26px",
                      minHeight: "26px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(241, 245, 249, 0.8)",
                      transition: "color 0.15s ease, background-color 0.15s ease, transform 0.15s ease",
                    }}
                    title="Open chat"
                  >
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="p-3 text-center border-top bg-white rounded-bottom-4">
          <Link
            href="/messages"
            onClick={() => setIsOpen(false)}
            className="text-decoration-none fw-semibold d-inline-flex align-items-center gap-1.5"
            style={{ fontSize: "12.5px", color: "#10b981" }}
          >
            <span>View all conversations in Inbox</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
