"use client";

import { StyledSelect } from "../../StyledSelect";

type BackpacksFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function BackpacksFields({ data, updateField }: BackpacksFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">
          🎒 Backpack & Rucksack Details
        </h6>
      </div>

      {/* BACKPACK TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="backpack-type"
          name="backpackType"
          label="Backpack Type"
          value={data.backpackType}
          customValue={data.customBackpackType}
          onCustomChange={(val: string) => updateField("customBackpackType", val)}
          options={[
            "Laptop / Tech Business Backpack",
            "Anti-Theft Hidden Zipper Backpack",
            "School / College Student Backpack",
            "Fashion Mini Backpack (Leather)",
            "Travel / Hiking Rucksack",
            "Gym / Sports Drawstring Bag",
            "Tactical Military Molle Backpack",
          ]}
          placeholder="Select Backpack Type"
          allowOther
          onChange={(val: string) => updateField("backpackType", val)}
        />
      </div>

      {/* LAPTOP SLEEVE COMPATIBILITY */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="backpack-laptop"
          name="laptopSize"
          label="Padded Laptop Compartment"
          value={data.laptopSize}
          options={[
            "Fits up to 17.3 Inch Laptops",
            "Fits up to 15.6 Inch Laptops",
            "Fits up to 13 - 14 Inch Laptops / MacBooks",
            "Tablet / iPad Sleeve Only (11\")",
            "No Dedicated Laptop Compartment",
          ]}
          placeholder="Select Laptop Compatibility"
          onChange={(val: string) => updateField("laptopSize", val)}
        />
      </div>

      {/* TECH & SMART CHARGING */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="backpack-tech"
          name="backpackTech"
          label="Smart Features & Ports"
          value={data.backpackTech}
          options={[
            "External USB Charging Port Built-in",
            "USB + Headphone Port",
            "RFID Blocking Anti-theft Card Pockets",
            "TSA 180° Lay-Flat Laptop Opening",
            "None / Standard Backpack",
          ]}
          placeholder="Select Tech Features"
          onChange={(val: string) => updateField("backpackTech", val)}
        />
      </div>

      {/* COMFORT & ERGONOMICS */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="backpack-ergonomics"
          name="backpackErgonomics"
          label="Back Padding & Ergonomics"
          value={data.backpackErgonomics}
          options={[
            "Breathable Airflow Mesh Padded Back & Straps",
            "Ergonomic S-Curve Shoulder Straps + Chest Buckle",
            "Luggage Strap (Slips over suitcase trolley handle)",
            "Standard Padded Straps",
          ]}
          placeholder="Select Ergonomic Features"
          onChange={(val: string) => updateField("backpackErgonomics", val)}
        />
      </div>
    </div>
  );
}
