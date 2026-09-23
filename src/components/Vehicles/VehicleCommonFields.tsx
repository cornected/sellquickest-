"use client";

import { useEffect, useState } from "react";
import { StyledSelect } from "@/components/StyledSelect";

type VehicleCommonFieldsProps = {
  onChange: (data: { condition: string; availableForSwap: boolean }) => void;
};

export function VehicleCommonFields({ onChange }: VehicleCommonFieldsProps) {
  const [condition, setCondition] = useState("");
  const [availableForSwap, setAvailableForSwap] = useState("");

  useEffect(() => {
    onChange({
      condition,
      availableForSwap: availableForSwap === "Yes",
    });
  }, [condition, availableForSwap, onChange]);

  return (
    <section
      className="p-4 border border-light-subtle mb-4"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <h5 className="h6 fw-bold mb-3 text-dark">Vehicle Details</h5>

      <div className="row g-3">
        {/* CONDITION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="vehicle-condition"
            name="vehicleCondition"
            label="Condition"
            value={condition}
            options={["Brand New", "Foreign Used", "Local Used", "Refurbished"]}
            placeholder="Select Condition"
            onChange={setCondition}
          />
        </div>

        {/* SWAP */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="vehicle-swap"
            name="vehicleSwap"
            label="Available for Swap?"
            value={availableForSwap}
            options={["Yes", "No"]}
            placeholder="Select Option"
            onChange={setAvailableForSwap}
          />
        </div>
      </div>
    </section>
  );
}
