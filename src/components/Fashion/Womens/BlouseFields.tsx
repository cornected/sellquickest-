"use client";

import { StyledSelect } from "../../StyledSelect";

type BlouseFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function BlouseFields({
  data,

  updateField,
}: BlouseFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👚 Blouse Details</h6>
      </div>

      {/* BLOUSE STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="blouse-style"
          name="blouseStyle"
          label="Blouse Style"
          value={data.blouseStyle}
          customValue={data.customBlouseStyle}
          onCustomChange={(value) => updateField("customBlouseStyle", value)}
          options={[
            "Casual Blouse",

            "Office Blouse",

            "Peplum Blouse",

            "Crop Blouse",

            "Traditional Blouse",

            "Designer Blouse",

            "Wrap Blouse",

            "Formal Blouse",
          ]}
          placeholder="Select Blouse Style"
          allowOther
          onChange={(value) => updateField("blouseStyle", value)}
        />
      </div>

      {/* SLEEVE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="blouse-sleeve"
          name="blouseSleeve"
          label="Sleeve Style"
          value={data.blouseSleeve}
          customValue={data.customBlouseSleeve}
          onCustomChange={(value) => updateField("customBlouseSleeve", value)}
          options={[
            "Short Sleeve",

            "Long Sleeve",

            "Puff Sleeve",

            "Bell Sleeve",

            "Off Shoulder",

            "Sleeveless",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value) => updateField("blouseSleeve", value)}
        />
      </div>

      {/* NECKLINE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="blouse-neckline"
          name="blouseNeckline"
          label="Neckline"
          value={data.blouseNeckline}
          customValue={data.customBlouseNeckline}
          onCustomChange={(value) => updateField("customBlouseNeckline", value)}
          options={[
            "Round Neck",

            "V Neck",

            "High Neck",

            "Boat Neck",

            "Square Neck",

            "Off Shoulder",
          ]}
          placeholder="Select Neckline"
          allowOther
          onChange={(value) => updateField("blouseNeckline", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="blouse-fit"
          name="blouseFit"
          label="Fit"
          value={data.blouseFit}
          customValue={data.customBlouseFit}
          onCustomChange={(value) => updateField("customBlouseFit", value)}
          options={["Slim Fit", "Regular Fit", "Loose Fit", "Oversized"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("blouseFit", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="blouse-length"
          name="blouseLength"
          label="Length"
          value={data.blouseLength}
          customValue={data.customBlouseLength}
          onCustomChange={(value) => updateField("customBlouseLength", value)}
          options={["Crop Length", "Waist Length", "Hip Length", "Long Length"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("blouseLength", value)}
        />
      </div>

      {/* PATTERN */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="blouse-pattern"
          name="blousePattern"
          label="Pattern"
          value={data.blousePattern}
          customValue={data.customBlousePattern}
          onCustomChange={(value) => updateField("customBlousePattern", value)}
          options={[
            "Plain",

            "Floral",

            "Printed",

            "Striped",

            "Embroidered",

            "Lace",
          ]}
          placeholder="Select Pattern"
          allowOther
          onChange={(value) => updateField("blousePattern", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="blouse-occasion"
          name="blouseOccasion"
          label="Occasion"
          value={data.blouseOccasion}
          customValue={data.customBlouseOccasion}
          onCustomChange={(value) => updateField("customBlouseOccasion", value)}
          options={[
            "Everyday Wear",

            "Office",

            "Party",

            "Wedding",

            "Traditional Event",

            "Formal Event",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("blouseOccasion", value)}
        />
      </div>
    </div>
  );
}
