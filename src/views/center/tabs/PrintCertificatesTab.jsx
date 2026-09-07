import React from 'react';
import { usePortalContext } from '../../../context/PortalContext';

export default function PrintCertificatesTab() {
  const { currentCenterCode, centers, students, setPrintDocument } = usePortalContext();
  const center = centers.find(c => c.center_code === currentCenterCode) || centers[0];
  const list = students.filter(s => s.center_code === center?.center_code);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-sm font-bold text-slate-900">Print Certified Marksheets & Diplomas</h2>
        <p className="text-xs text-slate-500">Unlocks upon Super Admin audit approval</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="px-4 py-2.5">Roll No</th>
              <th className="px-3 py-2.5">Candidate Name</th>
              <th className="px-3 py-2.5">Status</th>
              <th className="px-3 py-2.5 text-right">Print Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map(student => (
              <tr key={student.id} className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-mono text-slate-800">{student.roll_no || student.reg_no}</td>
                <td className="px-3 py-2.5 font-medium text-slate-900">{student.name}</td>
                <td className="px-3 py-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    student.status === 'Certified' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right">
                  {student.status === 'Certified' ? (
                    <div className="flex gap-1.5 justify-end">
                      <button 
                        onClick={() => setPrintDocument(student, 'marksheet')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded text-xs transition"
                      >
                        Marksheet
                      </button>
                      <button 
                        onClick={() => setPrintDocument(student, 'certificate')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded text-xs transition"
                      >
                        Certificate
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">Audit Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}