"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type CommercialPropertyFieldsProps = {
  onChange: (data: object) => void;
};

export function CommercialPropertyFields({
  onChange,
}: CommercialPropertyFieldsProps) {
  const [data, setData] = useState({
    propertyType: "",
    customPropertyType: "",

    listingType: "",
    customListingType: "",

    size: "",

    floorLevel: "",
    customFloorLevel: "",

    numberOfRooms: "",
    customNumberOfRooms: "",

    buildingCondition: "",
    customBuildingCondition: "",

    parkingSpace: "",
    customParkingSpace: "",

    usageType: "",
    customUsageType: "",

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

  const style = {
    borderRadius: "8px",

    fontSize: "13px",

    minHeight: "42px",
  };

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",

        backgroundColor: "#f8fafc",
      }}
    >
      <h5 className="h6 fw-bold mb-3 text-dark">
        🏢 Commercial Property Details
      </h5>

      {/* PROPERTY TYPE + LISTING TYPE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="commercial-property-type"
            name="propertyType"
            label="Property Type"
            value={data.propertyType}
            customValue={data.customPropertyType}
            onCustomChange={(value) => updateField("customPropertyType", value)}
            options={[
              "Shop",

              "Office Building",

              "Plaza",

              "Warehouse",

              "Hotel",

              "Restaurant Space",

              "Retail Space",

              "Commercial Land",

              "Industrial Building",

              "Mall Space",
            ]}
            placeholder="Select Property Type"
            allowOther
            onChange={(value) => updateField("propertyType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="commercial-listing-type"
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

      {/* SIZE + FLOOR LEVEL */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Property Size (sqm)
          </label>

          <input
            type="text"
            value={data.size}
            onChange={(e) => updateField("size", e.target.value)}
            placeholder="Enter size in sqm"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={style}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="floor-level"
            name="floorLevel"
            label="Floor Level"
            value={data.floorLevel}
            customValue={data.customFloorLevel}
            onCustomChange={(value) => updateField("customFloorLevel", value)}
            options={[
              "Ground Floor",

              "1st Floor",

              "2nd Floor",

              "3rd Floor",

              "4th Floor+",

              "Multiple Floors",
            ]}
            placeholder="Select Floor Level"
            allowOther
            onChange={(value) => updateField("floorLevel", value)}
          />
        </div>
      </div>

      {/* NUMBER OF ROOMS + BUILDING CONDITION */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="number-of-rooms"
            name="numberOfRooms"
            label="Number of Rooms"
            value={data.numberOfRooms}
            customValue={data.customNumberOfRooms}
            onCustomChange={(value) =>
              updateField("customNumberOfRooms", value)
            }
            options={[
              "1 Room",

              "2 Rooms",

              "3 Rooms",

              "4 Rooms",

              "5+ Rooms",

              "Open Space",
            ]}
            placeholder="Select Rooms"
            allowOther
            onChange={(value) => updateField("numberOfRooms", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="building-condition"
            name="buildingCondition"
            label="Building Condition"
            value={data.buildingCondition}
            customValue={data.customBuildingCondition}
            onCustomChange={(value) =>
              updateField("customBuildingCondition", value)
            }
            options={[
              "Newly Built",

              "Newly Renovated",

              "Good Condition",

              "Needs Renovation",
            ]}
            placeholder="Select Condition"
            allowOther
            onChange={(value) => updateField("buildingCondition", value)}
          />
        </div>
      </div>

      {/* PARKING SPACE + USAGE TYPE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="parking-space"
            name="parkingSpace"
            label="Parking Space"
            value={data.parkingSpace}
            customValue={data.customParkingSpace}
            onCustomChange={(value) => updateField("customParkingSpace", value)}
            options={[
              "No Parking",

              "Few Spaces",

              "Multiple Spaces",

              "Dedicated Parking",
            ]}
            placeholder="Select Parking"
            allowOther
            onChange={(value) => updateField("parkingSpace", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="usage-type"
            name="usageType"
            label="Usage Type"
            value={data.usageType}
            customValue={data.customUsageType}
            onCustomChange={(value) => updateField("customUsageType", value)}
            options={[
              "Office",

              "Retail",

              "Hospitality",

              "Industrial",

              "Storage",

              "Restaurant",

              "Mixed Use",
            ]}
            placeholder="Select Usage Type"
            allowOther
            onChange={(value) => updateField("usageType", value)}
          />
        </div>
      </div>

      {/* FACILITIES */}

      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Facilities
        </label>

        <div className="row g-2">
          {[
            "Generator",

            "Air Conditioning",

            "Elevator",

            "Reception Area",

            "Conference Room",

            "Kitchen Area",

            "Toilet Facilities",

            "Water Supply",

            "Internet",

            "Loading Area",
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

            "Security Gate",

            "24/7 Security",

            "Alarm System",

            "Fenced Compound",
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
          Key Commercial Features
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
            "Prime Location",

            "High Traffic Area",

            "Main Road Access",

            "Good Parking",

            "Ready For Business",

            "Suitable For Investment",

            "Modern Design",

            "Large Space",

            "Customer Area",

            "Warehouse Space",

            "Good Accessibility",

            "Near Public Transport",
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
