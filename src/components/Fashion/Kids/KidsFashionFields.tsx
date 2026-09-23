"use client";

import { useState } from "react";

import { StyledSelect } from "../../StyledSelect";

import { FashionBrandSelect } from "../FashionBrandSelect";

import { FashionFeatures } from "../FashionFeatures";

import { KidsGeneralFields } from "./KidsGeneralFields";

// BOYS

import { BoysTShirtFields } from "./Boys/BoysTShirtFields";
import { BoysJeansFields } from "./Boys/BoysJeansFields";
import { BoysShortsFields } from "./Boys/BoysShortsFields";
import { BoysTrousersFields } from "./Boys/BoysTrousersFields";
import { BoysHoodieFields } from "./Boys/BoysHoodieFields";
import { BoysJacketFields } from "./Boys/BoysJacketFields";
import { BoysNativeWearFields } from "./Boys/BoysNativeWearFields";
import { BoysSuitFields } from "./Boys/BoysSuitFields";
import { BoysShirtFields } from "./Boys/BoysShirtFields";

// GIRLS

import { GirlsDressFields } from "./Girls/GirlsDressFields";
import { GirlsGownFields } from "./Girls/GirlsGownFields";
import { GirlsSkirtFields } from "./Girls/GirlsSkirtFields";
import { GirlsBlouseFields } from "./Girls/GirlsBlouseFields";
import { GirlsJumpsuitFields } from "./Girls/GirlsJumpsuitFields";
import { GirlsJeansFields } from "./Girls/GirlsJeansFields";
import { GirlsNativeWearFields } from "./Girls/GirlsNativeWearFields";
import { GirlsPartyWearFields } from "./Girls/GirlsPartyWearFields";

// UNISEX

import { UnisexTShirtFields } from "./Unisex/UnisexTShirtFields";
import { UnisexJeansFields } from "./Unisex/UnisexJeansFields";
import { UnisexShortsFields } from "./Unisex/UnisexShortsFields";
import { UnisexNativeWearFields } from "./Unisex/UnisexNativeWearFields";
import { UnisexHoodieFields } from "./Unisex/UnisexHoodieFields";
import { UnisexJacketFields } from "./Unisex/UnisexJacketFields";
import { UnisexTrousersFields } from "./Unisex/UnisexTrousersFields";
import { UnisexPajamasFields } from "./Unisex/UnisexPajamasFields";
import { UnisexTracksuitFields } from "./Unisex/UnisexTracksuitFields";

type KidsFashionFieldsProps = {
  onChange: (data: object) => void;
};

export function KidsFashionFields({ onChange }: KidsFashionFieldsProps) {
  const [data, setData] = useState({
    // MAIN

    gender: "",

    clothingType: "",

    customClothingType: "",

    // GENERAL

    brand: "",

    customBrand: "",

    ageGroup: "",

    customAgeGroup: "",

    size: "",

    customSize: "",

    color: "",

    customColor: "",

    fabric: "",

    customFabric: "",

    condition: "",
    customCondition: "",

    availability: "",

    customAvailability: "",

    // Boys Shirt

    shirtType: "",
    customShirtType: "",

    shirtSleeve: "",
    customShirtSleeve: "",

    shirtCollar: "",
    customShirtCollar: "",

    shirtFit: "",
    customShirtFit: "",

    shirtDesign: "",
    customShirtDesign: "",

    shirtFabric: "",
    customShirtFabric: "",

    shirtOccasion: "",
    customShirtOccasion: "",

    // Boys T-Shirt

    tshirtType: "",
    customTshirtType: "",

    tshirtNeck: "",
    customTshirtNeck: "",

    tshirtSleeve: "",
    customTshirtSleeve: "",

    tshirtFit: "",
    customTshirtFit: "",

    tshirtPrint: "",
    customTshirtPrint: "",

    tshirtFabric: "",
    customTshirtFabric: "",

    tshirtOccasion: "",
    customTshirtOccasion: "",

    // Boys Jeans

    jeansType: "",
    customJeansType: "",

    jeansFit: "",
    customJeansFit: "",

    jeansWaist: "",
    customJeansWaist: "",

    jeansLength: "",
    customJeansLength: "",

    jeansWash: "",
    customJeansWash: "",

    jeansStretch: "",

    jeansStyle: "",
    customJeansStyle: "",

    jeansOccasion: "",
    customJeansOccasion: "",

    // Boys Shorts

    shortType: "",
    customShortType: "",

    shortLength: "",
    customShortLength: "",

    shortFit: "",
    customShortFit: "",

    shortWaist: "",
    customShortWaist: "",

    shortMaterial: "",
    customShortMaterial: "",

    shortStyle: "",
    customShortStyle: "",

    shortOccasion: "",
    customShortOccasion: "",

    // Boys Trousers

    trouserType: "",
    customTrouserType: "",

    trouserFit: "",
    customTrouserFit: "",

    trouserWaist: "",
    customTrouserWaist: "",

    trouserLength: "",
    customTrouserLength: "",

    trouserMaterial: "",
    customTrouserMaterial: "",

    trouserStyle: "",
    customTrouserStyle: "",

    trouserOccasion: "",
    customTrouserOccasion: "",

    // Boys Hoodie

    hoodieType: "",
    customHoodieType: "",

    hoodieThickness: "",
    customHoodieThickness: "",

    hoodieClosure: "",
    customHoodieClosure: "",

    hoodieFit: "",
    customHoodieFit: "",

    hoodiePrint: "",
    customHoodiePrint: "",

    hoodieMaterial: "",
    customHoodieMaterial: "",

    hoodieOccasion: "",
    customHoodieOccasion: "",

    // Boys Jacket

    jacketType: "",
    customJacketType: "",

    jacketClosure: "",
    customJacketClosure: "",

    jacketMaterial: "",
    customJacketMaterial: "",

    jacketFit: "",
    customJacketFit: "",

    jacketStyle: "",
    customJacketStyle: "",

    jacketThickness: "",
    customJacketThickness: "",

    jacketOccasion: "",
    customJacketOccasion: "",

    // Boys Native Wear

    nativeType: "",
    customNativeType: "",

    nativeFabric: "",
    customNativeFabric: "",

    nativeStyle: "",
    customNativeStyle: "",

    nativeEmbroidery: "",

    nativeCap: "",

    nativeFit: "",
    customNativeFit: "",

    nativeOccasion: "",
    customNativeOccasion: "",

    // Boys Suit

    suitType: "",
    customSuitType: "",

    suitPieces: "",
    customSuitPieces: "",

    suitJacketStyle: "",
    customSuitJacketStyle: "",

    suitShirtIncluded: "",

    suitFabric: "",
    customSuitFabric: "",

    suitFit: "",
    customSuitFit: "",

    suitOccasion: "",
    customSuitOccasion: "",

    // Girl dress

    dressType: "",
    customDressType: "",

    dressLength: "",
    customDressLength: "",

    dressSleeve: "",
    customDressSleeve: "",

    dressFabric: "",
    customDressFabric: "",

    dressDesign: "",
    customDressDesign: "",

    dressOccasion: "",
    customDressOccasion: "",

    // Girl Gown

    gownType: "",
    customGownType: "",

    gownLength: "",
    customGownLength: "",

    gownSleeve: "",
    customGownSleeve: "",

    gownFabric: "",
    customGownFabric: "",

    gownEmbellishment: "",
    customGownEmbellishment: "",

    gownOccasion: "",
    customGownOccasion: "",

    //Girls Skirts

    skirtType: "",
    customSkirtType: "",

    skirtLength: "",
    customSkirtLength: "",

    skirtWaist: "",
    customSkirtWaist: "",

    skirtMaterial: "",
    customSkirtMaterial: "",

    skirtDesign: "",
    customSkirtDesign: "",

    skirtOccasion: "",
    customSkirtOccasion: "",

    // =========================
    // GIRLS BLOUSE
    // =========================

    blouseType: "",
    customBlouseType: "",

    blouseSleeve: "",
    customBlouseSleeve: "",

    blouseFit: "",
    customBlouseFit: "",

    blouseNeck: "",
    customBlouseNeck: "",

    blouseFabric: "",
    customBlouseFabric: "",

    blouseDesign: "",
    customBlouseDesign: "",

    blouseOccasion: "",
    customBlouseOccasion: "",

    // =========================
    // GIRLS JUMPSUIT
    // =========================

    jumpsuitType: "",
    customJumpsuitType: "",

    jumpsuitLength: "",
    customJumpsuitLength: "",

    jumpsuitSleeve: "",
    customJumpsuitSleeve: "",

    jumpsuitNeck: "",
    customJumpsuitNeck: "",

    jumpsuitFabric: "",
    customJumpsuitFabric: "",

    jumpsuitFit: "",
    customJumpsuitFit: "",

    jumpsuitOccasion: "",
    customJumpsuitOccasion: "",

    // =========================
    // UNISEX KIDS FASHION
    // =========================

    // Unisex T-Shirt
    unisexTshirtType: "",
    customUnisexTshirtType: "",
    unisexTshirtNeck: "",
    customUnisexTshirtNeck: "",
    unisexTshirtSleeve: "",
    customUnisexTshirtSleeve: "",
    unisexTshirtFit: "",
    customUnisexTshirtFit: "",
    unisexTshirtPrint: "",
    customUnisexTshirtPrint: "",
    unisexTshirtFabric: "",
    customUnisexTshirtFabric: "",
    unisexTshirtOccasion: "",
    customUnisexTshirtOccasion: "",

    // Unisex Jeans
    unisexJeansType: "",
    customUnisexJeansType: "",
    unisexJeansFit: "",
    customUnisexJeansFit: "",
    unisexJeansWaist: "",
    customUnisexJeansWaist: "",
    unisexJeansLength: "",
    customUnisexJeansLength: "",
    unisexJeansWash: "",
    customUnisexJeansWash: "",
    unisexJeansStretch: "",
    unisexJeansOccasion: "",
    customUnisexJeansOccasion: "",

    // Unisex Shorts
    unisexShortsType: "",
    customUnisexShortsType: "",
    unisexShortsLength: "",
    customUnisexShortsLength: "",
    unisexShortsWaist: "",
    customUnisexShortsWaist: "",
    unisexShortsMaterial: "",
    customUnisexShortsMaterial: "",
    unisexShortsFit: "",
    customUnisexShortsFit: "",
    unisexShortsOccasion: "",
    customUnisexShortsOccasion: "",

    // Unisex Native Wear
    unisexNativeType: "",
    customUnisexNativeType: "",
    unisexNativeFabric: "",
    customUnisexNativeFabric: "",
    unisexNativeStyle: "",
    customUnisexNativeStyle: "",
    unisexNativeSleeve: "",
    customUnisexNativeSleeve: "",
    unisexNativeEmbroidery: "",
    customUnisexNativeEmbroidery: "",
    unisexNativeOccasion: "",
    customUnisexNativeOccasion: "",

    // Unisex Hoodie & Sweatshirt
    unisexHoodieType: "",
    customUnisexHoodieType: "",
    unisexHoodieThickness: "",
    customUnisexHoodieThickness: "",
    unisexHoodieClosure: "",
    customUnisexHoodieClosure: "",
    unisexHoodieFit: "",
    customUnisexHoodieFit: "",
    unisexHoodieMaterial: "",
    customUnisexHoodieMaterial: "",
    unisexHoodieOccasion: "",
    customUnisexHoodieOccasion: "",

    // Unisex Jacket & Coat
    unisexJacketType: "",
    customUnisexJacketType: "",
    unisexJacketClosure: "",
    customUnisexJacketClosure: "",
    unisexJacketMaterial: "",
    customUnisexJacketMaterial: "",
    unisexJacketFit: "",
    customUnisexJacketFit: "",
    unisexJacketThickness: "",
    customUnisexJacketThickness: "",
    unisexJacketOccasion: "",
    customUnisexJacketOccasion: "",

    // Unisex Trousers & Joggers
    unisexTrouserType: "",
    customUnisexTrouserType: "",
    unisexTrouserFit: "",
    customUnisexTrouserFit: "",
    unisexTrouserWaist: "",
    customUnisexTrouserWaist: "",
    unisexTrouserLength: "",
    customUnisexTrouserLength: "",
    unisexTrouserMaterial: "",
    customUnisexTrouserMaterial: "",
    unisexTrouserOccasion: "",
    customUnisexTrouserOccasion: "",

    // Unisex Pajamas & Sleepwear
    unisexPajamasType: "",
    customUnisexPajamasType: "",
    unisexPajamasSleeve: "",
    customUnisexPajamasSleeve: "",
    unisexPajamasFabric: "",
    customUnisexPajamasFabric: "",
    unisexPajamasClosure: "",
    customUnisexPajamasClosure: "",
    unisexPajamasFit: "",
    customUnisexPajamasFit: "",
    unisexPajamasPrint: "",
    customUnisexPajamasPrint: "",

    // Unisex Tracksuit & Sports Set
    unisexTracksuitType: "",
    customUnisexTracksuitType: "",
    unisexTracksuitMaterial: "",
    customUnisexTracksuitMaterial: "",
    unisexTracksuitFit: "",
    customUnisexTracksuitFit: "",
    unisexTracksuitClosure: "",
    customUnisexTracksuitClosure: "",
    unisexTracksuitCuff: "",
    customUnisexTracksuitCuff: "",
    unisexTracksuitOccasion: "",
    customUnisexTracksuitOccasion: "",

    // FEATURES

    features: [] as string[],
  });

  const updateField = (
    key: string,

    value: any,
  ) => {
    const updated = {
      ...data,

      [key]: value,
    };

    setData(updated);

    onChange(updated);
  };

  const resetClothingFields = () => ({
    clothingType: "",

    customClothingType: "",
  });

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",

        backgroundColor: "#f8fafc",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="fs-5">👶</span>
        <h5 className="h6 fw-bold mb-0 text-dark">
          Kids Fashion Details
        </h5>
      </div>

      {/* MAIN SELECTION */}

      <div className="row g-3 mb-4">
        {/* GENDER */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="kids-gender"
            name="gender"
            label="Gender"
            value={data.gender}
            options={["Boys", "Girls", "Unisex"]}
            placeholder="Select Gender"
            onChange={(value) => {
              const updated = {
                ...data,
                gender: value,
                ...resetClothingFields(),
              };

              setData(updated);
              onChange(updated);
            }}
          />
        </div>

        {/* CLOTHING TYPE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="kids-clothing-type"
            name="clothingType"
            label="Clothing Type"
            value={data.clothingType}
            customValue={data.customClothingType}
            onCustomChange={(value) => updateField("customClothingType", value)}
            options={
              data.gender === "Boys"
                ? [
                    "Shirt",
                    "T-Shirt",
                    "Jeans",
                    "Shorts",
                    "Trousers",
                    "Hoodie",
                    "Jacket",
                    "Native Wear",
                    "Suit",
                  ]
                : data.gender === "Girls"
                  ? [
                      "Dress",
                      "Gown",
                      "Skirt",
                      "Blouse",
                      "Jumpsuit",
                      "Jeans",
                      "Native Wear",
                      "Party Wear",
                    ]
                  : [
                      "T-Shirt",
                      "Jeans",
                      "Shorts",
                      "Native Wear",
                      "Hoodie & Sweatshirt",
                      "Jacket & Coat",
                      "Trousers & Joggers",
                      "Pajamas & Sleepwear",
                      "Tracksuit & Sports Set",
                    ]
            }
            placeholder="Select Clothing Type"
            allowOther
            onChange={(value) => updateField("clothingType", value)}
          />
        </div>
      </div>

      {/* DYNAMIC CLOTHING FIELDS */}

      {/* BOYS */}

      {data.gender === "Boys" && data.clothingType === "T-Shirt" && (
        <BoysTShirtFields data={data} updateField={updateField} />
      )}

      {data.gender === "Boys" && data.clothingType === "Shirt" && (
        <BoysShirtFields data={data} updateField={updateField} />
      )}

      {data.gender === "Boys" && data.clothingType === "Jeans" && (
        <BoysJeansFields data={data} updateField={updateField} />
      )}

      {data.gender === "Boys" && data.clothingType === "Shorts" && (
        <BoysShortsFields data={data} updateField={updateField} />
      )}

      {data.gender === "Boys" && data.clothingType === "Trousers" && (
        <BoysTrousersFields data={data} updateField={updateField} />
      )}

      {data.gender === "Boys" && data.clothingType === "Hoodie" && (
        <BoysHoodieFields data={data} updateField={updateField} />
      )}

      {data.gender === "Boys" && data.clothingType === "Jacket" && (
        <BoysJacketFields data={data} updateField={updateField} />
      )}

      {data.gender === "Boys" && data.clothingType === "Native Wear" && (
        <BoysNativeWearFields data={data} updateField={updateField} />
      )}

      {data.gender === "Boys" && data.clothingType === "Suit" && (
        <BoysSuitFields data={data} updateField={updateField} />
      )}

      {/* GIRLS */}

      {data.gender === "Girls" && data.clothingType === "Dress" && (
        <GirlsDressFields data={data} updateField={updateField} />
      )}

      {data.gender === "Girls" && data.clothingType === "Gown" && (
        <GirlsGownFields data={data} updateField={updateField} />
      )}

      {data.gender === "Girls" && data.clothingType === "Skirt" && (
        <GirlsSkirtFields data={data} updateField={updateField} />
      )}

      {data.gender === "Girls" && data.clothingType === "Blouse" && (
        <GirlsBlouseFields data={data} updateField={updateField} />
      )}

      {data.gender === "Girls" && data.clothingType === "Jumpsuit" && (
        <GirlsJumpsuitFields data={data} updateField={updateField} />
      )}

      {data.gender === "Girls" && data.clothingType === "Jeans" && (
        <GirlsJeansFields data={data} updateField={updateField} />
      )}

      {data.gender === "Girls" && data.clothingType === "Native Wear" && (
        <GirlsNativeWearFields data={data} updateField={updateField} />
      )}

      {data.gender === "Girls" && data.clothingType === "Party Wear" && (
        <GirlsPartyWearFields data={data} updateField={updateField} />
      )}

      {/* UNISEX */}

      {data.gender === "Unisex" && data.clothingType === "T-Shirt" && (
        <UnisexTShirtFields data={data} updateField={updateField} />
      )}

      {data.gender === "Unisex" && data.clothingType === "Jeans" && (
        <UnisexJeansFields data={data} updateField={updateField} />
      )}

      {data.gender === "Unisex" && data.clothingType === "Shorts" && (
        <UnisexShortsFields data={data} updateField={updateField} />
      )}

      {data.gender === "Unisex" && data.clothingType === "Native Wear" && (
        <UnisexNativeWearFields data={data} updateField={updateField} />
      )}

      {data.gender === "Unisex" && data.clothingType === "Hoodie & Sweatshirt" && (
        <UnisexHoodieFields data={data} updateField={updateField} />
      )}

      {data.gender === "Unisex" && data.clothingType === "Jacket & Coat" && (
        <UnisexJacketFields data={data} updateField={updateField} />
      )}

      {data.gender === "Unisex" && data.clothingType === "Trousers & Joggers" && (
        <UnisexTrousersFields data={data} updateField={updateField} />
      )}

      {data.gender === "Unisex" && data.clothingType === "Pajamas & Sleepwear" && (
        <UnisexPajamasFields data={data} updateField={updateField} />
      )}

      {data.gender === "Unisex" && data.clothingType === "Tracksuit & Sports Set" && (
        <UnisexTracksuitFields data={data} updateField={updateField} />
      )}

      {/* GENERAL DETAILS */}

      <div className="mt-4">
        <KidsGeneralFields data={data} updateField={updateField} />
      </div>

      {/* BRAND */}

      <div className="mt-4">
        <FashionBrandSelect
          category="Kids Fashion"
          value={data.brand}
          onChange={(value) => updateField("brand", value)}
          customValue={data.customBrand}
          onCustomChange={(value) => updateField("customBrand", value)}
        />
      </div>

      {/* FEATURES */}

      <div className="mt-4">
        <FashionFeatures data={data} updateField={updateField} />
      </div>
    </section>
  );
}
