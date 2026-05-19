import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  LayoutDashboard, 
  Share2, 
  Bell, 
  Zap, 
  Settings, 
  Shield 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Graph Explorer', icon: Share2, path: '/graph-explorer' },
  { name: 'Alerts', icon: Bell, path: '/alerts' },
  { name: 'Simulator', icon: Zap, path: '/simulator' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-64 h-screen border-r border-gray-200 bg-white flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <Shield className="w-8 h-8 text-slate-900" />
        <span className="font-bold text-lg">Setu-Raksha</span>
      </div>

      <nav className="flex-1 mt-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = router.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-gray-100 text-slate-900 border-l-4 border-slate-900 rounded-l-none' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <item.icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-gray-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System: Live</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
