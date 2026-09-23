"use client";

import { useState } from "react";

import { StyledSelect } from "../StyledSelect";
import { VehicleBrandSelect } from "./VehicleBrandSelect";

const PART_TYPES: Record<string, string[]> = {
  Engine: [
    "Engine Block",
    "Cylinder Head",
    "Alternator",
    "Starter Motor",
    "Turbocharger",
    "Fuel Injector",
  ],

  Transmission: [
    "Gearbox",
    "Clutch",
    "Driveshaft",
    "Differential",
    "Transmission Control Module",
  ],

  Brakes: [
    "Brake Pads",
    "Brake Discs",
    "Brake Caliper",
    "Master Cylinder",
    "Brake Booster",
  ],

  Suspension: [
    "Shock Absorber",
    "Spring",
    "Control Arm",
    "Wheel Hub",
    "Ball Joint",
  ],

  Electrical: ["Battery", "Headlight", "Tail Light", "ECU", "Alternator"],

  Interior: ["Seat", "Dashboard", "Door Trim", "Steering Wheel"],

  Exterior: ["Bumper", "Bonnet", "Fender", "Door", "Mirror"],

  "Car Care": ["Oil", "Coolant", "Cleaning Product", "Air Freshener"],
};

type SparePartsFieldsProps = {
  onChange: (data: object) => void;
};

export function SparePartsFields({ onChange }: SparePartsFieldsProps) {
  const [data, setData] = useState({
    partType: "",
    customPartType: "",

    subtype: "",
    customSubtype: "",

    make: "",
    customMake: "",

    model: "",

    partNumber: "",

    condition: "",
    customCondition: "",

    genuineType: "",
    customGenuineType: "",

    availability: "",
    customAvailability: "",

    warranty: "",
    customWarranty: "",

    features: [] as string[],
  });

  const updateField = (key: string, value: string) => {
    const updated = {
      ...data,
      [key]: value,
    };

    setData(updated);

    onChange(updated);
  };

  const toggleFeature = (feature: string) => {
    const updatedFeatures = data.features.includes(feature)
      ? data.features.filter((item) => item !== feature)
      : [...data.features, feature];

    const updated = {
      ...data,
      features: updatedFeatures,
    };

    setData(updated);

    onChange(updated);
  };

  const style = {
    borderRadius: "8px",

    fontSize: "13px",

    minHeight: "42px",
  };

  const labelClass = "form-label text-secondary small fw-semibold mb-1";

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",

        backgroundColor: "#f8fafc",
      }}
    >
      <h5 className="h6 fw-bold mb-3 text-dark">
        🔧 Spares & Car Care Details
      </h5>

      {/* PART TYPE + SUBTYPE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="part-type"
            name="partType"
            label="Part Type"
            value={data.partType}
            customValue={data.customPartType}
            onCustomChange={(value) => updateField("customPartType", value)}
            options={Object.keys(PART_TYPES)}
            placeholder="Select Part Type"
            allowOther
            onChange={(value) => {
              const updated = {
                ...data,

                partType: value,

                subtype: "",

                customSubtype: "",
              };

              setData(updated);

              onChange(updated);
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="part-subtype"
            name="subtype"
            label="Part Subtype"
            value={data.subtype}
            customValue={data.customSubtype}
            onCustomChange={(value) => updateField("customSubtype", value)}
            options={PART_TYPES[data.partType] || []}
            placeholder="Select Part Subtype"
            disabled={!data.partType}
            allowOther
            onChange={(value) => updateField("subtype", value)}
          />
        </div>
      </div>

      {/* VEHICLE MAKE + MODEL */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <VehicleBrandSelect
            id="part-make"
            category="Vehicle Parts & Accessories"
            label="Vehicle Make"
            value={data.make}
            customValue={data.customMake}
            onCustomChange={(value) => updateField("customMake", value)}
            onChange={(value) => {
              const updated = {
                ...data,

                make: value,

                model: "",
              };

              setData(updated);

              onChange(updated);
            }}
          />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="part-model" className={labelClass}>
            Vehicle Model
          </label>

          <input
            id="part-model"
            name="model"
            type="text"
            value={data.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="e.g. Camry, Corolla, Accord"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={style}
          />
        </div>
      </div>

      {/* PART NUMBER + CONDITION */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label htmlFor="part-number" className={labelClass}>
            Part Number
          </label>

          <input
            id="part-number"
            name="partNumber"
            type="text"
            value={data.partNumber}
            onChange={(e) => updateField("partNumber", e.target.value)}
            placeholder="Enter part number"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={style}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="spare-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            customValue={data.customCondition}
            onCustomChange={(value) => updateField("customCondition", value)}
            options={["Brand New", "Foreign Used", "Local Used", "Refurbished"]}
            placeholder="Select Condition"
            allowOther
            onChange={(value) => updateField("condition", value)}
          />
        </div>
      </div>

      {/* GENUINE TYPE + AVAILABILITY */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="genuine-type"
            name="genuineType"
            label="Genuine / Aftermarket"
            value={data.genuineType}
            customValue={data.customGenuineType}
            onCustomChange={(value) => updateField("customGenuineType", value)}
            options={[
              "Genuine OEM",

              "Original Used",

              "Aftermarket",

              "Compatible",

              "Reconditioned",
            ]}
            placeholder="Select Type"
            allowOther
            onChange={(value) => updateField("genuineType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="availability"
            name="availability"
            label="Availability"
            value={data.availability}
            customValue={data.customAvailability}
            onCustomChange={(value) => updateField("customAvailability", value)}
            options={[
              "In Stock",

              "Available on Order",

              "Limited Stock",

              "Out of Stock",
            ]}
            placeholder="Select Availability"
            allowOther
            onChange={(value) => updateField("availability", value)}
          />
        </div>
      </div>

      {/* WARRANTY */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="warranty"
            name="warranty"
            label="Warranty"
            value={data.warranty}
            customValue={data.customWarranty}
            onCustomChange={(value) => updateField("customWarranty", value)}
            options={[
              "No Warranty",

              "7 Days",

              "30 Days",

              "3 Months",

              "6 Months",

              "1 Year",
            ]}
            placeholder="Select Warranty"
            allowOther
            onChange={(value) => updateField("warranty", value)}
          />
        </div>
      </div>

      {/* FEATURES */}

      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Key Part Features
        </label>

        <div
          className="row g-2"
          style={{
            maxHeight: "260px",

            overflowY: "auto",

            paddingRight: "5px",
          }}
        >
          {[
            "OEM Quality",

            "Original Part",

            "Direct Replacement",

            "Performance Upgrade",

            "Heavy Duty",

            "Reconditioned",

            "Tested",

            "Low Mileage",

            "Unused",

            "Sealed Package",

            "Complete Set",

            "Includes Accessories",

            "Installation Available",

            "Delivery Available",

            "Manufacturer Warranty",

            "Receipt Available",

            "Compatible With Multiple Models",

            "Genuine Product",

            "Aftermarket Quality",

            "Ready To Install",

            "Serviceable",

            "Clean Condition",

            "No Damage",
          ].map((feature) => (
            <div key={feature} className="col-12 col-md-4">
              <button
                type="button"
                onClick={() => toggleFeature(feature)}
                className={
                  data.features.includes(feature)
                    ? "btn btn-dark w-100 text-start"
                    : "btn btn-light border w-100 text-start"
                }
                style={{
                  borderRadius: "8px",

                  fontSize: "12px",

                  minHeight: "42px",
                }}
              >
                {data.features.includes(feature) ? "✓ " : "+ "}

                {feature}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
