import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Check, ShieldOff, MapPin, Smartphone, AlertTriangle, Clock, Loader2 } from 'lucide-react';

/* ─── Add Contact Modal ─── */
export const AddContactModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ name: '', relation: '', phone: '' });

  if (!isOpen) return null;

  const isValid = formData.name.trim() && formData.relation && formData.phone.trim();

  const handleSubmit = () => {
    if (isValid) {
      onAdd(formData);
      setFormData({ name: '', relation: '', phone: '' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-[#121A2B] border border-white/10 rounded-t-3xl sm:rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-slideUp sm:animate-fadeIn">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-wide">Add Guardian</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter guardian's name"
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00D1FF]/50 focus:shadow-[0_0_10px_rgba(0,209,255,0.08)] transition-all"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Relation</label>
            <select
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-all"
              value={formData.relation}
              onChange={e => setFormData({ ...formData, relation: e.target.value })}
            >
              <option value="">Select relation</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Spouse">Spouse</option>
              <option value="Sibling">Sibling</option>
              <option value="Guardian">Guardian</option>
              <option value="Trusted Friend">Trusted Friend</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00D1FF]/50 focus:shadow-[0_0_10px_rgba(0,209,255,0.08)] transition-all"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>
        <div className="p-6 border-t border-white/5 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-300 font-medium hover:bg-white/5 transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="flex-1 px-4 py-3 rounded-xl bg-[#00D1FF] text-[#0B1020] font-bold hover:shadow-[0_0_20px_rgba(0,209,255,0.3)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Add Guardian
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Guardian Notification Modal ─── */
export const GuardianNotificationModal = ({ data, onRespond }) => {
  const [phase, setPhase] = useState('detecting'); // detecting → notifying → waiting
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!data) { setPhase('detecting'); setElapsed(0); return; }
    setPhase('detecting');
    const t1 = setTimeout(() => setPhase('notifying'), 1200);
    const t2 = setTimeout(() => setPhase('waiting'), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [data]);

  useEffect(() => {
    if (phase !== 'waiting' || !data) return;
    const iv = setInterval(() => setElapsed(p => p + 1), 1000);
    return () => clearInterval(iv);
  }, [phase, data]);

  if (!data) return null;

  const contextMap = {
    'SIM Swap Attempt':              { location: 'Unknown Carrier', device: 'SIM Network Event', icon: '📡' },
    'Unknown Device Login':          { location: 'Delhi, India',    device: 'Unknown Android Device', icon: '📱' },
    'Suspicious UPI Registration':   { location: 'Mumbai, India',   device: 'New UPI Service', icon: '💳' },
    'Multiple OTP Requests':         { location: 'Multiple IPs',    device: 'Automated Requests', icon: '🔐' },
    'Fraudulent Transaction Attempt':{ location: 'Bengaluru, India', device: 'POS Terminal',    icon: '🏧' }
  };
  const ctx = contextMap[data.request_type] || { location: 'Unknown', device: 'Unknown', icon: '⚠' };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-end sm:items-center justify-center">
      <div className="bg-[#121A2B] border border-[#FF4D4D]/20 rounded-t-3xl sm:rounded-2xl w-full max-w-md overflow-hidden shadow-[0_0_60px_rgba(255,77,77,0.1)] animate-slideUp sm:animate-fadeIn">

        {/* Header Glow Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FF4D4D] via-[#FFB547] to-[#FF4D4D] animate-pulse" />

        <div className="p-6 space-y-5">
          {/* Icon + Title */}
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FF4D4D]/10 border border-[#FF4D4D]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,77,77,0.15)] animate-pulse">
              <ShieldAlert className="w-8 h-8 text-[#FF4D4D]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Suspicious Activity Detected</h2>
            <p className="text-sm text-gray-400">{data.message}</p>
          </div>

          {/* Threat Context Card */}
          <div className="bg-[#0B1020] rounded-xl border border-white/5 divide-y divide-white/5">
            <div className="flex items-center gap-3 p-3.5">
              <AlertTriangle className="w-4 h-4 text-[#FFB547] shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Threat Type</p>
                <p className="text-sm font-bold text-white">{data.request_type}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-widest ${
                data.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-[#FF4D4D]/15 text-[#FF4D4D]'
              }`}>{data.severity}</span>
            </div>
            <div className="flex items-center gap-3 p-3.5">
              <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Location</p>
                <p className="text-sm text-gray-200">{ctx.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3.5">
              <Smartphone className="w-4 h-4 text-gray-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Device</p>
                <p className="text-sm text-gray-200">{ctx.device}</p>
              </div>
            </div>
          </div>

          {/* Guardian Info + Phase */}
          <div className="bg-[#0B1020] rounded-xl p-4 border border-white/5">
            {data.contact_name ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/20 flex items-center justify-center text-[#00D1FF] text-xs font-bold">
                    {data.contact_name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{data.contact_name}</p>
                    <p className="text-[10px] text-[#00D1FF] uppercase tracking-wider">{data.contact_relation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {phase === 'detecting' && (
                    <p className="text-xs text-[#FFB547] flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Analyzing threat...</p>
                  )}
                  {phase === 'notifying' && (
                    <p className="text-xs text-[#00D1FF] flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Notifying guardian...</p>
                  )}
                  {phase === 'waiting' && (
                    <p className="text-xs text-[#FFB547] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FFB547] animate-ping" />
                      Waiting for response... <span className="text-gray-500 font-mono ml-1">{elapsed}s</span>
                    </p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-xs text-gray-500">No guardian available. Add a guardian to enable verification.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 border-t border-white/5 flex gap-3 bg-[#0B1020]/50">
          <button
            onClick={() => onRespond('REJECTED')}
            className="flex-1 px-4 py-3.5 rounded-xl border border-[#FF4D4D]/20 text-[#FF4D4D] font-bold text-sm hover:bg-[#FF4D4D]/10 hover:border-[#FF4D4D]/40 hover:shadow-[0_0_15px_rgba(255,77,77,0.1)] transition-all flex items-center justify-center gap-2"
          >
            <ShieldOff className="w-4 h-4" /> Reject & Lock
          </button>
          <button
            onClick={() => onRespond('APPROVED')}
            className="flex-1 px-4 py-3.5 rounded-xl bg-[#22C55E] text-white font-bold text-sm hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" /> Approve Activity
          </button>
        </div>
      </div>
    </div>
  );
};
