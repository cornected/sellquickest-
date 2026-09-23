"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type OfficeFieldsProps = {
  onChange: (data: object) => void;
};

export function OfficeFields({ onChange }: OfficeFieldsProps) {
  const [data, setData] = useState({
    officeType: "",
    customOfficeType: "",

    listingType: "",
    customListingType: "",

    size: "",

    floorLevel: "",
    customFloorLevel: "",

    workstations: "",
    customWorkstations: "",

    numberOfRooms: "",
    customNumberOfRooms: "",

    furnishingStatus: "",
    customFurnishingStatus: "",

    condition: "",
    customCondition: "",

    parkingSpace: "",
    customParkingSpace: "",

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
      <h5 className="h6 fw-bold mb-3 text-dark">🏢 Office Space Details</h5>

      {/* OFFICE TYPE + LISTING TYPE */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="office-type"
            name="officeType"
            label="Office Type"
            value={data.officeType}
            customValue={data.customOfficeType}
            onCustomChange={(value) => updateField("customOfficeType", value)}
            options={[
              "Private Office",

              "Shared Office",

              "Coworking Space",

              "Corporate Office",

              "Business Suite",

              "Virtual Office",

              "Meeting Room",

              "Executive Office",
            ]}
            placeholder="Select Office Type"
            allowOther
            onChange={(value) => updateField("officeType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="office-listing-type"
            name="listingType"
            label="Listing Type"
            value={data.listingType}
            customValue={data.customListingType}
            onCustomChange={(value) => updateField("customListingType", value)}
            options={["For Rent", "For Sale", "Lease", "Daily Rental"]}
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
            Office Size (sqm)
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
            id="office-floor"
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

      {/* WORKSTATIONS + ROOMS */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="workstations"
            name="workstations"
            label="Number of Workstations"
            value={data.workstations}
            customValue={data.customWorkstations}
            onCustomChange={(value) => updateField("customWorkstations", value)}
            options={["1 - 5", "5 - 10", "10 - 25", "25 - 50", "50+"]}
            placeholder="Select Workstations"
            allowOther
            onChange={(value) => updateField("workstations", value)}
          />
        </div>

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

              "Open Plan",

              "Multiple Rooms",
            ]}
            placeholder="Select Rooms"
            allowOther
            onChange={(value) => updateField("numberOfRooms", value)}
          />
        </div>
      </div>

      {/* FURNISHING + CONDITION */}

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
            options={["Fully Furnished", "Semi Furnished", "Unfurnished"]}
            placeholder="Select Furnishing Status"
            allowOther
            onChange={(value) => updateField("furnishingStatus", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="office-condition"
            name="condition"
            label="Office Condition"
            value={data.condition}
            customValue={data.customCondition}
            onCustomChange={(value) => updateField("customCondition", value)}
            options={[
              "Newly Built",

              "Newly Renovated",

              "Good Condition",

              "Needs Renovation",
            ]}
            placeholder="Select Condition"
            allowOther
            onChange={(value) => updateField("condition", value)}
          />
        </div>
      </div>

      {/* PARKING SPACE */}

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
      </div>

      {/* FACILITIES */}

      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Facilities
        </label>

        <div className="row g-2">
          {[
            "Generator",

            "Internet",

            "Air Conditioning",

            "Reception Area",

            "Conference Room",

            "Kitchen",

            "Toilet Facilities",

            "Elevator",

            "Meeting Room",

            "Backup Power",
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

            "Security Gate",

            "Fenced Compound",

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

      {/* FEATURES */}

      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Key Office Features
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
            "Prime Business Location",

            "Modern Interior",

            "Near Transport Hub",

            "High Speed Internet",

            "Ready To Move In",

            "Professional Environment",

            "Good Accessibility",

            "Corporate Building",

            "Reception Area",

            "Executive Space",
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
