# mycash+ - Sistema de Controle Financeiro Familiar

Sistema completo de controle financeiro familiar desenvolvido em React + TypeScript + Radix UI, com design baseado no Figma.

## 🚀 Tecnologias

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **Recharts** - Gráficos e visualizações
- **React Router** - Navegação
- **date-fns** - Manipulação de datas

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse `http://localhost:5173` no navegador

## 🎨 Funcionalidades

### Dashboard
- **Cards de Resumo**: Saldo total, Receitas e Despesas do período
- **Widget de Categorias**: Carousel com gráficos de donut mostrando % por categoria
- **Gráfico de Fluxo Financeiro**: AreaChart com receitas e despesas dos últimos 7 meses
- **Stack de Cartões**: Visualização 3D dos cartões com informações de uso
- **Calendário e Agenda**: Visualização de contas pendentes por data
- **Seção de Objetivos**: Grid responsivo com progresso dos objetivos
- **Tabela de Transações**: Extrato detalhado com paginação

### Páginas
- **Dashboard**: Visão geral completa
- **Objetivos**: Lista de objetivos financeiros
- **Cartões**: Gerenciamento de cartões de crédito
- **Transações**: Lista completa de transações
- **Perfil**: Informações do usuário

### Funcionalidades Principais
- ✅ Adicionar novas transações (receitas/despesas)
- ✅ Filtrar por tipo, membro, período e busca textual
- ✅ Visualizar estatísticas por categoria
- ✅ Gerenciar cartões de crédito
- ✅ Acompanhar objetivos financeiros
- ✅ Calendário com contas pendentes
- ✅ Marcar transações como pagas
- ✅ Responsivo (mobile e desktop)

## 📱 Responsividade

- **Desktop (1024px+)**: Sidebar fixa (256px expandida / 80px colapsada) + conteúdo responsivo
- **Mobile (<1024px)**: Header fixo + dropdown menu + conteúdo em coluna única

## 🎯 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── dashboard/      # Componentes específicos do dashboard
│   ├── modals/         # Modais (Nova Transação, etc)
│   ├── Header.tsx      # Cabeçalho com busca e filtros
│   └── Sidebar.tsx     # Barra lateral de navegação
├── contexts/           # Context API (useFinance)
├── data/               # Dados mock
├── pages/              # Páginas da aplicação
├── types/               # Tipos TypeScript
└── utils/              # Funções utilitárias
```

## 🎨 Design System

Cores baseadas no design do Figma:
- **Primary Black**: `#080B12`
- **Primary White**: `#FFFFFF`
- **Primary Lime**: `#DFFE35`
- **Primary Red**: `#EB4B5B`
- **Gray Light**: `#F3F4F6`
- **Gray Border**: `#E5E7EB`
- **Gray Text**: `#9CA3AF`

## 📊 Dados Mock

O sistema vem com dados mock pré-configurados:
- 3 membros da família (João, Maria, Pedro)
- 15+ transações dos últimos 3 meses
- 3 cartões de crédito (Nubank, Itaú, Inter)
- 4 objetivos financeiros
- Categorias de receitas e despesas

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## 🚧 Próximos Passos

Para conectar com backend, os endpoints esperados são:

```
GET/POST/PUT/DELETE /api/transactions
GET/POST/PUT/DELETE /api/goals
GET/POST/PUT/DELETE /api/cards
GET/POST /api/members
GET /api/summary?from=DATE&to=DATE&memberId=ID
```

Formato: datas ISO 8601, valores numéricos, IDs string (UUID), paginação padrão

## 📝 Notas

- O sistema está totalmente funcional com dados mock
- Todas as funcionalidades de filtro e busca estão implementadas
- Os gráficos são atualizados automaticamente quando os filtros mudam
- O design segue fielmente as especificações do Figma
