import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const senhaHash = await bcrypt.hash("admin123", 12);

  await prisma.usuario.upsert({
    where: { email: "admin@makeuphair.com" },
    update: {},
    create: {
      nome: "Administradora",
      email: "admin@makeuphair.com",
      senhaHash,
    },
  });

  await prisma.perfil.upsert({
    where: { id: "perfil-default" },
    update: {},
    create: {
      id: "perfil-default",
      nome: "Bianca Brito",
      bio: "Maquiadora e penteadista especializada em noivas, eventos e produções completas. Beleza com elegância e sofisticação.",
      telefone: "(11) 99999-9999",
      instagram: "@biancabrito.makeup",
      whatsapp: "5511999999999",
    },
  });

  const servicos = [
    {
      nome: "Maquiagem Social",
      descricao: "Look natural e elegante para o dia a dia ou eventos informais.",
      categoria: "MAQUIAGEM_SOCIAL" as const,
      duracaoMin: 60,
      valorInicial: 150,
      destaque: true,
    },
    {
      nome: "Maquiagem para Noivas",
      descricao: "Produção impecável para o grande dia, com teste incluso.",
      categoria: "MAQUIAGEM_NOIVA" as const,
      duracaoMin: 90,
      valorInicial: 350,
      destaque: true,
    },
    {
      nome: "Penteados",
      descricao: "Penteados para festas, formaturas e ocasiões especiais.",
      categoria: "PENTEADO" as const,
      duracaoMin: 60,
      valorInicial: 120,
      destaque: true,
    },
    {
      nome: "Produção Completa",
      descricao: "Maquiagem + penteado com harmonização total do visual.",
      categoria: "PRODUCAO_COMPLETA" as const,
      duracaoMin: 120,
      valorInicial: 250,
      destaque: true,
    },
    {
      nome: "Eventos",
      descricao: "Atendimento para grupos em festas, aniversários e corporativos.",
      categoria: "EVENTO" as const,
      duracaoMin: 45,
      valorInicial: 180,
      destaque: false,
    },
    {
      nome: "Atendimento em Domicílio",
      descricao: "Comodidade de ser atendida no conforto da sua casa.",
      categoria: "DOMICILIO" as const,
      duracaoMin: 90,
      valorInicial: 200,
      destaque: false,
    },
  ];

  for (const s of servicos) {
    const existing = await prisma.servico.findFirst({ where: { nome: s.nome } });
    if (!existing) await prisma.servico.create({ data: s });
  }

  const maria = await prisma.cliente.upsert({
    where: { id: "cliente-maria" },
    update: {},
    create: {
      id: "cliente-maria",
      nome: "Maria Silva",
      telefone: "(11) 98888-8888",
      instagram: "@mariasilva",
      preferencias: JSON.stringify({
        gosta: ["pele iluminada", "tons rosados"],
        naoGosta: ["cílios muito grandes"],
      }),
      observacoes: "Cliente VIP, prefere horários da tarde.",
    },
  });

  const servicoCompleto = await prisma.servico.findFirst({
    where: { nome: "Produção Completa" },
  });

  if (servicoCompleto) {
    const hoje = new Date();
    hoje.setHours(14, 0, 0, 0);

    const existingAg = await prisma.agendamento.findFirst({
      where: { clienteId: maria.id, data: hoje },
    });

    if (!existingAg) {
      await prisma.agendamento.create({
        data: {
          clienteId: maria.id,
          servicoId: servicoCompleto.id,
          data: hoje,
          horaInicio: "14:00",
          horaFim: "16:00",
          valor: 250,
          status: "CONFIRMADO",
        },
      });
    }
  }

  const produtos = [
    { nome: "Base Mac Studio Fix", marca: "MAC", quantidade: 2, estoqueMinimo: 1, validade: new Date("2026-08-01") },
    { nome: "Fixador", marca: "Urban Decay", quantidade: 1, estoqueMinimo: 2, validade: new Date("2026-12-01") },
    { nome: "Batom Ruby Woo", marca: "MAC", quantidade: 3, estoqueMinimo: 1 },
  ];

  for (const p of produtos) {
    const existing = await prisma.produto.findFirst({ where: { nome: p.nome } });
    if (!existing) await prisma.produto.create({ data: p });
  }

  const depoimentos = [
    { nome: "Carla M.", texto: "Fiquei linda no meu casamento! Profissional incrível.", estrelas: 5 },
    { nome: "Juliana R.", texto: "Melhor maquiagem que já fiz. Super recomendo!", estrelas: 5 },
    { nome: "Patricia L.", texto: "Atendimento impecável e resultado perfeito.", estrelas: 5 },
  ];

  for (const d of depoimentos) {
    const existing = await prisma.depoimento.findFirst({ where: { nome: d.nome } });
    if (!existing) await prisma.depoimento.create({ data: d });
  }

  const eventoExisting = await prisma.evento.findFirst({ where: { titulo: "Casamento Ana" } });
  if (!eventoExisting) {
    await prisma.evento.create({
      data: {
        clienteId: maria.id,
        titulo: "Casamento Ana",
        data: new Date("2026-09-20"),
        local: "Fazenda X",
        pacote: "Completo",
        valorTotal: 1500,
        valorEntrada: 500,
        status: "CONFIRMADO",
        checklist: {
          create: [
            { titulo: "Teste maquiagem", concluido: true, ordem: 1 },
            { titulo: "Teste penteado", concluido: true, ordem: 2 },
            { titulo: "Separar materiais", concluido: true, ordem: 3 },
            { titulo: "Confirmar horário", concluido: false, ordem: 4 },
          ],
        },
      },
    });
  }

  const orcExisting = await prisma.orcamento.findFirst({ where: { nomeCliente: "Joana" } });
  if (!orcExisting) {
    await prisma.orcamento.create({
      data: {
        nomeCliente: "Joana",
        evento: "Formatura",
        servicos: "Make + Hair",
        valor: 450,
        validade: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "RASCUNHO",
      },
    });
  }

  console.log("✅ Seed concluído!");
  console.log("   Login: admin@makeuphair.com / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
