import React from 'react';
import { Search } from 'lucide-react';
import PlaceholderPanel from '../components/ui/PlaceholderPanel';
import { mockNodeDetails } from '../data/mockData';

const GraphExplorer = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="relative max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 sm:text-sm"
          placeholder="Search by Aadhaar / SIM / Account ID"
        />
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <PlaceholderPanel label="Graph visualization loads here" height="h-[600px]" />
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Node Details</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Node ID</p>
                <p className="text-sm font-mono font-medium">{mockNodeDetails.id}</p>
              </div>
              
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Type</p>
                <p className="text-sm font-medium">{mockNodeDetails.type}</p>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter mb-2">Risk Score</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div 
                    className="bg-red-500 h-1.5 rounded-full" 
                    style={{ width: `${mockNodeDetails.riskScore}%` }}
                  />
                </div>
                <p className="text-right text-[10px] mt-1 font-bold text-red-600">{mockNodeDetails.riskScore}/100</p>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Linked Nodes</p>
                <p className="text-sm font-medium">{mockNodeDetails.linkedNodesCount} connections</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button className="w-full py-2 bg-slate-900 text-white rounded-md text-xs font-bold hover:bg-slate-800 transition-colors">
                  Investigate Path
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphExplorer;
