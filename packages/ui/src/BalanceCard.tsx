// packages/ui/src/components/BalanceCard.tsx
import React from "react";
import { Card } from "./Card";

export const BalanceCard: React.FC<{
  unlocked: number;
  locked: number;
  currency?: string;
}> = ({ unlocked, locked, currency = "INR" }) => {
  const total = unlocked + locked;
  return (
    <Card title="Balance">
      <div className="ui:grid ui:grid-cols-2 ui:gap-2 ui:text-sm">
        <div>Unlocked balance</div>
        <div className="ui:text-right">
          {unlocked} {currency}
        </div>
        <div>Total Locked Balance</div>
        <div className="ui:text-right">
          {locked} {currency}
        </div>
        <div className="ui:font-semibold">Total Balance</div>
        <div className="ui:text-right ui:font-semibold">
          {total} {currency}
        </div>
      </div>
    </Card>
  );
};
