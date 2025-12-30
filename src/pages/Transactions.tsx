import { TransactionsTable } from '../components/dashboard/TransactionsTable';
import { Header } from '../components/Header';
import { useState } from 'react';
import { NewTransactionModal } from '../components/modals/NewTransactionModal';

export function Transactions() {
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary-gray-light">
      <Header onNewTransaction={() => setIsNewTransactionOpen(true)} />
      <div className="p-6">
        <TransactionsTable />
      </div>
      <NewTransactionModal
        open={isNewTransactionOpen}
        onOpenChange={setIsNewTransactionOpen}
      />
    </div>
  );
}



