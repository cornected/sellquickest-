"use client";

import { StyledSelect } from "../../StyledSelect";

type AbayaFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function AbayaFields({
  data,

  updateField,
}: AbayaFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👘 Abaya Details</h6>
      </div>

      {/* ABAYA STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="abaya-style"
          name="abayaStyle"
          label="Abaya Style"
          value={data.abayaStyle}
          customValue={data.customAbayaStyle}
          onCustomChange={(value) => updateField("customAbayaStyle", value)}
          options={[
            "Open Abaya",

            "Closed Abaya",

            "Kimono Abaya",

            "Butterfly Abaya",

            "Dubai Abaya",

            "Luxury Abaya",

            "Embroidered Abaya",

            "Wedding Abaya",
          ]}
          placeholder="Select Abaya Style"
          allowOther
          onChange={(value) => updateField("abayaStyle", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="abaya-length"
          name="abayaLength"
          label="Length"
          value={data.abayaLength}
          customValue={data.customAbayaLength}
          onCustomChange={(value) => updateField("customAbayaLength", value)}
          options={["Ankle Length", "Floor Length", "Full Length"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("abayaLength", value)}
        />
      </div>

      {/* SLEEVE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="abaya-sleeve"
          name="abayaSleeve"
          label="Sleeve Style"
          value={data.abayaSleeve}
          customValue={data.customAbayaSleeve}
          onCustomChange={(value) => updateField("customAbayaSleeve", value)}
          options={[
            "Straight Sleeve",

            "Wide Sleeve",

            "Bell Sleeve",

            "Puff Sleeve",

            "Kimono Sleeve",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value) => updateField("abayaSleeve", value)}
        />
      </div>

      {/* FABRIC */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="abaya-fabric"
          name="abayaFabric"
          label="Fabric"
          value={data.abayaFabric}
          customValue={data.customAbayaFabric}
          onCustomChange={(value) => updateField("customAbayaFabric", value)}
          options={[
            "Nida",

            "Chiffon",

            "Silk",

            "Crepe",

            "Velvet",

            "Lace",

            "Satin",
          ]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("abayaFabric", value)}
        />
      </div>

      {/* EMBROIDERY */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="abaya-embroidery"
          name="abayaEmbroidery"
          label="Embroidery"
          value={data.abayaEmbroidery}
          options={[
            "Plain",

            "Light Embroidery",

            "Heavy Embroidery",

            "Beaded",

            "Crystal Detail",
          ]}
          placeholder="Select Embroidery"
          onChange={(value) => updateField("abayaEmbroidery", value)}
        />
      </div>

      {/* HIJAB */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="abaya-hijab"
          name="abayaHijab"
          label="Hijab Included"
          value={data.abayaHijab}
          options={["Yes", "No"]}
          placeholder="Select Option"
          onChange={(value) => updateField("abayaHijab", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="abaya-fit"
          name="abayaFit"
          label="Fit"
          value={data.abayaFit}
          customValue={data.customAbayaFit}
          onCustomChange={(value) => updateField("customAbayaFit", value)}
          options={["Loose Fit", "Regular Fit", "Tailored Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("abayaFit", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="abaya-occasion"
          name="abayaOccasion"
          label="Occasion"
          value={data.abayaOccasion}
          customValue={data.customAbayaOccasion}
          onCustomChange={(value) => updateField("customAbayaOccasion", value)}
          options={[
            "Everyday Wear",

            "Ramadan",

            "Wedding",

            "Religious Event",

            "Formal Event",

            "Travel",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("abayaOccasion", value)}
        />
      </div>
    </div>
  );
}
