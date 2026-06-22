import { prisma } from "@/lib/prisma";
import { MidiasManager } from "@/components/admin/midias-manager";

export default async function MidiasPage() {
  const midias = await prisma.midia.findMany({
    orderBy: [{ destaqueHome: "desc" }, { ordem: "asc" }],
  });

  return (
    <div>
      <p className="section-label">Site</p>
      <h1 className="font-display mt-2 text-3xl font-light">Mídias & Home</h1>
      <p className="mt-1 text-sm text-stone">
        Faça upload de fotos e vídeos. O site atualiza automaticamente.
      </p>
      <div className="mt-8">
        <MidiasManager initial={midias} />
      </div>
    </div>
  );
}
