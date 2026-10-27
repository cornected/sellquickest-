export interface SpecEntry {
  key: string;
  label: string;
  value: string;
}

const FRIENDLY_LABELS: Record<string, string> = {
  clothingType: "Clothing Type",
  brand: "Brand",
  make: "Make / Brand",
  model: "Model",
  year: "Year of Manufacture",
  trim: "Trim / Edition",
  bodyType: "Body Type",
  transmission: "Transmission",
  fuel: "Fuel Type",
  fuelType: "Fuel Type",
  driveType: "Drivetrain",
  drivetrain: "Drivetrain",
  cylinders: "Engine Cylinders",
  engineSize: "Engine Size",
  mileage: "Mileage (km)",
  vin: "VIN / Chassis Number",
  color: "Color",
  interior: "Interior Color",
  interiorColor: "Interior Color",
  condition: "Condition",
  availableForSwap: "Exchange / Swap Possible",
  availability: "Availability",
  size: "Size",
  material: "Material / Fabric",
  fabric: "Fabric / Material",
  gender: "Gender",
  style: "Style",
  suitType: "Suit Type",
  suitJacketStyle: "Suit Jacket Style",
  jacketStyle: "Jacket Style",
  suitLapelStyle: "Lapel Style",
  lapelStyle: "Lapel Style",
  suitFit: "Suit Fit",
  fit: "Fit",
  suitOccasion: "Occasion",
  occasion: "Occasion",
  suitVest: "Vest Included",
  vest: "Vest Included",
  partType: "Part Type",
  type: "Part Type",
  subtype: "Part Subtype",
  partNumber: "Part / OEM Number",
  genuineType: "Authenticity / Grade",
  warranty: "Warranty",
  propertyType: "Property Type",
  bedrooms: "Bedrooms",
  bathrooms: "Bathrooms",
  toilets: "Toilets",
  furnishing: "Furnishing Status",
  parkingSpaces: "Parking Spaces",
  squareMeters: "Size (sqm)",
  plotSize: "Plot Size",
  titleDocument: "Title / Document Type",
  storage: "Internal Storage",
  ram: "RAM",
  screenSize: "Screen Size",
  batteryHealth: "Battery Health",
  simType: "SIM Type",
  operatingSystem: "Operating System",
  processor: "Processor",
  jobType: "Job Type",
  workMode: "Work Mode",
  experienceLevel: "Experience Level",
  salaryPeriod: "Payment Period",
};

function formatKeyLabel(key: string): string {
  if (FRIENDLY_LABELS[key]) return FRIENDLY_LABELS[key];
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
}

export function extractListingSpecs(listing: any): {
  specs: SpecEntry[];
  features: string[];
  resolvedCondition: string;
} {
  const specs: SpecEntry[] = [];
  let features: string[] = [];
  let rawObj: Record<string, any> | null = null;

  try {
    if (listing?.spareDetails) {
      const parsed =
        typeof listing.spareDetails === "string"
          ? JSON.parse(listing.spareDetails)
          : listing.spareDetails;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        rawObj = parsed;
      }
    } else if (
      listing?.metadata?.details &&
      typeof listing.metadata.details === "object"
    ) {
      rawObj = listing.metadata.details;
    }
  } catch {
    rawObj = null;
  }

  let resolvedCondition =
    typeof listing?.condition === "string" && listing.condition.trim()
      ? listing.condition.trim()
      : "Used";

  if (rawObj) {
    // Resolve custom condition or specific condition if present
    const customCond =
      typeof rawObj.customCondition === "string" ? rawObj.customCondition.trim() : "";
    const objCond =
      typeof rawObj.condition === "string" ? rawObj.condition.trim() : "";
    if (customCond && (!objCond || objCond.toLowerCase().startsWith("other"))) {
      resolvedCondition = customCond;
    } else if (objCond && !objCond.toLowerCase().startsWith("other")) {
      resolvedCondition = objCond;
    }

    const handledCustomKeys = new Set<string>();

    for (const [key, rawVal] of Object.entries(rawObj)) {
      if (key.startsWith("custom")) continue;

      if (key === "features" || key === "amenities" || key === "perks") {
        if (Array.isArray(rawVal)) {
          const valid = rawVal
            .map((item) => String(item || "").trim())
            .filter(Boolean);
          features.push(...valid);
        } else if (typeof rawVal === "string" && rawVal.trim()) {
          features.push(
            ...rawVal
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          );
        }
        continue;
      }

      const customKey = `custom${key.charAt(0).toUpperCase()}${key.slice(1)}`;
      handledCustomKeys.add(customKey);
      const customVal =
        typeof rawObj[customKey] === "string" ? rawObj[customKey].trim() : "";

      let finalValue = "";
      if (Array.isArray(rawVal)) {
        finalValue = rawVal
          .map((item) => String(item || "").trim())
          .filter(Boolean)
          .join(", ");
      } else if (rawVal !== null && rawVal !== undefined) {
        finalValue = String(rawVal).trim();
      }

      if (
        (!finalValue ||
          finalValue.toLowerCase() === "other" ||
          finalValue.toLowerCase().startsWith("other (")) &&
        customVal
      ) {
        finalValue = customVal;
      } else if (
        finalValue &&
        customVal &&
        finalValue.toLowerCase() !== customVal.toLowerCase()
      ) {
        finalValue = `${finalValue} (${customVal})`;
      }

      if (!finalValue || finalValue.toLowerCase() === "other") continue;

      specs.push({
        key,
        label: formatKeyLabel(key),
        value: finalValue,
      });
    }

    // Also include any custom* field whose base key was not present or was empty
    for (const [key, rawVal] of Object.entries(rawObj)) {
      if (!key.startsWith("custom") || handledCustomKeys.has(key)) continue;
      const val = typeof rawVal === "string" ? rawVal.trim() : "";
      if (!val) continue;
      const baseKey = key.replace(/^custom/, "");
      const normalizedKey =
        baseKey.charAt(0).toLowerCase() + baseKey.slice(1);
      if (!specs.some((s) => s.key === normalizedKey)) {
        specs.push({
          key: normalizedKey,
          label: formatKeyLabel(normalizedKey),
          value: val,
        });
      }
    }
  }

  return {
    specs,
    features: Array.from(new Set(features)),
    resolvedCondition,
  };
}
