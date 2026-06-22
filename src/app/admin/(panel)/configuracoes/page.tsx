import { prisma } from "@/lib/prisma";
import { Card, CardTitle } from "@/components/ui/card";

const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default async function ConfiguracoesPage() {
  const perfil = await prisma.perfil.findFirst();

  const diasAtivos = perfil?.diasDisponiveis.split(",").map(Number) || [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Configurações</h1>
      <p className="text-stone-500">Perfil, agenda e preferências do sistema</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle>Perfil</CardTitle>
          {perfil ? (
            <div className="mt-4 space-y-2 text-sm">
              <p><span className="text-stone-500">Nome:</span> {perfil.nome}</p>
              <p><span className="text-stone-500">Bio:</span> {perfil.bio || "—"}</p>
              <p><span className="text-stone-500">Telefone:</span> {perfil.telefone || "—"}</p>
              <p><span className="text-stone-500">Endereço:</span> {perfil.endereco || "—"}</p>
              <p><span className="text-stone-500">Instagram:</span> {perfil.instagram || "—"}</p>
              <p><span className="text-stone-500">WhatsApp:</span> {perfil.whatsapp || "—"}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-stone-500">Perfil não configurado.</p>
          )}
        </Card>

        <Card>
          <CardTitle>Agenda</CardTitle>
          {perfil ? (
            <div className="mt-4 space-y-2 text-sm">
              <p><span className="text-stone-500">Horário:</span> {perfil.horaInicio} — {perfil.horaFim}</p>
              <p><span className="text-stone-500">Intervalo entre clientes:</span> {perfil.intervaloMin} min</p>
              <p className="text-stone-500">Dias disponíveis:</p>
              <div className="flex flex-wrap gap-2">
                {DIAS.map((dia, i) => (
                  <span
                    key={dia}
                    className={`rounded-full px-3 py-1 text-xs ${
                      diasAtivos.includes(i)
                        ? "bg-rose-100 text-rose-700"
                        : "bg-stone-100 text-stone-400"
                    }`}
                  >
                    {dia}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-stone-500">Agenda não configurada.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
