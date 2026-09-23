"use client";

import { StyledSelect } from "../../StyledSelect";

type FlatsFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function FlatsFields({ data, updateField }: FlatsFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🩰 Flats & Ballerinas Details</h6>
      </div>

      {/* FLAT STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="flat-style"
          name="flatStyle"
          label="Flat Style"
          value={data.flatStyle}
          customValue={data.customFlatStyle}
          onCustomChange={(val: string) => updateField("customFlatStyle", val)}
          options={[
            "Ballerina Flats (Round Toe)",
            "Pointed Toe Flats",
            "Mules (Backless Flats)",
            "Loafer Flats / Drivers",
            "Mary Jane Flats (Buckle Strap)",
            "Espadrilles (Jute Rope Sole)",
            "Foldable / Pocket Flats",
          ]}
          placeholder="Select Flat Style"
          allowOther
          onChange={(val: string) => updateField("flatStyle", val)}
        />
      </div>

      {/* INSOLE COMFORT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="flat-insole"
          name="flatInsole"
          label="Insole Comfort"
          value={data.flatInsole}
          options={[
            "Memory Foam Cushioning",
            "Arch Support Orthopedic",
            "Standard Soft Leather Lining",
            "Slim Minimal Insole",
          ]}
          placeholder="Select Insole"
          onChange={(val: string) => updateField("flatInsole", val)}
        />
      </div>

      {/* TOE DESIGN */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="flat-toe-type"
          name="flatToeType"
          label="Toe Profile"
          value={data.flatToeType}
          customValue={data.customFlatToeType}
          onCustomChange={(val: string) => updateField("customFlatToeType", val)}
          options={["Pointed Toe", "Round Toe", "Square Toe", "Almond Toe", "Cap Toe Detail"]}
          placeholder="Select Toe Profile"
          allowOther
          onChange={(val: string) => updateField("flatToeType", val)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="flat-occasion"
          name="flatOccasion"
          label="Recommended Occasion"
          value={data.flatOccasion}
          customValue={data.customFlatOccasion}
          onCustomChange={(val: string) => updateField("customFlatOccasion", val)}
          options={[
            "Everyday Office & Work",
            "Casual Daily Wear",
            "Driving Shoes",
            "Wedding Guest / Emergency Reception Flats",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(val: string) => updateField("flatOccasion", val)}
        />
      </div>
    </div>
  );
}
