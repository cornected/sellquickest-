"use client";

import { StyledSelect } from "../../StyledSelect";

type SneakersFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function SneakersFields({ data, updateField }: SneakersFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">👟 Sneakers & Athletic Footwear Details</h6>
      </div>

      {/* SNEAKER STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="sneaker-style"
          name="sneakerStyle"
          label="Sneaker Silhouette / Cut"
          value={data.sneakerStyle}
          customValue={data.customSneakerStyle}
          onCustomChange={(val: string) => updateField("customSneakerStyle", val)}
          options={[
            "Low-Top",
            "Mid-Top",
            "High-Top",
            "Slip-on Sneakers",
            "Chunky / Dad Shoes",
            "Retro / Vintage Classic",
            "Platform Sneakers",
            "Sock Sneakers",
          ]}
          placeholder="Select Cut"
          allowOther
          onChange={(val: string) => updateField("sneakerStyle", val)}
        />
      </div>

      {/* SNEAKER USE / ACTIVITY */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="sneaker-use"
          name="sneakerActivity"
          label="Recommended Use"
          value={data.sneakerActivity}
          customValue={data.customSneakerActivity}
          onCustomChange={(val: string) => updateField("customSneakerActivity", val)}
          options={[
            "Casual / Streetwear",
            "Running & Jogging",
            "Gym & Training",
            "Basketball",
            "Skateboarding",
            "Tennis / Court",
            "All-Day Walking Comfort",
          ]}
          placeholder="Select Activity"
          allowOther
          onChange={(val: string) => updateField("sneakerActivity", val)}
        />
      </div>

      {/* CUSHIONING / SOLE TECH */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="sneaker-cushioning"
          name="sneakerCushioning"
          label="Cushioning Technology"
          value={data.sneakerCushioning}
          customValue={data.customSneakerCushioning}
          onCustomChange={(val: string) => updateField("customSneakerCushioning", val)}
          options={[
            "Air Cushion / Visible Bubble",
            "Boost / Foam Sole",
            "Gel Cushioning",
            "Flat Vulcanized Sole",
            "Standard EVA Midsole",
            "Carbon Fiber Plate",
          ]}
          placeholder="Select Cushioning"
          allowOther
          onChange={(val: string) => updateField("sneakerCushioning", val)}
        />
      </div>

      {/* LIMITED RELEASE / COLLABORATION */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="sneaker-edition"
          name="sneakerEdition"
          label="Release Edition"
          value={data.sneakerEdition}
          options={[
            "General Release",
            "Special Edition / Collab",
            "Retro Release",
            "Custom Hand-Painted",
            "Deadstock / Collector Item",
          ]}
          placeholder="Select Edition"
          onChange={(val: string) => updateField("sneakerEdition", val)}
        />
      </div>
    </div>
  );
}
