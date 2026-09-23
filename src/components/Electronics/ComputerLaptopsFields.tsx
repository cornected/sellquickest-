"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { ElectronicsBrandSelect } from "./ElectronicsBrandSelect";

type ComputerLaptopsFieldsProps = {
  onChange: (data: object) => void;
};

const LAPTOP_BRANDS = [
  "Apple",
  "HP",
  "Dell",
  "Lenovo",
  "Asus",
  "Acer",
  "Microsoft",
  "MSI",
  "Samsung",
  "Toshiba",
  "Huawei",
  "Razer",
  "Alienware",
];

const PROCESSORS = [
  "Apple M3 / M3 Pro / M3 Max",
  "Apple M2 / M2 Pro / M2 Max",
  "Apple M1 / M1 Pro / M1 Max",
  "Intel Core i9 (13th/14th Gen)",
  "Intel Core i7 (11th - 14th Gen)",
  "Intel Core i5 (10th - 14th Gen)",
  "Intel Core i3",
  "AMD Ryzen 9",
  "AMD Ryzen 7",
  "AMD Ryzen 5",
  "Intel Celeron / Dual Core",
];

const RAM_CAPACITIES = [
  "4 GB",
  "8 GB",
  "16 GB (Recommended)",
  "24 GB",
  "32 GB (High Performance)",
  "64 GB+",
];

const STORAGE_CAPACITIES = [
  "128 GB SSD",
  "256 GB SSD",
  "512 GB SSD (High Speed)",
  "1 TB (1000 GB) SSD",
  "2 TB SSD",
  "500 GB HDD",
  "1 TB HDD",
  "Hybrid SSD + HDD",
];

const LAPTOP_FEATURES = [
  "Backlit Keyboard",
  "Touchscreen Display",
  "Fingerprint Reader / Touch ID",
  "Face Unlock (Windows Hello)",
  "Dedicated NVIDIA / AMD Graphics",
  "Original Follow-Come Charger",
  "Battery Holds 4+ Hours",
  "Thunderbolt / USB-C Fast Charging",
  "Original Box Included",
  "Pre-installed Windows 11 / macOS",
];

export function ComputerLaptopsFields({ onChange }: ComputerLaptopsFieldsProps) {
  const [data, setData] = useState({
    brand: "",
    customBrand: "",
    model: "",
    processor: "",
    customProcessor: "",
    ram: "16 GB (Recommended)",
    storage: "512 GB SSD (High Speed)",
    screenSize: "14.0 - 14.9 inches",
    condition: "Foreign Used (UK / Tokunbo)",
    gpu: "Integrated Graphics",
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
      <h5 className="h6 fw-bold mb-3 text-dark">💻 Computer & Laptop Specifications</h5>

      {/* BRAND & MODEL */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <ElectronicsBrandSelect
            id="laptop-brand"
            category="Laptops & Computers"
            label="Brand"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(val) => updateField("customBrand", val)}
            onChange={(val) => updateField("brand", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Model / Edition
          </label>
          <input
            value={data.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="e.g. MacBook Pro M2, Dell XPS 13, HP EliteBook 840 G8"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* PROCESSOR & RAM */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="laptop-processor"
            name="processor"
            label="Processor (CPU)"
            value={data.processor}
            customValue={data.customProcessor}
            onCustomChange={(val) => updateField("customProcessor", val)}
            options={PROCESSORS}
            placeholder="Select Processor"
            allowOther
            onChange={(val) => updateField("processor", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="laptop-ram"
            name="ram"
            label="Memory (RAM)"
            value={data.ram}
            options={RAM_CAPACITIES}
            placeholder="Select RAM"
            onChange={(val) => updateField("ram", val)}
          />
        </div>
      </div>

      {/* STORAGE & SCREEN SIZE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="laptop-storage"
            name="storage"
            label="Storage Drive"
            value={data.storage}
            options={STORAGE_CAPACITIES}
            placeholder="Select Storage"
            onChange={(val) => updateField("storage", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="laptop-screen"
            name="screenSize"
            label="Screen Size"
            value={data.screenSize}
            options={[
              "11.6 - 12.5 inches (Ultra Portable)",
              "13.0 - 13.6 inches (MacBook / Ultrabook)",
              "14.0 - 14.9 inches (Popular Standard)",
              "15.6 inches (Standard Full Keyboard)",
              "16.0 - 17.3 inches (Workstation / Gaming)",
              "24 - 32 inches (Desktop Monitor / All-in-One)",
            ]}
            placeholder="Select Screen Size"
            onChange={(val) => updateField("screenSize", val)}
          />
        </div>
      </div>

      {/* CONDITION & GRAPHICS */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="laptop-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            options={[
              "Brand New Sealed",
              "Foreign Used (UK / Tokunbo)",
              "Nigerian Used (Clean & Tested)",
              "Refurbished Grade A",
              "For Parts / Repair",
            ]}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="laptop-gpu"
            name="gpu"
            label="Graphics (GPU)"
            value={data.gpu}
            options={[
              "Integrated Graphics (Intel Iris / AMD Radeon)",
              "Apple Silicon Unified GPU",
              "NVIDIA GeForce RTX 40-Series (Gaming)",
              "NVIDIA GeForce RTX 30-Series (Gaming)",
              "NVIDIA GeForce GTX Series",
              "Dedicated Workstation GPU",
            ]}
            placeholder="Select GPU"
            onChange={(val) => updateField("gpu", val)}
          />
        </div>
      </div>

      {/* KEY FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Features & Inclusions
        </label>
        <div className="d-flex flex-wrap gap-2">
          {LAPTOP_FEATURES.map((feat) => {
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
