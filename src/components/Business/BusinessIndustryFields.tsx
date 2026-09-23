"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type BusinessIndustryFieldsProps = {
  onChange: (data: object) => void;
  subCategoryTitle?: string;
};

const BUSINESS_SALE_TYPES = [
  "Supermarket / Grocery Mart (Fully Stocked)",
  "Retail Community Pharmacy (PCN Licensed)",
  "Bakery & Confectionery (Active Customers)",
  "Restaurant, Lounge & Bar (Turnkey Setup)",
  "Nursery & Primary / Secondary School",
  "Automobile Workshop & Car Wash Centre",
  "Hotel / Guest House / Shortlet Apartments",
  "Filling Station (DPR Licensed & Tanks)",
  "Dry Cleaning & Laundry Business",
];

const RAW_MATERIALS_TYPES = [
  "Plastic Injection & Blow Polymers (PP, PE, PET)",
  "Industrial Chemicals & Solvents",
  "Packaging Materials (Cartons, Polybags, Caps)",
  "Textile, Fabric & Garment Raw Materials",
  "Paints & Resin Raw Materials",
  "Paper Pulp & Board Raw Materials",
  "Cosmetics & Soap Base Chemicals",
];

const WHOLESALE_TYPES = [
  "Clearance Container Load (40ft / 20ft)",
  "Wholesale Electronics & Mobile Accessories",
  "Wholesale Clothing & Bale Shoes",
  "Wholesale Fast Moving Consumer Goods (FMCG)",
  "Pallet Wholesale / Liquidation Stock",
  "Factory Overstock & Surplus Lots",
];

const FRANCHISE_TYPES = [
  "Fast Food & Restaurant Franchise License",
  "State / Regional Authorized Dealership Rights",
  "FMCG Distribution Franchise",
  "Logistics & Delivery Hub Franchise",
  "Solar & Inverter Dealership Partnership",
];

const SAFETY_TYPES = [
  "Industrial Safety Boots (Steel Toe Cap)",
  "Fire Extinguishers (CO2, Foam, ABC Powder)",
  "High Visibility Reflective Vests & Coveralls",
  "Safety Helmets & Hard Hats",
  "Fall Protection Safety Harness & Lanyards",
  "Industrial Respiratory Gas Masks & Filters",
];

const TRANSACTION_TYPES = [
  "Outright Business Sale (100% Equity)",
  "Partnership / Partial Equity Stake (Share)",
  "Wholesale / Container Load Sale",
  "Monthly / Annual Supply Contract",
  "Authorized Dealership / Franchise Rights",
  "Auction / Liquidation Clearance",
];

const SECTOR_OPTIONS = [
  "Retail & Supermarkets",
  "Healthcare & Pharmaceuticals",
  "Food, Hospitality & Dining",
  "Education & Childcare",
  "Manufacturing & Industrial",
  "Energy, Oil & Gas",
  "Logistics & Warehousing",
  "Mining & Heavy Industry",
];

const COMPLIANCE_OPTIONS = [
  "CAC Registered (RC / BN) & Tax Compliant",
  "Fully Audited Accounts & Financial Books",
  "Regulatory Licenses Current (NAFDAC, PCN, etc.)",
  "Long-Term Lease Agreement Transferable",
  "Free from All Debts & Bank Liabilities",
  "Staff & Management Trained to Stay",
  "Includes Full Inventory & Fixtures",
  "Prime High-Footfall Commercial Location",
];

export function BusinessIndustryFields({
  onChange,
  subCategoryTitle = "Business & Industry",
}: BusinessIndustryFieldsProps) {
  const isRaw = subCategoryTitle.toLowerCase().includes("raw") || subCategoryTitle.toLowerCase().includes("chem");
  const isWholesale = subCategoryTitle.toLowerCase().includes("wholesale") || subCategoryTitle.toLowerCase().includes("bulk");
  const isFranchise = subCategoryTitle.toLowerCase().includes("franchis") || subCategoryTitle.toLowerCase().includes("dealer");
  const isSafety = subCategoryTitle.toLowerCase().includes("safe") || subCategoryTitle.toLowerCase().includes("ppe");

  const itemTypes = isRaw
    ? RAW_MATERIALS_TYPES
    : isWholesale
    ? WHOLESALE_TYPES
    : isFranchise
    ? FRANCHISE_TYPES
    : isSafety
    ? SAFETY_TYPES
    : BUSINESS_SALE_TYPES;

  const itemLabel = isRaw
    ? "Material / Chemical Type"
    : isWholesale
    ? "Bulk Wholesale Category"
    : isFranchise
    ? "Franchise / Dealership Opportunity"
    : isSafety
    ? "Safety & PPE Product"
    : "Business Type For Sale";

  const turnoverPlaceholder = isRaw || isWholesale
    ? "e.g. 20 Tons Minimum Order, 500 Cartons in Stock"
    : isFranchise
    ? "e.g. Exclusive State Territory, 25% Expected ROI"
    : isSafety
    ? "e.g. 500 Pairs Minimum, CE EN ISO 20345 Certified"
    : "e.g. ₦3.5M - ₦6.0M Monthly Average Revenue, 30% Net Margin";

  const [data, setData] = useState({
    businessOrItemType: "",
    customItemType: "",
    sector: "Retail & Supermarkets",
    transactionType: "Outright Business Sale (100% Equity)",
    financialsOrVolume: "",
    legalEntityName: "",
    complianceFeatures: [] as string[],
  });

  const updateField = (key: string, value: unknown) => {
    const updated = { ...data, [key]: value };
    setData(updated);
    onChange(updated);
  };

  const toggleFeature = (feat: string) => {
    const updated = data.complianceFeatures.includes(feat)
      ? data.complianceFeatures.filter((item) => item !== feat)
      : [...data.complianceFeatures, feat];
    updateField("complianceFeatures", updated);
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
        🏢 {subCategoryTitle} Specifications
      </h5>

      {/* ITEM TYPE & SECTOR */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="biz-item-type"
            name="businessOrItemType"
            label={itemLabel}
            value={data.businessOrItemType}
            customValue={data.customItemType}
            onCustomChange={(val) => updateField("customItemType", val)}
            options={itemTypes}
            placeholder={`Select ${itemLabel}`}
            allowOther
            onChange={(val) => updateField("businessOrItemType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="biz-sector"
            name="sector"
            label="Industry Sector"
            value={data.sector}
            options={SECTOR_OPTIONS}
            placeholder="Select Sector"
            onChange={(val) => updateField("sector", val)}
          />
        </div>
      </div>

      {/* TRANSACTION TYPE & FINANCIALS/VOLUME */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="biz-transaction-type"
            name="transactionType"
            label="Deal / Transaction Type"
            value={data.transactionType}
            options={TRANSACTION_TYPES}
            placeholder="Select Deal Type"
            onChange={(val) => updateField("transactionType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Turnover / Revenue / Volume / MOQ
          </label>
          <input
            value={data.financialsOrVolume}
            onChange={(e) => updateField("financialsOrVolume", e.target.value)}
            placeholder={turnoverPlaceholder}
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* BUSINESS / BRAND NAME */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-12">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Business / Brand / Facility Name (Optional for Confidentiality)
          </label>
          <input
            value={data.legalEntityName}
            onChange={(e) => updateField("legalEntityName", e.target.value)}
            placeholder="e.g. Registered Supermarket in Victoria Island (or keep anonymous: 'Prime Pharmacy in Ikeja')"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* DUE DILIGENCE & ASSET INCLUSIONS */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Due Diligence, Documentation & Asset Inclusions
        </label>
        <div className="d-flex flex-wrap gap-2">
          {COMPLIANCE_OPTIONS.map((feat) => {
            const isSelected = data.complianceFeatures.includes(feat);
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
