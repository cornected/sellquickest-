"use client";

import { useState } from "react";

import { StyledSelect } from "../StyledSelect";
import { VehicleBrandSelect } from "./VehicleBrandSelect";

type HeavyMachineryFieldsProps = {
  onChange: (data: object) => void;
};

export function HeavyMachineryFields({ onChange }: HeavyMachineryFieldsProps) {
  const [data, setData] = useState({
    equipmentType: "",
    customEquipmentType: "",

    brand: "",
    customBrand: "",

    model: "",

    year: "",
    customYear: "",

    operatingHours: "",
    customOperatingHours: "",

    fuelType: "",
    customFuelType: "",

    enginePower: "",
    customEnginePower: "",

    machineWeight: "",
    customMachineWeight: "",

    driveType: "",
    customDriveType: "",

    workingCapacity: "",
    customWorkingCapacity: "",

    attachmentType: "",
    customAttachmentType: "",

    cabinType: "",
    customCabinType: "",

    color: "",
    customColor: "",

    usageType: "",
    customUsageType: "",

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
        🚜 Heavy Duty & Plant Machinery Details
      </h5>
      {/* EQUIPMENT TYPE + BRAND */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="equipment-type"
            name="equipmentType"
            label="Equipment Type"
            value={data.equipmentType}
            customValue={data.customEquipmentType}
            onCustomChange={(value) =>
              updateField("customEquipmentType", value)
            }
            options={[
              "Excavator",
              "Mini Excavator",
              "Backhoe Loader",
              "Wheel Loader",
              "Bulldozer",
              "Motor Grader",
              "Forklift",
              "Telehandler",
              "Crane",
              "Mobile Crane",
              "Tower Crane",
              "Concrete Mixer",
              "Concrete Pump",
              "Road Roller",
              "Compactor",
              "Asphalt Paver",
              "Dump Truck",
              "Mining Truck",
              "Drilling Rig",
              "Compressor",
              "Generator",
              "Aerial Platform",
              "Boom Lift",
              "Scissor Lift",
              "Tractor",
              "Harvester",
            ]}
            placeholder="Select Equipment Type"
            allowOther
            onChange={(value) => updateField("equipmentType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <VehicleBrandSelect
            id="machinery-brand"
            category="Heavy Duty & Plant Machinery"
            label="Brand / Make"
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
            id="machinery-year"
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
      {/* OPERATING HOURS + FUEL TYPE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="operating-hours"
            name="operatingHours"
            label="Operating Hours"
            value={data.operatingHours}
            customValue={data.customOperatingHours}
            onCustomChange={(value) =>
              updateField("customOperatingHours", value)
            }
            options={[
              "0 - 1,000 Hours",
              "1,000 - 3,000 Hours",
              "3,000 - 5,000 Hours",
              "5,000 - 10,000 Hours",
              "10,000+ Hours",
            ]}
            placeholder="Select Operating Hours"
            allowOther
            onChange={(value) => updateField("operatingHours", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="machinery-fuel"
            name="fuelType"
            label="Fuel Type"
            value={data.fuelType}
            customValue={data.customFuelType}
            onCustomChange={(value) => updateField("customFuelType", value)}
            options={["Diesel", "Petrol", "Electric", "Hybrid", "Gas"]}
            placeholder="Select Fuel Type"
            allowOther
            onChange={(value) => updateField("fuelType", value)}
          />
        </div>
      </div>{" "}
      {/* ENGINE POWER + MACHINE WEIGHT */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="engine-power"
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

        <div className="col-12 col-md-6">
          <StyledSelect
            id="machine-weight"
            name="machineWeight"
            label="Machine Weight"
            value={data.machineWeight}
            customValue={data.customMachineWeight}
            onCustomChange={(value) =>
              updateField("customMachineWeight", value)
            }
            options={[
              "Below 1 Ton",
              "1 - 5 Tons",
              "5 - 10 Tons",
              "10 - 20 Tons",
              "20 - 50 Tons",
              "50+ Tons",
            ]}
            placeholder="Select Machine Weight"
            allowOther
            onChange={(value) => updateField("machineWeight", value)}
          />
        </div>
      </div>
      {/* DRIVE TYPE + WORKING CAPACITY */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="drive-type"
            name="driveType"
            label="Drive Type"
            value={data.driveType}
            customValue={data.customDriveType}
            onCustomChange={(value) => updateField("customDriveType", value)}
            options={[
              "Tracked",
              "Wheel",
              "4x2",
              "4x4",
              "6x4",
              "6x6",
              "8x8",
              "Stationary",
            ]}
            placeholder="Select Drive Type"
            allowOther
            onChange={(value) => updateField("driveType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="working-capacity"
            name="workingCapacity"
            label="Working Capacity"
            value={data.workingCapacity}
            customValue={data.customWorkingCapacity}
            onCustomChange={(value) =>
              updateField("customWorkingCapacity", value)
            }
            options={[
              "1 Ton",
              "3 Tons",
              "5 Tons",
              "10 Tons",
              "20 Tons",
              "30 Tons",
              "50 Tons",
              "100+ Tons",
            ]}
            placeholder="Select Working Capacity"
            allowOther
            onChange={(value) => updateField("workingCapacity", value)}
          />
        </div>
      </div>
      {/* ATTACHMENT TYPE + CABIN TYPE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="attachment-type"
            name="attachmentType"
            label="Attachment Type"
            value={data.attachmentType}
            customValue={data.customAttachmentType}
            onCustomChange={(value) =>
              updateField("customAttachmentType", value)
            }
            options={[
              "Bucket",
              "Breaker",
              "Fork Attachment",
              "Grabber",
              "Auger",
              "Ripper",
              "Blade",
              "Crane Attachment",
              "Compactor Attachment",
            ]}
            placeholder="Select Attachment Type"
            allowOther
            onChange={(value) => updateField("attachmentType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="cabin-type"
            name="cabinType"
            label="Cabin Type"
            value={data.cabinType}
            customValue={data.customCabinType}
            onCustomChange={(value) => updateField("customCabinType", value)}
            options={[
              "Open Cabin",
              "Enclosed Cabin",
              "Air Conditioned Cabin",
              "Operator Cabin",
              "ROPS Cabin",
              "FOPS Cabin",
            ]}
            placeholder="Select Cabin Type"
            allowOther
            onChange={(value) => updateField("cabinType", value)}
          />
        </div>
      </div>
      {/* COLOR + USAGE TYPE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="machinery-color"
            name="color"
            label="Color"
            value={data.color}
            customValue={data.customColor}
            onCustomChange={(value) => updateField("customColor", value)}
            options={[
              "Yellow",
              "Orange",
              "White",
              "Black",
              "Blue",
              "Green",
              "Red",
              "Gray",
            ]}
            placeholder="Select Color"
            allowOther
            onChange={(value) => updateField("color", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="usage-type"
            name="usageType"
            label="Usage Type"
            value={data.usageType}
            customValue={data.customUsageType}
            onCustomChange={(value) => updateField("customUsageType", value)}
            options={[
              "Construction",
              "Mining",
              "Agriculture",
              "Road Work",
              "Logistics",
              "Industrial",
              "Rental",
            ]}
            placeholder="Select Usage Type"
            allowOther
            onChange={(value) => updateField("usageType", value)}
          />
        </div>
      </div>
      {/* CONDITION + AVAILABLE FOR SWAP */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="machinery-condition"
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
            id="machinery-available-for-swap"
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
          Key Machinery Features
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
            "Air Conditioning",
            "GPS Tracking",
            "Enclosed Cabin",
            "Open Cabin",
            "ROPS Cabin",
            "FOPS Protection",
            "Hydraulic System",
            "Quick Coupler",
            "Turbo Engine",
            "4 Wheel Drive",
            "LED Work Lights",
            "Reverse Camera",
            "Operator Seat",
            "Safety Cage",
            "Low Hour Machine",
            "Original Parts",
            "Service History",
            "CE Certified",
            "Remote Control",
            "Electric Start",
            "Water Cooling",
            "Automatic Greasing System",
            "Fire Suppression System",
            "Emergency Stop",
            "Extra Attachments",
            "Tool Box",
            "Spare Parts Available",
            "Maintenance Records",
            "One Owner",
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
