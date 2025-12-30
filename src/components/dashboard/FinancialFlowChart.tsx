import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinance } from '../../contexts/FinanceContext';
import { formatCurrencyShort } from '../../utils/format';

export function FinancialFlowChart() {
  const { transactions } = useFinance();

  const chartData = useMemo(() => {
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL'];
    const now = new Date();
    
    return months.map((month, index) => {
      const monthDate = new Date(now.getFullYear(), index, 1);
      const monthTransactions = transactions.filter((t) => {
        const tDate = new Date(t.date);
        return (
          tDate.getMonth() === monthDate.getMonth() &&
          tDate.getFullYear() === monthDate.getFullYear()
        );
      });

      const income = monthTransactions
        .filter((t) => t.type === 'income' && t.status === 'paid')
        .reduce((sum, t) => sum + t.value, 0);

      const expense = monthTransactions
        .filter((t) => t.type === 'expense' && t.status === 'paid')
        .reduce((sum, t) => sum + t.value, 0);

      return {
        month,
        income,
        expense,
      };
    });
  }, [transactions]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-primary-gray-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-primary-black mb-2">{payload[0].payload.month}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name === 'income' ? 'Receitas' : 'Despesas'}: {formatCurrencyShort(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl" style={{ padding: '39px 32px' }}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-[14px]">
          <span className="text-xl">📊</span>
          <h3 className="text-xl font-bold text-primary-black">Fluxo financeiro</h3>
        </div>
        <div className="flex items-center gap-[27px]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-black"></div>
            <span className="text-sm text-primary-black">Receitas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-lime"></div>
            <span className="text-sm text-primary-black">Despesas</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={228}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#080B12" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#080B12" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#DFFE35" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#DFFE35" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatCurrencyShort(value)} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#080B12"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorIncome)"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#DFFE35"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorExpense)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

