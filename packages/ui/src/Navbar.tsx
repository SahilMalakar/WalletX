// packages/ui/src/components/Navbar.tsx
import React from "react";
import { UserAvatar } from "./UserAvatar";

export const Navbar: React.FC<{
  onLogoutClick?: () => void;
  name?: string | null;
  email?: string | null;
}> = ({ onLogoutClick, name, email }) => {
  return (
    <div className="ui:flex ui:justify-between ui:items-center ui:px-6 ui:h-14 ui:bg-white ui:border-b">
      <div className="ui:text-sm ui:text-gray-600">Welcome back</div>
      <div className="ui:flex ui:items-center ui:gap-4">
        <UserAvatar name={name ?? undefined} email={email ?? undefined} />
        <button
          onClick={onLogoutClick}
          className="ui:text-sm ui:px-3 ui:py-1 ui:rounded ui:border ui:border-gray-200 ui:bg-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
