import express from "express";
import "dotenv/config";
import { prisma } from "@repo/database";

const app = express();
console.log("DATABASE_URL:", process.env.DATABASE_URL);
app.get("/", async (req, res) => {
  const user = await prisma.user.findFirst({});
  res.json({ message: "Hello World!", user });
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.json({ message: "User created", user: newUser });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
