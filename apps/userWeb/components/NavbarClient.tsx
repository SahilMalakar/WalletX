"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Navbar } from "@repo/ui/Navbar";

export default function NavbarClient({
  user,
}: {
  user?: { id?: string; name?: string | null; email?: string | null };
}) {
  const handleLogout = React.useCallback(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  // use client session if available (SessionProvider must wrap this)
  const { data: session } = useSession();

  const name = user?.name ?? session?.user?.name ?? null;
  const email = user?.email ?? session?.user?.email ?? null;

  return <Navbar onLogoutClick={handleLogout} name={name} email={email} />;
}
