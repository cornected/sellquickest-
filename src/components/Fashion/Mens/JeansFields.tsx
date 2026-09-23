"use client";

import { StyledSelect } from "../../StyledSelect";

type JeansFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function JeansFields({
  data,

  updateField,
}: JeansFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👖 Jeans Details</h6>
      </div>

      {/* JEANS TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jeans-type"
          name="jeansType"
          label="Jeans Type"
          value={data.jeansType}
          customValue={data.customJeansType}
          onCustomChange={(value) => updateField("customJeansType", value)}
          options={[
            "Denim Jeans",

            "Ripped Jeans",

            "Skinny Jeans",

            "Straight Jeans",

            "Baggy Jeans",

            "Cargo Jeans",

            "Designer Jeans",
          ]}
          placeholder="Select Jeans Type"
          allowOther
          onChange={(value) => updateField("jeansType", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jeans-fit"
          name="jeansFit"
          label="Jeans Fit"
          value={data.jeansFit}
          customValue={data.customJeansFit}
          onCustomChange={(value) => updateField("customJeansFit", value)}
          options={[
            "Skinny Fit",

            "Slim Fit",

            "Regular Fit",

            "Relaxed Fit",

            "Straight Fit",

            "Loose Fit",
          ]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("jeansFit", value)}
        />
      </div>

      {/* WAIST SIZE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jeans-waist"
          name="waistSize"
          label="Waist Size"
          value={data.waistSize}
          customValue={data.customWaistSize}
          onCustomChange={(value) => updateField("customWaistSize", value)}
          options={["28", "30", "32", "34", "36", "38", "40", "42", "44"]}
          placeholder="Select Waist Size"
          allowOther
          onChange={(value) => updateField("waistSize", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jeans-length"
          name="jeansLength"
          label="Length"
          value={data.jeansLength}
          customValue={data.customJeansLength}
          onCustomChange={(value) => updateField("customJeansLength", value)}
          options={["Short", "Regular", "Long"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("jeansLength", value)}
        />
      </div>

      {/* WASH STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jeans-wash"
          name="washStyle"
          label="Wash Style"
          value={data.washStyle}
          customValue={data.customWashStyle}
          onCustomChange={(value) => updateField("customWashStyle", value)}
          options={[
            "Dark Wash",

            "Light Wash",

            "Stone Wash",

            "Faded",

            "Raw Denim",
          ]}
          placeholder="Select Wash Style"
          allowOther
          onChange={(value) => updateField("washStyle", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jeans-style"
          name="jeansStyle"
          label="Style"
          value={data.jeansStyle}
          customValue={data.customJeansStyle}
          onCustomChange={(value) => updateField("customJeansStyle", value)}
          options={["Classic", "Streetwear", "Casual", "Luxury", "Vintage"]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("jeansStyle", value)}
        />
      </div>

      {/* STRETCH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jeans-stretch"
          name="stretch"
          label="Stretch"
          value={data.stretch}
          options={["Stretch", "Non Stretch"]}
          placeholder="Select Stretch"
          onChange={(value) => updateField("stretch", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jeans-occasion"
          name="jeansOccasion"
          label="Occasion"
          value={data.jeansOccasion}
          customValue={data.customJeansOccasion}
          onCustomChange={(value) => updateField("customJeansOccasion", value)}
          options={["Casual", "Streetwear", "Everyday Wear", "Party", "Travel"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("jeansOccasion", value)}
        />
      </div>
    </div>
  );
}
