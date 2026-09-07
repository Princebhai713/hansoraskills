import React from 'react';
import { ShieldAlert, Building2, CheckSquare } from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, pendingResultsCount, closeSidebar }) => {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 h-full">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          Super Admin
        </h2>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <button 
          onClick={() => { setActiveTab('centers'); if(closeSidebar) closeSidebar(); }} 
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'centers' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
        >
          <Building2 className="w-4 h-4" /> Franchise Centers
        </button>
        <button 
          onClick={() => { setActiveTab('audit'); if(closeSidebar) closeSidebar(); }} 
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${activeTab === 'audit' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
        >
          <CheckSquare className="w-4 h-4" /> Result Audit
          {pendingResultsCount > 0 && <span className="absolute right-3 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pendingResultsCount}</span>}
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
