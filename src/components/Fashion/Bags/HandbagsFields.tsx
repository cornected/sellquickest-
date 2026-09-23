"use client";

import { StyledSelect } from "../../StyledSelect";

type HandbagsFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function HandbagsFields({ data, updateField }: HandbagsFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">
          👜 Handbag, Tote & Crossbody Details
        </h6>
      </div>

      {/* SILHOUETTE / STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="handbag-style"
          name="handbagStyle"
          label="Handbag Silhouette"
          value={data.handbagStyle}
          customValue={data.customHandbagStyle}
          onCustomChange={(val: string) => updateField("customHandbagStyle", val)}
          options={[
            "Tote Bag (Everyday Large)",
            "Shoulder Bag (Baguette / Crescent)",
            "Crossbody Bag",
            "Satchel / Structured Top-Handle Bag",
            "Hobo Bag (Slouchy)",
            "Bucket Bag",
            "Clutch & Evening Minudière",
            "Wristlet Pouch",
            "Messenger / Flap Bag",
          ]}
          placeholder="Select Silhouette"
          allowOther
          onChange={(val: string) => updateField("handbagStyle", val)}
        />
      </div>

      {/* BAG SIZE PROFILE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="handbag-size-profile"
          name="handbagSizeProfile"
          label="Size Profile"
          value={data.handbagSizeProfile}
          options={[
            "Mini / Micro Bag (Phone & Cardholder)",
            "Small (Everyday Essentials)",
            "Medium (Tablet, Cosmetic Pouch & Wallet)",
            "Large (Fits 13-15\" Laptop / Work Tote)",
            "Extra Large (Overnight / Beach Tote)",
          ]}
          placeholder="Select Size Profile"
          onChange={(val: string) => updateField("handbagSizeProfile", val)}
        />
      </div>

      {/* STRAP TYPE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="handbag-strap"
          name="handbagStrap"
          label="Strap & Handle Type"
          value={data.handbagStrap}
          customValue={data.customHandbagStrap}
          onCustomChange={(val: string) => updateField("customHandbagStrap", val)}
          options={[
            "Dual Top Handles + Detachable Adjustable Crossbody Strap",
            "Gold / Silver Chain Strap",
            "Wide Guitar Canvas Strap",
            "Single Shoulder Strap",
            "Top Handle Only",
            "Detachable Wristlet Strap",
          ]}
          placeholder="Select Strap Type"
          allowOther
          onChange={(val: string) => updateField("handbagStrap", val)}
        />
      </div>

      {/* HARDWARE FINISH */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="handbag-hardware"
          name="handbagHardware"
          label="Hardware / Metal Tone"
          value={data.handbagHardware}
          options={[
            "Polished Gold Tone",
            "Silver Tone / Chrome",
            "Gunmetal / Dark Ruthenium",
            "Rose Gold",
            "Antique Brass / Bronze",
            "Matte Black",
          ]}
          placeholder="Select Hardware Tone"
          onChange={(val: string) => updateField("handbagHardware", val)}
        />
      </div>

      {/* COMPARTMENTS & ORGANIZATION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="handbag-pockets"
          name="handbagPockets"
          label="Internal Compartments"
          value={data.handbagPockets}
          options={[
            "Multi-Pocket (Center Zip Divider + Card Slots)",
            "Single Main Compartment + Zip Pocket",
            "Open Cave Style (Includes Free Inner Zipper Pouch)",
            "Three Separated Compartments",
          ]}
          placeholder="Select Interior Compartment"
          onChange={(val: string) => updateField("handbagPockets", val)}
        />
      </div>

      {/* LINING */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="handbag-lining"
          name="handbagLining"
          label="Interior Lining"
          value={data.handbagLining}
          options={[
            "Suede / Microfiber Lining",
            "Silk / Satin Monogram Jacquard",
            "Cotton Canvas Lining",
            "Smooth Leather Interior",
            "Polyester Wipe-Clean",
          ]}
          placeholder="Select Lining"
          onChange={(val: string) => updateField("handbagLining", val)}
        />
      </div>
    </div>
  );
}
