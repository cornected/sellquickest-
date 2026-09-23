"use client";

import { UniversalBrandSelect } from "@/components/Common/UniversalBrandSelect";
import { VEHICLE_BRANDS } from "@/lib/brandCatalogs";

type VehicleBrandSelectProps = {
  value: string;
  onChange: (value: string) => void;
  customValue?: string;
  onCustomChange?: (value: string) => void;
  category?: string;
  label?: string;
  id?: string;
};

export function VehicleBrandSelect({
  value,
  onChange,
  customValue,
  onCustomChange,
  category = "Automobiles",
  label = "Brand / Make",
  id = "vehicle-brand-select",
}: VehicleBrandSelectProps) {
  return (
    <UniversalBrandSelect
      id={id}
      value={value}
      onChange={onChange}
      customValue={customValue}
      onCustomChange={onCustomChange}
      category={category}
      label={label}
      placeholder="Select Brand / Make"
      brands={VEHICLE_BRANDS}
      allowNoBrand={false}
      allowCustomBespoke={false}
    />
  );
}
