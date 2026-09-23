"use client";

import { StyledSelect } from "../../../StyledSelect";

type GirlsJumpsuitFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function GirlsJumpsuitFields({
  data,
  updateField,
}: GirlsJumpsuitFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👗 Girls Jumpsuit Details</h6>
      </div>

      {/* JUMPSUIT TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jumpsuit-type"
          name="jumpsuitType"
          label="Jumpsuit Type"
          value={data.jumpsuitType}
          customValue={data.customJumpsuitType}
          onCustomChange={(value) => updateField("customJumpsuitType", value)}
          options={[
            "Casual Jumpsuit",
            "Party Jumpsuit",
            "Denim Jumpsuit",
            "Romper",
            "Wide Leg Jumpsuit",
            "Sleeveless Jumpsuit",
          ]}
          placeholder="Select Jumpsuit Type"
          allowOther
          onChange={(value) => updateField("jumpsuitType", value)}
        />
      </div>

      {/* LENGTH */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jumpsuit-length"
          name="jumpsuitLength"
          label="Length"
          value={data.jumpsuitLength}
          customValue={data.customJumpsuitLength}
          onCustomChange={(value) => updateField("customJumpsuitLength", value)}
          options={["Short", "Knee Length", "Full Length", "Wide Leg"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("jumpsuitLength", value)}
        />
      </div>

      {/* SLEEVE STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jumpsuit-sleeve"
          name="jumpsuitSleeve"
          label="Sleeve Style"
          value={data.jumpsuitSleeve}
          customValue={data.customJumpsuitSleeve}
          onCustomChange={(value) => updateField("customJumpsuitSleeve", value)}
          options={[
            "Sleeveless",
            "Short Sleeve",
            "Long Sleeve",
            "Puff Sleeve",
            "Off Shoulder",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value) => updateField("jumpsuitSleeve", value)}
        />
      </div>

      {/* NECK STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jumpsuit-neck"
          name="jumpsuitNeck"
          label="Neck Style"
          value={data.jumpsuitNeck}
          customValue={data.customJumpsuitNeck}
          onCustomChange={(value) => updateField("customJumpsuitNeck", value)}
          options={[
            "Round Neck",
            "V Neck",
            "Collar Neck",
            "Square Neck",
            "Halter Neck",
          ]}
          placeholder="Select Neck Style"
          allowOther
          onChange={(value) => updateField("jumpsuitNeck", value)}
        />
      </div>

      {/* FABRIC */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jumpsuit-fabric"
          name="jumpsuitFabric"
          label="Fabric"
          value={data.jumpsuitFabric}
          customValue={data.customJumpsuitFabric}
          onCustomChange={(value) => updateField("customJumpsuitFabric", value)}
          options={["Cotton", "Denim", "Chiffon", "Linen", "Polyester", "Silk"]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("jumpsuitFabric", value)}
        />
      </div>

      {/* FIT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jumpsuit-fit"
          name="jumpsuitFit"
          label="Fit"
          value={data.jumpsuitFit}
          customValue={data.customJumpsuitFit}
          onCustomChange={(value) => updateField("customJumpsuitFit", value)}
          options={["Slim Fit", "Regular Fit", "Loose Fit", "Oversized"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("jumpsuitFit", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-jumpsuit-occasion"
          name="jumpsuitOccasion"
          label="Occasion"
          value={data.jumpsuitOccasion}
          customValue={data.customJumpsuitOccasion}
          onCustomChange={(value) =>
            updateField("customJumpsuitOccasion", value)
          }
          options={["Everyday Wear", "Birthday", "Party", "Travel", "Holiday"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("jumpsuitOccasion", value)}
        />
      </div>
    </div>
  );
}
