import { prisma } from "@repo/database";
import bcrypt from "bcrypt";

export async function registerUser(input: {
  name?: string;
  email: string;
  phoneNumber: string;
  password: string;
}) {
  const { name, email, phoneNumber, password } = input;

  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phoneNumber }],
    },
  });

  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    },
  });
}
