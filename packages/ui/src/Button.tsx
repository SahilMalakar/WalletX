// packages/ui/src/components/Button.tsx
import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...rest
}) => {
  const base =
    "ui:inline-flex ui:items-center ui:justify-center ui:px-4 ui:py-2 ui:rounded-md ui:font-medium";
  const primary = `${base} ui:bg-sky-700 ui:text-white ui:shadow`;
  const ghost = `${base} ui:border ui:border-gray-200 ui:text-gray-700 ui:bg-white`;
  const focus = "ui:focus:outline-none ui:focus:ring-2 ui:focus:ring-sky-400 ui:transition";
  const cls =
    variant === "primary" ? `${primary} ${focus} ${className}` : `${ghost} ${focus} ${className}`;

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
};
