import { NextResponse } from "next/server";
import { registerUser } from "../../../lib/userAuth.server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phoneNumber, password } = body;

    if (!email || !phoneNumber || !password) {
      return NextResponse.json(
        { ok: false, message: "Missing fields" },
        { status: 400 },
      );
    }

    const user = await registerUser({ name, email, phoneNumber, password });

    return NextResponse.json({ ok: true, id: user.id });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Error" },
      { status: 400 },
    );
  }
}
