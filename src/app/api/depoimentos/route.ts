import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const depoimentos = await prisma.depoimento.findMany({
    where: { ativo: true },
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(depoimentos);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const depoimento = await prisma.depoimento.create({
    data: {
      nome: String(body.nome),
      texto: String(body.texto),
      estrelas: Number(body.estrelas) || 5,
      ordem: Number(body.ordem) || 0,
      ativo: true,
    },
  });
  return NextResponse.json(depoimento, { status: 201 });
}
