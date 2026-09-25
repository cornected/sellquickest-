"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { timeAgo } from "@/lib/format";

export function NotificationsClient() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sq_user_notifications");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const seen = new Set<string>();
          const deduped: any[] = [];
          let hadDuplicates = false;
          for (let i = 0; i < parsed.length; i++) {
            const item = parsed[i];
            const baseId = item?.id ? String(item.id) : `notif-${i}`;
            let uniqueId = baseId;
            let counter = 1;
            while (seen.has(uniqueId)) {
              hadDuplicates = true;
              uniqueId = `${baseId}-${counter++}`;
            }
            seen.add(uniqueId);
            deduped.push({ ...item, id: uniqueId });
          }
          if (hadDuplicates) {
            localStorage.setItem("sq_user_notifications", JSON.stringify(deduped));
          }
          setNotifications(deduped);
        }
      }
    } catch {
      // ignore
    } finally {
      setLoaded(true);
    }
  }, []);

  const markAllAsRead = () => {
    try {
      const updated = notifications.map((n) => ({ ...n, read: true }));
      setNotifications(updated);
      localStorage.setItem("sq_user_notifications", JSON.stringify(updated));
      window.dispatchEvent(new Event("sq_notifications_updated"));
    } catch {
      // ignore
    }
  };

  const clearAll = () => {
    if (confirm("Clear all notifications?")) {
      setNotifications([]);
      localStorage.removeItem("sq_user_notifications");
      window.dispatchEvent(new Event("sq_notifications_updated"));
    }
  };

  if (!loaded) {
    return (
      <div className="py-4 text-center text-muted">
        Loading notifications...
      </div>
    );
  }

  if (notifications.length === 0) {
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
          🔔
        </div>
        <h2 className="h5 fw-bold mb-2">You are all caught up!</h2>
        <p
          className="text-muted mx-auto mb-4"
          style={{ maxWidth: "420px", fontSize: "0.95rem" }}
        >
          You don&apos;t have any unread notifications right now. Check back when buyers or sellers interact with your listings.
        </p>
        <div>
          <Link
            href="/my-ads"
            className="btn btn-sq text-white fw-semibold px-4 py-2 rounded-pill shadow-sm"
          >
            Manage My Ads
          </Link>
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-secondary small">
          <strong>{notifications.length}</strong> total {notifications.length === 1 ? "alert" : "alerts"}{" "}
          {unreadCount > 0 && `(${unreadCount} unread)`}
        </span>
        <div className="d-flex gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="btn btn-light btn-sm rounded-pill px-3 border"
              style={{ fontSize: "12px" }}
            >
              Mark all as read
            </button>
          )}
          <button
            onClick={clearAll}
            className="btn btn-outline-danger btn-sm rounded-pill px-3"
            style={{ fontSize: "12px" }}
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="d-flex flex-column gap-4">
        {notifications.map((notif, idx) => (
          <div
            key={`client-notif-${notif.id || 'notif'}-${idx}`}
            className={`card border-0 shadow-sm bg-white d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3.5 transition-all hover-shadow ${
              !notif.read ? "border-start border-4 border-success" : ""
            }`}
            style={{
              borderRadius: "22px",
              padding: "20px 24px",
              backgroundColor: notif.read ? "#ffffff" : "#f0fdf4",
            }}
          >
            {/* Left: Icon and notification message details with generous spacing */}
            <div className="d-flex align-items-start gap-3.5 overflow-hidden">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-2xs mt-0.5"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: notif.read ? "#f1f5f9" : "#dcfce7",
                  fontSize: "20px",
                  border: "2px solid #ffffff",
                }}
              >
                💬
              </div>

              {/* Message text with breathing space between lines */}
              <div className="overflow-hidden ps-1">
                <div className="d-flex align-items-center gap-2 mb-1.5 flex-wrap">
                  <strong className="text-dark" style={{ fontSize: "15px" }}>
                    {notif.title}
                  </strong>
                  {!notif.read && (
                    <span
                      className="badge bg-danger rounded-pill fw-semibold"
                      style={{ fontSize: "10px", padding: "3px 8px" }}
                    >
                      NEW
                    </span>
                  )}
                  <span className="text-muted small" style={{ fontSize: "12px" }}>
                    • {timeAgo(notif.createdAt)}
                  </span>
                </div>

                <p
                  className="text-secondary mb-2 small text-truncate"
                  style={{ maxWidth: "520px", fontSize: "13.5px", lineHeight: "1.4" }}
                >
                  &ldquo;{notif.text}&rdquo;
                </p>

                {notif.listingTitle && (
                  <div className="mt-1">
                    <span
                      className="badge bg-light text-secondary border fw-normal"
                      style={{ fontSize: "11.5px", padding: "4px 10px", borderRadius: "8px" }}
                    >
                      Ad: {notif.listingTitle}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Action button */}
            {notif.listingId && (
              <div className="ms-auto ms-sm-0 pt-2 pt-sm-0 flex-shrink-0 ps-sm-3">
                <Link
                  href={`/messages/chat?listingId=${notif.listingId}`}
                  className="btn btn-sm btn-sq text-white rounded-pill px-3.5 py-2 fw-semibold text-nowrap shadow-sm"
                  style={{ fontSize: "12.5px" }}
                >
                  Open Chat →
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
