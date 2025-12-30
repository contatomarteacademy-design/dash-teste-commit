import { useFinance } from '../../contexts/FinanceContext';
import { formatCurrency } from '../../utils/format';

export function SummaryCards() {
  const { summary } = useFinance();

  if (!summary) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary-gray-light rounded-xl p-10">
          <p className="text-primary-gray-text">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-4 overflow-x-auto lg:overflow-visible">
      {/* Saldo Total */}
      <div className="bg-primary-black text-white rounded-xl p-10 flex flex-col gap-8 relative overflow-hidden flex-shrink-0" style={{ minWidth: '280px' }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">💰</span>
          <span className="text-base font-medium">Saldo total</span>
        </div>
        <div className="text-[28px] font-bold" style={{ lineHeight: '36px' }}>{formatCurrency(summary.totalBalance)}</div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-primary-lime">↑ 12%</span>
          <span className="opacity-70">vs mês anterior</span>
        </div>
      </div>

      {/* Receitas */}
      <div className="bg-white border border-primary-gray-border rounded-xl p-10 flex flex-col gap-8 flex-shrink-0" style={{ minWidth: '280px' }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📈</span>
          <span className="text-base font-medium text-primary-black">Receitas</span>
        </div>
        <div className="text-[28px] font-bold text-primary-black" style={{ lineHeight: '36px' }}>{formatCurrency(summary.totalIncome)}</div>
      </div>

      {/* Despesas */}
      <div className="bg-white border border-primary-gray-border rounded-xl p-10 flex flex-col gap-8 flex-shrink-0" style={{ minWidth: '280px' }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📉</span>
          <span className="text-base font-medium text-primary-black">Despesas</span>
        </div>
        <div className="text-[28px] font-bold text-primary-black" style={{ lineHeight: '36px' }}>{formatCurrency(summary.totalExpense)}</div>
      </div>
    </div>
  );
}

