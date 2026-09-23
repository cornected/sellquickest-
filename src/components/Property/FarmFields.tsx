"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type FarmFieldsProps = {
  onChange: (data: object) => void;
};

export function FarmFields({ onChange }: FarmFieldsProps) {
  const [data, setData] = useState({
    farmType: "",
    customFarmType: "",

    size: "",

    cropType: "",
    customCropType: "",

    livestockType: "",
    customLivestockType: "",

    waterSource: "",
    customWaterSource: "",

    soilType: "",
    customSoilType: "",

    infrastructure: [] as string[],

    powerSupply: "",
    customPowerSupply: "",

    accessRoad: "",
    customAccessRoad: "",

    securityFeatures: [] as string[],

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

  const toggleArrayItem = (
    key: "infrastructure" | "securityFeatures" | "features",
    value: string,
  ) => {
    const current = data[key];

    const updatedArray = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    const updated = {
      ...data,

      [key]: updatedArray,
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
      <h5 className="h6 fw-bold mb-3 text-dark">
        🌾 Farm & Agricultural Land Details
      </h5>
      {/* FARM TYPE + LAND SIZE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="farm-type"
            name="farmType"
            label="Farm Type"
            value={data.farmType}
            customValue={data.customFarmType}
            onCustomChange={(value) => updateField("customFarmType", value)}
            options={[
              "Crop Farm",

              "Livestock Farm",

              "Poultry Farm",

              "Fish Farm",

              "Mixed Farm",

              "Plantation",

              "Greenhouse Farm",
            ]}
            placeholder="Select Farm Type"
            allowOther
            onChange={(value) => updateField("farmType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Land Size
          </label>

          <input
            type="text"
            value={data.size}
            onChange={(e) => updateField("size", e.target.value)}
            placeholder="e.g. 5 acres, 10 hectares"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{
              borderRadius: "8px",

              fontSize: "13px",

              minHeight: "42px",
            }}
          />
        </div>
      </div>
      {/* CROP TYPE + LIVESTOCK TYPE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="crop-type"
            name="cropType"
            label="Crop Type"
            value={data.cropType}
            customValue={data.customCropType}
            onCustomChange={(value) => updateField("customCropType", value)}
            options={[
              "Maize",

              "Rice",

              "Cassava",

              "Vegetables",

              "Fruits",

              "Palm Plantation",

              "Cocoa",

              "Other Crops",
            ]}
            placeholder="Select Crop Type"
            allowOther
            onChange={(value) => updateField("cropType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="livestock-type"
            name="livestockType"
            label="Livestock Type"
            value={data.livestockType}
            customValue={data.customLivestockType}
            onCustomChange={(value) =>
              updateField("customLivestockType", value)
            }
            options={[
              "Poultry",

              "Cattle",

              "Goat",

              "Sheep",

              "Fish",

              "Pig Farming",

              "No Livestock",
            ]}
            placeholder="Select Livestock Type"
            allowOther
            onChange={(value) => updateField("livestockType", value)}
          />
        </div>
      </div>
      {/* WATER SOURCE + SOIL TYPE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="water-source"
            name="waterSource"
            label="Water Source"
            value={data.waterSource}
            customValue={data.customWaterSource}
            onCustomChange={(value) => updateField("customWaterSource", value)}
            options={[
              "Borehole",

              "River",

              "Well",

              "Irrigation System",

              "Rain Fed",
            ]}
            placeholder="Select Water Source"
            allowOther
            onChange={(value) => updateField("waterSource", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="soil-type"
            name="soilType"
            label="Soil Type"
            value={data.soilType}
            customValue={data.customSoilType}
            onCustomChange={(value) => updateField("customSoilType", value)}
            options={[
              "Fertile Soil",

              "Sandy Soil",

              "Clay Soil",

              "Loamy Soil",

              "Mixed Soil",
            ]}
            placeholder="Select Soil Type"
            allowOther
            onChange={(value) => updateField("soilType", value)}
          />
        </div>
      </div>
      {/* FARM INFRASTRUCTURE */}
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Farm Infrastructure
        </label>

        <div className="row g-2">
          {[
            "Farm House",

            "Storage Building",

            "Warehouse",

            "Greenhouse",

            "Animal Shelter",

            "Fish Pond",

            "Processing Area",

            "Workers Accommodation",
          ].map((item) => (
            <div key={item} className="col-12 col-md-4">
              <button
                type="button"
                onClick={() => toggleArrayItem("infrastructure", item)}
                className={
                  data.infrastructure.includes(item)
                    ? "btn btn-dark w-100 text-start"
                    : "btn btn-light border w-100 text-start"
                }
                style={{
                  borderRadius: "8px",

                  fontSize: "12px",

                  minHeight: "42px",
                }}
              >
                {data.infrastructure.includes(item) ? "✓ " : "+ "}

                {item}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* POWER SUPPLY + ACCESS ROAD */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="farm-power"
            name="powerSupply"
            label="Power Supply"
            value={data.powerSupply}
            customValue={data.customPowerSupply}
            onCustomChange={(value) => updateField("customPowerSupply", value)}
            options={[
              "Public Electricity",

              "Generator",

              "Solar Power",

              "No Power",
            ]}
            placeholder="Select Power Supply"
            allowOther
            onChange={(value) => updateField("powerSupply", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="access-road"
            name="accessRoad"
            label="Access Road"
            value={data.accessRoad}
            customValue={data.customAccessRoad}
            onCustomChange={(value) => updateField("customAccessRoad", value)}
            options={[
              "Tarred Road",

              "Motorable Road",

              "Farm Road",

              "Poor Access",

              "No Direct Access",
            ]}
            placeholder="Select Access Road"
            allowOther
            onChange={(value) => updateField("accessRoad", value)}
          />
        </div>
      </div>
      {/* SECURITY FEATURES */}
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Security Features
        </label>

        <div className="row g-2">
          {[
            "Security Guard",

            "Fenced Property",

            "CCTV",

            "Security Gate",

            "Caretaker",

            "24/7 Security",
          ].map((item) => (
            <div key={item} className="col-12 col-md-4">
              <button
                type="button"
                onClick={() => toggleArrayItem("securityFeatures", item)}
                className={
                  data.securityFeatures.includes(item)
                    ? "btn btn-dark w-100 text-start"
                    : "btn btn-light border w-100 text-start"
                }
                style={{
                  borderRadius: "8px",

                  fontSize: "12px",

                  minHeight: "42px",
                }}
              >
                {data.securityFeatures.includes(item) ? "✓ " : "+ "}

                {item}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* FEATURES */}
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Key Farm Features
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
            "Large Farmland",

            "Fertile Land",

            "Good Water Access",

            "Suitable For Farming",

            "Near Market",

            "Good Transportation",

            "Existing Farm Operation",

            "Investment Opportunity",

            "Good Soil Quality",

            "Ready For Production",

            "Expandable Land",

            "Commercial Farming Suitable",
          ].map((feature) => (
            <div key={feature} className="col-12 col-md-4">
              <button
                type="button"
                onClick={() => toggleArrayItem("features", feature)}
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
