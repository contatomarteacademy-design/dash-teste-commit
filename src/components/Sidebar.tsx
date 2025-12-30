import { Link, useLocation } from 'react-router-dom';
import * as Avatar from '@radix-ui/react-avatar';
import { useFinance } from '../contexts/FinanceContext';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { members } = useFinance();

  if (!members) {
    return (
      <aside className="fixed left-0 top-0 h-screen bg-white border-r border-primary-gray-border w-[414px] hidden lg:block">
        <div className="p-6 text-primary-gray-text">Carregando...</div>
      </aside>
    );
  }

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/objetivos', label: 'Objetivos', icon: '🎯' },
    { path: '/cartoes', label: 'Cartões', icon: '💳' },
    { path: '/transacoes', label: 'Transações', icon: '📊' },
    { path: '/perfil', label: 'Perfil', icon: '👤' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-primary-gray-border transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-[414px]'
      } hidden lg:block`}
    >
      <div className="flex flex-col h-full px-6 pt-8 pb-[61px]">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-[69px]">
          {!isCollapsed && (
            <div className="flex items-center gap-2" style={{ width: '207px', height: '36px' }}>
              <div className="w-[53px] h-[30px] bg-[#110051] rounded border border-black"></div>
              <span className="text-[32px] font-bold text-primary-black leading-[34px]">mycash+</span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-primary-black rounded mx-auto"></div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-[26px]">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2.5 px-6 py-4 rounded-full transition-colors ${
                isActive(item.path)
                  ? 'bg-primary-black text-white'
                  : 'text-primary-black hover:bg-primary-gray-light'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && (
                <span className="text-lg font-semibold">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="mt-auto space-y-0">
          {/* Logout */}
          <button className="flex items-center gap-2.5 px-6 py-4 rounded-full text-primary-red hover:bg-red-50 w-full mb-0">
            <span className="text-xl">🚪</span>
            {!isCollapsed && <span className="text-lg font-semibold">Sair</span>}
          </button>

          {/* Profile Card */}
          <div className="bg-primary-gray-light rounded-xl p-4 mt-0">
            <div className="flex items-center gap-4">
              <Avatar.Root className="w-[61px] h-[61px] rounded-full bg-primary-gray-border flex items-center justify-center overflow-hidden flex-shrink-0">
                <Avatar.Image
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <Avatar.Fallback className="w-full h-full bg-primary-gray-border flex items-center justify-center text-primary-black font-semibold">
                  LM
                </Avatar.Fallback>
              </Avatar.Root>
              {!isCollapsed && (
                <div className="flex-1 min-w-0" style={{ width: '183px' }}>
                  <p className="text-lg font-semibold text-primary-black truncate">Lucas Marte</p>
                  <p className="text-base text-primary-gray-text truncate">lucasmarte@gmail.com</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute top-8 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary-gray-light transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className="text-xl">{isCollapsed ? '→' : '←'}</span>
        </button>
      </div>
    </aside>
  );
}

