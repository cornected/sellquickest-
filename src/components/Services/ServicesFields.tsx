"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type ServicesFieldsProps = {
  onChange: (data: object) => void;
  subCategoryTitle?: string;
};

const SERVICE_TYPES = [
  "Building & Trades - Electrical & Wiring",
  "Building & Trades - Plumbing & Pipefitting",
  "Building & Trades - Carpentry, Furniture & Woodwork",
  "Building & Trades - Painting, POP Ceiling & Screeding",
  "Building & Trades - Welding & Iron Fabrication",
  "Cleaning & Fumigation - Residential & Office Cleaning",
  "Cleaning & Fumigation - Pest Control & Fumigation",
  "Logistics - Interstate Haulage & Truck Hire",
  "Logistics - Dispatch Rider & On-Demand Delivery",
  "Auto Repair - Mechanic & Engine Diagnostics",
  "Auto Repair - Auto-Electrician & Car AC Repair",
  "Digital & IT - Web, Mobile App & Software Development",
  "Digital & IT - Phone, Laptop & Computer Repair",
  "Events & Entertainment - DJ, Sound & MC Services",
  "Events & Entertainment - Catering, Cakes & Small Chops",
];

const BILLING_TYPES = [
  "Per Job / Project Quote",
  "Per Day / Daily Labour Rate",
  "Per Hour",
  "Per Room / Square Meter",
  "Free Inspection & On-Site Estimate",
];

const SERVICE_FEATURES = [
  "Registered / Certified Professional",
  "Available for Emergency / 24/7 Callout",
  "Home / Office On-Site Service Available",
  "Warranty / Guarantee on Work Done",
  "Over 5+ Years Industry Experience",
  "Own Tools & Diagnostic Equipment Provided",
  "Discounts for Long-Term Contracts",
  "References & Past Projects Portfolio Available",
];

export function ServicesFields({
  onChange,
  subCategoryTitle = "Services",
}: ServicesFieldsProps) {
  const [data, setData] = useState({
    serviceType: "",
    customServiceType: "",
    experienceLevel: "5 - 10 Years Experience",
    pricingModel: "Per Job / Project Quote",
    serviceLocation: "On-site / We Come to You",
    responseTime: "Within 2 - 4 Hours",
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
      <h5 className="h6 fw-bold mb-3 text-dark">🔧 {subCategoryTitle} Specifications</h5>

      {/* SERVICE TYPE & PRICING */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="serv-type"
            name="serviceType"
            label="Service Specialization"
            value={data.serviceType}
            customValue={data.customServiceType}
            onCustomChange={(val) => updateField("customServiceType", val)}
            options={SERVICE_TYPES}
            placeholder="Select Service Specialization"
            allowOther
            onChange={(val) => updateField("serviceType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="serv-price"
            name="pricingModel"
            label="Billing & Pricing Mode"
            value={data.pricingModel}
            options={BILLING_TYPES}
            placeholder="Select Billing Mode"
            onChange={(val) => updateField("pricingModel", val)}
          />
        </div>
      </div>

      {/* EXPERIENCE & LOCATION */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="serv-exp"
            name="experienceLevel"
            label="Experience Level"
            value={data.experienceLevel}
            options={[
              "1 - 3 Years Experience",
              "3 - 5 Years Experience",
              "5 - 10 Years Experience (Master Craftsman)",
              "10+ Years Licensed Contractor",
            ]}
            placeholder="Select Experience"
            onChange={(val) => updateField("experienceLevel", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="serv-loc"
            name="serviceLocation"
            label="Service Delivery Location"
            value={data.serviceLocation}
            options={[
              "On-site / We Come to You (Client Premises)",
              "Workshop / In-Store Service",
              "Remote / Online Delivery",
              "Both On-site and Workshop Options",
            ]}
            placeholder="Select Location Mode"
            onChange={(val) => updateField("serviceLocation", val)}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Service Assurances & Guarantees
        </label>
        <div className="d-flex flex-wrap gap-2">
          {SERVICE_FEATURES.map((feat) => {
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
