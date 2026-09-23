"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type VideoGamesFieldsProps = {
  onChange: (data: object) => void;
};

const CONSOLES = [
  "Sony PlayStation 5 (PS5 Disc Edition)",
  "Sony PlayStation 5 (PS5 Digital Edition)",
  "Sony PlayStation 5 Slim",
  "Sony PlayStation 4 Pro (1TB 4K)",
  "Sony PlayStation 4 Slim",
  "Sony PlayStation 4 (Fat)",
  "Microsoft Xbox Series X (1TB 4K)",
  "Microsoft Xbox Series S (Digital)",
  "Microsoft Xbox One X / S",
  "Nintendo Switch OLED Model",
  "Nintendo Switch Standard / Lite",
  "Steam Deck / ASUS ROG Ally (Handheld)",
  "Gaming PC Desktop Rig",
  "Retro Console (PS3, PS2, Xbox 360)",
];

const STORAGE_OPTIONS = [
  "500 GB",
  "825 GB (PS5 Standard)",
  "1 TB (1000 GB)",
  "2 TB SSD",
  "Console Only (No Internal Drive)",
];

const GAME_FEATURES = [
  "Includes 2 Wireless Controllers",
  "Includes 1 Wireless Controller",
  "Pre-loaded with Account & Games",
  "Includes Physical Game Discs (FIFA / Call of Duty / GTA)",
  "HDMI 2.1 Cable Included",
  "Console Stand & Charging Dock",
  "Factory Sealed Box / Accessories",
  "Jailbroken / Hen Enabled",
  "Cooling Fan Stand Included",
  "Unbanned PSN / Xbox Live",
];

export function VideoGamesFields({ onChange }: VideoGamesFieldsProps) {
  const [data, setData] = useState({
    consolePlatform: "",
    customPlatform: "",
    storage: "1 TB (1000 GB)",
    condition: "Foreign Used (UK / Tokunbo)",
    edition: "Standard Disc Edition",
    controllersIncluded: "2 Original Controllers",
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
      <h5 className="h6 fw-bold mb-3 text-dark">🎮 Video Games & Console Specifications</h5>

      {/* CONSOLE & STORAGE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="game-console"
            name="consolePlatform"
            label="Console / Platform"
            value={data.consolePlatform}
            customValue={data.customPlatform}
            onCustomChange={(val) => updateField("customPlatform", val)}
            options={CONSOLES}
            placeholder="Select Gaming Console"
            allowOther
            onChange={(val) => updateField("consolePlatform", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="game-storage"
            name="storage"
            label="Storage Capacity"
            value={data.storage}
            options={STORAGE_OPTIONS}
            placeholder="Select Storage"
            onChange={(val) => updateField("storage", val)}
          />
        </div>
      </div>

      {/* CONDITION & CONTROLLERS */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="game-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            options={[
              "Brand New Sealed",
              "Foreign Used (UK / Tokunbo)",
              "Nigerian Used (Fully Tested)",
              "Open Box",
            ]}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="game-controllers"
            name="controllersIncluded"
            label="Controllers Included"
            value={data.controllersIncluded}
            options={[
              "2 Original Controllers",
              "1 Original Controller",
              "Console Only (No Controller)",
              "3+ Controllers (Party Bundle)",
            ]}
            placeholder="Select Controllers"
            onChange={(val) => updateField("controllersIncluded", val)}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Included Games & Bundle Accessories
        </label>
        <div className="d-flex flex-wrap gap-2">
          {GAME_FEATURES.map((feat) => {
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
