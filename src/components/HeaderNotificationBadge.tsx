"use client";

import { useEffect, useState } from "react";

export function HeaderNotificationBadge({
  type,
  initialCount = 0,
}: {
  type: "messages" | "notifications";
  initialCount?: number;
}) {
  const [unreadCount, setUnreadCount] = useState(initialCount);

  useEffect(() => {
    let isMounted = true;

    const updateCount = () => {
      // Defer to next tick to ensure no setState-in-render violations across components
      setTimeout(() => {
        if (!isMounted) return;
        try {
          if (type === "notifications") {
            const raw = localStorage.getItem("sq_user_notifications");
            if (raw) {
              const list = JSON.parse(raw);
              const count = Array.isArray(list)
                ? list.filter((n: any) => !n.read).length
                : 0;
              setUnreadCount(count);
            } else {
              setUnreadCount(initialCount);
            }
          } else if (type === "messages") {
            const raw = localStorage.getItem("sq_conversations_list");
            if (raw) {
              const list = JSON.parse(raw);
              // If user has unread notifications of type 'message'
              const notifsRaw = localStorage.getItem("sq_user_notifications");
              const notifs = notifsRaw ? JSON.parse(notifsRaw) : [];
              const msgNotifs = notifs.filter(
                (n: any) => n.type === "message" && !n.read
              );
              setUnreadCount(msgNotifs.length > 0 ? msgNotifs.length : list.length > 0 ? 1 : 0);
            } else {
              setUnreadCount(initialCount);
            }
          }
        } catch {
          // ignore
        }
      }, 0);
    };

    updateCount();
    window.addEventListener("sq_notifications_updated", updateCount);
    return () => {
      isMounted = false;
      window.removeEventListener("sq_notifications_updated", updateCount);
    };
  }, [type, initialCount]);

  if (unreadCount <= 0) return null;

  return (
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
  );
}
