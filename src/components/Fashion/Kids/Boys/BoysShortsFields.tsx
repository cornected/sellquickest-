"use client";

import { StyledSelect } from "../../../StyledSelect";

type BoysShortsFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function BoysShortsFields({
  data,

  updateField,
}: BoysShortsFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🩳 Boys Shorts Details</h6>
      </div>

      {/* SHORT TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-short-type"
          name="shortType"
          label="Short Type"
          value={data.shortType}
          customValue={data.customShortType}
          onCustomChange={(value) => updateField("customShortType", value)}
          options={[
            "Casual Shorts",

            "Denim Shorts",

            "Cargo Shorts",

            "Sports Shorts",

            "School Shorts",

            "Beach Shorts",
          ]}
          placeholder="Select Short Type"
          allowOther
          onChange={(value) => updateField("shortType", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-short-length"
          name="shortLength"
          label="Length"
          value={data.shortLength}
          customValue={data.customShortLength}
          onCustomChange={(value) => updateField("customShortLength", value)}
          options={["Short", "Medium", "Knee Length"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("shortLength", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-short-fit"
          name="shortFit"
          label="Fit"
          value={data.shortFit}
          customValue={data.customShortFit}
          onCustomChange={(value) => updateField("customShortFit", value)}
          options={["Slim Fit", "Regular Fit", "Loose Fit", "Oversized"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("shortFit", value)}
        />
      </div>

      {/* WAIST */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-short-waist"
          name="shortWaist"
          label="Waist Size"
          value={data.shortWaist}
          customValue={data.customShortWaist}
          onCustomChange={(value) => updateField("customShortWaist", value)}
          options={["18", "20", "22", "24", "26", "28", "30", "32"]}
          placeholder="Select Waist Size"
          allowOther
          onChange={(value) => updateField("shortWaist", value)}
        />
      </div>

      {/* MATERIAL */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-short-material"
          name="shortMaterial"
          label="Material"
          value={data.shortMaterial}
          customValue={data.customShortMaterial}
          onCustomChange={(value) => updateField("customShortMaterial", value)}
          options={["Cotton", "Denim", "Polyester", "Fleece", "Linen"]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("shortMaterial", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-short-style"
          name="shortStyle"
          label="Style"
          value={data.shortStyle}
          customValue={data.customShortStyle}
          onCustomChange={(value) => updateField("customShortStyle", value)}
          options={["Casual", "Streetwear", "Sports", "Classic"]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("shortStyle", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-short-occasion"
          name="shortOccasion"
          label="Occasion"
          value={data.shortOccasion}
          customValue={data.customShortOccasion}
          onCustomChange={(value) => updateField("customShortOccasion", value)}
          options={["Everyday Wear", "School", "Travel", "Sports", "Party"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("shortOccasion", value)}
        />
      </div>
    </div>
  );
}
