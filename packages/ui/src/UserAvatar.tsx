// packages/ui/src/components/UserAvatar.tsx
import React from "react";

export const UserAvatar: React.FC<{ email?: string; name?: string }> = ({
  email,
  name,
}) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : email
      ? email[0]?.toUpperCase()
      : "U";
  return (
    <div className="ui:flex ui:items-center ui:gap-3">
      <div className="ui:w-9 ui:h-9 ui:rounded-full ui:bg-indigo-600 ui:text-white ui:flex ui:items-center ui:justify-center ui:font-medium">
        {initials}
      </div>
      <div className="ui:hidden ui:sm:ui:block">
        <div className="ui:text-sm ui:font-medium">{name ?? email}</div>
        <div className="ui:text-xs ui:text-gray-500">{email}</div>
      </div>
    </div>
  );
};
