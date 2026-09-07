import React, { useState } from 'react';
import { usePortalContext } from '../../../context/PortalContext';
import { Search } from 'lucide-react';

export default function RegisteredDirectoryTab() {
  const { currentCenterCode, centers, students } = usePortalContext();
  const center = centers.find(c => c.center_code === currentCenterCode) || centers[0];
  const registered = students.filter(s => s.center_code === center?.center_code && s.status !== 'Applied');

  const [search, setSearch] = useState('');
  const filtered = registered.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    (s.roll_no && s.roll_no.includes(search))
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Registered Student Directory</h2>
          <p className="text-xs text-slate-500">All officially admitted active candidates with roll numbers</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by roll or name..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-500" 
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="px-4 py-2.5">Roll No</th>
              <th className="px-3 py-2.5">Candidate Name</th>
              <th className="px-3 py-2.5">Father's Name</th>
              <th className="px-3 py-2.5">Course</th>
              <th className="px-3 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(student => (
              <tr key={student.id} className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-mono font-bold text-blue-700">{student.roll_no}</td>
                <td className="px-3 py-2.5 font-medium text-slate-900">{student.name}</td>
                <td className="px-3 py-2.5 text-slate-600">{student.father_name}</td>
                <td className="px-3 py-2.5 text-slate-700 font-semibold">{student.course_code}</td>
                <td className="px-3 py-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    student.status === 'Certified' ? 'bg-emerald-100 text-emerald-800' :
                    student.status === 'Pending Verification' ? 'bg-amber-100 text-amber-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}