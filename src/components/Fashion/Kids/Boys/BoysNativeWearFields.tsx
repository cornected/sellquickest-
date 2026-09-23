"use client";

import { StyledSelect } from "../../../StyledSelect";

type BoysNativeWearFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function BoysNativeWearFields({
  data,

  updateField,
}: BoysNativeWearFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🇳🇬 Boys Native Wear Details</h6>
      </div>

      {/* NATIVE TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-native-type"
          name="nativeType"
          label="Native Wear Type"
          value={data.nativeType}
          customValue={data.customNativeType}
          onCustomChange={(value) => updateField("customNativeType", value)}
          options={[
            "Senator Wear",

            "Agbada",

            "Ankara Set",

            "Lace Outfit",

            "Traditional Set",

            "Two Piece Native",
          ]}
          placeholder="Select Native Wear Type"
          allowOther
          onChange={(value) => updateField("nativeType", value)}
        />
      </div>

      {/* FABRIC */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-native-fabric"
          name="nativeFabric"
          label="Fabric"
          value={data.nativeFabric}
          customValue={data.customNativeFabric}
          onCustomChange={(value) => updateField("customNativeFabric", value)}
          options={["Lace", "Ankara", "George", "Aso Oke", "Cotton", "Silk"]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("nativeFabric", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-native-style"
          name="nativeStyle"
          label="Style"
          value={data.nativeStyle}
          customValue={data.customNativeStyle}
          onCustomChange={(value) => updateField("customNativeStyle", value)}
          options={["Classic", "Modern", "Luxury", "Simple", "Designer"]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("nativeStyle", value)}
        />
      </div>

      {/* EMBROIDERY */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-native-embroidery"
          name="nativeEmbroidery"
          label="Embroidery"
          value={data.nativeEmbroidery}
          options={[
            "Plain",

            "Light Embroidery",

            "Heavy Embroidery",

            "Stone Detail",
          ]}
          placeholder="Select Embroidery"
          onChange={(value) => updateField("nativeEmbroidery", value)}
        />
      </div>

      {/* CAP */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-native-cap"
          name="nativeCap"
          label="Cap Included"
          value={data.nativeCap}
          options={["Yes", "No"]}
          placeholder="Select Option"
          onChange={(value) => updateField("nativeCap", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-native-fit"
          name="nativeFit"
          label="Fit"
          value={data.nativeFit}
          customValue={data.customNativeFit}
          onCustomChange={(value) => updateField("customNativeFit", value)}
          options={["Regular Fit", "Slim Fit", "Loose Fit", "Tailored Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("nativeFit", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="boys-native-occasion"
          name="nativeOccasion"
          label="Occasion"
          value={data.nativeOccasion}
          customValue={data.customNativeOccasion}
          onCustomChange={(value) => updateField("customNativeOccasion", value)}
          options={[
            "Wedding",

            "Traditional Event",

            "Baptism",

            "Birthday",

            "Religious Event",

            "Party",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value) => updateField("nativeOccasion", value)}
        />
      </div>
    </div>
  );
}
