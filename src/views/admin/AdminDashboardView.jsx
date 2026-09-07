import React, { useState } from 'react';
import { usePortalContext } from '../../context/PortalContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import CenterManagementView from './CenterManagementView';
import AuditResultsView from './AuditResultsView';
import { Menu } from 'lucide-react';

const AdminDashboardView = () => {
  const { centers, students } = usePortalContext();
  const [activeTab, setActiveTab] = useState('centers');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const pendingResults = students.filter(s => s.status === 'Pending Verification');

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans relative">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden absolute inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={`absolute lg:relative z-50 h-full w-64 shrink-0 transition-transform duration-300 shadow-xl lg:shadow-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          pendingResultsCount={pendingResults.length} 
          closeSidebar={() => setSidebarOpen(false)}
        />
      </div>

      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <Menu onClick={() => setSidebarOpen(true)} className="w-5 h-5 text-slate-500 cursor-pointer lg:hidden" />
            <h1 className="text-lg lg:text-xl font-bold text-slate-800 capitalize">
              {activeTab === 'centers' ? 'Franchise Management' : 'Result Audit Queue'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">System Admin</p>
              <p className="text-xs text-emerald-600 font-medium">
                All-India Network Total: ₹{centers.reduce((acc, c) => acc + c.wallet_balance, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </header>
        
        <div className="p-8 overflow-y-auto flex-1">
          {activeTab === 'centers' && <CenterManagementView />}
          {activeTab === 'audit' && <AuditResultsView pendingResults={pendingResults} />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardView;
