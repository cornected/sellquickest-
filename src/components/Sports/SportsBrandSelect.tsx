"use client";

import { UniversalBrandSelect } from "@/components/Common/UniversalBrandSelect";
import { SPORTS_BRANDS } from "@/lib/brandCatalogs";

type SportsBrandSelectProps = {
  value: string;
  onChange: (value: string) => void;
  customValue?: string;
  onCustomChange?: (value: string) => void;
  category?: string;
  label?: string;
  id?: string;
};

export function SportsBrandSelect({
  value,
  onChange,
  customValue,
  onCustomChange,
  category = "Fitness & Gym Equipment",
  label = "Brand / Maker",
  id = "sports-brand-select",
}: SportsBrandSelectProps) {
  return (
    <UniversalBrandSelect
      id={id}
      value={value}
      onChange={onChange}
      customValue={customValue}
      onCustomChange={onCustomChange}
      category={category}
      label={label}
      placeholder="Select Brand / Maker"
      brands={SPORTS_BRANDS}
      allowNoBrand={true}
      allowCustomBespoke={false}
    />
  );
}
