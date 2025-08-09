import * as React from "react";

export const Select: React.FC<{ onValueChange?: (v: string) => void; defaultValue?: string; children: React.ReactNode }> = ({ onValueChange, defaultValue, children }) => {
  const [value, setValue] = React.useState(defaultValue ?? "");
  return (
    <select
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onValueChange?.(e.target.value);
      }}
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
    >
      {children}
    </select>
  );
};

export const SelectTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...props }) => (
  <div className={`hidden ${className}`} {...props} />
);
export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => (
  <option value="" disabled>
    {placeholder}
  </option>
);
export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => (
  <option value={value}>{children}</option>
);


