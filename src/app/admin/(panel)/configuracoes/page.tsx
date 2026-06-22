import { prisma } from "@/lib/prisma";
import { ConfiguracoesForm } from "@/components/admin/configuracoes-form";

export default async function ConfiguracoesPage() {
  const perfil = await prisma.perfil.findFirst();

  return (
    <div>
      <p className="section-label">Sistema</p>
      <h1 className="font-display mt-2 text-3xl font-light">Configurações</h1>
      <p className="mt-1 text-sm text-stone">
        Perfil, contatos e horários usados no site e no agendamento online.
      </p>
      <ConfiguracoesForm perfil={perfil} />
    </div>
  );
}
