"use client";

import * as React from "react";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  checked = false,
  onCheckedChange,
  id,
  disabled = false,
  className = "",
}: SwitchProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={`
        relative inline-flex h-5 w-9 shrink-0 items-center
        rounded-full border-2 border-transparent
        transition-colors duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        cursor-pointer
        ${checked ? "bg-zinc-900" : "bg-zinc-200"}
        ${className}
      `}
      type="button"
    >
      <span
        className={`
          pointer-events-none inline-block h-4 w-4
          rounded-full bg-white shadow-sm
          transition-transform duration-200 ease-in-out
          ${checked ? "translate-x-4" : "translate-x-0"}
        `}
      />
    </button>
  );
}
