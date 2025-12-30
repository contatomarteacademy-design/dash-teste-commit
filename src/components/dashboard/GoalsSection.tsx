import { useFinance } from '../../contexts/FinanceContext';
import { formatCurrency } from '../../utils/format';

export function GoalsSection() {
  const { goals } = useFinance();

  const getProgress = (goal: typeof goals[0]) => {
    return Math.min(100, Math.round((goal.current / goal.target) * 100));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2 py-2">
        <div className="flex items-center gap-[14px]">
          <span className="text-xl">🎯</span>
          <h3 className="text-xl font-bold text-primary-black">Objetivos</h3>
        </div>
        <button className="text-sm text-primary-gray-text hover:text-primary-black">
          →
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pl-8 pb-4">
        {goals.slice(0, 4).map((goal) => {
          const progress = getProgress(goal);
          const remaining = goal.target - goal.current;

          return (
            <div
              key={goal.id}
              className="bg-white border border-primary-gray-border rounded-xl overflow-hidden flex-shrink-0"
              style={{ width: '298px' }}
            >
              {goal.image && (
                <div className="h-[220px] bg-cover bg-center" style={{ backgroundImage: `url(${goal.image})` }}>
                </div>
              )}
              <div className="p-8">
                <h4 className="text-lg font-semibold text-primary-black mb-[11px]">{goal.name}</h4>
                <div className="mb-5">
                  <div className="flex items-baseline gap-[13px] mb-5">
                    <span className="text-2xl font-bold text-primary-black" style={{ lineHeight: '32px' }}>
                      {formatCurrency(goal.current)}
                    </span>
                    <span className="text-xs text-primary-gray-text" style={{ lineHeight: '20px' }}>
                      De {formatCurrency(goal.target)}
                    </span>
                  </div>
                  <div className="w-full bg-primary-gray-border rounded-full h-0 overflow-hidden mb-5 relative" style={{ height: '8px' }}>
                    <div
                      className="bg-primary-lime transition-all duration-1000"
                      style={{ width: `${progress}%`, height: '8px' }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary-black">{progress}%</span>
                  <span className="text-primary-gray-text">Faltam {formatCurrency(remaining)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

