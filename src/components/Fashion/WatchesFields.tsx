"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { FashionFeatures } from "./FashionFeatures";
import { FashionBrandSelect } from "./FashionBrandSelect";

type WatchesFieldsProps = {
  onChange: (data: object) => void;
};

const WATCH_BRANDS = [
  "Rolex",
  "Casio / G-Shock / Edifice",
  "Patek Philippe",
  "Audemars Piguet (AP)",
  "Hublot",
  "Apple Watch",
  "Samsung Galaxy Watch",
  "Cartier",
  "Omega",
  "Tag Heuer",
  "Tissot",
  "Seiko",
  "Citizen",
  "Fossil",
  "Michael Kors",
  "Curren",
  "Naviforce",
  "Skmei",
  "Invicta",
  "Richard Mille",
  "Breitling",
  "Geneva",
  "Generic / Fashion",
];

const WATCH_TYPES = [
  "Analog Wristwatch (Pointers)",
  "Digital Wristwatch",
  "Analog-Digital Hybrid",
  "Smartwatch / Fitness Tracker",
  "Chronograph / Stopwatch",
  "Skeleton / Tourbillon Luxury",
  "Automatic Self-Winding",
  "Pocket Watch",
];

const MOVEMENTS = [
  "Quartz (Battery Powered)",
  "Automatic (Mechanical Self-Winding)",
  "Manual Wind (Mechanical Hand Wind)",
  "Solar Powered / Eco-Drive",
  "Smartwatch Digital OS",
];

const CASE_MATERIALS = [
  "Stainless Steel (Rustproof)",
  "Gold-Plated / 18k Solid Gold",
  "Rose Gold Plated",
  "Titanium (Lightweight)",
  "Ceramic (Scratch-Resistant)",
  "Resin / Tough Shockproof Plastic",
  "Aluminum / Alloy",
  "Diamond / Iced-Out Encrusted",
];

const BAND_MATERIALS = [
  "Stainless Steel Link Bracelet",
  "Genuine Leather Strap",
  "Silicone / Rubber Sport Band",
  "Milanese Magnetic Mesh Loop",
  "Ceramic Links",
  "Nylon / NATO Fabric Strap",
  "Solid Gold / Two-Tone Bracelet",
  "Resin Strap",
];

const CASE_SIZES = [
  "Under 34mm (Small / Petite / Women's Classic)",
  "34mm - 38mm (Mid-size / Unisex)",
  "39mm - 42mm (Standard Men's Classic)",
  "43mm - 46mm (Large / Sport Chrono)",
  "47mm+ (Oversized / G-Shock)",
];

const WATER_RESISTANCE = [
  "30M / 3ATM (Splash Resistant / Rain Safe)",
  "50M / 5ATM (Handwashing & Brief Immersion)",
  "100M / 10ATM (Swimming & Snorkeling Safe)",
  "200M+ / 20ATM (Professional Scuba Diving)",
  "Not Water Resistant (Keep Dry)",
];

export function WatchesFields({ onChange }: WatchesFieldsProps) {
  const [data, setData] = useState({
    gender: "",
    watchType: "",
    customWatchType: "",
    brand: "",
    customBrand: "",
    movement: "",
    customMovement: "",
    caseMaterial: "",
    customCaseMaterial: "",
    bandMaterial: "",
    customBandMaterial: "",
    caseSize: "",
    dialColor: "",
    customDialColor: "",
    bandColor: "",
    customBandColor: "",
    glassType: "",
    waterResistance: "",
    displayFeatures: "",
    condition: "",
    customCondition: "",
    packaging: "",
    smartCompatibility: "",
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

  const isSmartwatch =
    data.watchType.includes("Smartwatch") ||
    data.brand === "Apple Watch" ||
    data.brand === "Samsung Galaxy Watch";

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="fs-5">⌚</span>
        <h5 className="h6 fw-bold mb-0 text-dark">Watches & Timepieces Details</h5>
      </div>

      <div className="row g-3 mb-4">
        {/* GENDER / DEPARTMENT */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-gender"
            name="gender"
            label="Gender / Target Wearer"
            value={data.gender}
            options={[
              "Men's Watches",
              "Women's Watches",
              "Unisex / Couples Pair Set",
              "Kids & Teen Watches",
            ]}
            placeholder="Select Gender"
            onChange={(val: string) => updateField("gender", val)}
          />
        </div>

        {/* WATCH TYPE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-type"
            name="watchType"
            label="Watch Type & Style"
            value={data.watchType}
            customValue={data.customWatchType}
            onCustomChange={(val: string) => updateField("customWatchType", val)}
            options={WATCH_TYPES}
            placeholder="Select Watch Type"
            allowOther
            onChange={(val: string) => updateField("watchType", val)}
          />
        </div>

        {/* BRAND */}
        <div className="col-12 col-md-6">
          <FashionBrandSelect
            category="Watches"
            label="Brand / Maker"
            value={data.brand}
            onChange={(val: string) => updateField("brand", val)}
            customValue={data.customBrand}
            onCustomChange={(val: string) => updateField("customBrand", val)}
          />
        </div>

        {/* MOVEMENT */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-movement"
            name="movement"
            label="Movement & Engine"
            value={data.movement}
            customValue={data.customMovement}
            onCustomChange={(val: string) => updateField("customMovement", val)}
            options={MOVEMENTS}
            placeholder="Select Movement"
            allowOther
            onChange={(val: string) => updateField("movement", val)}
          />
        </div>

        {/* CASE MATERIAL */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-case-material"
            name="caseMaterial"
            label="Case Material"
            value={data.caseMaterial}
            customValue={data.customCaseMaterial}
            onCustomChange={(val: string) => updateField("customCaseMaterial", val)}
            options={CASE_MATERIALS}
            placeholder="Select Case Material"
            allowOther
            onChange={(val: string) => updateField("caseMaterial", val)}
          />
        </div>

        {/* BAND / STRAP MATERIAL */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-band-material"
            name="bandMaterial"
            label="Band / Strap Material"
            value={data.bandMaterial}
            customValue={data.customBandMaterial}
            onCustomChange={(val: string) => updateField("customBandMaterial", val)}
            options={BAND_MATERIALS}
            placeholder="Select Band Material"
            allowOther
            onChange={(val: string) => updateField("bandMaterial", val)}
          />
        </div>

        {/* CASE SIZE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-case-size"
            name="caseSize"
            label="Case Diameter / Size"
            value={data.caseSize}
            options={CASE_SIZES}
            placeholder="Select Case Size"
            onChange={(val: string) => updateField("caseSize", val)}
          />
        </div>

        {/* DIAL COLOR */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-dial-color"
            name="dialColor"
            label="Dial Face Color"
            value={data.dialColor}
            customValue={data.customDialColor}
            onCustomChange={(val: string) => updateField("customDialColor", val)}
            options={[
              "Black Dial",
              "Blue Sunburst Dial",
              "Silver / White Dial",
              "Gold / Champagne Dial",
              "Green Dial",
              "Skeleton / Transparent Dial",
              "Diamond Paved Dial",
              "Digital OLED Screen",
            ]}
            placeholder="Select Dial Color"
            allowOther
            onChange={(val: string) => updateField("dialColor", val)}
          />
        </div>

        {/* BAND / STRAP COLOR */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-band-color"
            name="bandColor"
            label="Band / Strap Color"
            value={data.bandColor}
            customValue={data.customBandColor}
            onCustomChange={(val: string) => updateField("customBandColor", val)}
            options={[
              "Silver / Chrome",
              "Gold",
              "Two-Tone (Gold & Silver)",
              "Rose Gold",
              "Black",
              "Brown / Tan Leather",
              "Navy Blue",
            ]}
            placeholder="Select Band Color"
            allowOther
            onChange={(val: string) => updateField("bandColor", val)}
          />
        </div>

        {/* GLASS / CRYSTAL TYPE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-glass-type"
            name="glassType"
            label="Watch Glass / Crystal"
            value={data.glassType}
            options={[
              "Sapphire Crystal (Scratch-Proof Luxury)",
              "Hardlex Mineral Crystal (Shatter Resistant)",
              "Acrylic / Resin Glass",
              "Gorilla Glass / Ion-X (Smartwatch)",
            ]}
            placeholder="Select Crystal Type"
            onChange={(val: string) => updateField("glassType", val)}
          />
        </div>

        {/* WATER RESISTANCE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-water"
            name="waterResistance"
            label="Water Resistance Rating"
            value={data.waterResistance}
            options={WATER_RESISTANCE}
            placeholder="Select Water Resistance"
            onChange={(val: string) => updateField("waterResistance", val)}
          />
        </div>

        {/* SPECIAL DIAL FEATURES */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-features"
            name="displayFeatures"
            label="Complications & Features"
            value={data.displayFeatures}
            options={[
              "Date & Day Window Calendar",
              "Chronograph Sub-dials (Working)",
              "Luminous Glow-in-the-dark Hands",
              "Tachymeter Rotating Bezel",
              "Simple 3-Hand Minimalist",
            ]}
            placeholder="Select Watch Features"
            onChange={(val: string) => updateField("displayFeatures", val)}
          />
        </div>

        {/* SMARTWATCH COMPATIBILITY (IF SMARTWATCH) */}
        {isSmartwatch && (
          <div className="col-12">
            <div className="p-3 bg-white border border-light-subtle rounded-3">
              <h6 className="fw-semibold text-dark mb-2">⚡ Smartwatch Specifications</h6>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <StyledSelect
                    id="watch-smart-os"
                    name="smartCompatibility"
                    label="Smart OS Compatibility"
                    value={data.smartCompatibility}
                    options={[
                      "Universal (iOS & Android Compatible)",
                      "Apple iOS Only (Apple Watch)",
                      "Wear OS by Google / Android Only",
                      "Includes Bluetooth Calling & Health Tracking (Heart/BP)",
                    ]}
                    placeholder="Select Smart Compatibility"
                    onChange={(val: string) => updateField("smartCompatibility", val)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONDITION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            customValue={data.customCondition}
            onCustomChange={(val: string) => updateField("customCondition", val)}
            options={[
              "Brand New (In Factory Seal)",
              "Brand New (Open Box)",
              "Tokunbo / Foreign Used (Excellent Condition)",
              "Nigerian Used (Good Working Condition)",
              "Refurbished / Serviced",
            ]}
            placeholder="Select Condition"
            allowOther
            onChange={(val: string) => updateField("condition", val)}
          />
        </div>

        {/* PACKAGING & PAPERS */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-packaging"
            name="packaging"
            label="Box & Authenticity Papers"
            value={data.packaging}
            options={[
              "Full Set (Original Presentation Box, Manual & Papers)",
              "Watch + Branded Gift Box Only",
              "Watch Only (No Box)",
            ]}
            placeholder="Select Packaging"
            onChange={(val: string) => updateField("packaging", val)}
          />
        </div>

        {/* AVAILABILITY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="watch-availability"
            name="availability"
            label="Availability"
            value={data.availability}
            customValue={data.customAvailability}
            onCustomChange={(val: string) => updateField("customAvailability", val)}
            options={[
              "In Stock / Ready for Immediate Pickup/Delivery",
              "Pre-Order / Ships on Demand",
            ]}
            placeholder="Select Availability"
            allowOther
            onChange={(val: string) => updateField("availability", val)}
          />
        </div>
      </div>

      {/* ADDITIONAL FEATURES CHECKBOXES */}
      <div className="mt-4">
        <FashionFeatures data={data} updateField={updateField} />
      </div>
    </section>
  );
}
