"use client";

import { StyledSelect } from "../../StyledSelect";

type SkirtFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function SkirtFields({
  data,

  updateField,
}: SkirtFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👗 Skirt Details</h6>
      </div>

      {/* SKIRT TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="skirt-type"
          name="skirtType"
          label="Skirt Type"
          value={data.skirtType}
          customValue={data.customSkirtType}
          onCustomChange={(value) => updateField("customSkirtType", value)}
          options={[
            "Pencil Skirt",

            "Pleated Skirt",

            "Maxi Skirt",

            "Mini Skirt",

            "Denim Skirt",

            "A-Line Skirt",

            "Wrap Skirt",

            "Leather Skirt",

            "Office Skirt",
          ]}
          placeholder="Select Skirt Type"
          allowOther
          onChange={(value) => updateField("skirtType", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="skirt-length"
          name="skirtLength"
          label="Skirt Length"
          value={data.skirtLength}
          customValue={data.customSkirtLength}
          onCustomChange={(value) => updateField("customSkirtLength", value)}
          options={["Mini", "Knee Length", "Midi", "Maxi", "Floor Length"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("skirtLength", value)}
        />
      </div>

      {/* WAIST STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="skirt-waist"
          name="skirtWaist"
          label="Waist Style"
          value={data.skirtWaist}
          customValue={data.customSkirtWaist}
          onCustomChange={(value) => updateField("customSkirtWaist", value)}
          options={[
            "High Waist",

            "Mid Waist",

            "Low Waist",

            "Elastic Waist",

            "Button Waist",
          ]}
          placeholder="Select Waist Style"
          allowOther
          onChange={(value) => updateField("skirtWaist", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="skirt-fit"
          name="skirtFit"
          label="Fit"
          value={data.skirtFit}
          customValue={data.customSkirtFit}
          onCustomChange={(value) => updateField("customSkirtFit", value)}
          options={[
            "Slim Fit",

            "Regular Fit",

            "Loose Fit",

            "Flared",

            "Bodycon",
          ]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("skirtFit", value)}
        />
      </div>

      {/* PATTERN */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="skirt-pattern"
          name="skirtPattern"
          label="Pattern"
          value={data.skirtPattern}
          customValue={data.customSkirtPattern}
          onCustomChange={(value) => updateField("customSkirtPattern", value)}
          options={[
            "Plain",

            "Floral",

            "Striped",

            "Printed",

            "Checked",

            "Embroidered",
          ]}
          placeholder="Select Pattern"
          allowOther
          onChange={(value) => updateField("skirtPattern", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="skirt-style"
          name="skirtStyle"
          label="Style"
          value={data.skirtStyle}
          customValue={data.customSkirtStyle}
          onCustomChange={(value) => updateField("customSkirtStyle", value)}
          options={[
            "Casual",

            "Office",

            "Luxury",

            "Traditional",

            "Streetwear",

            "Party Wear",
          ]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("skirtStyle", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="skirt-occasion"
          name="skirtOccasion"
          label="Occasion"
          value={data.skirtOccasion}
          customValue={data.customSkirtOccasion}
          onCustomChange={(value) => updateField("customSkirtOccasion", value)}
          options={[
            "Everyday Wear",

            "Office",

            "Party",

            "Wedding",

            "Date Night",

            "Formal Event",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("skirtOccasion", value)}
        />
      </div>
    </div>
  );
}
