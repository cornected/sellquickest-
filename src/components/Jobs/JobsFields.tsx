"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";

type JobsFieldsProps = {
  onChange: (data: object) => void;
  subCategoryTitle?: string;
};

const JOB_INDUSTRIES = [
  "Sales, Marketing & Business Development",
  "IT, Software Development & Tech",
  "Drivers, Logistics & Dispatch",
  "Accounting, Audit & Finance",
  "Customer Support, Call Center & Front Desk",
  "Hospitality, Cooking, Chef & Hotel Management",
  "Education, Teaching & Private Tutoring",
  "Healthcare, Nursing & Pharmacy",
  "Security, Guard & Facility Protection",
  "Administrative & Executive Assistant",
  "Construction, Engineering & Architecture",
];

const EMPLOYMENT_TYPES = [
  "Full-Time (Permanent)",
  "Contract / Project-Based (3-6 Months)",
  "Part-Time / Weekend",
  "Remote / Work From Home",
  "Hybrid (2-3 Days Remote)",
  "Internship / Graduate Trainee",
];

const SALARY_RANGES = [
  "₦50,000 - ₦100,000 / month",
  "₦100,000 - ₦250,000 / month",
  "₦250,000 - ₦500,000 / month",
  "₦500,000 - ₦1,000,000 / month",
  "₦1,000,000+ / month",
  "Daily Rate / Commission Based",
  "Negotiable",
];

const JOB_BENEFITS = [
  "Immediate Employment / Urgent Hiring",
  "Accommodation Provided",
  "Lunch / Meal Allowance Provided",
  "HMO Health Insurance Included",
  "Pension Scheme & Performance Bonus",
  "Transport Allowance / Staff Bus",
  "Training & Mentorship Provided",
  "Laptop / Work Tools Provided",
];

export function JobsFields({
  onChange,
  subCategoryTitle = "Jobs",
}: JobsFieldsProps) {
  const [data, setData] = useState({
    listingType: "Job Vacancy (Hiring)",
    jobIndustry: "",
    customJobIndustry: "",
    jobRoleTitle: "",
    employmentType: "Full-Time (Permanent)",
    salaryRange: "₦100,000 - ₦250,000 / month",
    minimumExperience: "1 - 3 Years",
    minimumEducation: "HND / Bachelor's Degree",
    features: [] as string[],
  });

  const updateField = (key: string, value: unknown) => {
    const updated = { ...data, [key]: value };
    setData(updated);
    onChange(updated);
  };

  const toggleFeature = (feature: string) => {
    const updatedFeatures = data.features.includes(feature)
      ? data.features.filter((item) => item !== feature)
      : [...data.features, feature];
    updateField("features", updatedFeatures);
  };

  return (
    <div
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <h5 className="h6 fw-bold mb-3 text-dark">💼 {subCategoryTitle} Specifications</h5>

      {/* HIRING OR SEEKER & ROLE TITLE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="job-listing-type"
            name="listingType"
            label="Listing Purpose"
            value={data.listingType}
            options={[
              "Job Vacancy (Employer Hiring)",
              "Job Seeker (Available for Work / CV)",
            ]}
            placeholder="Select Purpose"
            onChange={(val) => updateField("listingType", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label text-secondary small fw-semibold mb-1">
            Job Role / Designation
          </label>
          <input
            value={data.jobRoleTitle}
            onChange={(e) => updateField("jobRoleTitle", e.target.value)}
            placeholder="e.g. Executive Driver, React Developer, Accountant, Sales Rep"
            className="form-control px-3 py-2 border-light-subtle form-option-hover"
            style={{ borderRadius: "8px", fontSize: "13px", minHeight: "42px" }}
          />
        </div>
      </div>

      {/* INDUSTRY & EMPLOYMENT TYPE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="job-industry"
            name="jobIndustry"
            label="Industry / Field"
            value={data.jobIndustry}
            customValue={data.customJobIndustry}
            onCustomChange={(val) => updateField("customJobIndustry", val)}
            options={JOB_INDUSTRIES}
            placeholder="Select Industry"
            allowOther
            onChange={(val) => updateField("jobIndustry", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="job-type"
            name="employmentType"
            label="Work Arrangement"
            value={data.employmentType}
            options={EMPLOYMENT_TYPES}
            placeholder="Select Work Type"
            onChange={(val) => updateField("employmentType", val)}
          />
        </div>
      </div>

      {/* SALARY & EXPERIENCE */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <StyledSelect
            id="job-salary"
            name="salaryRange"
            label="Salary / Remuneration"
            value={data.salaryRange}
            options={SALARY_RANGES}
            placeholder="Select Salary Range"
            onChange={(val) => updateField("salaryRange", val)}
          />
        </div>
        <div className="col-12 col-md-6">
          <StyledSelect
            id="job-exp"
            name="minimumExperience"
            label="Required Experience"
            value={data.minimumExperience}
            options={[
              "No Experience Required / Entry Level",
              "1 - 2 Years",
              "3 - 5 Years (Mid Level)",
              "5+ Years (Senior / Managerial)",
            ]}
            placeholder="Select Experience"
            onChange={(val) => updateField("minimumExperience", val)}
          />
        </div>
      </div>

      {/* PERKS & BENEFITS */}
      <div>
        <label className="form-label text-secondary small fw-semibold mb-2">
          Benefits & Perks Offered
        </label>
        <div className="d-flex flex-wrap gap-2">
          {JOB_BENEFITS.map((feat) => {
            const isSelected = data.features.includes(feat);
            return (
              <button
                key={feat}
                type="button"
                onClick={() => toggleFeature(feat)}
                className={`btn btn-sm ${
                  isSelected ? "btn-dark text-white fw-semibold" : "btn-light border text-secondary"
                }`}
                style={{ borderRadius: "8px", fontSize: "12px", padding: "6px 12px" }}
              >
                {isSelected ? "✓ " : "+ "}
                {feat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
