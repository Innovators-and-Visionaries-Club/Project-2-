import React, { useState } from 'react';
import { ShieldAlert, Loader2, Zap } from 'lucide-react';

const scenarios = [
  { title: 'SIM Swap Attempt',              desc: 'Unauthorized SIM porting request.',         risk: 'CRITICAL' },
  { title: 'Unknown Device Login',          desc: 'Login from unknown device in Delhi.',        risk: 'HIGH' },
  { title: 'Suspicious UPI Registration',   desc: 'New UPI ID linked to HDFC account.',        risk: 'CRITICAL' },
  { title: 'Multiple OTP Requests',         desc: '5 OTPs requested in under 2 minutes.',      risk: 'MEDIUM' },
  { title: 'Fraudulent Transaction Attempt', desc: '₹50,000 attempted on linked debit card.',  risk: 'HIGH' }
];

export const ThreatSimulator = ({ onSimulate, disabled }) => {
  const [loading, setLoading] = useState(null);

  const handleSimulate = async (scenario) => {
    setLoading(scenario.title);
    await new Promise(r => setTimeout(r, 600));
    await onSimulate(scenario.title);
    setLoading(null);
  };

  return (
    <div className="bg-[#121A2B] rounded-2xl p-6 border border-white/5">
      <h3 className="text-gray-400 font-medium text-sm tracking-widest uppercase mb-2 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-[#00D1FF]" /> Threat Simulator
      </h3>
      <p className="text-[11px] text-gray-500 mb-5">Trigger mock threats to test guardian verification workflows.</p>

      <div className="space-y-2.5">
        {scenarios.map((s, i) => {
          const isLoading = loading === s.title;
          return (
            <div
              key={i}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                isLoading
                  ? 'bg-[#FF4D4D]/5 border-[#FF4D4D]/20'
                  : 'bg-[#0B1020] border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex-1 min-w-0 mr-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold text-white truncate">{s.title}</span>
                  <span className={`shrink-0 text-[8px] px-1.5 py-0.5 rounded font-bold tracking-widest ${
                    s.risk === 'CRITICAL' ? 'bg-red-500/20 text-red-400'
                    : s.risk === 'HIGH'   ? 'bg-[#FF4D4D]/15 text-[#FF4D4D]'
                    :                       'bg-[#FFB547]/15 text-[#FFB547]'
                  }`}>
                    {s.risk}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 truncate">{s.desc}</p>
              </div>
              <button
                onClick={() => handleSimulate(s)}
                disabled={disabled || loading !== null}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-[#00D1FF]/10 text-[#00D1FF] text-xs font-bold hover:bg-[#00D1FF]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <><Zap className="w-3 h-3" /> Trigger</>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
