import React, { useState } from 'react';
import { usePortalContext } from '../../../context/PortalContext';
import { X } from 'lucide-react';

export default function MarksEntryTab() {
  const { currentCenterCode, centers, students, courses, submitMarks } = usePortalContext();
  const center = centers.find(c => c.center_code === currentCenterCode) || centers[0];
  const list = students.filter(s => s.center_code === center?.center_code && s.status !== 'Applied');

  const [activeStudent, setActiveStudent] = useState(null);
  const [form, setForm] = useState([]);

  const openModal = (student) => {
    const course = courses.find(c => c.code === student.course_code);
    const curriculum = course?.curriculum || [
      { subject_name: "Theory Paper 1", max_theory: 70, max_practical: 30 },
      { subject_name: "Practical Project", max_theory: 70, max_practical: 30 }
    ];
    setActiveStudent(student);
    setForm(curriculum.map(sub => ({
      subject_name: sub.subject_name,
      max_theory: sub.max_theory,
      max_practical: sub.max_practical,
      theory_obtained: 60,
      practical_obtained: 25
    })));
  };

  const handleSave = (e) => {
    e.preventDefault();
    submitMarks(activeStudent.id, form);
    setActiveStudent(null);
    alert("Marks submitted for Super Admin verification!");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-sm font-bold text-slate-900">Theory & Practical Marks Entry</h2>
        <p className="text-xs text-slate-500">Fill marks to submit for board certificate generation</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="px-4 py-2.5">Roll No</th>
              <th className="px-3 py-2.5">Candidate Name</th>
              <th className="px-3 py-2.5">Course</th>
              <th className="px-3 py-2.5">Evaluation Status</th>
              <th className="px-3 py-2.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map(student => (
              <tr key={student.id} className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-mono font-bold text-slate-800">{student.roll_no}</td>
                <td className="px-3 py-2.5 font-medium text-slate-900">{student.name}</td>
                <td className="px-3 py-2.5 text-slate-600">{student.course_code}</td>
                <td className="px-3 py-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    student.status === 'Certified' ? 'bg-emerald-100 text-emerald-800' :
                    student.status === 'Pending Verification' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right">
                  {student.status !== 'Certified' ? (
                    <button 
                      onClick={() => openModal(student)} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded text-xs font-semibold"
                    >
                      Enter / Edit Marks
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-semibold text-xs">Approved ✔</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeStudent && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-300 w-full max-w-lg p-5 shadow-lg">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Marks Entry: {activeStudent.name}</h3>
                <p className="text-xs text-slate-500 font-mono">Roll: {activeStudent.roll_no} • {activeStudent.course_code}</p>
              </div>
              <button onClick={() => setActiveStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              {form.map((sub, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <p className="font-semibold text-slate-800 mb-2">{sub.subject_name}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">Theory (Max {sub.max_theory})</label>
                      <input 
                        type="number" 
                        max={sub.max_theory}
                        required
                        className="w-full border border-slate-300 rounded px-2 py-1 bg-white font-mono"
                        value={sub.theory_obtained}
                        onChange={e => {
                          const updated = [...form];
                          updated[idx].theory_obtained = Number(e.target.value);
                          setForm(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">Practical (Max {sub.max_practical})</label>
                      <input 
                        type="number" 
                        max={sub.max_practical}
                        required
                        className="w-full border border-slate-300 rounded px-2 py-1 bg-white font-mono"
                        value={sub.practical_obtained}
                        onChange={e => {
                          const updated = [...form];
                          updated[idx].practical_obtained = Number(e.target.value);
                          setForm(updated);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-3">
                Submit Marks for Super Admin Audit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}