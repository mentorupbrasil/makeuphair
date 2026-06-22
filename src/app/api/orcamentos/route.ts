import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const orcamentos = await prisma.orcamento.findMany({
    include: { cliente: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orcamentos);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const validade = body.validadeDias
    ? new Date(Date.now() + body.validadeDias * 86400000)
    : new Date(body.validade);

  const orcamento = await prisma.orcamento.create({
    data: {
      nomeCliente: body.nomeCliente,
      clienteId: body.clienteId || null,
      evento: body.evento || null,
      servicos: body.servicos,
      valor: Number(body.valor),
      validade,
      status: body.status || "RASCUNHO",
      observacoes: body.observacoes || null,
    },
  });
  return NextResponse.json(orcamento, { status: 201 });
}
