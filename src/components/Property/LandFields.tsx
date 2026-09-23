"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type LandFieldsProps = {
  onChange: (data: object) => void;
};

export function LandFields({ onChange }: LandFieldsProps) {
  const [data, setData] = useState({
    landType: "",
    customLandType: "",

    size: "",

    landUse: "",
    customLandUse: "",

    titleDocument: "",
    customTitleDocument: "",

    roadAccess: "",
    customRoadAccess: "",

    electricity: "",
    customElectricity: "",

    waterSupply: "",
    customWaterSupply: "",

    fencing: "",
    customFencing: "",

    terrainType: "",
    customTerrainType: "",

    developmentStatus: "",
    customDevelopmentStatus: "",

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

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",

        backgroundColor: "#f8fafc",
      }}
    >
      <h5 className="h6 fw-bold mb-3 text-dark">🌳 Land & Plots Details</h5>

      {/* LAND TYPE + SIZE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="land-type"
            name="landType"
            label="Land Type"
            value={data.landType}
            customValue={data.customLandType}
            onCustomChange={(value) => updateField("customLandType", value)}
            options={[
              "Residential Land",

              "Commercial Land",

              "Agricultural Land",

              "Industrial Land",

              "Mixed Use Land",

              "Estate Land",
            ]}
            placeholder="Select Land Type"
            allowOther
            onChange={(value) => updateField("landType", value)}
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
            placeholder="e.g. 500sqm, 2 acres"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={style}
          />
        </div>
      </div>

      {/* LAND USE + TITLE DOCUMENT */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="land-use"
            name="landUse"
            label="Land Use"
            value={data.landUse}
            customValue={data.customLandUse}
            onCustomChange={(value) => updateField("customLandUse", value)}
            options={[
              "Residential",

              "Commercial",

              "Agricultural",

              "Industrial",

              "Mixed Development",
            ]}
            placeholder="Select Land Use"
            allowOther
            onChange={(value) => updateField("landUse", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="title-document"
            name="titleDocument"
            label="Title Document"
            value={data.titleDocument}
            customValue={data.customTitleDocument}
            onCustomChange={(value) =>
              updateField("customTitleDocument", value)
            }
            options={[
              "C of O",

              "Governor's Consent",

              "Deed of Assignment",

              "Gazette",

              "Survey Plan",

              "Registered Title",

              "No Documentation",
            ]}
            placeholder="Select Document"
            allowOther
            onChange={(value) => updateField("titleDocument", value)}
          />
        </div>
      </div>

      {/* ROAD ACCESS + ELECTRICITY */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="road-access"
            name="roadAccess"
            label="Road Access"
            value={data.roadAccess}
            customValue={data.customRoadAccess}
            onCustomChange={(value) => updateField("customRoadAccess", value)}
            options={[
              "Tarred Road",

              "Untarred Road",

              "Motorable Road",

              "No Direct Access",
            ]}
            placeholder="Select Road Access"
            allowOther
            onChange={(value) => updateField("roadAccess", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="electricity"
            name="electricity"
            label="Electricity"
            value={data.electricity}
            customValue={data.customElectricity}
            onCustomChange={(value) => updateField("customElectricity", value)}
            options={["Available", "Not Available", "Nearby", "Solar Only"]}
            placeholder="Select Electricity"
            allowOther
            onChange={(value) => updateField("electricity", value)}
          />
        </div>
      </div>

      {/* WATER SUPPLY + FENCING */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="water-supply"
            name="waterSupply"
            label="Water Supply"
            value={data.waterSupply}
            customValue={data.customWaterSupply}
            onCustomChange={(value) => updateField("customWaterSupply", value)}
            options={["Borehole", "Public Water", "Well", "Not Available"]}
            placeholder="Select Water Supply"
            allowOther
            onChange={(value) => updateField("waterSupply", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="fencing"
            name="fencing"
            label="Fencing"
            value={data.fencing}
            customValue={data.customFencing}
            onCustomChange={(value) => updateField("customFencing", value)}
            options={["Fully Fenced", "Partially Fenced", "Not Fenced"]}
            placeholder="Select Fencing"
            allowOther
            onChange={(value) => updateField("fencing", value)}
          />
        </div>
      </div>

      {/* TERRAIN TYPE + DEVELOPMENT STATUS */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="terrain-type"
            name="terrainType"
            label="Terrain Type"
            value={data.terrainType}
            customValue={data.customTerrainType}
            onCustomChange={(value) => updateField("customTerrainType", value)}
            options={["Flat", "Sloped", "Rocky", "Wetland", "Mixed Terrain"]}
            placeholder="Select Terrain Type"
            allowOther
            onChange={(value) => updateField("terrainType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="development-status"
            name="developmentStatus"
            label="Development Status"
            value={data.developmentStatus}
            customValue={data.customDevelopmentStatus}
            onCustomChange={(value) =>
              updateField("customDevelopmentStatus", value)
            }
            options={["Developed", "Partially Developed", "Undeveloped"]}
            placeholder="Select Development Status"
            allowOther
            onChange={(value) => updateField("developmentStatus", value)}
          />
        </div>
      </div>

      {/* FEATURES */}

      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Key Land Features
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
            "Survey Available",

            "Corner Piece",

            "Good Road Network",

            "Secure Area",

            "Estate Environment",

            "Dry Land",

            "Flood Free",

            "Commercial Location",

            "Near Main Road",

            "Near Water Source",

            "Good Drainage",

            "Fast Developing Area",

            "Electricity Nearby",

            "Suitable For Building",

            "Clear Title",
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
