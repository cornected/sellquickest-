"use client";

import { StyledSelect } from "../../StyledSelect";
import { FashionBrandSelect } from "../FashionBrandSelect";
import { FashionFeatures } from "../FashionFeatures";

type GeneralMensFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function GeneralMensFields({
  data,
  updateField,
}: GeneralMensFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <div className="d-flex align-items-center gap-2 mb-1">
          <span className="fs-6">👔</span>
          <h6 className="fw-semibold text-dark mb-0">
            Men's Fashion General Specifications
          </h6>
        </div>
        <p className="text-secondary small mb-0">
          Core brand, sizing, color, material, condition, and availability details.
        </p>
      </div>

      {/* BRAND */}
      <div className="col-12 col-md-6">
        <FashionBrandSelect
          category="Men's Fashion"
          value={data.brand}
          onChange={(value) => updateField("brand", value)}
          customValue={data.customBrand}
          onCustomChange={(value) => updateField("customBrand", value)}
        />
      </div>

      {/* SIZE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="mens-size"
          name="size"
          label="Size"
          value={data.size}
          customValue={data.customSize}
          onCustomChange={(value) => updateField("customSize", value)}
          options={[
            "S (Chest 36-38 in)",
            "M (Chest 39-41 in)",
            "L (Chest 42-44 in)",
            "XL (Chest 45-47 in)",
            "XXL (Chest 48-50 in)",
            "3XL / Big & Tall",
            "Free Size / Standard Fit",
          ]}
          placeholder="Select Size"
          allowOther
          onChange={(value) => updateField("size", value)}
        />
      </div>

      {/* COLOR */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="mens-color"
          name="color"
          label="Primary Color"
          value={data.color}
          customValue={data.customColor}
          onCustomChange={(value) => updateField("customColor", value)}
          options={[
            "Black",
            "White",
            "Navy Blue / Midnight Blue",
            "Sky Blue / Light Blue",
            "Charcoal Grey / Light Grey",
            "Dark Brown / Tan / Khaki",
            "Wine / Burgundy",
            "Emerald Green / Army Green",
            "Beige / Cream / Off-White",
            "Red",
            "Gold / Mustard",
            "Multi-Color / Native Print",
          ]}
          placeholder="Select Color"
          allowOther
          onChange={(value) => updateField("color", value)}
        />
      </div>

      {/* MATERIAL */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="mens-material"
          name="material"
          label="Material / Fabric"
          value={data.material}
          customValue={data.customMaterial}
          onCustomChange={(value) => updateField("customMaterial", value)}
          options={[
            "100% Breathable Cotton",
            "Atiku / Polish Cotton (Senator Grade)",
            "Guinea Brocade / Bazin Riche (Getzner)",
            "Wool / Cashmere Suit Blend",
            "Linen / Pure Irish Linen",
            "Denim (Stretch / Raw)",
            "Polyester / Spandex Sport Blend",
            "Fleece / Heavy French Terry",
            "Genuine Leather / Suede",
            "Silk / Satin",
            "Ankara African Wax Print",
            "Velvet",
          ]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("material", value)}
        />
      </div>

      {/* CONDITION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="mens-condition"
          name="condition"
          label="Condition"
          value={data.condition}
          customValue={data.customCondition}
          onCustomChange={(value) => updateField("customCondition", value)}
          options={[
            "Brand New (With Tags / In Original Packaging)",
            "Brand New (Never Worn)",
            "Tokunbo / Foreign Used (Flawless)",
            "Nigerian Used (Pre-owned, Good Condition)",
            "Custom Made / Bespoke Sewn",
          ]}
          placeholder="Select Condition"
          allowOther
          onChange={(value) => updateField("condition", value)}
        />
      </div>

      {/* AVAILABILITY */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="mens-availability"
          name="availability"
          label="Availability"
          value={data.availability}
          customValue={data.customAvailability}
          onCustomChange={(value) => updateField("customAvailability", value)}
          options={[
            "In Stock / Ready to Ship Immediately",
            "Bespoke / Made to Order (Tailored on Request)",
            "Pre-Order",
          ]}
          placeholder="Select Availability"
          allowOther
          onChange={(value) => updateField("availability", value)}
        />
      </div>

      {/* GENERAL - FEATURES */}
      <FashionFeatures data={data} updateField={updateField} />
    </div>
  );
}
