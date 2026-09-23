"use client";

import { StyledSelect } from "../../StyledSelect";

type NativeFootwearFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function NativeFootwearFields({
  data,
  updateField,
}: NativeFootwearFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">✨ Traditional, Native & Ceremonial Footwear Details</h6>
      </div>

      {/* STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="native-shoe-style"
          name="nativeShoeStyle"
          label="Traditional Footwear Style"
          value={data.nativeShoeStyle}
          customValue={data.customNativeShoeStyle}
          onCustomChange={(val: string) => updateField("customNativeShoeStyle", val)}
          options={[
            "Handcrafted Leather Palm Slippers",
            "Half Shoes / Backless Mules",
            "Embroidered Velvet Slippers (Aso-Ebi)",
            "Royal / Beaded Slippers & Shoes",
            "Pointed Babouche Slippers",
            "Leather Sandal with Senator Toe-Loop",
            "Kano / Maiduguri Traditional Leather Slippers",
          ]}
          placeholder="Select Style"
          allowOther
          onChange={(val: string) => updateField("nativeShoeStyle", val)}
        />
      </div>

      {/* EMBROIDERY / ORNAMENTATION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="native-shoe-decor"
          name="nativeShoeDecor"
          label="Embroidery & Craft Details"
          value={data.nativeShoeDecor}
          customValue={data.customNativeShoeDecor}
          onCustomChange={(val: string) => updateField("customNativeShoeDecor", val)}
          options={[
            "Gold / Metallic Thread Embroidery",
            "Hand-Beaded Royal Patterns",
            "Intricate Leather Weaving",
            "Metal Horsebit / Lion Head Crest",
            "Plain Elegant Minimalist",
          ]}
          placeholder="Select Craft Details"
          allowOther
          onChange={(val: string) => updateField("nativeShoeDecor", val)}
        />
      </div>

      {/* PAIRING / OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="native-shoe-occasion"
          name="nativeShoeOccasion"
          label="Best Paired With"
          value={data.nativeShoeOccasion}
          customValue={data.customNativeShoeOccasion}
          onCustomChange={(val: string) => updateField("customNativeShoeOccasion", val)}
          options={[
            "Agbada & Grand Boubou",
            "Senator / Kaftan Wear",
            "Traditional Wedding / Aso-Ebi",
            "Friday Juma'at / Church Sunday Best",
            "Casual Native Lounge Wear",
          ]}
          placeholder="Select Pairing"
          allowOther
          onChange={(val: string) => updateField("nativeShoeOccasion", val)}
        />
      </div>

      {/* PRODUCTION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="native-shoe-craft"
          name="nativeShoeCraft"
          label="Craftsmanship"
          value={data.nativeShoeCraft}
          options={[
            "Handmade by Local Nigerian Cobblers (Pure Leather)",
            "Imported Luxury Artisan",
            "Custom Bespoke Made-to-Order",
            "Factory Produced",
          ]}
          placeholder="Select Craftsmanship"
          onChange={(val: string) => updateField("nativeShoeCraft", val)}
        />
      </div>
    </div>
  );
}
