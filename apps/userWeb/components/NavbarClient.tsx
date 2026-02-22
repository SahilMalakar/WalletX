"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Navbar } from "@repo/ui/Navbar";

export default function NavbarClient() {
  const handleLogout = React.useCallback(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return <Navbar onLogoutClick={handleLogout} />;
}
