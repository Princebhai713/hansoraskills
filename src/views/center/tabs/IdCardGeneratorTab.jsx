import React from 'react';
import { usePortalContext } from '../../../context/PortalContext';
import { Printer } from 'lucide-react';

export default function IdCardGeneratorTab() {
  const { currentCenterCode, centers, students } = usePortalContext();
  const center = centers.find(c => c.center_code === currentCenterCode) || centers[0];
  const list = students.filter(s => s.center_code === center?.center_code && s.status !== 'Applied');

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-slate-900">Student Identity Cards (CR80 Pocket Cards)</h2>
        <p className="text-xs text-slate-500">Official photo passes for active candidates</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {list.map(student => (
          <div key={student.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="bg-slate-900 text-white text-[10px] font-bold p-2 rounded-t-lg text-center tracking-wider uppercase">
                Hansora Skills • Student Pass
              </div>
              <div className="p-3 border-x border-b border-slate-200 rounded-b-lg space-y-1.5 text-xs">
                <p className="font-bold text-sm text-slate-900">{student.name}</p>
                <p className="font-mono text-slate-600">Roll: {student.roll_no}</p>
                <p className="text-slate-500">Course: {student.course_code}</p>
                <p className="text-slate-400 font-mono text-[10px]">Center: {center?.center_code}</p>
              </div>
            </div>
            <button 
              onClick={() => alert(`Printing pocket ID card for Roll: ${student.roll_no}`)}
              className="mt-3 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" /> Print Pocket ID
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}