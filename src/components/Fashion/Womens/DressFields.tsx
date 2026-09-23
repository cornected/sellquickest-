"use client";

import { StyledSelect } from "../../StyledSelect";

type DressFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function DressFields({
  data,

  updateField,
}: DressFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👗 Dress Details</h6>
      </div>

      {/* DRESS TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="dress-type"
          name="dressType"
          label="Dress Type"
          value={data.dressType}
          customValue={data.customDressType}
          onCustomChange={(value) => updateField("customDressType", value)}
          options={[
            "Casual Dress",

            "Maxi Dress",

            "Mini Dress",

            "Bodycon Dress",

            "Party Dress",

            "Wedding Dress",

            "Evening Dress",

            "Office Dress",

            "Traditional Dress",

            "Summer Dress",
          ]}
          placeholder="Select Dress Type"
          allowOther
          onChange={(value) => updateField("dressType", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="dress-length"
          name="dressLength"
          label="Dress Length"
          value={data.dressLength}
          customValue={data.customDressLength}
          onCustomChange={(value) => updateField("customDressLength", value)}
          options={["Mini", "Knee Length", "Midi", "Maxi", "Floor Length"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("dressLength", value)}
        />
      </div>

      {/* SLEEVE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="dress-sleeve"
          name="dressSleeve"
          label="Sleeve Style"
          value={data.dressSleeve}
          customValue={data.customDressSleeve}
          onCustomChange={(value) => updateField("customDressSleeve", value)}
          options={[
            "Short Sleeve",

            "Long Sleeve",

            "Off Shoulder",

            "Strapless",

            "Puff Sleeve",

            "Bell Sleeve",

            "One Shoulder",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value) => updateField("dressSleeve", value)}
        />
      </div>

      {/* NECKLINE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="dress-neckline"
          name="dressNeckline"
          label="Neckline"
          value={data.dressNeckline}
          customValue={data.customDressNeckline}
          onCustomChange={(value) => updateField("customDressNeckline", value)}
          options={[
            "Round Neck",

            "V Neck",

            "Sweetheart Neck",

            "Boat Neck",

            "High Neck",

            "Off Shoulder",
          ]}
          placeholder="Select Neckline"
          allowOther
          onChange={(value) => updateField("dressNeckline", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="dress-fit"
          name="dressFit"
          label="Fit"
          value={data.dressFit}
          customValue={data.customDressFit}
          onCustomChange={(value) => updateField("customDressFit", value)}
          options={[
            "Slim Fit",

            "Regular Fit",

            "Loose Fit",

            "Oversized",

            "Body Fit",
          ]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("dressFit", value)}
        />
      </div>

      {/* SILHOUETTE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="dress-silhouette"
          name="dressSilhouette"
          label="Silhouette"
          value={data.dressSilhouette}
          customValue={data.customDressSilhouette}
          onCustomChange={(value) =>
            updateField("customDressSilhouette", value)
          }
          options={[
            "A-Line",

            "Mermaid",

            "Ball Gown",

            "Straight",

            "Empire Waist",
          ]}
          placeholder="Select Silhouette"
          allowOther
          onChange={(value) => updateField("dressSilhouette", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="dress-occasion"
          name="dressOccasion"
          label="Occasion"
          value={data.dressOccasion}
          customValue={data.customDressOccasion}
          onCustomChange={(value) => updateField("customDressOccasion", value)}
          options={[
            "Everyday Wear",

            "Office",

            "Wedding",

            "Birthday",

            "Party",

            "Date Night",

            "Formal Event",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("dressOccasion", value)}
        />
      </div>

      {/* LINING */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="dress-lining"
          name="dressLining"
          label="Lining"
          value={data.dressLining}
          options={["Fully Lined", "Partially Lined", "No Lining"]}
          placeholder="Select Lining"
          onChange={(value) => updateField("dressLining", value)}
        />
      </div>
    </div>
  );
}
