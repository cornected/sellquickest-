"use client";

import { StyledSelect } from "../../../StyledSelect";

type UnisexJeansFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function UnisexJeansFields({
  data,
  updateField,
}: UnisexJeansFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👖 Unisex Kids Jeans Details</h6>
      </div>

      {/* JEANS TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-jeans-type"
          name="unisexJeansType"
          label="Jeans Type"
          value={data.unisexJeansType}
          customValue={data.customUnisexJeansType}
          onCustomChange={(value) => updateField("customUnisexJeansType", value)}
          options={[
            "Straight Leg Jeans",
            "Relaxed Fit Jeans",
            "Skinny Jeans",
            "Cargo Jeans",
            "Elastic Waist Jeans",
            "Ripped / Distressed Jeans",
            "Jeggings",
          ]}
          placeholder="Select Jeans Type"
          allowOther
          onChange={(value) => updateField("unisexJeansType", value)}
        />
      </div>

      {/* FIT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-jeans-fit"
          name="unisexJeansFit"
          label="Fit"
          value={data.unisexJeansFit}
          customValue={data.customUnisexJeansFit}
          onCustomChange={(value) => updateField("customUnisexJeansFit", value)}
          options={["Regular Fit", "Slim Fit", "Loose / Relaxed Fit", "Straight Fit", "Baggy Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("unisexJeansFit", value)}
        />
      </div>

      {/* WAIST STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-jeans-waist"
          name="unisexJeansWaist"
          label="Waistband Type"
          value={data.unisexJeansWaist}
          customValue={data.customUnisexJeansWaist}
          onCustomChange={(value) => updateField("customUnisexJeansWaist", value)}
          options={[
            "Elastic Waistband",
            "Adjustable Inner Waistband",
            "Drawstring Waist",
            "Button & Zipper Fly",
            "Snap Button Waist",
          ]}
          placeholder="Select Waistband Type"
          allowOther
          onChange={(value) => updateField("unisexJeansWaist", value)}
        />
      </div>

      {/* LENGTH */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-jeans-length"
          name="unisexJeansLength"
          label="Length"
          value={data.unisexJeansLength}
          customValue={data.customUnisexJeansLength}
          onCustomChange={(value) => updateField("customUnisexJeansLength", value)}
          options={["Full Length", "Ankle Length", "Cropped / Capris", "Turn-up / Cuffed"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("unisexJeansLength", value)}
        />
      </div>

      {/* WASH / SHADE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-jeans-wash"
          name="unisexJeansWash"
          label="Denim Wash"
          value={data.unisexJeansWash}
          customValue={data.customUnisexJeansWash}
          onCustomChange={(value) => updateField("customUnisexJeansWash", value)}
          options={[
            "Light Wash",
            "Medium Blue Wash",
            "Dark Indigo Wash",
            "Black Denim",
            "Grey Denim",
            "Acid / Stone Wash",
            "White Denim",
          ]}
          placeholder="Select Denim Wash"
          allowOther
          onChange={(value) => updateField("unisexJeansWash", value)}
        />
      </div>

      {/* STRETCH */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-jeans-stretch"
          name="unisexJeansStretch"
          label="Stretch"
          value={data.unisexJeansStretch}
          options={["Stretch Denim", "Non-Stretch Denim", "Super Stretch"]}
          placeholder="Select Stretch"
          onChange={(value) => updateField("unisexJeansStretch", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-jeans-occasion"
          name="unisexJeansOccasion"
          label="Occasion"
          value={data.unisexJeansOccasion}
          customValue={data.customUnisexJeansOccasion}
          onCustomChange={(value) => updateField("customUnisexJeansOccasion", value)}
          options={["Casual Everyday", "School / Outing", "Party", "Travel"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("unisexJeansOccasion", value)}
        />
      </div>
    </div>
  );
}
