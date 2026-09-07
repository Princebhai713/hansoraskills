import React, { useState } from 'react';
import { usePortalContext } from '../../../context/PortalContext';
import { Users, Clock, FileCheck, Award, PlusCircle } from 'lucide-react';

export default function DashboardOverviewTab() {
  const { currentCenterCode, centers, students, courses, wallet_transactions, addStudent, setCenterTab } = usePortalContext();
  const center = centers.find(c => c.center_code === currentCenterCode) || centers[0];
  const centerStudents = students.filter(s => s.center_code === center?.center_code);
  const centerTxs = (wallet_transactions || []).filter(tx => tx.center_code === center?.center_code);

  const [newStudent, setNewStudent] = useState({ name: '', father_name: '', dob: '', course_code: 'ADCA' });

  const appliedCount = centerStudents.filter(s => s.status === 'Applied').length;
  const pendingCount = centerStudents.filter(s => s.status === 'Pending Verification').length;
  const certifiedCount = centerStudents.filter(s => s.status === 'Certified').length;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addStudent({
      ...newStudent,
      center_code: center.center_code,
      reg_no: `HS/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`
    });
    setNewStudent({ name: '', father_name: '', dob: '', course_code: 'ADCA' });
    alert("Candidate added to Applied Queue! Please accept to deduct wallet fee.");
    setCenterTab('applied_queue');
  };

  return (
    <div className="space-y-6">
      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Total Enrolled</p>
            <p className="text-xl font-bold text-slate-900">{centerStudents.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Applied (Pending)</p>
            <p className="text-xl font-bold text-amber-600">{appliedCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Under Verification</p>
            <p className="text-xl font-bold text-purple-600">{pendingCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Certified Students</p>
            <p className="text-xl font-bold text-emerald-600">{certifiedCount}</p>
          </div>
        </div>
      </div>

      {/* Quick Form & Ledger */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs p-5">
          <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-blue-600" /> Quick Student Admission
          </h2>
          <form onSubmit={handleQuickAdd} className="space-y-3 text-xs">
            <input 
              required 
              type="text" 
              placeholder="Candidate Full Name" 
              className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500" 
              value={newStudent.name} 
              onChange={e => setNewStudent({...newStudent, name: e.target.value})} 
            />
            <input 
              required 
              type="text" 
              placeholder="Father's Name" 
              className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500" 
              value={newStudent.father_name} 
              onChange={e => setNewStudent({...newStudent, father_name: e.target.value})} 
            />
            <select 
              className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500 bg-white" 
              value={newStudent.course_code} 
              onChange={e => setNewStudent({...newStudent, course_code: e.target.value})}
            >
              {courses.map(c => (
                <option key={c.code} value={c.code}>{c.code} - {c.name} (Fee: ₹{c.enrollment_fee})</option>
              ))}
            </select>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
              Submit to Applied Queue
            </button>
            <p className="text-[10px] text-slate-400 text-center">Zero wallet deduction until acceptance.</p>
          </form>
        </div>

        <div className="col-span-12 lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-3">
              <h2 className="text-sm font-bold text-slate-900">Prepaid Wallet Passbook</h2>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Balance: ₹{center.wallet_balance.toLocaleString()}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-slate-500 font-semibold border-b border-slate-100">
                  <tr>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Description</th>
                    <th className="pb-2 text-right">Amount</th>
                    <th className="pb-2 text-right">Closing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {centerTxs.slice(0, 4).map(tx => (
                    <tr key={tx.id}>
                      <td className="py-2 text-[11px] text-slate-400">{tx.timestamp?.split(',')[0]}</td>
                      <td className="py-2 text-slate-700 truncate max-w-[200px]">{tx.description}</td>
                      <td className={`py-2 text-right font-mono font-bold ${tx.type === 'CREDIT' ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount}
                      </td>
                      <td className="py-2 text-right font-mono text-slate-600">₹{tx.balance_after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button 
            onClick={() => setCenterTab('wallet_ledger')} 
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold text-right mt-3"
          >
            View Complete Passbook →
          </button>
        </div>
      </div>
    </div>
  );
}