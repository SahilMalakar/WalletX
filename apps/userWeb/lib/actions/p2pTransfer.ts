"use server";

import { prisma } from "@repo/database";
import { auth } from "../auth";

export async function p2pTransfer(to: string, amount: number) {
  const session = await auth();
  const from = session?.user?.id;

  if (!from) {
    return { success: false, error: "Unauthorized - Please sign in" };
  }

  if (amount <= 0) {
    return { success: false, error: "Invalid amount" };
  }

  const toUser = await prisma.user.findFirst({
    where: { phoneNumber: to },
  });

  if (!toUser) {
    return { success: false, error: "User not found" };
  }

  if (Number(from) === toUser.id) {
    return { success: false, error: "Cannot transfer to yourself" };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Lock sender row
      await tx.$queryRaw`
        SELECT * FROM "Balance"
        WHERE "userId" = ${Number(from)}
        FOR UPDATE
      `;

      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });
      console.log("Balance:", fromBalance?.amount);
      console.log("Requested:", amount);

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient balance");
      }

      // Deduct sender
      await tx.balance.update({
        where: { userId: Number(from) },
        data: {
          amount: { decrement: amount },
        },
      });

      // Credit receiver (create balance if missing)
      await tx.balance.upsert({
        where: { userId: toUser.id },
        update: {
          amount: { increment: amount },
        },
        create: {
          userId: toUser.id,
          amount: amount,
          locked: 0,
        },
      });
      // Create transfer record
      await tx.p2PTransfer.create({
        data: {
          amount,
          createdAt: new Date(),
          fromUserId: Number(from),
          toUserId: toUser.id,
        },
      });
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
