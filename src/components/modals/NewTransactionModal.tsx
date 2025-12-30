import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { useFinance } from '../../contexts/FinanceContext';
import { TransactionType } from '../../types';

interface NewTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewTransactionModal({ open, onOpenChange }: NewTransactionModalProps) {
  const { addTransaction, members, accounts, categories } = useFinance();
  const [formData, setFormData] = useState({
    type: 'expense' as TransactionType,
    value: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    accountId: '',
    memberId: '',
    installments: { current: 1, total: 1 },
    status: 'pending' as 'paid' | 'pending',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.value ||
      !formData.description ||
      !formData.category ||
      !formData.accountId ||
      !formData.memberId
    ) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    if (parseFloat(formData.value) <= 0) {
      alert('O valor deve ser maior que zero');
      return;
    }

    if (formData.description.length < 3) {
      alert('A descrição deve ter pelo menos 3 caracteres');
      return;
    }

    addTransaction({
      ...formData,
      value: parseFloat(formData.value),
      date: new Date(formData.date),
    });

    // Reset form
    setFormData({
      type: 'expense',
      value: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      accountId: '',
      memberId: '',
      installments: { current: 1, total: 1 },
      status: 'pending',
    });

    onOpenChange(false);
    alert('Transação adicionada com sucesso!');
  };

  const expenseCategories = categories.filter((c) => c.type === 'expense');
  const incomeCategories = categories.filter((c) => c.type === 'income');

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50">
          <Dialog.Title className="text-2xl font-bold text-primary-black mb-6">
            Nova Transação
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type */}
            <div>
              <label className="block text-sm font-semibold mb-2">Tipo</label>
              <div className="flex gap-2">
                {(['income', 'expense'] as TransactionType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, type })}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      formData.type === type
                        ? 'bg-primary-black text-white'
                        : 'bg-primary-gray-light text-primary-black hover:bg-primary-gray-border'
                    }`}
                  >
                    {type === 'income' ? 'Receita' : 'Despesa'}
                  </button>
                ))}
              </div>
            </div>

            {/* Value */}
            <div>
              <label className="block text-sm font-semibold mb-2">Valor *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-primary-gray-border focus:outline-none focus:ring-2 focus:ring-primary-black"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">Descrição *</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-primary-gray-border focus:outline-none focus:ring-2 focus:ring-primary-black"
                required
                minLength={3}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2">Categoria *</label>
              <Select.Root
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <Select.Trigger className="w-full px-4 py-3 rounded-lg border border-primary-gray-border bg-white flex items-center justify-between">
                  <Select.Value placeholder="Selecione uma categoria" />
                  <Select.Icon>▼</Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white rounded-lg shadow-lg border border-primary-gray-border p-2 min-w-[200px] max-h-[200px] overflow-y-auto">
                    {(formData.type === 'expense' ? expenseCategories : incomeCategories).map(
                      (category) => (
                        <Select.Item
                          key={category.id}
                          value={category.name}
                          className="px-4 py-2 rounded hover:bg-primary-gray-light cursor-pointer"
                        >
                          {category.name}
                        </Select.Item>
                      )
                    )}
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold mb-2">Data *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-primary-gray-border focus:outline-none focus:ring-2 focus:ring-primary-black"
                required
              />
            </div>

            {/* Account */}
            <div>
              <label className="block text-sm font-semibold mb-2">Conta/Cartão *</label>
              <Select.Root
                value={formData.accountId}
                onValueChange={(value) => setFormData({ ...formData, accountId: value })}
              >
                <Select.Trigger className="w-full px-4 py-3 rounded-lg border border-primary-gray-border bg-white flex items-center justify-between">
                  <Select.Value placeholder="Selecione uma conta" />
                  <Select.Icon>▼</Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white rounded-lg shadow-lg border border-primary-gray-border p-2 min-w-[200px]">
                    {accounts.map((account) => (
                      <Select.Item
                        key={account.id}
                        value={account.id}
                        className="px-4 py-2 rounded hover:bg-primary-gray-light cursor-pointer"
                      >
                        {account.name}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            {/* Member */}
            <div>
              <label className="block text-sm font-semibold mb-2">Membro *</label>
              <Select.Root
                value={formData.memberId}
                onValueChange={(value) => setFormData({ ...formData, memberId: value })}
              >
                <Select.Trigger className="w-full px-4 py-3 rounded-lg border border-primary-gray-border bg-white flex items-center justify-between">
                  <Select.Value placeholder="Selecione um membro" />
                  <Select.Icon>▼</Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white rounded-lg shadow-lg border border-primary-gray-border p-2 min-w-[200px]">
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

            {/* Installments */}
            {formData.type === 'expense' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Parcela Atual</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.installments.current}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        installments: { ...formData.installments, current: parseInt(e.target.value) },
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-primary-gray-border focus:outline-none focus:ring-2 focus:ring-primary-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Total de Parcelas</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.installments.total}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        installments: { ...formData.installments, total: parseInt(e.target.value) },
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-primary-gray-border focus:outline-none focus:ring-2 focus:ring-primary-black"
                  />
                </div>
              </div>
            )}

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold mb-2">Status</label>
              <div className="flex gap-2">
                {(['paid', 'pending'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({ ...formData, status })}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      formData.status === status
                        ? 'bg-primary-black text-white'
                        : 'bg-primary-gray-light text-primary-black hover:bg-primary-gray-border'
                    }`}
                  >
                    {status === 'paid' ? 'Pago' : 'Pendente'}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex-1 px-6 py-3 rounded-lg border border-primary-gray-border hover:bg-primary-gray-light transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-lg bg-primary-black text-white font-semibold hover:bg-opacity-90 transition-colors"
              >
                Salvar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}



