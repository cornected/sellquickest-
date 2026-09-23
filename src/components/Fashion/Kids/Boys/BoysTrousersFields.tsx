"use client";

import { StyledSelect } from "../../../StyledSelect";

type BoysTrousersFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function BoysTrousersFields({
  data,

  updateField,
}: BoysTrousersFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👖 Boys Trousers Details</h6>
      </div>

      {/* TROUSER TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-trouser-type"
          name="trouserType"
          label="Trouser Type"
          value={data.trouserType}
          customValue={data.customTrouserType}
          onCustomChange={(value) => updateField("customTrouserType", value)}
          options={[
            "School Trouser",

            "Casual Trouser",

            "Formal Trouser",

            "Chino Trouser",

            "Cargo Trouser",

            "Jogger Trouser",
          ]}
          placeholder="Select Trouser Type"
          allowOther
          onChange={(value) => updateField("trouserType", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-trouser-fit"
          name="trouserFit"
          label="Fit"
          value={data.trouserFit}
          customValue={data.customTrouserFit}
          onCustomChange={(value) => updateField("customTrouserFit", value)}
          options={["Slim Fit", "Regular Fit", "Loose Fit", "Straight Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("trouserFit", value)}
        />
      </div>

      {/* WAIST SIZE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-trouser-waist"
          name="trouserWaist"
          label="Waist Size"
          value={data.trouserWaist}
          customValue={data.customTrouserWaist}
          onCustomChange={(value) => updateField("customTrouserWaist", value)}
          options={["18", "20", "22", "24", "26", "28", "30", "32"]}
          placeholder="Select Waist Size"
          allowOther
          onChange={(value) => updateField("trouserWaist", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-trouser-length"
          name="trouserLength"
          label="Length"
          value={data.trouserLength}
          customValue={data.customTrouserLength}
          onCustomChange={(value) => updateField("customTrouserLength", value)}
          options={["Short", "Regular", "Long"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("trouserLength", value)}
        />
      </div>

      {/* MATERIAL */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-trouser-material"
          name="trouserMaterial"
          label="Material"
          value={data.trouserMaterial}
          customValue={data.customTrouserMaterial}
          onCustomChange={(value) =>
            updateField("customTrouserMaterial", value)
          }
          options={["Cotton", "Denim", "Khaki", "Polyester", "Linen"]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("trouserMaterial", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-trouser-style"
          name="trouserStyle"
          label="Style"
          value={data.trouserStyle}
          customValue={data.customTrouserStyle}
          onCustomChange={(value) => updateField("customTrouserStyle", value)}
          options={["Classic", "Casual", "Streetwear", "Formal"]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("trouserStyle", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-trouser-occasion"
          name="trouserOccasion"
          label="Occasion"
          value={data.trouserOccasion}
          customValue={data.customTrouserOccasion}
          onCustomChange={(value) =>
            updateField("customTrouserOccasion", value)
          }
          options={[
            "School",

            "Everyday Wear",

            "Formal Event",

            "Party",

            "Travel",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("trouserOccasion", value)}
        />
      </div>
    </div>
  );
}
