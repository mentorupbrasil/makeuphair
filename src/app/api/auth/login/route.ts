import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, senha } = await request.json();

  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(senha, user.senhaHash))) {
    return NextResponse.json({ error: "E-mail ou senha inválidos" }, { status: 401 });
  }

  await createSession(user.id, user.email);
  return NextResponse.json({ ok: true });
}
