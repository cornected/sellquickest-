"use client";

import { UniversalBrandSelect } from "@/components/Common/UniversalBrandSelect";
import { AGRICULTURE_BRANDS } from "@/lib/brandCatalogs";

type AgricBrandSelectProps = {
  value: string;
  onChange: (value: string) => void;
  customValue?: string;
  onCustomChange?: (value: string) => void;
  category?: string;
  label?: string;
  id?: string;
};

export function AgricBrandSelect({
  value,
  onChange,
  customValue,
  onCustomChange,
  category = "Agriculture & Food",
  label = "Brand / Producer",
  id = "agric-brand-select",
}: AgricBrandSelectProps) {
  return (
    <UniversalBrandSelect
      id={id}
      value={value}
      onChange={onChange}
      customValue={customValue}
      onCustomChange={onCustomChange}
      category={category}
      label={label}
      placeholder="Select Brand / Producer"
      brands={AGRICULTURE_BRANDS}
      allowNoBrand={true}
      allowCustomBespoke={false}
    />
  );
}
