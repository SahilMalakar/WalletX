import express from "express";
import "dotenv/config";
import { prisma } from "@repo/database";

const app = express();

app.use(express.json());

console.log("DATABASE_URL:", process.env.DATABASE_URL);
// app.get("/", async (req, res) => {
//   const user = await prisma.user.findFirst({});
//   res.json({ message: "Hello World!", user });
// });

app.post("/hdfcWebhook", async (req, res) => {
  //TODO: add zod validation here
  //check if this request came from hdfc bank ,use a webhook secrect here

  try {
    const paymentInfo = {
      token: req.body.token,
      userId: req.body.user_identifier,
      amount: req.body.amount,
    };
  
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: paymentInfo.userId,
        },
        data: {
          amount: {
            increment: paymentInfo.amount,
          },
        },
      }),
  
      prisma.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.status(200).json({
      message: "captured",
    });
  } catch (error) {
    console.error(`error in capturing: ${error}`);
    res.status(411).json({
      message:"error while processing webhook"
    })
  }
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
