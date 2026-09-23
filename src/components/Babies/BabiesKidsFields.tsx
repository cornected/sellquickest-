"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { UniversalBrandSelect } from "../Common/UniversalBrandSelect";
import { BABY_BRANDS } from "@/lib/brandCatalogs";

type BabiesKidsFieldsProps = {
  onChange: (data: object) => void;
  subCategoryTitle?: string;
};

const BABY_CARE_TYPES = [
  "Stroller / Pram (Single / Double)",
  "Car Seat & Travel Booster",
  "Baby Carrier / Sling / Wrap",
  "High Chair & Booster Dining Seat",
  "Electric / Manual Breast Pump",
  "Baby Bouncer & Rocker Swing",
  "Diaper Bag & Changing Station",
  "Baby Bath Tub & Bath Support",
  "Baby Monitor & Camera",
  "Sterilizer & Bottle Warmer",
];

const CLOTHING_TYPES = [
  "Newborn Onesies & Bodysuits (Pack)",
  "Boys Casual & Formal Outfits",
  "Girls Dresses & Party Gowns",
  "Sleepwear, Rompers & Pajamas",
  "School Uniforms & Sportswear",
  "Baby Jackets, Cardigans & Hoodies",
  "Traditional Native Outfits (Agbada / Lace)",
  "Underwear, Socks & Mittens Pack",
];

const SHOES_TYPES = [
  "Toddler First-Walker Soft Shoes",
  "Children's School Shoes (Black / Brown)",
  "Kids Sports Sneakers & Running Shoes",
  "Sandals & Slippers",
  "Party / Wedding Shoes",
  "Rain Boots & Winter Shoes",
];

const FURNITURE_TYPES = [
  "Baby Wooden Crib & Mattress",
  "Portable Travel Cot / Playpen",
  "Kids Bunk Bed & Single Bed Frame",
  "Wardrobe & Clothing Organizer",
  "Study Desk & Ergonomic Chair Set",
  "Toy Storage Chest & Bookshelf",
];

const TOYS_TYPES = [
  "Rechargeable Electric Ride-On Car / Jeep",
  "Kids Bicycle / Tricycle / Scooter",
  "Educational STEM & Learning Toys",
  "LEGO & Building Block Sets",
  "Remote Control Cars & Drones",
  "Dolls, Dollhouses & Action Figures",
  "Musical & Sound Sensory Toys",
  "Inflatable Swimming Pool & Water Toys",
];

const MATERNITY_TYPES = [
  "Maternity & Nursing Dresses",
  "Pregnancy Support Pillow",
  "Postpartum Belly Wrap & Belt",
  "Nursing Bra & Feeding Tops",
  "Stretch Mark & Body Oils",
  "Hospital Delivery Bag Set",
];

const AGE_GROUPS = [
  "Newborn (0 - 3 Months)",
  "Infant (3 - 12 Months)",
  "Toddler (1 - 3 Years)",
  "Preschool (3 - 5 Years)",
  "Kids (6 - 9 Years)",
  "Pre-Teen / Teen (10+ Years)",
  "Expecting Mother (Maternity)",
  "All Ages / Universal",
];

const GENDER_OPTIONS = [
  "Unisex (Boy & Girl)",
  "Boys",
  "Girls",
  "Mothers / Women",
];

const CONDITION_OPTIONS = [
  "Brand New in Box / Tags Attached",
  "Foreign Used (Tokunbo Like New)",
  "Nigerian Used (Gently Used Clean)",
  "Refurbished / Repaired Clean",
];

const BABY_HIGHLIGHTS = [
  "100% BPA-Free & Non-Toxic",
  "Safety Certified & ISO Standard",
  "Washable & Machine Friendly",
  "Foldable & Portable / Travel Ready",
  "Includes Safety Harness / 5-Point Belt",
  "Original Brand Genuine",
  "Rechargeable Battery & Charger Included",
  "Mattress / Accessories Included",
];

export function BabiesKidsFields({
  onChange,
  subCategoryTitle = "Babies & Kids",
}: BabiesKidsFieldsProps) {
  const isClothing = subCategoryTitle.toLowerCase().includes("cloth");
  const isShoes = subCategoryTitle.toLowerCase().includes("shoe");
  const isFurniture = subCategoryTitle.toLowerCase().includes("furnit") || subCategoryTitle.toLowerCase().includes("cot");
  const isToys = subCategoryTitle.toLowerCase().includes("toy") || subCategoryTitle.toLowerCase().includes("game");
  const isMaternity = subCategoryTitle.toLowerCase().includes("matern") || subCategoryTitle.toLowerCase().includes("nurs");

  const itemTypes = isClothing
    ? CLOTHING_TYPES
    : isShoes
    ? SHOES_TYPES
    : isFurniture
    ? FURNITURE_TYPES
    : isToys
    ? TOYS_TYPES
    : isMaternity
    ? MATERNITY_TYPES
    : BABY_CARE_TYPES;

  const itemLabel = isClothing
    ? "Clothing Type"
    : isShoes
    ? "Footwear Type"
    : isFurniture
    ? "Furniture Item"
    : isToys
    ? "Toy or Game Type"
    : isMaternity
    ? "Maternity Item"
    : "Item Type";

  const sizePlaceholder = isClothing || isShoes
    ? "e.g. Size 3-6M, Size 28 EU, Age 4-5 Years"
    : isFurniture
    ? "e.g. 120 x 60 cm, Solid Pine Wood, 3 Drawers"
    : isToys
    ? "e.g. 12V Dual Motor, Age 3-8, 500 Pieces"
    : "e.g. Single Seat, Up to 25kg, Adjustable";

  const [data, setData] = useState({
    itemType: "",
    customItemType: "",
    brand: "",
    customBrand: "",
    ageGroup: "Toddler (1 - 3 Years)",
    gender: "Unisex (Boy & Girl)",
    sizeOrSpec: "",
    condition: "Brand New in Box / Tags Attached",
    features: [] as string[],
  });

  const updateField = (key: string, value: unknown) => {
    const updated = { ...data, [key]: value };
    setData(updated);
    onChange(updated);
  };

  const toggleFeature = (feature: string) => {
    const updatedFeatures = data.features.includes(feature)
      ? data.features.filter((item) => item !== feature)
      : [...data.features, feature];
    updateField("features", updatedFeatures);
  };

  return (
    <div
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <h5 className="h6 fw-bold mb-3 text-dark">
        🍼 {subCategoryTitle} Specifications
      </h5>

      {/* ITEM TYPE & BRAND */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="baby-item-type"
            name="itemType"
            label={itemLabel}
            value={data.itemType}
            customValue={data.customItemType}
            onCustomChange={(val) => updateField("customItemType", val)}
            options={itemTypes}
            placeholder={`Select ${itemLabel}`}
            allowOther
            onChange={(val) => updateField("itemType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <UniversalBrandSelect
            id="baby-brand"
            label="Brand / Maker"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(val) => updateField("customBrand", val)}
            onChange={(val) => updateField("brand", val)}
            category={subCategoryTitle}
            placeholder="Select Brand / Maker"
            brands={BABY_BRANDS}
            allowNoBrand={true}
            allowCustomBespoke={true}
          />
        </div>
      </div>

      {/* AGE GROUP & GENDER */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="baby-age"
            name="ageGroup"
            label="Target Age Group"
            value={data.ageGroup}
            options={AGE_GROUPS}
            placeholder="Select Age Group"
            onChange={(val) => updateField("ageGroup", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="baby-gender"
            name="gender"
            label="Gender / Target"
            value={data.gender}
            options={GENDER_OPTIONS}
            placeholder="Select Gender"
            onChange={(val) => updateField("gender", val)}
          />
        </div>
      </div>

      {/* SIZE/SPEC & CONDITION */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Size / Dimensions / Capacity
          </label>
          <input
            value={data.sizeOrSpec}
            onChange={(e) => updateField("sizeOrSpec", e.target.value)}
            placeholder={sizePlaceholder}
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="baby-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            options={CONDITION_OPTIONS}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
      </div>

      {/* HIGHLIGHTS */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Item Features & Highlights
        </label>
        <div className="d-flex flex-wrap gap-2">
          {BABY_HIGHLIGHTS.map((feat) => {
            const isSelected = data.features.includes(feat);
            return (
              <button
                key={feat}
                type="button"
                onClick={() => toggleFeature(feat)}
                className={`btn btn-sm ${
                  isSelected
                    ? "btn-dark text-white fw-semibold"
                    : "btn-light border text-secondary location-option"
                }`}
                style={{ borderRadius: "8px", fontSize: "12px", padding: "6px 12px" }}
              >
                {isSelected ? "✓ " : "+ "}
                {feat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
