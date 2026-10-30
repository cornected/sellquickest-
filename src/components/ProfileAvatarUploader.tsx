"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProfileAvatarUploaderProps {
  initialAvatarUrl?: string | null;
  userId?: string;
  userName: string;
  userEmail: string;
}

function compressAvatarImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = String(e.target?.result || "");
      if (!file.type.startsWith("image/") || file.type.includes("svg")) {
        resolve(dataUrl);
        return;
      }
      const img = new window.Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          let { width, height } = img;
          const maxDim = 320;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(dataUrl);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", 0.84);
          resolve(compressed);
        } catch {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    };
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

function syncCachedListingsAvatar(userId: string | undefined, userEmail: string, nextAvatarUrl: string | null) {
  if (typeof window === "undefined") return;
  try {
    const postedRaw = localStorage.getItem("sq_my_posted_listings");
    if (postedRaw) {
      const parsed = JSON.parse(postedRaw);
      if (Array.isArray(parsed)) {
        const updated = parsed.map((item: any) => {
          const isMatch =
            (userId && (item?.sellerId === userId || item?.seller?.id === userId)) ||
            (userEmail &&
              String(item?.seller?.email || "").toLowerCase() === userEmail.toLowerCase());
          if (!isMatch) return item;
          return {
            ...item,
            seller: {
              ...(item.seller || {}),
              avatarUrl: nextAvatarUrl,
            },
          };
        });
        localStorage.setItem("sq_my_posted_listings", JSON.stringify(updated));
      }
    }
  } catch {}
  try {
    const latestRaw = sessionStorage.getItem("sq_latest_listing");
    if (latestRaw) {
      const item = JSON.parse(latestRaw);
      if (item && typeof item === "object") {
        sessionStorage.setItem(
          "sq_latest_listing",
          JSON.stringify({
            ...item,
            seller: {
              ...(item.seller || {}),
              avatarUrl: nextAvatarUrl,
            },
          })
        );
      }
    }
  } catch {}
}

export function ProfileAvatarUploader({
  initialAvatarUrl,
  userId,
  userName,
  userEmail,
}: ProfileAvatarUploaderProps) {
  const router = useRouter();
  const { user: authUser, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resolvedUserId = userId || authUser?.id || "";
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    initialAvatarUrl || authUser?.avatarUrl || null
  );
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "danger" } | null>(null);

  useEffect(() => {
    const candidate = initialAvatarUrl || authUser?.avatarUrl || null;
    if (candidate && !avatarUrl) {
      setAvatarUrl(candidate);
    }
  }, [initialAvatarUrl, authUser?.avatarUrl, avatarUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ text: "Please choose an image file (PNG, JPG, WEBP).", type: "danger" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ text: "File size exceeds 5MB. Please choose a smaller photo.", type: "danger" });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const compressedDataUrl = await compressAvatarImage(file);
      if (compressedDataUrl) {
        setAvatarUrl(compressedDataUrl);
      }

      const token = typeof window !== "undefined" ? localStorage.getItem("sq_token") || "" : "";
      const res = await fetch("/api/user/avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "x-session-token": token, Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          avatarUrl: compressedDataUrl,
          userId: resolvedUserId,
          userName,
          userEmail,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload photo.");
      }

      const savedAvatar = data.avatarUrl || compressedDataUrl;
      setAvatarUrl(savedAvatar);
      updateUser({ avatarUrl: savedAvatar });
      syncCachedListingsAvatar(resolvedUserId, userEmail, savedAvatar);
      setMessage({ text: "Profile image updated across your account & ads!", type: "success" });
      router.refresh();
    } catch (err: any) {
      setAvatarUrl(initialAvatarUrl || null);
      setMessage({ text: err.message || "Failed to upload photo.", type: "danger" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    setUploading(true);
    setMessage(null);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("sq_token") || "" : "";
      const res = await fetch("/api/user/avatar", {
        method: "DELETE",
        headers: token ? { "x-session-token": token, Authorization: `Bearer ${token}` } : undefined,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to remove photo.");
      }

      setAvatarUrl(null);
      updateUser({ avatarUrl: null });
      syncCachedListingsAvatar(resolvedUserId, userEmail, null);
      setMessage({ text: "Profile photo removed.", type: "success" });
      router.refresh();
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to remove photo.", type: "danger" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
      {/* AVATAR & USER INFO - STANDARDIZED SPACED ROW (GAP-4 / 24PX MATCHING STOREFRONT & LISTING) */}
      <div className="d-flex align-items-center gap-4">
        {/* AVATAR WRAPPER */}
        <div
          className="position-relative flex-shrink-0"
          style={{ width: "88px", height: "88px" }}
        >
          {avatarUrl ? (
            <div
              className="position-relative w-100 h-100 rounded-circle overflow-hidden shadow-sm border border-3 border-white"
              style={{ backgroundColor: "#f1f5f9" }}
            >
              <Image
                src={avatarUrl}
                alt={userName}
                fill
                className="object-fit-cover"
                sizes="88px"
              />
            </div>
          ) : (
            <div
              className="w-100 h-100 rounded-circle shadow-sm border border-3 border-white d-flex align-items-center justify-content-center text-white fw-bold"
              style={{
                backgroundColor: "#10b981",
                fontSize: "2.2rem",
                boxShadow: "0 6px 18px rgba(16, 185, 129, 0.25)",
              }}
            >
              {userName ? userName[0].toUpperCase() : "U"}
            </div>
          )}

          {/* Floating Camera Button - Inset to avoid protruding into adjacent elements */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn btn-sm btn-dark rounded-circle position-absolute bottom-0 end-0 p-0 d-flex align-items-center justify-content-center shadow-sm"
            style={{
              width: "28px",
              height: "28px",
              backgroundColor: "#0f172a",
              border: "2px solid #ffffff",
              fontSize: "12px",
              zIndex: 3,
            }}
            title="Upload profile photo"
          >
            {uploading ? (
              <span className="spinner-border spinner-border-sm" style={{ width: "12px", height: "12px" }} />
            ) : (
              "📷"
            )}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            style={{ display: "none" }}
          />
        </div>

        {/* User Info & Actions */}
        <div>
          <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
            <h2 className="h5 fw-bold mb-0 text-dark">{userName}</h2>
            <span
              className="badge bg-success bg-opacity-10 text-success fw-semibold px-2 py-0.5"
              style={{ fontSize: "11px", borderRadius: "10px" }}
            >
              ✓ Verified Seller
            </span>
          </div>

          <p className="text-secondary small mb-2">{userEmail}</p>

          <div className="d-flex align-items-center gap-2.5 pt-0.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1 shadow-none fw-medium"
              style={{ fontSize: "12px" }}
            >
              {uploading ? "Uploading..." : avatarUrl ? "Change Photo" : "Upload Photo"}
            </button>

            {avatarUrl && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="btn btn-link text-danger text-decoration-none btn-sm px-2 py-1"
                style={{ fontSize: "12px" }}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`alert alert-${message.type} py-1.5 px-3 mb-0 small rounded-pill`}
          style={{ fontSize: "12px" }}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
