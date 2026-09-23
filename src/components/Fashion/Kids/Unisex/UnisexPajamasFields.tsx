"use client";

import { StyledSelect } from "../../../StyledSelect";

type UnisexPajamasFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function UnisexPajamasFields({
  data,
  updateField,
}: UnisexPajamasFieldsProps) {
  return (
    <div className="row g-3 mt-3">
      <h6 className="fw-semibold text-dark">🌙 Unisex Kids Pajamas & Sleepwear Details</h6>

      {/* SLEEPWEAR TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-pajamas-type"
          name="unisexPajamasType"
          label="Sleepwear Type"
          value={data.unisexPajamasType}
          customValue={data.customUnisexPajamasType}
          onCustomChange={(value) => updateField("customUnisexPajamasType", value)}
          options={[
            "Two-Piece Pajama Set (Top & Trousers)",
            "Shorts Pajama Set",
            "Onesie / Sleepsuit / Romper",
            "Thermal Sleepwear",
            "Nightshirt",
          ]}
          placeholder="Select Sleepwear Type"
          allowOther
          onChange={(value) => updateField("unisexPajamasType", value)}
        />
      </div>

      {/* SLEEVE TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-pajamas-sleeve"
          name="unisexPajamasSleeve"
          label="Sleeve Type"
          value={data.unisexPajamasSleeve}
          customValue={data.customUnisexPajamasSleeve}
          onCustomChange={(value) => updateField("customUnisexPajamasSleeve", value)}
          options={["Long Sleeve", "Short Sleeve", "Sleeveless"]}
          placeholder="Select Sleeve"
          allowOther
          onChange={(value) => updateField("unisexPajamasSleeve", value)}
        />
      </div>

      {/* FABRIC */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-pajamas-fabric"
          name="unisexPajamasFabric"
          label="Fabric"
          value={data.unisexPajamasFabric}
          customValue={data.customUnisexPajamasFabric}
          onCustomChange={(value) => updateField("customUnisexPajamasFabric", value)}
          options={[
            "100% Breathable Cotton",
            "Fleece",
            "Flannel",
            "Cotton Jersey",
            "Silk / Satin Blend",
          ]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("unisexPajamasFabric", value)}
        />
      </div>

      {/* CLOSURE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-pajamas-closure"
          name="unisexPajamasClosure"
          label="Closure"
          value={data.unisexPajamasClosure}
          customValue={data.customUnisexPajamasClosure}
          onCustomChange={(value) => updateField("customUnisexPajamasClosure", value)}
          options={["Pullover (Elastic)", "Full Front Zipper", "Snap Buttons", "Button-Down Front"]}
          placeholder="Select Closure"
          allowOther
          onChange={(value) => updateField("unisexPajamasClosure", value)}
        />
      </div>

      {/* FIT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-pajamas-fit"
          name="unisexPajamasFit"
          label="Fit"
          value={data.unisexPajamasFit}
          customValue={data.customUnisexPajamasFit}
          onCustomChange={(value) => updateField("customUnisexPajamasFit", value)}
          options={["Snug / Slim Fit (Fire Safety)", "Regular Fit", "Relaxed / Loose Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("unisexPajamasFit", value)}
        />
      </div>

      {/* PRINT / THEME */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-pajamas-print"
          name="unisexPajamasPrint"
          label="Print / Theme"
          value={data.unisexPajamasPrint}
          customValue={data.customUnisexPajamasPrint}
          onCustomChange={(value) => updateField("customUnisexPajamasPrint", value)}
          options={[
            "Cartoon Characters",
            "Animal Print",
            "Stars & Space",
            "Stripes & Polka Dots",
            "Plain Solid Color",
            "Holiday / Christmas Theme",
          ]}
          placeholder="Select Print / Theme"
          allowOther
          onChange={(value) => updateField("unisexPajamasPrint", value)}
        />
      </div>
    </div>
  );
}
