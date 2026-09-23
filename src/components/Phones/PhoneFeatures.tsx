"use client";

type PhoneFeaturesProps = {
  data: { features?: string[] };
  updateField: (key: string, value: any) => void;
};

const PHONE_FEATURES = [
  "5G Network Enabled",
  "Dual SIM (Physical + Nano)",
  "eSIM Supported",
  "OLED / Super Retina Display",
  "120Hz Fast Refresh Rate",
  "Face ID / 3D Facial Recognition",
  "Under-Display Fingerprint Sensor",
  "Wireless Charging (MagSafe / Qi)",
  "Fast Charging Support",
  "Water & Dust Resistant (IP68)",
  "100% Battery Health",
  "Follow-Come Original Charger Included",
  "Original Box & Manuals",
  "Clean IMEI / No Blacklist",
  "Factory Unlocked (Worldwide)",
  "iCloud Clean / No FRP Lock",
  "Receipt / Proof of Purchase Available",
  "Gorilla Glass Screen Protector Installed",
  "Free Pouch / Protective Case",
  "No Cracks / Spotless Clean",
];

export function PhoneFeatures({ data, updateField }: PhoneFeaturesProps) {
  const toggleFeature = (feature: string) => {
    const current = data.features || [];
    const updated = current.includes(feature)
      ? current.filter((item: string) => item !== feature)
      : [...current, feature];
    updateField("features", updated);
  };

  const selected = data.features || [];

  return (
    <div className="mt-4">
      <label className="form-label text-secondary small fw-semibold mb-2">
        Device Highlights & Key Inclusions
      </label>
      <div className="d-flex flex-wrap gap-2">
        {PHONE_FEATURES.map((feature) => {
          const isSelected = selected.includes(feature);
          return (
            <button
              key={feature}
              type="button"
              onClick={() => toggleFeature(feature)}
              className={`btn btn-sm ${
                isSelected
                  ? "btn-success text-white fw-semibold shadow-sm"
                  : "btn-light text-secondary border border-light-subtle"
              }`}
              style={{
                borderRadius: "20px",
                fontSize: "12px",
                padding: "6px 14px",
                transition: "all 0.15s ease",
              }}
            >
              {isSelected ? "✓ " : "+ "}
              {feature}
            </button>
          );
        })}
      </div>
    </div>
  );
}
