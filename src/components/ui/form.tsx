import * as React from "react";

export const Form: React.FC<{ children: React.ReactNode } & React.FormHTMLAttributes<HTMLFormElement>> = ({ children, ...props }) => (
  <form {...props}>{children}</form>
);

export const FormField: React.FC<{ name: string; render: (ctx: any) => React.ReactNode; control?: any }> = ({ render }) => (
  <>{render({ field: {} })}</>
);

export const FormItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...props }) => (
  <div className={className} {...props} />
);

export const FormLabel: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className = "", ...props }) => (
  <label className={`text-sm font-medium ${className}`} {...props} />
);

export const FormControl: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

export const FormDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className = "", ...props }) => (
  <p className={`text-xs text-gray-600 ${className}`} {...props} />
);

export const FormMessage: React.FC = () => null;


