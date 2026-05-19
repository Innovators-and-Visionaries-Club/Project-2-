import React from 'react';
import PlaceholderPanel from '../components/ui/PlaceholderPanel';

const Simulator = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Attack Simulator</h1>
        <p className="text-sm text-gray-500 text-balance">Run predictive simulations to see how risk propagates through the network.</p>
      </div>

      <div className="card p-8 bg-white shadow-lg border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Attack Type</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all">
              <option>SIM Swap</option>
              <option>Mule Chain</option>
              <option>Synthetic Identity</option>
            </select>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Node ID</label>
            <input 
              type="text" 
              placeholder="e.g. SIM-98210-XXXX"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all" 
            />
          </div>
        </div>

        <button className="w-full py-3 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-[0.98]">
          Run Simulation
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Propagation Results</h2>
        <PlaceholderPanel label="Propagation result will appear here" height="h-80" />
      </div>
    </div>
  );
};

export default Simulator;
