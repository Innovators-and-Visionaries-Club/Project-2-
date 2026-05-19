import React, { useState } from 'react';
import { 
  User, 
  Smartphone, 
  CreditCard, 
  Mail, 
  FileText, 
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Fingerprint
} from 'lucide-react';

const NODES = [
  { 
    id: 'user', 
    label: 'You (Srinivas P)', 
    type: 'User', 
    x: 250, 
    y: 200, 
    risk: 'SAFE',
    icon: User,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    details: { Status: 'Verified', 'Risk Level': 'Low', 'Last Check': 'Just now' }
  },
  { 
    id: 'phone', 
    label: '+91 98210 44921', 
    type: 'Phone SIM', 
    x: 120, 
    y: 100, 
    risk: 'SAFE',
    icon: Smartphone,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    details: { Provider: 'Telecom-V1', Status: 'Active', 'eSIM Enabled': 'Yes' }
  },
  { 
    id: 'aadhaar', 
    label: 'XXXX-XXXX-8921', 
    type: 'Aadhaar ID', 
    x: 380, 
    y: 100, 
    risk: 'SAFE',
    icon: Fingerprint,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    details: { Authority: 'UIDAI', 'Biometric Lock': 'Enabled', 'Last eKYC': '2 days ago' }
  },
  { 
    id: 'bank', 
    label: 'HDFC Bank ...3891', 
    type: 'Bank Account', 
    x: 380, 
    y: 300, 
    risk: 'MEDIUM',
    icon: CreditCard,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    details: { Branch: 'Bengaluru', Status: 'Monitoring', 'Daily Limit': '₹1,00,000' }
  },
  { 
    id: 'email', 
    label: 'srinivas.p@gmail.com', 
    type: 'Email', 
    x: 120, 
    y: 300, 
    risk: 'SAFE',
    icon: Mail,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    details: { Provider: 'Google Mail', MFA: 'Enabled (App Authenticator)', 'Pwned Check': 'No Leaks' }
  },
  { 
    id: 'upi', 
    label: 'srini@okhdfc', 
    type: 'UPI Handle', 
    x: 250, 
    y: 60, 
    risk: 'SAFE',
    icon: ShieldCheck,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    details: { App: 'GPay', Status: 'Linked to Bank', 'Sms Alerts': 'Enabled' }
  },
  { 
    id: 'pan', 
    label: 'ABCDE****F', 
    type: 'PAN Card', 
    x: 250, 
    y: 340, 
    risk: 'SAFE',
    icon: FileText,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    details: { Authority: 'IT Dept', Status: 'Verified', LinkedToAadhaar: 'Yes' }
  }
];

const CONNECTIONS = [
  { from: 'user', to: 'phone' },
  { from: 'user', to: 'aadhaar' },
  { from: 'user', to: 'bank' },
  { from: 'user', to: 'email' },
  { from: 'phone', to: 'upi' },
  { from: 'bank', to: 'upi' },
  { from: 'aadhaar', to: 'bank' },
  { from: 'user', to: 'pan' }
];

export default function IdentityGraph({ onSelectNode, highlightedNode }) {
  const [selectedNode, setSelectedNode] = useState(NODES[0]);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    if (onSelectNode) {
      onSelectNode(node);
    }
  };

  const getRiskColor = (risk) => {
    if (risk === 'CRITICAL' || risk === 'HIGH') return 'stroke-red-500';
    if (risk === 'MEDIUM') return 'stroke-amber-500';
    return 'stroke-emerald-400';
  };

  return (
    <div className="card p-6 bg-white flex flex-col md:flex-row gap-6 relative overflow-hidden">
      {/* Graph Area */}
      <div className="flex-1 min-h-[400px] border border-gray-100 rounded-xl relative bg-[radial-gradient(#f1f5f9_1.5px,transparent_1.5px)] [background-size:24px_24px] flex items-center justify-center">
        <svg viewBox="0 0 500 400" className="w-full h-full max-h-[400px]">
          {/* Defs for gradients/glowing lines */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Lines */}
          {CONNECTIONS.map((conn, idx) => {
            const fromNode = NODES.find(n => n.id === conn.from);
            const toNode = NODES.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            // Highlight connections related to highlightedNode (used in simulation)
            const isSimulatedFail = highlightedNode && 
              (conn.from === highlightedNode || conn.to === highlightedNode);

            const isRelatedToSelected = selectedNode && 
              (conn.from === selectedNode.id || conn.to === selectedNode.id);

            return (
              <line
                key={idx}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                className={`transition-all duration-300 ${
                  isSimulatedFail 
                    ? 'stroke-red-500 stroke-[3px] animate-pulse' 
                    : isRelatedToSelected 
                    ? 'stroke-slate-800 stroke-[2px]' 
                    : 'stroke-gray-200 stroke-[1.5px]'
                }`}
                strokeDasharray={isSimulatedFail ? '5,5' : undefined}
              />
            );
          })}

          {/* Pulsing signal flows along paths */}
          {CONNECTIONS.map((conn, idx) => {
            const fromNode = NODES.find(n => n.id === conn.from);
            const toNode = NODES.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            
            const isSimulatedFail = highlightedNode && 
              (conn.from === highlightedNode || conn.to === highlightedNode);

            return (
              <line
                key={`flow-${idx}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                className={`transition-all duration-300 stroke-[2px] opacity-60 ${
                  isSimulatedFail ? 'stroke-red-400' : 'stroke-emerald-400'
                }`}
                strokeDasharray="4, 12"
                style={{
                  animation: 'dash 3s linear infinite',
                  display: highlightedNode || selectedNode.id === conn.from || selectedNode.id === conn.to ? 'block' : 'none'
                }}
              />
            );
          })}

          {/* Nodes */}
          {NODES.map((node) => {
            const Icon = node.icon;
            const isSelected = selectedNode.id === node.id;
            const isHighlighted = highlightedNode === node.id;
            
            // Determine border color based on status/interaction
            let borderClass = 'border-gray-200 hover:border-slate-400';
            if (isHighlighted) {
              borderClass = 'border-red-500 ring-4 ring-red-100 animate-bounce';
            } else if (isSelected) {
              borderClass = 'border-slate-800 ring-4 ring-slate-100';
            } else if (node.risk === 'MEDIUM') {
              borderClass = 'border-amber-300';
            } else if (node.risk === 'SAFE') {
              borderClass = 'border-emerald-200';
            }

            return (
              <g 
                key={node.id} 
                className="cursor-pointer select-none group"
                onClick={() => handleNodeClick(node)}
                transform={`translate(${node.x - 20}, ${node.y - 20})`}
              >
                {/* Node circle background */}
                <circle 
                  cx="20" 
                  cy="20" 
                  r="24" 
                  className={`fill-white border transition-all duration-300 ${borderClass}`}
                  strokeWidth="2"
                />
                
                {/* Badge for risk status */}
                {node.risk === 'MEDIUM' && !isHighlighted && (
                  <circle cx="38" cy="6" r="6" className="fill-amber-500 stroke-white stroke-2" />
                )}

                {/* Lucide Icon in the node */}
                <foreignObject x="8" y="8" width="24" height="24" className="pointer-events-none">
                  <div className={`w-full h-full flex items-center justify-center ${
                    isHighlighted ? 'text-red-600' : node.id === 'user' ? 'text-indigo-600' : node.risk === 'MEDIUM' ? 'text-amber-600' : 'text-slate-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </foreignObject>

                {/* Label text */}
                <text 
                  x="20" 
                  y="56" 
                  textAnchor="middle" 
                  className={`text-[9px] font-bold tracking-tight transition-all duration-300 ${
                    isHighlighted ? 'fill-red-600 font-extrabold' : isSelected ? 'fill-slate-900 font-extrabold' : 'fill-gray-500'
                  }`}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
        
        {/* Graph Legend */}
        <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-100 flex gap-4 text-[10px] font-medium text-gray-500 shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>High Risk / Leak</span>
          </div>
        </div>
      </div>

      {/* Info Side Panel */}
      <div className="w-full md:w-64 bg-slate-50 border border-slate-200/50 rounded-xl p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className={`p-1.5 rounded-lg bg-white border border-slate-200 ${
              selectedNode.risk === 'MEDIUM' ? 'text-amber-600' : 'text-slate-700'
            }`}>
              {React.createElement(selectedNode.icon, { className: 'w-4 h-4' })}
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{selectedNode.type}</p>
              <h4 className="text-sm font-bold text-slate-900">{selectedNode.label}</h4>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-200/60">
            {Object.entries(selectedNode.details).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">{key}</span>
                <span className="font-bold text-slate-800">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200/60 space-y-2">
          {selectedNode.risk === 'MEDIUM' ? (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Risk Identified</span>
              </div>
              <p className="text-[10px] leading-relaxed text-amber-700">This account is connected to systems reporting active credential breaches.</p>
              <button className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold transition-colors">
                Run Auditing
              </button>
            </div>
          ) : selectedNode.id === 'user' ? (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-xs text-indigo-800">
              <span className="font-bold block mb-1">Your Identity Rating</span>
              <p className="text-[10px] text-indigo-600 leading-relaxed mb-2">You are currently well protected against identity replication and SIM-swapping.</p>
            </div>
          ) : (
            <button className="w-full py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1">
              <span>View Connections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </div>
  );
}
