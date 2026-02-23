import SidebarNav from "../../components/SidebarNav";
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/app/signin");
  }

  const user = session.user;

  return (
    <div className="flex h-[calc(100vh-60px)]">
      <SidebarNav userName={user.name} />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
