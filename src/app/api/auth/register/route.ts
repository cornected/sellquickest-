import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const { name, email, password, phone } = await request.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email and password required" }, { status: 400 });
  }
  const existing = await prisma.user.findUnique({
    where: { email: String(email).toLowerCase() },
  });
  if (existing) {
    return NextResponse.json({ error: "That email is already registered" }, { status: 409 });
  }
  const user = await prisma.user.create({
    data: {
      name: String(name),
      email: String(email).toLowerCase(),
      phone: phone ? String(phone) : null,
      passwordHash: await bcrypt.hash(String(password), 10),
    },
  });
  await setSession({ id: user.id, name: user.name, email: user.email });
  return NextResponse.json({ ok: true });
}
