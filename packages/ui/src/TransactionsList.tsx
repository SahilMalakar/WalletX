// packages/ui/src/components/TransactionsList.tsx
import React from "react";

export type Txn = {
  id: number | string;
  provider: string;
  amount: number;
  status: string;
  createdAt: string;
};

export const TransactionsList: React.FC<{ items?: Txn[] }> = ({
  items = [],
}) => {
  if (!items.length) {
    return (
      <div className="ui:text-center ui:py-6 ui:text-gray-500">
        No Recent transactions
      </div>
    );
  }
  return (
    <ul className="ui:space-y-3">
      {items.map((it) => (
        <li
          key={it.id}
          className="ui:border ui:rounded ui:p-3 ui:flex ui:justify-between"
        >
          <div>
            <div className="ui:font-medium">{it.provider}</div>
            <div className="ui:text-xs ui:text-gray-500">
              {new Date(it.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="ui:text-right">
            <div>{it.amount} INR</div>
            <div className="ui:text-xs ui:text-gray-500">{it.status}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};
