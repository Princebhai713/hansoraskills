import React from 'react';
import { usePortalContext } from '../../context/PortalContext';
import { CheckCircle } from 'lucide-react';

const AuditResultsView = ({ pendingResults }) => {
  const { approveResult } = usePortalContext();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-base font-semibold text-slate-800">Pending Results for Audit</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Student Info</th>
              <th className="px-4 py-3">Center</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Grade</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pendingResults.map(student => (
              <tr key={student.id} className="hover:bg-slate-50/75">
                <td className="px-4 py-3.5">
                  <div className="font-medium text-slate-900">{student.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{student.roll_no}</div>
                </td>
                <td className="px-4 py-3.5 text-slate-700">{student.center_code}</td>
                <td className="px-4 py-3.5 text-slate-700">{student.course_code}</td>
                <td className="px-4 py-3.5"><span className="font-bold text-emerald-600">{student.marks?.grade || 'N/A'}</span></td>
                <td className="px-4 py-3.5 text-right">
                  <button onClick={() => approveResult(student.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1 ml-auto">
                    <CheckCircle className="w-3.5 h-3.5" /> Approve & Certify
                  </button>
                </td>
              </tr>
            ))}
            {pendingResults.length === 0 && (
              <tr><td colSpan="6" className="p-8 text-center text-slate-500">No pending results in the queue.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditResultsView;
