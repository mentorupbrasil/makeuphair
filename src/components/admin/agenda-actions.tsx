"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AgendaActions({
  agendamentoId,
  status,
}: {
  agendamentoId: string;
  status: string;
}) {
  const router = useRouter();

  async function updateStatus(novoStatus: string) {
    await fetch(`/api/agendamentos/${agendamentoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novoStatus }),
    });
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-1">
      {status === "PENDENTE" && (
        <Button size="sm" variant="outline" onClick={() => updateStatus("CONFIRMADO")}>
          Confirmar
        </Button>
      )}
      {status !== "REALIZADO" && status !== "CANCELADO" && (
        <>
          <Button size="sm" variant="ghost" onClick={() => updateStatus("REALIZADO")}>
            Realizado
          </Button>
          <Button size="sm" variant="ghost" onClick={() => updateStatus("CANCELADO")}>
            Cancelar
          </Button>
        </>
      )}
    </div>
  );
}
