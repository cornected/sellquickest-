"use client";

import { StyledSelect } from "../../StyledSelect";

type KidsGeneralFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function KidsGeneralFields({
  data,
  updateField,
}: KidsGeneralFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <div className="d-flex align-items-center gap-2 mb-1">
          <span className="fs-6">👶</span>
          <h6 className="fw-semibold text-dark mb-0">
            Kids Fashion General Specifications
          </h6>
        </div>
        <p className="text-secondary small mb-0">
          Age group, sizing, color, fabric, condition, and availability details.
        </p>
      </div>

      {/* AGE GROUP */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="kids-age-group"
          name="ageGroup"
          label="Age Group"
          value={data.ageGroup}
          customValue={data.customAgeGroup}
          onCustomChange={(value: string) =>
            updateField("customAgeGroup", value)
          }
          options={[
            "Newborn (0 - 3 Months)",
            "Infant (3 - 12 Months)",
            "Toddler (1 - 3 Years)",
            "Little Kids (4 - 6 Years)",
            "Big Kids (7 - 10 Years)",
            "Pre-Teen / Teen (11 - 16 Years)",
          ]}
          placeholder="Select Age Group"
          allowOther
          onChange={(value: string) => updateField("ageGroup", value)}
        />
      </div>

      {/* SIZE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="kids-size"
          name="size"
          label="Size"
          value={data.size}
          customValue={data.customSize}
          onCustomChange={(value: string) => updateField("customSize", value)}
          options={[
            "0-3 Months",
            "3-6 Months",
            "6-12 Months",
            "1-2 Years (Size 2T)",
            "3-4 Years (Size 4T)",
            "5-6 Years",
            "7-8 Years",
            "9-10 Years",
            "11-12 Years",
            "13-14 Years (Teen)",
            "15-16 Years (Young Adult)",
          ]}
          placeholder="Select Size"
          allowOther
          onChange={(value: string) => updateField("size", value)}
        />
      </div>

      {/* COLOR */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="kids-color"
          name="color"
          label="Primary Color"
          value={data.color}
          customValue={data.customColor}
          onCustomChange={(value: string) => updateField("customColor", value)}
          options={[
            "White",
            "Pink / Baby Pink",
            "Blue / Sky Blue / Navy",
            "Yellow / Pastel Yellow",
            "Red",
            "Black",
            "Green / Mint Green",
            "Grey / Heather Grey",
            "Purple / Lavender",
            "Peach / Coral",
            "Multi-Color / Cartoon Character Print",
          ]}
          placeholder="Select Color"
          allowOther
          onChange={(value: string) => updateField("color", value)}
        />
      </div>

      {/* FABRIC */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="kids-fabric"
          name="fabric"
          label="Fabric / Material"
          value={data.fabric}
          customValue={data.customFabric}
          onCustomChange={(value: string) => updateField("customFabric", value)}
          options={[
            "100% Gentle Baby Cotton (Hypoallergenic)",
            "Soft Cotton & Spandex Blend",
            "Denim / Jean",
            "Ankara / African Wax Cotton",
            "Tulle & Satin (Princess / Party Wear)",
            "Fleece / Warm French Terry",
            "Silk & Chiffon",
            "Lace & Organza",
          ]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value: string) => updateField("fabric", value)}
        />
      </div>

      {/* CONDITION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="kids-condition"
          name="condition"
          label="Condition"
          value={data.condition}
          customValue={data.customCondition}
          onCustomChange={(value) => updateField("customCondition", value)}
          options={[
            "Brand New (With Tags / In Factory Packaging)",
            "Brand New (Never Worn)",
            "Foreign Used / Tokunbo (Excellent Condition)",
            "Nigerian Used (Gently Used)",
            "Custom Sewn / Made to Measure",
          ]}
          placeholder="Select Condition"
          allowOther
          onChange={(value) => updateField("condition", value)}
        />
      </div>

      {/* AVAILABILITY */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="kids-availability"
          name="availability"
          label="Availability"
          value={data.availability}
          customValue={data.customAvailability}
          onCustomChange={(value: string) =>
            updateField("customAvailability", value)
          }
          options={[
            "In Stock / Ready to Ship Immediately",
            "Bespoke / Custom Made on Order",
            "Pre-Order",
          ]}
          placeholder="Select Availability"
          allowOther
          onChange={(value: string) => updateField("availability", value)}
        />
      </div>
    </div>
  );
}
