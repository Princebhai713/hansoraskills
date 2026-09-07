import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { usePortalContext } from '../../context/PortalContext';
import CenterHeader from '../../components/center/CenterHeader';
import CenterSidebar from '../../components/center/CenterSidebar';

const CenterDashboardView = () => {
  const { currentCenterCode, centers } = usePortalContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const center = centers.find(c => c.center_code === currentCenterCode);

  if (!center) return null;

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans overflow-hidden">
      <CenterHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden absolute inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`absolute lg:relative z-50 h-full w-64 shrink-0 transition-transform duration-300 bg-white shadow-xl lg:shadow-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <CenterSidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col gap-6 w-full">
          <Outlet />
          
          <div className="text-center text-[10px] text-slate-400 font-medium py-2 border-t border-slate-200 mt-auto shrink-0">
            HANSORA SKILLS © {new Date().getFullYear()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CenterDashboardView;
