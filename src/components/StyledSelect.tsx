"use client";

import { useEffect, useRef, useState } from "react";

export type StyledSelectProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  allowOther?: boolean;
  customValue?: string;
  onCustomChange?: (value: string) => void;
};

export function StyledSelect(props: StyledSelectProps) {
  const {
    id,
    name,
    label,
    value,
    options,
    placeholder,
    disabled,
    onChange,
    allowOther = true,
    customValue,
    onCustomChange,
  } = props;

  const [open, setOpen] = useState(false);
  const [internalCustom, setInternalCustom] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  const style = {
    borderRadius: "8px",
    fontSize: "13px",
    minHeight: "42px",
  };

  /*
    If allowOther is enabled and "Other"
    accidentally exists inside the supplied
    options array, remove it so it only
    appears once at the bottom.
  */
  const visibleOptions = allowOther
    ? options.filter((option) => option.toLowerCase() !== "other")
    : options;

  const isOtherSelected =
    allowOther &&
    (value === "Other" ||
      (value !== "" && !visibleOptions.includes(value)));

  const handleCustomInput = (text: string) => {
    setInternalCustom(text);
    if (onCustomChange) {
      onCustomChange(text);
    } else {
      onChange(text.trim() ? text : "Other");
    }
  };

  const currentInputValue =
    customValue !== undefined
      ? customValue
      : value === "Other"
        ? internalCustom
        : !visibleOptions.includes(value)
          ? value
          : internalCustom;

  return (
    <div ref={dropdownRef} className="position-relative">
      <label
        htmlFor={id}
        className="form-label text-secondary small fw-semibold mb-1"
      >
        {label}
      </label>

      <input
        type="hidden"
        id={id}
        name={name}
        value={value}
        required={!disabled}
      />

      <button
        type="button"
        id={`${id}-button`}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="form-select w-100 text-start px-3 py-2 border-light-subtle text-secondary form-option-hover"
        style={{
          ...style,
          backgroundColor: "#fff",
        }}
      >
        {value || placeholder}
      </button>

      {open && !disabled && (
        <div
          role="listbox"
          aria-label={label}
          className="position-absolute start-0 end-0 bg-white border shadow-sm p-2"
          style={{
            top: "100%",
            zIndex: 1100,
            borderRadius: "8px",
            maxHeight: "378px",
            overflowY: "auto",
          }}
        >
          {visibleOptions.map((option) => (
            <button
              key={`option-${option}`}
              type="button"
              role="option"
              aria-selected={value === option}
              onClick={() => {
                onChange(option);

                setOpen(false);
              }}
              className={`btn w-100 text-start px-3 py-2 border-0 dropdown-option ${
                value === option
                  ? "bg-light text-dark fw-semibold"
                  : "bg-white text-secondary"
              }`}
              style={{
                borderRadius: "6px",
                fontSize: "13px",
              }}
            >
              {option}
            </button>
          ))}

          {allowOther && (
            <button
              key="option-other"
              type="button"
              role="option"
              aria-selected={value === "Other"}
              onClick={() => {
                onChange("Other");

                setOpen(false);
              }}
              className={`btn w-100 text-start px-3 py-2 border-0 dropdown-option ${
                value === "Other"
                  ? "bg-light text-dark fw-semibold"
                  : "bg-white text-secondary"
              }`}
              style={{
                borderRadius: "6px",
                fontSize: "13px",
              }}
            >
              Other
            </button>
          )}
        </div>
      )}

      {isOtherSelected && (
        <input
          type="text"
          className="form-control mt-2"
          placeholder={`Enter ${label} (Specify other)`}
          value={currentInputValue}
          onChange={(e) => {
            handleCustomInput(e.target.value);
          }}
          style={style}
        />
      )}
    </div>
  );
}
