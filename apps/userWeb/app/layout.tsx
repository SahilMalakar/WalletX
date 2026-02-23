import "@repo/ui/styles.css"; // <--- includes ui: prefixed tailwind output
import "./globals.css"; // your app-specific styles (no ui: prefix)
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import SessionProviderClient from "../components/SessionProviderClient";
import NavbarClient from "../components/NavbarClient";
import { auth } from "../lib/auth";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WalletX",
  description: "Secure wallet and payment application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const isAuthenticated = !!session?.user;

  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen bg-gray-100 ${geist.className}`}
      >
        {isAuthenticated ? (
          // Wrap the whole authenticated UI in SessionProviderClient so any
          // client component (navbar, sidebar, forms) can use `useSession`.
          <SessionProviderClient session={session}>
            <div className="w-full sticky top-0 z-50">
              <NavbarClient />
            </div>
            <div className="flex-1">{children}</div>
          </SessionProviderClient>
        ) : (
          // Unauthenticated: center auth pages both vertically and horizontally
          <div className="min-h-screen w-full flex items-center justify-center">
            <main className="w-full max-w-md p-6">{children}</main>
          </div>
        )}
      </body>
    </html>
  );
}
