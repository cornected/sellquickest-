"use client";

import { StyledSelect } from "../../StyledSelect";

type TShirtFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function TShirtFields({
  data,

  updateField,
}: TShirtFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👕 T-Shirt Details</h6>
      </div>

      {/* TSHIRT STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="tshirt-style"
          name="tshirtStyle"
          label="T-Shirt Style"
          value={data.tshirtStyle}
          customValue={data.customTshirtStyle}
          onCustomChange={(value) => updateField("customTshirtStyle", value)}
          options={[
            "Round Neck",

            "Polo Shirt",

            "V-Neck",

            "Oversized",

            "Graphic Tee",

            "Sports Tee",

            "Plain Tee",
          ]}
          placeholder="Select T-Shirt Style"
          allowOther
          onChange={(value) => updateField("tshirtStyle", value)}
        />
      </div>

      {/* NECK TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="neck-type"
          name="neckType"
          label="Neck Type"
          value={data.neckType}
          customValue={data.customNeckType}
          onCustomChange={(value) => updateField("customNeckType", value)}
          options={[
            "Round Neck",

            "V Neck",

            "Polo Collar",

            "Crew Neck",

            "Mandarin Neck",
          ]}
          placeholder="Select Neck Type"
          allowOther
          onChange={(value) => updateField("neckType", value)}
        />
      </div>

      {/* SLEEVE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="tshirt-sleeve"
          name="sleeve"
          label="Sleeve Type"
          value={data.sleeve}
          customValue={data.customSleeve}
          onCustomChange={(value) => updateField("customSleeve", value)}
          options={["Short Sleeve", "Long Sleeve", "Sleeveless"]}
          placeholder="Select Sleeve Type"
          allowOther
          onChange={(value) => updateField("sleeve", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="tshirt-fit"
          name="fit"
          label="Fit"
          value={data.fit}
          customValue={data.customFit}
          onCustomChange={(value) => updateField("customFit", value)}
          options={["Slim Fit", "Regular Fit", "Loose Fit", "Oversized"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("fit", value)}
        />
      </div>

      {/* PRINT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="tshirt-print"
          name="print"
          label="Print / Design"
          value={data.print}
          customValue={data.customPrint}
          onCustomChange={(value) => updateField("customPrint", value)}
          options={[
            "Plain",

            "Graphic Print",

            "Logo Print",

            "Text Print",

            "Pattern",

            "Embroidery",
          ]}
          placeholder="Select Design"
          allowOther
          onChange={(value) => updateField("print", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="tshirt-occasion"
          name="occasion"
          label="Occasion"
          value={data.occasion}
          customValue={data.customOccasion}
          onCustomChange={(value) => updateField("customOccasion", value)}
          options={[
            "Casual",

            "Streetwear",

            "Sports",

            "Travel",

            "Everyday Wear",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("occasion", value)}
        />
      </div>
    </div>
  );
}
