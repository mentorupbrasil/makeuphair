type Depoimento = {
  id: string;
  nome: string;
  texto: string;
};

export function TestimonialsBand({ depoimentos }: { depoimentos: Depoimento[] }) {
  if (depoimentos.length === 0) return null;

  return (
    <section className="border-y border-black/5 bg-ivory py-10 md:py-12">
      <div className="editorial-container">
        <p className="section-label text-center">O que dizem</p>
        <div
          className={`mt-8 grid gap-8 ${
            depoimentos.length === 1
              ? "max-w-2xl mx-auto"
              : depoimentos.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {depoimentos.slice(0, 6).map((d) => (
            <figure key={d.id} className="text-center md:text-left">
              <blockquote className="font-display text-lg font-light italic leading-relaxed text-ink/85 md:text-xl">
                &ldquo;{d.texto}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-stone">
                <span className="text-ink">{d.nome}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
