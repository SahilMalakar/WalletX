import { signIn } from "../lib/auth";

export function SignIn() {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";

        const phoneNumber = formData.get("phoneNumber") as string;
        const password = formData.get("password") as string;

        if (!phoneNumber || !password) {
          throw new Error("Missing credentials");
        }

        await signIn("credentials", {
          phoneNumber,
          password,
          redirectTo: "/dashboard",
        });
      }}
    >
      <input name="phoneNumber" required />
      <input name="password" type="password" required />
      <button type="submit">Sign In</button>
    </form>
  );
}