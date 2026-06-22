import { prisma } from "@/lib/prisma";
import { DepoimentosManager } from "@/components/admin/depoimentos-manager";

export default async function DepoimentosPage() {
  const depoimentos = await prisma.depoimento.findMany({
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <p className="section-label">Site</p>
      <h1 className="font-display mt-2 text-3xl font-light">Depoimentos</h1>
      <p className="mt-1 max-w-xl text-sm text-stone">
        Cadastre avaliações reais de clientes. A seção na home só aparece com depoimentos publicados.
      </p>
      <div className="mt-8">
        <DepoimentosManager initial={depoimentos} />
      </div>
    </div>
  );
}
