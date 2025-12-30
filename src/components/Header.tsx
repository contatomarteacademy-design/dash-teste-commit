import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as Select from '@radix-ui/react-select';
import { useFinance } from '../contexts/FinanceContext';
import { formatDate } from '../utils/format';

interface HeaderProps {
  onNewTransaction: () => void;
}

export function Header({ onNewTransaction }: HeaderProps) {
  const { filters, setFilters, members } = useFinance();
  const [searchValue, setSearchValue] = useState(filters?.search || '');

  if (!filters || !members) {
    return (
      <header className="bg-white border-b border-primary-gray-border p-6">
        <div className="text-primary-gray-text">Carregando...</div>
      </header>
    );
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setFilters({ ...filters, search: value });
  };

  const handleTypeChange = (type: 'all' | 'income' | 'expense') => {
    setFilters({ ...filters, type });
  };

  return (
    <header className="bg-white border-b border-primary-gray-border" style={{ padding: '24px 33px' }}>
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-[88px]">
        {/* Left: Search and Filters */}
        <div className="flex flex-wrap items-end gap-[13px] flex-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]" style={{ maxWidth: '346px' }}>
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-full border border-primary-gray-border focus:outline-none focus:ring-2 focus:ring-primary-black text-lg"
            />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-gray-text">
              🔍
            </span>
          </div>

          {/* Filters Button */}
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="w-14 h-14 rounded-full border border-primary-gray-border hover:bg-primary-gray-light transition-colors flex items-center justify-center">
                <span className="text-xl">⚙️</span>
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="bg-white rounded-xl shadow-lg border border-primary-gray-border p-4 min-w-[300px] z-50"
                sideOffset={5}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Tipo</label>
                    <div className="flex gap-2">
                      {(['all', 'income', 'expense'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => handleTypeChange(type)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filters.type === type
                              ? 'bg-primary-black text-white'
                              : 'bg-primary-gray-light text-primary-black hover:bg-primary-gray-border'
                          }`}
                        >
                          {type === 'all' ? 'Todos' : type === 'income' ? 'Receitas' : 'Despesas'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Membro</label>
                    <Select.Root
                      value={filters.memberId || 'all'}
                      onValueChange={(value) =>
                        setFilters({ ...filters, memberId: value === 'all' ? undefined : value })
                      }
                    >
                      <Select.Trigger className="w-full px-4 py-2 rounded-lg border border-primary-gray-border bg-white flex items-center justify-between">
                        <Select.Value placeholder="Todos os membros" />
                        <Select.Icon>▼</Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="bg-white rounded-lg shadow-lg border border-primary-gray-border p-2 min-w-[200px]">
                          <Select.Item value="all" className="px-4 py-2 rounded hover:bg-primary-gray-light cursor-pointer">
                            Todos os membros
                          </Select.Item>
                          {members.map((member) => (
                            <Select.Item
                              key={member.id}
                              value={member.id}
                              className="px-4 py-2 rounded hover:bg-primary-gray-light cursor-pointer"
                            >
                              {member.name}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          {/* Date Range */}
          <div className="px-6 py-4 rounded-full border border-primary-gray-border flex items-center gap-4">
            <span className="text-xl">📅</span>
            <span className="text-lg font-normal">
              {filters.dateRange
                ? `${formatDate(filters.dateRange.from)} - ${formatDate(filters.dateRange.to)}`
                : '01 Jan - 31 Jan 2026'}
            </span>
          </div>

          {/* Family Members */}
          <div className="flex items-center gap-0">
            {members.slice(0, 3).map((member, index) => (
              <div
                key={member.id}
                className="w-[60px] h-[60px] rounded-full bg-primary-gray-border border-2 border-white -ml-4 first:ml-0 hover:scale-110 transition-transform cursor-pointer relative group"
                style={{ zIndex: members.length - index }}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-lime rounded-full border-2 border-white"></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-primary-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {member.name} - {member.role}
                </div>
              </div>
            ))}
            <button className="w-[60px] h-[60px] rounded-full bg-primary-gray-light border-2 border-dashed border-primary-gray-border flex items-center justify-center hover:bg-primary-gray-border transition-colors -ml-4">
              <span className="text-xl">+</span>
            </button>
          </div>
        </div>

        {/* Right: New Transaction Button */}
        <button
          onClick={onNewTransaction}
          className="px-6 py-4 bg-primary-black text-white rounded-full font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2.5 text-lg whitespace-nowrap"
        >
          <span>+</span>
          <span>Nova transação</span>
        </button>
      </div>
    </header>
  );
}

