import * as React from "react";

type BadgeVariant = "default" | "secondary" | "success" | "destructive" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-zinc-900 text-white",
  secondary: "bg-zinc-100 text-zinc-700",
  success: "bg-emerald-100 text-emerald-700",
  destructive: "bg-red-100 text-red-700",
  outline: "border border-zinc-200 text-zinc-700 bg-transparent",
};

export function Badge({
  variant = "secondary",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5
        text-xs font-medium rounded-full whitespace-nowrap
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}
