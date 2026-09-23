"use client";

import { StyledSelect } from "../../StyledSelect";

type LuggageFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function LuggageFields({ data, updateField }: LuggageFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">
          🧳 Luggage & Travel Suitcase Details
        </h6>
      </div>

      {/* LUGGAGE SIZE / CAPACITY */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="luggage-size"
          name="luggageSize"
          label="Suitcase Size / Capacity"
          value={data.luggageSize}
          customValue={data.customLuggageSize}
          onCustomChange={(val: string) => updateField("customLuggageSize", val)}
          options={[
            "Small Cabin / Carry-On (18 - 20 Inches / ~35L)",
            "Medium Checked (24 - 26 Inches / ~65L)",
            "Large Checked (28 - 30 Inches / ~95L)",
            "Extra Large (32+ Inches / Jumbo)",
            "Luggage Set (2-Piece Set)",
            "Luggage Set (3-Piece Full Family Set)",
            "Luggage Set (4-Piece Set)",
          ]}
          placeholder="Select Size / Set"
          allowOther
          onChange={(val: string) => updateField("luggageSize", val)}
        />
      </div>

      {/* CASING TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="luggage-casing"
          name="luggageCasing"
          label="Shell / Casing Type"
          value={data.luggageCasing}
          customValue={data.customLuggageCasing}
          onCustomChange={(val: string) =>
            updateField("customLuggageCasing", val)
          }
          options={[
            "Hard Shell (Polycarbonate / ABS - Impact Resistant)",
            "Soft Shell (High-Density Ballistic Nylon / Polyester)",
            "Aluminum Frame Heavy-Duty Hard Shell",
            "Leather Luxury Trunk",
          ]}
          placeholder="Select Casing Type"
          allowOther
          onChange={(val: string) => updateField("luggageCasing", val)}
        />
      </div>

      {/* WHEEL DESIGN */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="luggage-wheels"
          name="luggageWheels"
          label="Wheel Configuration"
          value={data.luggageWheels}
          options={[
            "4 Double Spinner Wheels (360° Silent Multi-directional)",
            "4 Single Spinner Wheels (360°)",
            "2 In-line Skate Roller Wheels",
            "No Wheels (Duffle Trunk)",
          ]}
          placeholder="Select Wheel Configuration"
          onChange={(val: string) => updateField("luggageWheels", val)}
        />
      </div>

      {/* SECURITY LOCK TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="luggage-lock"
          name="luggageLock"
          label="Security & Lock System"
          value={data.luggageLock}
          customValue={data.customLuggageLock}
          onCustomChange={(val: string) => updateField("customLuggageLock", val)}
          options={[
            "Built-in TSA Approved 3-Digit Combination Lock",
            "Integrated Dual TSA Latches (Zipperless)",
            "Standard Combination Lock",
            "Key Padlock Included",
            "No Lock Included",
          ]}
          placeholder="Select Lock System"
          allowOther
          onChange={(val: string) => updateField("luggageLock", val)}
        />
      </div>

      {/* EXPANDABLE COMPARTMENT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="luggage-expandable"
          name="luggageExpandable"
          label="Expandable Capacity"
          value={data.luggageExpandable}
          options={[
            "Yes - Expandable Zipper (+20% Extra Packing Space)",
            "Non-Expandable Fixed Shell",
          ]}
          placeholder="Select Expandability"
          onChange={(val: string) => updateField("luggageExpandable", val)}
        />
      </div>

      {/* HANDLE / TROLLEY SYSTEM */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="luggage-handle"
          name="luggageHandle"
          label="Telescopic Handle System"
          value={data.luggageHandle}
          options={[
            "Multi-Stage Push-Button Aluminum Trolley Handle",
            "Single Pole Telescopic Handle",
            "Side & Top Heavy-Duty Grip Handles Only",
          ]}
          placeholder="Select Handle Type"
          onChange={(val: string) => updateField("luggageHandle", val)}
        />
      </div>
    </div>
  );
}
