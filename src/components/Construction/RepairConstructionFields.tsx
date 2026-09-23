"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { UniversalBrandSelect } from "../Common/UniversalBrandSelect";
import { CONSTRUCTION_BRANDS } from "@/lib/brandCatalogs";

type RepairConstructionFieldsProps = {
  onChange: (data: object) => void;
  subCategoryTitle?: string;
};

const BUILDING_TYPES = [
  "Portland Cement (Grade 42.5N / 32.5R)",
  "Rebar Steel Rods (10mm, 12mm, 16mm, 20mm)",
  "Aluminium Roofing Sheets (0.45mm / 0.55mm Steptiles)",
  "Granite (1/2\", 3/4\", Stone Dust - Tipper)",
  "Sharp Sand / Plaster Sand (20-30 Ton Tipper)",
  "POP Cement & Gypsum Plaster Boards",
  "Plywood & Marine Wood Formwork (1/2\", 3/4\")",
  "Exterior & Interior Emulsion / Gloss Paints",
  "Waterproofing Chemicals & Membrane",
];

const ELECTRICAL_TYPES = [
  "Monocrystalline Solar Panel (400W - 650W)",
  "Pure Sine Wave Hybrid Solar Inverter (1kVA - 15kVA)",
  "Lithium Iron Phosphate (LiFePO4) Battery (48V)",
  "Tubular Deep Cycle Battery (12V 200Ah - 220Ah)",
  "Single & Multi-Core Pure Copper Cable (Rolls)",
  "Armoured Underground Power Cable (4-Core)",
  "Distribution Board (DB) & Miniature Circuit Breakers",
  "Automatic Changeover Switch & Surge Protector",
];

const PLUMBING_TYPES = [
  "Submersible Borehole Water Pump (1HP - 5.5HP)",
  "Overhead GeePee / Water Storage Tank (1,000L - 10,000L)",
  "PPR Hot & Cold Water Pressure Pipes & Fittings",
  "PVC Waste / Soil Pipes & Connectors (3\", 4\", 6\")",
  "Pressure Booster Pump with Automatic Switch",
  "Water Filtration & Reverse Osmosis Treatment Plant",
  "Bathroom Sanitary Ware (Water Closet WC, Wash Basin)",
];

const DOORS_TYPES = [
  "Armoured Security Bullet-Proof Steel Entrance Door",
  "Turkish Luxury Steel Exterior Door",
  "Interior Flush / HDF / Wooden Panel Door",
  "Casement Aluminium Glass Window with Netting",
  "Sliding Aluminium & Tinted Glass Window",
  "Tempered Frameless Shower Glass & Rail",
  "Stainless Steel Staircase Railing / Balustrade",
];

const TOOLS_TYPES = [
  "Cordless Brushless Impact Drill / Driver Set",
  "Heavy Duty Angle Grinder (4.5\" / 9\")",
  "IGBT Inverter Arc / Argon Welding Machine",
  "Demolition Jackhammer & Rotary Hammer",
  "Circular Hand Saw & Wood Cutting Machine",
  "Laser Distance Meter & Self-Leveling Cross Laser",
  "Complete Mechanic / Electrician Tool Box Set",
];

const FLOORING_TYPES = [
  "Polished Vitrified Porcelain Floor Tiles (60x60 / 60x120)",
  "Glazed Ceramic Wall & Bathroom Tiles (30x60)",
  "Natural Granite Slabs & Kitchen Countertops",
  "Wooden Laminate & SPC Vinyl Waterproof Flooring",
  "Concrete Interlocking Paver Stones (Vibrated)",
  "Tile Adhesive / Grout Cement (20kg Bags)",
];

const UNIT_OF_MEASURE = [
  "Per Piece / Single Unit",
  "Per Bag (50kg / 25kg)",
  "Per Trailer / Tipper Load (20 - 30 Tons)",
  "Per Carton / Square Meter (m²)",
  "Per Bundle / Roll (100 Meters)",
  "Per Ton (Metric Tonne)",
  "Complete Set / System Package",
];

const CONDITION_OPTIONS = [
  "Brand New / Factory Fresh Supply",
  "Site Surplus / Unused Excess Stock",
  "Refurbished & Tested Working Clean",
];

const HIGHLIGHTS = [
  "SON / NIS Certified Nigerian Standard",
  "100% Pure Electrolytic Copper",
  "Direct Factory / Depot Price Guarantee",
  "Bulk Order Discount Available",
  "On-Site Loading & Nationwide Delivery Assistance",
  "Genuine Brand Warranty Included",
  "High Durability & Weather Resistant",
];

export function RepairConstructionFields({
  onChange,
  subCategoryTitle = "Repair & Construction",
}: RepairConstructionFieldsProps) {
  const isBuilding =
    subCategoryTitle.toLowerCase().includes("build") ||
    subCategoryTitle.toLowerCase().includes("mater");
  const isElectrical =
    subCategoryTitle.toLowerCase().includes("elect") ||
    subCategoryTitle.toLowerCase().includes("solar");
  const isPlumbing =
    subCategoryTitle.toLowerCase().includes("plumb") ||
    subCategoryTitle.toLowerCase().includes("water");
  const isDoors =
    subCategoryTitle.toLowerCase().includes("door") ||
    subCategoryTitle.toLowerCase().includes("window") ||
    subCategoryTitle.toLowerCase().includes("alum");
  const isFlooring =
    subCategoryTitle.toLowerCase().includes("floor") ||
    subCategoryTitle.toLowerCase().includes("tile") ||
    subCategoryTitle.toLowerCase().includes("granit");

  const itemTypes = isBuilding
    ? BUILDING_TYPES
    : isElectrical
    ? ELECTRICAL_TYPES
    : isPlumbing
    ? PLUMBING_TYPES
    : isDoors
    ? DOORS_TYPES
    : isFlooring
    ? FLOORING_TYPES
    : TOOLS_TYPES;

  const itemLabel = isBuilding
    ? "Building Material Type"
    : isElectrical
    ? "Solar / Electrical Component"
    : isPlumbing
    ? "Plumbing / Water Product"
    : isDoors
    ? "Door / Window / Aluminium"
    : isFlooring
    ? "Tiles / Flooring Material"
    : "Tool / Equipment Type";

  const specPlaceholder = isBuilding
    ? "e.g. 50kg Bag, 16mm High Yield TMT, 0.55mm Thickness"
    : isElectrical
    ? "e.g. 550W Tier 1, 5kVA 48V, 100Ah 5.12kWh"
    : isPlumbing
    ? "e.g. 2HP 80m Head, 5,000 Liters, 1-inch PPR"
    : isDoors
    ? "e.g. 4ft x 7ft (1200x2100mm), 90mm Leaf, 3 Lock Points"
    : isFlooring
    ? "e.g. 60x60cm, 1.44m²/Carton, 20mm Slab Thickness"
    : "e.g. 21V 4.0Ah Dual Battery, 850W, 200 Amp";

  const [data, setData] = useState({
    itemType: "",
    customItemType: "",
    brand: "",
    customBrand: "",
    unitOfMeasure: "Per Piece / Single Unit",
    specifications: "",
    condition: "Brand New / Factory Fresh Supply",
    features: [] as string[],
  });

  const updateField = (key: string, value: unknown) => {
    const updated = { ...data, [key]: value };
    setData(updated);
    onChange(updated);
  };

  const toggleFeature = (feature: string) => {
    const updatedFeatures = data.features.includes(feature)
      ? data.features.filter((item) => item !== feature)
      : [...data.features, feature];
    updateField("features", updatedFeatures);
  };

  return (
    <div
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <h5 className="h6 fw-bold mb-3 text-dark">
        🏗️ {subCategoryTitle} Specifications
      </h5>

      {/* ITEM TYPE & BRAND */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="construct-item-type"
            name="itemType"
            label={itemLabel}
            value={data.itemType}
            customValue={data.customItemType}
            onCustomChange={(val) => updateField("customItemType", val)}
            options={itemTypes}
            placeholder={`Select ${itemLabel}`}
            allowOther
            onChange={(val) => updateField("itemType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <UniversalBrandSelect
            id="construct-brand"
            label="Brand / Manufacturer"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(val) => updateField("customBrand", val)}
            onChange={(val) => updateField("brand", val)}
            category={subCategoryTitle}
            placeholder="Select Manufacturer"
            brands={CONSTRUCTION_BRANDS}
            allowNoBrand={true}
            allowCustomBespoke={true}
          />
        </div>
      </div>

      {/* UNIT OF MEASURE & SPECIFICATIONS */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="construct-unit"
            name="unitOfMeasure"
            label="Unit of Sale / Packaging"
            value={data.unitOfMeasure}
            options={UNIT_OF_MEASURE}
            placeholder="Select Unit"
            onChange={(val) => updateField("unitOfMeasure", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Grade / Dimensions / Technical Specs
          </label>
          <input
            value={data.specifications}
            onChange={(e) => updateField("specifications", e.target.value)}
            placeholder={specPlaceholder}
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* CONDITION */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="construct-condition"
            name="condition"
            label="Supply Condition"
            value={data.condition}
            options={CONDITION_OPTIONS}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
      </div>

      {/* HIGHLIGHTS */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Certifications & Supply Guarantees
        </label>
        <div className="d-flex flex-wrap gap-2">
          {HIGHLIGHTS.map((feat) => {
            const isSelected = data.features.includes(feat);
            return (
              <button
                key={feat}
                type="button"
                onClick={() => toggleFeature(feat)}
                className={`btn btn-sm ${
                  isSelected
                    ? "btn-dark text-white fw-semibold"
                    : "btn-light border text-secondary location-option"
                }`}
                style={{ borderRadius: "8px", fontSize: "12px", padding: "6px 12px" }}
              >
                {isSelected ? "✓ " : "+ "}
                {feat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
