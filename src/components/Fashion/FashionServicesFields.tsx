"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { FashionFeatures } from "./FashionFeatures";

type FashionServicesFieldsProps = {
  onChange: (data: object) => void;
};

const SERVICE_TYPES = [
  "Custom Bespoke Tailoring & Fashion Designing (Men's & Women's)",
  "Bespoke Men's Tailoring (Senator, Agbada & Suits)",
  "Women's Bridal & Event Couture Dressmaking",
  "Dry Cleaning, Laundry & Steam Pressing",
  "Clothing Alterations, Repair & Resizing",
  "Wig Revamping, Laundry & Styling Services",
  "Shoe & Bag Repair, Cobbling & Restoration",
  "Embroidery, Monogramming & Stoning Services",
  "Makeup Artistry (Bridal / Gele Tying / Studio)",
  "Fashion Modeling & Photography",
  "Fashion Academy & Tailoring Training",
];

const SERVICE_MODES = [
  "Physical Shop / Atelier Walk-In",
  "Home / Office Service (Artisan Travels to You)",
  "Nationwide Delivery / Mail-in Service (Send by Waybill)",
  "Both Walk-In and Home Service Available",
];

const TURNAROUND_TIMES = [
  "Same-Day Express Service (within 24 hours)",
  "1 - 3 Business Days",
  "3 - 7 Business Days (Standard)",
  "1 - 2 Weeks (Bridal / Intricate Couture)",
];

const PRICING_MODELS = [
  "Fixed Price per Garment / Service",
  "Negotiable / Quote Based on Design Complexity",
  "Per Yard / Per Item Rate",
  "Subscription / Bulk Corporate Rate",
];

export function FashionServicesFields({
  onChange,
}: FashionServicesFieldsProps) {
  const [data, setData] = useState({
    serviceType: "",
    customServiceType: "",
    serviceMode: "",
    turnaroundTime: "",
    pricingModel: "",
    experienceLevel: "",
    homeServiceAvailable: "",
    rushServiceAvailable: "",
    fabricSourcing: "",
    portfolioLink: "",
    locationCoverage: "",
    customLocationCoverage: "",
    availability: "",
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

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="fs-5">✂️</span>
        <h5 className="h6 fw-bold mb-0 text-dark">
          Fashion Services Details
        </h5>
      </div>

      <div className="row g-3 mb-4">
        {/* SERVICE TYPE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fashion-service-type"
            name="serviceType"
            label="Service Offered"
            value={data.serviceType}
            customValue={data.customServiceType}
            onCustomChange={(val: string) => updateField("customServiceType", val)}
            options={SERVICE_TYPES}
            placeholder="Select Fashion Service"
            allowOther
            onChange={(val: string) => updateField("serviceType", val)}
          />
        </div>

        {/* SERVICE MODE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fashion-service-mode"
            name="serviceMode"
            label="Service Delivery Mode"
            value={data.serviceMode}
            options={SERVICE_MODES}
            placeholder="Select Delivery Mode"
            onChange={(val: string) => updateField("serviceMode", val)}
          />
        </div>

        {/* TURNAROUND TIME */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fashion-turnaround"
            name="turnaroundTime"
            label="Average Turnaround / Delivery Time"
            value={data.turnaroundTime}
            options={TURNAROUND_TIMES}
            placeholder="Select Turnaround Time"
            onChange={(val: string) => updateField("turnaroundTime", val)}
          />
        </div>

        {/* PRICING STRUCTURE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fashion-pricing"
            name="pricingModel"
            label="Pricing Structure"
            value={data.pricingModel}
            options={PRICING_MODELS}
            placeholder="Select Pricing Model"
            onChange={(val: string) => updateField("pricingModel", val)}
          />
        </div>

        {/* YEARS OF EXPERIENCE / REPUTATION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fashion-experience"
            name="experienceLevel"
            label="Professional Experience"
            value={data.experienceLevel}
            options={[
              "10+ Years Master Tailor / Specialist",
              "5 - 10 Years Experienced Artisan",
              "2 - 5 Years Skilled Professional",
              "Certified Fashion Design Academy Graduate",
            ]}
            placeholder="Select Experience Level"
            onChange={(val: string) => updateField("experienceLevel", val)}
          />
        </div>

        {/* HOME FITTING / TRAVEL */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fashion-home-service"
            name="homeServiceAvailable"
            label="Home / Office Measurement & Fitting"
            value={data.homeServiceAvailable}
            options={[
              "Yes - We Come to Your Home/Office for Measurement",
              "Available at an Extra Travel Fee",
              "Client Visits Our Studio / Shop Only",
              "Remote Measurement Guide Provided (Virtual Fitting)",
            ]}
            placeholder="Select Fitting Option"
            onChange={(val: string) =>
              updateField("homeServiceAvailable", val)
            }
          />
        </div>

        {/* EXPRESS / RUSH ORDERS */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fashion-rush"
            name="rushServiceAvailable"
            label="Express / Emergency Rush Orders"
            value={data.rushServiceAvailable}
            options={[
              "Accepts Urgent 24-48hr Rush Orders",
              "Available with Express Surcharge",
              "Strict Advance Booking Only",
            ]}
            placeholder="Select Rush Order Policy"
            onChange={(val: string) =>
              updateField("rushServiceAvailable", val)
            }
          />
        </div>

        {/* FABRIC SOURCING */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fashion-fabric-sourcing"
            name="fabricSourcing"
            label="Fabric Provision"
            value={data.fabricSourcing}
            options={[
              "Client Provides Fabric Only",
              "We Can Source Luxury Fabric for Client",
              "Both Options Available (Bring Material or Buy Ours)",
            ]}
            placeholder="Select Fabric Sourcing"
            onChange={(val: string) => updateField("fabricSourcing", val)}
          />
        </div>
      </div>

      <div className="mt-4">
        <FashionFeatures data={data} updateField={updateField} />
      </div>
    </section>
  );
}
