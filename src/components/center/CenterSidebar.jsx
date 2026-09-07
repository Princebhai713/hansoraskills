import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, User, Upload, FilePlus, Hourglass, 
  Users, Edit3, CreditCard, FileText, Award, Wallet, Shield 
} from 'lucide-react';

const menuItems = [
  { path: '/center/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/center/profile', icon: User, label: 'My Center Profile' },
  { path: '/center/upload-docs', icon: Upload, label: 'Upload Center Documents' },
  { path: '/center/admission', icon: FilePlus, label: 'Student Admission Form' },
  { path: '/center/applied-queue', icon: Hourglass, label: 'Applied Students\n(Accept/Reject Queue)', multiline: true },
  { path: '/center/registered', icon: Users, label: 'Registered Student Directory' },
  { path: '/center/marks-entry', icon: Edit3, label: 'Theory & Practical Marks Entry' },
  { path: '/center/id-card', icon: CreditCard, label: 'Student ID Card Generator' },
  { path: '/center/admit-card', icon: FileText, label: 'Exam Admit Card / Hall Ticket' },
  { path: '/center/certificates', icon: Award, label: 'Marksheet & Certificate Print' },
  { path: '/center/wallet', icon: Wallet, label: 'Wallet Ledger & Transactions' },
  { path: '/center/security', icon: Shield, label: 'Security & Change Password' },
];

export default function CenterSidebar({ closeSidebar }) {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 overflow-y-auto shrink-0 flex flex-col py-3 font-sans h-full">
      <nav className="flex-1 space-y-0.5 px-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={closeSidebar}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-left transition-colors ${
                isActive 
                  ? 'bg-blue-50 font-bold text-blue-700 border-l-4 border-blue-600 rounded-l-none shadow-xs' 
                  : 'text-slate-700 hover:bg-slate-50 font-medium'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className={`leading-tight ${item.multiline ? 'whitespace-pre-line text-[11px]' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}