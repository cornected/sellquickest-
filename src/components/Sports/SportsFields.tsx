"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { SportsBrandSelect } from "./SportsBrandSelect";

type SportsFieldsProps = {
  onChange: (data: object) => void;
  subCategoryTitle?: string;
};

// Sub-category tailored presets
const FITNESS_TYPES = [
  "Commercial / Home Treadmill (Motorized)",
  "Dumbbells & Barbell Weight Set (Hex/Rubber)",
  "Multi-Functional Home Gym Bench & Rack",
  "Spinning / Stationary Exercise Bike",
  "Elliptical Cross Trainer Machine",
  "Weight Lifting Belt, Straps & Gloves",
  "Resistance Bands & Pull-up Bar Set",
  "Adjustable Kettlebell Set",
  "Gym Rubber Flooring / Interlocking Tiles",
];

const BOOKS_ARTS_TYPES = [
  "Fiction & Non-Fiction Books / Novels",
  "School & University Academic Textbooks",
  "Professional Art Paint, Brushes & Canvas Set",
  "Drawing Tablet & Graphic Stylus",
  "Sketchbook, Pencils & Charcoal Kit",
  "Handmade Craft Work & Sculptures",
  "Sewing, Knitting & Crocheting Tools",
  "Calligraphy & Fountain Pen Set",
  "Religious & Motivational Books",
  "African Cultural Art & Artifacts",
];

const MUSIC_TYPES = [
  "Acoustic & Classical Guitar",
  "Electric Guitar & Bass Guitar",
  "Piano / Musical Keyboard & Synthesizer",
  "Drum Set (Acoustic / Electronic)",
  "Saxophone, Trumpet & Brass Instruments",
  "Violin, Viola & String Instruments",
  "Studio Recording Microphone & Stand",
  "Audio Interface & Sound Card",
  "DJ Mixer & Controller Console",
  "Guitar & Keyboard Amplifier",
];

const BICYCLE_TYPES = [
  "Adult Mountain Bicycle (26-29 inch)",
  "Road / Speed Racing Bicycle",
  "Kids Bicycle with Training Wheels",
  "Foldable Commuter City Bike",
  "Electric E-Bike / E-Scooter",
  "BMX Stunt Bicycle",
  "Cycling Helmet, Gloves & Riding Gear",
  "Bicycle Lock, Pump & Tool Kit",
];

const TEAM_SPORTS_TYPES = [
  "Football Boots & Cleats (FG / Turf)",
  "Original Club & Country Football Jerseys",
  "Match Quality Football (Size 5)",
  "Basketball & Basketball Hoop / Stand",
  "Table Tennis Board & Bats Set",
  "Lawn Tennis Racket & Tennis Balls",
  "Boxing Gloves & Heavy Punching Bag",
  "Athletic Spike Shoes & Training Kit",
];

const CAMPING_TYPES = [
  "Waterproof Camping Tent (2-6 Person)",
  "Thermal Sleeping Bag & Inflatable Mat",
  "Heavy Duty Hiking Backpack (50-80L)",
  "Rechargeable Camping Lantern & Flashlight",
  "Portable Gas Camping Stove & Cookware",
  "Foldable Outdoor Camping Chair & Table",
];

const FITNESS_FEATURES = [
  "Heavy Duty Commercial Quality",
  "Foldable / Space Saving Design",
  "LCD Digital Fitness Display (Pulse, Speed)",
  "Weights & Plates Included",
  "Original Manufacturer Branded",
  "Includes Free Carrying Case / Bag",
  "Bluetooth App Synchronization",
  "Clean Working / Tokunbo Grade A",
];

const BOOKS_ARTS_FEATURES = [
  "Original Publisher Edition / Authentic",
  "Mint / Crisp Unmarked Pages",
  "Complete Multi-Volume Box Set",
  "Artist / Professional Quality",
  "Non-Toxic & Archival Safe",
  "Includes Protective Cover / Box",
  "Collector's Special Edition",
  "Clear Legible Print",
];

const MUSIC_FEATURES = [
  "Crisp Studio & Concert Sound",
  "Includes Protective Hard Case / Gig Bag",
  "Includes Cables, Strap & Power Adapter",
  "Tuned & Ready to Play",
  "Original Brand Genuine",
  "Built-in Preamp / EQ",
];

const BICYCLE_FEATURES = [
  "Shimano Multi-Speed Gear Shifters",
  "Dual Disc Brakes (Front & Rear)",
  "Lightweight Aluminum Alloy Frame",
  "Front Suspension Shock Absorbers",
  "Safety Reflectors & LED Light Set",
  "Includes Water Bottle Holder & Kickstand",
];

const TEAM_SPORTS_FEATURES = [
  "Authentic / Original Brand Genuine",
  "Includes Inflation Needle & Pump",
  "High Grip Durable Rubber Outsole",
  "All-Weather Tear Resistant",
  "Official Tournament Match Grade",
  "Complete Set / Match Kit",
];

const CAMPING_FEATURES = [
  "Waterproof & Wind-Resistant Canvas",
  "Lightweight & Compact Packable",
  "USB Rechargeable Built-in Battery",
  "Includes Ground Pegs & Carry Bag",
  "Heavy Duty Corrosion-Resistant Frame",
];

export function SportsFields({
  onChange,
  subCategoryTitle = "Sports, Arts & Outdoors",
}: SportsFieldsProps) {
  const isBooksArts =
    subCategoryTitle.toLowerCase().includes("book") ||
    subCategoryTitle.toLowerCase().includes("art") ||
    subCategoryTitle.toLowerCase().includes("craft");
  const isMusic =
    subCategoryTitle.toLowerCase().includes("music") ||
    subCategoryTitle.toLowerCase().includes("instrument");
  const isBicycle =
    subCategoryTitle.toLowerCase().includes("bicycl") ||
    subCategoryTitle.toLowerCase().includes("cycling");
  const isTeamSports =
    subCategoryTitle.toLowerCase().includes("team") ||
    subCategoryTitle.toLowerCase().includes("athletic");
  const isCamping =
    subCategoryTitle.toLowerCase().includes("camp") ||
    subCategoryTitle.toLowerCase().includes("outdoor");

  const itemTypeOptions = isBooksArts
    ? BOOKS_ARTS_TYPES
    : isMusic
    ? MUSIC_TYPES
    : isBicycle
    ? BICYCLE_TYPES
    : isTeamSports
    ? TEAM_SPORTS_TYPES
    : isCamping
    ? CAMPING_TYPES
    : FITNESS_TYPES;

  const featuresList = isBooksArts
    ? BOOKS_ARTS_FEATURES
    : isMusic
    ? MUSIC_FEATURES
    : isBicycle
    ? BICYCLE_FEATURES
    : isTeamSports
    ? TEAM_SPORTS_FEATURES
    : isCamping
    ? CAMPING_FEATURES
    : FITNESS_FEATURES;

  const conditionOptions = isBooksArts
    ? [
        "Brand New / Unread",
        "Foreign Used / Tokunbo Like New",
        "Nigerian Used (Clean / Crisp Pages)",
        "Vintage / Collector's Edition",
      ]
    : [
        "Brand New Sealed",
        "Foreign Used (Tokunbo Clean)",
        "Nigerian Used (Tested Clean)",
        "Refurbished",
      ];

  const defaultCondition = isBooksArts ? "Brand New / Unread" : "Brand New Sealed";

  const sizePlaceholder = isBooksArts
    ? "e.g. Hardcover, Paperback, 450 Pages, Oil on Canvas (30x40cm), A3 Size"
    : isMusic
    ? "e.g. 61 Keys, 6-String Electric, 100W Amp, USB-C Powered"
    : isBicycle
    ? "e.g. 29-inch Wheels, 21-Speed Shimano, Aluminum Frame"
    : isTeamSports
    ? "e.g. Size 44 (EU) / 10 (US), Size 5 Ball, Standard Board"
    : isCamping
    ? "e.g. 4-Person Capacity, 65 Liters, 1000 Lumens"
    : "e.g. 50kg Set, 3.0 HP Motor, 29-inch wheels, Size 44 (Boot)";

  const sizeLabel = isBooksArts
    ? "Format / Edition / Medium"
    : isMusic
    ? "Model / Keys / Output"
    : isBicycle
    ? "Wheel / Frame Size"
    : isTeamSports
    ? "Size / Dimensions"
    : isCamping
    ? "Capacity / Dimensions"
    : "Size / Weight / Spec";

  const itemTypeLabel = isBooksArts
    ? "Book, Art or Craft Item"
    : isMusic
    ? "Musical Instrument / Audio Gear"
    : isBicycle
    ? "Bicycle / Cycling Item"
    : isTeamSports
    ? "Team Sports / Athletic Gear"
    : isCamping
    ? "Outdoor / Camping Gear"
    : "Equipment / Item Type";

  const [data, setData] = useState({
    itemType: "",
    customItemType: "",
    brand: "",
    customBrand: "",
    modelOrSize: "",
    condition: defaultCondition,
    targetAudience: "Adult / Unisex",
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
        {isBooksArts
          ? "📚"
          : isMusic
          ? "🎵"
          : isBicycle
          ? "🚲"
          : isCamping
          ? "🏕️"
          : "⚽"}{" "}
        {subCategoryTitle} Specifications
      </h5>

      {/* ITEM TYPE & BRAND */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="sports-type"
            name="itemType"
            label={itemTypeLabel}
            value={data.itemType}
            customValue={data.customItemType}
            onCustomChange={(val) => updateField("customItemType", val)}
            options={itemTypeOptions}
            placeholder={`Select ${itemTypeLabel}`}
            allowOther
            onChange={(val) => updateField("itemType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <SportsBrandSelect
            id="sports-brand"
            category={subCategoryTitle}
            label={isBooksArts ? "Publisher / Art Maker" : "Brand / Maker"}
            value={data.brand}
            customValue={data.customBrand}
            onCustomChange={(val) => updateField("customBrand", val)}
            onChange={(val) => updateField("brand", val)}
          />
        </div>
      </div>

      {/* SIZE/MODEL & CONDITION */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            {sizeLabel}
          </label>
          <input
            value={data.modelOrSize}
            onChange={(e) => updateField("modelOrSize", e.target.value)}
            placeholder={sizePlaceholder}
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="sports-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            options={conditionOptions}
            placeholder="Select Condition"
            onChange={(val) => updateField("condition", val)}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          {isBooksArts
            ? "Book / Art Inclusions & Highlights"
            : "Equipment Highlights & Inclusions"}
        </label>
        <div className="d-flex flex-wrap gap-2">
          {featuresList.map((feat) => {
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
