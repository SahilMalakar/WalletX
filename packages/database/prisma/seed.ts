import bcrypt from "bcrypt";
import { prisma } from "../src/index";

async function main() {
  const alice = await prisma.user.upsert({
    where: { phoneNumber: "1111111111" },
    update: {},
    create: {
      phoneNumber: "1111111111",
      email: "alice@example.com",
      password: await bcrypt.hash("alice", 10),
      name: "alice",
      balance: {
        create: {
          amount: 20000,
          locked: 0,
        },
      },
      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token__1",
          provider: "HDFC Bank",
        },
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { phoneNumber: "2222222222" },
    update: {},
    create: {
      phoneNumber: "2222222222",
      email: "bob@example.com",
      password: await bcrypt.hash("bob", 10),
      name: "bob",
      balance: {
        create: {
          amount: 2000,
          locked: 0,
        },
      },
      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  });
  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
