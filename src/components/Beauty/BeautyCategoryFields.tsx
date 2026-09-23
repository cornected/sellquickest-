"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { BeautyBrandSelect } from "./BeautyBrandSelect";

type BeautyCategoryFieldsProps = {
  onChange: (data: object) => void;
  subCategoryTitle?: string;
};

const BEAUTY_BRANDS = [
  "Fenty Beauty",
  "L'Oréal Paris",
  "The Ordinary",
  "CeraVe",
  "La Roche-Posay",
  "Dior",
  "Chanel",
  "Tom Ford",
  "Creed",
  "Lattafa (Oud & Arabian)",
  "Maison Francis Kurkdjian",
  "Yves Saint Laurent",
  "MAC Cosmetics",
  "Huda Beauty",
  "Maybelline",
  "Nivea",
  "Neutrogena",
  "Olay",
  "Palmer's Cocoa Butter",
  "Kojie San",
  "Aramis",
  "Zara",
];

const TARGET_GENDERS = ["Unisex", "Women", "Men", "Kids / Baby"];

const BEAUTY_FEATURES = [
  "100% Original Guaranteed",
  "Long-Lasting (Up to 24+ Hours)",
  "Dermatologically Tested",
  "Organic / Natural Ingredients",
  "Alcohol-Free / Halal Formula",
  "Sealed In Original Factory Packaging",
  "Includes Free Atomizer / Samples",
  "Cruelty-Free / Vegan",
];

export function BeautyCategoryFields({
  onChange,
  subCategoryTitle = "Beauty & Personal Care",
}: BeautyCategoryFieldsProps) {
  const [data, setData] = useState({
    brand: "",
    customBrand: "",
    productName: "",
    targetGender: "Unisex",
    formulationOrType: "Eau De Parfum (EDP) / Serum",
    skinOrHairType: "All Skin / Hair Types",
    volumeSize: "100 ml",
    condition: "Brand New Sealed",
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
      <h5 className="h6 fw-bold mb-3 text-dark">💄 {subCategoryTitle} Specifications</h5>

      {/* BRAND & PRODUCT NAME */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <BeautyBrandSelect
            id="beauty-brand"
            category={subCategoryTitle}
            label="Brand / House"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(val) => updateField("customBrand", val)}
            onChange={(val) => updateField("brand", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Product Name / Line
          </label>
          <input
            value={data.productName}
            onChange={(e) => updateField("productName", e.target.value)}
            placeholder="e.g. Khamrah EDP, Hyaluronic Acid 2%, Sauvage Elixir, Pro Filt'r"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* GENDER & FORMULATION */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="beauty-gender"
            name="targetGender"
            label="Gender / Target"
            value={data.targetGender}
            options={TARGET_GENDERS}
            placeholder="Select Target"
            onChange={(val) => updateField("targetGender", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="beauty-form"
            name="formulationOrType"
            label="Formulation / Concentration"
            value={data.formulationOrType}
            options={[
              "Eau De Parfum (EDP - High Concentration)",
              "Pure Perfume Oil / Attar (Alcohol-Free)",
              "Eau De Toilette (EDT)",
              "Lotion / Cream Moisturizer",
              "Serum / Treatment Dropper",
              "Powder / Compact Makeup",
              "Raw 100% Virgin Hair Extension",
              "Beauty Electronic Tool / Clipper",
            ]}
            placeholder="Select Formulation"
            onChange={(val) => updateField("formulationOrType", val)}
          />
        </div>
      </div>

      {/* VOLUME & CONDITION */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Volume / Net Weight / Size
          </label>
          <input
            value={data.volumeSize}
            onChange={(e) => updateField("volumeSize", e.target.value)}
            placeholder="e.g. 100 ml, 250 ml, 50g, 30 inches (Wig)"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="beauty-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            options={[
              "Brand New Sealed",
              "New / Unused (Open Box)",
              "Lightly Tested / Display Unit",
            ]}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Product Quality & Authenticity Guarantee
        </label>
        <div className="d-flex flex-wrap gap-2">
          {BEAUTY_FEATURES.map((feat) => {
            const isSelected = data.features.includes(feat);
            return (
              <button
                key={feat}
                type="button"
                onClick={() => toggleFeature(feat)}
                className={`btn btn-sm ${
                  isSelected ? "btn-dark text-white fw-semibold" : "btn-light border text-secondary"
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
