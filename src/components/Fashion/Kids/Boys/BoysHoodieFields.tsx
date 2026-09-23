"use client";

import { StyledSelect } from "../../../StyledSelect";

type BoysHoodieFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function BoysHoodieFields({
  data,

  updateField,
}: BoysHoodieFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🧥 Boys Hoodie Details</h6>
      </div>

      {/* HOODIE TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-hoodie-type"
          name="hoodieType"
          label="Hoodie Type"
          value={data.hoodieType}
          customValue={data.customHoodieType}
          onCustomChange={(value) => updateField("customHoodieType", value)}
          options={[
            "Pullover Hoodie",

            "Zip Hoodie",

            "Oversized Hoodie",

            "Sports Hoodie",

            "Graphic Hoodie",
          ]}
          placeholder="Select Hoodie Type"
          allowOther
          onChange={(value) => updateField("hoodieType", value)}
        />
      </div>

      {/* THICKNESS */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-hoodie-thickness"
          name="hoodieThickness"
          label="Thickness"
          value={data.hoodieThickness}
          customValue={data.customHoodieThickness}
          onCustomChange={(value) =>
            updateField("customHoodieThickness", value)
          }
          options={["Lightweight", "Medium", "Heavy", "Winter"]}
          placeholder="Select Thickness"
          allowOther
          onChange={(value) => updateField("hoodieThickness", value)}
        />
      </div>

      {/* CLOSURE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-hoodie-closure"
          name="hoodieClosure"
          label="Closure"
          value={data.hoodieClosure}
          customValue={data.customHoodieClosure}
          onCustomChange={(value) => updateField("customHoodieClosure", value)}
          options={["Zip", "Pullover", "Button"]}
          placeholder="Select Closure"
          allowOther
          onChange={(value) => updateField("hoodieClosure", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-hoodie-fit"
          name="hoodieFit"
          label="Fit"
          value={data.hoodieFit}
          customValue={data.customHoodieFit}
          onCustomChange={(value) => updateField("customHoodieFit", value)}
          options={["Regular Fit", "Slim Fit", "Oversized", "Loose Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("hoodieFit", value)}
        />
      </div>

      {/* PRINT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-hoodie-print"
          name="hoodiePrint"
          label="Print / Design"
          value={data.hoodiePrint}
          customValue={data.customHoodiePrint}
          onCustomChange={(value) => updateField("customHoodiePrint", value)}
          options={["Plain", "Graphic", "Cartoon", "Logo", "Pattern"]}
          placeholder="Select Design"
          allowOther
          onChange={(value) => updateField("hoodiePrint", value)}
        />
      </div>

      {/* MATERIAL */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-hoodie-material"
          name="hoodieMaterial"
          label="Material"
          value={data.hoodieMaterial}
          customValue={data.customHoodieMaterial}
          onCustomChange={(value) => updateField("customHoodieMaterial", value)}
          options={["Cotton", "Fleece", "Polyester", "Cotton Blend"]}
          placeholder="Select Material"
          allowOther
          onChange={(value) => updateField("hoodieMaterial", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-hoodie-occasion"
          name="hoodieOccasion"
          label="Occasion"
          value={data.hoodieOccasion}
          customValue={data.customHoodieOccasion}
          onCustomChange={(value) => updateField("customHoodieOccasion", value)}
          options={[
            "Everyday Wear",

            "School",

            "Travel",

            "Sports",

            "Casual Event",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("hoodieOccasion", value)}
        />
      </div>
    </div>
  );
}
