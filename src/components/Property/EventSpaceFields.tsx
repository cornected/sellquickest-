"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type EventSpaceFieldsProps = {
  onChange: (data: object) => void;
};

export function EventSpaceFields({ onChange }: EventSpaceFieldsProps) {
  const [data, setData] = useState({
    venueType: "",
    customVenueType: "",

    capacity: "",
    customCapacity: "",

    indoorOutdoor: "",
    customIndoorOutdoor: "",

    eventTypes: [] as string[],

    parkingCapacity: "",
    customParkingCapacity: "",

    kitchenAvailable: "",
    customKitchenAvailable: "",

    generator: "",
    customGenerator: "",

    soundSystem: "",
    customSoundSystem: "",

    securityFeatures: [] as string[],

    amenities: [] as string[],

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
    key: "eventTypes" | "securityFeatures" | "amenities" | "features",
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
      <h5 className="h6 fw-bold mb-3 text-dark">🎉 Event Space Details</h5>

      {/* VENUE TYPE + CAPACITY */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="venue-type"
            name="venueType"
            label="Venue Type"
            value={data.venueType}
            customValue={data.customVenueType}
            onCustomChange={(value) => updateField("customVenueType", value)}
            options={[
              "Event Hall",

              "Conference Hall",

              "Wedding Venue",

              "Outdoor Space",

              "Garden Venue",

              "Hotel Event Space",

              "Restaurant Venue",

              "Beach Venue",

              "Party Lounge",
            ]}
            placeholder="Select Venue Type"
            allowOther
            onChange={(value) => updateField("venueType", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="capacity"
            name="capacity"
            label="Capacity"
            value={data.capacity}
            customValue={data.customCapacity}
            onCustomChange={(value) => updateField("customCapacity", value)}
            options={[
              "1 - 50 People",

              "50 - 100 People",

              "100 - 300 People",

              "300 - 500 People",

              "500+ People",
            ]}
            placeholder="Select Capacity"
            allowOther
            onChange={(value) => updateField("capacity", value)}
          />
        </div>
      </div>

      {/* INDOOR OUTDOOR + PARKING */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="indoor-outdoor"
            name="indoorOutdoor"
            label="Indoor / Outdoor"
            value={data.indoorOutdoor}
            customValue={data.customIndoorOutdoor}
            onCustomChange={(value) =>
              updateField("customIndoorOutdoor", value)
            }
            options={["Indoor", "Outdoor", "Both Indoor & Outdoor"]}
            placeholder="Select Space Type"
            allowOther
            onChange={(value) => updateField("indoorOutdoor", value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <StyledSelect
            id="parking-capacity"
            name="parkingCapacity"
            label="Parking Capacity"
            value={data.parkingCapacity}
            customValue={data.customParkingCapacity}
            onCustomChange={(value) =>
              updateField("customParkingCapacity", value)
            }
            options={[
              "No Parking",

              "Small Parking",

              "Medium Parking",

              "Large Parking",

              "Dedicated Parking",
            ]}
            placeholder="Select Parking"
            allowOther
            onChange={(value) => updateField("parkingCapacity", value)}
          />
        </div>
      </div>

      {/* KITCHEN + GENERATOR */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="kitchen-available"
            name="kitchenAvailable"
            label="Kitchen Available"
            value={data.kitchenAvailable}
            customValue={data.customKitchenAvailable}
            onCustomChange={(value) =>
              updateField("customKitchenAvailable", value)
            }
            options={["Yes", "No", "Shared Kitchen"]}
            placeholder="Select Kitchen Option"
            allowOther
            onChange={(value) => updateField("kitchenAvailable", value)}
          />
        </div>{" "}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="generator"
            name="generator"
            label="Generator"
            value={data.generator}
            customValue={data.customGenerator}
            onCustomChange={(value) => updateField("customGenerator", value)}
            options={["Available", "Not Available", "Backup Only"]}
            placeholder="Select Generator Option"
            allowOther
            onChange={(value) => updateField("generator", value)}
          />
        </div>
      </div>

      {/* SOUND SYSTEM + EVENT TYPES */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="sound-system"
            name="soundSystem"
            label="Sound System"
            value={data.soundSystem}
            customValue={data.customSoundSystem}
            onCustomChange={(value) => updateField("customSoundSystem", value)}
            options={["Available", "Not Available", "Can Be Provided"]}
            placeholder="Select Sound System"
            allowOther
            onChange={(value) => updateField("soundSystem", value)}
          />
        </div>
      </div>

      {/* EVENT TYPES */}

      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Suitable For
        </label>

        <div className="row g-2">
          {[
            "Wedding",

            "Birthday",

            "Corporate Event",

            "Conference",

            "Meeting",

            "Party",

            "Concert",

            "Photoshoot",
          ].map((item) => (
            <div key={item} className="col-12 col-md-4">
              <button
                type="button"
                onClick={() => toggleArrayItem("eventTypes", item)}
                className={
                  data.eventTypes.includes(item)
                    ? "btn btn-dark w-100 text-start"
                    : "btn btn-light border w-100 text-start"
                }
                style={{
                  borderRadius: "8px",

                  fontSize: "12px",

                  minHeight: "42px",
                }}
              >
                {data.eventTypes.includes(item) ? "✓ " : "+ "}

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
            "Security Guard",

            "CCTV",

            "Security Gate",

            "Fenced Compound",

            "Crowd Control",

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
            "Tables & Chairs",

            "Restrooms",

            "Changing Room",

            "Air Conditioning",

            "Stage",

            "Lighting",

            "Decoration Area",

            "WiFi",

            "Parking",

            "Kitchen",

            "Generator",

            "Water Supply",
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

      {/* FEATURES */}

      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold mb-2">
          Key Event Space Features
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
            "Premium Location",

            "Large Space",

            "Beautiful Decoration",

            "Easy Access",

            "Modern Design",

            "Near Main Road",

            "Outdoor View",

            "Photography Friendly",

            "Spacious Parking",

            "Good Ventilation",

            "Wheelchair Accessible",

            "Public Transport Nearby",
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
