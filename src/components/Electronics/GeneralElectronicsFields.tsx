"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { ElectronicsBrandSelect } from "./ElectronicsBrandSelect";

type GeneralElectronicsFieldsProps = {
  onChange: (data: object) => void;
  title?: string;
  defaultDeviceType?: string;
};

const COMMON_ELECTRONICS_FEATURES = [
  "Plug and Play Setup",
  "Wireless / WiFi Connectivity",
  "Rechargeable Battery / Solar Option",
  "High Speed USB 3.0 / USB-C",
  "Original Power Adapter Included",
  "Warranty / Guarantee Included",
  "Brand New in Box",
  "Heavy Duty Industrial Grade",
  "Remote App Monitoring",
  "Complete Cables & Installation Kit Included",
];

export function GeneralElectronicsFields({
  onChange,
  title = "Device Specifications",
  defaultDeviceType = "",
}: GeneralElectronicsFieldsProps) {
  const [data, setData] = useState({
    deviceType: defaultDeviceType,
    customDeviceType: "",
    brand: "",
    customBrand: "",
    model: "",
    connectivity: "Wireless / WiFi + Cable",
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
      <h5 className="h6 fw-bold mb-3 text-dark">🔌 {title}</h5>

      {/* BRAND & TYPE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Device Type / Specific Name
          </label>
          <input
            value={data.deviceType}
            onChange={(e) => updateField("deviceType", e.target.value)}
            placeholder="e.g. 4-Channel Solar CCTV, Thermal POS Printer, External 2TB SSD"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
        <div className="col-12 col-md-6">
          <ElectronicsBrandSelect
            id="gen-elec-brand"
            category="General Specifications"
            label="Brand / Manufacturer"
            value={data.brand}
            onChange={(val) => updateField("brand", val)}
          />
        </div>
      </div>

      {/* CONDITION & CONNECTIVITY */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="gen-elec-cond"
            name="condition"
            label="Condition"
            value={data.condition}
            options={[
              "Brand New Sealed",
              "Foreign Used (UK / Tokunbo)",
              "Nigerian Used (Tested Working)",
              "Open Box",
            ]}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="gen-elec-conn"
            name="connectivity"
            label="Connectivity / Interface"
            value={data.connectivity}
            options={[
              "Wireless / WiFi + Cable",
              "Bluetooth Wireless",
              "USB-C / USB 3.0",
              "Ethernet LAN (RJ45)",
              "Solar Powered + 4G SIM",
              "Standalone Plug & Play",
            ]}
            placeholder="Select Interface"
            onChange={(val) => updateField("connectivity", val)}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Key Features & Accessories
        </label>
        <div className="d-flex flex-wrap gap-2">
          {COMMON_ELECTRONICS_FEATURES.map((feat) => {
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
