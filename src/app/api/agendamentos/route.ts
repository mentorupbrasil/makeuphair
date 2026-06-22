import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

function addMinutes(time: string, minutes: number) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export async function POST(request: Request) {
  const session = await getSession();
  const body = await request.json();

  // Público: agendamento online
  if (!session) {
    const { servicoId, data, hora, nome, telefone, email } = body;
    const servico = await prisma.servico.findUnique({ where: { id: servicoId } });
    if (!servico) return NextResponse.json({ error: "Serviço não encontrado" }, { status: 404 });

    const date = new Date(data + "T12:00:00");
    const inicio = new Date(date);
    inicio.setHours(0, 0, 0, 0);
    const fim = new Date(date);
    fim.setHours(23, 59, 59, 999);

    const conflito = await prisma.agendamento.findFirst({
      where: {
        data: { gte: inicio, lte: fim },
        horaInicio: hora,
        status: { notIn: ["CANCELADO"] },
      },
    });
    if (conflito) {
      return NextResponse.json({ error: "Horário indisponível. Escolha outro." }, { status: 409 });
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

  // Admin: criar agendamento manual
  let clienteId = body.clienteId;
  if (!clienteId && body.nomeCliente && body.telefone) {
    let cliente = await prisma.cliente.findFirst({ where: { telefone: body.telefone } });
    if (!cliente) {
      cliente = await prisma.cliente.create({
        data: { nome: body.nomeCliente, telefone: body.telefone },
      });
    }
    clienteId = cliente.id;
  }

  const servico = await prisma.servico.findUnique({ where: { id: body.servicoId } });
  const agendamento = await prisma.agendamento.create({
    data: {
      clienteId,
      servicoId: body.servicoId,
      data: new Date(body.data),
      horaInicio: body.horaInicio,
      horaFim: body.horaFim || addMinutes(body.horaInicio, servico?.duracaoMin || 60),
      valor: Number(body.valor ?? servico?.valorInicial ?? 0),
      status: body.status || "CONFIRMADO",
      observacao: body.observacao || null,
    },
    include: { cliente: true, servico: true },
  });
  return NextResponse.json(agendamento, { status: 201 });
}
