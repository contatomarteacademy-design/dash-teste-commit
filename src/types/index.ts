export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  value: number;
  description: string;
  category: string;
  date: Date;
  accountId: string;
  memberId: string;
  installments?: {
    current: number;
    total: number;
  };
  status: 'paid' | 'pending';
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  category: string;
  image?: string;
}

export interface Card {
  id: string;
  name: string;
  closingDay: number;
  dueDay: number;
  limit: number;
  balance: number;
  theme: 'black' | 'lime' | 'white';
  logo?: string;
  lastFourDigits: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  monthlyIncome?: number;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'card';
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  icon?: string;
}

export interface Filters {
  search?: string;
  type?: TransactionType | 'all';
  memberId?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface Summary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  savingsRate: number;
}



