"use client";

import { StyledSelect } from "../../StyledSelect";

type AgbadaFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function AgbadaFields({
  data,

  updateField,
}: AgbadaFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👑 Agbada Details</h6>
      </div>

      {/* AGABADA STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="agbada-style"
          name="agbadaStyle"
          label="Agbada Style"
          value={data.agbadaStyle}
          customValue={data.customAgbadaStyle}
          onCustomChange={(value) => updateField("customAgbadaStyle", value)}
          options={[
            "Classic Agbada",

            "Modern Agbada",

            "Luxury Agbada",

            "Senator Style",

            "Embroidered Agbada",

            "Wedding Agbada",
          ]}
          placeholder="Select Agbada Style"
          allowOther
          onChange={(value) => updateField("agbadaStyle", value)}
        />
      </div>

      {/* PIECES */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="agbada-piece"
          name="agbadaPieces"
          label="Number of Pieces"
          value={data.agbadaPieces}
          customValue={data.customAgbadaPieces}
          onCustomChange={(value) => updateField("customAgbadaPieces", value)}
          options={["2 Piece", "3 Piece", "4 Piece"]}
          placeholder="Select Pieces"
          allowOther
          onChange={(value) => updateField("agbadaPieces", value)}
        />
      </div>

      {/* FABRIC */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="agbada-fabric"
          name="agbadaFabric"
          label="Fabric Type"
          value={data.agbadaFabric}
          customValue={data.customAgbadaFabric}
          onCustomChange={(value) => updateField("customAgbadaFabric", value)}
          options={[
            "Lace",

            "Guinea Brocade",

            "Cashmere",

            "Ankara",

            "Silk",

            "Cotton",

            "Velvet",

            "Premium Fabric",
          ]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("agbadaFabric", value)}
        />
      </div>

      {/* EMBROIDERY */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="agbada-embroidery"
          name="agbadaEmbroidery"
          label="Embroidery"
          value={data.agbadaEmbroidery}
          options={[
            "Plain",

            "Light Embroidery",

            "Heavy Embroidery",

            "Custom Embroidery",
          ]}
          placeholder="Select Embroidery"
          onChange={(value) => updateField("agbadaEmbroidery", value)}
        />
      </div>

      {/* CAP */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="agbada-cap"
          name="agbadaCap"
          label="Cap Included"
          value={data.agbadaCap}
          options={["Yes", "No"]}
          placeholder="Select Option"
          onChange={(value) => updateField("agbadaCap", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="agbada-occasion"
          name="agbadaOccasion"
          label="Occasion"
          value={data.agbadaOccasion}
          customValue={data.customAgbadaOccasion}
          onCustomChange={(value) => updateField("customAgbadaOccasion", value)}
          options={[
            "Wedding",

            "Traditional Event",

            "Birthday",

            "Religious Event",

            "Ceremony",

            "Formal Event",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("agbadaOccasion", value)}
        />
      </div>

      {/* TAILORING */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="agbada-tailoring"
          name="agbadaTailoring"
          label="Tailoring"
          value={data.agbadaTailoring}
          options={["Ready Made", "Made To Measure", "Custom Tailored"]}
          placeholder="Select Tailoring Type"
          onChange={(value) => updateField("agbadaTailoring", value)}
        />
      </div>
    </div>
  );
}
