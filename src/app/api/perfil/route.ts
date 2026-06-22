import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const perfil = await prisma.perfil.findFirst();
  return NextResponse.json(perfil);
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const existing = await prisma.perfil.findFirst();

  const data = {
    nome: body.nome,
    bio: body.bio ?? null,
    endereco: body.endereco ?? null,
    telefone: body.telefone ?? null,
    instagram: body.instagram ?? null,
    whatsapp: body.whatsapp ?? null,
    diasDisponiveis: body.diasDisponiveis,
    horaInicio: body.horaInicio,
    horaFim: body.horaFim,
    intervaloMin: Number(body.intervaloMin),
  };

  const perfil = existing
    ? await prisma.perfil.update({ where: { id: existing.id }, data })
    : await prisma.perfil.create({ data: { ...data, nome: data.nome || "Bianca Brito" } });

  return NextResponse.json(perfil);
}
