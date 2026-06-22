import { prisma } from "@/lib/prisma";
import { TrabalhosManager } from "@/components/admin/trabalhos-manager";
import { MidiasManager } from "@/components/admin/midias-manager";

export default async function MidiasPage() {
  const [trabalhos, midiasHero] = await Promise.all([
    prisma.trabalho.findMany({
      include: { fotos: { orderBy: { ordem: "asc" } } },
      orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
    }),
    prisma.midia.findMany({
      orderBy: [{ destaqueHome: "desc" }, { ordem: "asc" }, { createdAt: "desc" }],
    }),
  ]);

  return (
    <div>
      <p className="section-label">Site</p>
      <h1 className="font-display mt-2 text-3xl font-light">Portfólio & Home</h1>
      <p className="mt-1 text-sm text-stone">
        Cadastre trabalhos por modelo (3 fotos + @). Organize a ordem e escolha o que vai no hero.
      </p>
      <div className="mt-8">
        <TrabalhosManager initial={trabalhos} />
      </div>

      {midiasHero.length > 0 && (
        <div className="mt-16 border-t border-black/5 pt-12">
          <p className="section-label">Legado</p>
          <h2 className="font-display mt-2 text-2xl font-light">Fotos antigas (hero avulso)</h2>
          <p className="mt-1 text-sm text-stone">
            Uploads feitos antes do portfólio por cliente. Remova o destaque se a foto aparecer no topo por engano.
          </p>
          <div className="mt-6">
            <MidiasManager initial={midiasHero} />
          </div>
        </div>
      )}
    </div>
  );
}
