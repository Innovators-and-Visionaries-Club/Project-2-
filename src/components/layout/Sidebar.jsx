import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  LayoutDashboard, 
  Network, 
  Bell, 
  ScanLine, 
  Settings, 
  Shield,
  LogOut,
  User,
  Users
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'My Identity', icon: Network, path: '/graph-explorer' },
  { name: 'Alerts', icon: Bell, path: '/alerts', badge: 2 },
  { name: 'Security Scan', icon: ScanLine, path: '/simulator' },
  { name: 'Family Shield', icon: Users, path: '/family-shield' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-64 h-screen border-r border-gray-200/80 bg-white flex flex-col fixed left-0 top-0 z-40">
      {/* Brand */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="font-bold text-base text-slate-900 tracking-tight">Setu-Raksha</span>
          <p className="text-[10px] text-gray-400 font-medium -mt-0.5">Identity Shield</p>
        </div>
      </div>

      {/* User Mini Profile */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            SP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">Srinivas P</p>
            <p className="text-[10px] text-gray-400 truncate">Shield Pro</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 px-3 space-y-1">
        <p className="px-3 mb-2 text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em]">Menu</p>
        {navItems.map((item) => {
          const isActive = router.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 shadow-sm border border-indigo-100' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}
              `}
            >
              <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 space-y-3">
        <div className="flex items-center gap-2 px-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Protected</span>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
