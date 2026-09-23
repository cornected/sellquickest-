"use client";

import { StyledSelect } from "../../StyledSelect";

type SandalsSlidesFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function SandalsSlidesFields({ data, updateField }: SandalsSlidesFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👡 Sandals, Slides & Slippers Details</h6>
      </div>

      {/* STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="sandal-style"
          name="sandalStyle"
          label="Style Variant"
          value={data.sandalStyle}
          customValue={data.customSandalStyle}
          onCustomChange={(val: string) => updateField("customSandalStyle", val)}
          options={[
            "Leather Palm Slippers (Men & Women)",
            "Designer Pool Slides",
            "Crocs / Clogs",
            "Gladiator / Strappy Sandals",
            "Birkenstock-style Footbed Sandals",
            "Flip-Flops / Thong Slippers",
            "Half Shoes / Backless Slippers",
            "Wedge Sandals",
          ]}
          placeholder="Select Style"
          allowOther
          onChange={(val: string) => updateField("sandalStyle", val)}
        />
      </div>

      {/* STRAP DESIGN */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="sandal-strap"
          name="sandalStrap"
          label="Strap Configuration"
          value={data.sandalStrap}
          customValue={data.customSandalStrap}
          onCustomChange={(val: string) => updateField("customSandalStrap", val)}
          options={[
            "Single Band / One Strap",
            "Double Band / Two Straps",
            "Criss-Cross / X-Strap",
            "Toe Ring / Toe Post",
            "Ankle Wrap Straps",
            "Clog Slip-on with Pivot Heel Strap",
          ]}
          placeholder="Select Strap"
          allowOther
          onChange={(val: string) => updateField("sandalStrap", val)}
        />
      </div>

      {/* FOOTBED COMFORT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="sandal-footbed"
          name="sandalFootbed"
          label="Footbed Comfort"
          value={data.sandalFootbed}
          options={[
            "Anatomical Cork Footbed",
            "Soft Padded Cushion",
            "Molded EVA / Foam",
            "Flat Leather Footbed",
            "Massage Textured Insole",
          ]}
          placeholder="Select Footbed"
          onChange={(val: string) => updateField("sandalFootbed", val)}
        />
      </div>

      {/* WATER RESISTANCE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="sandal-waterproof"
          name="sandalWaterproof"
          label="Water Resistance"
          value={data.sandalWaterproof}
          options={[
            "100% Waterproof (Washable)",
            "Water-Resistant",
            "Not Water Resistant (Keep Dry)",
          ]}
          placeholder="Select Water Resistance"
          onChange={(val: string) => updateField("sandalWaterproof", val)}
        />
      </div>
    </div>
  );
}
