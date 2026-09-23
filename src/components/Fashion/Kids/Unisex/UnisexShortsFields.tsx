"use client";

import { StyledSelect } from "../../../StyledSelect";

type UnisexShortsFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function UnisexShortsFields({
  data,
  updateField,
}: UnisexShortsFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🩳 Unisex Kids Shorts Details</h6>
      </div>

      {/* SHORTS TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-shorts-type"
          name="unisexShortsType"
          label="Shorts Type"
          value={data.unisexShortsType}
          customValue={data.customUnisexShortsType}
          onCustomChange={(value) => updateField("customUnisexShortsType", value)}
          options={[
            "Casual Cotton Shorts",
            "Denim Shorts",
            "Sports / Athletic Shorts",
            "Cargo Shorts",
            "Bermuda Shorts",
            "Board / Swim Shorts",
            "Sweat / Fleece Shorts",
          ]}
          placeholder="Select Shorts Type"
          allowOther
          onChange={(value) => updateField("unisexShortsType", value)}
        />
      </div>

      {/* LENGTH */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-shorts-length"
          name="unisexShortsLength"
          label="Length"
          value={data.unisexShortsLength}
          customValue={data.customUnisexShortsLength}
          onCustomChange={(value) => updateField("customUnisexShortsLength", value)}
          options={["Mid-Thigh", "Above the Knee", "Knee Length", "Bermuda Length"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("unisexShortsLength", value)}
        />
      </div>

      {/* WAIST STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-shorts-waist"
          name="unisexShortsWaist"
          label="Waist Type"
          value={data.unisexShortsWaist}
          customValue={data.customUnisexShortsWaist}
          onCustomChange={(value) => updateField("customUnisexShortsWaist", value)}
          options={[
            "Elastic Waist",
            "Drawstring Elastic",
            "Button & Zip Fly",
            "Adjustable Inner Waist",
          ]}
          placeholder="Select Waist Type"
          allowOther
          onChange={(value) => updateField("unisexShortsWaist", value)}
        />
      </div>

      {/* MATERIAL / FABRIC */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-shorts-material"
          name="unisexShortsMaterial"
          label="Material / Fabric"
          value={data.unisexShortsMaterial}
          customValue={data.customUnisexShortsMaterial}
          onCustomChange={(value) => updateField("customUnisexShortsMaterial", value)}
          options={[
            "100% Cotton",
            "Denim",
            "Fleece / French Terry",
            "Polyester / Mesh",
            "Linen Blend",
            "Nylon / Quick-Dry",
          ]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("unisexShortsMaterial", value)}
        />
      </div>

      {/* FIT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-shorts-fit"
          name="unisexShortsFit"
          label="Fit"
          value={data.unisexShortsFit}
          customValue={data.customUnisexShortsFit}
          onCustomChange={(value) => updateField("customUnisexShortsFit", value)}
          options={["Regular Fit", "Relaxed Fit", "Loose / Baggy", "Slim Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("unisexShortsFit", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-shorts-occasion"
          name="unisexShortsOccasion"
          label="Occasion"
          value={data.unisexShortsOccasion}
          customValue={data.customUnisexShortsOccasion}
          onCustomChange={(value) => updateField("customUnisexShortsOccasion", value)}
          options={["Casual Everyday", "Sports & Play", "Beach / Swimming", "School", "Lounge / Sleep"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("unisexShortsOccasion", value)}
        />
      </div>
    </div>
  );
}
