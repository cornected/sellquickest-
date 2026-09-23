"use client";

import { useState } from "react";

import { StyledSelect } from "../StyledSelect";
import { VehicleBrandSelect } from "./VehicleBrandSelect";

type MarineFieldsProps = {
  onChange: (data: object) => void;
};

export function MarineFields({ onChange }: MarineFieldsProps) {
  const [data, setData] = useState({
    boatType: "",
    customBoatType: "",

    brand: "",
    customBrand: "",

    model: "",

    year: "",
    customYear: "",

    length: "",
    customLength: "",

    engineType: "",
    customEngineType: "",

    engineBrand: "",
    customEngineBrand: "",

    enginePower: "",
    customEnginePower: "",

    fuelType: "",
    customFuelType: "",

    hullMaterial: "",
    customHullMaterial: "",

    numberOfEngines: "",
    customNumberOfEngines: "",

    passengerCapacity: "",
    customPassengerCapacity: "",

    usageType: "",
    customUsageType: "",

    color: "",
    customColor: "",

    condition: "",
    customCondition: "",

    availableForSwap: "",

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

  const years = Array.from({ length: 50 }, (_, i) => String(2026 - i));

  return (
    <div
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <h5 className="h6 fw-bold mb-3 text-dark">
        🚤 Marine Vessels & Boats Details
      </h5>
      {/* BOAT TYPE + BRAND */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="boat-type"
            name="boatType"
            label="Boat Type"
            value={data.boatType}
            customValue={data.customBoatType}
            onCustomChange={(value) => updateField("customBoatType", value)}
            options={[
              "Speed Boat",
              "Fishing Boat",
              "Yacht",
              "Jet Ski",
              "Cabin Cruiser",
              "Pontoon Boat",
              "Sailboat",
              "Catamaran",
              "House Boat",
              "Canoe",
              "Work Boat",
              "Passenger Boat",
              "Ferry Boat",
              "Inflatable Boat",
              "Dinghy",
            ]}
            placeholder="Select Boat Type"
            allowOther
            onChange={(value) => updateField("boatType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <VehicleBrandSelect
            id="marine-brand"
            category="Marine Vessels & Boats"
            label="Boat / Engine Brand"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(value) => updateField("customBrand", value)}
            onChange={(value) => updateField("brand", value)}
          />
        </div>
      </div>
      {/* MODEL + YEAR */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Model
          </label>

          <input
            type="text"
            value={data.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="Enter model"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{
              borderRadius: "8px",
              fontSize: "13px",
              minHeight: "42px",
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="marine-year"
            name="year"
            label="Year"
            value={data.year}
            customValue={data.customYear}
            onCustomChange={(value) => updateField("customYear", value)}
            options={years}
            placeholder="Select Year"
            allowOther
            onChange={(value) => updateField("year", value)}
          />
        </div>
      </div>
      {/* LENGTH + ENGINE TYPE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="boat-length"
            name="length"
            label="Boat Length"
            value={data.length}
            customValue={data.customLength}
            onCustomChange={(value) => updateField("customLength", value)}
            options={[
              "Below 10 ft",
              "10 - 20 ft",
              "20 - 30 ft",
              "30 - 50 ft",
              "50 - 100 ft",
              "100+ ft",
            ]}
            placeholder="Select Length"
            allowOther
            onChange={(value) => updateField("length", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="engine-type"
            name="engineType"
            label="Engine Type"
            value={data.engineType}
            customValue={data.customEngineType}
            onCustomChange={(value) => updateField("customEngineType", value)}
            options={[
              "Outboard",
              "Inboard",
              "Jet Drive",
              "Electric Motor",
              "Hybrid",
            ]}
            placeholder="Select Engine Type"
            allowOther
            onChange={(value) => updateField("engineType", value)}
          />
        </div>
      </div>
      {/* ENGINE BRAND + ENGINE POWER */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="engine-brand"
            name="engineBrand"
            label="Engine Brand"
            value={data.engineBrand}
            customValue={data.customEngineBrand}
            onCustomChange={(value) => updateField("customEngineBrand", value)}
            options={[
              "Yamaha",
              "Mercury",
              "Honda",
              "Suzuki",
              "Volvo Penta",
              "Caterpillar",
              "Cummins",
              "MAN",
              "MTU",
              "Other Marine Engine",
            ]}
            placeholder="Select Engine Brand"
            allowOther
            onChange={(value) => updateField("engineBrand", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="marine-engine-power"
            name="enginePower"
            label="Engine Power"
            value={data.enginePower}
            customValue={data.customEnginePower}
            onCustomChange={(value) => updateField("customEnginePower", value)}
            options={[
              "Below 50 HP",
              "50 - 100 HP",
              "100 - 200 HP",
              "200 - 300 HP",
              "300 - 500 HP",
              "500+ HP",
            ]}
            placeholder="Select Engine Power"
            allowOther
            onChange={(value) => updateField("enginePower", value)}
          />
        </div>
      </div>
      {/* FUEL TYPE + HULL MATERIAL */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="marine-fuel"
            name="fuelType"
            label="Fuel Type"
            value={data.fuelType}
            customValue={data.customFuelType}
            onCustomChange={(value) => updateField("customFuelType", value)}
            options={["Petrol", "Diesel", "Electric", "Hybrid"]}
            placeholder="Select Fuel Type"
            allowOther
            onChange={(value) => updateField("fuelType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="hull-material"
            name="hullMaterial"
            label="Hull Material"
            value={data.hullMaterial}
            customValue={data.customHullMaterial}
            onCustomChange={(value) => updateField("customHullMaterial", value)}
            options={[
              "Fiberglass",
              "Aluminium",
              "Steel",
              "Wood",
              "Plastic",
              "Composite",
            ]}
            placeholder="Select Hull Material"
            allowOther
            onChange={(value) => updateField("hullMaterial", value)}
          />
        </div>
      </div>{" "}
      {/* NUMBER OF ENGINES + PASSENGER CAPACITY */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="number-of-engines"
            name="numberOfEngines"
            label="Number of Engines"
            value={data.numberOfEngines}
            customValue={data.customNumberOfEngines}
            onCustomChange={(value) =>
              updateField("customNumberOfEngines", value)
            }
            options={[
              "Single Engine",
              "Twin Engine",
              "Triple Engine",
              "Quad Engine",
            ]}
            placeholder="Select Number of Engines"
            allowOther
            onChange={(value) => updateField("numberOfEngines", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="passenger-capacity"
            name="passengerCapacity"
            label="Passenger Capacity"
            value={data.passengerCapacity}
            customValue={data.customPassengerCapacity}
            onCustomChange={(value) =>
              updateField("customPassengerCapacity", value)
            }
            options={[
              "1 - 5 People",
              "6 - 10 People",
              "11 - 20 People",
              "21 - 50 People",
              "50+ People",
            ]}
            placeholder="Select Passenger Capacity"
            allowOther
            onChange={(value) => updateField("passengerCapacity", value)}
          />
        </div>
      </div>
      {/* USAGE TYPE + COLOR */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="marine-usage"
            name="usageType"
            label="Usage Type"
            value={data.usageType}
            customValue={data.customUsageType}
            onCustomChange={(value) => updateField("customUsageType", value)}
            options={[
              "Private",
              "Fishing",
              "Commercial Transport",
              "Tourism",
              "Water Sports",
              "Rescue",
              "Military / Security",
            ]}
            placeholder="Select Usage Type"
            allowOther
            onChange={(value) => updateField("usageType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="marine-color"
            name="color"
            label="Color"
            value={data.color}
            customValue={data.customColor}
            onCustomChange={(value) => updateField("customColor", value)}
            options={[
              "White",
              "Blue",
              "Black",
              "Gray",
              "Red",
              "Green",
              "Yellow",
            ]}
            placeholder="Select Color"
            allowOther
            onChange={(value) => updateField("color", value)}
          />
        </div>
      </div>
      {/* CONDITION + AVAILABLE FOR SWAP */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="marine-condition"
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

        <div className="col-12 col-md-6">
          <StyledSelect
            id="marine-available-for-swap"
            name="availableForSwap"
            label="Available for Swap?"
            value={data.availableForSwap}
            options={["Yes", "No"]}
            placeholder="Select Option"
            onChange={(value) => updateField("availableForSwap", value)}
          />
        </div>
      </div>
      {/* FEATURES */}
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Key Marine Features
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
            "GPS Navigation",
            "Fish Finder",
            "Radio Communication",
            "Life Jackets",
            "Cabin",
            "Bathroom",
            "Kitchen",
            "Sleeping Area",
            "Swimming Platform",
            "Storage Space",
            "Trailer Included",
            "Anchor System",
            "Automatic Bilge Pump",
            "LED Lighting",
            "Sound System",
            "Fishing Equipment",
            "Diving Equipment",
            "Safety Equipment",
            "Weather Protection",
            "Navigation System",
            "Depth Finder",
            "Live Well",
            "Fishing Rod Holders",
            "Shower System",
            "Air Conditioning",
            "Solar Panels",
            "Emergency Equipment",
            "Water Tank",
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
    </div>
  );
}
