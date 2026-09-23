"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { FashionBrandSelect } from "./FashionBrandSelect";
import { FashionFeatures } from "./FashionFeatures";
import { BagsGeneralFields } from "./Bags/BagsGeneralFields";
import { LuggageFields } from "./Bags/LuggageFields";
import { HandbagsFields } from "./Bags/HandbagsFields";
import { BackpacksFields } from "./Bags/BackpacksFields";
import { DufflesTravelBagsFields } from "./Bags/DufflesTravelBagsFields";
import { BriefcasesBusinessFields } from "./Bags/BriefcasesBusinessFields";
import { WalletsPursesFields } from "./Bags/WalletsPursesFields";
import { AfricanAnkaraBagsFields } from "./Bags/AfricanAnkaraBagsFields";

type BagsLuggageFieldsProps = {
  onChange: (data: object) => void;
};

export function BagsLuggageFields({ onChange }: BagsLuggageFieldsProps) {
  const [data, setData] = useState({
    // GENDER / DEPARTMENT
    gender: "",

    // MAIN BAG TYPE
    bagType: "",
    customBagType: "",

    // GENERAL FIELDS
    material: "",
    customMaterial: "",
    color: "",
    customColor: "",
    closure: "",
    customClosure: "",
    condition: "",
    customCondition: "",
    packaging: "",
    waterproof: "",
    availability: "",
    customAvailability: "",

    // BRAND
    brand: "",
    customBrand: "",

    // LUGGAGE
    luggageSize: "",
    customLuggageSize: "",
    luggageCasing: "",
    customLuggageCasing: "",
    luggageWheels: "",
    luggageLock: "",
    customLuggageLock: "",
    luggageExpandable: "",
    luggageHandle: "",

    // HANDBAGS
    handbagStyle: "",
    customHandbagStyle: "",
    handbagSizeProfile: "",
    handbagStrap: "",
    customHandbagStrap: "",
    handbagHardware: "",
    handbagPockets: "",
    handbagLining: "",

    // BACKPACKS
    backpackType: "",
    customBackpackType: "",
    laptopSize: "",
    backpackTech: "",
    backpackErgonomics: "",

    // DUFFLE & TRAVEL
    duffleStyle: "",
    customDuffleStyle: "",
    shoeCompartment: "",
    duffleStraps: "",
    duffleAirlineApproved: "",

    // BRIEFCASES & BUSINESS
    briefcaseStyle: "",
    customBriefcaseStyle: "",
    documentSize: "",
    briefcaseLock: "",
    interiorOrganizer: "",

    // WALLETS & PURSES
    walletStyle: "",
    customWalletStyle: "",
    cardSlots: "",
    rfidProtection: "",
    cashStorage: "",

    // ANKARA & TRADITIONAL
    ankaraBagStyle: "",
    customAnkaraBagStyle: "",
    ankaraCraftsmanship: "",
    ankaraMatchingSet: "",
    customAnkaraMatchingSet: "",
    ankaraReinforce: "",

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

  const getBagTypeOptions = () => {
    if (data.gender === "Women's") {
      return [
        "Handbags & Shoulder Bags",
        "Tote Bags",
        "Crossbody Bags",
        "Luggage & Travel Suitcases",
        "Backpacks",
        "Wallets, Purses & Clutches",
        "African Craft & Ankara Bags",
        "Duffle & Gym Bags",
        "Make-up Bags & Organizers",
      ];
    }
    if (data.gender === "Men's") {
      return [
        "Luggage & Travel Suitcases",
        "Backpacks (Laptop & Anti-theft)",
        "Briefcases & Executive Bags",
        "Crossbody & Messenger Bags",
        "Duffle & Weekender Bags",
        "Wallets & Cardholders",
        "Waist Bags / Fanny Packs",
      ];
    }
    if (data.gender === "Kids / Children") {
      return [
        "School Backpacks & Trolley Bags",
        "Lunch Bags & Boxes",
        "Kids Travel Suitcases",
        "Diaper & Baby Bags",
      ];
    }
    // Unisex
    return [
      "Luggage & Travel Suitcases",
      "Backpacks (Laptop & Travel)",
      "Duffle & Gym Bags",
      "Crossbody & Messenger Bags",
      "Briefcases & Document Folios",
      "Wallets, Cardholders & Purses",
      "African Craft & Ankara Bags",
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
        <span className="fs-5">🧳</span>
        <h5 className="h6 fw-bold mb-0 text-dark">Bags & Luggage Details</h5>
      </div>

      {/* 1. GENDER / TARGET AUDIENCE & BAG CATEGORY */}
      <div className="row g-3 mb-4">
        {/* TARGET GENDER / AUDIENCE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="bag-gender"
            name="gender"
            label="Department / Gender"
            value={data.gender}
            options={["Women's", "Men's", "Kids / Children", "Unisex"]}
            placeholder="Select Department"
            onChange={(val: string) => {
              const updated = {
                ...data,
                gender: val,
                bagType: "",
                customBagType: "",
              };
              setData(updated);
              onChange(updated);
            }}
          />
        </div>

        {/* BAG CATEGORY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="bag-type"
            name="bagType"
            label="Bag / Luggage Category"
            value={data.bagType}
            customValue={data.customBagType}
            onCustomChange={(val: string) => updateField("customBagType", val)}
            options={getBagTypeOptions()}
            placeholder="Select Category"
            allowOther
            onChange={(val: string) => updateField("bagType", val)}
          />
        </div>
      </div>

      {/* 2. DYNAMIC SUB-CATEGORY PANELS */}

      {/* LUGGAGE & SUITCASES */}
      {(data.bagType === "Luggage & Travel Suitcases" ||
        data.bagType === "Kids Travel Suitcases") && (
        <LuggageFields data={data} updateField={updateField} />
      )}

      {/* HANDBAGS, TOTES, CROSSBODY */}
      {(data.bagType === "Handbags & Shoulder Bags" ||
        data.bagType === "Tote Bags" ||
        data.bagType === "Crossbody Bags" ||
        data.bagType === "Crossbody & Messenger Bags") && (
        <HandbagsFields data={data} updateField={updateField} />
      )}

      {/* BACKPACKS */}
      {(data.bagType === "Backpacks" ||
        data.bagType === "Backpacks (Laptop & Anti-theft)" ||
        data.bagType === "Backpacks (Laptop & Travel)" ||
        data.bagType === "School Backpacks & Trolley Bags") && (
        <BackpacksFields data={data} updateField={updateField} />
      )}

      {/* DUFFLES & TRAVEL BAGS */}
      {(data.bagType === "Duffle & Gym Bags" ||
        data.bagType === "Duffle & Weekender Bags") && (
        <DufflesTravelBagsFields data={data} updateField={updateField} />
      )}

      {/* BRIEFCASES & BUSINESS */}
      {(data.bagType === "Briefcases & Executive Bags" ||
        data.bagType === "Briefcases & Document Folios") && (
        <BriefcasesBusinessFields data={data} updateField={updateField} />
      )}

      {/* WALLETS & PURSES */}
      {(data.bagType === "Wallets, Purses & Clutches" ||
        data.bagType === "Wallets & Cardholders" ||
        data.bagType === "Wallets, Cardholders & Purses") && (
        <WalletsPursesFields data={data} updateField={updateField} />
      )}

      {/* AFRICAN & ANKARA CRAFT */}
      {data.bagType === "African Craft & Ankara Bags" && (
        <AfricanAnkaraBagsFields data={data} updateField={updateField} />
      )}

      {/* 3. GENERAL BAG SPECIFICATIONS (Material, Color, Closure, Condition, Dust Bag) */}
      <BagsGeneralFields data={data} updateField={updateField} />

      {/* 4. BRAND SELECTION (Samsonite, Louis Vuitton, Gucci, Michael Kors, Delsey, etc.) */}
      <div className="mt-4">
        <FashionBrandSelect
          category="Bags & Luggage"
          value={data.brand}
          onChange={(val) => updateField("brand", val)}
          customValue={data.customBrand}
          onCustomChange={(val) => updateField("customBrand", val)}
        />
      </div>

      {/* 5. QUALITY & USABILITY FEATURES */}
      <div className="mt-4">
        <FashionFeatures data={data} updateField={updateField} />
      </div>
    </section>
  );
}
