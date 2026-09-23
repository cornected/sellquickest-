"use client";

import { StyledSelect } from "../../StyledSelect";

type WomenJacketFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function WomenJacketFields({
  data,

  updateField,
}: WomenJacketFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🧥 Women's Jacket Details</h6>
      </div>

      {/* JACKET TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jacket-type"
          name="jacketType"
          label="Jacket Type"
          value={data.jacketType}
          customValue={data.customJacketType}
          onCustomChange={(value) => updateField("customJacketType", value)}
          options={[
            "Blazer",

            "Leather Jacket",

            "Denim Jacket",

            "Bomber Jacket",

            "Trench Coat",

            "Cropped Jacket",

            "Winter Jacket",

            "Sports Jacket",
          ]}
          placeholder="Select Jacket Type"
          allowOther
          onChange={(value) => updateField("jacketType", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jacket-style"
          name="jacketStyle"
          label="Style"
          value={data.jacketStyle}
          customValue={data.customJacketStyle}
          onCustomChange={(value) => updateField("customJacketStyle", value)}
          options={[
            "Casual",

            "Corporate",

            "Luxury",

            "Streetwear",

            "Vintage",

            "Designer",

            "Oversized",
          ]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("jacketStyle", value)}
        />
      </div>

      {/* CLOSURE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jacket-closure"
          name="jacketClosure"
          label="Closure"
          value={data.jacketClosure}
          customValue={data.customJacketClosure}
          onCustomChange={(value) => updateField("customJacketClosure", value)}
          options={["Zip", "Button", "Snap Button", "Open Front", "Belted"]}
          placeholder="Select Closure"
          allowOther
          onChange={(value) => updateField("jacketClosure", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jacket-fit"
          name="jacketFit"
          label="Fit"
          value={data.jacketFit}
          customValue={data.customJacketFit}
          onCustomChange={(value) => updateField("customJacketFit", value)}
          options={[
            "Slim Fit",

            "Regular Fit",

            "Oversized",

            "Cropped Fit",

            "Loose Fit",
          ]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("jacketFit", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jacket-length"
          name="jacketLength"
          label="Length"
          value={data.jacketLength}
          customValue={data.customJacketLength}
          onCustomChange={(value) => updateField("customJacketLength", value)}
          options={["Cropped", "Waist Length", "Hip Length", "Long Length"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("jacketLength", value)}
        />
      </div>

      {/* MATERIAL */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jacket-material"
          name="jacketMaterial"
          label="Material"
          value={data.jacketMaterial}
          customValue={data.customJacketMaterial}
          onCustomChange={(value) => updateField("customJacketMaterial", value)}
          options={[
            "Leather",

            "Denim",

            "Wool",

            "Cotton",

            "Velvet",

            "Polyester",
          ]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("jacketMaterial", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jacket-occasion"
          name="jacketOccasion"
          label="Occasion"
          value={data.jacketOccasion}
          customValue={data.customJacketOccasion}
          onCustomChange={(value) => updateField("customJacketOccasion", value)}
          options={[
            "Everyday Wear",

            "Office",

            "Travel",

            "Party",

            "Formal Event",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("jacketOccasion", value)}
        />
      </div>
    </div>
  );
}
