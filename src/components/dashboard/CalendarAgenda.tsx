import { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import { formatDateShort } from '../../utils/format';
import { isSameDayDate } from '../../utils/date';

export function CalendarAgenda() {
  const { transactions } = useFinance();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get pending transactions for selected date
  const dayTransactions = transactions.filter(
    (t) => isSameDayDate(new Date(t.date), selectedDate) && t.status === 'pending'
  );

  // Get dates with pending transactions
  const datesWithPending = new Set(
    transactions
      .filter((t) => t.status === 'pending')
      .map((t) => new Date(t.date).toDateString())
  );

  const today = new Date();
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-xl">
      <div className="flex items-center gap-[14px] px-6 pt-6 pb-4">
        <span className="text-xl">📅</span>
        <h3 className="text-xl font-bold text-primary-black">Agenda</h3>
      </div>

      {/* Calendar */}
      <div className="px-3 pb-4">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} className="text-center text-base font-normal text-primary-black py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`}></div>
          ))}
          {days.map((day) => {
            const date = new Date(currentYear, currentMonth, day);
            const isSelected = isSameDayDate(date, selectedDate);
            const isToday = isSameDayDate(date, today);
            const hasPending = datesWithPending.has(date.toDateString());

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(date)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-normal transition-colors relative ${
                  isSelected
                    ? 'bg-primary-lime text-primary-black'
                    : isToday
                    ? 'border border-primary-red text-primary-red'
                    : 'hover:bg-primary-gray-light text-primary-black'
                }`}
              >
                {day}
                {hasPending && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-red rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Agenda List */}
      <div className="px-3 pb-4 space-y-4">
        {dayTransactions.length > 0 ? (
          dayTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between px-3 py-2"
            >
              <div className="flex items-center gap-2 flex-1">
                <div className="w-2 h-2 rounded-full bg-primary-red"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-black">{transaction.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-full bg-primary-gray-light text-sm font-medium text-primary-black hover:bg-primary-gray-border transition-colors">
                  {formatDateShort(new Date(transaction.date))}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-primary-gray-text py-8">Nada hoje</p>
        )}
      </div>
    </div>
  );
}

