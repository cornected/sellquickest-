"use client";

import { StyledSelect } from "../../../StyledSelect";

type GirlsSkirtFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function GirlsSkirtFields({ data, updateField }: GirlsSkirtFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👗 Girls Skirt Details</h6>
      </div>

      {/* SKIRT TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-skirt-type"
          name="skirtType"
          label="Skirt Type"
          value={data.skirtType}
          customValue={data.customSkirtType}
          onCustomChange={(value) => updateField("customSkirtType", value)}
          options={[
            "Pleated Skirt",
            "A-Line Skirt",
            "Denim Skirt",
            "Tutu Skirt",
            "Maxi Skirt",
            "Mini Skirt",
            "Pencil Skirt",
          ]}
          placeholder="Select Skirt Type"
          allowOther
          onChange={(value) => updateField("skirtType", value)}
        />
      </div>

      {/* LENGTH */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-skirt-length"
          name="skirtLength"
          label="Skirt Length"
          value={data.skirtLength}
          customValue={data.customSkirtLength}
          onCustomChange={(value) => updateField("customSkirtLength", value)}
          options={["Mini", "Knee Length", "Midi", "Maxi"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("skirtLength", value)}
        />
      </div>

      {/* WAIST STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-skirt-waist"
          name="skirtWaist"
          label="Waist Style"
          value={data.skirtWaist}
          customValue={data.customSkirtWaist}
          onCustomChange={(value) => updateField("customSkirtWaist", value)}
          options={[
            "Elastic Waist",
            "High Waist",
            "Adjustable Waist",
            "Button Waist",
          ]}
          placeholder="Select Waist Style"
          allowOther
          onChange={(value) => updateField("skirtWaist", value)}
        />
      </div>

      {/* MATERIAL */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-skirt-material"
          name="skirtMaterial"
          label="Material"
          value={data.skirtMaterial}
          customValue={data.customSkirtMaterial}
          onCustomChange={(value) => updateField("customSkirtMaterial", value)}
          options={["Cotton", "Denim", "Lace", "Tulle", "Chiffon", "Polyester"]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("skirtMaterial", value)}
        />
      </div>

      {/* DESIGN */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-skirt-design"
          name="skirtDesign"
          label="Design / Pattern"
          value={data.skirtDesign}
          customValue={data.customSkirtDesign}
          onCustomChange={(value) => updateField("customSkirtDesign", value)}
          options={[
            "Plain",
            "Floral",
            "Checked",
            "Printed",
            "Embroidered",
            "Beaded",
          ]}
          placeholder="Select Design"
          allowOther
          onChange={(value) => updateField("skirtDesign", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-skirt-occasion"
          name="skirtOccasion"
          label="Occasion"
          value={data.skirtOccasion}
          customValue={data.customSkirtOccasion}
          onCustomChange={(value) => updateField("customSkirtOccasion", value)}
          options={["Everyday Wear", "School", "Birthday", "Party", "Holiday"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("skirtOccasion", value)}
        />
      </div>
    </div>
  );
}
