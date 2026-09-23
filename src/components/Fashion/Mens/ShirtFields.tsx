"use client";

import { StyledSelect } from "../../StyledSelect";

type ShirtFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function ShirtFields({
  data,

  updateField,
}: ShirtFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👕 Shirt Details</h6>
      </div>

      {/* SHIRT TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="shirt-type"
          name="shirtType"
          label="Shirt Type"
          value={data.shirtType}
          customValue={data.customShirtType}
          onCustomChange={(value) => updateField("customShirtType", value)}
          options={[
            "Formal Shirt",

            "Casual Shirt",

            "Polo Shirt",

            "Oxford Shirt",

            "Dress Shirt",

            "Hawaiian Shirt",

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
          id="shirt-sleeve"
          name="shirtSleeve"
          label="Sleeve Type"
          value={data.shirtSleeve}
          customValue={data.customShirtSleeve}
          onCustomChange={(value) => updateField("customShirtSleeve", value)}
          options={["Short Sleeve", "Long Sleeve", "Sleeveless"]}
          placeholder="Select Sleeve"
          allowOther
          onChange={(value) => updateField("shirtSleeve", value)}
        />
      </div>

      {/* COLLAR */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="shirt-collar"
          name="shirtCollar"
          label="Collar Style"
          value={data.shirtCollar}
          customValue={data.customShirtCollar}
          onCustomChange={(value) => updateField("customShirtCollar", value)}
          options={[
            "Button Down",

            "Spread Collar",

            "Mandarin Collar",

            "Classic Collar",

            "Round Collar",
          ]}
          placeholder="Select Collar Style"
          allowOther
          onChange={(value) => updateField("shirtCollar", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="shirt-fit"
          name="shirtFit"
          label="Fit"
          value={data.shirtFit}
          customValue={data.customShirtFit}
          onCustomChange={(value) => updateField("customShirtFit", value)}
          options={["Slim Fit", "Regular Fit", "Loose Fit", "Oversized"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("shirtFit", value)}
        />
      </div>

      {/* DESIGN */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="shirt-design"
          name="shirtDesign"
          label="Design"
          value={data.shirtDesign}
          customValue={data.customShirtDesign}
          onCustomChange={(value) => updateField("customShirtDesign", value)}
          options={[
            "Plain",

            "Pattern",

            "Checked",

            "Striped",

            "Printed",

            "Embroidered",
          ]}
          placeholder="Select Design"
          allowOther
          onChange={(value) => updateField("shirtDesign", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="shirt-occasion"
          name="shirtOccasion"
          label="Occasion"
          value={data.shirtOccasion}
          customValue={data.customShirtOccasion}
          onCustomChange={(value) => updateField("customShirtOccasion", value)}
          options={["Office", "Casual", "Wedding", "Party", "Everyday Wear"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("shirtOccasion", value)}
        />
      </div>
    </div>
  );
}
