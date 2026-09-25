"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatNaira } from "@/lib/format";
import { NIGERIA_LOCATIONS } from "@/lib/nigeriaLocations";

interface EditAdFormProps {
  listing: any;
  categories: any[];
}

export function EditAdForm({ listing, categories }: EditAdFormProps) {
  const router = useRouter();

  // Extract initial images array
  const initialImages: string[] = (() => {
    if (!listing.imageUrl) return [];
    try {
      if (listing.imageUrl.startsWith("[")) {
        const parsed = JSON.parse(listing.imageUrl);
        if (Array.isArray(parsed)) return parsed.filter((url) => typeof url === "string" && url.trim());
      } else if (listing.imageUrl.includes(",")) {
        return listing.imageUrl.split(",").map((s: string) => s.trim()).filter(Boolean);
      } else {
        return [listing.imageUrl.trim()];
      }
    } catch {
      return [listing.imageUrl];
    }
    return [listing.imageUrl];
  })();

  const [title, setTitle] = useState(listing.title || "");
  const [price, setPrice] = useState(listing.price ? String(listing.price) : "");
  const [categoryId, setCategoryId] = useState(listing.categoryId || "");
  const [condition, setCondition] = useState(listing.condition || "Used");
  const [location, setLocation] = useState(listing.location || "Lagos");
  const [description, setDescription] = useState(listing.description || "");
  const [images, setImages] = useState<string[]>(initialImages);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addImage = () => {
    if (!newImageUrl.trim()) return;
    try {
      new URL(newImageUrl.trim());
      setImages((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl("");
      setError(null);
    } catch {
      setError("Please enter a valid image URL starting with http:// or https://");
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!price || isNaN(Number(price))) {
      setError("Please provide a valid price");
      return;
    }
    if (!location.trim()) {
      setError("Location is required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const finalImageUrl = images.length > 0 ? JSON.stringify(images) : listing.imageUrl || "/placeholder.png";

      const res = await fetch("/api/listings/manage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: listing.id,
          title,
          price: parseInt(price, 10),
          categoryId,
          condition,
          location,
          description,
          imageUrl: finalImageUrl,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update listing");
      }

      router.push(`/listing/${listing.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
      {error && (
        <div className="alert alert-danger rounded-4 py-2.5 px-3 mb-4" role="alert">
          {error}
        </div>
      )}

      {/* TITLE & CATEGORY ROW */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-8">
          <label className="form-label fw-bold text-dark small">Ad Title *</label>
          <input
            type="text"
            className="form-control rounded-3 py-2.5 px-3 shadow-none border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. iPhone 15 Pro Max 256GB - Clean UK Used"
            required
          />
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label fw-bold text-dark small">Category *</label>
          <select
            className="form-select rounded-3 py-2.5 px-3 shadow-none border"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PRICE, CONDITION & LOCATION */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <label className="form-label fw-bold text-dark small">Price (₦) *</label>
          <div className="input-group">
            <span className="input-group-text bg-light border text-muted">₦</span>
            <input
              type="number"
              className="form-control rounded-end-3 py-2.5 px-3 shadow-none border"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 850000"
              required
            />
          </div>
          {price && !isNaN(Number(price)) && (
            <div className="text-success small fw-semibold mt-1">
              Preview: {formatNaira(Number(price))}
            </div>
          )}
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label fw-bold text-dark small">Condition *</label>
          <select
            className="form-select rounded-3 py-2.5 px-3 shadow-none border"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Refurbished">Refurbished</option>
          </select>
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label fw-bold text-dark small">Location (State / City) *</label>
          <input
            type="text"
            className="form-control rounded-3 py-2.5 px-3 shadow-none border"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Lagos, Ikeja"
            required
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mb-4">
        <label className="form-label fw-bold text-dark small">Description</label>
        <textarea
          rows={5}
          className="form-control rounded-3 py-2.5 px-3 shadow-none border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your item in detail: warranty, reason for selling, accessories included..."
        />
      </div>

      {/* PHOTOS MANAGER */}
      <div className="mb-4">
        <label className="form-label fw-bold text-dark small d-block">Item Photos</label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          {images.map((img, idx) => (
            <div
              key={`edit-img-${idx}`}
              className="position-relative rounded-3 overflow-hidden border shadow-2xs"
              style={{ width: "100px", height: "100px", backgroundColor: "#f8fafc" }}
            >
              <Image
                src={img}
                alt={`Photo ${idx + 1}`}
                fill
                className="object-fit-cover"
                sizes="100px"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle p-0 d-flex align-items-center justify-content-center"
                style={{ width: "22px", height: "22px", fontSize: "11px" }}
                title="Remove photo"
              >
                ✕
              </button>
            </div>
          ))}

          {images.length === 0 && (
            <div className="text-muted small p-3 bg-light rounded-3">
              No photos currently attached. Add an image link below.
            </div>
          )}
        </div>

        {/* Add photo by URL */}
        <div className="input-group" style={{ maxWidth: "550px" }}>
          <input
            type="url"
            className="form-control rounded-start-pill py-2 px-3 shadow-none border"
            placeholder="Paste image URL (https://...)"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
          />
          <button
            type="button"
            onClick={addImage}
            className="btn btn-sq text-white px-3.5 rounded-end-pill"
          >
            + Add Photo
          </button>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="d-flex align-items-center gap-3 pt-3 border-top">
        <button
          type="submit"
          disabled={saving}
          className="btn btn-sq text-white fw-bold px-4 py-2.5 rounded-pill shadow-sm"
        >
          {saving ? "Saving Changes..." : "✓ Save Changes"}
        </button>

        <Link
          href={`/listing/${listing.id}`}
          className="btn btn-light border px-4 py-2.5 rounded-pill text-secondary fw-medium"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
