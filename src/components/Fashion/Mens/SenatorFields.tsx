"use client";

import { StyledSelect } from "../../StyledSelect";

type SenatorFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function SenatorFields({
  data,

  updateField,
}: SenatorFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🇳🇬 Senator Wear Details</h6>
      </div>

      {/* SENATOR STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="senator-style"
          name="senatorStyle"
          label="Senator Style"
          value={data.senatorStyle}
          customValue={data.customSenatorStyle}
          onCustomChange={(value) => updateField("customSenatorStyle", value)}
          options={[
            "Classic Senator",

            "Modern Senator",

            "Luxury Senator",

            "Embroidered Senator",

            "Wedding Senator",

            "Traditional Senator",
          ]}
          placeholder="Select Senator Style"
          allowOther
          onChange={(value) => updateField("senatorStyle", value)}
        />
      </div>

      {/* TOP STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="senator-top"
          name="topStyle"
          label="Top Style"
          value={data.topStyle}
          customValue={data.customTopStyle}
          onCustomChange={(value) => updateField("customTopStyle", value)}
          options={["Long Sleeve", "Short Sleeve", "Long Tunic", "Short Tunic"]}
          placeholder="Select Top Style"
          allowOther
          onChange={(value) => updateField("topStyle", value)}
        />
      </div>

      {/* TROUSER STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="senator-trouser"
          name="trouserStyle"
          label="Trouser Style"
          value={data.trouserStyle}
          customValue={data.customTrouserStyle}
          onCustomChange={(value) => updateField("customTrouserStyle", value)}
          options={["Straight Cut", "Slim Cut", "Classic Cut", "Wide Leg"]}
          placeholder="Select Trouser Style"
          allowOther
          onChange={(value) => updateField("trouserStyle", value)}
        />
      </div>

      {/* FABRIC */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="senator-fabric"
          name="fabric"
          label="Fabric"
          value={data.fabric}
          customValue={data.customFabric}
          onCustomChange={(value) => updateField("customFabric", value)}
          options={[
            "Guinea Brocade",

            "Cashmere",

            "Lace",

            "Ankara",

            "Cotton",

            "Silk",

            "Premium Fabric",
          ]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("fabric", value)}
        />
      </div>

      {/* EMBROIDERY */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="senator-embroidery"
          name="embroidery"
          label="Embroidery"
          value={data.embroidery}
          options={["Plain", "Light", "Heavy", "Custom Design"]}
          placeholder="Select Embroidery"
          onChange={(value) => updateField("embroidery", value)}
        />
      </div>

      {/* CAP */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="senator-cap"
          name="cap"
          label="Cap Included"
          value={data.cap}
          options={["Yes", "No"]}
          placeholder="Select Option"
          onChange={(value) => updateField("cap", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="senator-occasion"
          name="occasion"
          label="Occasion"
          value={data.occasion}
          customValue={data.customOccasion}
          onCustomChange={(value) => updateField("customOccasion", value)}
          options={[
            "Wedding",

            "Traditional Event",

            "Birthday",

            "Religious Event",

            "Ceremony",

            "Business",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("occasion", value)}
        />
      </div>

      {/* TAILORING */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="senator-tailoring"
          name="tailoring"
          label="Tailoring"
          value={data.tailoring}
          options={["Ready Made", "Made To Measure", "Custom Tailored"]}
          placeholder="Select Tailoring"
          onChange={(value) => updateField("tailoring", value)}
        />
      </div>
    </div>
  );
}
