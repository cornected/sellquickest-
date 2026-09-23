"use client";

import { useState } from "react";

import { StyledSelect } from "../StyledSelect";

import { FashionBrandSelect } from "./FashionBrandSelect";

import { WomensGeneralFields } from "./Womens/WomensGeneralFields";

import { DressFields } from "./Womens/DressFields";
import { GownFields } from "./Womens/GownFields";
import { SkirtFields } from "./Womens/SkirtFields";
import { BlouseFields } from "./Womens/BlouseFields";
import { TopFields } from "./Womens/TopFields";
import { JumpsuitFields } from "./Womens/JumpsuitFields";
import { WomenJeansFields } from "./Womens/WomenJeansFields";
import { WomenTrousersFields } from "./Womens/WomenTrousersFields";
import { WomenJacketFields } from "./Womens/WomenJacketFields";
import { AbayaFields } from "./Womens/AbayaFields";
import { KaftanFields } from "./Womens/KaftanFields";
import { NativeWearFields } from "./Womens/NativeWearFields";
import { CorporateWearFields } from "./Womens/CorporateWearFields";
import { WeddingWearFields } from "./Womens/WeddingWearFields";
import { LingerieFields } from "./Womens/LingerieFields";
import { FashionFeatures } from "./FashionFeatures";

type WomensFashionFieldsProps = {
  onChange: (data: object) => void;
};

export function WomensFashionFields({ onChange }: WomensFashionFieldsProps) {
  const [data, setData] = useState({
    // MAIN

    clothingType: "",
    customClothingType: "",

    // GENERAL

    brand: "",
    customBrand: "",

    size: "",
    customSize: "",

    color: "",
    customColor: "",

    fabric: "",
    customFabric: "",

    condition: "",

    availability: "",
    customAvailability: "",

    // DRESS

    dressType: "",
    customDressType: "",

    dressLength: "",
    customDressLength: "",

    dressSleeve: "",
    customDressSleeve: "",

    dressNeckline: "",
    customDressNeckline: "",

    dressFit: "",
    customDressFit: "",

    dressSilhouette: "",
    customDressSilhouette: "",

    dressOccasion: "",
    customDressOccasion: "",

    // GOWN

    gownType: "",
    customGownType: "",

    gownLength: "",
    customGownLength: "",

    gownTrain: "",
    customGownTrain: "",

    gownSleeve: "",
    customGownSleeve: "",

    gownOccasion: "",
    customGownOccasion: "",

    gownNeckline: "",
    customGownNeckline: "",

    gownFit: "",
    customGownFit: "",

    gownEmbroidery: "",

    // SKIRT

    skirtType: "",
    customSkirtType: "",

    skirtLength: "",
    customSkirtLength: "",

    skirtFit: "",
    customSkirtFit: "",

    skirtWaist: "",
    customSkirtWaist: "",

    skirtPattern: "",
    customSkirtPattern: "",

    skirtStyle: "",
    customSkirtStyle: "",

    skirtOccasion: "",
    customSkirtOccasion: "",

    // BLOUSE

    blouseStyle: "",
    customBlouseStyle: "",

    blouseSleeve: "",
    customBlouseSleeve: "",

    blouseNeckline: "",
    customBlouseNeckline: "",

    blouseFit: "",
    customBlouseFit: "",

    blouseLength: "",
    customBlouseLength: "",

    blousePattern: "",
    customBlousePattern: "",

    blouseOccasion: "",
    customBlouseOccasion: "",

    // TOP

    topStyle: "",
    customTopStyle: "",

    topSleeve: "",
    customTopSleeve: "",

    topNeckline: "",
    customTopNeckline: "",

    topFit: "",
    customTopFit: "",

    topLength: "",
    customTopLength: "",

    topPattern: "",
    customTopPattern: "",

    topOccasion: "",
    customTopOccasion: "",

    // JUMPSUIT

    jumpsuitStyle: "",
    customJumpsuitStyle: "",

    jumpsuitLength: "",
    customJumpsuitLength: "",

    jumpsuitSleeve: "",
    customJumpsuitSleeve: "",

    jumpsuitNeckline: "",
    customJumpsuitNeckline: "",

    jumpsuitFit: "",
    customJumpsuitFit: "",

    jumpsuitPattern: "",
    customJumpsuitPattern: "",

    jumpsuitOccasion: "",
    customJumpsuitOccasion: "",

    // JEANS

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

    // TROUSERS

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

    // JACKET

    jacketType: "",
    customJacketType: "",

    jacketStyle: "",
    customJacketStyle: "",

    jacketClosure: "",
    customJacketClosure: "",

    jacketFit: "",
    customJacketFit: "",

    jacketLength: "",
    customJacketLength: "",

    jacketMaterial: "",
    customJacketMaterial: "",

    jacketOccasion: "",
    customJacketOccasion: "",

    // ABAYA

    abayaStyle: "",
    customAbayaStyle: "",

    abayaLength: "",
    customAbayaLength: "",

    abayaSleeve: "",
    customAbayaSleeve: "",

    abayaFabric: "",
    customAbayaFabric: "",

    abayaEmbroidery: "",

    abayaHijab: "",

    abayaFit: "",
    customAbayaFit: "",

    abayaOccasion: "",
    customAbayaOccasion: "",

    // KAFTAN

    kaftanStyle: "",
    customKaftanStyle: "",

    kaftanLength: "",
    customKaftanLength: "",

    kaftanSleeve: "",
    customKaftanSleeve: "",

    kaftanFabric: "",
    customKaftanFabric: "",

    kaftanEmbroidery: "",

    kaftanFit: "",
    customKaftanFit: "",

    kaftanOccasion: "",
    customKaftanOccasion: "",

    // Native Wear

    nativeType: "",
    customNativeType: "",

    nativeFabric: "",
    customNativeFabric: "",

    nativeStyle: "",
    customNativeStyle: "",

    nativeEmbroidery: "",

    nativeHeadTie: "",

    nativeFit: "",
    customNativeFit: "",

    nativeOccasion: "",
    customNativeOccasion: "",

    // Corporate Wear

    corporateType: "",
    customCorporateType: "",

    corporateSet: "",
    customCorporateSet: "",

    corporateSleeve: "",
    customCorporateSleeve: "",

    corporateFabric: "",
    customCorporateFabric: "",

    corporateFit: "",
    customCorporateFit: "",

    corporateStyle: "",
    customCorporateStyle: "",

    corporateOccasion: "",
    customCorporateOccasion: "",

    // Wedding Wear

    weddingType: "",
    customWeddingType: "",

    weddingStyle: "",
    customWeddingStyle: "",

    weddingLength: "",
    customWeddingLength: "",

    weddingSleeve: "",
    customWeddingSleeve: "",

    weddingFabric: "",
    customWeddingFabric: "",

    weddingTrain: "",

    weddingVeil: "",

    weddingEmbroidery: "",

    weddingOccasion: "",
    customWeddingOccasion: "",

    // Lingerie

    lingerieType: "",
    customLingerieType: "",

    lingerieStyle: "",
    customLingerieStyle: "",

    lingerieMaterial: "",
    customLingerieMaterial: "",

    lingerieSize: "",
    customLingerieSize: "",

    lingerieColor: "",
    customLingerieColor: "",

    lingerieCoverage: "",

    lingerieOccasion: "",
    customLingerieOccasion: "",

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

  const resetDynamicFields = () => ({
    dressType: "",
    customDressType: "",

    gownType: "",
    customGownType: "",

    skirtType: "",
    customSkirtType: "",

    blouseStyle: "",
    customBlouseStyle: "",

    topStyle: "",
    customTopStyle: "",

    jumpsuitStyle: "",
    customJumpsuitStyle: "",

    jeansType: "",
    customJeansType: "",

    trouserType: "",
    customTrouserType: "",

    jacketType: "",
    customJacketType: "",

    abayaStyle: "",
    customAbayaStyle: "",

    kaftanStyle: "",
    customKaftanStyle: "",
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
        <span className="fs-5">👗</span>
        <h5 className="h6 fw-bold mb-0 text-dark">
          Women's Fashion Details
        </h5>
      </div>
      {/* CLOTHING TYPE */}
      <div className="mb-4">
        <StyledSelect
          id="women-clothing-type"
          name="clothingType"
          label="Clothing Type"
          value={data.clothingType}
          customValue={data.customClothingType}
          onCustomChange={(value) => updateField("customClothingType", value)}
          options={[
            "Dress",

            "Gown",

            "Skirt",

            "Blouse",

            "Top",

            "Jumpsuit",

            "Jeans",

            "Trousers",

            "Jacket",

            "Abaya",

            "Kaftan",

            "Native Wear",

            "Corporate Wear",

            "Wedding Wear",

            "Lingerie",
          ]}
          placeholder="Select Clothing Type"
          allowOther
          onChange={(value) => {
            const updated = {
              ...data,

              clothingType: value,

              ...resetDynamicFields(),
            };

            setData(updated);

            onChange(updated);
          }}
        />
      </div>
      {/* DYNAMIC FIELDS */}
      {data.clothingType === "Dress" && (
        <DressFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Gown" && (
        <GownFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Skirt" && (
        <SkirtFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Blouse" && (
        <BlouseFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Top" && (
        <TopFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Jumpsuit" && (
        <JumpsuitFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Jeans" && (
        <WomenJeansFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Trousers" && (
        <WomenTrousersFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Jacket" && (
        <WomenJacketFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Abaya" && (
        <AbayaFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Kaftan" && (
        <KaftanFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Native Wear" && (
        <NativeWearFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Corporate Wear" && (
        <CorporateWearFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Wedding Wear" && (
        <WeddingWearFields data={data} updateField={updateField} />
      )}
      {data.clothingType === "Lingerie" && (
        <LingerieFields data={data} updateField={updateField} />
      )}
      {/* GENERAL DETAILS */}
      <div className="mt-4">
        <WomensGeneralFields data={data} updateField={updateField} />
      </div>

      {/* GENERALFEATURES */}
      <FashionFeatures data={data} updateField={updateField} />
    </section>
  );
}
