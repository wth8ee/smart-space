import * as React from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-700 shadow-sm",
  outline:
    "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm",
  ghost: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
  destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-md",
  md: "h-9 px-4 text-sm rounded-lg",
  lg: "h-11 px-6 text-sm rounded-lg",
  icon: "h-9 w-9 rounded-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className = "", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center gap-2 font-medium
          transition-all duration-150 ease-in-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2
          disabled:opacity-50 disabled:pointer-events-none
          cursor-pointer select-none
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
