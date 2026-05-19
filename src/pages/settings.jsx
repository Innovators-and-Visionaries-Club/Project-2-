import React from 'react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
      <div className="card p-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">System Configuration</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div>
                <p className="text-sm font-medium">Real-time Monitoring</p>
                <p className="text-xs text-gray-500">Enable live streaming of risk events</p>
              </div>
              <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div>
                <p className="text-sm font-medium">Auto-Isolation</p>
                <p className="text-xs text-gray-500">Automatically isolate nodes above risk score 90</p>
              </div>
              <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
