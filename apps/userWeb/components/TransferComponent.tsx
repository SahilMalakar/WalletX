"use client";

import React, { useState } from "react";
import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/Button";

export const TransferComponent: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement transfer logic
      console.log("Transferring:", amount);
      alert("Transfer feature coming soon!");
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleTransfer} className="ui:flex ui:flex-col ui:gap-4">
      <label className="ui:text-sm ui:font-medium">Amount to Transfer</label>
      <Input
        type="number"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Processing..." : "Transfer"}
      </Button>
    </form>
  );
};
