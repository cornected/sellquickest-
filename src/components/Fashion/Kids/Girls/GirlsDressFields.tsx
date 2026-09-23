"use client";

import { StyledSelect } from "../../../StyledSelect";

type GirlsDressFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function GirlsDressFields({ data, updateField }: GirlsDressFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👗 Girls Dress Details</h6>
      </div>

      {/* DRESS TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-dress-type"
          name="dressType"
          label="Dress Type"
          value={data.dressType}
          customValue={data.customDressType}
          onCustomChange={(value) => updateField("customDressType", value)}
          options={[
            "Casual Dress",
            "Princess Dress",
            "Party Dress",
            "Maxi Dress",
            "A-Line Dress",
            "Floral Dress",
          ]}
          placeholder="Select Dress Type"
          allowOther
          onChange={(value) => updateField("dressType", value)}
        />
      </div>

      {/* LENGTH */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-dress-length"
          name="dressLength"
          label="Dress Length"
          value={data.dressLength}
          customValue={data.customDressLength}
          onCustomChange={(value) => updateField("customDressLength", value)}
          options={["Mini", "Knee Length", "Midi", "Maxi"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("dressLength", value)}
        />
      </div>

      {/* SLEEVE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-dress-sleeve"
          name="dressSleeve"
          label="Sleeve Style"
          value={data.dressSleeve}
          customValue={data.customDressSleeve}
          onCustomChange={(value) => updateField("customDressSleeve", value)}
          options={[
            "Short Sleeve",
            "Long Sleeve",
            "Sleeveless",
            "Puff Sleeve",
            "Off Shoulder",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value) => updateField("dressSleeve", value)}
        />
      </div>

      {/* FABRIC */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-dress-fabric"
          name="dressFabric"
          label="Fabric"
          value={data.dressFabric}
          customValue={data.customDressFabric}
          onCustomChange={(value) => updateField("customDressFabric", value)}
          options={["Cotton", "Lace", "Chiffon", "Silk", "Tulle", "Denim"]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("dressFabric", value)}
        />
      </div>

      {/* DESIGN */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-dress-design"
          name="dressDesign"
          label="Design / Pattern"
          value={data.dressDesign}
          customValue={data.customDressDesign}
          onCustomChange={(value) => updateField("customDressDesign", value)}
          options={[
            "Plain",
            "Floral",
            "Cartoon",
            "Beaded",
            "Embroidery",
            "Pattern",
          ]}
          placeholder="Select Design"
          allowOther
          onChange={(value) => updateField("dressDesign", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-dress-occasion"
          name="dressOccasion"
          label="Occasion"
          value={data.dressOccasion}
          customValue={data.customDressOccasion}
          onCustomChange={(value) => updateField("customDressOccasion", value)}
          options={[
            "Everyday Wear",
            "Birthday",
            "Wedding",
            "Party",
            "School",
            "Holiday",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("dressOccasion", value)}
        />
      </div>
    </div>
  );
}
