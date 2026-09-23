"use client";

import { useState } from "react";

import { StyledSelect } from "../StyledSelect";
import { VehicleBrandSelect } from "./VehicleBrandSelect";

type TruckTrailerFieldsProps = {
  onChange: (data: object) => void;
};

export function TruckTrailerFields({ onChange }: TruckTrailerFieldsProps) {
  const [data, setData] = useState({
    vehicleType: "",
    customVehicleType: "",

    make: "",
    customMake: "",

    model: "",

    year: "",
    customYear: "",

    mileage: "",

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

    axleConfiguration: "",
    customAxleConfiguration: "",

    loadCapacity: "",
    customLoadCapacity: "",

    grossVehicleWeight: "",
    customGrossVehicleWeight: "",

    bodyType: "",
    customBodyType: "",

    trailerType: "",
    customTrailerType: "",

    cabinType: "",
    customCabinType: "",

    color: "",
    customColor: "",

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
        Haulage Trucks & Trailers Details
      </h5>

      {/* VEHICLE TYPE + MAKE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="truck-vehicle-type"
            name="vehicleType"
            label="Vehicle Type"
            value={data.vehicleType}
            customValue={data.customVehicleType}
            onCustomChange={(value) => updateField("customVehicleType", value)}
            options={[
              "Tractor Head",
              "Rigid Truck",
              "Tipper Truck",
              "Dump Truck",
              "Box Truck",
              "Flatbed Truck",
              "Tanker Truck",
              "Refrigerated Truck",
              "Tow Truck",
              "Garbage Truck",
              "Semi-Trailer",
              "Full Trailer",
              "Lowbed Trailer",
              "Flatbed Trailer",
              "Tanker Trailer",
              "Container Trailer",
            ]}
            placeholder="Select Vehicle Type"
            allowOther
            onChange={(value) => updateField("vehicleType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <VehicleBrandSelect
            id="truck-make"
            category="Haulage Trucks & Trailers"
            label="Make / Manufacturer"
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
            id="truck-year"
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

      {/* MILEAGE + TRANSMISSION */}

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
            id="truck-transmission"
            name="transmission"
            label="Transmission"
            value={data.transmission}
            customValue={data.customTransmission}
            onCustomChange={(value) => updateField("customTransmission", value)}
            options={[
              "Manual",
              "Automatic",
              "Automated Manual (AMT)",
              "Semi-Automatic",
            ]}
            placeholder="Select Transmission"
            allowOther
            onChange={(value) => updateField("transmission", value)}
          />
        </div>
      </div>

      {/* FUEL + DRIVETRAIN */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="truck-fuel-type"
            name="fuelType"
            label="Fuel Type"
            value={data.fuelType}
            customValue={data.customFuelType}
            onCustomChange={(value) => updateField("customFuelType", value)}
            options={["Diesel", "Petrol", "CNG", "LNG", "Electric", "Hybrid"]}
            placeholder="Select Fuel Type"
            allowOther
            onChange={(value) => updateField("fuelType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="truck-drivetrain"
            name="drivetrain"
            label="Drivetrain"
            value={data.drivetrain}
            customValue={data.customDrivetrain}
            onCustomChange={(value) => updateField("customDrivetrain", value)}
            options={[
              "Rear Wheel Drive (RWD)",
              "Front Wheel Drive (FWD)",
              "All Wheel Drive (AWD)",
              "Four Wheel Drive (4WD)",
              "Six Wheel Drive (6WD)",
              "Eight Wheel Drive (8WD)",
            ]}
            placeholder="Select Drivetrain"
            allowOther
            onChange={(value) => updateField("drivetrain", value)}
          />
        </div>
      </div>

      {/* ENGINE SIZE + CYLINDERS */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="truck-engine-size"
            name="engineSize"
            label="Engine Size"
            value={data.engineSize}
            customValue={data.customEngineSize}
            onCustomChange={(value) => updateField("customEngineSize", value)}
            options={[
              "2.5L",
              "3.0L",
              "4.0L",
              "5.0L",
              "6.0L",
              "7.0L",
              "8.0L",
              "9.0L",
              "10.0L",
              "11.0L",
              "12.0L",
              "13.0L",
              "14.0L",
              "15.0L+",
              "Electric Motor",
            ]}
            placeholder="Select Engine Size"
            allowOther
            onChange={(value) => updateField("engineSize", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="truck-cylinders"
            name="cylinders"
            label="Engine Cylinders"
            value={data.cylinders}
            customValue={data.customCylinders}
            onCustomChange={(value) => updateField("customCylinders", value)}
            options={[
              "4 Cylinder",
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
      </div>

      {/* AXLE CONFIGURATION + LOAD CAPACITY */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="truck-axle-configuration"
            name="axleConfiguration"
            label="Axle Configuration"
            value={data.axleConfiguration}
            customValue={data.customAxleConfiguration}
            onCustomChange={(value) =>
              updateField("customAxleConfiguration", value)
            }
            options={[
              "4x2",
              "4x4",
              "6x2",
              "6x4",
              "6x6",
              "8x2",
              "8x4",
              "8x6",
              "8x8",
            ]}
            placeholder="Select Axle Configuration"
            allowOther
            onChange={(value) => updateField("axleConfiguration", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="truck-load-capacity"
            name="loadCapacity"
            label="Load Capacity"
            value={data.loadCapacity}
            customValue={data.customLoadCapacity}
            onCustomChange={(value) => updateField("customLoadCapacity", value)}
            options={[
              "Below 5 Tons",
              "5 - 10 Tons",
              "10 - 15 Tons",
              "15 - 20 Tons",
              "20 - 30 Tons",
              "30 - 40 Tons",
              "40 - 50 Tons",
              "50+ Tons",
            ]}
            placeholder="Select Load Capacity"
            allowOther
            onChange={(value) => updateField("loadCapacity", value)}
          />
        </div>
      </div>

      {/* GROSS VEHICLE WEIGHT + BODY TYPE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="gross-vehicle-weight"
            name="grossVehicleWeight"
            label="Gross Vehicle Weight"
            value={data.grossVehicleWeight}
            customValue={data.customGrossVehicleWeight}
            onCustomChange={(value) =>
              updateField("customGrossVehicleWeight", value)
            }
            options={[
              "Below 7.5 Tons",
              "7.5 - 12 Tons",
              "12 - 18 Tons",
              "18 - 26 Tons",
              "26 - 32 Tons",
              "32 - 44 Tons",
              "44+ Tons",
            ]}
            placeholder="Select Gross Vehicle Weight"
            allowOther
            onChange={(value) => updateField("grossVehicleWeight", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="truck-body-type"
            name="bodyType"
            label="Body Type"
            value={data.bodyType}
            customValue={data.customBodyType}
            onCustomChange={(value) => updateField("customBodyType", value)}
            options={[
              "Cab & Chassis",
              "Flatbed",
              "Box Body",
              "Tipper",
              "Tanker",
              "Curtainside",
              "Refrigerated",
              "Container Carrier",
              "Car Carrier",
              "Concrete Mixer",
              "Hook Loader",
              "Skip Loader",
            ]}
            placeholder="Select Body Type"
            allowOther
            onChange={(value) => updateField("bodyType", value)}
          />
        </div>
      </div>

      {/* TRAILER TYPE + CABIN TYPE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="trailer-type"
            name="trailerType"
            label="Trailer Type"
            value={data.trailerType}
            customValue={data.customTrailerType}
            onCustomChange={(value) => updateField("customTrailerType", value)}
            options={[
              "Flatbed Trailer",
              "Lowbed Trailer",
              "Curtainside Trailer",
              "Box Trailer",
              "Tanker Trailer",
              "Container Trailer",
              "Tipper Trailer",
              "Refrigerated Trailer",
              "Car Carrier Trailer",
              "Logging Trailer",
            ]}
            placeholder="Select Trailer Type"
            allowOther
            onChange={(value) => updateField("trailerType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="truck-cabin-type"
            name="cabinType"
            label="Cabin Type"
            value={data.cabinType}
            customValue={data.customCabinType}
            onCustomChange={(value) => updateField("customCabinType", value)}
            options={[
              "Day Cab",
              "Sleeper Cab",
              "Crew Cab",
              "High Roof Sleeper",
              "Low Roof Cab",
              "Double Cab",
            ]}
            placeholder="Select Cabin Type"
            allowOther
            onChange={(value) => updateField("cabinType", value)}
          />
        </div>
      </div>
      {/* COLOR + COMMERCIAL USE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="truck-color"
            name="color"
            label="Color"
            value={data.color}
            customValue={data.customColor}
            onCustomChange={(value) => updateField("customColor", value)}
            options={[
              "White",
              "Black",
              "Blue",
              "Red",
              "Silver",
              "Gray",
              "Green",
              "Yellow",
              "Orange",
              "Brown",
            ]}
            placeholder="Select Color"
            allowOther
            onChange={(value) => updateField("color", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="truck-commercial-use"
            name="commercialUse"
            label="Commercial Use"
            value={data.commercialUse}
            customValue={data.customCommercialUse}
            onCustomChange={(value) =>
              updateField("customCommercialUse", value)
            }
            options={[
              "General Haulage",
              "Container Transport",
              "Construction",
              "Agriculture",
              "Petroleum Transport",
              "Food Transport",
              "Cold Chain",
              "Car Transport",
              "Waste Management",
              "Heavy Equipment Transport",
              "Logistics / Delivery",
            ]}
            placeholder="Select Commercial Use"
            allowOther
            onChange={(value) => updateField("commercialUse", value)}
          />
        </div>
      </div>

      {/* CONDITION + AVAILABLE FOR SWAP */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="truck-condition"
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
            id="truck-available-for-swap"
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
          Key Truck / Trailer Features
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
            "Air Brakes",
            "Engine Brake",
            "Retarder",
            "Power Steering",
            "Air Conditioning",
            "Cruise Control",
            "Reverse Camera",
            "Parking Sensors",
            "Lane Assist",
            "Bluetooth",
            "Navigation",
            "Sleeper Cabin",
            "Air Suspension",
            "Leaf Spring Suspension",
            "Hydraulic Tipping",
            "PTO",
            "Differential Lock",
            "Lift Axle",
            "Steering Axle",
            "Trailer ABS",
            "Side Guards",
            "Toolbox",
            "Spare Wheel",
            "Roof Beacon",
            "Tow Hitch",
            "Fifth Wheel",
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
