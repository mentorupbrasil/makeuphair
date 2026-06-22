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
  PENDENTE: "bg-amber-100 text-amber-800",
  CONFIRMADO: "bg-emerald-100 text-emerald-800",
  CANCELADO: "bg-red-100 text-red-800",
  REALIZADO: "bg-blue-100 text-blue-800",
  REMARCADO: "bg-purple-100 text-purple-800",
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

export const CATEGORIA_PORTFOLIO_LABEL: Record<string, string> = {
  ANTES_DEPOIS: "Antes / Depois",
  MAQUIAGEM: "Maquiagem",
  PENTEADO: "Penteados",
  NOIVA: "Noivas",
  EVENTO: "Eventos",
};

export const NAV_ADMIN = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/agenda", label: "Agenda", icon: "Calendar" },
  { href: "/admin/clientes", label: "Clientes", icon: "Users" },
  { href: "/admin/financeiro", label: "Financeiro", icon: "Wallet" },
  { href: "/admin/estoque", label: "Estoque", icon: "Package" },
  { href: "/admin/eventos", label: "Noivas/Eventos", icon: "Heart" },
  { href: "/admin/orcamentos", label: "Orçamentos", icon: "FileText" },
  { href: "/admin/configuracoes", label: "Configurações", icon: "Settings" },
] as const;

export const NAV_PUBLIC = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/agendar", label: "Agendar" },
] as const;
