import React from 'react';
import { usePortalContext } from '../../context/PortalContext';

const RoleSwitcherBar = () => {
  const { activeRole, setActiveRole } = usePortalContext();
  
  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 px-6 flex justify-between items-center no-print">
      <div className="font-semibold text-white flex items-center gap-2">
        <span className="bg-amber-500 text-slate-900 px-1.5 py-0.5 rounded uppercase font-bold text-[10px]">Demo Mode</span>
        Role Switcher
      </div>
      <div className="flex gap-2">
        <button onClick={() => setActiveRole('public')} className={`px-3 py-1 rounded transition-colors ${activeRole === 'public' ? 'bg-slate-700 text-white' : 'hover:bg-slate-800'}`}>Public Site</button>
        <button onClick={() => setActiveRole('center')} className={`px-3 py-1 rounded transition-colors ${activeRole === 'center' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>Study Center Dashboard</button>
        <button onClick={() => setActiveRole('admin')} className={`px-3 py-1 rounded transition-colors ${activeRole === 'admin' ? 'bg-rose-600 text-white' : 'hover:bg-slate-800'}`}>Super Admin Console</button>
      </div>
    </div>
  );
};

export default RoleSwitcherBar;
