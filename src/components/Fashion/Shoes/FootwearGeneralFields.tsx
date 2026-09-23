"use client";

import { StyledSelect } from "../../StyledSelect";

type FootwearGeneralFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

// EU sizes are the de facto standard across Nigeria, Ghana, Kenya and other African shoe markets (36 to 48)
const SHOE_SIZES_EU = [
  "EU 35 / UK 2.5",
  "EU 36 / UK 3.5",
  "EU 37 / UK 4",
  "EU 38 / UK 5",
  "EU 39 / UK 6",
  "EU 40 / UK 6.5",
  "EU 41 / UK 7.5",
  "EU 42 / UK 8",
  "EU 43 / UK 9",
  "EU 44 / UK 9.5",
  "EU 45 / UK 10.5",
  "EU 46 / UK 11",
  "EU 47 / UK 12",
  "EU 48 / UK 13",
];

const COLORS = [
  "Black",
  "Brown",
  "White",
  "Navy Blue",
  "Tan / Camel",
  "Burgundy / Wine",
  "Grey",
  "Beige / Cream",
  "Red",
  "Green",
  "Gold",
  "Silver",
  "Multi-color",
];

const UPPER_MATERIALS = [
  "Genuine Leather",
  "Suede Leather",
  "Patent Leather",
  "Canvas",
  "Mesh / Knit Fabric",
  "Faux / PU Leather",
  "Velvet",
  "Rubber",
  "Denim",
  "Synthetic",
];

const OUTSOLE_MATERIALS = [
  "Rubber",
  "Crepe Sole",
  "Leather Sole",
  "EVA (Lightweight)",
  "Polyurethane (PU)",
  "TPR (Thermo-Plastic)",
  "Wood",
];

const FASTENINGS = [
  "Lace-up",
  "Slip-on",
  "Buckle Strap",
  "Velcro / Hook & Loop",
  "Zipper",
  "Elastic Gusset",
  "Open (No Fastening)",
];

export function FootwearGeneralFields({
  data,
  updateField,
}: FootwearGeneralFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-1">👟 Shoe & Footwear Specifications</h6>
        <p className="text-secondary small mb-0">
          Key fit, material, and sizing details buyers check on Jiji and local marketplaces.
        </p>
      </div>

      {/* SHOE SIZE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="shoe-size"
          name="size"
          label="Shoe Size"
          value={data.size}
          customValue={data.customSize}
          onCustomChange={(val: string) => updateField("customSize", val)}
          options={SHOE_SIZES_EU}
          placeholder="Select Size (e.g. EU 42 / UK 8)"
          allowOther
          onChange={(val: string) => updateField("size", val)}
        />
      </div>

      {/* COLOR */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="shoe-color"
          name="color"
          label="Primary Color"
          value={data.color}
          customValue={data.customColor}
          onCustomChange={(val: string) => updateField("customColor", val)}
          options={COLORS}
          placeholder="Select Color"
          allowOther
          onChange={(val: string) => updateField("color", val)}
        />
      </div>

      {/* UPPER MATERIAL */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="shoe-upper-material"
          name="upperMaterial"
          label="Upper Material"
          value={data.upperMaterial}
          customValue={data.customUpperMaterial}
          onCustomChange={(val: string) => updateField("customUpperMaterial", val)}
          options={UPPER_MATERIALS}
          placeholder="Select Upper Material"
          allowOther
          onChange={(val: string) => updateField("upperMaterial", val)}
        />
      </div>

      {/* OUTSOLE MATERIAL */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="shoe-outsole-material"
          name="outsoleMaterial"
          label="Outsole Material"
          value={data.outsoleMaterial}
          customValue={data.customOutsoleMaterial}
          onCustomChange={(val: string) => updateField("customOutsoleMaterial", val)}
          options={OUTSOLE_MATERIALS}
          placeholder="Select Outsole Material"
          allowOther
          onChange={(val: string) => updateField("outsoleMaterial", val)}
        />
      </div>

      {/* FASTENING / CLOSURE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="shoe-fastening"
          name="fastening"
          label="Fastening / Closure"
          value={data.fastening}
          customValue={data.customFastening}
          onCustomChange={(val: string) => updateField("customFastening", val)}
          options={FASTENINGS}
          placeholder="Select Closure Type"
          allowOther
          onChange={(val: string) => updateField("fastening", val)}
        />
      </div>

      {/* CONDITION (AFRICAN MARKETPLACE STANDARD) */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="shoe-condition"
          name="condition"
          label="Condition"
          value={data.condition}
          customValue={data.customCondition}
          onCustomChange={(val: string) => updateField("customCondition", val)}
          options={[
            "Brand New (In Box)",
            "Brand New (No Box)",
            "Tokunbo / Foreign Used (Like New)",
            "Nigerian Used (Pre-owned)",
            "Refurbished / Restored",
          ]}
          placeholder="Select Condition"
          allowOther
          onChange={(val: string) => updateField("condition", val)}
        />
      </div>

      {/* PACKAGING & ACCESSORIES */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="shoe-packaging"
          name="packaging"
          label="Packaging / Box Included"
          value={data.packaging}
          options={[
            "Comes with Original Box & Dust Bag",
            "Original Box Only",
            "Replacement Box",
            "No Box (Shoe Only)",
          ]}
          placeholder="Select Packaging Status"
          onChange={(val: string) => updateField("packaging", val)}
        />
      </div>

      {/* AVAILABILITY */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="shoe-availability"
          name="availability"
          label="Availability"
          value={data.availability}
          customValue={data.customAvailability}
          onCustomChange={(val: string) => updateField("customAvailability", val)}
          options={["In Stock / Ready for Delivery", "Pre-Order", "Made to Measure"]}
          placeholder="Select Availability"
          allowOther
          onChange={(val: string) => updateField("availability", val)}
        />
      </div>
    </div>
  );
}
