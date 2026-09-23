"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { PhoneBrandSelect } from "./PhoneBrandSelect";
import { PhoneFeatures } from "./PhoneFeatures";

type MobilePhonesFieldsProps = {
  onChange: (data: object) => void;
};

const STORAGE_CAPACITIES = [
  "16 GB",
  "32 GB",
  "64 GB",
  "128 GB",
  "256 GB",
  "512 GB",
  "1 TB (1024 GB)",
  "2 TB",
];

const RAM_OPTIONS = [
  "1 GB",
  "2 GB",
  "3 GB",
  "4 GB",
  "6 GB",
  "8 GB",
  "12 GB",
  "16 GB",
  "24 GB",
];

const OPERATING_SYSTEMS = [
  "iOS (Apple)",
  "Android",
  "HarmonyOS (Huawei)",
  "KaiOS (Feature Phone)",
];

const PHONE_CONDITIONS = [
  "Brand New (Factory Sealed Box)",
  "Open Box (Unused / Display Unit)",
  "Foreign Used / UK Used (Grade A - Flawless)",
  "Foreign Used / UK Used (Grade B - Minor Signs of Wear)",
  "Nigerian Used (Clean / Fully Functional)",
  "Refurbished (Certified Factory Spec)",
  "For Parts / Repair (Screen or Board Issue)",
];

const BATTERY_HEALTH_OPTIONS = [
  "100% (Brand New Battery)",
  "95% - 99%",
  "90% - 94%",
  "85% - 89%",
  "80% - 84%",
  "Below 80% (Service Recommended)",
  "5000 mAh+ (Android All-Day Battery)",
  "6000 mAh+ (Massive Battery)",
  "Brand New Replacement Battery Installed",
];

const SIM_CONFIGURATIONS = [
  "Dual Physical SIM (Nano-SIM + Nano-SIM)",
  "Single SIM (1 Physical Nano-SIM)",
  "Physical SIM + eSIM",
  "Dual eSIM (US Spec / No Physical Tray)",
  "Triple SIM / Quad SIM (Feature Phone)",
];

const NETWORK_MODES = [
  "5G + 4G LTE Supported",
  "4G LTE",
  "3G / 2G (Feature Phone)",
];

const LOCK_STATUSES = [
  "Factory Unlocked (Works on MTN, Airtel, Glo, 9mobile Worldwide)",
  "Chip Unlocked (RSIM / Gevey)",
  "Network Carrier Locked",
];

const SCREEN_CONDITIONS = [
  "Original Factory Screen (True Tone / 120Hz Working)",
  "Replaced Original Screen",
  "Replaced OLED / Incell Screen",
  "Cracked Glass but Touch Working 100%",
  "Flawless Spotless Screen (No Scratches)",
];

export function MobilePhonesFields({ onChange }: MobilePhonesFieldsProps) {
  const [data, setData] = useState({
    brand: "",
    customBrand: "",
    model: "",
    condition: "",
    customCondition: "",
    storage: "",
    customStorage: "",
    ram: "",
    customRam: "",
    operatingSystem: "",
    customOperatingSystem: "",
    batteryHealth: "",
    customBatteryHealth: "",
    simConfig: "",
    customSimConfig: "",
    network: "",
    customNetwork: "",
    lockStatus: "",
    customLockStatus: "",
    color: "",
    customColor: "",
    screenCondition: "",
    customScreenCondition: "",
    faceIdTouchId: "",
    customFaceIdTouchId: "",
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

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="fs-5">📱</span>
        <h5 className="h6 fw-bold mb-0 text-dark">
          Mobile Phone Specifications
        </h5>
      </div>

      <div className="row g-3 mb-4">
        {/* BRAND */}
        <div className="col-12 col-md-6">
          <PhoneBrandSelect
            category="Mobile Phones"
            label="Phone Brand / Manufacturer"
            value={data.brand}
            onChange={(val: string) => updateField("brand", val)}
            customValue={data.customBrand}
            onCustomChange={(val: string) => updateField("customBrand", val)}
          />
        </div>

        {/* MODEL INPUT */}
        <div className="col-12 col-md-6">
          <label
            className="form-label text-secondary small fw-semibold mb-1"
            style={{ fontSize: "12.5px" }}
          >
            Model & Variant
          </label>
          <input
            type="text"
            value={data.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="e.g. iPhone 15 Pro Max, Galaxy S24 Ultra, Camon 30 Pro"
            className="form-control"
            style={{
              borderRadius: "8px",
              fontSize: "13px",
              minHeight: "42px",
            }}
          />
        </div>

        {/* CONDITION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="phone-condition"
            name="condition"
            label="Phone Condition"
            value={data.condition}
            customValue={data.customCondition}
            onCustomChange={(val: string) => updateField("customCondition", val)}
            options={PHONE_CONDITIONS}
            placeholder="Select Condition"
            allowOther
            onChange={(val: string) => updateField("condition", val)}
          />
        </div>

        {/* INTERNAL STORAGE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="phone-storage"
            name="storage"
            label="Internal Storage Capacity"
            value={data.storage}
            customValue={data.customStorage}
            onCustomChange={(val: string) => updateField("customStorage", val)}
            options={STORAGE_CAPACITIES}
            placeholder="Select Storage"
            allowOther
            onChange={(val: string) => updateField("storage", val)}
          />
        </div>

        {/* RAM */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="phone-ram"
            name="ram"
            label="RAM Memory"
            value={data.ram}
            customValue={data.customRam}
            onCustomChange={(val: string) => updateField("customRam", val)}
            options={RAM_OPTIONS}
            placeholder="Select RAM"
            allowOther
            onChange={(val: string) => updateField("ram", val)}
          />
        </div>

        {/* OPERATING SYSTEM */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="phone-os"
            name="operatingSystem"
            label="Operating System"
            value={data.operatingSystem}
            customValue={data.customOperatingSystem}
            onCustomChange={(val: string) => updateField("customOperatingSystem", val)}
            options={OPERATING_SYSTEMS}
            placeholder="Select OS"
            allowOther
            onChange={(val: string) => updateField("operatingSystem", val)}
          />
        </div>

        {/* BATTERY HEALTH / CAPACITY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="phone-battery"
            name="batteryHealth"
            label="Battery Health / Capacity"
            value={data.batteryHealth}
            customValue={data.customBatteryHealth}
            onCustomChange={(val: string) => updateField("customBatteryHealth", val)}
            options={BATTERY_HEALTH_OPTIONS}
            placeholder="Select Battery Health"
            allowOther
            onChange={(val: string) => updateField("batteryHealth", val)}
          />
        </div>

        {/* SIM CONFIGURATION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="phone-sim"
            name="simConfig"
            label="SIM Configuration"
            value={data.simConfig}
            customValue={data.customSimConfig}
            onCustomChange={(val: string) => updateField("customSimConfig", val)}
            options={SIM_CONFIGURATIONS}
            placeholder="Select SIM Slots"
            allowOther
            onChange={(val: string) => updateField("simConfig", val)}
          />
        </div>

        {/* NETWORK CONNECTIVITY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="phone-network"
            name="network"
            label="Network Connectivity"
            value={data.network}
            customValue={data.customNetwork}
            onCustomChange={(val: string) => updateField("customNetwork", val)}
            options={NETWORK_MODES}
            placeholder="Select Network Generation"
            allowOther
            onChange={(val: string) => updateField("network", val)}
          />
        </div>

        {/* CARRIER / UNLOCK STATUS */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="phone-lock-status"
            name="lockStatus"
            label="Carrier / Unlock Status"
            value={data.lockStatus}
            customValue={data.customLockStatus}
            onCustomChange={(val: string) => updateField("customLockStatus", val)}
            options={LOCK_STATUSES}
            placeholder="Select Unlock Status"
            allowOther
            onChange={(val: string) => updateField("lockStatus", val)}
          />
        </div>

        {/* SCREEN CONDITION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="phone-screen"
            name="screenCondition"
            label="Display / Screen Condition"
            value={data.screenCondition}
            customValue={data.customScreenCondition}
            onCustomChange={(val: string) => updateField("customScreenCondition", val)}
            options={SCREEN_CONDITIONS}
            placeholder="Select Screen State"
            allowOther
            onChange={(val: string) => updateField("screenCondition", val)}
          />
        </div>

        {/* BIOMETRIC SENSORS */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="phone-biometrics"
            name="faceIdTouchId"
            label="Face ID / Fingerprint Status"
            value={data.faceIdTouchId}
            customValue={data.customFaceIdTouchId}
            onCustomChange={(val: string) => updateField("customFaceIdTouchId", val)}
            options={[
              "Face ID Working 100%",
              "Fingerprint Sensor Working 100%",
              "Both Face ID and Fingerprint Working",
              "Face ID Not Working (Unavailable)",
              "Fingerprint Not Working",
              "Passcode Only (No Biometrics)",
            ]}
            placeholder="Select Biometric Status"
            allowOther
            onChange={(val: string) => updateField("faceIdTouchId", val)}
          />
        </div>

        {/* DEVICE COLOR */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="phone-color"
            name="color"
            label="Device Color"
            value={data.color}
            customValue={data.customColor}
            onCustomChange={(val: string) => updateField("customColor", val)}
            options={[
              "Natural Titanium",
              "Black Titanium / Space Black",
              "White Titanium / Silver",
              "Blue Titanium / Deep Blue",
              "Midnight / Jet Black",
              "Starlight / Pearl White",
              "Deep Purple",
              "Graphite",
              "Gold",
              "Rose Gold",
              "Phantom Black",
              "Titanium Gray",
              "Emerald Green",
              "Cream / Beige",
            ]}
            placeholder="Select Color"
            allowOther
            onChange={(val: string) => updateField("color", val)}
          />
        </div>
      </div>

      {/* HIGHLIGHTS / INCLUSIONS */}
      <PhoneFeatures data={data} updateField={updateField} />
    </section>
  );
}
