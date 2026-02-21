import { auth } from "../../lib/auth";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="text-blue-500 text-center bg-amber-500">
          {
              session.user.email
      }
    </div>
  );
}
