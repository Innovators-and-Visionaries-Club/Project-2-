import React from 'react';
import StatCard from '../components/ui/StatCard';
import PlaceholderPanel from '../components/ui/PlaceholderPanel';
import Badge from '../components/ui/Badge';
import { mockStats, mockAlerts } from '../data/mockData';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Live Risk Graph</h2>
          <PlaceholderPanel label="Graph visualization loads here" height="h-[500px]" />
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Recent Alerts</h2>
          <div className="card divide-y divide-gray-100">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] text-gray-400 font-medium">{alert.timestamp}</span>
                  <Badge level={alert.riskLevel} />
                </div>
                <p className="text-sm font-bold text-slate-800">{alert.eventType}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.sourceSystem}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
