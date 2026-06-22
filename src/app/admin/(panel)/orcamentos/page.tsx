import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/admin/whatsapp-button";
import { BRAND, whatsappUrl } from "@/lib/brand";

const STATUS_ORC = {
  RASCUNHO: "Rascunho",
  ENVIADO: "Enviado",
  ACEITO: "Aceito",
  RECUSADO: "Recusado",
  EXPIRADO: "Expirado",
};

export default async function OrcamentosPage() {
  const orcamentos = await prisma.orcamento.findMany({
    include: { cliente: true },
    orderBy: { createdAt: "desc" },
  });

  const perfil = await prisma.perfil.findFirst();

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Orçamentos</h1>
      <p className="text-stone-500">Crie e envie orçamentos via WhatsApp</p>

      <div className="mt-6 space-y-4">
        {orcamentos.map((o) => {
          const nome = o.cliente?.nome || o.nomeCliente;
          const msgText =
            `Olá ${nome}! Segue seu orçamento:\n\n` +
            `Evento: ${o.evento || "—"}\n` +
            `Serviços: ${o.servicos}\n` +
            `Valor: ${formatCurrency(o.valor)}\n` +
            `Validade: ${formatDate(o.validade)}\n\n` +
            `${perfil?.nome || BRAND.fullName}`;

          return (
            <Card key={o.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-stone-900">{nome}</h2>
                  <Badge className="bg-stone-100 text-stone-700">{STATUS_ORC[o.status]}</Badge>
                </div>
                <div className="mt-1 text-sm text-stone-600">
                  <p>{o.evento && `Evento: ${o.evento}`}</p>
                  <p>{o.servicos}</p>
                  <p className="font-medium text-rose-600">{formatCurrency(o.valor)}</p>
                  <p className="text-stone-400">Validade: {formatDate(o.validade)}</p>
                </div>
              </div>
              <WhatsAppButton href={whatsappUrl(msgText)} />
            </Card>
          );
        })}
        {orcamentos.length === 0 && (
          <p className="text-stone-500">Nenhum orçamento cadastrado.</p>
        )}
      </div>
    </div>
  );
}
