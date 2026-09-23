"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { PhoneBrandSelect } from "./PhoneBrandSelect";

type SmartwatchesFieldsProps = {
  onChange: (data: object) => void;
};

const WATCH_TYPES = [
  "Apple Watch (Series / Ultra / SE)",
  "Samsung Galaxy Watch",
  "Oraimo Smartwatch / Watch Pro",
  "Fitness Tracker & Smart Band",
  "Rugged Outdoor GPS Watch (Garmin / Amazfit)",
  "Kids GPS Tracking Calling Smartwatch",
  "Luxury Smartwatch",
];

const CASE_SIZES = [
  "40mm",
  "41mm",
  "42mm",
  "44mm",
  "45mm",
  "46mm",
  "47mm",
  "49mm (Apple Watch Ultra)",
  "Adjustable / Standard Band",
];

const COMPATIBILITY_OPTIONS = [
  "iOS & Android Compatible",
  "iOS (Apple iPhone Only)",
  "Android Only",
];

const CELLULAR_OPTIONS = [
  "GPS + Cellular (eSIM Supported)",
  "GPS Only (Bluetooth / WiFi)",
];

const STRAP_MATERIALS = [
  "Silicone Sport Band",
  "Ocean Band / Alpine Loop (Trail)",
  "Stainless Steel Milanese Loop",
  "Genuine Leather Strap",
  "Nylon Braided Loop",
  "Titanium Link Bracelet",
];

const WATCH_FEATURES = [
  "Heart Rate & ECG Monitor",
  "Blood Oxygen (SpO2) Sensor",
  "Sleep & Stress Tracking",
  "Bluetooth Phone Calling & Mic",
  "Water Resistant (Swimming Proof / 5ATM)",
  "Always-On Retina Display",
  "Built-in GPS Navigation",
  "Magnetic Fast Charging Cable Included",
  "Extra Replacement Straps Included",
  "Protective Case & Bumper Included",
  "Clean iCloud / No Activation Lock",
  "100% Battery Health",
  "Original Box Included",
];

export function SmartwatchesFields({ onChange }: SmartwatchesFieldsProps) {
  const [data, setData] = useState({
    brand: "",
    customBrand: "",
    watchType: "",
    customWatchType: "",
    model: "",
    condition: "",
    customCondition: "",
    caseSize: "",
    customCaseSize: "",
    connectivity: "",
    customConnectivity: "",
    compatibility: "",
    customCompatibility: "",
    strapMaterial: "",
    customStrapMaterial: "",
    batteryLife: "",
    customBatteryLife: "",
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
        <span className="fs-5">⌚</span>
        <h5 className="h6 fw-bold mb-0 text-dark">
          Smartwatches & Trackers Details
        </h5>
      </div>

      <div className="row g-3 mb-4">
        {/* BRAND */}
        <div className="col-12 col-md-6">
          <PhoneBrandSelect
            category="Smartwatches"
            label="Smartwatch Brand"
            value={data.brand}
            onChange={(val: string) => updateField("brand", val)}
            customValue={data.customBrand}
            onCustomChange={(val: string) => updateField("customBrand", val)}
          />
        </div>

        {/* WATCH TYPE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-type"
            name="watchType"
            label="Watch Type"
            value={data.watchType}
            customValue={data.customWatchType}
            onCustomChange={(val: string) => updateField("customWatchType", val)}
            options={WATCH_TYPES}
            placeholder="Select Watch Category"
            allowOther
            onChange={(val: string) => updateField("watchType", val)}
          />
        </div>

        {/* MODEL */}
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1" style={{ fontSize: "12.5px" }}>
            Model & Series
          </label>
          <input
            type="text"
            value={data.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="e.g. Apple Watch Ultra 2, Galaxy Watch 6 Classic, Oraimo Watch 4 Plus"
            className="form-control"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>

        {/* CONDITION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            customValue={data.customCondition}
            onCustomChange={(val: string) => updateField("customCondition", val)}
            options={[
              "Brand New (Factory Sealed Box)",
              "Open Box (Unused)",
              "Foreign Used / UK Used (Grade A - Spotless)",
              "Foreign Used / UK Used (Grade B)",
              "Nigerian Used (Clean / Fully Working)",
            ]}
            placeholder="Select Condition"
            allowOther
            onChange={(val: string) => updateField("condition", val)}
          />
        </div>

        {/* CASE SIZE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-case-size"
            name="caseSize"
            label="Case Size (mm)"
            value={data.caseSize}
            customValue={data.customCaseSize}
            onCustomChange={(val: string) => updateField("customCaseSize", val)}
            options={CASE_SIZES}
            placeholder="Select Case Size"
            allowOther
            onChange={(val: string) => updateField("caseSize", val)}
          />
        </div>

        {/* CELLULAR / CONNECTIVITY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-cellular"
            name="connectivity"
            label="Cellular / Network Mode"
            value={data.connectivity}
            customValue={data.customConnectivity}
            onCustomChange={(val: string) => updateField("customConnectivity", val)}
            options={CELLULAR_OPTIONS}
            placeholder="Select Connectivity"
            allowOther
            onChange={(val: string) => updateField("connectivity", val)}
          />
        </div>

        {/* COMPATIBILITY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-compatibility"
            name="compatibility"
            label="Phone Compatibility"
            value={data.compatibility}
            customValue={data.customCompatibility}
            onCustomChange={(val: string) => updateField("customCompatibility", val)}
            options={COMPATIBILITY_OPTIONS}
            placeholder="Select Compatibility"
            allowOther
            onChange={(val: string) => updateField("compatibility", val)}
          />
        </div>

        {/* STRAP MATERIAL */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-strap"
            name="strapMaterial"
            label="Strap Material"
            value={data.strapMaterial}
            customValue={data.customStrapMaterial}
            onCustomChange={(val: string) => updateField("customStrapMaterial", val)}
            options={STRAP_MATERIALS}
            placeholder="Select Strap"
            allowOther
            onChange={(val: string) => updateField("strapMaterial", val)}
          />
        </div>

        {/* COLOR */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-color"
            name="color"
            label="Color / Finish"
            value={data.color}
            customValue={data.customColor}
            onCustomChange={(val: string) => updateField("customColor", val)}
            options={["Midnight / Matte Black", "Natural Titanium", "Silver / Stainless Steel", "Starlight / Gold", "Rose Gold", "Graphite / Space Gray", "Orange (Ultra Loop)"]}
            placeholder="Select Color"
            allowOther
            onChange={(val: string) => updateField("color", val)}
          />
        </div>
      </div>

      {/* WATCH FEATURES */}
      <div className="mt-4">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Sensors, Functions & Inclusions
        </label>
        <div className="d-flex flex-wrap gap-2">
          {WATCH_FEATURES.map((feature) => {
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
