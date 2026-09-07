import React from 'react';
import { usePortalContext } from '../../../context/PortalContext';

export default function AppliedQueueTab() {
  const { currentCenterCode, centers, students, courses, acceptStudent, rejectStudent } = usePortalContext();
  const center = centers.find(c => c.center_code === currentCenterCode) || centers[0];
  const appliedStudents = students.filter(s => s.center_code === center?.center_code && s.status === 'Applied');

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Applied Students Queue (Action Required)</h2>
          <p className="text-xs text-slate-500">Accepting a student deducts fee from wallet and allocates 8-digit Roll Number</p>
        </div>
        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          {appliedStudents.length} Pending
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="px-4 py-2.5">Temp Reg No</th>
              <th className="px-3 py-2.5">Candidate Name</th>
              <th className="px-3 py-2.5">Course</th>
              <th className="px-3 py-2.5">Admission Date</th>
              <th className="px-3 py-2.5 text-right">Accept / Reject</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {appliedStudents.map(student => {
              const course = courses.find(c => c.code === student.course_code);
              const fee = course?.enrollment_fee || 200;
              return (
                <tr key={student.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2.5 font-mono text-slate-700">{student.reg_no}</td>
                  <td className="px-3 py-2.5">
                    <p className="font-semibold text-slate-900">{student.name}</p>
                    <p className="text-[11px] text-slate-400">S/o {student.father_name}</p>
                  </td>
                  <td className="px-3 py-2.5 text-slate-700 font-medium">{student.course_code}</td>
                  <td className="px-3 py-2.5 text-slate-500">{student.admission_date}</td>
                  <td className="px-3 py-2.5 text-right">
                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => acceptStudent(student.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded text-xs transition"
                      >
                        Accept (Debit ₹{fee})
                      </button>
                      <button 
                        onClick={() => rejectStudent(student.id)}
                        className="bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 px-2.5 py-1 rounded text-xs transition"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {appliedStudents.length === 0 && (
              <tr><td colSpan="5" className="text-center py-8 text-slate-400">No candidates in applied queue.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}