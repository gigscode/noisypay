import * as React from "react";

export const Card = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-lg border border-gray-200 bg-white ${className}`} {...props} />
);

export const CardHeader = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 border-b border-gray-200 ${className}`} {...props} />
);

export const CardTitle = ({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...props} />
);

export const CardContent = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 ${className}`} {...props} />
);

export const CardFooter = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 border-t border-gray-200 ${className}`} {...props} />
);


