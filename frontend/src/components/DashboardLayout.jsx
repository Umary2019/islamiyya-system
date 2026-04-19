import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({
  title,
  subtitle,
  user,
  navigationItems,
  activeTab,
  onTabChange,
  headerAccent = 'blue',
  children,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const accentClasses = 'from-[#102733] via-[#123547] to-[#18485b]';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen md:flex mesh-bg fade-rise">
      <aside className={`md:w-80 bg-gradient-to-b ${accentClasses} text-white md:min-h-screen flex flex-col border-r border-[#315264]`}>
        <div className="p-6 border-b border-white/10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#d7ccba] mb-3">Islamiyya School</p>
          <h1 className="text-2xl font-bold leading-tight">{title}</h1>
          {subtitle && <p className="text-sm text-[#e5ddcf] mt-2">{subtitle}</p>}
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-x-auto md:overflow-visible">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onTabChange(item.key)}
                className={`w-full text-left px-4 py-3 rounded-xl transition flex items-center gap-3 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#f4e9ce] text-[#1c3745] shadow-xl'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full bg-[#9f3f31] hover:bg-[#873528] text-white px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
          >
            <span>⎋</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1">
        <header className="glass-panel border-b border-[color:var(--line-soft)] px-6 py-5">
          <div className="max-w-7xl mx-auto flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-[color:var(--ink-900)]">{title}</h2>
            {subtitle && <p className="text-[color:var(--ink-500)]">{subtitle}</p>}
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;