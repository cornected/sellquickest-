"use client";

import { UniversalBrandSelect } from "@/components/Common/UniversalBrandSelect";
import { TECH_PHONE_BRANDS } from "@/lib/brandCatalogs";

type PhoneBrandSelectProps = {
  value: string;
  onChange: (value: string) => void;
  customValue?: string;
  onCustomChange?: (value: string) => void;
  category?: "Mobile Phones" | "Tablets" | "Smartwatches" | "Accessories" | string;
  label?: string;
};

export function PhoneBrandSelect({
  value,
  onChange,
  customValue = "",
  onCustomChange,
  category = "Mobile Phones",
  label = "Brand / Manufacturer",
}: PhoneBrandSelectProps) {
  return (
    <UniversalBrandSelect
      id="phone-brand-select"
      value={value}
      onChange={onChange}
      customValue={customValue}
      onCustomChange={onCustomChange}
      category={category}
      label={label}
      placeholder="Select Brand / Manufacturer"
      brands={TECH_PHONE_BRANDS}
      allowNoBrand={false}
      allowCustomBespoke={false}
    />
  );
}
