"use client";

import { StyledSelect } from "../../StyledSelect";

type LingerieFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function LingerieFields({
  data,

  updateField,
}: LingerieFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👙 Lingerie Details</h6>
      </div>

      {/* TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="lingerie-type"
          name="lingerieType"
          label="Lingerie Type"
          value={data.lingerieType}
          customValue={data.customLingerieType}
          onCustomChange={(value: string) =>
            updateField("customLingerieType", value)
          }
          options={[
            "Bra Set",

            "Panty Set",

            "Babydoll",

            "Corset",

            "Teddy",

            "Sleepwear",

            "Shapewear",

            "Bridal Lingerie",
          ]}
          placeholder="Select Lingerie Type"
          allowOther
          onChange={(value: string) => updateField("lingerieType", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="lingerie-style"
          name="lingerieStyle"
          label="Style"
          value={data.lingerieStyle}
          customValue={data.customLingerieStyle}
          onCustomChange={(value: string) =>
            updateField("customLingerieStyle", value)
          }
          options={[
            "Sexy",

            "Elegant",

            "Classic",

            "Luxury",

            "Comfort",

            "Bridal",
          ]}
          placeholder="Select Style"
          allowOther
          onChange={(value: string) => updateField("lingerieStyle", value)}
        />
      </div>

      {/* MATERIAL */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="lingerie-material"
          name="lingerieMaterial"
          label="Material"
          value={data.lingerieMaterial}
          customValue={data.customLingerieMaterial}
          onCustomChange={(value: string) =>
            updateField("customLingerieMaterial", value)
          }
          options={["Lace", "Silk", "Satin", "Cotton", "Mesh", "Velvet"]}
          placeholder="Select Material"
          allowOther
          onChange={(value: string) => updateField("lingerieMaterial", value)}
        />
      </div>

      {/* SIZE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="lingerie-size"
          name="lingerieSize"
          label="Size"
          value={data.lingerieSize}
          customValue={data.customLingerieSize}
          onCustomChange={(value: string) =>
            updateField("customLingerieSize", value)
          }
          options={["XS", "S", "M", "L", "XL", "XXL"]}
          placeholder="Select Size"
          allowOther
          onChange={(value: string) => updateField("lingerieSize", value)}
        />
      </div>

      {/* COLOR */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="lingerie-color"
          name="lingerieColor"
          label="Color"
          value={data.lingerieColor}
          customValue={data.customLingerieColor}
          onCustomChange={(value: string) =>
            updateField("customLingerieColor", value)
          }
          options={["Black", "White", "Red", "Pink", "Blue", "Nude", "Purple"]}
          placeholder="Select Color"
          allowOther
          onChange={(value: string) => updateField("lingerieColor", value)}
        />
      </div>

      {/* COVERAGE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="lingerie-coverage"
          name="lingerieCoverage"
          label="Coverage"
          value={data.lingerieCoverage}
          options={["Full Coverage", "Medium Coverage", "Low Coverage"]}
          placeholder="Select Coverage"
          onChange={(value: string) => updateField("lingerieCoverage", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="lingerie-occasion"
          name="lingerieOccasion"
          label="Occasion"
          value={data.lingerieOccasion}
          customValue={data.customLingerieOccasion}
          onCustomChange={(value: string) =>
            updateField("customLingerieOccasion", value)
          }
          options={[
            "Everyday Wear",

            "Honeymoon",

            "Wedding",

            "Gift",

            "Special Occasion",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value: string) => updateField("lingerieOccasion", value)}
        />
      </div>
    </div>
  );
}
