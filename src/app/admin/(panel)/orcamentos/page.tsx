import { prisma } from "@/lib/prisma";
import { OrcamentosManager } from "@/components/admin/orcamentos-manager";

export default async function OrcamentosPage() {
  const orcamentos = await prisma.orcamento.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <p className="section-label">Comercial</p>
      <h1 className="font-display mt-2 text-3xl font-light">Orçamentos</h1>
      <p className="mt-1 text-sm text-stone">Crie, controle e envie orçamentos pelo WhatsApp.</p>
      <div className="mt-8">
        <OrcamentosManager initial={orcamentos.map((o) => ({
          ...o,
          validade: o.validade.toISOString(),
        }))} />
      </div>
    </div>
  );
}
