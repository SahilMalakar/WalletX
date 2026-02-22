// apps/userWeb/components/SignIn.tsx
"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@repo/ui/Card";
import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/Button";

export function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const phoneNumber = String(formData.get("phoneNumber") ?? "");
    const password = String(formData.get("password") ?? "");

    if (!phoneNumber || !password) {
      setError("All fields are required");
      return;
    }

    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          phoneNumber,
          password,
          redirect: false,
        } as any);

        // signIn returns undefined in some setups; check session by redirecting
        router.push("/dashboard");
      } catch (err) {
        setError("Invalid phone number or password");
      }
    });
  }

  return (
    <Card className="w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium">Phone Number</label>
          <Input
            name="phoneNumber"
            placeholder="+91XXXXXXXXXX"
            required
            className="ui:w-full ui:border ui:border-gray-200 ui:text-gray-900 ui:placeholder-gray-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <Input
            name="password"
            type="password"
            required
            className="ui:w-full ui:border ui:border-gray-200 ui:text-gray-900 ui:placeholder-gray-400"
          />
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="text-sm text-center mt-4 text-gray-500">
        Don't have an account?{" "}
        <a href="/app/signup" className="text-indigo-600 hover:underline">
          Create account
        </a>
      </div>
    </Card>
  );
}
