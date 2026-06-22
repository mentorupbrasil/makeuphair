import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status } = await request.json();

  const agendamento = await prisma.agendamento.update({
    where: { id },
    data: { status },
    include: { cliente: true, servico: true },
  });

  if (status === "REALIZADO") {
    const existing = await prisma.receita.findFirst({
      where: { agendamentoId: id },
    });
    if (!existing) {
      await prisma.receita.create({
        data: {
          agendamentoId: id,
          clienteId: agendamento.clienteId,
          descricao: `${agendamento.servico.nome} — ${agendamento.cliente.nome}`,
          valor: agendamento.valor,
          formaPagamento: "PIX",
        },
      });
    }
  }

  return NextResponse.json(agendamento);
}
