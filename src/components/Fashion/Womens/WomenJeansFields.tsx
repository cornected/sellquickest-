"use client";

import { StyledSelect } from "../../StyledSelect";

type WomenJeansFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function WomenJeansFields({
  data,

  updateField,
}: WomenJeansFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👖 Women's Jeans Details</h6>
      </div>

      {/* JEANS TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jeans-type"
          name="jeansType"
          label="Jeans Type"
          value={data.jeansType}
          customValue={data.customJeansType}
          onCustomChange={(value) => updateField("customJeansType", value)}
          options={[
            "Skinny Jeans",

            "Slim Fit Jeans",

            "Straight Leg Jeans",

            "Mom Jeans",

            "Boyfriend Jeans",

            "Wide Leg Jeans",

            "Bootcut Jeans",

            "High Waist Jeans",

            "Low Rise Jeans",
          ]}
          placeholder="Select Jeans Type"
          allowOther
          onChange={(value) => updateField("jeansType", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jeans-fit"
          name="jeansFit"
          label="Fit"
          value={data.jeansFit}
          customValue={data.customJeansFit}
          onCustomChange={(value) => updateField("customJeansFit", value)}
          options={[
            "Skinny Fit",

            "Slim Fit",

            "Regular Fit",

            "Loose Fit",

            "Oversized Fit",
          ]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("jeansFit", value)}
        />
      </div>

      {/* WAIST */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jeans-waist"
          name="jeansWaist"
          label="Waist Style"
          value={data.jeansWaist}
          customValue={data.customJeansWaist}
          onCustomChange={(value) => updateField("customJeansWaist", value)}
          options={["High Waist", "Mid Waist", "Low Waist"]}
          placeholder="Select Waist Style"
          allowOther
          onChange={(value) => updateField("jeansWaist", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jeans-length"
          name="jeansLength"
          label="Length"
          value={data.jeansLength}
          customValue={data.customJeansLength}
          onCustomChange={(value) => updateField("customJeansLength", value)}
          options={["Ankle Length", "Full Length", "Cropped", "Short Length"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("jeansLength", value)}
        />
      </div>

      {/* WASH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jeans-wash"
          name="jeansWash"
          label="Wash Style"
          value={data.jeansWash}
          customValue={data.customJeansWash}
          onCustomChange={(value) => updateField("customJeansWash", value)}
          options={[
            "Dark Wash",

            "Light Wash",

            "Stone Wash",

            "Acid Wash",

            "Distressed",

            "Faded",
          ]}
          placeholder="Select Wash Style"
          allowOther
          onChange={(value) => updateField("jeansWash", value)}
        />
      </div>

      {/* STRETCH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jeans-stretch"
          name="jeansStretch"
          label="Stretch"
          value={data.jeansStretch}
          options={["Non Stretch", "Stretch", "Super Stretch"]}
          placeholder="Select Stretch"
          onChange={(value) => updateField("jeansStretch", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jeans-style"
          name="jeansStyle"
          label="Style"
          value={data.jeansStyle}
          customValue={data.customJeansStyle}
          onCustomChange={(value) => updateField("customJeansStyle", value)}
          options={["Casual", "Streetwear", "Vintage", "Designer", "Classic"]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("jeansStyle", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-jeans-occasion"
          name="jeansOccasion"
          label="Occasion"
          value={data.jeansOccasion}
          customValue={data.customJeansOccasion}
          onCustomChange={(value) => updateField("customJeansOccasion", value)}
          options={["Everyday Wear", "Office", "Travel", "Party", "Date Night"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("jeansOccasion", value)}
        />
      </div>
    </div>
  );
}
