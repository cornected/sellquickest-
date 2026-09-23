"use client";

import { StyledSelect } from "../../../StyledSelect";

type UnisexTracksuitFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function UnisexTracksuitFields({
  data,
  updateField,
}: UnisexTracksuitFieldsProps) {
  return (
    <div className="row g-3 mt-3">
      <h6 className="fw-semibold text-dark">🏃 Unisex Kids Tracksuit & Sports Set Details</h6>

      {/* TRACKSUIT SET TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-tracksuit-type"
          name="unisexTracksuitType"
          label="Tracksuit Set Type"
          value={data.unisexTracksuitType}
          customValue={data.customUnisexTracksuitType}
          onCustomChange={(value) => updateField("customUnisexTracksuitType", value)}
          options={[
            "Zip Jacket & Joggers Set",
            "Hoodie & Sweatpants Set",
            "Sweatshirt & Joggers Set",
            "T-Shirt & Shorts Sports Set",
            "Athletic Warm-Up Suit",
          ]}
          placeholder="Select Set Type"
          allowOther
          onChange={(value) => updateField("unisexTracksuitType", value)}
        />
      </div>

      {/* MATERIAL */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-tracksuit-material"
          name="unisexTracksuitMaterial"
          label="Material / Fabric"
          value={data.unisexTracksuitMaterial}
          customValue={data.customUnisexTracksuitMaterial}
          onCustomChange={(value) => updateField("customUnisexTracksuitMaterial", value)}
          options={[
            "Polyester Tricot",
            "Cotton Fleece",
            "French Terry",
            "Dry-Fit / Performance Poly",
            "Velour / Velvet",
            "Nylon Windbreaker",
          ]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("unisexTracksuitMaterial", value)}
        />
      </div>

      {/* FIT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-tracksuit-fit"
          name="unisexTracksuitFit"
          label="Fit"
          value={data.unisexTracksuitFit}
          customValue={data.customUnisexTracksuitFit}
          onCustomChange={(value) => updateField("customUnisexTracksuitFit", value)}
          options={["Regular Athletic Fit", "Slim Fit", "Relaxed Fit", "Oversized"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("unisexTracksuitFit", value)}
        />
      </div>

      {/* JACKET CLOSURE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-tracksuit-closure"
          name="unisexTracksuitClosure"
          label="Top Closure"
          value={data.unisexTracksuitClosure}
          customValue={data.customUnisexTracksuitClosure}
          onCustomChange={(value) => updateField("customUnisexTracksuitClosure", value)}
          options={["Full Zipper", "Half / Quarter Zipper", "Pullover", "Snap Buttons"]}
          placeholder="Select Closure"
          allowOther
          onChange={(value) => updateField("unisexTracksuitClosure", value)}
        />
      </div>

      {/* CUFF & WAIST STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-tracksuit-cuff"
          name="unisexTracksuitCuff"
          label="Cuff & Hem Style"
          value={data.unisexTracksuitCuff}
          customValue={data.customUnisexTracksuitCuff}
          onCustomChange={(value) => updateField("customUnisexTracksuitCuff", value)}
          options={["Ribbed Elastic Cuffs", "Open Bottom Hem", "Drawstring Cuffs", "Zipped Ankles"]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("unisexTracksuitCuff", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-tracksuit-occasion"
          name="unisexTracksuitOccasion"
          label="Occasion"
          value={data.unisexTracksuitOccasion}
          customValue={data.customUnisexTracksuitOccasion}
          onCustomChange={(value) => updateField("customUnisexTracksuitOccasion", value)}
          options={["Sports / Training", "School PE / Sports Day", "Casual Wear", "Travel", "Loungewear"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("unisexTracksuitOccasion", value)}
        />
      </div>
    </div>
  );
}
