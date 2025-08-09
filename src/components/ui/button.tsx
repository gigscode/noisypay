import * as React from "react";

type Variant = "default" | "secondary" | "outline" | "cta";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variants: Record<Variant, string> = {
      default: "bg-black text-white hover:opacity-90",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      outline: "border border-gray-300 text-gray-900 hover:bg-gray-50",
      cta: "bg-red-600 text-white hover:bg-red-700",
    };
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";


