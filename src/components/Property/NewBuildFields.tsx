"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type NewBuildFieldsProps = {
  onChange: (data: object) => void;
};

export function NewBuildFields({ onChange }: NewBuildFieldsProps) {
  const [data, setData] = useState({
    propertyType: "",
    customPropertyType: "",

    developmentName: "",

    developerName: "",

    constructionStatus: "",
    customConstructionStatus: "",

    completionDate: "",

    numberOfUnits: "",
    customNumberOfUnits: "",

    bedrooms: "",
    customBedrooms: "",

    bathrooms: "",
    customBathrooms: "",

    paymentPlan: "",
    customPaymentPlan: "",

    facilities: [] as string[],

    securityFeatures: [] as string[],

    features: [] as string[],
  });

  const updateField = (key: string, value: string) => {
    const updated = {
      ...data,

      [key]: value,
    };

    setData(updated);

    onChange(updated);
  };

  const toggleArrayItem = (
    key: "facilities" | "securityFeatures" | "features",
    value: string,
  ) => {
    const current = data[key];

    const updatedArray = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    const updated = {
      ...data,

      [key]: updatedArray,
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
      <h5 className="h6 fw-bold mb-3 text-dark">🏗️ New Build Details</h5>
      {/* PROPERTY TYPE + DEVELOPMENT NAME */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="newbuild-property-type"
            name="propertyType"
            label="Property Type"
            value={data.propertyType}
            customValue={data.customPropertyType}
            onCustomChange={(value) => updateField("customPropertyType", value)}
            options={[
              "Apartment",

              "Duplex",

              "Terrace House",

              "Detached House",

              "Semi Detached House",

              "Estate",

              "Villa",
            ]}
            placeholder="Select Property Type"
            allowOther
            onChange={(value) => updateField("propertyType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Development Name
          </label>

          <input
            type="text"
            value={data.developmentName}
            onChange={(e) => updateField("developmentName", e.target.value)}
            placeholder="Enter development name"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{
              borderRadius: "8px",

              fontSize: "13px",

              minHeight: "42px",
            }}
          />
        </div>
      </div>
      {/* DEVELOPER + CONSTRUCTION STATUS */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Developer Name
          </label>

          <input
            type="text"
            value={data.developerName}
            onChange={(e) => updateField("developerName", e.target.value)}
            placeholder="Enter developer/company name"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{
              borderRadius: "8px",

              fontSize: "13px",

              minHeight: "42px",
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="construction-status"
            name="constructionStatus"
            label="Construction Status"
            value={data.constructionStatus}
            customValue={data.customConstructionStatus}
            onCustomChange={(value) =>
              updateField("customConstructionStatus", value)
            }
            options={[
              "Off Plan",

              "Under Construction",

              "Almost Completed",

              "Completed",

              "Ready To Move In",
            ]}
            placeholder="Select Status"
            allowOther
            onChange={(value) => updateField("constructionStatus", value)}
          />
        </div>
      </div>
      {/* COMPLETION DATE + NUMBER OF UNITS */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Expected Completion Date
          </label>

          <input
            type="text"
            value={data.completionDate}
            onChange={(e) => updateField("completionDate", e.target.value)}
            placeholder="e.g. December 2027"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{
              borderRadius: "8px",

              fontSize: "13px",

              minHeight: "42px",
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="number-of-units"
            name="numberOfUnits"
            label="Number of Units"
            value={data.numberOfUnits}
            customValue={data.customNumberOfUnits}
            onCustomChange={(value) =>
              updateField("customNumberOfUnits", value)
            }
            options={[
              "1 - 10 Units",

              "10 - 50 Units",

              "50 - 100 Units",

              "100+ Units",
            ]}
            placeholder="Select Units"
            allowOther
            onChange={(value) => updateField("numberOfUnits", value)}
          />
        </div>
      </div>
      {/* BEDROOMS + BATHROOMS */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="newbuild-bedrooms"
            name="bedrooms"
            label="Bedrooms"
            value={data.bedrooms}
            customValue={data.customBedrooms}
            onCustomChange={(value) => updateField("customBedrooms", value)}
            options={[
              "Studio",

              "1 Bedroom",

              "2 Bedrooms",

              "3 Bedrooms",

              "4 Bedrooms+",
            ]}
            placeholder="Select Bedrooms"
            allowOther
            onChange={(value) => updateField("bedrooms", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="newbuild-bathrooms"
            name="bathrooms"
            label="Bathrooms"
            value={data.bathrooms}
            customValue={data.customBathrooms}
            onCustomChange={(value) => updateField("customBathrooms", value)}
            options={[
              "1 Bathroom",

              "2 Bathrooms",

              "3 Bathrooms",

              "4+ Bathrooms",
            ]}
            placeholder="Select Bathrooms"
            allowOther
            onChange={(value) => updateField("bathrooms", value)}
          />
        </div>
      </div>
      {/* PAYMENT PLAN */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="payment-plan"
            name="paymentPlan"
            label="Payment Plan Available"
            value={data.paymentPlan}
            customValue={data.customPaymentPlan}
            onCustomChange={(value) => updateField("customPaymentPlan", value)}
            options={[
              "Full Payment",

              "Installment Payment",

              "Mortgage Available",

              "Flexible Payment Plan",

              "Not Available",
            ]}
            placeholder="Select Payment Option"
            allowOther
            onChange={(value) => updateField("paymentPlan", value)}
          />
        </div>
      </div>
      {/* FACILITIES */}
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Estate Facilities
        </label>

        <div className="row g-2">
          {[
            "Swimming Pool",

            "Gym",

            "Children Playground",

            "Green Area",

            "Shopping Area",

            "Generator",

            "Water Supply",

            "Parking Space",

            "Club House",

            "Elevator",
          ].map((item) => (
            <div key={item} className="col-12 col-md-4">
              <button
                type="button"
                onClick={() => toggleArrayItem("facilities", item)}
                className={
                  data.facilities.includes(item)
                    ? "btn btn-dark w-100 text-start"
                    : "btn btn-light border w-100 text-start"
                }
                style={{
                  borderRadius: "8px",

                  fontSize: "12px",

                  minHeight: "42px",
                }}
              >
                {data.facilities.includes(item) ? "✓ " : "+ "}

                {item}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* SECURITY FEATURES */}
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Security Features
        </label>

        <div className="row g-2">
          {[
            "CCTV",

            "Security Guard",

            "Estate Security",

            "Fenced Compound",

            "Security Gate",

            "Access Control",

            "24/7 Security",
          ].map((item) => (
            <div key={item} className="col-12 col-md-4">
              <button
                type="button"
                onClick={() => toggleArrayItem("securityFeatures", item)}
                className={
                  data.securityFeatures.includes(item)
                    ? "btn btn-dark w-100 text-start"
                    : "btn btn-light border w-100 text-start"
                }
                style={{
                  borderRadius: "8px",

                  fontSize: "12px",

                  minHeight: "42px",
                }}
              >
                {data.securityFeatures.includes(item) ? "✓ " : "+ "}

                {item}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* FEATURES */}
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Key New Build Features
        </label>

        <div
          className="row g-2"
          style={{
            maxHeight: "260px",

            overflowY: "auto",

            paddingRight: "5px",
          }}
        >
          {[
            "Modern Architecture",

            "Prime Location",

            "Smart Home Features",

            "Luxury Finishes",

            "Investment Opportunity",

            "Good Road Access",

            "Family Friendly",

            "Ready To Move In",

            "Near Schools",

            "Near Shopping Areas",

            "High Rental Demand",

            "Eco Friendly Design",
          ].map((feature) => (
            <div key={feature} className="col-12 col-md-4">
              <button
                type="button"
                onClick={() => toggleArrayItem("features", feature)}
                className={
                  data.features.includes(feature)
                    ? "btn btn-dark w-100 text-start"
                    : "btn btn-light border w-100 text-start"
                }
                style={{
                  borderRadius: "8px",

                  fontSize: "12px",

                  minHeight: "42px",
                }}
              >
                {data.features.includes(feature) ? "✓ " : "+ "}

                {feature}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
