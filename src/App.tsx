import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './contexts/FinanceContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Goals } from './pages/Goals';
import { Cards } from './pages/Cards';
import { Transactions } from './pages/Transactions';
import { Profile } from './pages/Profile';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <FinanceProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-primary-gray-light">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          <main
            className={`flex-1 transition-all duration-300 ${
              isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-[414px]'
            }`}
          >
            <Routes>
              <Route path="/test" element={<div className="p-6"><h1 className="text-2xl">Teste Simples</h1></div>} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/objetivos" element={<Goals />} />
              <Route path="/cartoes" element={<Cards />} />
              <Route path="/transacoes" element={<Transactions />} />
              <Route path="/perfil" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;

