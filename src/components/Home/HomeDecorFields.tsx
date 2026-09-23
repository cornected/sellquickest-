"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type HomeDecorFieldsProps = {
  onChange: (data: object) => void;
};

const DECOR_TYPES = [
  "Turkish / Center Rug & Carpet",
  "Luxury Curtains & Window Blinds",
  "Chandelier & Ceiling Pendant Lighting",
  "Canvas Wall Art & Framed Paintings",
  "Bed Sheets & Duvet Cover Set",
  "Decorative Wall Mirrors & Consoles",
  "Artificial Flowers & Luxury Vases",
  "Wallpaper & Wall Panels (3D)",
];

const DECOR_FEATURES = [
  "Turkish / Persian Imported Quality",
  "Blackout / Sunlight Blocking Fabric",
  "Machine Washable",
  "Includes Free Hooks & Curtain Rods",
  "LED Warm & Cool Light Modes",
  "Anti-Slip Rug Backing",
  "Handcrafted Wooden Frame",
  "Direct Factory Wholesale Price",
];

export function HomeDecorFields({ onChange }: HomeDecorFieldsProps) {
  const [data, setData] = useState({
    decorType: "",
    customDecorType: "",
    material: "Turkish Velvet / Wool Blend",
    sizeDimensions: "6 x 9 ft",
    color: "",
    condition: "Brand New Sealed",
    features: [] as string[],
  });

  const updateField = (key: string, value: unknown) => {
    const updated = { ...data, [key]: value };
    setData(updated);
    onChange(updated);
  };

  const toggleFeature = (feature: string) => {
    const updatedFeatures = data.features.includes(feature)
      ? data.features.filter((item) => item !== feature)
      : [...data.features, feature];
    updateField("features", updatedFeatures);
  };

  return (
    <div
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <h5 className="h6 fw-bold mb-3 text-dark">🎨 Home Decor & Interior Specifications</h5>

      {/* DECOR TYPE & MATERIAL */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="decor-type"
            name="decorType"
            label="Decor Item"
            value={data.decorType}
            customValue={data.customDecorType}
            onCustomChange={(val) => updateField("customDecorType", val)}
            options={DECOR_TYPES}
            placeholder="Select Decor Item"
            allowOther
            onChange={(val) => updateField("decorType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Material / Fabric
          </label>
          <input
            value={data.material}
            onChange={(e) => updateField("material", e.target.value)}
            placeholder="e.g. 100% Turkish Wool, Velvet, Crystal Glass, Cotton"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* SIZE & COLOR */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Dimensions / Size
          </label>
          <input
            value={data.sizeDimensions}
            onChange={(e) => updateField("sizeDimensions", e.target.value)}
            placeholder="e.g. 6x9 ft, 8x11 ft, 4-meter curtains, Queen size"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Color & Pattern
          </label>
          <input
            value={data.color}
            onChange={(e) => updateField("color", e.target.value)}
            placeholder="e.g. Emerald Green & Gold, Neutral Beige, Geometric"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* CONDITION */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="decor-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            options={[
              "Brand New Sealed",
              "Foreign Used (Tokunbo Clean)",
              "Nigerian Used",
            ]}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Features & Special Qualities
        </label>
        <div className="d-flex flex-wrap gap-2">
          {DECOR_FEATURES.map((feat) => {
            const isSelected = data.features.includes(feat);
            return (
              <button
                key={feat}
                type="button"
                onClick={() => toggleFeature(feat)}
                className={`btn btn-sm ${
                  isSelected ? "btn-dark text-white fw-semibold" : "btn-light border text-secondary"
                }`}
                style={{ borderRadius: "8px", fontSize: "12px", padding: "6px 12px" }}
              >
                {isSelected ? "✓ " : "+ "}
                {feat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
