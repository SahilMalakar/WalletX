"use client";
import { BANKS } from "lib/banks";
import { createOnRampTransaction } from "../lib/actions/createOnrampTransaction";
import React, { useEffect, useState } from "react";
import { Input } from "@repo/ui/Input";
import { Select } from "@repo/ui/Select";
import { Button } from "@repo/ui/Button";

export const AddMoneyForm: React.FC<{
  banks: string[];
  amount?: string;
  bank?: string;
  onChange?: (fields: { amount?: string; bank?: string }) => void;
  onSubmit?: (fields: { amount: string; bank: string }) => void;
}> = ({ banks, amount = "", bank = banks[0] ?? "", onChange, onSubmit }) => {
  const [localAmount, setLocalAmount] = useState(amount);
  const [localBank, setLocalBank] = useState(bank);

  useEffect(() => setLocalAmount(amount), [amount]);
  useEffect(() => setLocalBank(bank ?? banks[0] ?? ""), [bank, banks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!localAmount || !localBank) {
      alert("Please enter amount and select bank");
      return;
    }

    try {
      const result = await createOnRampTransaction({
        amount: parseFloat(localAmount),
        provider: localBank,
      });

      if (!result.success) {
        alert(result.error);
        return;
      }

      if (onSubmit) onSubmit({ amount: localAmount, bank: localBank });

      if (!result.success || !result.redirectUrl) {
        alert(result.error ?? "Something went wrong");
        return;
      }
      window.location.href = result.redirectUrl;
    } catch (error) {
      console.error("Failed to create transaction:", error);
      alert("Failed to create transaction. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ui:flex ui:flex-col ui:gap-4">
      <label className="ui:text-sm ui:font-medium">Amount</label>
      <Input
        name="amount"
        value={localAmount}
        onChange={(e) => {
          const val = (e.target as HTMLInputElement).value;
          setLocalAmount(val);
          onChange?.({ amount: val, bank: localBank });
        }}
        placeholder="Amount"
      />

      <label className="ui:text-sm ui:font-medium">Bank</label>
      <Select
        name="bank"
        value={localBank}
        onChange={(e) => {
          const val = (e.target as HTMLSelectElement).value;
          setLocalBank(val);
          onChange?.({ bank: val, amount: localAmount });
        }}
      >
        {banks.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </Select>

      <div className="ui:pt-2">
        <Button type="submit" variant="primary">
          Add Money
        </Button>
      </div>
    </form>
  );
};
