"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar } from "@repo/ui/SideBar";

export default function SidebarNav({ userName }: { userName?: string | null }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "ui:bg-white ui:shadow" : "ui:text-gray-700";
  };

  const navLinks = [
    { href: "/dashboard/home", label: "Home" },
    { href: "/dashboard/transfer", label: "Transfer" },
    { href: "/dashboard/transaction", label: "Transactions" },
    { href: "/dashboard/p2pTransfer", label: "P2P Transfer" },
  ];

  return (
    <aside className="ui:w-64 ui:h-screen ui:bg-gray-50 ui:p-4 ui:border-r">
      <div className="ui:mb-4 ui:text-xl ui:font-bold">PayTM</div>
      {userName ? (
        <div className="ui:mb-6 ui:text-sm ui:text-gray-700">
          Hello, {userName}
        </div>
      ) : null}
      <nav className="ui:flex ui:flex-col ui:gap-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`ui:text-left ui:py-2 ui:px-2 ui:rounded ${isActive(
              link.href,
            )}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
