"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type WarehouseFieldsProps = {
  onChange: (data: object) => void;
};

export function WarehouseFields({ onChange }: WarehouseFieldsProps) {
  const [data, setData] = useState({
    propertyType: "",
    customPropertyType: "",

    listingType: "",
    customListingType: "",

    size: "",

    ceilingHeight: "",
    customCeilingHeight: "",

    storageCapacity: "",
    customStorageCapacity: "",

    loadingAccess: "",
    customLoadingAccess: "",

    truckAccess: "",
    customTruckAccess: "",

    powerSupply: "",
    customPowerSupply: "",

    officeSpace: "",
    customOfficeSpace: "",

    securityFeatures: [] as string[],

    facilities: [] as string[],

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
    key: "securityFeatures" | "facilities" | "features",
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
      <h5 className="h6 fw-bold mb-3 text-dark">
        🏭 Warehouse & Industrial Property Details
      </h5>

      {/* PROPERTY TYPE + LISTING TYPE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="warehouse-property-type"
            name="propertyType"
            label="Property Type"
            value={data.propertyType}
            customValue={data.customPropertyType}
            onCustomChange={(value) => updateField("customPropertyType", value)}
            options={[
              "Warehouse",

              "Factory",

              "Industrial Building",

              "Storage Facility",

              "Distribution Center",

              "Cold Storage",

              "Logistics Hub",

              "Workshop",
            ]}
            placeholder="Select Property Type"
            allowOther
            onChange={(value) => updateField("propertyType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="warehouse-listing-type"
            name="listingType"
            label="Listing Type"
            value={data.listingType}
            customValue={data.customListingType}
            onCustomChange={(value) => updateField("customListingType", value)}
            options={["For Rent", "For Sale", "Lease"]}
            placeholder="Select Listing Type"
            allowOther
            onChange={(value) => updateField("listingType", value)}
          />
        </div>
      </div>

      {/* SIZE + CEILING HEIGHT */}

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
            style={{
              borderRadius: "8px",

              fontSize: "13px",

              minHeight: "42px",
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="ceiling-height"
            name="ceilingHeight"
            label="Ceiling Height"
            value={data.ceilingHeight}
            customValue={data.customCeilingHeight}
            onCustomChange={(value) =>
              updateField("customCeilingHeight", value)
            }
            options={["Standard Height", "High Ceiling", "Very High Ceiling"]}
            placeholder="Select Ceiling Height"
            allowOther
            onChange={(value) => updateField("ceilingHeight", value)}
          />
        </div>
      </div>

      {/* STORAGE CAPACITY + LOADING ACCESS */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="storage-capacity"
            name="storageCapacity"
            label="Storage Capacity"
            value={data.storageCapacity}
            customValue={data.customStorageCapacity}
            onCustomChange={(value) =>
              updateField("customStorageCapacity", value)
            }
            options={[
              "Small Storage",

              "Medium Storage",

              "Large Storage",

              "Heavy Industrial Storage",
            ]}
            placeholder="Select Storage Capacity"
            allowOther
            onChange={(value) => updateField("storageCapacity", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="loading-access"
            name="loadingAccess"
            label="Loading Access"
            value={data.loadingAccess}
            customValue={data.customLoadingAccess}
            onCustomChange={(value) =>
              updateField("customLoadingAccess", value)
            }
            options={[
              "Ground Level Loading",

              "Loading Bay",

              "Dock Loading",

              "No Loading Area",
            ]}
            placeholder="Select Loading Access"
            allowOther
            onChange={(value) => updateField("loadingAccess", value)}
          />
        </div>
      </div>

      {/* TRUCK ACCESS + POWER SUPPLY */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="truck-access"
            name="truckAccess"
            label="Truck Access"
            value={data.truckAccess}
            customValue={data.customTruckAccess}
            onCustomChange={(value) => updateField("customTruckAccess", value)}
            options={[
              "Small Trucks",

              "Large Trucks",

              "Trailers",

              "No Truck Access",
            ]}
            placeholder="Select Truck Access"
            allowOther
            onChange={(value) => updateField("truckAccess", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="power-supply"
            name="powerSupply"
            label="Power Supply"
            value={data.powerSupply}
            customValue={data.customPowerSupply}
            onCustomChange={(value) => updateField("customPowerSupply", value)}
            options={[
              "Public Electricity",

              "Industrial Power",

              "Generator Available",

              "Solar Power",

              "No Power",
            ]}
            placeholder="Select Power Supply"
            allowOther
            onChange={(value) => updateField("powerSupply", value)}
          />
        </div>
      </div>

      {/* POWER SUPPLY + OFFICE SPACE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="office-space"
            name="officeSpace"
            label="Office Space Available"
            value={data.officeSpace}
            customValue={data.customOfficeSpace}
            onCustomChange={(value) => updateField("customOfficeSpace", value)}
            options={["Yes", "No", "Small Office", "Multiple Offices"]}
            placeholder="Select Office Option"
            allowOther
            onChange={(value) => updateField("officeSpace", value)}
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
            "CCTV",

            "Security Guard",

            "Fenced Compound",

            "Security Gate",

            "24/7 Security",

            "Access Control",
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

      {/* FACILITIES */}

      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Facilities
        </label>

        <div className="row g-2">
          {[
            "Generator",

            "Water Supply",

            "Parking Area",

            "Loading Area",

            "Warehouse Shelving",

            "Staff Area",

            "Toilets",

            "Changing Room",
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

      {/* FEATURES */}

      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Key Industrial Features
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
            "Prime Industrial Location",

            "Near Highway",

            "Large Open Space",

            "Easy Truck Access",

            "Suitable For Manufacturing",

            "Suitable For Storage",

            "Good Road Network",

            "Ready For Operation",

            "Heavy Duty Use",

            "Large Parking Area",

            "Loading Friendly",

            "Logistics Suitable",
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
