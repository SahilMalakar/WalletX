import { Card } from "@repo/ui/Card";
import { BalanceCard } from "@repo/ui/BalanceCard";
import { TransactionsList } from "@repo/ui/TransactionsList";
import { auth } from "../../../lib/auth";
import { prisma } from "@repo/database";
import { redirect } from "next/navigation";
import { AddMoneyForm } from "../../../components/AddMoneyForm";
import { SUPPORTED_BANKS } from "../../../lib/banks";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  // fetch user's balance and recent transactions from the database
  const userId = Number(session.user.id);

  const balance = await prisma.balance.findUnique({
    where: { userId },
    select: { amount: true, locked: true },
  });

  const unlocked = balance?.amount ?? 0;
  const locked = balance?.locked ?? 0;

  const rawTxns = await prisma.onRampTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const txns = rawTxns.map((t) => ({
    id: t.id,
    provider: t.provider,
    amount: t.amount,
    status: String(t.status),
    createdAt: t.createdAt.toISOString(),
  }));

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <Card title="Add Money">
          <AddMoneyForm banks={SUPPORTED_BANKS.map((b) => b.name)} />
        </Card>
      </div>

      <div className="space-y-4">
        <BalanceCard unlocked={unlocked} locked={locked} />
        <Card title="Recent Transactions">
          <TransactionsList items={txns} />
        </Card>
      </div>
    </div>
  );
}
