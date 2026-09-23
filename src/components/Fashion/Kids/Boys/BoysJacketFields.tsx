"use client";

import { StyledSelect } from "../../../StyledSelect";

type BoysJacketFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function BoysJacketFields({
  data,

  updateField,
}: BoysJacketFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🧥 Boys Jacket Details</h6>
      </div>

      {/* JACKET TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jacket-type"
          name="jacketType"
          label="Jacket Type"
          value={data.jacketType}
          customValue={data.customJacketType}
          onCustomChange={(value) => updateField("customJacketType", value)}
          options={[
            "Denim Jacket",

            "Leather Jacket",

            "Bomber Jacket",

            "Winter Jacket",

            "Sports Jacket",

            "School Jacket",
          ]}
          placeholder="Select Jacket Type"
          allowOther
          onChange={(value) => updateField("jacketType", value)}
        />
      </div>

      {/* CLOSURE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jacket-closure"
          name="jacketClosure"
          label="Closure"
          value={data.jacketClosure}
          customValue={data.customJacketClosure}
          onCustomChange={(value) => updateField("customJacketClosure", value)}
          options={["Zip", "Button", "Snap Button", "Open Front"]}
          placeholder="Select Closure"
          allowOther
          onChange={(value) => updateField("jacketClosure", value)}
        />
      </div>

      {/* MATERIAL */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jacket-material"
          name="jacketMaterial"
          label="Material"
          value={data.jacketMaterial}
          customValue={data.customJacketMaterial}
          onCustomChange={(value) => updateField("customJacketMaterial", value)}
          options={["Denim", "Leather", "Cotton", "Fleece", "Polyester"]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("jacketMaterial", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jacket-fit"
          name="jacketFit"
          label="Fit"
          value={data.jacketFit}
          customValue={data.customJacketFit}
          onCustomChange={(value) => updateField("customJacketFit", value)}
          options={["Slim Fit", "Regular Fit", "Oversized", "Loose Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("jacketFit", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jacket-style"
          name="jacketStyle"
          label="Style"
          value={data.jacketStyle}
          customValue={data.customJacketStyle}
          onCustomChange={(value) => updateField("customJacketStyle", value)}
          options={["Casual", "Streetwear", "Classic", "Luxury", "Sports"]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("jacketStyle", value)}
        />
      </div>

      {/* THICKNESS */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jacket-thickness"
          name="jacketThickness"
          label="Thickness"
          value={data.jacketThickness}
          customValue={data.customJacketThickness}
          onCustomChange={(value) =>
            updateField("customJacketThickness", value)
          }
          options={["Light", "Medium", "Heavy", "Winter"]}
          placeholder="Select Thickness"
          allowOther
          onChange={(value) => updateField("jacketThickness", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jacket-occasion"
          name="jacketOccasion"
          label="Occasion"
          value={data.jacketOccasion}
          customValue={data.customJacketOccasion}
          onCustomChange={(value) => updateField("customJacketOccasion", value)}
          options={["Everyday Wear", "School", "Travel", "Party", "Outdoor"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("jacketOccasion", value)}
        />
      </div>
    </div>
  );
}
