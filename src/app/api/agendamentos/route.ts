import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function addMinutes(time: string, minutes: number) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const nh = Math.floor(total / 60);
  const nm = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}

export async function POST(request: Request) {
  const { servicoId, data, hora, nome, telefone, email } = await request.json();

  const servico = await prisma.servico.findUnique({ where: { id: servicoId } });
  if (!servico) {
    return NextResponse.json({ error: "Serviço não encontrado" }, { status: 404 });
  }

  let cliente = await prisma.cliente.findFirst({ where: { telefone } });
  if (!cliente) {
    cliente = await prisma.cliente.create({
      data: { nome, telefone, email: email || null },
    });
  }

  const agendamento = await prisma.agendamento.create({
    data: {
      clienteId: cliente.id,
      servicoId: servico.id,
      data: new Date(data + "T12:00:00"),
      horaInicio: hora,
      horaFim: addMinutes(hora, servico.duracaoMin),
      valor: servico.valorInicial,
      status: "PENDENTE",
    },
  });

  return NextResponse.json(agendamento, { status: 201 });
}
