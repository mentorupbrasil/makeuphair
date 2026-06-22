import { prisma } from "@/lib/prisma";
import { CATEGORIA_PORTFOLIO_LABEL } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { ImageIcon } from "lucide-react";

export default async function PortfolioPage() {
  const items = await prisma.portfolioItem.findMany({
    where: { ativo: true },
    orderBy: { ordem: "asc" },
  });

  const categorias = Object.keys(CATEGORIA_PORTFOLIO_LABEL);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-4xl text-brand-brown">Portfólio</h1>
      <p className="mt-2 text-brand-taupe-dark">
        Galeria de trabalhos — maquiagem, penteados, noivas e eventos.
      </p>

      {items.length === 0 ? (
        <div className="mt-16 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-brand-taupe" />
          <p className="mt-4 text-brand-taupe-dark">
            Portfólio em construção. Em breve novas fotos!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categorias.map((cat) => (
              <Badge key={cat} className="bg-brand-cream text-brand-brown">
                {CATEGORIA_PORTFOLIO_LABEL[cat]}
              </Badge>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="aspect-square overflow-hidden rounded-sm bg-brand-cream/50"
            >
              <div className="flex h-full flex-col items-center justify-center p-4">
                <Badge className="bg-white/80 text-brand-brown">
                  {CATEGORIA_PORTFOLIO_LABEL[item.categoria]}
                </Badge>
                {item.titulo && (
                  <p className="mt-2 text-sm font-medium text-brand-taupe-dark">{item.titulo}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
