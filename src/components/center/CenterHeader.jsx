import React from 'react';
import { usePortalContext } from '../../context/PortalContext';
import { Menu, Search, User, LogOut, GraduationCap } from 'lucide-react';

const CenterHeader = ({ toggleSidebar }) => {
  const { currentCenterCode, centers, addFunds } = usePortalContext();
  const center = centers.find(c => c.center_code === currentCenterCode);

  if(!center) return null;

  return (
    <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex justify-between items-center z-30 shadow-sm">
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-3">
          <Menu onClick={toggleSidebar} className="w-5 h-5 text-slate-500 cursor-pointer lg:hidden" />
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-6 h-6 text-blue-900" />
            <div className="leading-none flex flex-col">
              <span className="text-sm font-bold text-slate-900 uppercase">Hansora</span>
              <span className="text-sm font-bold text-slate-900 uppercase">Skills</span>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center bg-slate-100 rounded-md px-3 py-1.5 border border-slate-200">
          <span className="text-sm text-slate-600">Center: {center.center_code} | {center.center_name}</span>
        </div>
        
        <div className="hidden lg:flex relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Global Search" className="pl-9 pr-4 py-1.5 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 w-64" />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg flex items-center pr-1 pl-3 py-1 gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-emerald-800 font-medium leading-tight">Prepaid Wallet:</span>
            <span className="text-sm font-bold text-emerald-700 leading-tight">₹{center.wallet_balance.toLocaleString()}</span>
          </div>
          <button onClick={() => addFunds(center.center_code, 1000)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors">
            + Top-Up
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
            <User className="w-4 h-4 text-slate-600" />
          </div>
          <LogOut className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>
      </div>
    </header>
  );
};

export default CenterHeader;
