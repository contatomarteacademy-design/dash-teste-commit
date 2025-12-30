import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useFinance } from '../../contexts/FinanceContext';
import { formatCurrency } from '../../utils/format';

const COLORS = ['#080B12', '#DFFE35', '#E5E7EB', '#9CA3AF', '#D1D5DB'];

export function CategoryCarousel() {
  const { categoryStats } = useFinance();

  const chartData = useMemo(() => {
    if (!categoryStats || categoryStats.length === 0) {
      return [];
    }
    return categoryStats.slice(0, 5).map((stat, index) => ({
      name: stat.category,
      value: stat.value,
      percentage: stat.percentage,
      color: COLORS[index % COLORS.length],
    }));
  }, [categoryStats]);

  if (!chartData || chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6">
        <p className="text-primary-gray-text">Nenhuma categoria encontrada</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl relative">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-4 pt-6 relative">
        {chartData.map((item, index) => (
          <div
            key={item.name}
            className="flex-shrink-0 w-[188px] bg-white border border-primary-gray-border rounded-xl p-8 flex flex-col items-center gap-3"
          >
            <div className="relative w-[71px] h-[71px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ name: item.name, value: item.value }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={32}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill={item.color} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary-black">{item.percentage}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-base font-medium text-primary-black">{item.name}</p>
              <p className="text-xl font-bold text-primary-black" style={{ lineHeight: '28px' }}>{formatCurrency(item.value)}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Gradient mask no final */}
      <div className="absolute right-0 top-0 bottom-0 w-[62px] bg-gradient-to-l from-primary-gray-light to-transparent pointer-events-none"></div>
    </div>
  );
}

