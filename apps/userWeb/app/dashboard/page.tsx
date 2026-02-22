// apps/userWeb/app/dashboard/page.tsx

import { Card } from "@repo/ui/Card";
import { BalanceCard } from "@repo/ui/BalanceCard";
import { TransactionsList } from "@repo/ui/TransactionsList";
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import { AddMoneyForm } from "../../components/AddMoneyForm";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  const unlocked = 0;
  const locked = 0;
  const txns: any[] = [];

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <Card title="Add Money">
          <AddMoneyForm banks={["HDFC Bank"]} />
        </Card>
      </div>

      <div className="space-y-4">
        <BalanceCard unlocked={unlocked} locked={locked} currency="INR" />
        <Card title="Recent Transactions">
          <TransactionsList items={txns} />
        </Card>
      </div>
    </div>
  );
}
