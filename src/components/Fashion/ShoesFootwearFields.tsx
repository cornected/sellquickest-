"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { FashionBrandSelect } from "./FashionBrandSelect";
import { FashionFeatures } from "./FashionFeatures";
import { FootwearGeneralFields } from "./Shoes/FootwearGeneralFields";
import { SneakersFields } from "./Shoes/SneakersFields";
import { FormalShoesFields } from "./Shoes/FormalShoesFields";
import { HeelsFields } from "./Shoes/HeelsFields";
import { SandalsSlidesFields } from "./Shoes/SandalsSlidesFields";
import { BootsFields } from "./Shoes/BootsFields";
import { NativeFootwearFields } from "./Shoes/NativeFootwearFields";
import { FlatsFields } from "./Shoes/FlatsFields";
import { SportsShoesFields } from "./Shoes/SportsShoesFields";

type ShoesFootwearFieldsProps = {
  onChange: (data: object) => void;
};

export function ShoesFootwearFields({ onChange }: ShoesFootwearFieldsProps) {
  const [data, setData] = useState({
    // GENDER / DEPARTMENT
    gender: "",

    // FOOTWEAR CATEGORY
    footwearType: "",
    customFootwearType: "",

    // GENERAL SPECIFICATIONS
    size: "",
    customSize: "",
    color: "",
    customColor: "",
    upperMaterial: "",
    customUpperMaterial: "",
    outsoleMaterial: "",
    customOutsoleMaterial: "",
    fastening: "",
    customFastening: "",
    condition: "",
    customCondition: "",
    packaging: "",
    availability: "",
    customAvailability: "",

    // BRAND
    brand: "",
    customBrand: "",

    // SNEAKERS
    sneakerStyle: "",
    customSneakerStyle: "",
    sneakerActivity: "",
    customSneakerActivity: "",
    sneakerCushioning: "",
    customSneakerCushioning: "",
    sneakerEdition: "",

    // FORMAL SHOES
    formalShoeStyle: "",
    customFormalShoeStyle: "",
    toeShape: "",
    customToeShape: "",
    leatherFinish: "",
    customLeatherFinish: "",
    soleConstruction: "",

    // HEELS
    heelStyle: "",
    customHeelStyle: "",
    heelHeight: "",
    customHeelHeight: "",
    heelToeType: "",
    customHeelToeType: "",
    heelEmbellishment: "",
    customHeelEmbellishment: "",

    // SANDALS & SLIDES
    sandalStyle: "",
    customSandalStyle: "",
    sandalStrap: "",
    customSandalStrap: "",
    sandalFootbed: "",
    sandalWaterproof: "",

    // BOOTS
    bootStyle: "",
    customBootStyle: "",
    bootShaft: "",
    customBootShaft: "",
    bootSoleTread: "",
    bootProtection: "",

    // NATIVE & TRADITIONAL FOOTWEAR
    nativeShoeStyle: "",
    customNativeShoeStyle: "",
    nativeShoeDecor: "",
    customNativeShoeDecor: "",
    nativeShoeOccasion: "",
    customNativeShoeOccasion: "",
    nativeShoeCraft: "",

    // FLATS
    flatStyle: "",
    customFlatStyle: "",
    flatInsole: "",
    flatToeType: "",
    customFlatToeType: "",
    flatOccasion: "",
    customFlatOccasion: "",

    // SPORTS SHOES
    sportType: "",
    customSportType: "",
    sportStudType: "",
    customSportStudType: "",
    sportCollar: "",
    sportTier: "",
    customSportTier: "",

    // FEATURES
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

  const getFootwearTypeOptions = () => {
    if (data.gender === "Men's") {
      return [
        "Sneakers & Trainers",
        "Formal & Corporate Shoes",
        "Sandals, Slides & Slippers",
        "Traditional & Native Palm Slippers",
        "Boots & Chelsea Boots",
        "Sports Shoes & Football Cleats",
      ];
    }
    if (data.gender === "Women's") {
      return [
        "Heels & Pumps",
        "Sneakers & Trainers",
        "Flats & Ballerinas",
        "Sandals, Slides & Slippers",
        "Boots & Ankle Boots",
        "Traditional & Ceremonial Shoes",
        "Sports Shoes & Trainers",
      ];
    }
    if (data.gender === "Kids / Children") {
      return [
        "Kids Sneakers",
        "School Shoes & Formal Shoes",
        "Kids Sandals & Crocs",
        "Kids Boots & Rainboots",
        "Kids Slippers & Slides",
        "Sports Shoes & Cleats",
      ];
    }
    // Unisex
    return [
      "Sneakers & Trainers",
      "Sandals, Slides & Slippers",
      "Boots & Work Boots",
      "Traditional & Native Slippers",
      "Sports Shoes & Football Cleats",
    ];
  };

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="fs-5">👞</span>
        <h5 className="h6 fw-bold mb-0 text-dark">Shoes & Footwear Details</h5>
      </div>

      {/* 1. GENDER / TARGET AUDIENCE & FOOTWEAR TYPE */}
      <div className="row g-3 mb-4">
        {/* TARGET GENDER / AUDIENCE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="footwear-gender"
            name="gender"
            label="Department / Gender"
            value={data.gender}
            options={["Men's", "Women's", "Kids / Children", "Unisex"]}
            placeholder="Select Department"
            onChange={(val: string) => {
              const updated = {
                ...data,
                gender: val,
                footwearType: "",
                customFootwearType: "",
              };
              setData(updated);
              onChange(updated);
            }}
          />
        </div>

        {/* FOOTWEAR CATEGORY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="footwear-type"
            name="footwearType"
            label="Footwear Type"
            value={data.footwearType}
            customValue={data.customFootwearType}
            onCustomChange={(val: string) => updateField("customFootwearType", val)}
            options={getFootwearTypeOptions()}
            placeholder="Select Footwear Type"
            allowOther
            onChange={(val: string) => updateField("footwearType", val)}
          />
        </div>
      </div>

      {/* 2. SPECIFIC SUB-CATEGORY ACCORDION / DYNAMIC FORM */}
      {/* SNEAKERS */}
      {(data.footwearType === "Sneakers & Trainers" ||
        data.footwearType === "Kids Sneakers") && (
        <SneakersFields data={data} updateField={updateField} />
      )}

      {/* FORMAL SHOES */}
      {(data.footwearType === "Formal & Corporate Shoes" ||
        data.footwearType === "School Shoes & Formal Shoes") && (
        <FormalShoesFields data={data} updateField={updateField} />
      )}

      {/* HEELS */}
      {data.footwearType === "Heels & Pumps" && (
        <HeelsFields data={data} updateField={updateField} />
      )}

      {/* SANDALS & SLIDES */}
      {(data.footwearType === "Sandals, Slides & Slippers" ||
        data.footwearType === "Kids Sandals & Crocs" ||
        data.footwearType === "Kids Slippers & Slides") && (
        <SandalsSlidesFields data={data} updateField={updateField} />
      )}

      {/* BOOTS */}
      {(data.footwearType === "Boots & Chelsea Boots" ||
        data.footwearType === "Boots & Ankle Boots" ||
        data.footwearType === "Boots & Work Boots" ||
        data.footwearType === "Kids Boots & Rainboots") && (
        <BootsFields data={data} updateField={updateField} />
      )}

      {/* NATIVE / TRADITIONAL SHOES */}
      {(data.footwearType === "Traditional & Native Palm Slippers" ||
        data.footwearType === "Traditional & Ceremonial Shoes" ||
        data.footwearType === "Traditional & Native Slippers") && (
        <NativeFootwearFields data={data} updateField={updateField} />
      )}

      {/* FLATS */}
      {data.footwearType === "Flats & Ballerinas" && (
        <FlatsFields data={data} updateField={updateField} />
      )}

      {/* SPORTS SHOES */}
      {(data.footwearType === "Sports Shoes & Football Cleats" ||
        data.footwearType === "Sports Shoes & Cleats" ||
        data.footwearType === "Sports Shoes & Trainers") && (
        <SportsShoesFields data={data} updateField={updateField} />
      )}

      {/* 3. GENERAL FOOTWEAR SPECIFICATIONS (Size, Materials, Condition, Packaging) */}
      <FootwearGeneralFields data={data} updateField={updateField} />

      {/* 4. BRAND SELECTION (Nike, Adidas, Clarks, Gucci, etc.) */}
      <div className="mt-4">
        <FashionBrandSelect
          category="Shoes & Footwear"
          value={data.brand}
          onChange={(val) => updateField("brand", val)}
          customValue={data.customBrand}
          onCustomChange={(val) => updateField("customBrand", val)}
        />
      </div>

      {/* 5. FASHION & QUALITY FEATURES */}
      <div className="mt-4">
        <FashionFeatures data={data} updateField={updateField} />
      </div>
    </section>
  );
}
