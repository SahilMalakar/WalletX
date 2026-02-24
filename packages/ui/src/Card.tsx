// packages/ui/src/components/Card.tsx
"use client";
import React from "react";

type CardProps = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
};

export function Card({ title, className = "", children }: CardProps) {
  return (
    <div className={`ui:bg-white ui:rounded-lg ui:shadow ui:p-6 ${className}`}>
      {title && (
        <h3 className="ui:text-lg ui:font-semibold ui:mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}