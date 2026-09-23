"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { HomeBrandSelect } from "./HomeBrandSelect";

type FurnitureFieldsProps = {
  onChange: (data: object) => void;
};

const FURNITURE_TYPES = [
  "Living Room Sofa & Couch Set (L-Shape / 7-Seater)",
  "Bed Frame & Luxury Mattress",
  "Dining Table & Chairs Set (4/6/8-Seater)",
  "Wardrobe & Bedroom Closet",
  "TV Console / Wall Unit",
  "Office Ergonomic Chair & Desk",
  "Center Table / Coffee Table",
  "Shoe Rack / Book Shelf",
  "Kitchen Cabinets & Shelves",
  "Outdoor / Balcony Furniture",
];

const FURNITURE_MATERIALS = [
  "Hardwood / Mahogany / Teak",
  "Fabric & High-Density Foam",
  "Genuine Leather / Italian Leather",
  "PU Leather / Leatherette",
  "MDF / Engineered Wood",
  "Metal / Wrought Iron",
  "Glass & Chrome / Stainless Steel",
  "Marble Top",
];

const FURNITURE_FEATURES = [
  "Orthopedic / High Density Foam",
  "Dismountable for Easy Transport",
  "Stain-Resistant Fabric",
  "Includes Free Pillows / Throw Pillows",
  "Under-Bed Storage Drawers",
  "Ergonomic Lumbar Support",
  "Water-Resistant Coating",
  "Brand New Custom Built",
  "Free Assembly on Delivery",
];

export function FurnitureFields({ onChange }: FurnitureFieldsProps) {
  const [data, setData] = useState({
    furnitureType: "",
    customFurnitureType: "",
    brand: "",
    customBrand: "",
    material: "",
    customMaterial: "",
    color: "",
    condition: "Brand New (Direct from Maker)",
    seatingCapacity: "7-Seater (3+2+1+1)",
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
      <h5 className="h6 fw-bold mb-3 text-dark">🛋️ Furniture Specifications</h5>

      {/* TYPE & BRAND */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="furn-type"
            name="furnitureType"
            label="Furniture Type"
            value={data.furnitureType}
            customValue={data.customFurnitureType}
            onCustomChange={(val) => updateField("customFurnitureType", val)}
            options={FURNITURE_TYPES}
            placeholder="Select Furniture Type"
            allowOther
            onChange={(val) => updateField("furnitureType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <HomeBrandSelect
            id="furn-brand"
            category="Furniture"
            label="Brand / Maker"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(val) => updateField("customBrand", val)}
            onChange={(val) => updateField("brand", val)}
          />
        </div>
      </div>

      {/* MATERIAL & CONDITION */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="furn-mat"
            name="material"
            label="Primary Material"
            value={data.material}
            customValue={data.customMaterial}
            onCustomChange={(val) => updateField("customMaterial", val)}
            options={FURNITURE_MATERIALS}
            placeholder="Select Material"
            allowOther
            onChange={(val) => updateField("material", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="furn-cond"
            name="condition"
            label="Condition"
            value={data.condition}
            options={[
              "Brand New (Direct from Maker)",
              "Foreign Used (UK / Tokunbo)",
              "Nigerian Used (Very Clean)",
              "Refurbished / Freshly Upholstered",
            ]}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
      </div>

      {/* COLOR & DIMENSIONS */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-12">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Color & Dimensions / Size
          </label>
          <input
            value={data.color}
            onChange={(e) => updateField("color", e.target.value)}
            placeholder="e.g. Grey & Gold, 6x6 ft Bed, King Size, Royal Blue"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Features & Inclusions
        </label>
        <div className="d-flex flex-wrap gap-2">
          {FURNITURE_FEATURES.map((feat) => {
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
