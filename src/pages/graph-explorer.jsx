import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  Fingerprint, 
  Smartphone, 
  CreditCard, 
  Mail, 
  FileText, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Plus,
  ExternalLink
} from 'lucide-react';
import { linkedAssets } from '../data/mockData';
import IdentityGraph from '../components/ui/IdentityGraph';

const assetIcons = {
  'Aadhaar': Fingerprint,
  'PAN Card': FileText,
  'Mobile SIM': Smartphone,
  'Bank Account': CreditCard,
  'Email': Mail,
  'UPI Handle': ShieldCheck,
  'Passport': FileText,
};

const riskStyles = {
  SAFE: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  MEDIUM: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  HIGH: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  LOW: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
};

const GraphExplorer = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = linkedAssets.filter(a => 
    a.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.identifier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Identity Map</h1>
          <p className="text-sm text-gray-500 mt-1">Visualize and manage all your linked digital identities.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all active:scale-[0.98]">
          <Plus className="w-4 h-4" />
          Link New Asset
        </button>
      </div>

      {/* Identity Graph Visualization */}
      <IdentityGraph onSelectNode={(node) => setSelectedAsset(node)} />

      {/* Linked Assets Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">All Linked Assets</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter assets..."
              className="pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-xs bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all w-48"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filteredAssets.map((asset) => {
            const Icon = assetIcons[asset.type] || FileText;
            const risk = riskStyles[asset.risk] || riskStyles.SAFE;
            return (
              <div 
                key={asset.id} 
                className="card p-4 hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-indigo-200"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl ${risk.bg} ${risk.text} border ${risk.border}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{asset.type}</p>
                      <span className={`w-2 h-2 rounded-full ${risk.dot}`} />
                    </div>
                    <p className="text-xs text-gray-500 font-mono truncate">{asset.identifier}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${risk.bg} ${risk.text} border ${risk.border}`}>
                        {asset.status}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all mt-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GraphExplorer;
