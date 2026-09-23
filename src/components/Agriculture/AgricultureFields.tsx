"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { AgricBrandSelect } from "./AgricBrandSelect";

type AgricultureFieldsProps = {
  onChange: (data: object) => void;
  subCategoryTitle?: string;
};

const AGRI_TYPES = [
  "Farm Produce & Food Grains (Rice, Beans, Maize, Millet)",
  "Tubers & Roots (Yam, Cassava, Potatoes)",
  "Oils & Condiments (Red Palm Oil, Vegetable Oil, Shea Butter)",
  "Livestock - Cattle, Bulls & Cows",
  "Livestock - Goats, Rams & Sheep",
  "Livestock - Pigs & Piglets",
  "Poultry - Day-Old Chicks (Broilers, Layers, Cockerels)",
  "Poultry - Point-of-Lay Birds & Mature Chickens",
  "Poultry - Turkeys, Ducks & Guinea Fowls",
  "Fish & Aquaculture - Live Catfish (Table Size / Melange)",
  "Fish & Aquaculture - Fingerlings & Juveniles",
  "Fish & Aquaculture - Oven-Dried / Smoked Catfish",
  "Farm Machinery - Tractor & Implements",
  "Farm Machinery - Feed Pelletizer & Grinder",
  "Farm Machinery - Egg Incubator (Solar/Electric)",
  "Animal Feeds - Topfeed, Ultima, Coppens, Skretting",
  "Fertilizers, Hybrid Seeds & Agro-Chemicals",
];

const AGRI_QUANTITY_UNITS = [
  "Per 50kg / 100kg Bag",
  "Per Ton / Metric Tonne",
  "Per Head / Animal",
  "Per Crate / Carton",
  "Per 25L / 30L Gallon (Keg)",
  "Per Bird / Piece",
  "Wholesale Truckload / Pickup Load",
];

const AGRI_FEATURES = [
  "Direct Farm Gate Price",
  "Bulk Wholesale Discount Available",
  "Interstate Delivery / Waybill Available",
  "Fully Vaccinated / Veterinary Certificate",
  "Organic / Chemical-Free Grown",
  "Freshly Harvested Today",
  "Disease-Free Healthy Stock",
  "Tested High Hatchability / Germination Rate",
  "Weighbridge Inspection Allowed",
];

export function AgricultureFields({
  onChange,
  subCategoryTitle = "Agriculture & Food",
}: AgricultureFieldsProps) {
  const [data, setData] = useState({
    itemType: "",
    customItemType: "",
    varietyOrBreed: "",
    quantityAvailable: "Bulk Supply Available",
    unitOfSale: "Per 50kg / 100kg Bag",
    farmingMethod: "Organically Grown / Farm Raised",
    deliveryOption: "Nationwide Waybill / Farm Gate Pickup",
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
      <h5 className="h6 fw-bold mb-3 text-dark">🌾 {subCategoryTitle} Specifications</h5>

      {/* PRODUCE / LIVESTOCK TYPE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="agri-item-type"
            name="itemType"
            label="Commodity / Animal Type"
            value={data.itemType}
            customValue={data.customItemType}
            onCustomChange={(val) => updateField("customItemType", val)}
            options={AGRI_TYPES}
            placeholder="Select Agriculture Item"
            allowOther
            onChange={(val) => updateField("itemType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <AgricBrandSelect
            id="agri-brand"
            category={subCategoryTitle}
            label="Producer / Farm / Brand"
            value={data.varietyOrBreed}
            onChange={(val) => updateField("varietyOrBreed", val)}
          />
        </div>
      </div>

      {/* QUANTITY & UNIT */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Available Quantity / Volume
          </label>
          <input
            value={data.quantityAvailable}
            onChange={(e) => updateField("quantityAvailable", e.target.value)}
            placeholder="e.g. 500 Bags, 50 Heads, 2000kg weekly, 10 Drums"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="agri-unit"
            name="unitOfSale"
            label="Pricing Unit"
            value={data.unitOfSale}
            options={AGRI_QUANTITY_UNITS}
            placeholder="Select Pricing Unit"
            onChange={(val) => updateField("unitOfSale", val)}
          />
        </div>
      </div>

      {/* FARMING METHOD & LOGISTICS */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="agri-method"
            name="farmingMethod"
            label="Source / Method"
            value={data.farmingMethod}
            options={[
              "Organically Grown / Farm Raised",
              "Imported Premium Grade",
              "Local Farm Harvest",
              "Processed & Machine Packaged",
            ]}
            placeholder="Select Method"
            onChange={(val) => updateField("farmingMethod", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="agri-delivery"
            name="deliveryOption"
            label="Logistics & Delivery"
            value={data.deliveryOption}
            options={[
              "Nationwide Waybill / Farm Gate Pickup",
              "Direct Truck Delivery to Buyer's Warehouse",
              "Pickup Only at Farm Location",
            ]}
            placeholder="Select Delivery Mode"
            onChange={(val) => updateField("deliveryOption", val)}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Quality & Farm Verification Features
        </label>
        <div className="d-flex flex-wrap gap-2">
          {AGRI_FEATURES.map((feat) => {
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
