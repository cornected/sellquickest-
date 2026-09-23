"use client";

import { StyledSelect } from "../../StyledSelect";

type HoodieFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function HoodieFields({
  data,

  updateField,
}: HoodieFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🧥 Hoodie Details</h6>
      </div>

      {/* HOODIE TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="hoodie-type"
          name="hoodieType"
          label="Hoodie Type"
          value={data.hoodieType}
          customValue={data.customHoodieType}
          onCustomChange={(value) => updateField("customHoodieType", value)}
          options={[
            "Pullover Hoodie",

            "Zip Hoodie",

            "Oversized Hoodie",

            "Graphic Hoodie",

            "Sports Hoodie",

            "Designer Hoodie",
          ]}
          placeholder="Select Hoodie Type"
          allowOther
          onChange={(value) => updateField("hoodieType", value)}
        />
      </div>

      {/* THICKNESS */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="hoodie-thickness"
          name="thickness"
          label="Thickness"
          value={data.thickness}
          customValue={data.customThickness}
          onCustomChange={(value) => updateField("customThickness", value)}
          options={["Lightweight", "Medium", "Heavy", "Winter"]}
          placeholder="Select Thickness"
          allowOther
          onChange={(value) => updateField("thickness", value)}
        />
      </div>

      {/* CLOSURE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="hoodie-closure"
          name="closure"
          label="Closure Type"
          value={data.closure}
          customValue={data.customClosure}
          onCustomChange={(value) => updateField("customClosure", value)}
          options={["Pullover", "Zip", "Button"]}
          placeholder="Select Closure"
          allowOther
          onChange={(value) => updateField("closure", value)}
        />
      </div>

      {/* PRINT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="hoodie-print"
          name="print"
          label="Print / Design"
          value={data.print}
          customValue={data.customPrint}
          onCustomChange={(value) => updateField("customPrint", value)}
          options={["Plain", "Graphic Print", "Logo", "Embroidery", "Pattern"]}
          placeholder="Select Design"
          allowOther
          onChange={(value) => updateField("print", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="hoodie-fit"
          name="fit"
          label="Fit"
          value={data.fit}
          customValue={data.customFit}
          onCustomChange={(value) => updateField("customFit", value)}
          options={["Slim Fit", "Regular Fit", "Oversized", "Loose Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("fit", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="hoodie-style"
          name="style"
          label="Style"
          value={data.style}
          customValue={data.customStyle}
          onCustomChange={(value) => updateField("customStyle", value)}
          options={["Streetwear", "Casual", "Sportswear", "Luxury", "Vintage"]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("style", value)}
        />
      </div>
    </div>
  );
}
