"use client";

import { StyledSelect } from "../../../StyledSelect";

type GirlsNativeWearFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function GirlsNativeWearFields({
  data,
  updateField,
}: GirlsNativeWearFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👗 Girls Native Wear Details</h6>
      </div>

      {/* NATIVE TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-native-type"
          name="nativeType"
          label="Native Wear Type"
          value={data.nativeType}
          customValue={data.customNativeType}
          onCustomChange={(value) => updateField("customNativeType", value)}
          options={[
            "Ankara Dress",
            "Lace Dress",
            "Bubu Dress",
            "Kaftan",
            "Traditional Gown",
            "Two Piece Set",
          ]}
          placeholder="Select Native Wear Type"
          allowOther
          onChange={(value) => updateField("nativeType", value)}
        />
      </div>

      {/* FABRIC */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-native-fabric"
          name="nativeFabric"
          label="Fabric"
          value={data.nativeFabric}
          customValue={data.customNativeFabric}
          onCustomChange={(value) => updateField("customNativeFabric", value)}
          options={["Ankara", "Lace", "George", "Silk", "Chiffon", "Velvet"]}
          placeholder="Select Fabric"
          allowOther
          onChange={(value) => updateField("nativeFabric", value)}
        />
      </div>

      {/* STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-native-style"
          name="nativeStyle"
          label="Style"
          value={data.nativeStyle}
          customValue={data.customNativeStyle}
          onCustomChange={(value) => updateField("customNativeStyle", value)}
          options={[
            "Simple",
            "Flared",
            "Fitted",
            "Princess Cut",
            "Modern Traditional",
          ]}
          placeholder="Select Style"
          allowOther
          onChange={(value) => updateField("nativeStyle", value)}
        />
      </div>

      {/* EMBROIDERY */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-native-embroidery"
          name="nativeEmbroidery"
          label="Embroidery / Decoration"
          value={data.nativeEmbroidery}
          customValue={data.customNativeEmbroidery}
          onCustomChange={(value) =>
            updateField("customNativeEmbroidery", value)
          }
          options={["None", "Embroidery", "Beads", "Stones", "Sequins"]}
          placeholder="Select Decoration"
          allowOther
          onChange={(value) => updateField("nativeEmbroidery", value)}
        />
      </div>

      {/* HEAD ACCESSORY */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-native-head-accessory"
          name="nativeHeadAccessory"
          label="Head Accessory Included"
          value={data.nativeHeadAccessory}
          customValue={data.customNativeHeadAccessory}
          onCustomChange={(value) =>
            updateField("customNativeHeadAccessory", value)
          }
          options={["Head Tie", "Cap", "Fascinator", "None"]}
          placeholder="Select Accessory"
          allowOther
          onChange={(value) => updateField("nativeHeadAccessory", value)}
        />
      </div>

      {/* FIT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-native-fit"
          name="nativeFit"
          label="Fit"
          value={data.nativeFit}
          customValue={data.customNativeFit}
          onCustomChange={(value) => updateField("customNativeFit", value)}
          options={["Slim Fit", "Regular Fit", "Loose Fit", "Free Size"]}
          placeholder="Select Fit"
          allowOther
          onChange={(value) => updateField("nativeFit", value)}
        />
      </div>

      {/* OCCASION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="girls-native-occasion"
          name="nativeOccasion"
          label="Occasion"
          value={data.nativeOccasion}
          customValue={data.customNativeOccasion}
          onCustomChange={(value) => updateField("customNativeOccasion", value)}
          options={[
            "Wedding",
            "Birthday",
            "Ceremony",
            "Cultural Event",
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
