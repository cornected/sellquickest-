"use client";

import { UniversalBrandSelect } from "@/components/Common/UniversalBrandSelect";
import { PET_BRANDS } from "@/lib/brandCatalogs";

type PetBrandSelectProps = {
  value: string;
  onChange: (value: string) => void;
  customValue?: string;
  onCustomChange?: (value: string) => void;
  category?: string;
  label?: string;
  id?: string;
};

export function PetBrandSelect({
  value,
  onChange,
  customValue,
  onCustomChange,
  category = "Pet Care & Supplies",
  label = "Brand / Maker",
  id = "pet-brand-select",
}: PetBrandSelectProps) {
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
      brands={PET_BRANDS}
      allowNoBrand={true}
      allowCustomBespoke={false}
    />
  );
}
