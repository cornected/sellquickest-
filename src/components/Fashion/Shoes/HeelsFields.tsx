"use client";

import { StyledSelect } from "../../StyledSelect";

type HeelsFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function HeelsFields({ data, updateField }: HeelsFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👠 Heels & Pumps Details</h6>
      </div>

      {/* HEEL STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="heel-style"
          name="heelStyle"
          label="Heel Type"
          value={data.heelStyle}
          customValue={data.customHeelStyle}
          onCustomChange={(val: string) => updateField("customHeelStyle", val)}
          options={[
            "Stiletto Heels",
            "Block / Chunky Heels",
            "Kitten Heels",
            "Wedges",
            "Platform Heels",
            "Cone Heels",
            "Spool / Flare Heels",
            "Mule Heels",
          ]}
          placeholder="Select Heel Type"
          allowOther
          onChange={(val: string) => updateField("heelStyle", val)}
        />
      </div>

      {/* HEEL HEIGHT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="heel-height"
          name="heelHeight"
          label="Heel Height"
          value={data.heelHeight}
          customValue={data.customHeelHeight}
          onCustomChange={(val: string) => updateField("customHeelHeight", val)}
          options={[
            "Low Heel (1 - 2 inches / 2.5 - 5 cm)",
            "Mid Heel (2.5 - 3 inches / 6 - 7.5 cm)",
            "High Heel (3.5 - 4 inches / 8.5 - 10 cm)",
            "Ultra High Heel (4.5+ inches / 11+ cm)",
          ]}
          placeholder="Select Height"
          allowOther
          onChange={(val: string) => updateField("heelHeight", val)}
        />
      </div>

      {/* TOE TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="heel-toe-type"
          name="heelToeType"
          label="Toe Design"
          value={data.heelToeType}
          customValue={data.customHeelToeType}
          onCustomChange={(val: string) => updateField("customHeelToeType", val)}
          options={[
            "Pointed Toe",
            "Peep Toe (Open Toe)",
            "Round Toe",
            "Square Toe",
            "Almond Toe",
            "Strappy Front",
          ]}
          placeholder="Select Toe Design"
          allowOther
          onChange={(val: string) => updateField("heelToeType", val)}
        />
      </div>

      {/* EMBELLISHMENTS / ACCENTS */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="heel-embellishment"
          name="heelEmbellishment"
          label="Embellishments & Accents"
          value={data.heelEmbellishment}
          customValue={data.customHeelEmbellishment}
          onCustomChange={(val: string) => updateField("customHeelEmbellishment", val)}
          options={[
            "Plain & Minimalist",
            "Rhinestone / Crystal Encrusted",
            "Bow / Brooch Detail",
            "Ankle Strap & Chain",
            "Metallic / Mirror Accent",
            "Pearl Accents",
          ]}
          placeholder="Select Embellishment"
          allowOther
          onChange={(val: string) => updateField("heelEmbellishment", val)}
        />
      </div>
    </div>
  );
}
