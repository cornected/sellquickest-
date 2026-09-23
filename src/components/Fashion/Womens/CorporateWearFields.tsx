"use client";

import { StyledSelect } from "../../StyledSelect";

type CorporateWearFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function CorporateWearFields({
  data,

  updateField,
}: CorporateWearFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👔 Corporate Wear Details</h6>
      </div>

      {/* CORPORATE TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="corporate-type"
          name="corporateType"
          label="Corporate Type"
          value={data.corporateType}
          customValue={data.customCorporateType}
          onCustomChange={(value: any) =>
            updateField("customCorporateType", value)
          }
          options={[
            "Corporate Dress",

            "Blazer Set",

            "Skirt Suit",

            "Trouser Suit",

            "Office Gown",

            "Business Casual",

            "Executive Wear",
          ]}
          placeholder="Select Corporate Type"
          allowOther
          onChange={(value: any) => updateField("corporateType", value)}
        />
      </div>

      {/* SET TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="corporate-set"
          name="corporateSet"
          label="Set Type"
          value={data.corporateSet}
          customValue={data.customCorporateSet}
          onCustomChange={(value: any) =>
            updateField("customCorporateSet", value)
          }
          options={["One Piece", "Two Piece", "Three Piece", "Matching Set"]}
          placeholder="Select Set Type"
          allowOther
          onChange={(value: any) => updateField("corporateSet", value)}
        />
      </div>

      {/* SLEEVE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="corporate-sleeve"
          name="corporateSleeve"
          label="Sleeve Style"
          value={data.corporateSleeve}
          customValue={data.customCorporateSleeve}
          onCustomChange={(value: any) =>
            updateField("customCorporateSleeve", value)
          }
          options={[
            "Short Sleeve",

            "Long Sleeve",

            "Three Quarter Sleeve",

            "Sleeveless",
          ]}
          placeholder="Select Sleeve Style"
          allowOther
          onChange={(value: any) => updateField("corporateSleeve", value)}
        />
      </div>

      {/* FABRIC */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="corporate-fabric"
          name="corporateFabric"
          label="Fabric"
          value={data.corporateFabric}
          customValue={data.customCorporateFabric}
          onCustomChange={(value: any) =>
            updateField("customCorporateFabric", value)
          }
          options={[
            "Chiffon",

            "Lace",

            "Silk",

            "Cotton",

            "Crepe",

            "Polyester",

            "Velvet",
          ]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value: any) => updateField("corporateFabric", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="corporate-fit"
          name="corporateFit"
          label="Fit"
          value={data.corporateFit}
          customValue={data.customCorporateFit}
          onCustomChange={(value: any) =>
            updateField("customCorporateFit", value)
          }
          options={["Slim Fit", "Regular Fit", "Tailored Fit", "Loose Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value: any) => updateField("corporateFit", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="corporate-style"
          name="corporateStyle"
          label="Style"
          value={data.corporateStyle}
          customValue={data.customCorporateStyle}
          onCustomChange={(value: any) =>
            updateField("customCorporateStyle", value)
          }
          options={["Classic", "Modern", "Luxury", "Minimalist", "Designer"]}
          placeholder="Select Style"
          allowOther
          onChange={(value: any) => updateField("corporateStyle", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="corporate-occasion"
          name="corporateOccasion"
          label="Occasion"
          value={data.corporateOccasion}
          customValue={data.customCorporateOccasion}
          onCustomChange={(value: any) =>
            updateField("customCorporateOccasion", value)
          }
          options={[
            "Office",

            "Interview",

            "Business Meeting",

            "Conference",

            "Formal Event",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value: any) => updateField("corporateOccasion", value)}
        />
      </div>
    </div>
  );
}
