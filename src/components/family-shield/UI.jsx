import React from 'react';
import { Shield, Clock, ShieldCheck, ShieldOff, Users, AlertTriangle, Lock, CheckCircle2 } from 'lucide-react';

/* ─── Shield Status Bar ─── */
export const ShieldStatus = ({ contactsCount, alertsCount, isLocked }) => (
  <div className={`rounded-2xl p-6 border transition-all duration-700 ${
    isLocked 
      ? 'bg-[#1a0a0a] border-[#FF4D4D]/30 shadow-[0_0_40px_rgba(255,77,77,0.08)]' 
      : 'bg-[#121A2B] border-white/5'
  }`}>
    <h3 className="text-gray-400 font-medium text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
      <Shield className="w-4 h-4 text-[#00D1FF]" /> Protection Status
    </h3>
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-[#0B1020] rounded-xl p-4 border border-white/5">
        <div className="text-2xl font-bold text-white mb-1">{contactsCount}</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Guardians</div>
      </div>
      <div className="bg-[#0B1020] rounded-xl p-4 border border-white/5">
        <div className={`text-2xl font-bold mb-1 ${alertsCount > 0 ? 'text-[#FF4D4D]' : 'text-[#22C55E]'}`}>
          {alertsCount}
        </div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Active Alerts</div>
      </div>
      <div className="bg-[#0B1020] rounded-xl p-4 border border-white/5">
        <div className={`text-2xl font-bold mb-1 flex items-center gap-2 ${isLocked ? 'text-[#FF4D4D]' : 'text-[#22C55E]'}`}>
          {isLocked ? <Lock className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
        </div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider">{isLocked ? 'Locked' : 'Secure'}</div>
      </div>
    </div>
  </div>
);

/* ─── Severity Badge with Glow ─── */
export const SeverityBadge = ({ severity }) => {
  const config = {
    LOW:      { cls: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20 shadow-[0_0_6px_rgba(34,197,94,0.15)]' },
    MEDIUM:   { cls: 'bg-[#FFB547]/10 text-[#FFB547] border-[#FFB547]/20 shadow-[0_0_6px_rgba(255,181,71,0.15)]' },
    HIGH:     { cls: 'bg-[#FF4D4D]/10 text-[#FF4D4D] border-[#FF4D4D]/20 shadow-[0_0_8px_rgba(255,77,77,0.2)]' },
    CRITICAL: { cls: 'bg-red-500/20 text-red-400 border-red-500/30 shadow-[0_0_12px_rgba(255,77,77,0.3)] animate-pulse' }
  };
  const c = config[severity] || config.LOW;
  return (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border tracking-widest ${c.cls}`}>
      {severity}
    </span>
  );
};

/* ─── Security Timeline Item ─── */
export const TimelineItem = ({ log, isNew }) => {
  const getIcon = (action) => {
    if (action.includes('APPROVED')) return { icon: CheckCircle2, color: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20' };
    if (action.includes('REJECTED')) return { icon: ShieldOff, color: 'text-[#FF4D4D] bg-[#FF4D4D]/10 border-[#FF4D4D]/20' };
    if (action.includes('THREAT') || action.includes('ALERT')) return { icon: AlertTriangle, color: 'text-[#FFB547] bg-[#FFB547]/10 border-[#FFB547]/20' };
    if (action.includes('LOCKED')) return { icon: Lock, color: 'text-[#FF4D4D] bg-[#FF4D4D]/10 border-[#FF4D4D]/20' };
    if (action.includes('UNLOCKED')) return { icon: ShieldCheck, color: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20' };
    if (action.includes('CONTACT')) return { icon: Users, color: 'text-[#00D1FF] bg-[#00D1FF]/10 border-[#00D1FF]/20' };
    return { icon: Clock, color: 'text-gray-400 bg-white/5 border-white/10' };
  };

  const { icon: Icon, color } = getIcon(log.action);
  const time = new Date(log.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  return (
    <div className={`flex gap-3 relative transition-all duration-500 ${isNew ? 'animate-slideIn' : ''}`}>
      <div className="w-px bg-white/5 absolute left-[15px] top-8 bottom-0" />
      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 z-10 ${color}`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1 bg-[#121A2B] p-3.5 rounded-xl border border-white/5 mb-3 hover:border-white/10 transition-colors">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-[#00D1FF] tracking-wider font-mono">{log.action}</span>
          <span className="text-[10px] text-gray-500 font-mono">{time}</span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">{log.details}</p>
      </div>
    </div>
  );
};

/* ─── Empty State ─── */
export const EmptyState = ({ icon: Icon, title, subtitle }) => (
  <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-4">
      <Icon className="w-7 h-7 text-gray-600" />
    </div>
    <p className="text-sm font-semibold text-gray-400 mb-1">{title}</p>
    <p className="text-xs text-gray-600 max-w-xs">{subtitle}</p>
  </div>
);

/* ─── Identity Lock Banner ─── */
export const LockBanner = ({ isLocked, onToggle }) => {
  if (!isLocked) return null;
  return (
    <div className="bg-[#1a0a0a] border border-[#FF4D4D]/20 rounded-2xl p-4 flex items-center justify-between shadow-[0_0_30px_rgba(255,77,77,0.06)] animate-slideIn">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FF4D4D]/15 border border-[#FF4D4D]/20 flex items-center justify-center animate-pulse">
          <Lock className="w-5 h-5 text-[#FF4D4D]" />
        </div>
        <div>
          <p className="text-sm font-bold text-[#FF4D4D]">Identity Protection Active</p>
          <p className="text-[10px] text-[#FF4D4D]/60">All high-risk actions are currently blocked. Guardian verification required.</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className="px-4 py-2 rounded-xl bg-[#22C55E]/10 text-[#22C55E] text-xs font-bold border border-[#22C55E]/20 hover:bg-[#22C55E]/20 transition-all"
      >
        Unlock Identity
      </button>
    </div>
  );
};
