"use client";

import { StyledSelect } from "../../StyledSelect";

type WeddingWearFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function WeddingWearFields({
  data,

  updateField,
}: WeddingWearFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👰 Wedding Wear Details</h6>
      </div>

      {/* WEDDING TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="wedding-type"
          name="weddingType"
          label="Wedding Type"
          value={data.weddingType}
          customValue={data.customWeddingType}
          onCustomChange={(value: string) => updateField("customWeddingType", value)}
          options={[
            "Bridal Wear",

            "Bridesmaid Dress",

            "Wedding Guest Wear",

            "Traditional Wedding Wear",

            "Reception Dress",

            "Engagement Dress",
          ]}
          placeholder="Select Wedding Type"
          allowOther
          onChange={(value: string) => updateField("weddingType", value)}
        />
      </div>

      {/* DRESS STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="wedding-style"
          name="weddingStyle"
          label="Dress Style"
          value={data.weddingStyle}
          customValue={data.customWeddingStyle}
          onCustomChange={(value: string) => updateField("customWeddingStyle", value)}
          options={[
            "Ball Gown",

            "Mermaid",

            "A-Line",

            "Princess Cut",

            "Straight Cut",

            "Luxury Designer",
          ]}
          placeholder="Select Dress Style"
          allowOther
          onChange={(value: string) => updateField("weddingStyle", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="wedding-length"
          name="weddingLength"
          label="Length"
          value={data.weddingLength}
          customValue={data.customWeddingLength}
          onCustomChange={(value: string) => updateField("customWeddingLength", value)}
          options={["Short", "Tea Length", "Floor Length", "Full Length"]}
          placeholder="Select Length"
          allowOther
          onChange={(value: string) => updateField("weddingLength", value)}
        />
      </div>

      {/* SLEEVE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="wedding-sleeve"
          name="weddingSleeve"
          label="Sleeve Style"
          value={data.weddingSleeve}
          customValue={data.customWeddingSleeve}
          onCustomChange={(value: string) => updateField("customWeddingSleeve", value)}
          options={[
            "Sleeveless",

            "Short Sleeve",

            "Long Sleeve",

            "Off Shoulder",

            "Puff Sleeve",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value: string) => updateField("weddingSleeve", value)}
        />
      </div>

      {/* FABRIC */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="wedding-fabric"
          name="weddingFabric"
          label="Fabric"
          value={data.weddingFabric}
          customValue={data.customWeddingFabric}
          onCustomChange={(value: string) => updateField("customWeddingFabric", value)}
          options={["Lace", "Satin", "Silk", "Chiffon", "Tulle", "Velvet"]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value: string) => updateField("weddingFabric", value)}
        />
      </div>

      {/* TRAIN */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="wedding-train"
          name="weddingTrain"
          label="Train"
          value={data.weddingTrain}
          options={["No Train", "Short Train", "Chapel Train", "Long Train"]}
          placeholder="Select Train"
          onChange={(value: string) => updateField("weddingTrain", value)}
        />
      </div>

      {/* VEIL */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="wedding-veil"
          name="weddingVeil"
          label="Veil Included"
          value={data.weddingVeil}
          options={["Yes", "No"]}
          placeholder="Select Option"
          onChange={(value: string) => updateField("weddingVeil", value)}
        />
      </div>

      {/* EMBROIDERY */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="wedding-embroidery"
          name="weddingEmbroidery"
          label="Embroidery"
          value={data.weddingEmbroidery}
          options={[
            "Plain",

            "Light Detail",

            "Heavy Detail",

            "Beaded",

            "Crystal Detail",
          ]}
          placeholder="Select Embroidery"
          onChange={(value: string) => updateField("weddingEmbroidery", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="wedding-occasion"
          name="weddingOccasion"
          label="Occasion"
          value={data.weddingOccasion}
          customValue={data.customWeddingOccasion}
          onCustomChange={(value: string) =>
            updateField("customWeddingOccasion", value)
          }
          options={[
            "Wedding Ceremony",

            "Reception",

            "Engagement",

            "Traditional Event",

            "Photoshoot",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value: string) => updateField("weddingOccasion", value)}
        />
      </div>
    </div>
  );
}
