"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProfileAvatarUploaderProps {
  initialAvatarUrl?: string | null;
  userName: string;
  userEmail: string;
}

export function ProfileAvatarUploader({
  initialAvatarUrl,
  userName,
  userEmail,
}: ProfileAvatarUploaderProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl || null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "danger" } | null>(null);

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
      // Create instant local preview
      const previewUrl = URL.createObjectURL(file);
      setAvatarUrl(previewUrl);

      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch("/api/user/avatar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload photo.");
      }

      setAvatarUrl(data.avatarUrl);
      setMessage({ text: "Profile image updated successfully!", type: "success" });
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
    if (!confirm("Are you sure you want to remove your profile photo?")) return;

    setUploading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/user/avatar", {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to remove photo.");
      }

      setAvatarUrl(null);
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
