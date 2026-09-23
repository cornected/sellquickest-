"use client";

import { StyledSelect } from "../../StyledSelect";

type GownFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function GownFields({
  data,

  updateField,
}: GownFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👑 Gown Details</h6>
      </div>

      {/* GOWN TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="gown-type"
          name="gownType"
          label="Gown Type"
          value={data.gownType}
          customValue={data.customGownType}
          onCustomChange={(value) => updateField("customGownType", value)}
          options={[
            "Wedding Gown",

            "Evening Gown",

            "Ball Gown",

            "Prom Gown",

            "Bridal Gown",

            "Luxury Gown",

            "Mermaid Gown",

            "Traditional Gown",
          ]}
          placeholder="Select Gown Type"
          allowOther
          onChange={(value) => updateField("gownType", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="gown-length"
          name="gownLength"
          label="Gown Length"
          value={data.gownLength}
          customValue={data.customGownLength}
          onCustomChange={(value) => updateField("customGownLength", value)}
          options={["Floor Length", "Ankle Length", "Tea Length", "Short"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("gownLength", value)}
        />
      </div>

      {/* TRAIN */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="gown-train"
          name="gownTrain"
          label="Train Style"
          value={data.gownTrain}
          customValue={data.customGownTrain}
          onCustomChange={(value) => updateField("customGownTrain", value)}
          options={[
            "No Train",

            "Short Train",

            "Chapel Train",

            "Court Train",

            "Cathedral Train",
          ]}
          placeholder="Select Train Style"
          allowOther
          onChange={(value) => updateField("gownTrain", value)}
        />
      </div>

      {/* SLEEVE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="gown-sleeve"
          name="gownSleeve"
          label="Sleeve Style"
          value={data.gownSleeve}
          customValue={data.customGownSleeve}
          onCustomChange={(value) => updateField("customGownSleeve", value)}
          options={[
            "Strapless",

            "Long Sleeve",

            "Short Sleeve",

            "Off Shoulder",

            "Puff Sleeve",

            "One Shoulder",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value) => updateField("gownSleeve", value)}
        />
      </div>

      {/* NECKLINE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="gown-neckline"
          name="gownNeckline"
          label="Neckline"
          value={data.gownNeckline}
          customValue={data.customGownNeckline}
          onCustomChange={(value) => updateField("customGownNeckline", value)}
          options={[
            "Sweetheart",

            "V Neck",

            "Round Neck",

            "High Neck",

            "Boat Neck",

            "Off Shoulder",
          ]}
          placeholder="Select Neckline"
          allowOther
          onChange={(value) => updateField("gownNeckline", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="gown-fit"
          name="gownFit"
          label="Fit"
          value={data.gownFit}
          customValue={data.customGownFit}
          onCustomChange={(value) => updateField("customGownFit", value)}
          options={[
            "Mermaid Fit",

            "A-Line Fit",

            "Slim Fit",

            "Ball Gown Fit",

            "Loose Fit",
          ]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("gownFit", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="gown-occasion"
          name="gownOccasion"
          label="Occasion"
          value={data.gownOccasion}
          customValue={data.customGownOccasion}
          onCustomChange={(value) => updateField("customGownOccasion", value)}
          options={[
            "Wedding",

            "Birthday",

            "Prom",

            "Red Carpet",

            "Formal Event",

            "Traditional Event",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("gownOccasion", value)}
        />
      </div>

      {/* EMBROIDERY */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="gown-embroidery"
          name="gownEmbroidery"
          label="Embroidery"
          value={data.gownEmbroidery}
          options={[
            "Plain",

            "Light Embroidery",

            "Heavy Embroidery",

            "Beaded",

            "Crystal Detail",
          ]}
          placeholder="Select Embroidery"
          onChange={(value) => updateField("gownEmbroidery", value)}
        />
      </div>
    </div>
  );
}
