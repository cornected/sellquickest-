"use client";

import { StyledSelect } from "../../../StyledSelect";

type GirlsJeansFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function GirlsJeansFields({ data, updateField }: GirlsJeansFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👖 Girls Jeans Details</h6>
      </div>

      {/* JEANS TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jeans-type"
          name="jeansType"
          label="Jeans Type"
          value={data.jeansType}
          customValue={data.customJeansType}
          onCustomChange={(value) => updateField("customJeansType", value)}
          options={[
            "Skinny Jeans",
            "Straight Leg Jeans",
            "Mom Jeans",
            "Boyfriend Jeans",
            "Wide Leg Jeans",
            "Jeggings",
          ]}
          placeholder="Select Jeans Type"
          allowOther
          onChange={(value) => updateField("jeansType", value)}
        />
      </div>

      {/* FIT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jeans-fit"
          name="jeansFit"
          label="Fit"
          value={data.jeansFit}
          customValue={data.customJeansFit}
          onCustomChange={(value) => updateField("customJeansFit", value)}
          options={[
            "Slim Fit",
            "Regular Fit",
            "Loose Fit",
            "High Rise",
            "Low Rise",
          ]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("jeansFit", value)}
        />
      </div>

      {/* WAIST STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jeans-waist"
          name="jeansWaist"
          label="Waist Style"
          value={data.jeansWaist}
          customValue={data.customJeansWaist}
          onCustomChange={(value) => updateField("customJeansWaist", value)}
          options={["High Waist", "Mid Waist", "Low Waist", "Elastic Waist"]}
          placeholder="Select Waist Style"
          allowOther
          onChange={(value) => updateField("jeansWaist", value)}
        />
      </div>

      {/* LENGTH */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jeans-length"
          name="jeansLength"
          label="Length"
          value={data.jeansLength}
          customValue={data.customJeansLength}
          onCustomChange={(value) => updateField("customJeansLength", value)}
          options={["Ankle Length", "Full Length", "Cropped", "Capri"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("jeansLength", value)}
        />
      </div>

      {/* WASH */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jeans-wash"
          name="jeansWash"
          label="Wash / Color Effect"
          value={data.jeansWash}
          customValue={data.customJeansWash}
          onCustomChange={(value) => updateField("customJeansWash", value)}
          options={[
            "Dark Wash",
            "Light Wash",
            "Stone Wash",
            "Acid Wash",
            "Black Denim",
          ]}
          placeholder="Select Wash"
          allowOther
          onChange={(value) => updateField("jeansWash", value)}
        />
      </div>

      {/* STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jeans-style"
          name="jeansStyle"
          label="Style / Design"
          value={data.jeansStyle}
          customValue={data.customJeansStyle}
          onCustomChange={(value) => updateField("customJeansStyle", value)}
          options={["Plain", "Ripped", "Distressed", "Embroidered", "Beaded"]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("jeansStyle", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jeans-occasion"
          name="jeansOccasion"
          label="Occasion"
          value={data.jeansOccasion}
          customValue={data.customJeansOccasion}
          onCustomChange={(value) => updateField("customJeansOccasion", value)}
          options={[
            "Everyday Wear",
            "School",
            "Travel",
            "Party",
            "Casual Outing",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("jeansOccasion", value)}
        />
      </div>
    </div>
  );
}
