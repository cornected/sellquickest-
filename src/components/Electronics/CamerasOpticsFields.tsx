"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { ElectronicsBrandSelect } from "./ElectronicsBrandSelect";

type CamerasOpticsFieldsProps = {
  onChange: (data: object) => void;
};

const CAMERA_BRANDS = [
  "Canon",
  "Sony",
  "Nikon",
  "DJI",
  "Fujifilm",
  "Panasonic Lumix",
  "GoPro",
  "Blackmagic Design",
  "Olympus",
  "Leica",
  "Insta360",
  "Sigma",
];

const CAMERA_TYPES = [
  "Mirrorless Camera Body",
  "DSLR Camera Body",
  "Camera with Kit Lens Bundle",
  "Drone with 4K Camera",
  "Action Camera (Waterproof)",
  "Cinema / Video Production Camera",
  "Camera Lens Only (Prime / Zoom)",
  "Studio Lighting & Ring Light",
];

const CAMERA_FEATURES = [
  "4K / 60fps Video Recording",
  "Lens Included (Kit Lens / Prime)",
  "Dual SD Card Slots",
  "In-Body Image Stabilization (IBIS)",
  "Includes Extra Batteries & Dual Charger",
  "Camera Bag & Strap Included",
  "Original Box & Manuals",
  "Low Shutter Count (< 10k clicks)",
  "Clean Sensor / No Scratches",
  "Flip / Articulating Selfie Screen",
];

export function CamerasOpticsFields({ onChange }: CamerasOpticsFieldsProps) {
  const [data, setData] = useState({
    brand: "",
    customBrand: "",
    model: "",
    cameraType: "",
    customCameraType: "",
    sensorResolution: "24 - 33 Megapixels",
    condition: "Foreign Used (UK / Tokunbo)",
    videoResolution: "4K UHD 60fps",
    features: [] as string[],
  });

  const updateField = (key: string, value: unknown) => {
    const updated = { ...data, [key]: value };
    setData(updated);
    onChange(updated);
  };

  const toggleFeature = (feature: string) => {
    const updatedFeatures = data.features.includes(feature)
      ? data.features.filter((item) => item !== feature)
      : [...data.features, feature];
    updateField("features", updatedFeatures);
  };

  return (
    <div
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <h5 className="h6 fw-bold mb-3 text-dark">📷 Cameras, Drones & Optics Specifications</h5>

      {/* BRAND & MODEL */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <ElectronicsBrandSelect
            id="camera-brand"
            category="Cameras & Camcorders"
            label="Brand"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(val) => updateField("customBrand", val)}
            onChange={(val) => updateField("brand", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Model
          </label>
          <input
            value={data.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="e.g. Sony A7 IV, Canon EOS R6, DJI Mini 4 Pro, GoPro Hero 12"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* TYPE & RESOLUTION */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="camera-type"
            name="cameraType"
            label="Equipment Type"
            value={data.cameraType}
            customValue={data.customCameraType}
            onCustomChange={(val) => updateField("customCameraType", val)}
            options={CAMERA_TYPES}
            placeholder="Select Type"
            allowOther
            onChange={(val) => updateField("cameraType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="camera-resolution"
            name="sensorResolution"
            label="Sensor Resolution"
            value={data.sensorResolution}
            options={[
              "12 - 20 Megapixels",
              "24 - 33 Megapixels (Standard)",
              "45 - 60+ Megapixels (High Res)",
              "4K Drone / Action Cam",
            ]}
            placeholder="Select Megapixels"
            onChange={(val) => updateField("sensorResolution", val)}
          />
        </div>
      </div>

      {/* CONDITION & VIDEO */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="camera-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            options={[
              "Brand New Sealed",
              "Foreign Used (UK / Tokunbo)",
              "Nigerian Used (Clean & Tested)",
              "Open Box",
            ]}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="camera-video"
            name="videoResolution"
            label="Max Video Quality"
            value={data.videoResolution}
            options={[
              "4K UHD 60fps",
              "4K UHD 120fps (Slow Motion)",
              "6K / 8K Cinema Recording",
              "1080p Full HD",
            ]}
            placeholder="Select Video Quality"
            onChange={(val) => updateField("videoResolution", val)}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Inclusions & Camera Features
        </label>
        <div className="d-flex flex-wrap gap-2">
          {CAMERA_FEATURES.map((feat) => {
            const isSelected = data.features.includes(feat);
            return (
              <button
                key={feat}
                type="button"
                onClick={() => toggleFeature(feat)}
                className={`btn btn-sm ${
                  isSelected ? "btn-dark text-white fw-semibold" : "btn-light border text-secondary"
                }`}
                style={{ borderRadius: "8px", fontSize: "12px", padding: "6px 12px" }}
              >
                {isSelected ? "✓ " : "+ "}
                {feat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
