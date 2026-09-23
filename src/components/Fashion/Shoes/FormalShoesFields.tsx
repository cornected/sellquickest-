"use client";

import { StyledSelect } from "../../StyledSelect";

type FormalShoesFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function FormalShoesFields({ data, updateField }: FormalShoesFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👞 Formal & Corporate Shoes Details</h6>
      </div>

      {/* FORMAL SHOE STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="formal-shoe-style"
          name="formalShoeStyle"
          label="Shoe Model"
          value={data.formalShoeStyle}
          customValue={data.customFormalShoeStyle}
          onCustomChange={(val: string) => updateField("customFormalShoeStyle", val)}
          options={[
            "Oxford (Closed Lacing)",
            "Derby (Open Lacing)",
            "Penny Loafer",
            "Tassel Loafer",
            "Horsebit Loafer",
            "Single Monk Strap",
            "Double Monk Strap",
            "Brogue / Wingtip",
            "Tuxedo / Patent Leather Shoes",
          ]}
          placeholder="Select Model"
          allowOther
          onChange={(val: string) => updateField("formalShoeStyle", val)}
        />
      </div>

      {/* TOE SHAPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="formal-toe-shape"
          name="toeShape"
          label="Toe Shape"
          value={data.toeShape}
          customValue={data.customToeShape}
          onCustomChange={(val: string) => updateField("customToeShape", val)}
          options={[
            "Cap Toe",
            "Round Toe",
            "Pointed / Chiseled Toe",
            "Almond Toe",
            "Square Toe",
            "Plain Toe",
          ]}
          placeholder="Select Toe Shape"
          allowOther
          onChange={(val: string) => updateField("toeShape", val)}
        />
      </div>

      {/* LEATHER FINISH */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="formal-leather-finish"
          name="leatherFinish"
          label="Leather Finish"
          value={data.leatherFinish}
          customValue={data.customLeatherFinish}
          onCustomChange={(val: string) => updateField("customLeatherFinish", val)}
          options={[
            "Full Grain Glossy Polish",
            "Matte Box Calf",
            "Burnished / Patina Finish",
            "High Shine Patent",
            "Suede / Velour",
            "Crocodile / Snake Texture Embossed",
          ]}
          placeholder="Select Finish"
          allowOther
          onChange={(val: string) => updateField("leatherFinish", val)}
        />
      </div>

      {/* SOLE CONSTRUCTION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="formal-sole-construction"
          name="soleConstruction"
          label="Sole & Welt Construction"
          value={data.soleConstruction}
          options={[
            "Goodyear Welted (Durable)",
            "Blake Stitched",
            "Cemented / Glued",
            "Rubber Injected Sole",
          ]}
          placeholder="Select Construction"
          onChange={(val: string) => updateField("soleConstruction", val)}
        />
      </div>
    </div>
  );
}
