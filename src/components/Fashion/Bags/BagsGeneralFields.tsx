"use client";

import { StyledSelect } from "../../StyledSelect";

type BagsGeneralFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

const MATERIALS = [
  "Genuine Leather",
  "PU / Faux Leather",
  "Canvas",
  "Nylon / Waterproof Oxford",
  "Polycarbonate / Hard ABS",
  "Ankara / African Wax Print",
  "Suede Leather",
  "Denim",
  "Polyester",
  "Straw / Jute / Rattan",
  "Velvet",
];

const COLORS = [
  "Black",
  "Brown / Tan",
  "Burgundy / Wine",
  "Navy Blue",
  "Beige / Cream",
  "White",
  "Grey",
  "Red",
  "Green / Olive",
  "Pink",
  "Gold / Metallic",
  "Silver",
  "Ankara / Multi-Color",
];

const CLOSURE_TYPES = [
  "Zipper Closure",
  "Magnetic Snap Button",
  "Flap with Twist / Push Lock",
  "Drawstring",
  "TSA Combination Lock",
  "Key Lock Clasp",
  "Buckle Strap",
  "Open Top (Tote Style)",
];

export function BagsGeneralFields({
  data,
  updateField,
}: BagsGeneralFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-1">
          👜 Bag & Luggage General Specifications
        </h6>
        <p className="text-secondary small mb-0">
          Core material, size profile, closure and condition specifications.
        </p>
      </div>

      {/* PRIMARY MATERIAL */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="bag-material"
          name="material"
          label="Primary Material"
          value={data.material}
          customValue={data.customMaterial}
          onCustomChange={(val: string) => updateField("customMaterial", val)}
          options={MATERIALS}
          placeholder="Select Material"
          allowOther
          onChange={(val: string) => updateField("material", val)}
        />
      </div>

      {/* COLOR */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="bag-color"
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

      {/* CLOSURE TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="bag-closure"
          name="closure"
          label="Closure Type"
          value={data.closure}
          customValue={data.customClosure}
          onCustomChange={(val: string) => updateField("customClosure", val)}
          options={CLOSURE_TYPES}
          placeholder="Select Closure"
          allowOther
          onChange={(val: string) => updateField("closure", val)}
        />
      </div>

      {/* CONDITION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="bag-condition"
          name="condition"
          label="Condition"
          value={data.condition}
          customValue={data.customCondition}
          onCustomChange={(val: string) => updateField("customCondition", val)}
          options={[
            "Brand New (With Tags / Dust Bag)",
            "Brand New (No Tags)",
            "Tokunbo / Foreign Used (Flawless)",
            "Nigerian Used (Pre-owned)",
            "Refurbished / Restored",
          ]}
          placeholder="Select Condition"
          allowOther
          onChange={(val: string) => updateField("condition", val)}
        />
      </div>

      {/* DUST BAG / AUTHENTICITY PACKAGING */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="bag-packaging"
          name="packaging"
          label="Dust Bag & Packaging"
          value={data.packaging}
          options={[
            "Comes with Original Dust Bag & Box",
            "Original Dust Bag Only",
            "Authenticity Cards / Receipt Included",
            "Bag Only (No Dust Bag)",
          ]}
          placeholder="Select Packaging Status"
          onChange={(val: string) => updateField("packaging", val)}
        />
      </div>

      {/* WATERPROOF / WATER RESISTANCE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="bag-waterproof"
          name="waterproof"
          label="Water Resistance"
          value={data.waterproof}
          options={[
            "100% Waterproof",
            "Water-Resistant (Splash Proof)",
            "Not Water Resistant",
          ]}
          placeholder="Select Water Resistance"
          onChange={(val: string) => updateField("waterproof", val)}
        />
      </div>

      {/* AVAILABILITY */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="bag-availability"
          name="availability"
          label="Availability"
          value={data.availability}
          customValue={data.customAvailability}
          onCustomChange={(val: string) =>
            updateField("customAvailability", val)
          }
          options={[
            "In Stock / Ready for Immediate Delivery",
            "Pre-Order",
            "Bespoke / Custom Order",
          ]}
          placeholder="Select Availability"
          allowOther
          onChange={(val: string) => updateField("availability", val)}
        />
      </div>
    </div>
  );
}
