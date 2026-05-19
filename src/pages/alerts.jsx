import React from 'react';
import Badge from '../components/ui/Badge';
import { mockAlerts } from '../data/mockData';
import { Filter } from 'lucide-react';

const Alerts = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Alerts & Events</h1>
        <div className="flex gap-3">
          <select className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option>All Systems</option>
            <option>Telecom-V1</option>
            <option>Bank-Fin-Delta</option>
          </select>
          <select className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option>All Risk Levels</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50">
            <Filter className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Timestamp</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Event Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Source System</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Affected Node</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Risk Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockAlerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-xs text-gray-500 font-mono">{alert.timestamp}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800">{alert.eventType}</td>
                <td className="px-6 py-4 text-xs text-gray-600">{alert.sourceSystem}</td>
                <td className="px-6 py-4 text-xs font-medium text-slate-600">{alert.affectedNode}</td>
                <td className="px-6 py-4 text-right">
                  <Badge level={alert.riskLevel} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alerts;
