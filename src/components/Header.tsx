import Link from "next/link";
import { HeaderNotificationBadge } from "@/components/HeaderNotificationBadge";
import { HeaderAccountDropdown } from "@/components/HeaderAccountDropdown";

interface HeaderProps {
  session?: {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      avatarUrl?: string | null;
    } | null;
  } | null;
  unreadMessages?: number;
  unreadNotifications?: number;
}

export function Header({
  session,
  unreadMessages = 0,
  unreadNotifications = 0,
}: HeaderProps) {
  const isLoggedIn = !!session?.user;
  const userName = session?.user?.name || "Account";

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-nav-wrapper {
          padding-top: 1.5rem;
          padding-bottom: 1rem;
          background-color: #f8f9fa;
        }
        .pill-nav-container {
          background-color: #ffffff;
          border-radius: 50px;
          padding: 0.6rem 1.5rem 0.6rem 0.6rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0,0,0,0.03);
          max-width: 950px;
          margin: 0 auto;
        }
        .nav-logo-circle {
          background-color: #10b981;
          color: #ffffff;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 1.4rem;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
          transition: transform 0.2s ease;
        }
        .nav-logo-circle:hover {
          transform: scale(1.05);
          color: #ffffff;
        }
        .nav-pill-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #6b7280;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          transition: all 0.2s ease;
          position: relative;
          background: none;
          border: none;
        }
        .nav-pill-item .nav-icon-placeholder {
          font-size: 1.3rem;
          margin-bottom: 2px;
          transition: transform 0.2s ease;
        }
        .nav-pill-item:hover {
          color: #10b981;
        }
        .nav-pill-item:hover .nav-icon-placeholder {
          transform: translateY(-2px);
        }
        
        .dropdown-toggle::after {
          display: none !important;
        }

        /* 2 & 3. HOVER SPEED CONTROLS: Delayed appearance with opacity ease-in transition */
        .dropdown {
          position: relative;
        }
        .account-dropdown-menu {
          display: block !important;
          visibility: hidden;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          padding: 0.75rem 0;
          min-width: 220px;
          position: absolute;
          right: 0;
          top: 100%;
          z-index: 1000;
          background-color: #ffffff;
        }
        @media (min-width: 576px) {
          .dropdown:hover .account-dropdown-menu {
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
          }
        }
        .dropdown.show .account-dropdown-menu,
        .account-dropdown-menu.show {
          visibility: visible !important;
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .account-dropdown-item {
          padding: 0.6rem 1.2rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: #374151;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background-color 0.15s ease;
        }
        .account-dropdown-item:hover {
          background-color: #f3f4f6;
          color: #10b981;
        }
        .dropdown-divider {
          border-top: 1px solid #e5e7eb;
          margin: 0.5rem 0;
        }

        .notification-badge-dot {
          position: absolute;
          top: 1px;
          right: 8px;
          background-color: #ef4444;
          color: white;
          border-radius: 50%;
          width: 8px;
          height: 8px;
          display: block;
          border: 1px solid #ffffff;
        }
      `,
        }}
      />

      <div className="custom-nav-wrapper sticky-top">
        <div className="container">
          <div className="pill-nav-container d-flex align-items-center justify-content-between">
            <Link href="/" className="nav-logo-circle">
              SQ
            </Link>

            <div className="d-flex align-items-center gap-1 gap-sm-3">
              <Link href="/post" className="nav-pill-item text-center">
                <span className="nav-icon-placeholder">➕</span>
                <span className="d-none d-sm-inline">Post Ad</span>
              </Link>

              <Link href="/my-ads" className="nav-pill-item text-center">
                <span className="nav-icon-placeholder">💼</span>
                <span className="d-none d-sm-inline">My Ads</span>
              </Link>

              {isLoggedIn && (
                <Link href="/messages" className="nav-pill-item text-center position-relative">
                  <span className="nav-icon-placeholder">💬</span>
                  <span className="d-none d-sm-inline">Chat</span>
                  <HeaderNotificationBadge type="messages" initialCount={unreadMessages} />
                </Link>
              )}

              {isLoggedIn && (
                <Link
                  href="/notifications"
                  className="nav-pill-item text-center position-relative"
                >
                  <span className="nav-icon-placeholder">🔔</span>
                  <span className="d-none d-sm-inline">Alerts</span>
                  <HeaderNotificationBadge type="notifications" initialCount={unreadNotifications} />
                </Link>
              )}

              {isLoggedIn ? (
                <HeaderAccountDropdown
                  userName={userName}
                  userEmail={session?.user?.email}
                  userAvatar={session?.user?.avatarUrl}
                />
              ) : (
                <Link href="/login" className="nav-pill-item text-center">
                  <span className="nav-icon-placeholder">👤</span>
                  <span className="d-none d-sm-inline">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
