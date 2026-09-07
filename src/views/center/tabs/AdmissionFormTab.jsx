import React, { useState } from 'react';
import { usePortalContext } from '../../../context/PortalContext';
import { CheckCircle2 } from 'lucide-react';

export default function AdmissionFormTab() {
  const { currentCenterCode, centers, courses, addStudent, setCenterTab } = usePortalContext();
  const center = centers.find(c => c.center_code === currentCenterCode) || centers[0];

  const [formData, setFormData] = useState({
    name: '', father_name: '', dob: '', course_code: 'ADCA', gender: 'Male', mobile: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent({
      ...formData,
      center_code: center.center_code,
      reg_no: `HS/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`
    });
    setSuccess(true);
    setFormData({ name: '', father_name: '', dob: '', course_code: 'ADCA', gender: 'Male', mobile: '' });
    setTimeout(() => {
      setSuccess(false);
      setCenterTab('applied_queue');
    }, 1500);
  };

  return (
    <div className="max-w-2xl bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Student Admission & Enrollment Form</h2>
        <p className="text-xs text-slate-500">Registers candidate into the Applied Queue (Zero wallet deduction at this stage)</p>
      </div>

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Student submitted! Redirecting to Applied Queue to Accept...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Student Full Name *</label>
            <input required type="text" placeholder="Full Name" className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Father's Name *</label>
            <input required type="text" placeholder="Father's Name" className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500" value={formData.father_name} onChange={e => setFormData({...formData, father_name: e.target.value})} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Date of Birth *</label>
            <input required type="date" className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500 text-slate-600" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Gender</label>
            <select className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500 bg-white" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Mobile</label>
            <input type="tel" placeholder="Mobile" className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Select Course / Program *</label>
          <select className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500 bg-white" value={formData.course_code} onChange={e => setFormData({...formData, course_code: e.target.value})}>
            {courses.map(c => (
              <option key={c.code} value={c.code}>{c.code} - {c.name} | Fee: ₹{c.enrollment_fee}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition mt-2">
          Submit Candidate Application
        </button>
      </form>
    </div>
  );
}