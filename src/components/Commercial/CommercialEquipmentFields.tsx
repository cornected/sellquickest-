"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { UniversalBrandSelect } from "../Common/UniversalBrandSelect";
import { COMMERCIAL_EQUIPMENT_BRANDS } from "@/lib/brandCatalogs";

type CommercialEquipmentFieldsProps = {
  onChange: (data: object) => void;
  subCategoryTitle?: string;
};

const RESTAURANT_TYPES = [
  "Commercial Gas / Electric Deck Oven (1-3 Decks)",
  "Industrial Spiral Dough Mixer (25kg - 100kg)",
  "Shawarma Gas Toaster & Grilling Machine",
  "Commercial Double Deep Fryer (Counter / Standing)",
  "Commercial Display Curved Glass Chiller / Warmer",
  "Commercial Ice Block & Cube Maker Machine",
  "Commercial Juice Extractor & Slush Machine",
  "Stainless Steel Food Prep Table & Sink Unit",
  "Commercial Popcorn & Candy Floss Machine",
];

const PRINTING_TYPES = [
  "Large Format Solvent / Eco-Solvent Banner Printer",
  "DTF (Direct to Film) Textile Printer & Shaker",
  "Sublimation Heat Press (Lanyard / Mug / Flatbed)",
  "Digital Production Laser Color Press",
  "Hydraulic Paper Cutting Guillotine",
  "Vinyl Cutting Plotter (24\" / 48\")",
  "Commercial Offset Printing Machine (KORD / MO)",
  "UV Flatbed & Roll-to-Roll Printer",
];

const SALON_TYPES = [
  "Hydraulic Heavy Duty Barber Chair",
  "Hair Steamer & Standing Hood Dryer",
  "Shampoo Wash Unit & Ceramic Basin",
  "Pedicure Massage Spa Chair & Foot Basin",
  "Professional Sterilizing Cabinet (UV)",
  "Facial Steamer & Beauty Magnifying Lamp",
  "Tattoo & Body Piercing Bed / Table",
];

const MEDICAL_TYPES = [
  "Color Doppler Ultrasound Scanner Machine",
  "Hospital Patient Electric / Manual Bed",
  "Autoclave Sterilizer (Class B Medical)",
  "Dental Chair Complete Unit & Compressor",
  "Clinical Laboratory Centrifuge & Microscope",
  "Patient Vital Signs Monitor & ECG Machine",
  "Surgical OT Light & Operating Table",
];

const INDUSTRIAL_TYPES = [
  "Industrial Screw Air Compressor (10-50 HP)",
  "Plastic Bottle Blow Molding Machine",
  "Semi / Fully Automatic Liquid Filling Machine",
  "Continuous Band Bag Sealer Machine",
  "Industrial Metal Lathe & Milling Machine",
  "Heavy Duty Industrial Sewing Machine (Walking Foot)",
  "Commercial Weighing Scale & Platform (300kg-5T)",
];

const FIXTURES_TYPES = [
  "Double-Sided Gondola Supermarket Shelving",
  "Heavy Duty Pallet Storage Rack Units",
  "Supermarket Cashier Checkout Counter Desk",
  "Glass Display Showcase Counter with LED",
  "Supermarket Shopping Trolleys & Hand Baskets",
  "Barcode Label Printer & Wireless 2D Scanner",
];

const POWER_SOURCES = [
  "Single Phase Electric (220V / 50Hz)",
  "Three Phase Heavy Duty (380V - 415V)",
  "LPG Gas / Industrial Gas Powered",
  "Dual Fuel (Gas & Electric)",
  "Diesel / Petrol Engine Driven",
  "Hydraulic / Pneumatic Air Powered",
  "Manual Hand / Foot Operated",
];

const CONDITION_OPTIONS = [
  "Brand New in Wooden Crate / Sealed",
  "Foreign Used (Tokunbo Grade A)",
  "Nigerian Used (Tested & Fully Serviced)",
  "Factory Refurbished with Warranty",
];

const HIGHLIGHTS = [
  "Heavy Duty Food-Grade Stainless Steel (SUS304)",
  "Digital Microcomputer Temperature Controller",
  "High Speed & Commercial Daily Output",
  "Energy Saving Inverter Tech",
  "Low Noise & Low Vibration Operation",
  "Spare Parts & Service Readily Available in Nigeria",
  "Tested & Ready for Instant Production",
  "Comes with Free Accessories & Tooling",
];

export function CommercialEquipmentFields({
  onChange,
  subCategoryTitle = "Commercial Equipment & Tools",
}: CommercialEquipmentFieldsProps) {
  const isRestaurant =
    subCategoryTitle.toLowerCase().includes("restaurant") ||
    subCategoryTitle.toLowerCase().includes("cater") ||
    subCategoryTitle.toLowerCase().includes("bakery");
  const isPrinting =
    subCategoryTitle.toLowerCase().includes("print") ||
    subCategoryTitle.toLowerCase().includes("graphic");
  const isSalon =
    subCategoryTitle.toLowerCase().includes("salon") ||
    subCategoryTitle.toLowerCase().includes("barber") ||
    subCategoryTitle.toLowerCase().includes("spa");
  const isMedical =
    subCategoryTitle.toLowerCase().includes("medic") ||
    subCategoryTitle.toLowerCase().includes("dent") ||
    subCategoryTitle.toLowerCase().includes("lab");
  const isFixtures =
    subCategoryTitle.toLowerCase().includes("store") ||
    subCategoryTitle.toLowerCase().includes("market") ||
    subCategoryTitle.toLowerCase().includes("fixture") ||
    subCategoryTitle.toLowerCase().includes("shelf");

  const itemTypes = isRestaurant
    ? RESTAURANT_TYPES
    : isPrinting
    ? PRINTING_TYPES
    : isSalon
    ? SALON_TYPES
    : isMedical
    ? MEDICAL_TYPES
    : isFixtures
    ? FIXTURES_TYPES
    : INDUSTRIAL_TYPES;

  const itemLabel = isRestaurant
    ? "Catering / Bakery Machine"
    : isPrinting
    ? "Printing Equipment Type"
    : isSalon
    ? "Salon / Barbershop Equipment"
    : isMedical
    ? "Medical / Laboratory Device"
    : isFixtures
    ? "Retail / Store Fixture"
    : "Machinery / Equipment Type";

  const capacityPlaceholder = isRestaurant
    ? "e.g. 50kg Flour, 3 Decks (6 Trays), 12 Liters"
    : isPrinting
    ? "e.g. 3.2m (10ft) Width, 2x i3200 Heads, 40x60cm Press"
    : isMedical
    ? "e.g. 4D Live, 18L Chamber, 3 Motors"
    : isFixtures
    ? "e.g. 2.0m Height x 1.2m Width, 5 Shelves, 150kg/shelf"
    : "e.g. 15kW Motor, 1000 Bottles/Hour, 300 Bar";

  const [data, setData] = useState({
    itemType: "",
    customItemType: "",
    brand: "",
    customBrand: "",
    powerSource: "Single Phase Electric (220V / 50Hz)",
    capacityOrSpec: "",
    condition: "Brand New in Wooden Crate / Sealed",
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
        🏭 {subCategoryTitle} Specifications
      </h5>

      {/* ITEM TYPE & BRAND */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="comm-item-type"
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
            id="comm-brand"
            label="Brand / Manufacturer"
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(val) => updateField("customBrand", val)}
            onChange={(val) => updateField("brand", val)}
            category={subCategoryTitle}
            placeholder="Select Manufacturer"
            brands={COMMERCIAL_EQUIPMENT_BRANDS}
            allowNoBrand={true}
            allowCustomBespoke={true}
          />
        </div>
      </div>

      {/* POWER SOURCE & CAPACITY */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="comm-power"
            name="powerSource"
            label="Power Source / Voltage"
            value={data.powerSource}
            options={POWER_SOURCES}
            placeholder="Select Power Source"
            onChange={(val) => updateField("powerSource", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Capacity / Production Output / Size
          </label>
          <input
            value={data.capacityOrSpec}
            onChange={(e) => updateField("capacityOrSpec", e.target.value)}
            placeholder={capacityPlaceholder}
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* CONDITION */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="comm-condition"
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
          Equipment Highlights & Inclusions
        </label>
        <div className="d-flex flex-wrap gap-2">
          {HIGHLIGHTS.map((feat) => {
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
