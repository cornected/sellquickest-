"use client";

import { StyledSelect } from "../../StyledSelect";

type BootsFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function BootsFields({ data, updateField }: BootsFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">🥾 Boots Details</h6>
      </div>

      {/* BOOT STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="boot-style"
          name="bootStyle"
          label="Boot Style"
          value={data.bootStyle}
          customValue={data.customBootStyle}
          onCustomChange={(val: string) => updateField("customBootStyle", val)}
          options={[
            "Chelsea Boots (Elastic Side)",
            "Combat / Military Boots",
            "Chukka / Desert Boots",
            "Timberland / Nubuck Work Boots",
            "Cowboy / Western Boots",
            "Ankle Boots",
            "Knee-High Boots",
            "Safety / Steel-Toe Work Boots",
            "Rain / Wellington Rubber Boots",
          ]}
          placeholder="Select Boot Style"
          allowOther
          onChange={(val: string) => updateField("bootStyle", val)}
        />
      </div>

      {/* SHAFT HEIGHT */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="boot-shaft"
          name="bootShaft"
          label="Shaft Height"
          value={data.bootShaft}
          customValue={data.customBootShaft}
          onCustomChange={(val: string) => updateField("customBootShaft", val)}
          options={[
            "Ankle Height (Low)",
            "Mid-Calf",
            "Knee-High",
            "Over-the-Knee",
          ]}
          placeholder="Select Shaft Height"
          allowOther
          onChange={(val: string) => updateField("bootShaft", val)}
        />
      </div>

      {/* SOLE TREAD */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="boot-sole-tread"
          name="bootSoleTread"
          label="Sole Lug / Tread Type"
          value={data.bootSoleTread}
          options={[
            "Heavy Lug / Commando Sole (Anti-slip)",
            "Flat Rubber Sole",
            "Crepe Sole",
            "Stacked Leather / Wooden Heel Sole",
          ]}
          placeholder="Select Sole Tread"
          onChange={(val: string) => updateField("bootSoleTread", val)}
        />
      </div>

      {/* SAFETY / PROTECTIVE FEATURES */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="boot-protection"
          name="bootProtection"
          label="Safety / Protective Feature"
          value={data.bootProtection}
          options={[
            "Fashion Wear Only",
            "Steel Toe Cap Certified",
            "Puncture Resistant Sole",
            "Oil & Chemical Resistant",
            "Heavy Weather Insulated",
          ]}
          placeholder="Select Protection"
          onChange={(val: string) => updateField("bootProtection", val)}
        />
      </div>
    </div>
  );
}
