import { Card } from "@repo/ui/Card";
import { TransactionsList } from "@repo/ui/TransactionsList";
import { auth } from "../../../lib/auth";
import { prisma } from "@repo/database";
import { redirect } from "next/navigation";

export default async function TransactionPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  const userId = Number(session.user.id);

  const rawTxns = await prisma.onRampTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const txns = rawTxns.map((t) => ({
    id: t.id,
    provider: t.provider,
    amount: t.amount,
    status: String(t.status),
    createdAt: t.createdAt.toISOString(),
  }));

  return (
    <div className="col-span-2">
      <Card title="All Transactions">
        <TransactionsList items={txns} />
      </Card>
    </div>
  );
}
