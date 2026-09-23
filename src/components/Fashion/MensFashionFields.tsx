"use client";

import { useState } from "react";

import { StyledSelect } from "../StyledSelect";

import { GeneralMensFields } from "./Mens/GeneralMensFields";

import { ShirtFields } from "./Mens/ShirtFields";
import { SuitFields } from "./Mens/SuitFields";
import { AgbadaFields } from "./Mens/AgbadaFields";
import { SenatorFields } from "./Mens/SenatorFields";
import { TShirtFields } from "./Mens/TShirtFields";
import { JeansFields } from "./Mens/JeansFields";
import { HoodieFields } from "./Mens/HoodieFields";
import { JacketFields } from "./Mens/JacketFields";
import { TrousersFields } from "./Mens/TrousersFields";
import { ShortsFields } from "./Mens/ShortsFields";
import { FashionFeatures } from "./FashionFeatures";

type MensFashionFieldsProps = {
  onChange: (data: object) => void;
};

export function MensFashionFields({ onChange }: MensFashionFieldsProps) {
  const [data, setData] = useState({
    // Features
    features: [] as string[],

    // BASIC
    clothingType: "",
    customClothingType: "",

    // GENERAL
    brand: "",
    customBrand: "",
    size: "",
    customSize: "",
    color: "",
    customColor: "",
    material: "",
    customMaterial: "",
    condition: "",
    customCondition: "",
    availability: "",
    customAvailability: "",

    // =====================
    // SHIRT
    // =====================

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

    shirtOccasion: "",

    customShirtOccasion: "",

    // =====================
    // SUIT
    // =====================

    suitType: "",

    customSuitType: "",

    suitJacketStyle: "",

    customSuitJacketStyle: "",

    suitLapelStyle: "",

    customSuitLapelStyle: "",

    suitFit: "",

    customSuitFit: "",

    suitOccasion: "",

    customSuitOccasion: "",

    suitVest: "",

    // =====================
    // AGBADA
    // =====================

    agbadaStyle: "",

    customAgbadaStyle: "",

    agbadaPieces: "",

    customAgbadaPieces: "",

    agbadaFabric: "",

    customAgbadaFabric: "",

    agbadaEmbroidery: "",

    agbadaCap: "",

    agbadaOccasion: "",

    customAgbadaOccasion: "",

    agbadaTailoring: "",

    // =====================
    // SENATOR
    // =====================

    senatorStyle: "",

    customSenatorStyle: "",

    senatorTopStyle: "",

    customSenatorTopStyle: "",

    senatorTrouserStyle: "",

    customSenatorTrouserStyle: "",

    senatorCap: "",

    // =====================
    // T-SHIRT
    // =====================

    tshirtStyle: "",

    customTshirtStyle: "",

    tshirtNeckType: "",

    customTshirtNeckType: "",

    tshirtPrint: "",

    customTshirtPrint: "",

    // =====================
    // JEANS
    // =====================

    jeansType: "",

    customJeansType: "",

    jeansFit: "",

    customJeansFit: "",

    jeansWaistSize: "",

    customJeansWaistSize: "",

    jeansLength: "",

    customJeansLength: "",

    jeansWashStyle: "",

    customJeansWashStyle: "",

    jeansStretch: "",

    jeansStyle: "",

    customJeansStyle: "",

    jeansOccasion: "",

    customJeansOccasion: "",
    // =====================
    // HOODIE
    // =====================

    hoodieType: "",

    customHoodieType: "",

    hoodieThickness: "",

    customHoodieThickness: "",

    hoodieClosure: "",

    customHoodieClosure: "",

    hoodiePrint: "",

    customHoodiePrint: "",

    hoodieFit: "",

    customHoodieFit: "",

    // =====================
    // JACKET
    // =====================

    jacketType: "",

    customJacketType: "",

    jacketClosure: "",

    customJacketClosure: "",

    jacketStyle: "",

    customJacketStyle: "",

    jacketFit: "",

    customJacketFit: "",

    jacketOccasion: "",

    customJacketOccasion: "",

    // =====================
    // TROUSERS
    // =====================

    trouserType: "",

    customTrouserType: "",

    trouserFit: "",

    customTrouserFit: "",

    trouserWaistSize: "",

    customTrouserWaistSize: "",

    trouserLength: "",

    customTrouserLength: "",

    trouserStyle: "",

    customTrouserStyle: "",

    trouserOccasion: "",

    customTrouserOccasion: "",

    // =====================
    // SHORTS
    // =====================

    shortType: "",

    customShortType: "",

    shortFit: "",

    customShortFit: "",

    shortLength: "",

    customShortLength: "",

    shortWaistSize: "",

    customShortWaistSize: "",

    shortMaterial: "",

    customShortMaterial: "",

    shortStyle: "",

    customShortStyle: "",
  });

  const resetDynamicFields = () => ({
    // SHIRT

    shirtType: "",

    shirtFit: "",

    shirtDesign: "",

    shirtOccasion: "",

    // SUIT

    suitType: "",

    suitFit: "",

    suitOccasion: "",

    // AGBADA

    agbadaStyle: "",

    agbadaPieces: "",

    agbadaFabric: "",

    agbadaEmbroidery: "",

    agbadaCap: "",

    agbadaOccasion: "",

    agbadaTailoring: "",

    // SENATOR

    senatorStyle: "",

    senatorTopStyle: "",

    senatorTrouserStyle: "",

    senatorCap: "",

    // T-SHIRT

    tshirtStyle: "",

    tshirtNeckType: "",

    tshirtPrint: "",

    // JEANS

    jeansType: "",

    jeansFit: "",

    jeansWaistSize: "",

    jeansLength: "",

    jeansWashStyle: "",

    jeansStretch: "",

    jeansStyle: "",

    jeansOccasion: "",

    // HOODIE

    hoodieType: "",

    hoodieThickness: "",

    hoodieClosure: "",

    hoodiePrint: "",

    hoodieFit: "",

    // JACKET

    jacketType: "",

    jacketClosure: "",

    jacketStyle: "",

    jacketFit: "",

    jacketOccasion: "",

    // TROUSERS

    trouserType: "",

    trouserFit: "",

    trouserWaistSize: "",

    trouserLength: "",

    trouserStyle: "",

    trouserOccasion: "",

    // SHORTS

    shortType: "",

    shortFit: "",

    shortLength: "",

    shortWaistSize: "",

    shortMaterial: "",

    shortStyle: "",
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

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="fs-5">👔</span>
        <h5 className="h6 fw-bold mb-0 text-dark">
          Men's Fashion Details
        </h5>
      </div>

      {/* 1. CLOTHING TYPE FIRST */}

      <div className="mb-4">
        <StyledSelect
          id="mens-clothing-type"
          name="clothingType"
          label="Clothing Type"
          value={data.clothingType}
          customValue={data.customClothingType}
          onCustomChange={(value) =>
            updateField(
              "customClothingType",

              value,
            )
          }
          options={[
            "Shirt",

            "Suit",

            "Agbada",

            "Senator Wear",

            "T-Shirt",

            "Jeans",

            "Hoodie",

            "Jacket",

            "Shorts",

            "Trousers",
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

      {/* 2. DYNAMIC DETAILS */}

      {data.clothingType === "Shirt" && (
        <ShirtFields data={data} updateField={updateField} />
      )}

      {data.clothingType === "Suit" && (
        <SuitFields data={data} updateField={updateField} />
      )}

      {data.clothingType === "Agbada" && (
        <AgbadaFields data={data} updateField={updateField} />
      )}

      {data.clothingType === "Senator Wear" && (
        <SenatorFields data={data} updateField={updateField} />
      )}

      {data.clothingType === "T-Shirt" && (
        <TShirtFields data={data} updateField={updateField} />
      )}

      {data.clothingType === "Jeans" && (
        <JeansFields data={data} updateField={updateField} />
      )}

      {data.clothingType === "Hoodie" && (
        <HoodieFields data={data} updateField={updateField} />
      )}

      {data.clothingType === "Jacket" && (
        <JacketFields data={data} updateField={updateField} />
      )}

      {data.clothingType === "Trousers" && (
        <TrousersFields data={data} updateField={updateField} />
      )}

      {data.clothingType === "Shorts" && (
        <ShortsFields data={data} updateField={updateField} />
      )}

      {/* 3. GENERAL DETAILS LAST */}

      <div className="mt-4">
        <GeneralMensFields data={data} updateField={updateField} />
      </div>
    </section>
  );
}
