"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { PetBrandSelect } from "./PetBrandSelect";

type PetsFieldsProps = {
  onChange: (data: object) => void;
  subCategoryTitle?: string;
};

const PET_TYPES = [
  "Puppy / Dog (German Shepherd)",
  "Puppy / Dog (Boerboel)",
  "Puppy / Dog (Rottweiler)",
  "Puppy / Dog (American Pitbull / Bully)",
  "Puppy / Dog (Caucasian Shepherd)",
  "Puppy / Dog (Golden Retriever / Labrador)",
  "Puppy / Dog (French Bulldog / Pug)",
  "Cat / Kitten (Persian / British Shorthair)",
  "Bird / Parrot (African Grey, Lovebird, Pigeon)",
  "Pet Housing - Dog Kennel / Cage / Aquarium",
  "Pet Food, Dog Supplements & Accessories",
];

const PET_BREEDS = [
  "Purebred Pedigree (Certified)",
  "Mixed Breed",
  "Crossbreed (Heavy Bone)",
  "Imported Bloodline (South Africa / Europe)",
];

const PET_FEATURES = [
  "Fully Vaccinated (DHPPi Vaccination Card Available)",
  "Dewormed Up to Date",
  "Veterinary Doctor Health Certified",
  "Both Sire & Dam (Parents) Available for Physical Inspection",
  "Trained / Socialized",
  "Microchipped / Pedigree Papers Available",
  "Heavy Bone Structure & Guard Temperament",
  "Nationwide Delivery / Pet Transit Available",
];

export function PetsFields({
  onChange,
  subCategoryTitle = "Pets & Animal Care",
}: PetsFieldsProps) {
  const [data, setData] = useState({
    petType: "",
    customPetType: "",
    brand: "",
    customBrand: "",
    breedQuality: "Purebred Pedigree (Certified)",
    age: "8 Weeks (Puppy)",
    gender: "Male & Female Available",
    color: "",
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
      <h5 className="h6 fw-bold mb-3 text-dark">🐕 {subCategoryTitle} Specifications</h5>

      {/* PET TYPE & BREED */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="pet-type"
            name="petType"
            label="Pet Breed / Category"
            value={data.petType}
            customValue={data.customPetType}
            onCustomChange={(val) => updateField("customPetType", val)}
            options={PET_TYPES}
            placeholder="Select Pet Breed"
            allowOther
            onChange={(val) => updateField("petType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <PetBrandSelect
            id="pet-brand"
            category={subCategoryTitle}
            label="Breeder / Pet Food Brand"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(val) => updateField("customBrand", val)}
            onChange={(val) => updateField("brand", val)}
          />
        </div>
      </div>

      {/* BLOODLINE & GENDER */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="pet-breed"
            name="breedQuality"
            label="Bloodline / Purity"
            value={data.breedQuality}
            options={PET_BREEDS}
            placeholder="Select Bloodline"
            onChange={(val) => updateField("breedQuality", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="pet-gender"
            name="gender"
            label="Sex / Gender"
            value={data.gender}
            options={[
              "Male & Female Available",
              "Male Only",
              "Female Only",
              "Mated Pair",
            ]}
            placeholder="Select Sex"
            onChange={(val) => updateField("gender", val)}
          />
        </div>
      </div>

      {/* AGE & COLOR */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Age (Weeks / Months / Years)
          </label>
          <input
            value={data.age}
            onChange={(e) => updateField("age", e.target.value)}
            placeholder="e.g. 7 Weeks, 3 Months, 1 Year"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Coat Color & Markings
          </label>
          <input
            value={data.color}
            onChange={(e) => updateField("color", e.target.value)}
            placeholder="e.g. Black & Tan, Fawn Black Mask, Brindle, White"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Health, Medical & Breeding Records
        </label>
        <div className="d-flex flex-wrap gap-2">
          {PET_FEATURES.map((feat) => {
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
