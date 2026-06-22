export const CATEGORIA_SERVICO_LABEL: Record<string, string> = {
  MAQUIAGEM_SOCIAL: "Maquiagem Social",
  MAQUIAGEM_NOIVA: "Maquiagem para Noivas",
  PENTEADO: "Penteados",
  PRODUCAO_COMPLETA: "Produção Completa",
  EVENTO: "Eventos",
  DOMICILIO: "Atendimento em Domicílio",
};

export const STATUS_AGENDAMENTO_LABEL: Record<string, string> = {
  PENDENTE: "Pendente",
  CONFIRMADO: "Confirmado",
  CANCELADO: "Cancelado",
  REALIZADO: "Realizado",
  REMARCADO: "Remarcado",
};

export const STATUS_AGENDAMENTO_COLOR: Record<string, string> = {
  PENDENTE: "bg-amber-50 text-amber-800 border-amber-200",
  CONFIRMADO: "bg-emerald-50 text-emerald-800 border-emerald-200",
  CANCELADO: "bg-red-50 text-red-800 border-red-200",
  REALIZADO: "bg-blue-50 text-blue-800 border-blue-200",
  REMARCADO: "bg-purple-50 text-purple-800 border-purple-200",
};

export const FORMA_PAGAMENTO_LABEL: Record<string, string> = {
  PIX: "PIX",
  DINHEIRO: "Dinheiro",
  CARTAO_CREDITO: "Cartão de Crédito",
  CARTAO_DEBITO: "Cartão de Débito",
  TRANSFERENCIA: "Transferência",
};

export const CATEGORIA_DESPESA_LABEL: Record<string, string> = {
  PRODUTOS: "Produtos",
  BASE: "Base",
  BATOM: "Batom",
  FIXADOR: "Fixador",
  SHAMPOO: "Shampoo",
  SPRAY: "Spray",
  EQUIPAMENTOS: "Equipamentos",
  SECADOR: "Secador",
  CHAPINHA: "Chapinha",
  PINCEIS: "Pincéis",
  OPERACIONAL: "Operacional",
  TRANSPORTE: "Transporte",
  ALUGUEL: "Aluguel",
  INTERNET: "Internet",
  OUTROS: "Outros",
};

export const STATUS_ORCAMENTO_LABEL: Record<string, string> = {
  RASCUNHO: "Rascunho",
  ENVIADO: "Enviado",
  ACEITO: "Aceito",
  RECUSADO: "Recusado",
  EXPIRADO: "Expirado",
};

export const NAV_ADMIN = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/midias", label: "Mídias & Home", icon: "Image" },
  { href: "/admin/agenda", label: "Agenda", icon: "Calendar" },
  { href: "/admin/orcamentos", label: "Orçamentos", icon: "FileText" },
  { href: "/admin/clientes", label: "Clientes", icon: "Users" },
  { href: "/admin/financeiro", label: "Financeiro", icon: "Wallet" },
  { href: "/admin/estoque", label: "Estoque", icon: "Package" },
  { href: "/admin/eventos", label: "Eventos", icon: "Heart" },
  { href: "/admin/configuracoes", label: "Configurações", icon: "Settings" },
] as const;

export const NAV_PUBLIC = [
  { href: "/", label: "Início" },
  { href: "/#trabalhos", label: "Trabalhos" },
  { href: "/servicos", label: "Serviços" },
  { href: "/agendar", label: "Agendar" },
] as const;
