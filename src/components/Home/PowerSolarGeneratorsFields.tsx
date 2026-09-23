"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { HomeBrandSelect } from "./HomeBrandSelect";

type PowerSolarGeneratorsFieldsProps = {
  onChange: (data: object) => void;
};

const POWER_EQUIPMENT_TYPES = [
  "Hybrid Solar Inverter (1kVA - 15kVA)",
  "Lithium LifePO4 Battery Bank (2.5kWh - 15kWh)",
  "Monocrystalline Solar Panels (450W - 650W)",
  "Petrol Generator (Elepaq / Tiger / Firman)",
  "Soundproof Diesel Generator (10kVA - 100kVA+)",
  "Tubular Deep Cycle Battery (200Ah / 220Ah)",
  "MPPT Solar Charge Controller",
  "Complete Solar Home System Kit (Plug & Play)",
];

const POWER_BRANDS = [
  "Felicity Solar",
  "Luminous",
  "Growatt",
  "Must",
  "Elepaq",
  "Firman / Sumo",
  "Mikano / Perkins",
  "Lister Petter",
  "Prag",
  "Mercury",
  "Eastman",
  "Jinko Solar",
  "Canadian Solar",
  "Longi Solar",
  "Huawei Solar",
  "Deen Solar",
];

const POWER_FEATURES = [
  "Pure Sine Wave Output",
  "100% Copper Coil / Alternator",
  "Lithium Iron Phosphate (LifePO4)",
  "Key Starter / Remote Ignition",
  "Soundproof Enclosure Canopy",
  "Low Fuel Consumption",
  "Free Installation Rails & Cables",
  "BMS Intelligent Battery Protection",
  "Zero Noise / Clean Energy",
  "Tested & Running Smoothly",
];

export function PowerSolarGeneratorsFields({ onChange }: PowerSolarGeneratorsFieldsProps) {
  const [data, setData] = useState({
    equipmentType: "",
    customEquipmentType: "",
    brand: "",
    customBrand: "",
    capacityRating: "3.5 kVA / 5 kWh",
    fuelOrBatteryType: "Solar / Lithium Battery",
    condition: "Brand New Sealed",
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
      <h5 className="h6 fw-bold mb-3 text-dark">⚡ Solar, Inverter & Generator Specifications</h5>

      {/* EQUIPMENT TYPE & BRAND */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="power-type"
            name="equipmentType"
            label="Power System Type"
            value={data.equipmentType}
            customValue={data.customEquipmentType}
            onCustomChange={(val) => updateField("customEquipmentType", val)}
            options={POWER_EQUIPMENT_TYPES}
            placeholder="Select Power Equipment"
            allowOther
            onChange={(val) => updateField("equipmentType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <HomeBrandSelect
            id="power-brand"
            category="Power, Solar & Generators"
            label="Brand"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(val) => updateField("customBrand", val)}
            onChange={(val) => updateField("brand", val)}
          />
        </div>
      </div>

      {/* CAPACITY & FUEL/TYPE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Capacity / Rating (kVA / kW / Ah)
          </label>
          <input
            value={data.capacityRating}
            onChange={(e) => updateField("capacityRating", e.target.value)}
            placeholder="e.g. 5kVA Inverter, 10kWh Battery, 7.5kVA Generator"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="power-fuel"
            name="fuelOrBatteryType"
            label="Power Source / Technology"
            value={data.fuelOrBatteryType}
            options={[
              "Lithium LifePO4 Battery",
              "Solar Photovoltaic (Monocrystalline)",
              "Tubular Deep Cycle (Lead-Acid)",
              "Petrol Fuel (Key Start)",
              "Diesel Heavy Duty (Soundproof)",
              "Dual Fuel (Gas Carburetor Kit Installed)",
            ]}
            placeholder="Select Power Technology"
            onChange={(val) => updateField("fuelOrBatteryType", val)}
          />
        </div>
      </div>

      {/* CONDITION */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="power-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            options={[
              "Brand New Sealed (With Warranty)",
              "Foreign Used (Tokunbo Direct Tested)",
              "Nigerian Used (In Good Working Order)",
              "Refurbished with Fresh Servicing",
            ]}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Features & Installation Perks
        </label>
        <div className="d-flex flex-wrap gap-2">
          {POWER_FEATURES.map((feat) => {
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
