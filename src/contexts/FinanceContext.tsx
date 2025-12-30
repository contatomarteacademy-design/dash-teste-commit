import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { Transaction, Goal, Card, Member, Account, Category, Filters, Summary } from '../types';
import { mockTransactions, mockGoals, mockCards, mockMembers, mockAccounts, mockCategories } from '../data/mockData';
import { isDateInRange, getFirstDayOfMonth, getLastDayOfMonth } from '../utils/date';

interface FinanceContextType {
  // Data
  transactions: Transaction[];
  goals: Goal[];
  cards: Card[];
  members: Member[];
  accounts: Account[];
  categories: Category[];
  
  // Filters
  filters: Filters;
  setFilters: (filters: Filters) => void;
  
  // Computed values
  filteredTransactions: Transaction[];
  summary: Summary;
  categoryStats: Array<{ category: string; value: number; percentage: number }>;
  
  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  addCard: (card: Omit<Card, 'id'>) => void;
  addMember: (member: Omit<Member, 'id'>) => void;
  markTransactionAsPaid: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions || []);
  const [goals] = useState<Goal[]>(mockGoals || []);
  const [cards, setCards] = useState<Card[]>(mockCards || []);
  const [members, setMembers] = useState<Member[]>(mockMembers || []);
  const [accounts] = useState<Account[]>(mockAccounts || []);
  const [categories] = useState<Category[]>(mockCategories || []);
  
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    dateRange: {
      from: getFirstDayOfMonth(new Date()),
      to: getLastDayOfMonth(new Date()),
    },
  });

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower)
      );
    }

    // Filter by type
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    // Filter by member
    if (filters.memberId) {
      filtered = filtered.filter((t) => t.memberId === filters.memberId);
    }

    // Filter by date range
    if (filters.dateRange) {
      filtered = filtered.filter((t) => {
        try {
          const tDate = t.date instanceof Date ? t.date : new Date(t.date);
          return isDateInRange(tDate, filters.dateRange!.from, filters.dateRange!.to);
        } catch (e) {
          console.error('Error filtering by date:', e, t);
          return false;
        }
      });
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => {
      try {
        const aDate = a.date instanceof Date ? a.date : new Date(a.date);
        const bDate = b.date instanceof Date ? b.date : new Date(b.date);
        return bDate.getTime() - aDate.getTime();
      } catch (e) {
        console.error('Error sorting transactions:', e);
        return 0;
      }
    });
  }, [transactions, filters]);

  // Calculate summary
  const summary = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === 'income' && t.status === 'paid')
      .reduce((sum, t) => sum + t.value, 0);
    
    const expense = filteredTransactions
      .filter((t) => t.type === 'expense' && t.status === 'paid')
      .reduce((sum, t) => sum + t.value, 0);

    const totalBalance = income - expense;
    const savingsRate = income > 0 ? ((income - expense) / income) * 100 : 0;

    return {
      totalBalance,
      totalIncome: income,
      totalExpense: expense,
      savingsRate: Math.max(0, savingsRate),
    };
  }, [filteredTransactions]);

  // Calculate category statistics
  const categoryStats = useMemo(() => {
    const expenses = filteredTransactions.filter(
      (t) => t.type === 'expense' && t.status === 'paid'
    );
    
    const categoryMap = new Map<string, number>();
    expenses.forEach((t) => {
      const current = categoryMap.get(t.category) || 0;
      categoryMap.set(t.category, current + t.value);
    });

    const totalExpenses = summary.totalExpense || 1;
    const totalIncome = summary.totalIncome || 1;

    return Array.from(categoryMap.entries())
      .map(([category, value]) => ({
        category,
        value,
        percentage: Math.round((value / totalIncome) * 100),
      }))
      .sort((a, b) => b.value - a.value);
  }, [filteredTransactions, summary]);

  // Actions
  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  }, []);

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addGoal = useCallback((goal: Omit<Goal, 'id'>) => {
    // In a real app, this would be handled by the backend
    console.log('Add goal:', goal);
  }, []);

  const addCard = useCallback((card: Omit<Card, 'id'>) => {
    const newCard: Card = {
      ...card,
      id: Date.now().toString(),
    };
    setCards((prev) => [...prev, newCard]);
  }, []);

  const addMember = useCallback((member: Omit<Member, 'id'>) => {
    const newMember: Member = {
      ...member,
      id: Date.now().toString(),
    };
    setMembers((prev) => [...prev, newMember]);
  }, []);

  const markTransactionAsPaid = useCallback((id: string) => {
    updateTransaction(id, { status: 'paid' });
  }, [updateTransaction]);

  const value: FinanceContextType = {
    transactions,
    goals,
    cards,
    members,
    accounts,
    categories,
    filters,
    setFilters,
    filteredTransactions,
    summary,
    categoryStats,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addGoal,
    addCard,
    addMember,
    markTransactionAsPaid,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}

