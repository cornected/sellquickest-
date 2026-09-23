"use client";

import { StyledSelect } from "../../../StyledSelect";

type BoysShirtFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function BoysShirtFields({
  data,

  updateField,
}: BoysShirtFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👕 Boys Shirt Details</h6>
      </div>

      {/* SHIRT TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-shirt-type"
          name="shirtType"
          label="Shirt Type"
          value={data.shirtType}
          customValue={data.customShirtType}
          onCustomChange={(value) => updateField("customShirtType", value)}
          options={[
            "Casual Shirt",

            "Formal Shirt",

            "Long Sleeve Shirt",

            "Short Sleeve Shirt",

            "School Shirt",

            "Native Shirt",
          ]}
          placeholder="Select Shirt Type"
          allowOther
          onChange={(value) => updateField("shirtType", value)}
        />
      </div>

      {/* SLEEVE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-shirt-sleeve"
          name="shirtSleeve"
          label="Sleeve"
          value={data.shirtSleeve}
          customValue={data.customShirtSleeve}
          onCustomChange={(value) => updateField("customShirtSleeve", value)}
          options={["Short Sleeve", "Long Sleeve", "Three Quarter Sleeve"]}
          placeholder="Select Sleeve"
          allowOther
          onChange={(value) => updateField("shirtSleeve", value)}
        />
      </div>

      {/* COLLAR */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-shirt-collar"
          name="shirtCollar"
          label="Collar"
          value={data.shirtCollar}
          customValue={data.customShirtCollar}
          onCustomChange={(value) => updateField("customShirtCollar", value)}
          options={[
            "Regular Collar",

            "Mandarin Collar",

            "Button Down Collar",

            "Round Neck",
          ]}
          placeholder="Select Collar"
          allowOther
          onChange={(value) => updateField("shirtCollar", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-shirt-fit"
          name="shirtFit"
          label="Fit"
          value={data.shirtFit}
          customValue={data.customShirtFit}
          onCustomChange={(value) => updateField("customShirtFit", value)}
          options={["Slim Fit", "Regular Fit", "Loose Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("shirtFit", value)}
        />
      </div>

      {/* DESIGN */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-shirt-design"
          name="shirtDesign"
          label="Design"
          value={data.shirtDesign}
          customValue={data.customShirtDesign}
          onCustomChange={(value) => updateField("customShirtDesign", value)}
          options={["Plain", "Checked", "Striped", "Printed", "Patterned"]}
          placeholder="Select Design"
          allowOther
          onChange={(value) => updateField("shirtDesign", value)}
        />
      </div>

      {/* FABRIC */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-shirt-fabric"
          name="shirtFabric"
          label="Fabric"
          value={data.shirtFabric}
          customValue={data.customShirtFabric}
          onCustomChange={(value) => updateField("customShirtFabric", value)}
          options={["Cotton", "Linen", "Denim", "Polyester", "Silk"]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("shirtFabric", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-shirt-occasion"
          name="shirtOccasion"
          label="Occasion"
          value={data.shirtOccasion}
          customValue={data.customShirtOccasion}
          onCustomChange={(value) => updateField("customShirtOccasion", value)}
          options={["School", "Casual", "Birthday", "Party", "Formal Event"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("shirtOccasion", value)}
        />
      </div>
    </div>
  );
}
