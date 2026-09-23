"use client";

import { StyledSelect } from "../../StyledSelect";

type SportsShoesFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function SportsShoesFields({
  data,
  updateField,
}: SportsShoesFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">⚽ Sports & Performance Shoes Details</h6>
      </div>

      {/* SPORT TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="sport-type"
          name="sportType"
          label="Sport Category"
          value={data.sportType}
          customValue={data.customSportType}
          onCustomChange={(val: string) => updateField("customSportType", val)}
          options={[
            "Football Boots (Soccer Cleats)",
            "Turf / Astro-Turf Football Shoes",
            "Futsal / Indoor Soccer Shoes",
            "Basketball High-Performance",
            "Running & Marathon Racing",
            "Track & Field Spikes",
            "Tennis / Badminton Court Shoes",
            "Golf Shoes",
          ]}
          placeholder="Select Sport"
          allowOther
          onChange={(val: string) => updateField("sportType", val)}
        />
      </div>

      {/* STUD / SOLE TYPE (FOR FOOTBALL/OUTDOOR) */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="sport-stud-type"
          name="sportStudType"
          label="Ground / Surface Compatibility"
          value={data.sportStudType}
          customValue={data.customSportStudType}
          onCustomChange={(val: string) => updateField("customSportStudType", val)}
          options={[
            "FG - Firm Ground (Natural Grass)",
            "AG - Artificial Grass / Turf",
            "TF - Multi-Stud Turf Rubber",
            "IC - Indoor Court (Non-marking Gum Sole)",
            "SG - Soft Ground (Metal Studs)",
            "MG - Multi-Ground Hybrid",
          ]}
          placeholder="Select Ground Type"
          allowOther
          onChange={(val: string) => updateField("sportStudType", val)}
        />
      </div>

      {/* COLLAR DESIGN */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="sport-collar"
          name="sportCollar"
          label="Ankle Collar Design"
          value={data.sportCollar}
          options={[
            "High-Cut Dynamic Fit Collar (Sock)",
            "Low-Cut Classic Collar",
            "Mid-Cut Support",
          ]}
          placeholder="Select Collar Design"
          onChange={(val: string) => updateField("sportCollar", val)}
        />
      </div>

      {/* GRADE / TIER */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="sport-tier"
          name="sportTier"
          label="Model Tier / Quality Grade"
          value={data.sportTier}
          customValue={data.customSportTier}
          onCustomChange={(val: string) => updateField("customSportTier", val)}
          options={[
            "Elite / Pro Level (Match Quality)",
            "Academy / Club Quality",
            "Recreational / Entry Level",
            "Replica Grade",
          ]}
          placeholder="Select Grade"
          allowOther
          onChange={(val: string) => updateField("sportTier", val)}
        />
      </div>
    </div>
  );
}
