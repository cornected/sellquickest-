"use client";

import { UniversalBrandSelect } from "@/components/Common/UniversalBrandSelect";
import { ELECTRONICS_BRANDS } from "@/lib/brandCatalogs";

type ElectronicsBrandSelectProps = {
  value: string;
  onChange: (value: string) => void;
  customValue?: string;
  onCustomChange?: (value: string) => void;
  category?: string;
  label?: string;
  id?: string;
};

export function ElectronicsBrandSelect({
  value,
  onChange,
  customValue,
  onCustomChange,
  category = "TV & DVD Equipment",
  label = "Brand / Manufacturer",
  id = "electronics-brand-select",
}: ElectronicsBrandSelectProps) {
  return (
    <UniversalBrandSelect
      id={id}
      value={value}
      onChange={onChange}
      customValue={customValue}
      onCustomChange={onCustomChange}
      category={category}
      label={label}
      placeholder="Select Brand / Manufacturer"
      brands={ELECTRONICS_BRANDS}
      allowNoBrand={true}
      allowCustomBespoke={false}
    />
  );
}
