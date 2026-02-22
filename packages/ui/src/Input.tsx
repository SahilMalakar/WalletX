// packages/ui/src/components/Input.tsx
import React from "react";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const defaultCls = [
    "ui:w-full",
    "ui:border",
    "ui:border-gray-200",
    "ui:rounded",
    "ui:px-3",
    "ui:py-2",
    "ui:text-gray-900",
    "ui:placeholder-gray-400",
    "ui:bg-white",
    "ui:transition",
    "ui:focus:outline-none",
    "ui:focus:ring-2",
    "ui:focus:ring-sky-400",
    "ui:focus:border-sky-400",
  ].join(" ");

  return (
    <input
      {...props}
      className={`${defaultCls} ${props.className || ""}`}
    />
  );
};
