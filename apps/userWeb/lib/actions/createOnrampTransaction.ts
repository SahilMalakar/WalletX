"use server";

import { prisma } from "@repo/database";
import { auth } from "../auth";
import crypto from "crypto";
import { BANKS } from "../banks";

// mentel model
// 1. User clicks Add Money
// 2. Server creates OnRampTransaction (Processing)
// 3. Server generates token
// 4. Server decides redirect URL
// 5. Server returns redirect URL
// 6. Client redirects to bank
// 7. Bank calls webhook with token
// 8. Webhook updates transaction → Success
// 9. Webhook increments wallet balance (atomic)

export async function createOnRampTransaction({
  amount,
  provider,
}: {
  amount: number;
  provider: string;
}) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized - Please sign in" };
    }

    const userId = Number(session.user.id);

    if (!amount || amount <= 0) {
      return { success: false, error: "Invalid amount" };
    }

    const normalizedProvider = provider.toUpperCase();
    const bank = BANKS[normalizedProvider as keyof typeof BANKS];

    if (!bank) {
      return { success: false, error: "Invalid provider" };
    }

    const amountInPaise = Math.round(amount * 100);
    const token = crypto.randomUUID(); // ideally should come from bank's API when creating a transaction

    const transaction = await prisma.$transaction(async (tx) => {
      // const existingTxn = await tx.onRampTransaction.findFirst({
      //   where: {
      //     userId,
      //     status: "Processing",
      //   },
      // });

      // if (existingTxn) {
      //   throw new Error("Previous transaction still processing");
      // }

      return tx.onRampTransaction.create({
        data: {
          userId,
          token,
          amount: amountInPaise,
          provider: normalizedProvider,
          status: "Processing",
          createdAt: new Date(),
        },
      });
    });

    return {
      success: true,
      redirectUrl: `${bank.redirectUrl}?token=${token}`,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create transaction",
    };
  }
}
