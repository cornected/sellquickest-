"use client";

import { StyledSelect } from "../../StyledSelect";

type BriefcasesBusinessFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function BriefcasesBusinessFields({
  data,
  updateField,
}: BriefcasesBusinessFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">
          💼 Briefcase, Attache & Business Bag Details
        </h6>
      </div>

      {/* BRIEFASE STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="briefcase-style"
          name="briefcaseStyle"
          label="Business Bag Model"
          value={data.briefcaseStyle}
          customValue={data.customBriefcaseStyle}
          onCustomChange={(val: string) => updateField("customBriefcaseStyle", val)}
          options={[
            "Classic Hard-Sided Attaché Case",
            "Slim Leather Laptop Briefcase",
            "Double Gusset Executive Briefcase",
            "Lawyer / Pilot Flight Briefcase (Box)",
            "Messenger Document Folio",
            "Leather Conference Portfolio / Padfolio",
          ]}
          placeholder="Select Model"
          allowOther
          onChange={(val: string) => updateField("briefcaseStyle", val)}
        />
      </div>

      {/* DOCUMENT COMPATIBILITY */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="briefcase-docs"
          name="documentSize"
          label="Document / Folder Capacity"
          value={data.documentSize}
          options={[
            "Fits Legal Size Folders & A4 Files",
            "Fits A4 Files & Books",
            "Slim Document Envelope Profile",
          ]}
          placeholder="Select Document Capacity"
          onChange={(val: string) => updateField("documentSize", val)}
        />
      </div>

      {/* LOCK / CLOSURE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="briefcase-lock"
          name="briefcaseLock"
          label="Lock & Latch Mechanism"
          value={data.briefcaseLock}
          options={[
            "Dual Combination Number Codelocks",
            "Key-Locking Tuck Lock Clasp",
            "Heavy-Duty Top Zipper",
            "Magnetic Flap Snap",
          ]}
          placeholder="Select Lock Mechanism"
          onChange={(val: string) => updateField("briefcaseLock", val)}
        />
      </div>

      {/* INTERIOR ORGANIZER */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="briefcase-organizer"
          name="interiorOrganizer"
          label="Interior Organization"
          value={data.interiorOrganizer}
          options={[
            "Built-in Pen Loops, Business Card Slots & Phone Pocket",
            "Padded Laptop Compartment + File Dividers",
            "Open Interior with Center Zipper Divider",
          ]}
          placeholder="Select Organizer Features"
          onChange={(val: string) => updateField("interiorOrganizer", val)}
        />
      </div>
    </div>
  );
}
