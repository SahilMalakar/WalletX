import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Redirect /dashboard to /dashboard/home
  redirect("/dashboard/home");
}
