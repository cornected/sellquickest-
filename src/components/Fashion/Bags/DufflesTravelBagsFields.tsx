"use client";

import { StyledSelect } from "../../StyledSelect";

type DufflesTravelBagsFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function DufflesTravelBagsFields({
  data,
  updateField,
}: DufflesTravelBagsFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">
          ✈️ Duffle, Weekender & Gym Bag Details
        </h6>
      </div>

      {/* DUFFLE STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="duffle-style"
          name="duffleStyle"
          label="Duffle / Travel Bag Style"
          value={data.duffleStyle}
          customValue={data.customDuffleStyle}
          onCustomChange={(val: string) => updateField("customDuffleStyle", val)}
          options={[
            "Rolling Duffle with Trolley Wheels",
            "Weekend Overnight Duffle (Leather)",
            "Gym & Sports Duffle",
            "Convertible Duffle Backpack",
            "Foldable Lightweight Cargo Travel Bag",
            "Garment / Suit Carrier Duffle Bag",
          ]}
          placeholder="Select Style"
          allowOther
          onChange={(val: string) => updateField("duffleStyle", val)}
        />
      </div>

      {/* SEPARATE SHOE COMPARTMENT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="duffle-shoe-pocket"
          name="shoeCompartment"
          label="Isolated Shoe / Laundry Pocket"
          value={data.shoeCompartment}
          options={[
            "Yes - Dedicated Breathable Shoe Compartment",
            "Yes - Wet/Dry Waterproof Separator Pocket",
            "Both Shoe Pocket + Wet Pocket",
            "No (Single Main Chamber)",
          ]}
          placeholder="Select Shoe Pocket Feature"
          onChange={(val: string) => updateField("shoeCompartment", val)}
        />
      </div>

      {/* CARRYING STRAPS */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="duffle-straps"
          name="duffleStraps"
          label="Carrying System"
          value={data.duffleStraps}
          options={[
            "Padded Grab Handles + Detachable Shoulder Strap",
            "Telescopic Pull Handle with Wheels",
            "Hideaway Backpack Straps + Grab Handles",
            "Reinforced Top Webbing Handles Only",
          ]}
          placeholder="Select Carrying System"
          onChange={(val: string) => updateField("duffleStraps", val)}
        />
      </div>

      {/* FLIGHT CABIN APPROVAL */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="duffle-airline-check"
          name="duffleAirlineApproved"
          label="Airline Compatibility"
          value={data.duffleAirlineApproved}
          options={[
            "Fits Under Airline Seat (Personal Item)",
            "Overhead Bin Carry-On Approved",
            "Heavy-Duty Large Cargo Checked Bag",
          ]}
          placeholder="Select Airline Compatibility"
          onChange={(val: string) => updateField("duffleAirlineApproved", val)}
        />
      </div>
    </div>
  );
}
