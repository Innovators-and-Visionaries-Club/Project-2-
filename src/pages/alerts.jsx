import React, { useState } from 'react';
import Badge from '../components/ui/Badge';
import { mockAlerts } from '../data/mockData';
import { 
  Filter, 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  ChevronDown,
  Eye,
  X,
  Shield
} from 'lucide-react';

const Alerts = () => {
  const [filter, setFilter] = useState('all');

  const filteredAlerts = filter === 'all' 
    ? mockAlerts 
    : mockAlerts.filter(a => a.riskLevel === filter);

  const unreadCount = mockAlerts.filter(a => a.status === 'Unread').length;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Your Alerts</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">Notifications about your identity and linked accounts.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'HIGH', 'MEDIUM', 'LOW'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                filter === f 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {f === 'all' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const isUnread = alert.status === 'Unread';
          return (
            <div 
              key={alert.id} 
              className={`card p-5 transition-all duration-300 hover:shadow-md cursor-pointer group ${
                isUnread ? 'border-l-4 border-l-indigo-500 bg-indigo-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-2 rounded-xl flex-shrink-0 ${
                  alert.riskLevel === 'HIGH' ? 'bg-red-50 text-red-500' 
                  : alert.riskLevel === 'MEDIUM' ? 'bg-amber-50 text-amber-500' 
                  : 'bg-emerald-50 text-emerald-500'
                }`}>
                  {alert.riskLevel === 'HIGH' ? <AlertTriangle className="w-5 h-5" /> 
                   : alert.riskLevel === 'MEDIUM' ? <Info className="w-5 h-5" /> 
                   : <Shield className="w-5 h-5" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{alert.eventType}</p>
                      {isUnread && <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />}
                    </div>
                    <Badge level={alert.riskLevel} />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{alert.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-[10px] text-gray-400 font-mono">{alert.timestamp}</span>
                    <span className="text-[10px] text-gray-300">•</span>
                    <span className="text-[10px] text-gray-400 font-medium">{alert.category}</span>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    alert.action === 'Secure Now' 
                      ? 'bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-200' 
                      : alert.action === 'Review'
                      ? 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm shadow-indigo-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                    {alert.action}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="card p-12 flex flex-col items-center justify-center text-center">
          <div className="p-4 rounded-2xl bg-emerald-50 mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <p className="text-sm font-bold text-slate-700">All Clear!</p>
          <p className="text-xs text-gray-400 mt-1">No alerts matching this filter.</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;
