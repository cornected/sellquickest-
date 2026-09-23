"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { VehicleBrandSelect } from "./VehicleBrandSelect";

type BikeFieldsProps = {
  onChange: (data: object) => void;
};

export function BikeFields({ onChange }: BikeFieldsProps) {
  const [data, setData] = useState({
    vehicleType: "",
    customVehicleType: "",

    brand: "",
    customBrand: "",

    model: "",

    year: "",
    customYear: "",

    mileage: "",

    bikeType: "",
    customBikeType: "",

    powertrain: "",
    customPowertrain: "",

    engineCapacity: "",
    customEngineCapacity: "",

    transmission: "",
    customTransmission: "",

    batteryCapacity: "",
    customBatteryCapacity: "",

    range: "",
    customRange: "",

    color: "",
    customColor: "",

    // NEW VEHICLE STATUS FIELDS

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
        🏍️ Bikes, Scooters & E-Mobility Details
      </h5>

      {/* VEHICLE TYPE + BRAND */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="vehicle-type"
            name="vehicleType"
            label="Vehicle Type"
            value={data.vehicleType}
            customValue={data.customVehicleType}
            onCustomChange={(value) => updateField("customVehicleType", value)}
            options={[
              "Motorcycle",
              "Scooter",
              "Electric Scooter",
              "Electric Motorcycle",
              "Bicycle",
              "Electric Bicycle (E-bike)",
              "Tricycle",
              "Quad Bike / ATV",
            ]}
            placeholder="Select Vehicle Type"
            allowOther
            onChange={(value) => updateField("vehicleType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <VehicleBrandSelect
            id="bike-brand"
            category="Bikes, Scooters & E-Mobility"
            label="Brand"
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
            value={data.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="e.g Honda CB500, Yamaha R15"
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
            id="bike-year"
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

      {/* MILEAGE + BIKE TYPE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Mileage (km)
          </label>

          <input
            type="number"
            value={data.mileage}
            onChange={(e) => updateField("mileage", e.target.value)}
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
            id="bike-type"
            name="bikeType"
            label="Bike Type"
            value={data.bikeType}
            customValue={data.customBikeType}
            onCustomChange={(value) => updateField("customBikeType", value)}
            options={[
              "Cruiser",
              "Dual Sport",
              "Motocross",
              "Sport Bike",
              "Standard (Naked)",
              "Touring",
              "Scooter",
              "Retro",
              "Three-Wheeler",
              "Quad Bike",
            ]}
            placeholder="Select Bike Type"
            allowOther
            onChange={(value) => updateField("bikeType", value)}
          />
        </div>
      </div>

      {/* POWERTRAIN + ENGINE CAPACITY */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="powertrain"
            name="powertrain"
            label="Powertrain"
            value={data.powertrain}
            customValue={data.customPowertrain}
            onCustomChange={(value) => updateField("customPowertrain", value)}
            options={["Petrol", "Electric", "Hybrid"]}
            placeholder="Select Powertrain"
            allowOther
            onChange={(value) => updateField("powertrain", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="engine-capacity"
            name="engineCapacity"
            label="Engine Capacity"
            value={data.engineCapacity}
            customValue={data.customEngineCapacity}
            onCustomChange={(value) =>
              updateField("customEngineCapacity", value)
            }
            options={[
              "50cc",
              "100cc",
              "110cc",
              "125cc",
              "150cc",
              "200cc",
              "250cc",
              "400cc+",
              "Electric Motor",
            ]}
            placeholder="Select Engine Capacity"
            allowOther
            onChange={(value) => updateField("engineCapacity", value)}
          />
        </div>
      </div>

      {/* TRANSMISSION + COLOR */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="transmission"
            name="transmission"
            label="Transmission"
            value={data.transmission}
            customValue={data.customTransmission}
            onCustomChange={(value) => updateField("customTransmission", value)}
            options={["Automatic", "Manual", "Semi-Automatic", "Single Speed"]}
            placeholder="Select Transmission"
            allowOther
            onChange={(value) => updateField("transmission", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="color"
            name="color"
            label="Color"
            value={data.color}
            customValue={data.customColor}
            onCustomChange={(value) => updateField("customColor", value)}
            options={[
              "Black",
              "White",
              "Blue",
              "Red",
              "Green",
              "Silver",
              "Yellow",
              "Orange",
            ]}
            placeholder="Select Color"
            allowOther
            onChange={(value) => updateField("color", value)}
          />
        </div>
      </div>

      {/* BATTERY + RANGE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="battery-capacity"
            name="batteryCapacity"
            label="Battery Capacity"
            value={data.batteryCapacity}
            customValue={data.customBatteryCapacity}
            onCustomChange={(value) =>
              updateField("customBatteryCapacity", value)
            }
            options={["36V", "48V", "52V", "60V", "72V"]}
            placeholder="Select Battery Capacity"
            allowOther
            onChange={(value) => updateField("batteryCapacity", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="range"
            name="range"
            label="Range"
            value={data.range}
            customValue={data.customRange}
            onCustomChange={(value) => updateField("customRange", value)}
            options={["Less than 20km", "20-50km", "50-100km", "100km+"]}
            placeholder="Select Range"
            allowOther
            onChange={(value) => updateField("range", value)}
          />
        </div>
      </div>

      {/* CONDITION + AVAILABLE FOR SWAP */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="condition"
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
            id="available-for-swap"
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
          Key Bike Features
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
            "ABS",
            "Disc Brakes",
            "LED Lights",
            "Digital Display",
            "USB Charging",
            "Bluetooth",
            "GPS Tracking",
            "Mobile App Control",
            "Removable Battery",
            "Fast Charging",
            "Storage Compartment",
            "Windshield",
            "Crash Bars",
            "Phone Holder",
            "Alarm System",
            "Remote Start",
            "Alloy Wheels",
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
