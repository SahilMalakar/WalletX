import { Card } from "@repo/ui/Card";
import { BalanceCard } from "@repo/ui/BalanceCard";
import { auth } from "../../../lib/auth";
import { prisma } from "@repo/database";
import { redirect } from "next/navigation";
import { P2PTransferComponent } from "../../../components/P2PTransferComponent";

export default async function P2PTransferPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  const userId = Number(session.user.id);

  const balance = await prisma.balance.findUnique({
    where: { userId },
    select: { amount: true, locked: true },
  });

  const unlocked = balance?.amount ?? 0;
  const locked = balance?.locked ?? 0;

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <Card title="Send Money to Friend">
          <P2PTransferComponent />
        </Card>
      </div>

      <div className="space-y-4">
        <BalanceCard unlocked={unlocked} locked={locked} currency="INR" />
      </div>
    </div>
  );
}
