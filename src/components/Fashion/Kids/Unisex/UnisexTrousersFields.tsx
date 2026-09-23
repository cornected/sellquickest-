"use client";

import { StyledSelect } from "../../../StyledSelect";

type UnisexTrousersFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function UnisexTrousersFields({
  data,
  updateField,
}: UnisexTrousersFieldsProps) {
  return (
    <div className="row g-3 mt-3">
      <h6 className="fw-semibold text-dark">👖 Unisex Kids Trousers & Joggers Details</h6>

      {/* TROUSER TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-trouser-type"
          name="unisexTrouserType"
          label="Trouser Type"
          value={data.unisexTrouserType}
          customValue={data.customUnisexTrouserType}
          onCustomChange={(value) => updateField("customUnisexTrouserType", value)}
          options={[
            "Joggers / Sweatpants",
            "Chinos",
            "Cargo Pants",
            "School Trousers",
            "Track Pants",
            "Linen / Cotton Pants",
            "Leggings",
          ]}
          placeholder="Select Trouser Type"
          allowOther
          onChange={(value) => updateField("unisexTrouserType", value)}
        />
      </div>

      {/* FIT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-trouser-fit"
          name="unisexTrouserFit"
          label="Fit"
          value={data.unisexTrouserFit}
          customValue={data.customUnisexTrouserFit}
          onCustomChange={(value) => updateField("customUnisexTrouserFit", value)}
          options={["Regular Fit", "Slim Fit", "Relaxed / Baggy", "Tapered / Cuffed Ankle"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("unisexTrouserFit", value)}
        />
      </div>

      {/* WAIST */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-trouser-waist"
          name="unisexTrouserWaist"
          label="Waistband"
          value={data.unisexTrouserWaist}
          customValue={data.customUnisexTrouserWaist}
          onCustomChange={(value) => updateField("customUnisexTrouserWaist", value)}
          options={[
            "Elastic with Drawstring",
            "Full Elastic Waistband",
            "Adjustable Inner Elastic",
            "Button & Zipper",
          ]}
          placeholder="Select Waistband"
          allowOther
          onChange={(value) => updateField("unisexTrouserWaist", value)}
        />
      </div>

      {/* LENGTH */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-trouser-length"
          name="unisexTrouserLength"
          label="Length"
          value={data.unisexTrouserLength}
          customValue={data.customUnisexTrouserLength}
          onCustomChange={(value) => updateField("customUnisexTrouserLength", value)}
          options={["Full Length", "Ankle Length / Cuffed", "Cropped"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("unisexTrouserLength", value)}
        />
      </div>

      {/* MATERIAL */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-trouser-material"
          name="unisexTrouserMaterial"
          label="Material"
          value={data.unisexTrouserMaterial}
          customValue={data.customUnisexTrouserMaterial}
          onCustomChange={(value) => updateField("customUnisexTrouserMaterial", value)}
          options={[
            "Cotton Fleece",
            "Cotton Twill / Chino",
            "Polyester / Nylon",
            "French Terry",
            "Linen Blend",
          ]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("unisexTrouserMaterial", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-trouser-occasion"
          name="unisexTrouserOccasion"
          label="Occasion"
          value={data.unisexTrouserOccasion}
          customValue={data.customUnisexTrouserOccasion}
          onCustomChange={(value) => updateField("customUnisexTrouserOccasion", value)}
          options={["Casual / Everyday", "School", "Sports / Gym", "Loungewear / Travel", "Party / Formal"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("unisexTrouserOccasion", value)}
        />
      </div>
    </div>
  );
}
