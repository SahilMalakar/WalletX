"use client";
// packages/ui/src/components/Sidebar.tsx
import React from "react";

export const Sidebar: React.FC<{
  userName?: string | null;
  selected?: "home" | "transfer" | "transactions";
  onSelect?: (view: "home" | "transfer" | "transactions") => void;
}> = ({ userName, selected = "transfer", onSelect }) => {
  // simple semantic markup. Navigation actions are up to the app using it.
  return (
    <aside className="ui:w-64 ui:h-screen ui:bg-gray-50 ui:p-4 ui:border-r">
      <div className="ui:mb-4 ui:text-xl ui:font-bold">PayTM</div>
      {userName ? (
        <div className="ui:mb-6 ui:text-sm ui:text-gray-700">
          Hello, {userName}
        </div>
      ) : null}
      <nav className="ui:flex ui:flex-col ui:gap-3">
        <button
          onClick={() => onSelect?.("home")}
          className={`ui:text-left ui:py-2 ui:px-2 ui:rounded ${
            selected === "home" ? "ui:bg-white ui:shadow" : "ui:text-gray-700"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onSelect?.("transfer")}
          className={`ui:text-left ui:py-2 ui:px-2 ui:rounded ${
            selected === "transfer"
              ? "ui:bg-white ui:shadow"
              : "ui:text-gray-700"
          }`}
        >
          Transfer
        </button>
        <button
          onClick={() => onSelect?.("transactions")}
          className={`ui:text-left ui:py-2 ui:px-2 ui:rounded ${
            selected === "transactions"
              ? "ui:bg-white ui:shadow"
              : "ui:text-gray-700"
          }`}
        >
          Transactions
        </button>
      </nav>
    </aside>
  );
};
