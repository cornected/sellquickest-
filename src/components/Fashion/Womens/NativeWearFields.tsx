"use client";

import { StyledSelect } from "../../StyledSelect";

type NativeWearFieldsProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

export function NativeWearFields({
  data,

  updateField,
}: NativeWearFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👗 Native Wear Details</h6>
      </div>

      {/* NATIVE TYPE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="native-type"
          name="nativeType"
          label="Native Wear Type"
          value={data.nativeType}
          customValue={data.customNativeType}
          onCustomChange={(value: string) =>
            updateField("customNativeType", value)
          }
          options={[
            "Iro and Buba",

            "Ankara Set",

            "Lace Outfit",

            "George Wrapper",

            "Aso Oke Outfit",

            "Traditional Gown",

            "Two Piece Native",

            "Senator Style",
          ]}
          placeholder="Select Native Wear Type"
          allowOther
          onChange={(value: string) => updateField("nativeType", value)}
        />
      </div>

      {/* FABRIC */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="native-fabric"
          name="nativeFabric"
          label="Fabric"
          value={data.nativeFabric}
          customValue={data.customNativeFabric}
          onCustomChange={(value) => updateField("customNativeFabric", value)}
          options={[
            "Lace",

            "Ankara",

            "George",

            "Aso Oke",

            "Silk",

            "Velvet",

            "Cotton",
          ]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value: string) => updateField("nativeFabric", value)}
        />
      </div>

      {/* STYLE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="native-style"
          name="nativeStyle"
          label="Design Style"
          value={data.nativeStyle}
          customValue={data.customNativeStyle}
          onCustomChange={(value) => updateField("customNativeStyle", value)}
          options={["Classic", "Modern", "Luxury", "Designer", "Simple"]}
          placeholder="Select Style"
          allowOther
          onChange={(value: string) => updateField("nativeStyle", value)}
        />
      </div>

      {/* EMBROIDERY */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="native-embroidery"
          name="nativeEmbroidery"
          label="Embroidery"
          value={data.nativeEmbroidery}
          options={[
            "Plain",

            "Light Embroidery",

            "Heavy Embroidery",

            "Beaded",

            "Stone Detail",
          ]}
          placeholder="Select Embroidery"
          onChange={(value: string) => updateField("nativeEmbroidery", value)}
        />
      </div>

      {/* HEAD TIE */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="native-headtie"
          name="nativeHeadTie"
          label="Head Tie Included"
          value={data.nativeHeadTie}
          options={["Yes", "No"]}
          placeholder="Select Option"
          onChange={(value: string) => updateField("nativeHeadTie", value)}
        />
      </div>

      {/* FIT */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="native-fit"
          name="nativeFit"
          label="Fit"
          value={data.nativeFit}
          customValue={data.customNativeFit}
          onCustomChange={(value) => updateField("customNativeFit", value)}
          options={["Loose Fit", "Regular Fit", "Tailored Fit"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value: string) => updateField("nativeFit", value)}
        />
      </div>

      {/* OCCASION */}

      <div className="col-12 col-md-6">
        <StyledSelect
          id="native-occasion"
          name="nativeOccasion"
          label="Occasion"
          value={data.nativeOccasion}
          customValue={data.customNativeOccasion}
          onCustomChange={(value) => updateField("customNativeOccasion", value)}
          options={[
            "Wedding",

            "Traditional Event",

            "Bride",

            "Birthday",

            "Religious Event",

            "Party",

            "Formal Event",
          ]}
          placeholder="Select Occasion"
          allowOther
          onChange={(value: string) => updateField("nativeOccasion", value)}
        />
      </div>
    </div>
  );
}
