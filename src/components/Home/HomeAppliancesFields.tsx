"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { HomeBrandSelect } from "./HomeBrandSelect";

type HomeAppliancesFieldsProps = {
  onChange: (data: object) => void;
};

const APPLIANCE_BRANDS = [
  "Haier Thermocool",
  "LG",
  "Samsung",
  "Hisense",
  "Midea",
  "Scanfrost",
  "Polystar",
  "Maxi",
  "Nexus",
  "Panasonic",
  "Bruhm",
  "Syinix",
  "Belling",
  "Kenwood",
  "Whirlpool",
  "Bosch",
];

const APPLIANCE_TYPES = [
  "Double Door Refrigerator / Fridge",
  "Deep Chest Freezer (100L - 500L)",
  "Split Unit Air Conditioner (1HP / 1.5HP / 2HP)",
  "Standing Inverter AC (2HP / 3HP)",
  "Front Load Washing Machine & Dryer",
  "Top Load Automatic Washing Machine",
  "Gas Cooker & Oven (4 / 5 Burners)",
  "Microwave Oven & Grill",
  "Water Dispenser (Hot & Cold)",
  "Air Fryer & Multi-Cooker",
  "Heavy Duty Yam Pounder / Blender",
];

const APPLIANCE_FEATURES = [
  "Inverter Compressor (Low Energy Saving)",
  "Works Perfectly with Small Generators (Gen-Friendly)",
  "Fast Freezing / Turbo Cooling",
  "No-Frost Technology",
  "Copper Condenser Pipes",
  "Free Installation Kit & Pipes Included",
  "Remote Control Included",
  "Original Factory Gas Follow-Come",
  "Clean Rust-Free Interior & Exterior",
  "Factory Warranty Certificate",
];

export function HomeAppliancesFields({ onChange }: HomeAppliancesFieldsProps) {
  const [data, setData] = useState({
    applianceType: "",
    customApplianceType: "",
    brand: "",
    customBrand: "",
    model: "",
    capacity: "200 - 300 Litres / 1.5 HP",
    powerInverter: "Inverter (Energy Saving)",
    condition: "Foreign Used (UK / Tokunbo)",
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
      <h5 className="h6 fw-bold mb-3 text-dark">❄️ Home & Kitchen Appliances Specifications</h5>

      {/* APPLIANCE TYPE & BRAND */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="appliance-type"
            name="applianceType"
            label="Appliance Type"
            value={data.applianceType}
            customValue={data.customApplianceType}
            onCustomChange={(val) => updateField("customApplianceType", val)}
            options={APPLIANCE_TYPES}
            placeholder="Select Appliance Type"
            allowOther
            onChange={(val) => updateField("applianceType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <HomeBrandSelect
            id="appliance-brand"
            category="Home & Kitchen Appliances"
            label="Brand"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(val) => updateField("customBrand", val)}
            onChange={(val) => updateField("brand", val)}
          />
        </div>
      </div>

      {/* CAPACITY & INVERTER TECH */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Capacity / Size / HP
          </label>
          <input
            value={data.capacity}
            onChange={(e) => updateField("capacity", e.target.value)}
            placeholder="e.g. 1.5 HP, 250 Litres, 8kg Washer, 4 Burners"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="appliance-inverter"
            name="powerInverter"
            label="Power Technology"
            value={data.powerInverter}
            options={[
              "Inverter (Low Energy Saving / Gen Friendly)",
              "Non-Inverter / Standard Heavy Duty",
              "Dual Fuel (Gas + Electric)",
              "Manual / Mechanical",
            ]}
            placeholder="Select Power Type"
            onChange={(val) => updateField("powerInverter", val)}
          />
        </div>
      </div>

      {/* CONDITION */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="appliance-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            options={[
              "Brand New Sealed",
              "Foreign Used (UK / Tokunbo)",
              "Nigerian Used (100% Tested Working)",
              "Open Box / Display Unit",
            ]}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Model / Color
          </label>
          <input
            value={data.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="e.g. Silver Mirror Finish, Turbo Series, White"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Features & Condition Highlights
        </label>
        <div className="d-flex flex-wrap gap-2">
          {APPLIANCE_FEATURES.map((feat) => {
            const isSelected = data.features.includes(feat);
            return (
              <button
                key={feat}
                type="button"
                onClick={() => toggleFeature(feat)}
                className={`btn btn-sm ${
                  isSelected ? "btn-dark text-white fw-semibold" : "btn-light border text-secondary"
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
