"use client";
// packages/ui/src/components/Sidebar.tsx
import React from "react";

export const Sidebar: React.FC<{
  userName?: string | null;
}> = ({ userName }) => {
  // Presentational component - routing handled by app-level wrapper
  return (
    <aside className="ui:w-64 ui:h-screen ui:bg-gray-50 ui:p-4 ui:border-r">
      <div className="ui:mb-4 ui:text-xl ui:font-bold">PayTM</div>
      {userName ? (
        <div className="ui:mb-6 ui:text-sm ui:text-gray-700">
          Hello, {userName}
        </div>
      ) : null}
      <nav className="ui:flex ui:flex-col ui:gap-3">
        {/* Navigation links handled by app-level SidebarNav component */}
      </nav>
    </aside>
  );
};
