"use client";

import { StyledSelect } from "../../StyledSelect";

type JumpsuitFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function JumpsuitFields({
  data,

  updateField,
}: JumpsuitFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👗 Jumpsuit Details</h6>
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jumpsuit-style"
          name="jumpsuitStyle"
          label="Jumpsuit Style"
          value={data.jumpsuitStyle}
          customValue={data.customJumpsuitStyle}
          onCustomChange={(value) => updateField("customJumpsuitStyle", value)}
          options={[
            "Casual Jumpsuit",

            "Formal Jumpsuit",

            "Wide Leg Jumpsuit",

            "Bodycon Jumpsuit",

            "Denim Jumpsuit",

            "Party Jumpsuit",

            "Luxury Jumpsuit",

            "Traditional Jumpsuit",
          ]}
          placeholder="Select Jumpsuit Style"
          allowOther
          onChange={(value) => updateField("jumpsuitStyle", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jumpsuit-length"
          name="jumpsuitLength"
          label="Length"
          value={data.jumpsuitLength}
          customValue={data.customJumpsuitLength}
          onCustomChange={(value) => updateField("customJumpsuitLength", value)}
          options={["Short", "Ankle Length", "Full Length", "Wide Leg"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("jumpsuitLength", value)}
        />
      </div>

      {/* SLEEVE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jumpsuit-sleeve"
          name="jumpsuitSleeve"
          label="Sleeve Style"
          value={data.jumpsuitSleeve}
          customValue={data.customJumpsuitSleeve}
          onCustomChange={(value) => updateField("customJumpsuitSleeve", value)}
          options={[
            "Short Sleeve",

            "Long Sleeve",

            "Sleeveless",

            "Puff Sleeve",

            "Off Shoulder",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value) => updateField("jumpsuitSleeve", value)}
        />
      </div>

      {/* NECKLINE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jumpsuit-neckline"
          name="jumpsuitNeckline"
          label="Neckline"
          value={data.jumpsuitNeckline}
          customValue={data.customJumpsuitNeckline}
          onCustomChange={(value) =>
            updateField("customJumpsuitNeckline", value)
          }
          options={[
            "Round Neck",

            "V Neck",

            "Sweetheart",

            "High Neck",

            "Off Shoulder",
          ]}
          placeholder="Select Neckline"
          allowOther
          onChange={(value) => updateField("jumpsuitNeckline", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jumpsuit-fit"
          name="jumpsuitFit"
          label="Fit"
          value={data.jumpsuitFit}
          customValue={data.customJumpsuitFit}
          onCustomChange={(value) => updateField("customJumpsuitFit", value)}
          options={[
            "Slim Fit",

            "Regular Fit",

            "Loose Fit",

            "Wide Leg",

            "Oversized",
          ]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("jumpsuitFit", value)}
        />
      </div>

      {/* PATTERN */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jumpsuit-pattern"
          name="jumpsuitPattern"
          label="Pattern"
          value={data.jumpsuitPattern}
          customValue={data.customJumpsuitPattern}
          onCustomChange={(value) =>
            updateField("customJumpsuitPattern", value)
          }
          options={["Plain", "Floral", "Printed", "Striped", "Embroidered"]}
          placeholder="Select Pattern"
          allowOther
          onChange={(value) => updateField("jumpsuitPattern", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="jumpsuit-occasion"
          name="jumpsuitOccasion"
          label="Occasion"
          value={data.jumpsuitOccasion}
          customValue={data.customJumpsuitOccasion}
          onCustomChange={(value) =>
            updateField("customJumpsuitOccasion", value)
          }
          options={[
            "Everyday Wear",

            "Office",

            "Party",

            "Wedding",

            "Travel",

            "Date Night",

            "Formal Event",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("jumpsuitOccasion", value)}
        />
      </div>
    </div>
  );
}
