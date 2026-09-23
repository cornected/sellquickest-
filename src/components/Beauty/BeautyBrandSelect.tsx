"use client";

import { UniversalBrandSelect } from "@/components/Common/UniversalBrandSelect";
import { BEAUTY_BRANDS } from "@/lib/brandCatalogs";

type BeautyBrandSelectProps = {
  value: string;
  onChange: (value: string) => void;
  customValue?: string;
  onCustomChange?: (value: string) => void;
  category?: string;
  label?: string;
  id?: string;
};

export function BeautyBrandSelect({
  value,
  onChange,
  customValue,
  onCustomChange,
  category = "Beauty & Personal Care",
  label = "Brand / House",
  id = "beauty-brand-select",
}: BeautyBrandSelectProps) {
  return (
    <UniversalBrandSelect
      id={id}
      value={value}
      onChange={onChange}
      customValue={customValue}
      onCustomChange={onCustomChange}
      category={category}
      label={label}
      placeholder="Select Brand / House"
      brands={BEAUTY_BRANDS}
      allowNoBrand={true}
      allowCustomBespoke={false}
    />
  );
}
