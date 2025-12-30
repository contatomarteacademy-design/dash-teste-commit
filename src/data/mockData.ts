import { Transaction, Goal, Card, Member, Account, Category } from '../types';

export const mockMembers: Member[] = [
  {
    id: '1',
    name: 'João',
    role: 'Pai',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=João',
    monthlyIncome: 15000,
  },
  {
    id: '2',
    name: 'Maria',
    role: 'Mãe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    monthlyIncome: 12000,
  },
  {
    id: '3',
    name: 'Pedro',
    role: 'Filho',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
  },
];

export const mockCategories: Category[] = [
  // Despesas
  { id: '1', name: 'Alimentação', type: 'expense' },
  { id: '2', name: 'Transporte', type: 'expense' },
  { id: '3', name: 'Moradia', type: 'expense' },
  { id: '4', name: 'Saúde', type: 'expense' },
  { id: '5', name: 'Educação', type: 'expense' },
  { id: '6', name: 'Lazer', type: 'expense' },
  { id: '7', name: 'Contas Fixas', type: 'expense' },
  { id: '8', name: 'Outros', type: 'expense' },
  // Receitas
  { id: '9', name: 'Salário', type: 'income' },
  { id: '10', name: 'Freelance', type: 'income' },
  { id: '11', name: 'Investimentos', type: 'income' },
  { id: '12', name: 'Outros', type: 'income' },
];

export const mockAccounts: Account[] = [
  { id: '1', name: 'Conta corrente', type: 'checking' },
  { id: '2', name: 'Poupança', type: 'savings' },
  { id: '3', name: 'Cartão Nubank', type: 'card' },
  { id: '4', name: 'Cartão Itaú', type: 'card' },
  { id: '5', name: 'Cartão Inter', type: 'card' },
];

export const mockCards: Card[] = [
  {
    id: '1',
    name: 'Nubank',
    closingDay: 5,
    dueDay: 15,
    limit: 5000,
    balance: 3450,
    theme: 'black',
    lastFourDigits: '1234',
  },
  {
    id: '2',
    name: 'Itaú',
    closingDay: 1,
    dueDay: 10,
    limit: 3000,
    balance: 1200,
    theme: 'white',
    lastFourDigits: '5678',
  },
  {
    id: '3',
    name: 'Inter',
    closingDay: 10,
    dueDay: 20,
    limit: 2000,
    balance: 890,
    theme: 'lime',
    lastFourDigits: '9012',
  },
];

export const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Viagem Europa',
    target: 10000,
    current: 3500,
    category: 'Viagem',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=400',
  },
  {
    id: '2',
    name: 'Carro',
    target: 45000,
    current: 15000,
    category: 'Veículo',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
  },
  {
    id: '3',
    name: 'Emergência',
    target: 20000,
    current: 12000,
    category: 'Reserva',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400',
  },
  {
    id: '4',
    name: 'Reforma',
    target: 30000,
    current: 8000,
    category: 'Casa',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
  },
];

// Gerar transações dos últimos 3 meses
const now = new Date();
const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const mockTransactions: Transaction[] = [
  // Receitas
  {
    id: '1',
    type: 'income',
    value: 15000,
    description: 'Salário',
    category: 'Salário',
    date: new Date(now.getFullYear(), now.getMonth(), 5),
    accountId: '1',
    memberId: '1',
    status: 'paid',
  },
  {
    id: '2',
    type: 'income',
    value: 12000,
    description: 'Salário',
    category: 'Salário',
    date: new Date(now.getFullYear(), now.getMonth(), 5),
    accountId: '1',
    memberId: '2',
    status: 'paid',
  },
  {
    id: '3',
    type: 'income',
    value: 5000,
    description: 'Freelance',
    category: 'Freelance',
    date: randomDate(threeMonthsAgo, now),
    accountId: '1',
    memberId: '1',
    status: 'paid',
  },
  // Despesas
  {
    id: '4',
    type: 'expense',
    value: 4000,
    description: 'Aluguel',
    category: 'Moradia',
    date: new Date(now.getFullYear(), now.getMonth(), 1),
    accountId: '1',
    memberId: '1',
    status: 'paid',
  },
  {
    id: '5',
    type: 'expense',
    value: 2500,
    description: 'Mercado',
    category: 'Alimentação',
    date: randomDate(threeMonthsAgo, now),
    accountId: '1',
    memberId: '1',
    status: 'paid',
  },
  {
    id: '6',
    type: 'expense',
    value: 1500,
    description: 'Compras',
    category: 'Outros',
    date: randomDate(threeMonthsAgo, now),
    accountId: '3',
    memberId: '2',
    installments: { current: 1, total: 3 },
    status: 'paid',
  },
  {
    id: '7',
    type: 'expense',
    value: 1200,
    description: 'Moradia',
    category: 'Moradia',
    date: randomDate(threeMonthsAgo, now),
    accountId: '1',
    memberId: '1',
    status: 'paid',
  },
  {
    id: '8',
    type: 'expense',
    value: 1000,
    description: 'Lazer',
    category: 'Lazer',
    date: randomDate(threeMonthsAgo, now),
    accountId: '3',
    memberId: '3',
    status: 'paid',
  },
  {
    id: '9',
    type: 'expense',
    value: 800,
    description: 'Vestimenta',
    category: 'Outros',
    date: randomDate(threeMonthsAgo, now),
    accountId: '3',
    memberId: '2',
    status: 'paid',
  },
  {
    id: '10',
    type: 'expense',
    value: 250,
    description: 'Conta de Luz',
    category: 'Contas Fixas',
    date: new Date(now.getFullYear(), now.getMonth(), 17),
    accountId: '1',
    memberId: '1',
    status: 'pending',
  },
  {
    id: '11',
    type: 'expense',
    value: 100,
    description: 'Conta de Água',
    category: 'Contas Fixas',
    date: new Date(now.getFullYear(), now.getMonth(), 17),
    accountId: '1',
    memberId: '1',
    status: 'pending',
  },
  {
    id: '12',
    type: 'expense',
    value: 120,
    description: 'Internet',
    category: 'Contas Fixas',
    date: new Date(now.getFullYear(), now.getMonth(), 28),
    accountId: '1',
    memberId: '1',
    status: 'pending',
  },
  {
    id: '13',
    type: 'expense',
    value: 1500,
    description: 'Escola',
    category: 'Educação',
    date: new Date(now.getFullYear(), now.getMonth() + 1, 5),
    accountId: '1',
    memberId: '3',
    status: 'pending',
  },
  {
    id: '14',
    type: 'expense',
    value: 120,
    description: 'Passeio no parque',
    category: 'Lazer',
    date: randomDate(threeMonthsAgo, now),
    accountId: '3',
    memberId: '3',
    status: 'paid',
  },
  {
    id: '15',
    type: 'expense',
    value: 3450,
    description: 'Fatura Nubank',
    category: 'Contas Fixas',
    date: new Date(now.getFullYear(), now.getMonth() + 1, 10),
    accountId: '3',
    memberId: '1',
    status: 'pending',
  },
];



