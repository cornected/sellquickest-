"use client";

import { useState } from "react";

type DropdownWithOtherProps = {
  label?: string;
  options: string[];
  value: string;
  customValue?: string;
  onChange: (value: string) => void;
  onCustomChange?: (value: string) => void;
  placeholder?: string;
};

export default function DropdownWithOther({
  label,
  options,
  value,
  customValue = "",
  onChange,
  onCustomChange,
  placeholder = "Enter custom option",
}: DropdownWithOtherProps) {
  return (
    <div className="mb-3">
      {label && (
        <label className="form-label text-secondary small fw-semibold">
          {label}
        </label>
      )}

      <select
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select option</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}

        <option value="Other">Other</option>
      </select>

      {value === "Other" && (
        <input
          type="text"
          className="form-control mt-2"
          placeholder={placeholder}
          value={customValue}
          onChange={(e) => onCustomChange?.(e.target.value)}
        />
      )}
    </div>
  );
}
