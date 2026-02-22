// apps/userWeb/components/SignUp.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@repo/ui/Card";
import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/Button";

export function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const phoneNumber = String(formData.get("phoneNumber") ?? "");
    const password = String(formData.get("password") ?? "");

    if (!email || !phoneNumber || !password) {
      setError("Required fields missing");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phoneNumber, password }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data?.message ?? "Registration failed");

        router.push("/app/signin");
      } catch (err: any) {
        setError(err?.message ?? "Something went wrong");
      }
    });
  }

  return (
    <Card className="w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input name="name" className="ui:w-full ui:border ui:border-gray-200 ui:text-gray-900 ui:placeholder-gray-400" />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <Input
            name="email"
            type="email"
            required
            className="ui:w-full ui:border ui:border-gray-200 ui:text-gray-900 ui:placeholder-gray-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Phone Number</label>
          <Input
            name="phoneNumber"
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
          {isPending ? "Creating..." : "Sign Up"}
        </Button>
      </form>

      <div className="text-sm text-center mt-4 text-gray-500">
        Already have an account?{" "}
        <a href="/signin" className="text-indigo-600 hover:underline">
          Sign in
        </a>
      </div>
    </Card>
  );
}
