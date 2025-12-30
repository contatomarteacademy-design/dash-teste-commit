import { useFinance } from '../contexts/FinanceContext';
import { formatCurrency, formatDateShort } from '../utils/format';

export function Cards() {
  const { cards } = useFinance();

  const getCardTheme = (theme: string) => {
    switch (theme) {
      case 'black':
        return 'bg-primary-black text-white';
      case 'lime':
        return 'bg-primary-lime text-primary-black';
      case 'white':
        return 'bg-white text-primary-black border-2 border-primary-gray-border';
      default:
        return 'bg-primary-gray-light text-primary-black';
    }
  };

  const getUsagePercentage = (card: typeof cards[0]) => {
    return Math.round((card.balance / card.limit) * 100);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary-black">Cartões</h1>
        <button className="px-6 py-3 bg-primary-black text-white rounded-full font-semibold hover:bg-opacity-90 transition-colors">
          + Adicionar Cartão
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const usage = getUsagePercentage(card);
          const dueDate = new Date();
          dueDate.setDate(card.dueDay);

          return (
            <div
              key={card.id}
              className={`rounded-xl p-8 ${getCardTheme(card.theme)}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm opacity-70 mb-1">{card.name}</p>
                  <p className="text-2xl font-bold">{formatCurrency(card.balance)}</p>
                </div>
                {card.logo && (
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">{card.name[0]}</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-70">Limite</span>
                  <span className="font-semibold">{formatCurrency(card.limit)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-70">Vence</span>
                  <span className="font-semibold">{formatDateShort(dueDate)}</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-white h-full transition-all"
                    style={{ width: `${usage}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm">
                  <span className="font-semibold">{usage}% usado</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



