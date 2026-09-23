"use client";

import { StyledSelect } from "../../StyledSelect";

type AfricanAnkaraBagsFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function AfricanAnkaraBagsFields({
  data,
  updateField,
}: AfricanAnkaraBagsFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">
          ✨ African Craft & Ankara Bag Details
        </h6>
      </div>

      {/* ANKARA / ETHNIC STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="ankara-bag-style"
          name="ankaraBagStyle"
          label="Traditional / Craft Bag Style"
          value={data.ankaraBagStyle}
          customValue={data.customAnkaraBagStyle}
          onCustomChange={(val: string) =>
            updateField("customAnkaraBagStyle", val)
          }
          options={[
            "Ankara Print Tote Bag",
            "Beaded Evening Bag / Clutch",
            "Aso-Oke Handcrafted Purse",
            "Raffia / Straw African Market Basket Bag",
            "Leather & Ankara Hybrid Handbag",
            "Kente Pattern Backpack",
            "Cowrie Shell Ornamented Purse",
          ]}
          placeholder="Select Style"
          allowOther
          onChange={(val: string) => updateField("ankaraBagStyle", val)}
        />
      </div>

      {/* CRAFT WORKMANSHIP */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="ankara-craftsmanship"
          name="ankaraCraftsmanship"
          label="Craftsmanship"
          value={data.ankaraCraftsmanship}
          options={[
            "100% Handcrafted by Local Artisans",
            "Structured Frame Handbag with Ankara Wrap",
            "Beaded / Hand-Strung Beadwork",
            "Machine Assembled Wax Print",
          ]}
          placeholder="Select Craftsmanship"
          onChange={(val: string) => updateField("ankaraCraftsmanship", val)}
        />
      </div>

      {/* MATCHING ACCESSORIES SET */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="ankara-set"
          name="ankaraMatchingSet"
          label="Matching Set Options"
          value={data.ankaraMatchingSet}
          customValue={data.customAnkaraMatchingSet}
          onCustomChange={(val: string) =>
            updateField("customAnkaraMatchingSet", val)
          }
          options={[
            "Bag Only",
            "Comes with Matching Slippers / Shoes (Shoe & Bag Set)",
            "Comes with Matching Headwrap / Gele",
            "Comes with Matching Fan & Purse Set (Bride/Wedding)",
          ]}
          placeholder="Select Set Inclusions"
          allowOther
          onChange={(val: string) => updateField("ankaraMatchingSet", val)}
        />
      </div>

      {/* FABRIC REINFORCEMENT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="ankara-reinforce"
          name="ankaraReinforce"
          label="Structure & Reinforcement"
          value={data.ankaraReinforce}
          options={[
            "Hard Structured Board Inner with Wax Exterior",
            "Waterproof Inner Lining (Easy Clean)",
            "Soft Foldable Fabric",
            "Wood / Bamboo Handles",
          ]}
          placeholder="Select Structure"
          onChange={(val: string) => updateField("ankaraReinforce", val)}
        />
      </div>
    </div>
  );
}
