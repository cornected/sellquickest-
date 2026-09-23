"use client";

import { StyledSelect } from "../../StyledSelect";

type KaftanFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function KaftanFields({
  data,

  updateField,
}: KaftanFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👘 Kaftan Details</h6>
      </div>

      {/* KAFTAN STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="kaftan-style"
          name="kaftanStyle"
          label="Kaftan Style"
          value={data.kaftanStyle}
          customValue={data.customKaftanStyle}
          onCustomChange={(value) => updateField("customKaftanStyle", value)}
          options={[
            "Traditional Kaftan",

            "Luxury Kaftan",

            "Embroidered Kaftan",

            "Moroccan Style",

            "Dubai Style",

            "Casual Kaftan",

            "Designer Kaftan",
          ]}
          placeholder="Select Kaftan Style"
          allowOther
          onChange={(value) => updateField("kaftanStyle", value)}
        />
      </div>

      {/* LENGTH */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="kaftan-length"
          name="kaftanLength"
          label="Length"
          value={data.kaftanLength}
          customValue={data.customKaftanLength}
          onCustomChange={(value) => updateField("customKaftanLength", value)}
          options={["Knee Length", "Ankle Length", "Full Length"]}
          placeholder="Select Length"
          allowOther
          onChange={(value) => updateField("kaftanLength", value)}
        />
      </div>

      {/* SLEEVE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="kaftan-sleeve"
          name="kaftanSleeve"
          label="Sleeve Style"
          value={data.kaftanSleeve}
          customValue={data.customKaftanSleeve}
          onCustomChange={(value) => updateField("customKaftanSleeve", value)}
          options={[
            "Wide Sleeve",

            "Straight Sleeve",

            "Bell Sleeve",

            "Kimono Sleeve",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value) => updateField("kaftanSleeve", value)}
        />
      </div>

      {/* FABRIC */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="kaftan-fabric"
          name="kaftanFabric"
          label="Fabric"
          value={data.kaftanFabric}
          customValue={data.customKaftanFabric}
          onCustomChange={(value) => updateField("customKaftanFabric", value)}
          options={[
            "Lace",

            "Silk",

            "Chiffon",

            "Velvet",

            "Ankara",

            "Cotton",

            "Satin",
          ]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("kaftanFabric", value)}
        />
      </div>

      {/* EMBROIDERY */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="kaftan-embroidery"
          name="kaftanEmbroidery"
          label="Embroidery"
          value={data.kaftanEmbroidery}
          options={[
            "Plain",

            "Light Embroidery",

            "Heavy Embroidery",

            "Beaded",

            "Crystal Detail",
          ]}
          placeholder="Select Embroidery"
          onChange={(value) => updateField("kaftanEmbroidery", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="kaftan-fit"
          name="kaftanFit"
          label="Fit"
          value={data.kaftanFit}
          customValue={data.customKaftanFit}
          onCustomChange={(value) => updateField("customKaftanFit", value)}
          options={["Loose Fit", "Regular Fit", "Tailored Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("kaftanFit", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="kaftan-occasion"
          name="kaftanOccasion"
          label="Occasion"
          value={data.kaftanOccasion}
          customValue={data.customKaftanOccasion}
          onCustomChange={(value) => updateField("customKaftanOccasion", value)}
          options={[
            "Everyday Wear",

            "Wedding",

            "Traditional Event",

            "Religious Event",

            "Party",

            "Formal Event",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("kaftanOccasion", value)}
        />
      </div>
    </div>
  );
}
