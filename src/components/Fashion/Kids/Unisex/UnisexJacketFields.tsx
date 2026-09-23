"use client";

import { StyledSelect } from "../../../StyledSelect";

type UnisexJacketFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function UnisexJacketFields({
  data,
  updateField,
}: UnisexJacketFieldsProps) {
  return (
    <div className="row g-3 mt-3">
      <h6 className="fw-semibold text-dark">🧥 Unisex Kids Jacket & Coat Details</h6>

      {/* JACKET TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-jacket-type"
          name="unisexJacketType"
          label="Jacket Type"
          value={data.unisexJacketType}
          customValue={data.customUnisexJacketType}
          onCustomChange={(value) => updateField("customUnisexJacketType", value)}
          options={[
            "Denim Jacket",
            "Windbreaker / Rain Jacket",
            "Bomber Jacket",
            "Puffer / Winter Coat",
            "Varsity / College Jacket",
            "Fleece Zip Jacket",
            "Track Jacket",
          ]}
          placeholder="Select Jacket Type"
          allowOther
          onChange={(value) => updateField("unisexJacketType", value)}
        />
      </div>

      {/* CLOSURE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-jacket-closure"
          name="unisexJacketClosure"
          label="Closure"
          value={data.unisexJacketClosure}
          customValue={data.customUnisexJacketClosure}
          onCustomChange={(value) => updateField("customUnisexJacketClosure", value)}
          options={["Zipper", "Snap Buttons", "Buttons", "Velcro", "Open Front"]}
          placeholder="Select Closure"
          allowOther
          onChange={(value) => updateField("unisexJacketClosure", value)}
        />
      </div>

      {/* MATERIAL */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-jacket-material"
          name="unisexJacketMaterial"
          label="Material"
          value={data.unisexJacketMaterial}
          customValue={data.customUnisexJacketMaterial}
          onCustomChange={(value) => updateField("customUnisexJacketMaterial", value)}
          options={[
            "Denim",
            "Nylon / Waterproof",
            "Polyester",
            "Fleece",
            "Cotton Twill",
            "Faux Leather",
          ]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("unisexJacketMaterial", value)}
        />
      </div>

      {/* FIT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-jacket-fit"
          name="unisexJacketFit"
          label="Fit"
          value={data.unisexJacketFit}
          customValue={data.customUnisexJacketFit}
          onCustomChange={(value) => updateField("customUnisexJacketFit", value)}
          options={["Regular Fit", "Relaxed Fit", "Slim Fit", "Oversized"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("unisexJacketFit", value)}
        />
      </div>

      {/* THICKNESS */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-jacket-thickness"
          name="unisexJacketThickness"
          label="Thickness / Lining"
          value={data.unisexJacketThickness}
          customValue={data.customUnisexJacketThickness}
          onCustomChange={(value) => updateField("customUnisexJacketThickness", value)}
          options={["Lightweight (Unlined)", "Medium (Cotton Lined)", "Padded / Quilted", "Heavy Winter (Sherpa / Fleece Lined)"]}
          placeholder="Select Thickness"
          allowOther
          onChange={(value) => updateField("unisexJacketThickness", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-jacket-occasion"
          name="unisexJacketOccasion"
          label="Occasion"
          value={data.unisexJacketOccasion}
          customValue={data.customUnisexJacketOccasion}
          onCustomChange={(value) => updateField("customUnisexJacketOccasion", value)}
          options={["Casual / Daily", "School", "Rain / Harmattan Weather", "Travel", "Party / Outing"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("unisexJacketOccasion", value)}
        />
      </div>
    </div>
  );
}
