import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { filterOccupiedSlots, generateTimeSlots } from "@/lib/availability";
import { startOfDay, endOfDay } from "date-fns";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get("data");
  const servicoId = searchParams.get("servicoId");

  if (!data || !servicoId) {
    return NextResponse.json({ error: "Data e serviço são obrigatórios" }, { status: 400 });
  }

  const [perfil, servico] = await Promise.all([
    prisma.perfil.findFirst(),
    prisma.servico.findUnique({ where: { id: servicoId } }),
  ]);

  if (!servico) {
    return NextResponse.json({ error: "Serviço não encontrado" }, { status: 404 });
  }

  const date = new Date(data + "T12:00:00");
  const dayOfWeek = date.getDay();
  const dias = perfil?.diasDisponiveis.split(",").map(Number) ?? [1, 2, 3, 4, 5, 6];

  if (!dias.includes(dayOfWeek)) {
    return NextResponse.json({ horarios: [], message: "Dia indisponível" });
  }

  const inicio = startOfDay(date);
  const fim = endOfDay(date);

  const agendamentos = await prisma.agendamento.findMany({
    where: {
      data: { gte: inicio, lte: fim },
      status: { notIn: ["CANCELADO"] },
    },
    select: { horaInicio: true, horaFim: true },
  });

  const allSlots = generateTimeSlots(
    perfil?.horaInicio ?? "08:00",
    perfil?.horaFim ?? "18:00",
    perfil?.intervaloMin ?? 15,
    servico.duracaoMin
  );

  const horarios = filterOccupiedSlots(allSlots, agendamentos, servico.duracaoMin);

  return NextResponse.json({ horarios });
}
