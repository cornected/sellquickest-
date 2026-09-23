"use client";

import { StyledSelect } from "../../StyledSelect";

type TopFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function TopFields({
  data,

  updateField,
}: TopFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👚 Top Details</h6>
      </div>

      {/* TOP STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="top-style"
          name="topStyle"
          label="Top Style"
          value={data.topStyle}
          customValue={data.customTopStyle}
          onCustomChange={(value) => updateField("customTopStyle", value)}
          options={[
            "Casual Top",

            "Crop Top",

            "Tank Top",

            "Peplum Top",

            "Blouse Top",

            "Designer Top",

            "Party Top",

            "Office Top",

            "Traditional Top",
          ]}
          placeholder="Select Top Style"
          allowOther
          onChange={(value) => updateField("topStyle", value)}
        />
      </div>

      {/* SLEEVE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="top-sleeve"
          name="topSleeve"
          label="Sleeve Style"
          value={data.topSleeve}
          customValue={data.customTopSleeve}
          onCustomChange={(value) => updateField("customTopSleeve", value)}
          options={[
            "Short Sleeve",

            "Long Sleeve",

            "Sleeveless",

            "Puff Sleeve",

            "Bell Sleeve",

            "Off Shoulder",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value) => updateField("topSleeve", value)}
        />
      </div>

      {/* NECKLINE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="top-neckline"
          name="topNeckline"
          label="Neckline"
          value={data.topNeckline}
          customValue={data.customTopNeckline}
          onCustomChange={(value) => updateField("customTopNeckline", value)}
          options={[
            "Round Neck",

            "V Neck",

            "High Neck",

            "Boat Neck",

            "Square Neck",

            "Off Shoulder",
          ]}
          placeholder="Select Neckline"
          allowOther
          onChange={(value) => updateField("topNeckline", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="top-fit"
          name="topFit"
          label="Fit"
          value={data.topFit}
          customValue={data.customTopFit}
          onCustomChange={(value) => updateField("customTopFit", value)}
          options={[
            "Slim Fit",

            "Regular Fit",

            "Loose Fit",

            "Oversized",

            "Cropped Fit",
          ]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("topFit", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="top-length"
          name="topLength"
          label="Length"
          value={data.topLength}
          customValue={data.customTopLength}
          onCustomChange={(value) => updateField("customTopLength", value)}
          options={["Crop Length", "Waist Length", "Hip Length", "Long Length"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("topLength", value)}
        />
      </div>

      {/* PATTERN */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="top-pattern"
          name="topPattern"
          label="Pattern"
          value={data.topPattern}
          customValue={data.customTopPattern}
          onCustomChange={(value) => updateField("customTopPattern", value)}
          options={[
            "Plain",

            "Floral",

            "Printed",

            "Striped",

            "Embroidered",

            "Lace",
          ]}
          placeholder="Select Pattern"
          allowOther
          onChange={(value) => updateField("topPattern", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="top-occasion"
          name="topOccasion"
          label="Occasion"
          value={data.topOccasion}
          customValue={data.customTopOccasion}
          onCustomChange={(value) => updateField("customTopOccasion", value)}
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
          onChange={(value) => updateField("topOccasion", value)}
        />
      </div>
    </div>
  );
}
