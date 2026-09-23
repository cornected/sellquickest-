"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type ShortLetFieldsProps = {
  onChange: (data: object) => void;
};

export function ShortLetFields({ onChange }: ShortLetFieldsProps) {
  const [data, setData] = useState({
    propertyType: "",
    customPropertyType: "",

    bedrooms: "",
    customBedrooms: "",

    bathrooms: "",
    customBathrooms: "",

    guestsAllowed: "",
    customGuestsAllowed: "",

    minimumStay: "",
    customMinimumStay: "",

    furnishingStatus: "",
    customFurnishingStatus: "",

    availability: "",
    customAvailability: "",

    propertyRules: [] as string[],

    amenities: [] as string[],

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
    key: "propertyRules" | "amenities" | "securityFeatures" | "features",
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
      <h5 className="h6 fw-bold mb-3 text-dark">🏡 Short Let Details</h5>

      {/* PROPERTY TYPE + BEDROOMS */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="shortlet-property-type"
            name="propertyType"
            label="Property Type"
            value={data.propertyType}
            customValue={data.customPropertyType}
            onCustomChange={(value) => updateField("customPropertyType", value)}
            options={[
              "Apartment",

              "Studio Apartment",

              "Hotel Room",

              "Villa",

              "Guest House",

              "Duplex",

              "Bungalow",

              "Penthouse",

              "Resort",
            ]}
            placeholder="Select Property Type"
            allowOther
            onChange={(value) => updateField("propertyType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="shortlet-bedrooms"
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
      </div>

      {/* BATHROOMS + GUESTS */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="shortlet-bathrooms"
            name="bathrooms"
            label="Bathrooms"
            value={data.bathrooms}
            customValue={data.customBathrooms}
            onCustomChange={(value) => updateField("customBathrooms", value)}
            options={["1", "2", "3", "4+"]}
            placeholder="Select Bathrooms"
            allowOther
            onChange={(value) => updateField("bathrooms", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="guests-allowed"
            name="guestsAllowed"
            label="Guests Allowed"
            value={data.guestsAllowed}
            customValue={data.customGuestsAllowed}
            onCustomChange={(value) =>
              updateField("customGuestsAllowed", value)
            }
            options={[
              "1 - 2 Guests",

              "3 - 5 Guests",

              "6 - 10 Guests",

              "10+ Guests",
            ]}
            placeholder="Select Guests"
            allowOther
            onChange={(value) => updateField("guestsAllowed", value)}
          />
        </div>
      </div>

      {/* MINIMUM STAY + FURNISHING */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="minimum-stay"
            name="minimumStay"
            label="Minimum Stay"
            value={data.minimumStay}
            customValue={data.customMinimumStay}
            onCustomChange={(value) => updateField("customMinimumStay", value)}
            options={[
              "Per Night",

              "2 Nights Minimum",

              "Weekly",

              "Monthly",

              "Custom",
            ]}
            placeholder="Select Stay Duration"
            allowOther
            onChange={(value) => updateField("minimumStay", value)}
          />
        </div>
        {/* FURNISHING STATUS + AVAILABILITY */}
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
            options={["Fully Furnished", "Semi Furnished", "Unfurnished"]}
            placeholder="Select Furnishing Status"
            allowOther
            onChange={(value) => updateField("furnishingStatus", value)}
          />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="availability"
            name="availability"
            label="Availability"
            value={data.availability}
            customValue={data.customAvailability}
            onCustomChange={(value) => updateField("customAvailability", value)}
            options={[
              "Available Now",

              "Available Soon",

              "Seasonal Availability",
            ]}
            placeholder="Select Availability"
            allowOther
            onChange={(value) => updateField("availability", value)}
          />
        </div>
      </div>

      {/* PROPERTY RULES */}

      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Property Rules
        </label>

        <div className="row g-2">
          {[
            "No Smoking",

            "No Parties",

            "Pets Allowed",

            "Children Allowed",

            "Check-in Required",

            "ID Required",
          ].map((item) => (
            <div key={item} className="col-12 col-md-4">
              <button
                type="button"
                onClick={() => toggleArrayItem("propertyRules", item)}
                className={
                  data.propertyRules.includes(item)
                    ? "btn btn-dark w-100 text-start"
                    : "btn btn-light border w-100 text-start"
                }
                style={{
                  borderRadius: "8px",

                  fontSize: "12px",

                  minHeight: "42px",
                }}
              >
                {data.propertyRules.includes(item) ? "✓ " : "+ "}

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

        <div className="row g-2">
          {[
            "Swimming Pool",

            "WiFi",

            "Air Conditioning",

            "Generator",

            "Kitchen",

            "Parking",

            "TV",

            "Washing Machine",

            "Gym",

            "Balcony",
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

            "Smart Lock",

            "Gated Compound",
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
          Key Short Let Features
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
            "Luxury Interior",

            "Sea View",

            "City View",

            "Near Airport",

            "Near Beach",

            "Family Friendly",

            "Business Friendly",

            "Modern Design",

            "Daily Cleaning",

            "Room Service",
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
