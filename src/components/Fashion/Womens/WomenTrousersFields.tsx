"use client";

import { StyledSelect } from "../../StyledSelect";

type WomenTrousersFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function WomenTrousersFields({
  data,

  updateField,
}: WomenTrousersFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👖 Women's Trousers Details</h6>
      </div>

      {/* TROUSER TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-trouser-type"
          name="trouserType"
          label="Trouser Type"
          value={data.trouserType}
          customValue={data.customTrouserType}
          onCustomChange={(value) => updateField("customTrouserType", value)}
          options={[
            "Palazzo Trousers",

            "Wide Leg Trousers",

            "Straight Leg Trousers",

            "Skinny Trousers",

            "Cigarette Trousers",

            "Cargo Trousers",

            "Formal Trousers",

            "High Waist Trousers",
          ]}
          placeholder="Select Trouser Type"
          allowOther
          onChange={(value) => updateField("trouserType", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-trouser-fit"
          name="trouserFit"
          label="Fit"
          value={data.trouserFit}
          customValue={data.customTrouserFit}
          onCustomChange={(value) => updateField("customTrouserFit", value)}
          options={[
            "Slim Fit",

            "Regular Fit",

            "Loose Fit",

            "Wide Leg",

            "Oversized",
          ]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("trouserFit", value)}
        />
      </div>

      {/* WAIST */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-trouser-waist"
          name="trouserWaist"
          label="Waist Style"
          value={data.trouserWaist}
          customValue={data.customTrouserWaist}
          onCustomChange={(value) => updateField("customTrouserWaist", value)}
          options={["High Waist", "Mid Waist", "Low Waist", "Elastic Waist"]}
          placeholder="Select Waist Style"
          allowOther
          onChange={(value) => updateField("trouserWaist", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-trouser-length"
          name="trouserLength"
          label="Length"
          value={data.trouserLength}
          customValue={data.customTrouserLength}
          onCustomChange={(value) => updateField("customTrouserLength", value)}
          options={["Ankle Length", "Full Length", "Cropped", "Short Length"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("trouserLength", value)}
        />
      </div>

      {/* MATERIAL */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-trouser-material"
          name="trouserMaterial"
          label="Material"
          value={data.trouserMaterial}
          customValue={data.customTrouserMaterial}
          onCustomChange={(value) =>
            updateField("customTrouserMaterial", value)
          }
          options={[
            "Cotton",

            "Linen",

            "Silk",

            "Denim",

            "Polyester",

            "Leather",

            "Chiffon",
          ]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("trouserMaterial", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-trouser-style"
          name="trouserStyle"
          label="Style"
          value={data.trouserStyle}
          customValue={data.customTrouserStyle}
          onCustomChange={(value) => updateField("customTrouserStyle", value)}
          options={[
            "Casual",

            "Office",

            "Luxury",

            "Streetwear",

            "Traditional",

            "Designer",
          ]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("trouserStyle", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="women-trouser-occasion"
          name="trouserOccasion"
          label="Occasion"
          value={data.trouserOccasion}
          customValue={data.customTrouserOccasion}
          onCustomChange={(value) =>
            updateField("customTrouserOccasion", value)
          }
          options={[
            "Everyday Wear",

            "Office",

            "Party",

            "Wedding",

            "Travel",

            "Formal Event",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("trouserOccasion", value)}
        />
      </div>
    </div>
  );
}
