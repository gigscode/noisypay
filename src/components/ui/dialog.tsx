import * as React from "react";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open = true, onOpenChange, children }) => {
  React.useEffect(() => {
    if (onOpenChange) onOpenChange(open);
  }, [open]);
  if (!open) return null;
  return <div>{children}</div>;
};

export const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...props }) => (
  <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30`}>
    <div className={`w-full max-w-md rounded-lg bg-white p-4 shadow-lg ${className}`} {...props} />
  </div>
);

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...props }) => (
  <div className={`mb-2 ${className}`} {...props} />
);

export const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className = "", ...props }) => (
  <h3 className={`text-lg font-semibold ${className}`} {...props} />
);

export const DialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className = "", ...props }) => (
  <p className={`text-sm text-gray-600 ${className}`} {...props} />
);

export const DialogTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);


