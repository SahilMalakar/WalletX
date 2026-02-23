"use client";

import React, { useState } from "react";
import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/Button";
import { p2pTransfer } from "lib/actions/p2pTransfer";

export const P2PTransferComponent: React.FC = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleP2PTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipient || !amount || parseFloat(amount) <= 0) {
      alert("Please enter recipient and valid amount");
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement P2P transfer logic
      const res = await p2pTransfer(recipient, Number(amount) * 100);

      if (!res.success) {
        alert(res.error);
        return;
      }
      console.log("Sending to:", recipient, "Amount:", amount);

      alert("P2P transfer completed successfully!");
    } catch (error) {
      console.error("P2P transfer failed:", error);
      alert("P2P transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleP2PTransfer} className="ui:flex ui:flex-col ui:gap-4">
      <label className="ui:text-sm ui:font-medium">
        Recipient Phone Number
      </label>
      <Input
        type="text"
        name="recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Enter phone number"
      />

      <label className="ui:text-sm ui:font-medium">Amount to Send</label>
      <Input
        type="number"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Processing..." : "Send Money"}
      </Button>
    </form>
  );
};
