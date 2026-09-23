"use client";

import { useState } from "react";

import { StyledSelect } from "../StyledSelect";
import { VehicleBrandSelect } from "./VehicleBrandSelect";

type BusVanFieldsProps = {
  onChange: (data: object) => void;
};

export function BusVanFields({ onChange }: BusVanFieldsProps) {
  const [data, setData] = useState({
    vehicleType: "",
    customVehicleType: "",

    make: "",
    customMake: "",

    model: "",

    year: "",
    customYear: "",

    mileage: "",

    registrationStatus: "",
    customRegistrationStatus: "",

    transmission: "",
    customTransmission: "",

    fuelType: "",
    customFuelType: "",

    drivetrain: "",
    customDrivetrain: "",

    engineSize: "",
    customEngineSize: "",

    cylinders: "",
    customCylinders: "",

    seats: "",
    customSeats: "",

    doors: "",
    customDoors: "",

    exteriorColor: "",
    customExteriorColor: "",

    interiorMaterial: "",
    customInteriorMaterial: "",

    commercialUse: "",
    customCommercialUse: "",

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
        🚌 Buses & Commercial Vans Details
      </h5>

      {/* VEHICLE TYPE + MAKE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="bus-vehicle-type"
            name="vehicleType"
            label="Vehicle Type"
            value={data.vehicleType}
            customValue={data.customVehicleType}
            onCustomChange={(value) => updateField("customVehicleType", value)}
            options={[
              "Minibus",
              "Passenger Van",
              "Cargo Van",
              "Panel Van",
              "Shuttle Bus",
              "School Bus",
              "Coaster Bus",
              "City Bus",
              "Staff Bus",
              "Camper Van",
            ]}
            placeholder="Select Vehicle Type"
            allowOther
            onChange={(value) => updateField("vehicleType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <VehicleBrandSelect
            id="bus-make"
            category="Buses & Commercial Vans"
            label="Make / Brand"
            value={data.make}
            customValue={data.customMake}
            onCustomChange={(value) => updateField("customMake", value)}
            onChange={(value) => updateField("make", value)}
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
            placeholder="e.g Hiace, Sprinter, Transit"
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
            id="bus-year"
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

      {/* MILEAGE + REGISTRATION STATUS */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Mileage (km)
          </label>

          <input
            type="number"
            value={data.mileage}
            onChange={(e) => updateField("mileage", e.target.value)}
            placeholder="Enter mileage"
            className="form-control px-3 py-2 border-light-subtle form-option-hover no-number-arrows"
            style={{
              borderRadius: "8px",
              fontSize: "13px",
              minHeight: "42px",
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="registration-status"
            name="registrationStatus"
            label="Registration Status"
            value={data.registrationStatus}
            customValue={data.customRegistrationStatus}
            onCustomChange={(value) =>
              updateField("customRegistrationStatus", value)
            }
            options={["Registered", "Unregistered"]}
            placeholder="Select Registration Status"
            allowOther
            onChange={(value) => updateField("registrationStatus", value)}
          />
        </div>
      </div>

      {/* TRANSMISSION + FUEL */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="bus-transmission"
            name="transmission"
            label="Transmission"
            value={data.transmission}
            customValue={data.customTransmission}
            onCustomChange={(value) => updateField("customTransmission", value)}
            options={["Automatic", "Manual", "Semi-Automatic", "CVT"]}
            placeholder="Select Transmission"
            allowOther
            onChange={(value) => updateField("transmission", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="bus-fuel-type"
            name="fuelType"
            label="Fuel Type"
            value={data.fuelType}
            customValue={data.customFuelType}
            onCustomChange={(value) => updateField("customFuelType", value)}
            options={["Petrol", "Diesel", "CNG", "LPG", "Hybrid", "Electric"]}
            placeholder="Select Fuel Type"
            allowOther
            onChange={(value) => updateField("fuelType", value)}
          />
        </div>
      </div>

      {/* DRIVETRAIN + ENGINE SIZE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="bus-drivetrain"
            name="drivetrain"
            label="Drivetrain"
            value={data.drivetrain}
            customValue={data.customDrivetrain}
            onCustomChange={(value) => updateField("customDrivetrain", value)}
            options={[
              "Front Wheel Drive (FWD)",
              "Rear Wheel Drive (RWD)",
              "All Wheel Drive (AWD)",
              "Four Wheel Drive (4WD)",
            ]}
            placeholder="Select Drivetrain"
            allowOther
            onChange={(value) => updateField("drivetrain", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="bus-engine-size"
            name="engineSize"
            label="Engine Size"
            value={data.engineSize}
            customValue={data.customEngineSize}
            onCustomChange={(value) => updateField("customEngineSize", value)}
            options={[
              "1.5L",
              "1.8L",
              "2.0L",
              "2.2L",
              "2.5L",
              "2.7L",
              "3.0L",
              "3.5L",
              "4.0L",
              "5.0L+",
              "Electric Motor",
            ]}
            placeholder="Select Engine Size"
            allowOther
            onChange={(value) => updateField("engineSize", value)}
          />
        </div>
      </div>

      {/* CYLINDERS + SEATS */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="bus-cylinders"
            name="cylinders"
            label="Engine Cylinders"
            value={data.cylinders}
            customValue={data.customCylinders}
            onCustomChange={(value) => updateField("customCylinders", value)}
            options={[
              "3 Cylinder",
              "4 Cylinder",
              "5 Cylinder",
              "6 Cylinder",
              "8 Cylinder",
              "10 Cylinder",
              "12 Cylinder",
              "Electric Motor",
            ]}
            placeholder="Select Cylinders"
            allowOther
            onChange={(value) => updateField("cylinders", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="bus-seats"
            name="seats"
            label="Number of Seats"
            value={data.seats}
            customValue={data.customSeats}
            onCustomChange={(value) => updateField("customSeats", value)}
            options={[
              "2 Seats",
              "3 Seats",
              "5 Seats",
              "7 Seats",
              "8 Seats",
              "9 Seats",
              "12 Seats",
              "15 Seats",
              "18 Seats",
              "20+ Seats",
            ]}
            placeholder="Select Number of Seats"
            allowOther
            onChange={(value) => updateField("seats", value)}
          />
        </div>
      </div>

      {/* DOORS + COMMERCIAL USE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="bus-doors"
            name="doors"
            label="Number of Doors"
            value={data.doors}
            customValue={data.customDoors}
            onCustomChange={(value) => updateField("customDoors", value)}
            options={["2 Doors", "3 Doors", "4 Doors", "5 Doors", "6+ Doors"]}
            placeholder="Select Number of Doors"
            allowOther
            onChange={(value) => updateField("doors", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="commercial-use"
            name="commercialUse"
            label="Commercial Use"
            value={data.commercialUse}
            customValue={data.customCommercialUse}
            onCustomChange={(value) =>
              updateField("customCommercialUse", value)
            }
            options={[
              "Passenger Transport",
              "Cargo / Delivery",
              "Staff Transport",
              "School Transport",
              "Shuttle Service",
              "Tourism",
              "Ambulance",
              "Camper / Recreational",
            ]}
            placeholder="Select Commercial Use"
            allowOther
            onChange={(value) => updateField("commercialUse", value)}
          />
        </div>
      </div>

      {/* EXTERIOR + INTERIOR */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="bus-exterior-color"
            name="exteriorColor"
            label="Exterior Color"
            value={data.exteriorColor}
            customValue={data.customExteriorColor}
            onCustomChange={(value) =>
              updateField("customExteriorColor", value)
            }
            options={[
              "Black",
              "White",
              "Silver",
              "Gray",
              "Blue",
              "Red",
              "Green",
              "Yellow",
              "Brown",
              "Gold",
            ]}
            placeholder="Select Exterior Color"
            allowOther
            onChange={(value) => updateField("exteriorColor", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="bus-interior"
            name="interiorMaterial"
            label="Interior Material"
            value={data.interiorMaterial}
            customValue={data.customInteriorMaterial}
            onCustomChange={(value) =>
              updateField("customInteriorMaterial", value)
            }
            options={["Fabric", "Leather", "Vinyl", "Cloth", "Combination"]}
            placeholder="Select Interior Material"
            allowOther
            onChange={(value) => updateField("interiorMaterial", value)}
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
          Key Vehicle Features
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
            "No Faults",
            "Original Parts",
            "Unpainted",
            "First Owner",
            "First Registration",
            "Need Body Repair",
            "Need Repainting",
            "Engine Issue",
            "Gear Issue",
            "Wiring Problems",
            "Air Conditioning",
            "Airbags",
            "ABS",
            "Reverse Camera",
            "Parking Sensors",
            "Power Steering",
            "Power Windows",
            "Central Locking",
            "Bluetooth",
            "USB Charging",
            "Navigation",
            "Cruise Control",
            "Sliding Door",
            "Cargo Partition",
            "Roof Rack",
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
