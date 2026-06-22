# MakeupHair

Sistema completo para maquiadoras e penteadistas — site público + painel administrativo.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** — UI moderna e responsiva
- **Prisma 7** + SQLite (dev) / PostgreSQL (prod)
- **JWT** — autenticação do painel admin

## Funcionalidades

### Site público (clientes)
- Página inicial com serviços em destaque e depoimentos
- Catálogo de serviços
- Portfólio (galeria)
- Agendamento online em 3 passos

### Painel admin (`/admin`)
- **Dashboard** — resumo do dia e do mês
- **Agenda** — calendário semanal estilo Google Calendar
- **Clientes** — CRM com preferências e histórico
- **Financeiro** — entradas, saídas e relatórios visuais
- **Estoque** — produtos, validade e alertas de estoque baixo
- **Noivas/Eventos** — fichas com checklist
- **Orçamentos** — envio via WhatsApp
- **Configurações** — perfil e horários de atendimento

## Como rodar

```bash
# Instalar dependências
npm install

# Criar banco e rodar migrations
npm run db:migrate

# Popular com dados de exemplo
npm run db:seed

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse:
- Site: http://localhost:3000
- Admin: http://localhost:3000/admin/login

**Login demo:** `admin@makeuphair.com` / `admin123`

## Deploy na Vercel

1. Conecte o repositório [mentorupbrasil/makeuphair](https://github.com/mentorupbrasil/makeuphair) no [painel da Vercel](https://vercel.com)
2. **Root Directory:** deixe vazio (raiz do repo) — o `package.json` já está na raiz
3. **Framework:** Next.js (detectado automaticamente)
4. Em **Settings → Environment Variables**, adicione:
   - `DATABASE_URL` = `file:./dev.db`
   - `AUTH_SECRET` = uma chave aleatória longa
5. Clique em **Deploy** ou **Redeploy** no último deployment

Se aparecer **404 NOT_FOUND** da Vercel, o deploy não concluiu — abra **Deployments**, veja o log do build e corrija o erro, ou faça **Redeploy** após o push das correções.

## Estrutura do banco

O schema Prisma inclui as tabelas que você propôs, expandidas:

| Tabela | Descrição |
|--------|-----------|
| `Usuario` | Login da maquiadora |
| `Perfil` | Dados públicos + config de agenda |
| `Cliente` | CRM com preferências JSON |
| `Servico` | Serviços com categorias |
| `Agendamento` | Reservas com status |
| `Receita` / `Despesa` | Financeiro |
| `Produto` | Estoque com alertas |
| `Evento` | Noivas/eventos + checklist |
| `Orcamento` | Orçamentos |
| `PortfolioItem` | Galeria do site |
| `Depoimento` | Depoimentos |

## Melhorias sugeridas (próximas etapas)

1. Upload de fotos (Cloudinary/S3) para portfólio e serviços
2. Notificações WhatsApp automáticas ao confirmar agendamento
3. Formulários CRUD completos no admin (criar/editar clientes, despesas, etc.)
4. Visualização dia/mês na agenda
5. Deploy na Vercel + PostgreSQL (Neon/Supabase)

## Repositório

https://github.com/mentorupbrasil/makeuphair
