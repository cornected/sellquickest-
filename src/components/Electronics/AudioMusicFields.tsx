"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { ElectronicsBrandSelect } from "./ElectronicsBrandSelect";

type AudioMusicFieldsProps = {
  onChange: (data: object) => void;
};

const AUDIO_BRANDS = [
  "JBL",
  "Sony",
  "Bose",
  "Harman Kardon",
  "Marshall",
  "Pioneer",
  "Yamaha",
  "Behringer",
  "Polystar",
  "Oraimo",
  "Anker Soundcore",
  "Zealot",
  "LG",
  "Samsung",
  "Denon",
  "Sennheiser",
];

const AUDIO_TYPES = [
  "Home Theatre & Surround Sound (5.1 / 7.1)",
  "Soundbar with Wireless Subwoofer",
  "Portable Bluetooth Speaker",
  "DJ Mixer, Deck & Turntable",
  "Studio Monitor & Production Speakers",
  "Power Amplifier & PA System",
  "Microphone (Wireless / Condenser)",
  "Public Address (PA) Horn Speaker",
];

const AUDIO_FEATURES = [
  "Bluetooth Wireless Streaming",
  "Optical & HDMI ARC Input",
  "Deep Bass Subwoofer Included",
  "Rechargeable Long-Lasting Battery",
  "Waterproof / Splashproof (IPX7)",
  "RGB Party Lighting Effects",
  "Remote Control Included",
  "Dual Wireless Mic Included",
  "FM Radio & USB / SD Card Playback",
  "Original Power Adapter / Box",
];

export function AudioMusicFields({ onChange }: AudioMusicFieldsProps) {
  const [data, setData] = useState({
    brand: "",
    customBrand: "",
    model: "",
    audioType: "",
    customAudioType: "",
    powerOutput: "100W - 300W",
    connectivity: "Bluetooth + AUX + Optical",
    condition: "Foreign Used (UK / Tokunbo)",
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
      <h5 className="h6 fw-bold mb-3 text-dark">🔊 Audio & Music Equipment Specifications</h5>

      {/* BRAND & MODEL */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <ElectronicsBrandSelect
            id="audio-brand"
            category="Audio & Music Systems"
            label="Brand"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(val) => updateField("customBrand", val)}
            onChange={(val) => updateField("brand", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Model / Series
          </label>
          <input
            value={data.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="e.g. Boombox 3, PartyBox 310, HT-S20R, DDJ-FLX4"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* AUDIO TYPE & POWER */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="audio-type"
            name="audioType"
            label="Equipment Category"
            value={data.audioType}
            customValue={data.customAudioType}
            onCustomChange={(val) => updateField("customAudioType", val)}
            options={AUDIO_TYPES}
            placeholder="Select Equipment Type"
            allowOther
            onChange={(val) => updateField("audioType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="audio-power"
            name="powerOutput"
            label="Power Output (Watts)"
            value={data.powerOutput}
            options={[
              "Under 50W (Personal Portable)",
              "50W - 100W",
              "100W - 300W (Room Filling)",
              "400W - 800W (Club / Party)",
              "1000W+ (Auditorium / Stadium)",
            ]}
            placeholder="Select Power Output"
            onChange={(val) => updateField("powerOutput", val)}
          />
        </div>
      </div>

      {/* CONDITION & CONNECTIVITY */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="audio-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            options={[
              "Brand New Sealed",
              "Foreign Used (UK / Tokunbo)",
              "Nigerian Used (Tested Clean)",
              "Open Box",
            ]}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="audio-connectivity"
            name="connectivity"
            label="Connectivity Options"
            value={data.connectivity}
            options={[
              "Bluetooth Wireless Only",
              "Bluetooth + AUX + Optical",
              "HDMI ARC + Optical + USB",
              "XLR + Balanced TRS (Pro Audio)",
              "RCA + Phono (DJ)",
            ]}
            placeholder="Select Connectivity"
            onChange={(val) => updateField("connectivity", val)}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Features & Audio Accessories
        </label>
        <div className="d-flex flex-wrap gap-2">
          {AUDIO_FEATURES.map((feat) => {
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
