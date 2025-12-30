import { useState } from 'react';
import { Header } from '../components/Header';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { CategoryCarousel } from '../components/dashboard/CategoryCarousel';
import { FinancialFlowChart } from '../components/dashboard/FinancialFlowChart';
import { CardsStack } from '../components/dashboard/CardsStack';
import { CalendarAgenda } from '../components/dashboard/CalendarAgenda';
import { GoalsSection } from '../components/dashboard/GoalsSection';
import { TransactionsTable } from '../components/dashboard/TransactionsTable';
import { NewTransactionModal } from '../components/modals/NewTransactionModal';

export function Dashboard() {
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary-gray-light">
      <Header onNewTransaction={() => setIsNewTransactionOpen(true)} />

      <div className="pt-[33px] px-0 pb-0">
        {/* Main Content Grid - Frame 45 */}
        <div className="flex flex-col lg:flex-row gap-[35px] mb-[38px] px-[33px]">
          {/* Left Column - Frame 43 */}
          <div className="flex-1 lg:max-w-[807px] flex flex-col gap-[41px]">
            {/* Category Carousel - Frame 24 */}
            <CategoryCarousel />
            
            {/* Summary Cards - Frame 26 (em row, não grid) */}
            <SummaryCards />
            
            {/* Financial Flow Chart - Frame 35 */}
            <FinancialFlowChart />
          </div>

          {/* Right Column - Frame 44 */}
          <div className="lg:w-[407px] flex flex-col gap-[10px]">
            {/* Cards Stack - Frame 42 */}
            <CardsStack />
            
            {/* Calendar Agenda - Frame 50 */}
            <CalendarAgenda />
          </div>
        </div>

        {/* Goals Section - Frame 47 */}
        <div className="px-[33px]">
          <GoalsSection />
        </div>

        {/* Transactions Table - Frame 78 */}
        <div className="mt-[38px] px-[33px]">
          <TransactionsTable />
        </div>
      </div>

      <NewTransactionModal
        open={isNewTransactionOpen}
        onOpenChange={setIsNewTransactionOpen}
      />
    </div>
  );
}

