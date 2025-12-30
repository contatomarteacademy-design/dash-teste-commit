import { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import { formatCurrency, formatDateShort } from '../../utils/format';

export function CardsStack() {
  const { cards } = useFinance();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

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
    <div className="bg-white rounded-xl">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="flex items-center gap-[14px]">
          <span className="text-xl">💳</span>
          <h3 className="text-xl font-bold text-primary-black">Cartões</h3>
        </div>
        <button className="text-sm text-primary-gray-text hover:text-primary-black">
          →
        </button>
      </div>

      <div className="relative px-10 pb-8" style={{ minHeight: '400px' }}>
        {cards.map((card, index) => {
          const isSelected = selectedCard === card.id;
          const usage = getUsagePercentage(card);
          const dueDate = new Date();
          dueDate.setDate(card.dueDay);

          return (
            <div
              key={card.id}
              onClick={() => setSelectedCard(isSelected ? null : card.id)}
              className={`absolute left-10 right-10 rounded-xl cursor-pointer transition-all ${
                getCardTheme(card.theme)
              } ${isSelected ? 'shadow-2xl -translate-y-2' : ''}`}
              style={{
                top: `${index * 45}px`,
                zIndex: cards.length - index + (isSelected ? 10 : 0),
                transform: isSelected ? 'translateY(-8px)' : `translateY(${index * 45}px)`,
                padding: '32px 40px',
              }}
            >
              <div className="flex items-center justify-between mb-0">
                <div className="flex items-center gap-8">
                  {card.logo && (
                    <div className="w-[30px] h-[30px] rounded bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold">{card.name[0]}</span>
                    </div>
                  )}
                  <div className="px-2 py-1 rounded bg-white bg-opacity-20">
                    <span className="text-xs font-semibold">Vence {formatDateShort(dueDate)}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mt-12">
                <p className="text-base font-medium opacity-70">{card.name}</p>
                <p className="text-[28px] font-bold" style={{ lineHeight: '36px' }}>{formatCurrency(card.balance)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

