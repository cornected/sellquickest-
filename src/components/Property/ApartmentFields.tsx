"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type ApartmentFieldsProps = {
  onChange: (data: object) => void;
};

export function ApartmentFields({ onChange }: ApartmentFieldsProps) {
  const [data, setData] = useState({
    propertyType: "",
    customPropertyType: "",

    listingType: "",
    customListingType: "",

    bedrooms: "",
    customBedrooms: "",

    bathrooms: "",
    customBathrooms: "",

    toilets: "",
    customToilets: "",

    buildingType: "",
    customBuildingType: "",

    furnishingStatus: "",
    customFurnishingStatus: "",

    propertyCondition: "",
    customPropertyCondition: "",

    size: "",

    parking: "",
    customParking: "",

    yearBuilt: "",
    customYearBuilt: "",

    securityFeatures: [] as string[],

    amenities: [] as string[],
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
    key: "securityFeatures" | "amenities",
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

  const years = Array.from({ length: 80 }, (_, index) => String(2026 - index));

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",

        backgroundColor: "#f8fafc",
      }}
    >
      <h5 className="h6 fw-bold mb-3 text-dark">
        🏠 Houses & Apartments Details
      </h5>

      {/* PROPERTY TYPE + LISTING TYPE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="property-type"
            name="propertyType"
            label="Property Type"
            value={data.propertyType}
            customValue={data.customPropertyType}
            onCustomChange={(value) => updateField("customPropertyType", value)}
            options={[
              "Apartment",

              "Duplex",

              "Bungalow",

              "Detached House",

              "Semi Detached House",

              "Terrace House",

              "Mansion",

              "Townhouse",

              "Studio Apartment",

              "Penthouse",
            ]}
            placeholder="Select Property Type"
            allowOther
            onChange={(value) => updateField("propertyType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="listing-type"
            name="listingType"
            label="Listing Type"
            value={data.listingType}
            customValue={data.customListingType}
            onCustomChange={(value) => updateField("customListingType", value)}
            options={["For Sale", "For Rent", "Lease"]}
            placeholder="Select Listing Type"
            allowOther
            onChange={(value) => updateField("listingType", value)}
          />
        </div>
      </div>

      {/* BEDROOMS + BATHROOMS */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="bedrooms"
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

              "4 Bedrooms",

              "5 Bedrooms+",
            ]}
            placeholder="Select Bedrooms"
            allowOther
            onChange={(value) => updateField("bedrooms", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="bathrooms"
            name="bathrooms"
            label="Bathrooms"
            value={data.bathrooms}
            customValue={data.customBathrooms}
            onCustomChange={(value) => updateField("customBathrooms", value)}
            options={["1", "2", "3", "4", "5+"]}
            placeholder="Select Bathrooms"
            allowOther
            onChange={(value) => updateField("bathrooms", value)}
          />
        </div>
      </div>

      {/* TOILETS + BUILDING TYPE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="toilets"
            name="toilets"
            label="Toilets"
            value={data.toilets}
            customValue={data.customToilets}
            onCustomChange={(value) => updateField("customToilets", value)}
            options={["1", "2", "3", "4", "5+"]}
            placeholder="Select Toilets"
            allowOther
            onChange={(value) => updateField("toilets", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="building-type"
            name="buildingType"
            label="Building Type"
            value={data.buildingType}
            customValue={data.customBuildingType}
            onCustomChange={(value) => updateField("customBuildingType", value)}
            options={[
              "New Building",

              "Old Building",

              "Estate",

              "Private Compound",

              "Residential Complex",
            ]}
            placeholder="Select Building Type"
            allowOther
            onChange={(value) => updateField("buildingType", value)}
          />
        </div>
      </div>

      {/* FURNISHING + PROPERTY CONDITION */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="furnishing-status"
            name="furnishingStatus"
            label="Furnishing Status"
            value={data.furnishingStatus}
            customValue={data.customFurnishingStatus}
            onCustomChange={(value) =>
              updateField("customFurnishingStatus", value)
            }
            options={["Furnished", "Semi Furnished", "Unfurnished"]}
            placeholder="Select Furnishing Status"
            allowOther
            onChange={(value) => updateField("furnishingStatus", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="property-condition"
            name="propertyCondition"
            label="Property Condition"
            value={data.propertyCondition}
            customValue={data.customPropertyCondition}
            onCustomChange={(value) =>
              updateField("customPropertyCondition", value)
            }
            options={[
              "Newly Built",

              "Newly Renovated",

              "Good Condition",

              "Needs Renovation",

              "Off Plan",
            ]}
            placeholder="Select Condition"
            allowOther
            onChange={(value) => updateField("propertyCondition", value)}
          />
        </div>
      </div>

      {/* SIZE + PARKING */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Property Size (sqm)
          </label>

          <input
            type="number"
            value={data.size}
            onChange={(e) => updateField("size", e.target.value)}
            placeholder="Enter size in sqm"
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
            id="parking"
            name="parking"
            label="Parking Space"
            value={data.parking}
            customValue={data.customParking}
            onCustomChange={(value) => updateField("customParking", value)}
            options={[
              "No Parking",

              "1 Car Space",

              "2 Car Spaces",

              "3+ Car Spaces",

              "Garage",
            ]}
            placeholder="Select Parking"
            allowOther
            onChange={(value) => updateField("parking", value)}
          />
        </div>
      </div>

      {/* YEAR BUILT */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="year-built"
            name="yearBuilt"
            label="Year Built"
            value={data.yearBuilt}
            customValue={data.customYearBuilt}
            onCustomChange={(value) => updateField("customYearBuilt", value)}
            options={years}
            placeholder="Select Year"
            allowOther
            onChange={(value) => updateField("yearBuilt", value)}
          />
        </div>
      </div>

      {/* SECURITY FEATURES */}

      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Security Features
        </label>

        <div className="row g-2">
          {[
            "Estate Security",

            "CCTV",

            "Security Gate",

            "Fenced Compound",

            "24/7 Security",

            "Alarm System",
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

      {/* AMENITIES */}

      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Amenities
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
            "Swimming Pool",

            "Gym",

            "Balcony",

            "Garden",

            "Air Conditioning",

            "Generator",

            "Water Supply",

            "Elevator",

            "Internet",

            "Children Playground",
          ].map((item) => (
            <div key={item} className="col-12 col-md-4">
              <button
                type="button"
                onClick={() => toggleArrayItem("amenities", item)}
                className={
                  data.amenities.includes(item)
                    ? "btn btn-dark w-100 text-start"
                    : "btn btn-light border w-100 text-start"
                }
                style={{
                  borderRadius: "8px",

                  fontSize: "12px",

                  minHeight: "42px",
                }}
              >
                {data.amenities.includes(item) ? "✓ " : "+ "}

                {item}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
