import React, { useState } from 'react';
import { 
  ScanLine, 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Loader2, 
  ArrowRight, 
  RotateCcw,
  Globe,
  KeyRound,
  Smartphone,
  Fingerprint
} from 'lucide-react';
import { scanHistory } from '../data/mockData';

const scanTypes = [
  { 
    id: 'dark-web', 
    label: 'Dark Web Scan', 
    desc: 'Check if your credentials appear on the dark web or paste sites.', 
    icon: Globe,
    gradient: 'from-purple-600 to-indigo-600',
    shadow: 'shadow-purple-500/20'
  },
  { 
    id: 'credential', 
    label: 'Credential Breach Check', 
    desc: 'Verify if your email or phone have been part of known data breaches.', 
    icon: KeyRound,
    gradient: 'from-amber-500 to-orange-600',
    shadow: 'shadow-amber-500/20'
  },
  { 
    id: 'sim-swap', 
    label: 'SIM Swap Detection', 
    desc: 'Analyze if your SIM has been cloned or swapped without authorization.', 
    icon: Smartphone,
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/20'
  },
  { 
    id: 'full-audit', 
    label: 'Full Identity Audit', 
    desc: 'Complete audit of all linked identities and their risk posture.', 
    icon: Fingerprint,
    gradient: 'from-slate-700 to-slate-900',
    shadow: 'shadow-slate-500/20'
  },
];

const Simulator = () => {
  const [selectedScan, setSelectedScan] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleRunScan = () => {
    if (!selectedScan) return;
    setIsScanning(true);
    setScanResult(null);

    // Simulate a scan
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        status: selectedScan === 'credential' ? 'warning' : 'clean',
        message: selectedScan === 'credential' 
          ? 'We found 1 breach involving your email address. We recommend changing your password immediately.' 
          : 'No threats detected. Your identity assets are currently secure.',
        score: selectedScan === 'credential' ? 72 : 94,
        time: 'Just now',
      });
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-50 border border-indigo-100 mb-2">
          <ScanLine className="w-6 h-6 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Security Scanner</h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Run targeted scans to detect vulnerabilities, breaches, and threats to your digital identity.
        </p>
      </div>

      {/* Scan Type Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
        {scanTypes.map((scan) => {
          const isSelected = selectedScan === scan.id;
          return (
            <button
              key={scan.id}
              onClick={() => { setSelectedScan(scan.id); setScanResult(null); }}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 group ${
                isSelected 
                  ? 'border-indigo-500 bg-indigo-50/50 shadow-lg shadow-indigo-500/10' 
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${scan.gradient} shadow-lg ${scan.shadow}`}>
                  <scan.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className={`text-sm font-bold transition-colors ${isSelected ? 'text-indigo-700' : 'text-slate-800 group-hover:text-indigo-700'}`}>
                    {scan.label}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{scan.desc}</p>
                </div>
              </div>
              {isSelected && (
                <div className="mt-3 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Selected</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Run Button */}
      <div className="flex justify-center">
        <button
          onClick={handleRunScan}
          disabled={!selectedScan || isScanning}
          className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
            !selectedScan 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : isScanning 
              ? 'bg-indigo-500 text-white cursor-wait'
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-[0.97]'
          }`}
        >
          {isScanning ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Scanning Your Identity...</span>
            </>
          ) : (
            <>
              <ScanLine className="w-5 h-5" />
              <span>Start Scan</span>
            </>
          )}
        </button>
      </div>

      {/* Scanning Animation */}
      {isScanning && (
        <div className="max-w-lg mx-auto">
          <div className="card p-8 text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-8 h-8 text-indigo-500" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Analyzing your digital footprint...</p>
              <p className="text-xs text-gray-400 mt-1">This usually takes a few seconds</p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-1.5 rounded-full animate-pulse" style={{ width: '70%' }} />
            </div>
          </div>
        </div>
      )}

      {/* Scan Result */}
      {scanResult && !isScanning && (
        <div className="max-w-lg mx-auto">
          <div className={`card p-8 text-center space-y-4 border-2 ${
            scanResult.status === 'clean' ? 'border-emerald-200 bg-emerald-50/30' : 'border-amber-200 bg-amber-50/30'
          }`}>
            <div className={`inline-flex p-4 rounded-2xl ${
              scanResult.status === 'clean' ? 'bg-emerald-100' : 'bg-amber-100'
            }`}>
              {scanResult.status === 'clean' 
                ? <ShieldCheck className="w-10 h-10 text-emerald-600" />
                : <ShieldAlert className="w-10 h-10 text-amber-600" />
              }
            </div>
            <div>
              <p className={`text-lg font-black ${scanResult.status === 'clean' ? 'text-emerald-700' : 'text-amber-700'}`}>
                {scanResult.status === 'clean' ? 'All Clear!' : 'Action Required'}
              </p>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-sm mx-auto">{scanResult.message}</p>
            </div>
            <div className="flex items-center justify-center gap-6 pt-2">
              <div className="text-center">
                <p className={`text-2xl font-black ${scanResult.status === 'clean' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {scanResult.score}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Score</p>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => { setScanResult(null); setSelectedScan(null); }}
                className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                New Scan
              </button>
              {scanResult.status === 'warning' && (
                <button className="flex-1 py-2.5 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 transition-all shadow-sm flex items-center justify-center gap-1.5">
                  Secure Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Scan History */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Scan History</h2>
        <div className="card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scan Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Result</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {scanHistory.map((scan) => (
                <tr key={scan.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">{scan.type}</td>
                  <td className="px-6 py-4 text-xs text-gray-500 font-mono">{scan.date}</td>
                  <td className="px-6 py-4 text-xs text-gray-600">{scan.result}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      scan.status === 'clean' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {scan.status === 'clean' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {scan.status === 'clean' ? 'Clean' : 'Warning'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
