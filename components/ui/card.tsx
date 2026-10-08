import * as React from "react";

/* ---------- Card ---------- */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-zinc-200 bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/* ---------- CardHeader ---------- */
export function CardHeader({ className = "", children, ...props }: CardProps) {
  return (
    <div className={`p-6 pb-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

/* ---------- CardTitle ---------- */
export function CardTitle({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }) {
  return (
    <h3
      className={`text-base font-semibold leading-snug text-zinc-900 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

/* ---------- CardDescription ---------- */
export function CardDescription({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
}) {
  return (
    <p className={`text-sm text-zinc-500 mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
}

/* ---------- CardContent ---------- */
export function CardContent({ className = "", children, ...props }: CardProps) {
  return (
    <div className={`p-6 pt-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

/* ---------- CardFooter ---------- */
export function CardFooter({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`p-6 pt-0 flex items-center ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
