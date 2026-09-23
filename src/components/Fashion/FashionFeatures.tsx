"use client";

type FashionFeaturesProps = {
  data: any;

  updateField: (key: string, value: any) => void;
};

const FEATURES = [
  "Premium Quality",

  "Designer Wear",

  "Hand Made",

  "Custom Design",

  "Luxury Finish",

  "Limited Edition",

  "Exclusive Collection",

  "Authentic Brand",

  "Imported",

  "Trending Style",

  "Ready To Wear",

  "Made To Order",
];

export function FashionFeatures({
  data,

  updateField,
}: FashionFeaturesProps) {
  const toggleFeature = (feature: string) => {
    const currentFeatures = data.features || [];

    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((item: string) => item !== feature)
      : [...currentFeatures, feature];

    updateField("features", updatedFeatures);
  };

  const selectedFeatures = data.features || [];

  return (
    <div className="mt-4">
      <label
        className="
form-label
text-secondary
small
fw-semibold
mb-2
"
      >
        Fashion Features
      </label>

      <div className="row g-2">
        {FEATURES.map((feature) => (
          <div key={feature} className="col-12 col-md-4">
            <button
              type="button"
              onClick={() => toggleFeature(feature)}
              className={
                selectedFeatures.includes(feature)
                  ? "btn btn-dark w-100 text-start"
                  : "btn btn-light border w-100 text-start"
              }
              style={{
                borderRadius: "8px",

                fontSize: "12px",

                minHeight: "42px",
              }}
            >
              {selectedFeatures.includes(feature) ? "✓ " : "+ "}

              {feature}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
