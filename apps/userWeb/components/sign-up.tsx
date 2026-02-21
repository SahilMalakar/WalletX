import { registerUser } from "../lib/userAuth.server";
import { redirect } from "next/navigation";

export function SignUp() {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        const password = formData.get("password") as string;

        await registerUser({
          name,
          email,
          phoneNumber,
          password,
        });

        redirect("/signin");
      }}
      className="flex flex-col gap-4 max-w-sm"
    >
      <input name="name" placeholder="Name" className="border p-2" />
      <input name="email" placeholder="Email" required className="border p-2" />
      <input
        name="phoneNumber"
        placeholder="Phone"
        required
        className="border p-2"
      />
      <input name="password" type="password" required className="border p-2" />
      <button className="bg-black text-white p-2 rounded">Sign Up</button>
    </form>
  );
}
