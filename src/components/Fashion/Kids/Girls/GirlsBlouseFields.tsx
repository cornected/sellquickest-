"use client";

import { StyledSelect } from "../../../StyledSelect";

type GirlsBlouseFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function GirlsBlouseFields({
  data,
  updateField,
}: GirlsBlouseFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👚 Girls Blouse Details</h6>
      </div>

      {/* BLOUSE TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-blouse-type"
          name="blouseType"
          label="Blouse Type"
          value={data.blouseType}
          customValue={data.customBlouseType}
          onCustomChange={(value) => updateField("customBlouseType", value)}
          options={[
            "Casual Blouse",
            "School Blouse",
            "Party Blouse",
            "Peplum Blouse",
            "Crop Blouse",
            "Traditional Blouse",
          ]}
          placeholder="Select Blouse Type"
          allowOther
          onChange={(value) => updateField("blouseType", value)}
        />
      </div>

      {/* SLEEVE STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-blouse-sleeve"
          name="blouseSleeve"
          label="Sleeve Style"
          value={data.blouseSleeve}
          customValue={data.customBlouseSleeve}
          onCustomChange={(value) => updateField("customBlouseSleeve", value)}
          options={[
            "Short Sleeve",
            "Long Sleeve",
            "Puff Sleeve",
            "Sleeveless",
            "Off Shoulder",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value) => updateField("blouseSleeve", value)}
        />
      </div>

      {/* FIT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-blouse-fit"
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

      {/* NECK STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-blouse-neck"
          name="blouseNeck"
          label="Neck Style"
          value={data.blouseNeck}
          customValue={data.customBlouseNeck}
          onCustomChange={(value) => updateField("customBlouseNeck", value)}
          options={[
            "Round Neck",
            "V Neck",
            "Collar Neck",
            "Boat Neck",
            "Square Neck",
          ]}
          placeholder="Select Neck Style"
          allowOther
          onChange={(value) => updateField("blouseNeck", value)}
        />
      </div>

      {/* FABRIC */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-blouse-fabric"
          name="blouseFabric"
          label="Fabric"
          value={data.blouseFabric}
          customValue={data.customBlouseFabric}
          onCustomChange={(value) => updateField("customBlouseFabric", value)}
          options={["Cotton", "Lace", "Chiffon", "Silk", "Polyester", "Linen"]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("blouseFabric", value)}
        />
      </div>

      {/* DESIGN */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-blouse-design"
          name="blouseDesign"
          label="Design / Pattern"
          value={data.blouseDesign}
          customValue={data.customBlouseDesign}
          onCustomChange={(value) => updateField("customBlouseDesign", value)}
          options={["Plain", "Floral", "Embroidery", "Printed", "Beaded"]}
          placeholder="Select Design"
          allowOther
          onChange={(value) => updateField("blouseDesign", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-blouse-occasion"
          name="blouseOccasion"
          label="Occasion"
          value={data.blouseOccasion}
          customValue={data.customBlouseOccasion}
          onCustomChange={(value) => updateField("customBlouseOccasion", value)}
          options={[
            "Everyday Wear",
            "School",
            "Birthday",
            "Party",
            "Traditional",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("blouseOccasion", value)}
        />
      </div>
    </div>
  );
}
