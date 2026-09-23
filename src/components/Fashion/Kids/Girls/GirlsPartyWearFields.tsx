"use client";

import { StyledSelect } from "../../../StyledSelect";

type GirlsPartyWearFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function GirlsPartyWearFields({
  data,
  updateField,
}: GirlsPartyWearFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🎉 Girls Party Wear Details</h6>
      </div>

      {/* PARTY WEAR TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-party-type"
          name="partyWearType"
          label="Party Wear Type"
          value={data.partyWearType}
          customValue={data.customPartyWearType}
          onCustomChange={(value) => updateField("customPartyWearType", value)}
          options={[
            "Party Dress",
            "Gown",
            "Skirt & Top",
            "Jumpsuit",
            "Two Piece Set",
            "Princess Outfit",
          ]}
          placeholder="Select Party Wear Type"
          allowOther
          onChange={(value) => updateField("partyWearType", value)}
        />
      </div>

      {/* STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-party-style"
          name="partyWearStyle"
          label="Style"
          value={data.partyWearStyle}
          customValue={data.customPartyWearStyle}
          onCustomChange={(value) => updateField("customPartyWearStyle", value)}
          options={[
            "Princess Style",
            "Elegant",
            "Flared",
            "Modern",
            "Traditional",
          ]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("partyWearStyle", value)}
        />
      </div>

      {/* FABRIC */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-party-fabric"
          name="partyWearFabric"
          label="Fabric"
          value={data.partyWearFabric}
          customValue={data.customPartyWearFabric}
          onCustomChange={(value) =>
            updateField("customPartyWearFabric", value)
          }
          options={["Lace", "Tulle", "Chiffon", "Satin", "Silk", "Velvet"]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("partyWearFabric", value)}
        />
      </div>

      {/* DECORATION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-party-decoration"
          name="partyWearDecoration"
          label="Decoration"
          value={data.partyWearDecoration}
          customValue={data.customPartyWearDecoration}
          onCustomChange={(value) =>
            updateField("customPartyWearDecoration", value)
          }
          options={[
            "Plain",
            "Beaded",
            "Sequins",
            "Embroidery",
            "Crystal Details",
          ]}
          placeholder="Select Decoration"
          allowOther
          onChange={(value) => updateField("partyWearDecoration", value)}
        />
      </div>

      {/* SLEEVE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-party-sleeve"
          name="partyWearSleeve"
          label="Sleeve Style"
          value={data.partyWearSleeve}
          customValue={data.customPartyWearSleeve}
          onCustomChange={(value) =>
            updateField("customPartyWearSleeve", value)
          }
          options={[
            "Sleeveless",
            "Short Sleeve",
            "Long Sleeve",
            "Puff Sleeve",
            "Off Shoulder",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value) => updateField("partyWearSleeve", value)}
        />
      </div>

      {/* AGE GROUP */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-party-age"
          name="partyWearAgeGroup"
          label="Age Group"
          value={data.partyWearAgeGroup}
          customValue={data.customPartyWearAgeGroup}
          onCustomChange={(value) =>
            updateField("customPartyWearAgeGroup", value)
          }
          options={["Toddler", "Little Girl", "Teen"]}
          placeholder="Select Age Group"
          allowOther
          onChange={(value) => updateField("partyWearAgeGroup", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-party-occasion"
          name="partyWearOccasion"
          label="Occasion"
          value={data.partyWearOccasion}
          customValue={data.customPartyWearOccasion}
          onCustomChange={(value) =>
            updateField("customPartyWearOccasion", value)
          }
          options={[
            "Birthday",
            "Wedding",
            "School Event",
            "Holiday",
            "Ceremony",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("partyWearOccasion", value)}
        />
      </div>
    </div>
  );
}
