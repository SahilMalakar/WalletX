import "dotenv/config";
import { prisma } from "@repo/database";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

async function getData() {
  const users = await prisma.user.findMany();
  return users;
}
export default async function page() {
  
  const users = await getData();
  console.log('user' + users);
  return (
    <div className="text-2xl bg-black text-white">
      hi there
      {users}
    </div>
  );
}
