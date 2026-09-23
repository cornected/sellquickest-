"use client";

import { StyledSelect } from "../../../StyledSelect";

type UnisexNativeWearFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function UnisexNativeWearFields({
  data,
  updateField,
}: UnisexNativeWearFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🇳🇬 Unisex Kids Native Wear Details</h6>
      </div>

      {/* NATIVE TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-native-type"
          name="unisexNativeType"
          label="Native Wear Type"
          value={data.unisexNativeType}
          customValue={data.customUnisexNativeType}
          onCustomChange={(value) => updateField("customUnisexNativeType", value)}
          options={[
            "Ankara Set (Top & Trousers/Shorts)",
            "Two-Piece Native Set",
            "Senator Style Set",
            "Kaftan / Dashiki Set",
            "Aso Oke Outfit",
            "Lace Traditional Set",
            "Buba & Sokoto",
          ]}
          placeholder="Select Native Wear Type"
          allowOther
          onChange={(value) => updateField("unisexNativeType", value)}
        />
      </div>

      {/* FABRIC */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-native-fabric"
          name="unisexNativeFabric"
          label="Fabric"
          value={data.unisexNativeFabric}
          customValue={data.customUnisexNativeFabric}
          onCustomChange={(value) => updateField("customUnisexNativeFabric", value)}
          options={[
            "Ankara (African Wax Print)",
            "Senator / Cashmere Blend",
            "Cotton / Linen",
            "Aso Oke",
            "Lace",
            "Brocade / Damask",
            "Adire / Tie & Dye",
          ]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("unisexNativeFabric", value)}
        />
      </div>

      {/* STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-native-style"
          name="unisexNativeStyle"
          label="Style"
          value={data.unisexNativeStyle}
          customValue={data.customUnisexNativeStyle}
          onCustomChange={(value) => updateField("customUnisexNativeStyle", value)}
          options={["Classic Traditional", "Modern Afro-Centric", "Simple & Elegant", "Designer Set"]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("unisexNativeStyle", value)}
        />
      </div>

      {/* SLEEVE TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-native-sleeve"
          name="unisexNativeSleeve"
          label="Sleeve Type"
          value={data.unisexNativeSleeve}
          customValue={data.customUnisexNativeSleeve}
          onCustomChange={(value) => updateField("customUnisexNativeSleeve", value)}
          options={["Short Sleeve", "Long Sleeve", "3/4 Sleeve", "Sleeveless"]}
          placeholder="Select Sleeve"
          allowOther
          onChange={(value) => updateField("unisexNativeSleeve", value)}
        />
      </div>

      {/* EMBROIDERY / DETAILING */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-native-embroidery"
          name="unisexNativeEmbroidery"
          label="Embroidery / Detailing"
          value={data.unisexNativeEmbroidery}
          customValue={data.customUnisexNativeEmbroidery}
          onCustomChange={(value) => updateField("customUnisexNativeEmbroidery", value)}
          options={[
            "Plain (No Embroidery)",
            "Light Neck Embroidery",
            "Chest Embroidery",
            "Stone / Bead Detailing",
            "Printed Pattern Only",
          ]}
          placeholder="Select Detailing"
          allowOther
          onChange={(value) => updateField("unisexNativeEmbroidery", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="unisex-native-occasion"
          name="unisexNativeOccasion"
          label="Occasion"
          value={data.unisexNativeOccasion}
          customValue={data.customUnisexNativeOccasion}
          onCustomChange={(value) => updateField("customUnisexNativeOccasion", value)}
          options={[
            "Sunday Service / Church",
            "Friday / Mosque / Eid",
            "Wedding (Owambe)",
            "Cultural Day / School Event",
            "Birthday Party",
            "Family Gathering",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("unisexNativeOccasion", value)}
        />
      </div>
    </div>
  );
}
