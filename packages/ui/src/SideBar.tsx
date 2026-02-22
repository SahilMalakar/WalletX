// packages/ui/src/components/Sidebar.tsx
import React from "react";

export const Sidebar: React.FC = () => {
  // simple semantic markup. Navigation actions are up to the app using it.
  return (
    <aside className="ui:w-64 ui:h-screen ui:bg-gray-50 ui:p-4 ui:border-r">
      <div className="ui:mb-8 ui:text-xl ui:font-bold">PayTM</div>
      <nav className="ui:flex ui:flex-col ui:gap-3">
        <button className="ui:text-left ui:py-2 ui:text-gray-700">Home</button>
        <button className="ui:text-left ui:py-2 ui:text-gray-700">
          Transfer
        </button>
        <button className="ui:text-left ui:py-2 ui:text-gray-700">
          Transactions
        </button>
      </nav>
    </aside>
  );
};
