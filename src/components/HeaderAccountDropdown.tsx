"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderAccountDropdownProps {
  userName: string;
  userEmail?: string | null;
  userAvatar?: string | null;
}

export function HeaderAccountDropdown({
  userName,
  userEmail,
  userAvatar,
}: HeaderAccountDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={dropdownRef}
      className={`dropdown position-relative ${isOpen ? "show" : ""}`}
    >
      <button
        className="nav-pill-item text-center dropdown-toggle border-0 bg-transparent d-flex align-items-center gap-1.5"
        type="button"
        id="accountMenuButton"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {userAvatar ? (
          <div
            className="position-relative rounded-circle overflow-hidden flex-shrink-0 border border-success"
            style={{ width: "24px", height: "24px" }}
          >
            <Image
              src={userAvatar}
              alt={userName}
              fill
              className="object-fit-cover"
              sizes="24px"
            />
          </div>
        ) : (
          <span className="nav-icon-placeholder">👤</span>
        )}
        <span className="d-none d-sm-inline">{userName}</span>
      </button>

      <ul
        className={`dropdown-menu account-dropdown-menu shadow-sm ${
          isOpen ? "show" : ""
        }`}
        aria-labelledby="accountMenuButton"
        style={{
          display: isOpen ? "block" : undefined,
          visibility: isOpen ? "visible" : undefined,
          opacity: isOpen ? 1 : undefined,
          transform: isOpen ? "translateY(0)" : undefined,
        }}
      >
        <li
          className="px-3 py-2 text-muted border-bottom mb-1 d-flex align-items-center gap-2.5"
          style={{ fontSize: "0.75rem" }}
        >
          {userAvatar ? (
            <div
              className="position-relative rounded-circle overflow-hidden flex-shrink-0"
              style={{ width: "36px", height: "36px" }}
            >
              <Image
                src={userAvatar}
                alt={userName}
                fill
                className="object-fit-cover"
                sizes="36px"
              />
            </div>
          ) : (
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#10b981",
                fontSize: "14px",
              }}
            >
              {userName ? userName[0].toUpperCase() : "U"}
            </div>
          )}

          <div className="overflow-hidden">
            <span className="d-block text-dark fw-bold text-truncate" style={{ fontSize: "13px" }}>
              {userName}
            </span>
            <span className="text-secondary text-truncate d-block" style={{ fontSize: "11px" }}>
              {userEmail || "User"}
            </span>
          </div>
        </li>
        <li>
          <Link
            href="/my-ads"
            className="dropdown-item account-dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <span>📦</span> My Ads
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className="dropdown-item account-dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <span>ℹ️</span> My Profile
          </Link>
        </li>
        <li>
          <Link
            href="/saved"
            className="dropdown-item account-dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <span>❤️</span> Liked Ads
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="dropdown-item account-dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <span>⚙️</span> Account Settings
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link
            href="/api/auth/logout"
            className="dropdown-item account-dropdown-item text-danger"
            onClick={() => setIsOpen(false)}
          >
            <span>🚪</span> Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
}
