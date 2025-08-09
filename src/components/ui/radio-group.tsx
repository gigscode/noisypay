import * as React from "react";

interface RadioGroupProps {
  className?: string;
  children?: React.ReactNode;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ className = "", children, onValueChange, defaultValue }) => {
  const [value, setValue] = React.useState(defaultValue ?? "");
  const handleChange = (next: string) => {
    setValue(next);
    onValueChange?.(next);
  };
  return (
    <div className={className} role="radiogroup">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child as any;
        if ((child.type as any)?.displayName === "RadioGroupItem") {
          return React.cloneElement(child, {
            checked: (child.props as any).value === value,
            onChange: () => handleChange((child.props as any).value),
          } as any);
        }
        return child;
      })}
    </div>
  );
};

export const RadioGroupItem: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ id, ...props }) => (
  <input id={id} type="radio" {...props} />
);
RadioGroupItem.displayName = "RadioGroupItem";


