"use client";

import { StyledSelect } from "../../StyledSelect";
import { FashionBrandSelect } from "../FashionBrandSelect";

type WomensGeneralFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function WomensGeneralFields({
  data,
  updateField,
}: WomensGeneralFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <div className="d-flex align-items-center gap-2 mb-1">
          <span className="fs-6">👗</span>
          <h6 className="fw-semibold text-dark mb-0">
            Women's Fashion General Specifications
          </h6>
        </div>
        <p className="text-secondary small mb-0">
          Core brand, sizing, color, fabric, condition, and availability details.
        </p>
      </div>

      {/* BRAND */}
      <div className="col-12 col-md-6">
        <FashionBrandSelect
          category="Women's Fashion"
          value={data.brand}
          onChange={(value) => updateField("brand", value)}
          customValue={data.customBrand}
          onCustomChange={(value) => updateField("customBrand", value)}
        />
      </div>

      {/* SIZE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-size"
          name="size"
          label="Size"
          value={data.size}
          customValue={data.customSize}
          onCustomChange={(value) => updateField("customSize", value)}
          options={[
            "XS (UK 6 / US 2)",
            "S (UK 8 / US 4)",
            "M (UK 10 / US 6)",
            "L (UK 12 / US 8)",
            "XL (UK 14 / US 10)",
            "XXL (UK 16 / US 12)",
            "3XL / Plus Size (UK 18+)",
            "Free Size / One Size Fits Most",
          ]}
          placeholder="Select Size"
          allowOther
          onChange={(value) => updateField("size", value)}
        />
      </div>

      {/* COLOR */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-color"
          name="color"
          label="Primary Color"
          value={data.color}
          customValue={data.customColor}
          onCustomChange={(value) => updateField("customColor", value)}
          options={[
            "Black",
            "White / Off-White",
            "Red / Wine",
            "Royal Blue / Navy",
            "Emerald Green / Olive",
            "Pink / Blush / Rose",
            "Gold / Champagne",
            "Yellow / Mustard",
            "Brown / Nude / Beige",
            "Purple / Lilac",
            "Orange / Peach",
            "Silver / Grey",
            "Multi-Color / Ankara Print",
          ]}
          placeholder="Select Color"
          allowOther
          onChange={(value) => updateField("color", value)}
        />
      </div>

      {/* FABRIC */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-fabric"
          name="fabric"
          label="Fabric / Material"
          value={data.fabric}
          customValue={data.customFabric}
          onCustomChange={(value) => updateField("customFabric", value)}
          options={[
            "Cotton / Breathable Cotton",
            "Silk / Satin",
            "Chiffon / Georgette",
            "Ankara / African Wax Print",
            "Lace (Swiss, French, Cord, Beaded)",
            "Denim / Jean",
            "Crepe / Scuba",
            "Velvet",
            "Linen",
            "Polyester / Spandex Blend",
            "Wool / Knitwear",
            "Leather / Faux Leather",
          ]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("fabric", value)}
        />
      </div>

      {/* CONDITION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-condition"
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
          id="women-availability"
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
    </div>
  );
}
