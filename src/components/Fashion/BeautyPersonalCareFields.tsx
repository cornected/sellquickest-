"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { FashionFeatures } from "./FashionFeatures";
import { FashionBrandSelect } from "./FashionBrandSelect";

type BeautyPersonalCareFieldsProps = {
  onChange: (data: object) => void;
};

const BEAUTY_CATEGORIES = [
  "Perfumes & Fragrances (Oud, EDP, EDT)",
  "Skincare (Lotions, Serums, Toners, Creams)",
  "Makeup & Cosmetics (Foundations, Powders, Lipsticks)",
  "Hair Care & Growth Oils",
  "Oral Care & Teeth Whitening",
  "Bath & Body Wash / Exfoliating Scrubs",
  "Deodorants & Antiperspirants",
  "Shaving & Beard Grooming Kits",
  "Nail Art & Manicure Tools",
  "Beauty Equipment & Ring Lights",
];

const SKIN_TYPES = [
  "All Skin Types",
  "Oily / Acne-Prone Skin",
  "Dry & Dehydrated Skin",
  "Sensitive Skin",
  "Combination Skin",
  "Normal Skin",
];

const FRAGRANCE_TYPES = [
  "Eau De Parfum (EDP - High Concentration / Long-Lasting)",
  "Parfum / Extrait de Parfum (Highest Oil Concentration)",
  "Eau De Toilette (EDT - Everyday Fresh)",
  "Pure Perfume Oil / Attar (Alcohol-Free)",
  "Body Mist & Spray",
  "Oud Wood / Arabian Incense (Bakhoor)",
];

const INGREDIENTS_SPECIALTY = [
  "100% Organic & Natural Plant Extracts",
  "Kojic Acid / Papaya / Turmeric (Brightening)",
  "Hyaluronic Acid & Niacinamide (Hydration & Glow)",
  "Vitamin C / Retinol (Anti-Aging)",
  "Salicylic Acid (Anti-Acne / Blemish Control)",
  "Shea Butter & Cocoa Butter (Rich Moisture)",
  "Alcohol-Free & Halal Certified",
  "Dermatologically Tested",
];

export function BeautyPersonalCareFields({
  onChange,
}: BeautyPersonalCareFieldsProps) {
  const [data, setData] = useState({
    gender: "",
    beautyCategory: "",
    customBeautyCategory: "",
    brand: "",
    customBrand: "",
    targetSkinType: "",
    fragranceType: "",
    fragranceLongevity: "",
    volumeSize: "",
    customVolumeSize: "",
    specialtyIngredient: "",
    customSpecialtyIngredient: "",
    formulation: "",
    countryOfOrigin: "",
    customCountryOfOrigin: "",
    condition: "",
    customCondition: "",
    packaging: "",
    availability: "",
    customAvailability: "",
    features: [] as string[],
  });

  const updateField = (key: string, value: any) => {
    const updated = {
      ...data,
      [key]: value,
    };
    setData(updated);
    onChange(updated);
  };

  const isPerfume = data.beautyCategory.includes("Perfumes & Fragrances");
  const isSkincare =
    data.beautyCategory.includes("Skincare") ||
    data.beautyCategory.includes("Bath & Body");
  const isMakeup = data.beautyCategory.includes("Makeup & Cosmetics");

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="fs-5">🧴</span>
        <h5 className="h6 fw-bold mb-0 text-dark">
          Beauty & Personal Care Details
        </h5>
      </div>

      <div className="row g-3 mb-4">
        {/* TARGET GENDER */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="beauty-gender"
            name="gender"
            label="Target Audience / Gender"
            value={data.gender}
            options={["Unisex", "Women", "Men (Men's Grooming)", "Kids & Baby Care"]}
            placeholder="Select Target Audience"
            onChange={(val: string) => updateField("gender", val)}
          />
        </div>

        {/* BEAUTY CATEGORY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="beauty-category"
            name="beautyCategory"
            label="Product Category"
            value={data.beautyCategory}
            customValue={data.customBeautyCategory}
            onCustomChange={(val: string) => updateField("customBeautyCategory", val)}
            options={BEAUTY_CATEGORIES}
            placeholder="Select Category"
            allowOther
            onChange={(val: string) => updateField("beautyCategory", val)}
          />
        </div>

        {/* BRAND / MANUFACTURER */}
        <div className="col-12 col-md-6">
          <FashionBrandSelect
            category="Beauty & Personal Care"
            label="Brand / Manufacturer"
            value={data.brand}
            onChange={(val: string) => updateField("brand", val)}
            customValue={data.customBrand}
            onCustomChange={(val: string) => updateField("customBrand", val)}
          />
        </div>

        {/* FORMULATION TYPE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="beauty-formulation"
            name="formulation"
            label="Formulation & Texture"
            value={data.formulation}
            options={[
              "Liquid / Spray",
              "Cream / Lotion",
              "Serum / Concentrate",
              "Gel",
              "Pressed Powder / Loose Powder",
              "Solid Bar Soap",
              "Oil / Essential Drops",
            ]}
            placeholder="Select Formulation"
            onChange={(val: string) => updateField("formulation", val)}
          />
        </div>

        {/* DYNAMIC: PERFUME TYPE & LONGEVITY */}
        {isPerfume && (
          <div className="col-12">
            <div className="p-3 bg-white border border-light-subtle rounded-3">
              <h6 className="fw-semibold text-dark mb-2">🌸 Perfume & Fragrance Specifications</h6>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <StyledSelect
                    id="fragrance-type"
                    name="fragranceType"
                    label="Fragrance Concentration"
                    value={data.fragranceType}
                    options={FRAGRANCE_TYPES}
                    placeholder="Select Fragrance Type"
                    onChange={(val: string) => updateField("fragranceType", val)}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <StyledSelect
                    id="fragrance-longevity"
                    name="fragranceLongevity"
                    label="Scent Longevity & Projection"
                    value={data.fragranceLongevity}
                    options={[
                      "Beast Mode (24+ Hours Longevity & Strong Trail)",
                      "Long-Lasting (8 - 12 Hours)",
                      "Moderate (4 - 7 Hours)",
                      "Light & Subtle Daily Spray",
                    ]}
                    placeholder="Select Longevity"
                    onChange={(val: string) =>
                      updateField("fragranceLongevity", val)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DYNAMIC: SKINCARE SKIN TYPE */}
        {isSkincare && (
          <div className="col-12">
            <div className="p-3 bg-white border border-light-subtle rounded-3">
              <h6 className="fw-semibold text-dark mb-2">✨ Skincare Specifications</h6>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <StyledSelect
                    id="skin-type"
                    name="targetSkinType"
                    label="Recommended Skin Type"
                    value={data.targetSkinType}
                    options={SKIN_TYPES}
                    placeholder="Select Skin Type"
                    onChange={(val: string) => updateField("targetSkinType", val)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VOLUME / CAPACITY / NET WEIGHT */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="beauty-volume"
            name="volumeSize"
            label="Volume / Net Weight"
            value={data.volumeSize}
            customValue={data.customVolumeSize}
            onCustomChange={(val: string) => updateField("customVolumeSize", val)}
            options={[
              "100ml / 3.4 fl oz (Standard Perfume/Lotion)",
              "50ml / 1.7 fl oz",
              "200ml / 250ml",
              "400ml / 500ml Family Size",
              "30ml (Standard Serum/Foundation)",
              "Pocket Spray / Travel Size (10ml - 20ml)",
              "Full Set / Multi-Piece Kit",
            ]}
            placeholder="Select Volume / Weight"
            allowOther
            onChange={(val: string) => updateField("volumeSize", val)}
          />
        </div>

        {/* KEY INGREDIENTS / SPECIALTY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="beauty-specialty"
            name="specialtyIngredient"
            label="Active Ingredients & Certification"
            value={data.specialtyIngredient}
            customValue={data.customSpecialtyIngredient}
            onCustomChange={(val: string) =>
              updateField("customSpecialtyIngredient", val)
            }
            options={INGREDIENTS_SPECIALTY}
            placeholder="Select Key Features"
            allowOther
            onChange={(val: string) =>
              updateField("specialtyIngredient", val)
            }
          />
        </div>

        {/* COUNTRY OF ORIGIN / IMPORT */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="beauty-origin"
            name="countryOfOrigin"
            label="Origin / Import Country"
            value={data.countryOfOrigin}
            customValue={data.customCountryOfOrigin}
            onCustomChange={(val: string) =>
              updateField("customCountryOfOrigin", val)
            }
            options={[
              "UAE / Dubai Original",
              "France / Paris",
              "USA",
              "UK / Europe",
              "South Korea (K-Beauty)",
              "Nigeria (Locally Made / NAFDAC Approved)",
            ]}
            placeholder="Select Country of Origin"
            allowOther
            onChange={(val: string) => updateField("countryOfOrigin", val)}
          />
        </div>

        {/* CONDITION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="beauty-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            customValue={data.customCondition}
            onCustomChange={(val: string) =>
              updateField("customCondition", val)
            }
            options={[
              "Brand New (Factory Sealed / In Box)",
              "Brand New (Unsealed Tester Bottle)",
              "Original 100% Guaranteed",
            ]}
            placeholder="Select Condition"
            allowOther
            onChange={(val: string) => updateField("condition", val)}
          />
        </div>

        {/* AVAILABILITY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="beauty-availability"
            name="availability"
            label="Availability"
            value={data.availability}
            customValue={data.customAvailability}
            onCustomChange={(val: string) =>
              updateField("customAvailability", val)
            }
            options={[
              "In Stock / Same-day Dispatch",
              "Wholesale / Bulk Available",
              "Pre-Order",
            ]}
            placeholder="Select Availability"
            allowOther
            onChange={(val: string) => updateField("availability", val)}
          />
        </div>
      </div>

      <div className="mt-4">
        <FashionFeatures data={data} updateField={updateField} />
      </div>
    </section>
  );
}
