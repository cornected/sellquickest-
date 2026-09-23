"use client";

import { StyledSelect } from "../../StyledSelect";

type TrousersFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function TrousersFields({
  data,

  updateField,
}: TrousersFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👖 Trousers Details</h6>
      </div>

      {/* TROUSER TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="trouser-type"
          name="trouserType"
          label="Trouser Type"
          value={data.trouserType}
          customValue={data.customTrouserType}
          onCustomChange={(value) => updateField("customTrouserType", value)}
          options={[
            "Formal Trousers",

            "Chinos",

            "Cargo Trousers",

            "Joggers",

            "Dress Pants",

            "Track Pants",

            "Casual Trousers",
          ]}
          placeholder="Select Trouser Type"
          allowOther
          onChange={(value) => updateField("trouserType", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="trouser-fit"
          name="fit"
          label="Fit"
          value={data.fit}
          customValue={data.customFit}
          onCustomChange={(value) => updateField("customFit", value)}
          options={[
            "Slim Fit",

            "Regular Fit",

            "Straight Fit",

            "Loose Fit",

            "Relaxed Fit",
          ]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("fit", value)}
        />
      </div>

      {/* WAIST SIZE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="trouser-waist"
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
          id="trouser-length"
          name="length"
          label="Length"
          value={data.length}
          customValue={data.customLength}
          onCustomChange={(value) => updateField("customLength", value)}
          options={["Short", "Regular", "Long"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("length", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="trouser-style"
          name="style"
          label="Style"
          value={data.style}
          customValue={data.customStyle}
          onCustomChange={(value) => updateField("customStyle", value)}
          options={["Classic", "Modern", "Streetwear", "Luxury", "Traditional"]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("style", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="trouser-occasion"
          name="occasion"
          label="Occasion"
          value={data.occasion}
          customValue={data.customOccasion}
          onCustomChange={(value) => updateField("customOccasion", value)}
          options={[
            "Office",

            "Business",

            "Casual",

            "Party",

            "Travel",

            "Everyday Wear",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("occasion", value)}
        />
      </div>
    </div>
  );
}
