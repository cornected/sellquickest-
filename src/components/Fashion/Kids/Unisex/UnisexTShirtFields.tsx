"use client";

import { StyledSelect } from "../../../StyledSelect";

type UnisexTShirtFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function UnisexTShirtFields({
  data,
  updateField,
}: UnisexTShirtFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👕 Unisex Kids T-Shirt Details</h6>
      </div>

      {/* TSHIRT TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-tshirt-type"
          name="unisexTshirtType"
          label="T-Shirt Type"
          value={data.unisexTshirtType}
          customValue={data.customUnisexTshirtType}
          onCustomChange={(value) => updateField("customUnisexTshirtType", value)}
          options={[
            "Casual T-Shirt",
            "Graphic T-Shirt",
            "Plain T-Shirt",
            "Sports T-Shirt",
            "Oversized T-Shirt",
            "School T-Shirt",
            "Tie-Dye T-Shirt",
          ]}
          placeholder="Select T-Shirt Type"
          allowOther
          onChange={(value) => updateField("unisexTshirtType", value)}
        />
      </div>

      {/* NECK TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-tshirt-neck"
          name="unisexTshirtNeck"
          label="Neck Type"
          value={data.unisexTshirtNeck}
          customValue={data.customUnisexTshirtNeck}
          onCustomChange={(value) => updateField("customUnisexTshirtNeck", value)}
          options={["Round Neck", "V Neck", "Polo Neck", "Crew Neck", "Henley Neck"]}
          placeholder="Select Neck Type"
          allowOther
          onChange={(value) => updateField("unisexTshirtNeck", value)}
        />
      </div>

      {/* SLEEVE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-tshirt-sleeve"
          name="unisexTshirtSleeve"
          label="Sleeve"
          value={data.unisexTshirtSleeve}
          customValue={data.customUnisexTshirtSleeve}
          onCustomChange={(value) => updateField("customUnisexTshirtSleeve", value)}
          options={["Short Sleeve", "Long Sleeve", "Sleeveless", "3/4 Sleeve"]}
          placeholder="Select Sleeve"
          allowOther
          onChange={(value) => updateField("unisexTshirtSleeve", value)}
        />
      </div>

      {/* FIT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-tshirt-fit"
          name="unisexTshirtFit"
          label="Fit"
          value={data.unisexTshirtFit}
          customValue={data.customUnisexTshirtFit}
          onCustomChange={(value) => updateField("customUnisexTshirtFit", value)}
          options={["Regular Fit", "Slim Fit", "Relaxed Fit", "Oversized", "Loose Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("unisexTshirtFit", value)}
        />
      </div>

      {/* PRINT / PATTERN */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-tshirt-print"
          name="unisexTshirtPrint"
          label="Print / Pattern"
          value={data.unisexTshirtPrint}
          customValue={data.customUnisexTshirtPrint}
          onCustomChange={(value) => updateField("customUnisexTshirtPrint", value)}
          options={[
            "Plain",
            "Cartoon / Character",
            "Graphic Print",
            "Striped",
            "Animal Print",
            "Camouflage",
            "Logo / Slogan",
          ]}
          placeholder="Select Print"
          allowOther
          onChange={(value) => updateField("unisexTshirtPrint", value)}
        />
      </div>

      {/* FABRIC */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-tshirt-fabric"
          name="unisexTshirtFabric"
          label="Fabric"
          value={data.unisexTshirtFabric}
          customValue={data.customUnisexTshirtFabric}
          onCustomChange={(value) => updateField("customUnisexTshirtFabric", value)}
          options={["100% Cotton", "Cotton Blend", "Polyester", "Jersey", "Organic Cotton"]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("unisexTshirtFabric", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-tshirt-occasion"
          name="unisexTshirtOccasion"
          label="Occasion"
          value={data.unisexTshirtOccasion}
          customValue={data.customUnisexTshirtOccasion}
          onCustomChange={(value) => updateField("customUnisexTshirtOccasion", value)}
          options={["Casual", "Sports / Active", "School", "Home / Playwear", "Party"]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("unisexTshirtOccasion", value)}
        />
      </div>
    </div>
  );
}
