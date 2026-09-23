"use client";

import { UniversalBrandSelect } from "@/components/Common/UniversalBrandSelect";
import { HOME_APPLIANCE_BRANDS } from "@/lib/brandCatalogs";

type HomeBrandSelectProps = {
  value: string;
  onChange: (value: string) => void;
  customValue?: string;
  onCustomChange?: (value: string) => void;
  category?: string;
  label?: string;
  id?: string;
};

export function HomeBrandSelect({
  value,
  onChange,
  customValue,
  onCustomChange,
  category = "Furniture",
  label = "Brand / Maker",
  id = "home-brand-select",
}: HomeBrandSelectProps) {
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
      brands={HOME_APPLIANCE_BRANDS}
      allowNoBrand={true}
      allowCustomBespoke={true}
    />
  );
}
