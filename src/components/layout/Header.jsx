import React from 'react';
import { useRouter } from 'next/router';
import { Bell, Search, Shield } from 'lucide-react';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/graph-explorer': 'My Identity',
  '/alerts': 'Alerts & Notifications',
  '/simulator': 'Security Scanner',
  '/settings': 'Account Settings',
};

const Header = () => {
  const router = useRouter();
  const title = pageTitles[router.pathname] || 'Dashboard';

  return (
    <header className="h-16 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-30">
      <div>
        <h1 className="text-lg font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="text-[11px] text-gray-400 -mt-0.5 font-medium">Welcome back, Srinivas</p>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-56 pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-xs bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all"
            placeholder="Search assets, alerts..."
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
          <Bell className="w-4 h-4 text-gray-500" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
            2
          </span>
        </button>

        {/* Identity Score Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-700">Score: 82</span>
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-pointer hover:shadow-md transition-shadow">
          SP
        </div>
      </div>
    </header>
  );
};

export default Header;
