"use client";

import { StyledSelect } from "../../../StyledSelect";

type GirlsGownFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function GirlsGownFields({ data, updateField }: GirlsGownFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👗 Girls Gown Details</h6>
      </div>

      {/* GOWN TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-gown-type"
          name="gownType"
          label="Gown Type"
          value={data.gownType}
          customValue={data.customGownType}
          onCustomChange={(value) => updateField("customGownType", value)}
          options={[
            "Ball Gown",
            "Princess Gown",
            "Evening Gown",
            "Birthday Gown",
            "Wedding Gown",
            "Pageant Gown",
          ]}
          placeholder="Select Gown Type"
          allowOther
          onChange={(value) => updateField("gownType", value)}
        />
      </div>

      {/* LENGTH */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-gown-length"
          name="gownLength"
          label="Gown Length"
          value={data.gownLength}
          customValue={data.customGownLength}
          onCustomChange={(value) => updateField("customGownLength", value)}
          options={["Floor Length", "Maxi", "Midi", "Knee Length"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("gownLength", value)}
        />
      </div>

      {/* SLEEVE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-gown-sleeve"
          name="gownSleeve"
          label="Sleeve Style"
          value={data.gownSleeve}
          customValue={data.customGownSleeve}
          onCustomChange={(value) => updateField("customGownSleeve", value)}
          options={[
            "Sleeveless",
            "Short Sleeve",
            "Long Sleeve",
            "Puff Sleeve",
            "Off Shoulder",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value) => updateField("gownSleeve", value)}
        />
      </div>

      {/* FABRIC */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-gown-fabric"
          name="gownFabric"
          label="Fabric"
          value={data.gownFabric}
          customValue={data.customGownFabric}
          onCustomChange={(value) => updateField("customGownFabric", value)}
          options={["Lace", "Chiffon", "Tulle", "Satin", "Silk", "Velvet"]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("gownFabric", value)}
        />
      </div>

      {/* EMBELLISHMENT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-gown-embellishment"
          name="gownEmbellishment"
          label="Embellishment"
          value={data.gownEmbellishment}
          customValue={data.customGownEmbellishment}
          onCustomChange={(value) =>
            updateField("customGownEmbellishment", value)
          }
          options={[
            "Plain",
            "Beaded",
            "Sequins",
            "Embroidery",
            "Crystal Details",
          ]}
          placeholder="Select Embellishment"
          allowOther
          onChange={(value) => updateField("gownEmbellishment", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-gown-occasion"
          name="gownOccasion"
          label="Occasion"
          value={data.gownOccasion}
          customValue={data.customGownOccasion}
          onCustomChange={(value) => updateField("customGownOccasion", value)}
          options={[
            "Birthday",
            "Wedding",
            "Party",
            "Ceremony",
            "Pageant",
            "Holiday",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("gownOccasion", value)}
        />
      </div>
    </div>
  );
}
