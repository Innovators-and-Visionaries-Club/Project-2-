import React from 'react';
import { 
  Shield, 
  Link2, 
  Bell, 
  CheckCircle, 
  TrendingUp, 
  ArrowRight,
  Activity,
  AlertTriangle,
  Info,
  ChevronRight,
  Fingerprint,
  Smartphone,
  CreditCard,
  Mail
} from 'lucide-react';
import Badge from '../components/ui/Badge';
import { 
  mockStats, 
  mockAlerts, 
  securityTips, 
  recentActivity, 
  userProfile 
} from '../data/mockData';

const statIcons = {
  shield: Shield,
  link: Link2,
  bell: Bell,
  check: CheckCircle,
};

const activityIcons = {
  info: { icon: Info, color: 'text-blue-500 bg-blue-50' },
  success: { icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50' },
  warning: { icon: AlertTriangle, color: 'text-amber-500 bg-amber-50' },
};

const Dashboard = () => {
  const scorePercent = userProfile.identityScore;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (scorePercent / 100) * circumference;
  const scoreColor = scorePercent >= 80 ? 'text-emerald-500' : scorePercent >= 60 ? 'text-amber-500' : 'text-red-500';
  const strokeColor = scorePercent >= 80 ? 'stroke-emerald-500' : scorePercent >= 60 ? 'stroke-amber-500' : 'stroke-red-500';

  return (
    <div className="space-y-8">
      {/* ── Row 1: Score Card + Stats ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Identity Score Ring */}
        <div className="lg:col-span-1 card p-6 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -translate-y-8 translate-x-8 opacity-60" />
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              <circle 
                cx="60" cy="60" r="54" fill="none" 
                className={strokeColor}
                strokeWidth="8" 
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-black ${scoreColor}`}>{scorePercent}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">/ 100</span>
            </div>
          </div>
          <p className="mt-3 text-sm font-bold text-slate-700">Identity Score</p>
          <p className="text-[10px] text-gray-400 font-medium">Updated 2 hours ago</p>
        </div>

        {/* Stat Cards */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockStats.map((stat, i) => {
            const Icon = statIcons[stat.icon] || Shield;
            return (
              <div key={i} className="card p-5 hover:shadow-md transition-shadow duration-300 group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl ${
                    stat.color === 'amber' ? 'bg-amber-50 text-amber-600' 
                    : stat.color === 'green' ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' 
                    : stat.trend.startsWith('-') ? 'bg-red-50 text-red-600'
                    : 'bg-gray-50 text-gray-500'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-700 transition-colors">{stat.value}</h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Row 2: Alerts + Security Checklist ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Recent Alerts</h2>
            <a href="/alerts" className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-1 transition-colors">
              View All <ChevronRight className="w-3 h-3" />
            </a>
          </div>
          <div className="card divide-y divide-gray-100 overflow-hidden">
            {mockAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-gray-50/50 transition-colors flex items-start gap-4 cursor-pointer group">
                <div className={`mt-0.5 p-1.5 rounded-lg ${
                  alert.riskLevel === 'HIGH' ? 'bg-red-50' 
                  : alert.riskLevel === 'MEDIUM' ? 'bg-amber-50' 
                  : 'bg-emerald-50'
                }`}>
                  <AlertTriangle className={`w-4 h-4 ${
                    alert.riskLevel === 'HIGH' ? 'text-red-500' 
                    : alert.riskLevel === 'MEDIUM' ? 'text-amber-500' 
                    : 'text-emerald-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-sm font-bold text-slate-800 truncate group-hover:text-indigo-700 transition-colors">{alert.eventType}</p>
                    <Badge level={alert.riskLevel} />
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{alert.description}</p>
                  <p className="text-[10px] text-gray-400 mt-1 font-mono">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Checklist */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Security Checklist</h2>
          <div className="card p-5 space-y-4">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-700">Protection Level</span>
                <span className="font-bold text-indigo-600">2 / 4 Complete</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-700" style={{ width: '50%' }} />
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-3 pt-2">
              {securityTips.map((tip, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 ${
                  tip.done 
                    ? 'bg-emerald-50/50 border-emerald-100' 
                    : 'bg-white border-gray-100 hover:border-indigo-200 hover:shadow-sm cursor-pointer'
                }`}>
                  <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    tip.done ? 'bg-emerald-500' : 'border-2 border-gray-300'
                  }`}>
                    {tip.done && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${tip.done ? 'text-emerald-700 line-through' : 'text-slate-800'}`}>{tip.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 3: Activity Timeline + Quick Links ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Recent Activity</h2>
          <div className="card p-5">
            <div className="space-y-0">
              {recentActivity.map((item, i) => {
                const config = activityIcons[item.type] || activityIcons.info;
                const Icon = config.icon;
                return (
                  <div key={item.id} className="flex items-start gap-4 py-3 group">
                    <div className="flex flex-col items-center">
                      <div className={`p-1.5 rounded-lg ${config.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      {i < recentActivity.length - 1 && (
                        <div className="w-px h-full bg-gray-100 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-700 group-hover:text-indigo-700 transition-colors">{item.action}</p>
                      <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-4">{item.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Run Security Scan', desc: 'Check for breaches and vulnerabilities', icon: Activity, href: '/simulator', gradient: 'from-indigo-600 to-violet-600' },
              { label: 'View Identity Map', desc: 'See all your linked digital assets', icon: Fingerprint, href: '/graph-explorer', gradient: 'from-emerald-600 to-teal-600' },
              { label: 'Manage Linked Accounts', desc: 'Add, remove, or review connections', icon: Link2, href: '/settings', gradient: 'from-slate-700 to-slate-900' },
            ].map((action, i) => (
              <a 
                key={i}
                href={action.href}
                className="card p-4 flex items-center gap-4 hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{action.label}</p>
                  <p className="text-[10px] text-gray-400">{action.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
