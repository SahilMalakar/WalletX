"use client";
import React from "react";
import { Sidebar } from "@repo/ui/SideBar";
import NavbarClient from "./NavbarClient";

export default function AuthenticatedShell({
  session,
  children,
}: {
  session?: any;
  children: React.ReactNode;
}) {
  const [view, setView] = React.useState<"home" | "transfer" | "transactions">(
    "transfer",
  );

  return (
    <div className="flex w-full">
      <aside className="w-72">
        <Sidebar
          userName={session?.user?.name ?? session?.user?.email}
          selected={view}
          onSelect={(v) => setView(v)}
        />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10">
          <NavbarClient user={session?.user} />
        </header>

        <main className="p-8">
          {view === "home" && (
            <div className="ui:rounded ui:bg-white ui:p-6 ui:shadow">
              <h2 className="ui:text-2xl ui-font-semibold">Welcome back</h2>
              <p className="ui:mt-2">
                Hello {session?.user?.name ?? "user"}, welcome to your
                dashboard.
              </p>
            </div>
          )}

          {view === "transfer" && (
            // render server children (dashboard) to preserve server data
            <div>{children}</div>
          )}

          {view === "transactions" && (
            <div className="ui:rounded ui:bg-white ui:p-6 ui:shadow">
              <h2 className="ui:text-2xl ui-font-semibold">Transactions</h2>
              <p className="ui:mt-2">
                Transactions UI coming soon — you can add a custom view here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
