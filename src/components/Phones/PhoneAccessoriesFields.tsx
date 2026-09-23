"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { PhoneBrandSelect } from "./PhoneBrandSelect";

type PhoneAccessoriesFieldsProps = {
  onChange: (data: object) => void;
};

const ACCESSORY_TYPES = [
  "AirPods & Wireless Earbuds",
  "Wired Earphones & Headsets",
  "Power Banks & Portable Chargers",
  "Wall Chargers & Fast Charging Adapters (20W, 65W, 100W)",
  "Charging Cables (Type-C, Lightning, Micro-USB)",
  "MagSafe Wireless Chargers & Power Banks",
  "Phone Protective Cases, Pouches & Covers",
  "Tempered Glass Screen & Camera Protectors",
  "Car Phone Mounts, Chargers & Bluetooth Transmitters",
  "OTG Adapters, Flash Drives & SD Cards",
  "Replacement Screens (Original / Incell / OLED)",
  "Replacement Batteries (iPhone / Samsung / Transsion)",
  "Charging Port / Flex Cables / Housing Replacement",
  "Stylus Pens (Apple Pencil / S-Pen / Universal)",
  "Mobile Gaming Triggers & Phone Coolers",
  "Gimbals & Tripods for Content Creation",
];

const COMPATIBLE_BRANDS = [
  "Apple iPhone / iPad",
  "Samsung Galaxy",
  "Google Pixel",
  "Tecno & Infinix",
  "Xiaomi & Redmi",
  "Universal (All Smartphones)",
  "Type-C Devices",
];

const FAST_CHARGING_STANDARDS = [
  "Not Applicable / Standard",
  "20W Fast Charging (Apple Standard)",
  "25W / 45W Super Fast Charging (Samsung)",
  "33W / 67W / 120W HyperCharge (Xiaomi/Tecno)",
  "65W / 100W GaN PD Fast Charging",
  "15W MagSafe Magnetic Wireless Charging",
];

const POWERBANK_CAPACITIES = [
  "Not Applicable",
  "5,000 mAh (Slim / MagSafe Battery Pack)",
  "10,000 mAh (Standard Pocket Size)",
  "20,000 mAh (Heavy Duty Fast Charge)",
  "30,000 mAh (Extended Travel)",
  "40,000 - 60,000 mAh (High Power Station)",
];

export function PhoneAccessoriesFields({
  onChange,
}: PhoneAccessoriesFieldsProps) {
  const [data, setData] = useState({
    brand: "",
    customBrand: "",
    accessoryType: "",
    customAccessoryType: "",
    modelTitle: "",
    condition: "",
    customCondition: "",
    compatibleFor: "",
    customCompatibleFor: "",
    chargingSpeed: "",
    customChargingSpeed: "",
    powerBankCapacity: "",
    customPowerBankCapacity: "",
    connectivity: "",
    customConnectivity: "",
    color: "",
    customColor: "",
    warrantyIncluded: "",
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
        <span className="fs-5">🎧</span>
        <h5 className="h6 fw-bold mb-0 text-dark">
          Mobile Accessories & Spares Details
        </h5>
      </div>

      <div className="row g-3 mb-4">
        {/* BRAND */}
        <div className="col-12 col-md-6">
          <PhoneBrandSelect
            category="Accessories"
            label="Accessory Brand / Maker"
            value={data.brand}
            onChange={(val: string) => updateField("brand", val)}
            customValue={data.customBrand}
            onCustomChange={(val: string) => updateField("customBrand", val)}
          />
        </div>

        {/* ACCESSORY TYPE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="accessory-type"
            name="accessoryType"
            label="Accessory Category"
            value={data.accessoryType}
            customValue={data.customAccessoryType}
            onCustomChange={(val: string) => updateField("customAccessoryType", val)}
            options={ACCESSORY_TYPES}
            placeholder="Select Accessory Type"
            allowOther
            onChange={(val: string) => updateField("accessoryType", val)}
          />
        </div>

        {/* PRODUCT MODEL / TITLE */}
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1" style={{ fontSize: "12.5px" }}>
            Specific Item Name / Model
          </label>
          <input
            type="text"
            value={data.modelTitle}
            onChange={(e) => updateField("modelTitle", e.target.value)}
            placeholder="e.g. AirPods Pro 2nd Gen, Oraimo FreePods 4, 65W GaN Charger"
            className="form-control"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>

        {/* CONDITION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="accessory-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            customValue={data.customCondition}
            onCustomChange={(val: string) => updateField("customCondition", val)}
            options={[
              "Brand New (Factory Sealed in Box)",
              "Open Box / Unused",
              "Foreign Used / UK Used (Grade A Flawless)",
              "Nigerian Used (Working 100%)",
            ]}
            placeholder="Select Condition"
            allowOther
            onChange={(val: string) => updateField("condition", val)}
          />
        </div>

        {/* COMPATIBLE DEVICE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="accessory-compatible"
            name="compatibleFor"
            label="Compatible Device / Brand"
            value={data.compatibleFor}
            customValue={data.customCompatibleFor}
            onCustomChange={(val: string) => updateField("customCompatibleFor", val)}
            options={COMPATIBLE_BRANDS}
            placeholder="Select Compatibility"
            allowOther
            onChange={(val: string) => updateField("compatibleFor", val)}
          />
        </div>

        {/* CHARGING SPEED / POWER */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="accessory-speed"
            name="chargingSpeed"
            label="Charging Speed / Wattage"
            value={data.chargingSpeed}
            customValue={data.customChargingSpeed}
            onCustomChange={(val: string) => updateField("customChargingSpeed", val)}
            options={FAST_CHARGING_STANDARDS}
            placeholder="Select Charging Power"
            allowOther
            onChange={(val: string) => updateField("chargingSpeed", val)}
          />
        </div>

        {/* POWER BANK CAPACITY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="accessory-powerbank"
            name="powerBankCapacity"
            label="Power Bank Capacity (if applicable)"
            value={data.powerBankCapacity}
            customValue={data.customPowerBankCapacity}
            onCustomChange={(val: string) => updateField("customPowerBankCapacity", val)}
            options={POWERBANK_CAPACITIES}
            placeholder="Select Capacity"
            allowOther
            onChange={(val: string) => updateField("powerBankCapacity", val)}
          />
        </div>

        {/* COLOR */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="accessory-color"
            name="color"
            label="Color"
            value={data.color}
            customValue={data.customColor}
            onCustomChange={(val: string) => updateField("customColor", val)}
            options={["White", "Black", "Transparent / Clear", "Navy Blue", "Purple", "Gray", "Red", "Multi-color"]}
            placeholder="Select Color"
            allowOther
            onChange={(val: string) => updateField("color", val)}
          />
        </div>
      </div>

      {/* ACCESSORY FEATURES / INCLUSIONS */}
      <div className="mt-4">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Key Features & Certifications
        </label>
        <div className="d-flex flex-wrap gap-2">
          {[
            "100% Original / Authentic Guaranteed",
            "Active Noise Cancellation (ANC)",
            "Transparency Mode",
            "Built-in Digital LED Battery Display",
            "Fast Charging Cable Included",
            "Multi-Port (Type-C + USB-A)",
            "Over-Charge Protection",
            "Manufacturer Warranty Included",
            "Original Packaging & Seals Intact",
            "Drop-Proof / Shock Absorbing",
          ].map((feature) => {
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
