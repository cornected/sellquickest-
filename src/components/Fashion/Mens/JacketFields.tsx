"use client";

import { StyledSelect } from "../../StyledSelect";

type JacketFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function JacketFields({
  data,

  updateField,
}: JacketFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🧥 Jacket Details</h6>
      </div>

      {/* JACKET TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jacket-type"
          name="jacketType"
          label="Jacket Type"
          value={data.jacketType}
          customValue={data.customJacketType}
          onCustomChange={(value) => updateField("customJacketType", value)}
          options={[
            "Bomber Jacket",

            "Leather Jacket",

            "Denim Jacket",

            "Suit Jacket",

            "Winter Jacket",

            "Windbreaker",

            "Sports Jacket",
          ]}
          placeholder="Select Jacket Type"
          allowOther
          onChange={(value) => updateField("jacketType", value)}
        />
      </div>

      {/* CLOSURE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jacket-closure"
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

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jacket-style"
          name="jacketStyle"
          label="Style"
          value={data.jacketStyle}
          customValue={data.customJacketStyle}
          onCustomChange={(value) => updateField("customJacketStyle", value)}
          options={[
            "Casual",

            "Streetwear",

            "Luxury",

            "Corporate",

            "Vintage",

            "Sportswear",
          ]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("jacketStyle", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jacket-fit"
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

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jacket-occasion"
          name="jacketOccasion"
          label="Occasion"
          value={data.jacketOccasion}
          customValue={data.customJacketOccasion}
          onCustomChange={(value) => updateField("customJacketOccasion", value)}
          options={["Everyday Wear", "Business", "Travel", "Party", "Outdoor"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("jacketOccasion", value)}
        />
      </div>
    </div>
  );
}
