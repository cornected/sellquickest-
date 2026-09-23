"use client";

import { StyledSelect } from "../../../StyledSelect";

type BoysTShirtFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function BoysTShirtFields({
  data,

  updateField,
}: BoysTShirtFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👕 Boys T-Shirt Details</h6>
      </div>

      {/* TSHIRT TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-tshirt-type"
          name="tshirtType"
          label="T-Shirt Type"
          value={data.tshirtType}
          customValue={data.customTshirtType}
          onCustomChange={(value) => updateField("customTshirtType", value)}
          options={[
            "Casual T-Shirt",

            "Graphic T-Shirt",

            "Plain T-Shirt",

            "Sports T-Shirt",

            "Oversized T-Shirt",

            "School T-Shirt",
          ]}
          placeholder="Select T-Shirt Type"
          allowOther
          onChange={(value) => updateField("tshirtType", value)}
        />
      </div>

      {/* NECK TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-tshirt-neck"
          name="tshirtNeck"
          label="Neck Type"
          value={data.tshirtNeck}
          customValue={data.customTshirtNeck}
          onCustomChange={(value) => updateField("customTshirtNeck", value)}
          options={["Round Neck", "V Neck", "Polo Neck", "Henley Neck"]}
          placeholder="Select Neck Type"
          allowOther
          onChange={(value) => updateField("tshirtNeck", value)}
        />
      </div>

      {/* SLEEVE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-tshirt-sleeve"
          name="tshirtSleeve"
          label="Sleeve"
          value={data.tshirtSleeve}
          customValue={data.customTshirtSleeve}
          onCustomChange={(value) => updateField("customTshirtSleeve", value)}
          options={["Short Sleeve", "Long Sleeve", "Sleeveless"]}
          placeholder="Select Sleeve"
          allowOther
          onChange={(value) => updateField("tshirtSleeve", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-tshirt-fit"
          name="tshirtFit"
          label="Fit"
          value={data.tshirtFit}
          customValue={data.customTshirtFit}
          onCustomChange={(value) => updateField("customTshirtFit", value)}
          options={["Slim Fit", "Regular Fit", "Oversized", "Loose Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("tshirtFit", value)}
        />
      </div>

      {/* PRINT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-tshirt-print"
          name="tshirtPrint"
          label="Print / Design"
          value={data.tshirtPrint}
          customValue={data.customTshirtPrint}
          onCustomChange={(value) => updateField("customTshirtPrint", value)}
          options={[
            "Plain",

            "Cartoon",

            "Graphic",

            "Logo",

            "Character",

            "Pattern",
          ]}
          placeholder="Select Design"
          allowOther
          onChange={(value) => updateField("tshirtPrint", value)}
        />
      </div>

      {/* FABRIC */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-tshirt-fabric"
          name="tshirtFabric"
          label="Fabric"
          value={data.tshirtFabric}
          customValue={data.customTshirtFabric}
          onCustomChange={(value) => updateField("customTshirtFabric", value)}
          options={["Cotton", "Polyester", "Cotton Blend", "Jersey"]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("tshirtFabric", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-tshirt-occasion"
          name="tshirtOccasion"
          label="Occasion"
          value={data.tshirtOccasion}
          customValue={data.customTshirtOccasion}
          onCustomChange={(value) => updateField("customTshirtOccasion", value)}
          options={[
            "Everyday Wear",

            "School",

            "Birthday",

            "Travel",

            "Sports",

            "Party",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("tshirtOccasion", value)}
        />
      </div>
    </div>
  );
}
