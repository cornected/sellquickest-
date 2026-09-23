"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { ElectronicsBrandSelect } from "./ElectronicsBrandSelect";

type TVVideoFieldsProps = {
  onChange: (data: object) => void;
};

const TV_BRANDS = [
  "Samsung",
  "LG",
  "Hisense",
  "Sony",
  "TCL",
  "Panasonic",
  "Toshiba",
  "Xiaomi",
  "Polystar",
  "Maxi",
  "Bruhm",
  "Syinix",
  "Haier Thermocool",
  "Royal",
  "Nexus",
  "Sharp",
];

const SCREEN_SIZES = [
  "24 - 32 inches (Compact)",
  "40 - 43 inches (Standard)",
  "50 - 55 inches (Popular Living Room)",
  "65 inches (Large Theater)",
  "75 inches (Ultra Large)",
  "85+ inches (Cinema Giant)",
];

const DISPLAY_TECHS = [
  "4K Ultra HD (Smart TV)",
  "OLED / QD-OLED (True Black)",
  "QLED / Mini-LED (Ultra Bright)",
  "Full HD (1080p Smart)",
  "Standard HD LED",
  "Curved Display",
];

const TV_FEATURES = [
  "Smart TV (Netflix, YouTube, Prime)",
  "Built-in WiFi & Bluetooth",
  "4K UHD Resolution",
  "HDR10+ / Dolby Vision",
  "Dolby Atmos Audio",
  "HDMI 2.1 (120Hz Gaming)",
  "Wall Bracket & Screws Included",
  "Original Magic Remote Included",
  "Original Box & Packaging",
  "Satellite / Terrestrial Tuner (T2/S2)",
];

export function TVVideoFields({ onChange }: TVVideoFieldsProps) {
  const [data, setData] = useState({
    brand: "",
    customBrand: "",
    model: "",
    screenSize: "",
    displayTech: "",
    customDisplayTech: "",
    condition: "Foreign Used (UK / Tokunbo)",
    refreshRate: "60 Hz",
    hdmiPorts: "3 - 4 Ports",
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
      <h5 className="h6 fw-bold mb-3 text-dark">📺 Television & Video Specifications</h5>

      {/* BRAND & MODEL */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <ElectronicsBrandSelect
            id="tv-brand"
            category="TV & DVD Equipment"
            label="Brand"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(val) => updateField("customBrand", val)}
            onChange={(val) => updateField("brand", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Model / Series
          </label>
          <input
            value={data.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="e.g. Crystal UHD CU7000 / C3 OLED / A6K"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* SCREEN SIZE & DISPLAY TECH */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="tv-size"
            name="screenSize"
            label="Screen Size"
            value={data.screenSize}
            options={SCREEN_SIZES}
            placeholder="Select Screen Size"
            onChange={(val) => updateField("screenSize", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="tv-display"
            name="displayTech"
            label="Display Type & Resolution"
            value={data.displayTech}
            customValue={data.customDisplayTech}
            onCustomChange={(val) => updateField("customDisplayTech", val)}
            options={DISPLAY_TECHS}
            placeholder="Select Display Resolution"
            allowOther
            onChange={(val) => updateField("displayTech", val)}
          />
        </div>
      </div>

      {/* CONDITION & PORTS */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="tv-condition"
            name="condition"
            label="Item Condition"
            value={data.condition}
            options={[
              "Brand New Sealed",
              "Foreign Used (UK / Tokunbo)",
              "Nigerian Used (Clean)",
              "Open Box / Display Unit",
              "For Parts / Screen Fault",
            ]}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="tv-refresh"
            name="refreshRate"
            label="Refresh Rate"
            value={data.refreshRate}
            options={["60 Hz (Standard)", "120 Hz (Gaming / Sports)", "144 Hz+"]}
            placeholder="Select Refresh Rate"
            onChange={(val) => updateField("refreshRate", val)}
          />
        </div>
      </div>

      {/* KEY FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Key Features & Package Inclusions
        </label>
        <div className="d-flex flex-wrap gap-2">
          {TV_FEATURES.map((feat) => {
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
