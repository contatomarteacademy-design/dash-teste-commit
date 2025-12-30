import { useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import { useFinance } from '../../contexts/FinanceContext';
import { formatDate, formatCurrency } from '../../utils/format';

const ITEMS_PER_PAGE = 5;

export function TransactionsTable() {
  const { filteredTransactions, members, accounts } = useFinance();
  const [currentPage, setCurrentPage] = useState(1);

  if (!filteredTransactions || !members || !accounts) {
    return (
      <div className="bg-white rounded-xl p-6">
        <p className="text-primary-gray-text">Carregando...</p>
      </div>
    );
  }

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const getMember = (memberId: string) => {
    return members.find((m) => m.id === memberId);
  };

  const getAccount = (accountId: string) => {
    return accounts.find((a) => a.id === accountId);
  };

  return (
    <div className="bg-white rounded-xl" style={{ padding: '32px 24px 12px' }}>
      <div className="flex items-center justify-between mb-9">
        <div className="flex items-center gap-[14px]">
          <span className="text-xl">📊</span>
          <h3 className="text-xl font-bold text-primary-black">Extrato detalhado</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar lançamentos"
              className="pl-10 pr-4 py-2.5 rounded-full border border-primary-gray-border text-sm focus:outline-none focus:ring-2 focus:ring-primary-black w-[221px]"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-gray-text text-sm">
              🔍
            </span>
          </div>
          <select className="px-4 py-2.5 rounded-full border border-primary-gray-border text-sm focus:outline-none focus:ring-2 focus:ring-primary-black">
            <option>Todos</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-4 text-lg font-semibold text-primary-black w-[74px]">Membro</th>
              <th className="text-left py-4 text-lg font-semibold text-primary-black w-[88px]">Data</th>
              <th className="text-left py-4 text-lg font-semibold text-primary-black w-[221px]">Descrição</th>
              <th className="text-left py-4 text-lg font-semibold text-primary-black w-[88px]">Categoria</th>
              <th className="text-left py-4 text-lg font-semibold text-primary-black w-[127px]">Conta/Cartão</th>
              <th className="text-left py-4 text-lg font-semibold text-primary-black w-[127px]">Parcelas</th>
              <th className="text-right py-4 text-lg font-semibold text-primary-black w-[127px]">Valor</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => {
              const member = getMember(transaction.memberId);
              const account = getAccount(transaction.accountId);

              return (
                <tr key={transaction.id} className="border-b border-transparent">
                  <td className="py-4">
                    <Avatar.Root className="w-8 h-8 rounded-full bg-primary-gray-border flex items-center justify-center overflow-hidden">
                      <Avatar.Image
                        src={member?.avatar}
                        alt={member?.name}
                        className="w-full h-full object-cover"
                      />
                      <Avatar.Fallback className="w-full h-full bg-primary-gray-border flex items-center justify-center text-xs font-semibold">
                        {member?.name[0]}
                      </Avatar.Fallback>
                    </Avatar.Root>
                  </td>
                  <td className="py-4 text-base text-primary-black">{formatDate(transaction.date)}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <span className="text-base">
                        {transaction.type === 'income' ? '📈' : '📉'}
                      </span>
                      <span className="text-base text-primary-black">{transaction.description}</span>
                    </div>
                  </td>
                  <td className="py-4 text-base text-primary-black">{transaction.category}</td>
                  <td className="py-4 text-base text-primary-black">{account?.name || '-'}</td>
                  <td className="py-4 text-base text-primary-black">
                    {transaction.installments
                      ? `${transaction.installments.current}/${transaction.installments.total}`
                      : '-'}
                  </td>
                  <td
                    className={`py-4 text-base font-semibold text-right ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-primary-black'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.value)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-9">
        <p className="text-base font-semibold text-primary-black">
          Mostrando {startIndex + 1} a {Math.min(endIndex, filteredTransactions.length)} de{' '}
          {filteredTransactions.length}
        </p>
        <div className="flex items-center gap-[18px]">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-xl border border-primary-gray-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-gray-light flex items-center justify-center"
          >
            ←
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  currentPage === page
                    ? 'bg-primary-black text-white border-primary-black'
                    : 'border-primary-gray-border hover:bg-primary-gray-light text-primary-black'
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-xl border border-primary-gray-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-gray-light flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

