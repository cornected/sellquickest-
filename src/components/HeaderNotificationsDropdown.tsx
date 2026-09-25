"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Info, CheckCircle2, AlertTriangle, MessageCircle, Bell, ArrowRight } from "lucide-react";
import { timeAgo } from "@/lib/format";

interface NotificationItem {
  id: string;
  title: string;
  text: string;
  type?: "info" | "success" | "warning" | "error" | "message";
  listingTitle?: string;
  listingId?: string;
  createdAt?: string;
  read?: boolean;
}

export function HeaderNotificationsDropdown({
  initialCount = 0,
}: {
  initialCount?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(initialCount);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadNotifications = () => {
    try {
      const raw = localStorage.getItem("sq_user_notifications");
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list) && list.length > 0) {
          const seen = new Set<string>();
          const deduped: NotificationItem[] = [];
          let hadDuplicates = false;

          for (let i = 0; i < list.length; i++) {
            const item = list[i];
            const rawId = item?.id ? String(item.id) : `notif-${i}`;
            let uniqueId = rawId;
            let counter = 1;
            while (seen.has(uniqueId)) {
              hadDuplicates = true;
              uniqueId = `${rawId}-${counter++}`;
            }
            seen.add(uniqueId);
            deduped.push({ ...item, id: uniqueId });
          }

          if (hadDuplicates) {
            localStorage.setItem("sq_user_notifications", JSON.stringify(deduped));
          }

          setNotifications(deduped.slice(0, 5));
          const unread = deduped.filter((n) => !n.read).length;
          setUnreadCount(unread);
          return;
        }
      }

      // Check conversations list to populate recent activity
      const convRaw = localStorage.getItem("sq_conversations_list");
      if (convRaw) {
        const convList = JSON.parse(convRaw);
        if (Array.isArray(convList) && convList.length > 0) {
          const generated: NotificationItem[] = convList.slice(0, 4).map((c: any, i: number) => ({
            id: `conv-notif-${c.listingId || i}-${i}`,
            title: c.sellerName || "Seller message",
            text: `Conversation on "${c.listingTitle || "Ad"}"`,
            type: "message",
            listingTitle: c.listingTitle,
            listingId: c.listingId,
            createdAt: c.lastUpdated || new Date().toISOString(),
            read: true,
          }));
          setNotifications(generated);
          setUnreadCount(0);
          return;
        }
      }

      setNotifications([]);
      setUnreadCount(initialCount);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadNotifications();

    const handler = () => {
      loadNotifications();
    };

    window.addEventListener("sq_notifications_updated", handler);
    return () => window.removeEventListener("sq_notifications_updated", handler);
  }, [initialCount]);

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

  const markAllAsRead = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const raw = localStorage.getItem("sq_user_notifications");
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
          const updated = list.map((n: any) => ({ ...n, read: true }));
          localStorage.setItem("sq_user_notifications", JSON.stringify(updated));
          setNotifications(updated.slice(0, 5));
          setUnreadCount(0);
          window.dispatchEvent(new Event("sq_notifications_updated"));
        }
      }
    } catch {
      // ignore
    }
  };

  // Helper matching the exact card designs
  const getCardTheme = (item: NotificationItem) => {
    const text = (item.title + " " + (item.text || "")).toLowerCase();

    if (item.type === "error" || text.includes("error") || text.includes("reject") || text.includes("fraud") || text.includes("declined")) {
      return {
        glow: "linear-gradient(to right, rgba(254, 226, 226, 0.7) 0%, rgba(255, 255, 255, 0) 42%)",
        borderColor: "rgba(239, 68, 68, 0.16)",
        iconColor: "#ef4444",
        Icon: AlertTriangle,
      };
    }

    if (item.type === "warning" || text.includes("warning") || text.includes("expire") || text.includes("caution") || text.includes("attention")) {
      return {
        glow: "linear-gradient(to right, rgba(254, 243, 199, 0.75) 0%, rgba(255, 255, 255, 0) 42%)",
        borderColor: "rgba(245, 158, 11, 0.18)",
        iconColor: "#d97706",
        Icon: AlertTriangle,
      };
    }

    if (item.type === "info" || text.includes("info") || text.includes("update") || text.includes("views") || text.includes("policy")) {
      return {
        glow: "linear-gradient(to right, rgba(224, 242, 254, 0.75) 0%, rgba(255, 255, 255, 0) 42%)",
        borderColor: "rgba(14, 165, 233, 0.18)",
        iconColor: "#0284c7",
        Icon: Info,
      };
    }

    // Default: Success / Message (Green card)
    return {
      glow: "linear-gradient(to right, rgba(220, 252, 231, 0.75) 0%, rgba(255, 255, 255, 0) 42%)",
      borderColor: "rgba(34, 197, 94, 0.18)",
      iconColor: "#16a34a",
      Icon: text.includes("chat") || text.includes("reply") || text.includes("message") ? MessageCircle : CheckCircle2,
    };
  };

  return (
    <div
      ref={dropdownRef}
      className={`dropdown position-relative ${isOpen ? "show" : ""}`}
      onMouseEnter={() => loadNotifications()}
    >
      <style>{`
        .notif-toast-card {
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.22s ease;
          cursor: pointer;
        }
        .notif-toast-card:hover {
          transform: translateY(-2px) scale(1.012);
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.09), 0 2px 6px rgba(0, 0, 0, 0.04) !important;
        }
        .notif-toast-card:hover .notif-icon-box {
          transform: scale(1.06);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }
        .notif-toast-card:hover .notif-arrow-btn {
          color: #10b981 !important;
          background-color: rgba(16, 185, 129, 0.12) !important;
          transform: translateX(2px);
        }
      `}</style>

      {/* 1. NOTIFICATION TRIGGER BUTTON */}
      <Link
        href="/notifications"
        className="nav-pill-item text-center position-relative text-decoration-none dropdown-toggle border-0 bg-transparent d-flex flex-column align-items-center"
        id="notificationsMenuButton"
        aria-expanded={isOpen}
        onClick={(e) => {
          if (typeof window !== "undefined" && window.innerWidth < 768 && !isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <span className="nav-icon-placeholder">🔔</span>
        <span className="d-none d-sm-inline">Alerts</span>

        {/* UNREAD NOTIFICATION BADGE DOT */}
        {unreadCount > 0 && (
          <span
            className="position-absolute shadow-sm"
            style={{
              top: "2px",
              right: "12px",
              backgroundColor: "#ef4444",
              borderRadius: "50%",
              width: "9px",
              height: "9px",
              display: "block",
              border: "1.5px solid #ffffff",
            }}
            title={`${unreadCount} new update`}
          />
        )}
      </Link>

      {/* 2. ELEGANT TOAST-STYLE NOTIFICATION DROPDOWN MENU */}
      <div
        className={`dropdown-menu notification-dropdown-menu shadow-lg p-0 ${
          isOpen ? "show" : ""
        }`}
        aria-labelledby="notificationsMenuButton"
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
              Notifications & Alerts
            </span>
            {unreadCount > 0 && (
              <span
                className="badge bg-danger rounded-pill fw-semibold"
                style={{ fontSize: "10.5px", padding: "3px 8px" }}
              >
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="btn btn-link text-decoration-none p-0 small text-success fw-semibold"
              style={{ fontSize: "12px" }}
            >
              Mark all read
            </button>
          )}
        </div>

        {/* NOTIFICATIONS STREAM: FLOATING TOAST CARDS (EXACTLY MATCHING CHAT STYLE) */}
        <div
          className="p-3 d-flex flex-column gap-3 overflow-y-auto"
          style={{ maxHeight: "390px" }}
        >
          {notifications.length === 0 ? (
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
                <Bell size={22} color="#10b981" />
              </div>
              <div className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                All caught up!
              </div>
              <div className="text-secondary small mt-0.5" style={{ fontSize: "12px" }}>
                No active notifications or alerts.
              </div>
            </div>
          ) : (
            notifications.map((item, idx) => {
              const theme = getCardTheme(item);
              const targetUrl = item.listingId
                ? `/messages/chat?listingId=${item.listingId}`
                : "/notifications";

              return (
                <Link
                  key={`notif-toast-${item.id || 'item'}-${idx}`}
                  href={targetUrl}
                  onClick={() => setIsOpen(false)}
                  className="notif-toast-card position-relative overflow-hidden text-decoration-none d-block"
                  style={{
                    backgroundColor: "#ffffff",
                    backgroundImage: theme.glow,
                    borderRadius: "18px",
                    border: `1px solid ${theme.borderColor}`,
                    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
                    padding: "16px 18px",
                  }}
                >
                  {/* PERFECTLY CENTRALIZED ROW: SQUIRCLE ICON - TEXT - ACTION ARROW */}
                  <div className="d-flex align-items-center gap-3 w-100">
                    {/* SQUIRCLE ICON CONTAINER - 100% VERTICALLY CENTRALIZED */}
                    <div
                      className="notif-icon-box d-flex align-items-center justify-content-center flex-shrink-0"
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
                      <theme.Icon size={20} color={theme.iconColor} strokeWidth={2.2} />
                    </div>

                    {/* CONTENT DETAILS - 100% VERTICALLY CENTRALIZED */}
                    <div className="flex-grow-1 overflow-hidden pe-1 d-flex flex-column justify-content-center">
                      <div className="d-flex align-items-center justify-content-between gap-1 mb-0.5">
                        <div className="d-flex align-items-center gap-1.5 overflow-hidden">
                          {!item.read && (
                            <span
                              className="rounded-circle bg-danger flex-shrink-0"
                              style={{ width: "6px", height: "6px" }}
                            />
                          )}
                          <strong
                            className="fw-bold text-truncate"
                            style={{
                              fontSize: "13.5px",
                              color: "#0f172a",
                              letterSpacing: "-0.2px",
                              lineHeight: "1.25",
                            }}
                          >
                            {item.title}
                          </strong>
                        </div>
                        <span
                          className="text-muted flex-shrink-0 ms-1"
                          style={{ fontSize: "11px", fontWeight: 400 }}
                        >
                          {item.createdAt ? timeAgo(item.createdAt) : "recent"}
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
                        {item.text}
                      </div>
                    </div>

                    {/* ACTION INDICATOR - 100% VERTICALLY CENTRALIZED */}
                    <div
                      className="notif-arrow-btn d-flex align-items-center justify-content-center flex-shrink-0"
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
                      title="View notification"
                    >
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="p-3 text-center border-top bg-white rounded-bottom-4">
          <Link
            href="/notifications"
            onClick={() => setIsOpen(false)}
            className="text-decoration-none fw-semibold d-inline-flex align-items-center gap-1.5"
            style={{ fontSize: "12.5px", color: "#10b981" }}
          >
            <span>View all alerts & messages</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
