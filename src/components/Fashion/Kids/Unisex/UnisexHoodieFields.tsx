"use client";

import { StyledSelect } from "../../../StyledSelect";

type UnisexHoodieFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function UnisexHoodieFields({
  data,
  updateField,
}: UnisexHoodieFieldsProps) {
  return (
    <div className="row g-3 mt-3">
      <h6 className="fw-semibold text-dark">🧥 Unisex Kids Hoodie & Sweatshirt Details</h6>

      {/* HOODIE TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-hoodie-type"
          name="unisexHoodieType"
          label="Hoodie / Sweatshirt Type"
          value={data.unisexHoodieType}
          customValue={data.customUnisexHoodieType}
          onCustomChange={(value) => updateField("customUnisexHoodieType", value)}
          options={[
            "Pullover Hoodie",
            "Zip-Up Hoodie",
            "Crewneck Sweatshirt",
            "Oversized Hoodie",
            "Fleece Hoodie",
            "Graphic Hoodie",
          ]}
          placeholder="Select Type"
          allowOther
          onChange={(value) => updateField("unisexHoodieType", value)}
        />
      </div>

      {/* THICKNESS */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-hoodie-thickness"
          name="unisexHoodieThickness"
          label="Thickness / Warmth"
          value={data.unisexHoodieThickness}
          customValue={data.customUnisexHoodieThickness}
          onCustomChange={(value) => updateField("customUnisexHoodieThickness", value)}
          options={["Lightweight", "Medium Weight", "Heavy Fleece", "Thermal / Winter"]}
          placeholder="Select Thickness"
          allowOther
          onChange={(value) => updateField("unisexHoodieThickness", value)}
        />
      </div>

      {/* CLOSURE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-hoodie-closure"
          name="unisexHoodieClosure"
          label="Closure"
          value={data.unisexHoodieClosure}
          customValue={data.customUnisexHoodieClosure}
          onCustomChange={(value) => updateField("customUnisexHoodieClosure", value)}
          options={["Pullover (No Closure)", "Full Front Zipper", "Quarter Zip", "Snap Buttons"]}
          placeholder="Select Closure"
          allowOther
          onChange={(value) => updateField("unisexHoodieClosure", value)}
        />
      </div>

      {/* FIT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-hoodie-fit"
          name="unisexHoodieFit"
          label="Fit"
          value={data.unisexHoodieFit}
          customValue={data.customUnisexHoodieFit}
          onCustomChange={(value) => updateField("customUnisexHoodieFit", value)}
          options={["Regular Fit", "Relaxed Fit", "Oversized / Baggy", "Slim Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("unisexHoodieFit", value)}
        />
      </div>

      {/* MATERIAL */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-hoodie-material"
          name="unisexHoodieMaterial"
          label="Material"
          value={data.unisexHoodieMaterial}
          customValue={data.customUnisexHoodieMaterial}
          onCustomChange={(value) => updateField("customUnisexHoodieMaterial", value)}
          options={[
            "Cotton Fleece",
            "Cotton Blend",
            "Polyester Fleece",
            "French Terry",
            "Sherpa / Teddy",
          ]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("unisexHoodieMaterial", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-hoodie-occasion"
          name="unisexHoodieOccasion"
          label="Occasion"
          value={data.unisexHoodieOccasion}
          customValue={data.customUnisexHoodieOccasion}
          onCustomChange={(value) => updateField("customUnisexHoodieOccasion", value)}
          options={["Casual / Daily", "School / Outing", "Cold Weather / Rain", "Sports / Active", "Travel"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("unisexHoodieOccasion", value)}
        />
      </div>
    </div>
  );
}
