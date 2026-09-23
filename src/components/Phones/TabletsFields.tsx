"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { PhoneBrandSelect } from "./PhoneBrandSelect";

type TabletsFieldsProps = {
  onChange: (data: object) => void;
};

const TABLET_TYPES = [
  "Apple iPad Pro (M1 / M2 / M4)",
  "Apple iPad Air",
  "Apple iPad (Standard 9th/10th Gen)",
  "Apple iPad Mini",
  "Samsung Galaxy Tab S (S9 / S8 / S7 Series)",
  "Samsung Galaxy Tab A Series (Budget)",
  "Lenovo Android Tablet",
  "Amazon Fire HD Tablet (Kids / Adults)",
  "Microsoft Surface Pro (Windows 2-in-1)",
  "Kids Educational Tablet (Preloaded with Games & Learning Apps)",
  "Graphics Drawing Tablet (Wacom / Huion)",
];

const SCREEN_SIZES = [
  "7.0 - 8.9 inches (Compact / Mini)",
  "10.0 - 10.9 inches (Standard)",
  "11.0 - 11.9 inches",
  "12.0 - 12.9 inches (Large Display)",
  "13.0 inches and above",
];

const CONNECTIVITY_TYPES = [
  "WiFi + Cellular (SIM Card Supported)",
  "WiFi Only (No SIM Tray)",
];

const TABLET_FEATURES = [
  "Stylus Pen / Apple Pencil Included",
  "Magnetic Keyboard Case Included",
  "Original Charger & Cable",
  "Kids Shockproof Bumper Case Included",
  "Screen Protector Pre-Installed",
  "Preloaded Educational Learning Apps",
  "Clean iCloud / No Locks",
  "100% Battery Health",
  "Original Box Included",
  "SIM Card Enabled for Calls & Data",
];

export function TabletsFields({ onChange }: TabletsFieldsProps) {
  const [data, setData] = useState({
    brand: "",
    customBrand: "",
    tabletType: "",
    customTabletType: "",
    model: "",
    condition: "",
    customCondition: "",
    screenSize: "",
    customScreenSize: "",
    storage: "",
    customStorage: "",
    ram: "",
    customRam: "",
    connectivity: "",
    customConnectivity: "",
    operatingSystem: "",
    customOperatingSystem: "",
    batteryHealth: "",
    customBatteryHealth: "",
    color: "",
    customColor: "",
    features: [] as string[],
  });

  const updateField = (key: string, value: any) => {
    const updated = {
      ...data,
      [key]: value,
    };
    setData(updated);
    onChange(updated);
  };

  const toggleFeature = (feature: string) => {
    const current = data.features || [];
    const updated = current.includes(feature)
      ? current.filter((item: string) => item !== feature)
      : [...current, feature];
    updateField("features", updated);
  };

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="fs-5">📟</span>
        <h5 className="h6 fw-bold mb-0 text-dark">Tablets & iPads Details</h5>
      </div>

      <div className="row g-3 mb-4">
        {/* BRAND */}
        <div className="col-12 col-md-6">
          <PhoneBrandSelect
            category="Tablets"
            label="Tablet Brand / Maker"
            value={data.brand}
            onChange={(val: string) => updateField("brand", val)}
            customValue={data.customBrand}
            onCustomChange={(val: string) => updateField("customBrand", val)}
          />
        </div>

        {/* TABLET TYPE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="tablet-type"
            name="tabletType"
            label="Tablet Category"
            value={data.tabletType}
            customValue={data.customTabletType}
            onCustomChange={(val: string) => updateField("customTabletType", val)}
            options={TABLET_TYPES}
            placeholder="Select Tablet Type"
            allowOther
            onChange={(val: string) => updateField("tabletType", val)}
          />
        </div>

        {/* MODEL */}
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1" style={{ fontSize: "12.5px" }}>
            Model & Generation
          </label>
          <input
            type="text"
            value={data.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="e.g. iPad Pro 11-inch M2, Galaxy Tab S9 FE+, Fire HD 10"
            className="form-control"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>

        {/* CONDITION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="tablet-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            customValue={data.customCondition}
            onCustomChange={(val: string) => updateField("customCondition", val)}
            options={[
              "Brand New (Factory Sealed Box)",
              "Open Box (Brand New / Never Used)",
              "Foreign Used / UK Used (Grade A - Spotless)",
              "Foreign Used / UK Used (Grade B)",
              "Nigerian Used (Clean & Fully Functional)",
              "For Parts / Damaged Screen",
            ]}
            placeholder="Select Condition"
            allowOther
            onChange={(val: string) => updateField("condition", val)}
          />
        </div>

        {/* SCREEN SIZE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="tablet-screen-size"
            name="screenSize"
            label="Screen Size"
            value={data.screenSize}
            customValue={data.customScreenSize}
            onCustomChange={(val: string) => updateField("customScreenSize", val)}
            options={SCREEN_SIZES}
            placeholder="Select Screen Size"
            allowOther
            onChange={(val: string) => updateField("screenSize", val)}
          />
        </div>

        {/* CONNECTIVITY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="tablet-connectivity"
            name="connectivity"
            label="Connectivity (SIM Support)"
            value={data.connectivity}
            customValue={data.customConnectivity}
            onCustomChange={(val: string) => updateField("customConnectivity", val)}
            options={CONNECTIVITY_TYPES}
            placeholder="Select Connectivity"
            allowOther
            onChange={(val: string) => updateField("connectivity", val)}
          />
        </div>

        {/* STORAGE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="tablet-storage"
            name="storage"
            label="Internal Storage"
            value={data.storage}
            customValue={data.customStorage}
            onCustomChange={(val: string) => updateField("customStorage", val)}
            options={["16 GB", "32 GB", "64 GB", "128 GB", "256 GB", "512 GB", "1 TB", "2 TB"]}
            placeholder="Select Storage"
            allowOther
            onChange={(val: string) => updateField("storage", val)}
          />
        </div>

        {/* RAM */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="tablet-ram"
            name="ram"
            label="RAM Memory"
            value={data.ram}
            customValue={data.customRam}
            onCustomChange={(val: string) => updateField("customRam", val)}
            options={["2 GB", "3 GB", "4 GB", "6 GB", "8 GB", "12 GB", "16 GB"]}
            placeholder="Select RAM"
            allowOther
            onChange={(val: string) => updateField("ram", val)}
          />
        </div>

        {/* OPERATING SYSTEM */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="tablet-os"
            name="operatingSystem"
            label="Operating System"
            value={data.operatingSystem}
            customValue={data.customOperatingSystem}
            onCustomChange={(val: string) => updateField("customOperatingSystem", val)}
            options={["iPadOS (Apple)", "Android", "Fire OS (Amazon)", "Windows 11"]}
            placeholder="Select OS"
            allowOther
            onChange={(val: string) => updateField("operatingSystem", val)}
          />
        </div>

        {/* COLOR */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="tablet-color"
            name="color"
            label="Tablet Color"
            value={data.color}
            customValue={data.customColor}
            onCustomChange={(val: string) => updateField("customColor", val)}
            options={["Space Gray", "Silver", "Starlight", "Rose Gold / Pink", "Sky Blue", "Midnight Black", "Graphite"]}
            placeholder="Select Color"
            allowOther
            onChange={(val: string) => updateField("color", val)}
          />
        </div>
      </div>

      {/* TABLET FEATURES / ACCESSORIES */}
      <div className="mt-4">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Tablet Inclusions & Accessories
        </label>
        <div className="d-flex flex-wrap gap-2">
          {TABLET_FEATURES.map((feature) => {
            const isSelected = (data.features || []).includes(feature);
            return (
              <button
                key={feature}
                type="button"
                onClick={() => toggleFeature(feature)}
                className={`btn btn-sm ${
                  isSelected
                    ? "btn-success text-white fw-semibold shadow-sm"
                    : "btn-light text-secondary border border-light-subtle"
                }`}
                style={{
                  borderRadius: "20px",
                  fontSize: "12px",
                  padding: "6px 14px",
                  transition: "all 0.15s ease",
                }}
              >
                {isSelected ? "✓ " : "+ "}
                {feature}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
