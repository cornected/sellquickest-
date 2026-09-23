"use client";

import { StyledSelect } from "../../../StyledSelect";

type BoysSuitFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function BoysSuitFields({
  data,

  updateField,
}: BoysSuitFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🤵 Boys Suit Details</h6>
      </div>

      {/* SUIT TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-suit-type"
          name="suitType"
          label="Suit Type"
          value={data.suitType}
          customValue={data.customSuitType}
          onCustomChange={(value) => updateField("customSuitType", value)}
          options={[
            "Classic Suit",

            "Tuxedo",

            "Blazer Set",

            "Wedding Suit",

            "Formal Suit",

            "Party Suit",
          ]}
          placeholder="Select Suit Type"
          allowOther
          onChange={(value) => updateField("suitType", value)}
        />
      </div>

      {/* PIECES */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-suit-pieces"
          name="suitPieces"
          label="Number of Pieces"
          value={data.suitPieces}
          customValue={data.customSuitPieces}
          onCustomChange={(value) => updateField("customSuitPieces", value)}
          options={["2 Piece", "3 Piece", "4 Piece"]}
          placeholder="Select Pieces"
          allowOther
          onChange={(value) => updateField("suitPieces", value)}
        />
      </div>

      {/* JACKET STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-suit-jacket-style"
          name="suitJacketStyle"
          label="Jacket Style"
          value={data.suitJacketStyle}
          customValue={data.customSuitJacketStyle}
          onCustomChange={(value) =>
            updateField("customSuitJacketStyle", value)
          }
          options={[
            "Single Breasted",

            "Double Breasted",

            "Classic Cut",

            "Modern Cut",
          ]}
          placeholder="Select Jacket Style"
          allowOther
          onChange={(value) => updateField("suitJacketStyle", value)}
        />
      </div>

      {/* SHIRT INCLUDED */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-suit-shirt"
          name="suitShirtIncluded"
          label="Shirt Included"
          value={data.suitShirtIncluded}
          options={["Yes", "No"]}
          placeholder="Select Option"
          onChange={(value) => updateField("suitShirtIncluded", value)}
        />
      </div>

      {/* FABRIC */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-suit-fabric"
          name="suitFabric"
          label="Fabric"
          value={data.suitFabric}
          customValue={data.customSuitFabric}
          onCustomChange={(value) => updateField("customSuitFabric", value)}
          options={["Wool", "Cotton", "Velvet", "Polyester", "Linen"]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("suitFabric", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-suit-fit"
          name="suitFit"
          label="Fit"
          value={data.suitFit}
          customValue={data.customSuitFit}
          onCustomChange={(value) => updateField("customSuitFit", value)}
          options={["Slim Fit", "Regular Fit", "Classic Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("suitFit", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-suit-occasion"
          name="suitOccasion"
          label="Occasion"
          value={data.suitOccasion}
          customValue={data.customSuitOccasion}
          onCustomChange={(value) => updateField("customSuitOccasion", value)}
          options={[
            "Wedding",

            "Birthday",

            "School Event",

            "Formal Event",

            "Party",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("suitOccasion", value)}
        />
      </div>
    </div>
  );
}
