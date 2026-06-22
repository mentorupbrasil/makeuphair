import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const servicos = await prisma.servico.findMany({
    where: { ativo: true },
    select: { id: true, nome: true, duracaoMin: true, valorInicial: true },
    orderBy: { nome: "asc" },
  });
  return NextResponse.json(servicos);
}
