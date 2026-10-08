"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function Select({
  placeholder = "Выбрать...",
  options,
  value,
  onValueChange,
  className = "",
  disabled = false,
}: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange?.(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <select
        value={value ?? ""}
        onChange={handleChange}
        disabled={disabled}
        className={`
          w-full appearance-none h-9 px-3 pr-8
          text-sm text-zinc-900 bg-white
          border border-zinc-200 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer
          transition-colors duration-150
          hover:border-zinc-300
        `}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
      />
    </div>
  );
}
