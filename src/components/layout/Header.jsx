import React from 'react';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-slate-900 fill-slate-900/10" />
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Setu-Raksha</h1>
      </div>
      
      <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-semibold text-emerald-700">System Live</span>
      </div>
    </header>
  );
};

export default Header;
