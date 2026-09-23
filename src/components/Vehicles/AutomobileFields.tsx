"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { VehicleBrandSelect } from "./VehicleBrandSelect";

type AutomobileFieldsProps = {
  onChange: (data: object) => void;
};

export function AutomobileFields({ onChange }: AutomobileFieldsProps) {
  const [data, setData] = useState({
    brand: "",
    customBrand: "",
    model: "",
    year: "",
    mileage: "",
    vin: "",

    transmission: "",
    customTransmission: "",

    fuel: "",
    customFuel: "",

    cylinders: "",
    customCylinders: "",

    engineSize: "",
    customEngineSize: "",

    bodyType: "",
    customBodyType: "",

    driveType: "",
    customDriveType: "",

    color: "",
    customColor: "",

    interior: "",
    customInterior: "",

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
      <h5 className="h6 fw-bold mb-3 text-dark">🚘 Vehicle Specifications</h5>

      {/* BRAND + MODEL */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <VehicleBrandSelect
            id="car-brand"
            category="Automobiles"
            label="Car Brand"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(value) => updateField("customBrand", value)}
            onChange={(value) => updateField("brand", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Model
          </label>

          <input
            value={data.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="e.g Camry, Corolla"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{
              borderRadius: "8px",
              fontSize: "13px",
              minHeight: "42px",
            }}
          />
        </div>
      </div>

      {/* YEAR + MILEAGE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="car-year"
            name="year"
            label="Year"
            value={data.year}
            options={years}
            placeholder="Select Year"
            onChange={(value) => updateField("year", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Mileage (km)
          </label>

          <input
            type="number"
            value={data.mileage}
            onChange={(e) => updateField("mileage", e.target.value)}
            className="form-control px-3 py-2 border-light-subtle form-option-hover no-number-arrows"
            style={{
              borderRadius: "8px",
              fontSize: "13px",
              minHeight: "42px",
            }}
          />
        </div>
      </div>

      {/* TRANSMISSION + FUEL */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="transmission"
            name="transmission"
            label="Transmission"
            value={data.transmission}
            customValue={data.customTransmission}
            onCustomChange={(value) => updateField("customTransmission", value)}
            options={["Automatic", "Manual", "CVT", "Semi-Automatic"]}
            placeholder="Select Transmission"
            allowOther
            onChange={(value) => updateField("transmission", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="fuel"
            name="fuel"
            label="Fuel Type"
            value={data.fuel}
            customValue={data.customFuel}
            onCustomChange={(value) => updateField("customFuel", value)}
            options={["Petrol", "Diesel", "Hybrid", "Electric"]}
            placeholder="Select Fuel"
            allowOther
            onChange={(value) => updateField("fuel", value)}
          />
        </div>
      </div>

      {/* ENGINE CYLINDERS + ENGINE SIZE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="cylinders"
            name="cylinders"
            label="Engine Cylinders"
            value={data.cylinders}
            customValue={data.customCylinders}
            onCustomChange={(value) => updateField("customCylinders", value)}
            options={[
              "3 Cylinder",
              "4 Cylinder",
              "6 Cylinder",
              "8 Cylinder",
              "Electric Motor",
            ]}
            placeholder="Select Cylinders"
            allowOther
            onChange={(value) => updateField("cylinders", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="engine-size"
            name="engineSize"
            label="Engine Size"
            value={data.engineSize}
            customValue={data.customEngineSize}
            onCustomChange={(value) => updateField("customEngineSize", value)}
            options={[
              "0.8L",
              "1.0L",
              "1.2L",
              "1.5L",
              "1.6L",
              "1.8L",
              "2.0L",
              "2.5L",
              "3.0L+",
              "Electric",
            ]}
            placeholder="Select Engine Size"
            allowOther
            onChange={(value) => updateField("engineSize", value)}
          />
        </div>
      </div>

      {/* BODY TYPE + DRIVE TYPE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="body-type"
            name="bodyType"
            label="Body Type"
            value={data.bodyType}
            customValue={data.customBodyType}
            onCustomChange={(value) => updateField("customBodyType", value)}
            options={[
              "Sedan",
              "SUV",
              "Hatchback",
              "Coupe",
              "Convertible",
              "Pickup Truck",
              "Wagon",
              "Minivan",
              "Van",
              "Bus",
              "Truck",
            ]}
            placeholder="Select Body Type"
            allowOther
            onChange={(value) => updateField("bodyType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="drive-type"
            name="driveType"
            label="Drive Type"
            value={data.driveType}
            customValue={data.customDriveType}
            onCustomChange={(value) => updateField("customDriveType", value)}
            options={[
              "Front Wheel Drive (FWD)",
              "Rear Wheel Drive (RWD)",
              "All Wheel Drive (AWD)",
              "Four Wheel Drive (4WD)",
            ]}
            placeholder="Select Drive Type"
            allowOther
            onChange={(value) => updateField("driveType", value)}
          />
        </div>
      </div>

      {/* EXTERIOR + INTERIOR */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="color"
            name="color"
            label="Exterior Color"
            value={data.color}
            customValue={data.customColor}
            onCustomChange={(value) => updateField("customColor", value)}
            options={[
              "Black",
              "White",
              "Silver",
              "Gray",
              "Blue",
              "Red",
              "Gold",
              "Green",
              "Wine",
            ]}
            placeholder="Select Color"
            allowOther
            onChange={(value) => updateField("color", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="interior"
            name="interior"
            label="Interior Material"
            value={data.interior}
            customValue={data.customInterior}
            onCustomChange={(value) => updateField("customInterior", value)}
            options={[
              "Leather",
              "Fabric",
              "Suede",
              "Alcantara",
              "Vinyl",
              "Cloth",
            ]}
            placeholder="Select Interior Material"
            allowOther
            onChange={(value) => updateField("interior", value)}
          />
        </div>
      </div>

      {/* VIN + CONDITION */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Chassis Number / VIN
          </label>

          <input
            value={data.vin}
            maxLength={17}
            onChange={(e) => updateField("vin", e.target.value.toUpperCase())}
            placeholder="Enter 17 character VIN"
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
      </div>

      {/* AVAILABLE FOR SWAP */}

      <div className="row g-3 mb-3">
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
          Key Vehicle Features
        </label>

        <div
          className="row g-2"
          style={{
            maxHeight: "180px",
            overflowY: "auto",
            paddingRight: "5px",
          }}
        >
          {[
            "Airbags",
            "ABS",
            "Traction Control",
            "Stability Control",
            "Reverse Camera",
            "360 Camera",
            "Parking Sensors",
            "Blind Spot Monitoring",
            "Lane Assist",
            "Cruise Control",
            "Android Display",
            "Apple CarPlay",
            "Bluetooth Audio",
            "Sunroof",
            "Alloy Rims",
            "Push Start",
            "Keyless Entry",
            "Electric Seats",
            "Heated Seats",
            "Steering Controls",
            "Fog Lights",
            "Roof Rails",
            "Tow Hitch",
            "Roof Rack",
            "Tinted Windows",
            "Navigation System",
            "Premium Sound System",
            "Leather Seats",
            "Third Row Seating",
            "Dual Climate Control",
            "Adaptive Headlights",
            "Remote Start",
            "Wireless Charging",
            "Heads-Up Display",
            "Lane Departure Warning",
            "Automatic Emergency Braking",
            "Traffic Sign Recognition",
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
