"use client";

import { StyledSelect } from "../../../StyledSelect";

type BoysJeansFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function BoysJeansFields({
  data,

  updateField,
}: BoysJeansFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👖 Boys Jeans Details</h6>
      </div>

      {/* JEANS TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jeans-type"
          name="jeansType"
          label="Jeans Type"
          value={data.jeansType}
          customValue={data.customJeansType}
          onCustomChange={(value) => updateField("customJeansType", value)}
          options={[
            "Classic Jeans",

            "Skinny Jeans",

            "Straight Jeans",

            "Cargo Jeans",

            "Ripped Jeans",

            "Denim Jeans",
          ]}
          placeholder="Select Jeans Type"
          allowOther
          onChange={(value) => updateField("jeansType", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jeans-fit"
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

            "Baggy Fit",
          ]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("jeansFit", value)}
        />
      </div>

      {/* WAIST SIZE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jeans-waist"
          name="jeansWaist"
          label="Waist Size"
          value={data.jeansWaist}
          customValue={data.customJeansWaist}
          onCustomChange={(value) => updateField("customJeansWaist", value)}
          options={["18", "20", "22", "24", "26", "28", "30", "32"]}
          placeholder="Select Waist Size"
          allowOther
          onChange={(value) => updateField("jeansWaist", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jeans-length"
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
          id="boys-jeans-wash"
          name="jeansWash"
          label="Wash Style"
          value={data.jeansWash}
          customValue={data.customJeansWash}
          onCustomChange={(value) => updateField("customJeansWash", value)}
          options={[
            "Dark Wash",

            "Light Wash",

            "Stone Wash",

            "Faded",

            "Distressed",
          ]}
          placeholder="Select Wash Style"
          allowOther
          onChange={(value) => updateField("jeansWash", value)}
        />
      </div>

      {/* STRETCH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jeans-stretch"
          name="jeansStretch"
          label="Stretch"
          value={data.jeansStretch}
          options={["Stretch", "Non Stretch"]}
          placeholder="Select Stretch"
          onChange={(value) => updateField("jeansStretch", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jeans-style"
          name="jeansStyle"
          label="Style"
          value={data.jeansStyle}
          customValue={data.customJeansStyle}
          onCustomChange={(value) => updateField("customJeansStyle", value)}
          options={["Casual", "Streetwear", "Classic", "Fashion"]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("jeansStyle", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-jeans-occasion"
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

            "Casual Event",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("jeansOccasion", value)}
        />
      </div>
    </div>
  );
}
