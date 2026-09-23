"use client";

import { StyledSelect } from "../../StyledSelect";

type ShortsFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function ShortsFields({
  data,

  updateField,
}: ShortsFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🩳 Shorts Details</h6>
      </div>

      {/* SHORT TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="short-type"
          name="shortType"
          label="Short Type"
          value={data.shortType}
          customValue={data.customShortType}
          onCustomChange={(value) => updateField("customShortType", value)}
          options={[
            "Casual Shorts",

            "Cargo Shorts",

            "Denim Shorts",

            "Sports Shorts",

            "Beach Shorts",

            "Chino Shorts",

            "Designer Shorts",
          ]}
          placeholder="Select Short Type"
          allowOther
          onChange={(value) => updateField("shortType", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="short-length"
          name="length"
          label="Length"
          value={data.length}
          customValue={data.customLength}
          onCustomChange={(value) => updateField("customLength", value)}
          options={["Short", "Medium", "Long"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("length", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="short-fit"
          name="fit"
          label="Fit"
          value={data.fit}
          customValue={data.customFit}
          onCustomChange={(value) => updateField("customFit", value)}
          options={["Slim Fit", "Regular Fit", "Loose Fit", "Relaxed Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("fit", value)}
        />
      </div>

      {/* WAIST SIZE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="short-waist"
          name="waistSize"
          label="Waist Size"
          value={data.waistSize}
          customValue={data.customWaistSize}
          onCustomChange={(value) => updateField("customWaistSize", value)}
          options={["28", "30", "32", "34", "36", "38", "40", "42"]}
          placeholder="Select Waist Size"
          allowOther
          onChange={(value) => updateField("waistSize", value)}
        />
      </div>

      {/* MATERIAL */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="short-material"
          name="material"
          label="Short Material"
          value={data.material}
          customValue={data.customMaterial}
          onCustomChange={(value) => updateField("customMaterial", value)}
          options={[
            "Cotton",

            "Denim",

            "Polyester",

            "Linen",

            "Nylon",

            "Sports Fabric",
          ]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("material", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="short-style"
          name="style"
          label="Style"
          value={data.style}
          customValue={data.customStyle}
          onCustomChange={(value) => updateField("customStyle", value)}
          options={[
            "Casual",

            "Streetwear",

            "Sportswear",

            "Beach Style",

            "Luxury",
          ]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("style", value)}
        />
      </div>
    </div>
  );
}
