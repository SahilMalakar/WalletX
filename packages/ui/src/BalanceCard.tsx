import React from "react";
import { Card } from "./Card";
import { formatINR } from "../src/formatCurrency";

export const BalanceCard: React.FC<{
  unlocked: number;
  locked: number;
}> = ({ unlocked, locked }) => {
  const total = unlocked + locked;

  return (
    <Card title="Balance">
      <div className="ui:grid ui:grid-cols-2 ui:gap-2 ui:text-sm">
        <div>Unlocked balance</div>
        <div className="ui:text-right">{formatINR(unlocked)}</div>

        <div>Total Locked Balance</div>
        <div className="ui:text-right">{formatINR(locked)}</div>

        <div className="ui:font-semibold">Total Balance</div>
        <div className="ui:text-right ui:font-semibold">{formatINR(total)}</div>
      </div>
    </Card>
  );
};
