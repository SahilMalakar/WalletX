// packages/ui/src/components/Select.tsx
import React from "react";

export const Select = (
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) => {
  return (
    <select
      {...props}
      className={`ui:border ui:rounded ui:px-3 ui:py-2 ${props.className || ""}`}
    />
  );
};
