"use client";

import { StyledSelect } from "../../StyledSelect";

type SuitFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function SuitFields({
  data,

  updateField,
}: SuitFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🤵 Suit Details</h6>
      </div>

      {/* SUIT TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="suit-type"
          name="suitType"
          label="Suit Type"
          value={data.suitType}
          customValue={data.customSuitType}
          onCustomChange={(value) => updateField("customSuitType", value)}
          options={[
            "Two Piece Suit",

            "Three Piece Suit",

            "Tuxedo",

            "Dinner Suit",

            "Wedding Suit",

            "Business Suit",
          ]}
          placeholder="Select Suit Type"
          allowOther
          onChange={(value) => updateField("suitType", value)}
        />
      </div>

      {/* JACKET STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jacket-style"
          name="jacketStyle"
          label="Jacket Style"
          value={data.jacketStyle}
          customValue={data.customJacketStyle}
          onCustomChange={(value) => updateField("customJacketStyle", value)}
          options={[
            "Single Breasted",

            "Double Breasted",

            "Slim Cut",

            "Classic Cut",

            "Tailored Fit",
          ]}
          placeholder="Select Jacket Style"
          allowOther
          onChange={(value) => updateField("jacketStyle", value)}
        />
      </div>

      {/* LAPEL STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="lapel-style"
          name="lapelStyle"
          label="Lapel Style"
          value={data.lapelStyle}
          customValue={data.customLapelStyle}
          onCustomChange={(value) => updateField("customLapelStyle", value)}
          options={["Notch Lapel", "Peak Lapel", "Shawl Lapel"]}
          placeholder="Select Lapel Style"
          allowOther
          onChange={(value) => updateField("lapelStyle", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="suit-fit"
          name="fit"
          label="Suit Fit"
          value={data.fit}
          customValue={data.customFit}
          onCustomChange={(value) => updateField("customFit", value)}
          options={[
            "Slim Fit",

            "Regular Fit",

            "Classic Fit",

            "Tailored Fit",

            "Custom Fit",
          ]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("fit", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="suit-occasion"
          name="occasion"
          label="Occasion"
          value={data.occasion}
          customValue={data.customOccasion}
          onCustomChange={(value) => updateField("customOccasion", value)}
          options={[
            "Business",

            "Wedding",

            "Interview",

            "Formal Event",

            "Party",

            "Dinner",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("occasion", value)}
        />
      </div>

      {/* VEST */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="vest"
          name="vest"
          label="Vest Included"
          value={data.vest}
          options={["Yes", "No"]}
          placeholder="Select Option"
          onChange={(value) => updateField("vest", value)}
        />
      </div>
    </div>
  );
}
