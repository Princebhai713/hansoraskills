import React from 'react';
import { usePortalContext } from '../../../context/PortalContext';

export default function AdmitCardTab() {
  const { currentCenterCode, centers, students } = usePortalContext();
  const center = centers.find(c => c.center_code === currentCenterCode) || centers[0];
  const list = students.filter(s => s.center_code === center?.center_code && s.status !== 'Applied');

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-sm font-bold text-slate-900">Examination Admit Cards & Hall Tickets</h2>
        <p className="text-xs text-slate-500">Print candidate entrance hall tickets with exam centers</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="px-4 py-2.5">Roll No</th>
              <th className="px-3 py-2.5">Candidate Name</th>
              <th className="px-3 py-2.5">Course</th>
              <th className="px-3 py-2.5 text-right">Hall Ticket</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map(student => (
              <tr key={student.id} className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-mono text-slate-800">{student.roll_no}</td>
                <td className="px-3 py-2.5 font-medium text-slate-900">{student.name}</td>
                <td className="px-3 py-2.5 text-slate-600">{student.course_code}</td>
                <td className="px-3 py-2.5 text-right">
                  <button 
                    onClick={() => alert(`Printing official A4 Admit Card for Roll: ${student.roll_no}`)}
                    className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1 rounded text-xs transition"
                  >
                    Print Admit Card
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}