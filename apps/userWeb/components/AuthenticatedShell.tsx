"use client";
import React from "react";

// Legacy component - no longer used
// Navigation and layout now handled by Next.js App Router
export default function AuthenticatedShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
