import { useFinance } from '../contexts/FinanceContext';
import { formatCurrency } from '../utils/format';

export function Goals() {
  const { goals } = useFinance();

  const getProgress = (goal: typeof goals[0]) => {
    return Math.min(100, Math.round((goal.current / goal.target) * 100));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary-black mb-6">Objetivos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {goals.map((goal) => {
          const progress = getProgress(goal);
          const remaining = goal.target - goal.current;

          return (
            <div
              key={goal.id}
              className="bg-white border border-primary-gray-border rounded-xl overflow-hidden"
            >
              {goal.image && (
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${goal.image})` }}>
                  <div className="h-full bg-black bg-opacity-20 flex items-center justify-center">
                    <span className="px-3 py-1 bg-white bg-opacity-90 rounded-full text-xs font-semibold text-primary-black">
                      {goal.category}
                    </span>
                  </div>
                </div>
              )}
              <div className="p-6">
                <h4 className="font-semibold text-primary-black mb-4">{goal.name}</h4>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold text-primary-black">
                      {formatCurrency(goal.current)}
                    </span>
                    <span className="text-sm text-primary-gray-text">
                      de {formatCurrency(goal.target)}
                    </span>
                  </div>
                  <div className="w-full bg-primary-gray-border rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary-lime h-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
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



