import React, { useState } from 'react';
import { Building2, Send, CheckCircle2, ShieldCheck, MapPin, Monitor } from 'lucide-react';

const FranchiseApplyView = () => {
  const [formData, setFormData] = useState({
    name: '',
    institute: '',
    phone: '',
    email: '',
    state: 'Uttar Pradesh',
    district: '',
    pincode: '',
    computers: '',
    labArea: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
          <Building2 className="w-3.5 h-3.5" /> Study Center Affiliation Form
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Apply for Authorized Franchise Center
        </h1>
        <p className="text-slate-600 text-sm mt-2 max-w-xl mx-auto">
          Start an authorized skill training center with single-pincode exclusivity, automated student enrollment ERP, and centralized board examinations.
        </p>
      </div>

      {isSubmitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center max-w-lg mx-auto shadow-xs">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-emerald-900 mb-2">Application Submitted Successfully!</h2>
          <p className="text-xs sm:text-sm text-emerald-800 mb-6 leading-relaxed">
            Thank you for applying to Hansora Skills. Our inspection and affiliation officer will review your laboratory infrastructure and connect with you within 24 hours.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', institute: '', phone: '', email: '', state: 'Uttar Pradesh', district: '', pincode: '', computers: '', labArea: '' });
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Director & Institute Info */}
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>01</span> Applicant & Institution Profile
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Director / Applicant Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Santosh Yadav"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Proposed Center / Academy Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Gorakhpur Skill Tech Institute"
                    value={formData.institute}
                    onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">WhatsApp Mobile Number *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Official Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="director@institute.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Step 2: Location & Territory */}
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>02</span> Proposed Territory & Location
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">District *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Gorakhpur / Deoria"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Pincode (Single Exclusivity) *</label>
                  <input
                    required
                    type="text"
                    placeholder="273015"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Step 3: Infrastructure */}
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>03</span> Infrastructure Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Operational Computers Count *</label>
                  <input
                    required
                    type="number"
                    placeholder="e.g. 15"
                    value={formData.computers}
                    onChange={(e) => setFormData({ ...formData, computers: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Total Carpet Area (sq. ft.)</label>
                  <input
                    type="text"
                    placeholder="e.g. 800 sq. ft."
                    value={formData.labArea}
                    onChange={(e) => setFormData({ ...formData, labArea: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs sm:text-sm transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Franchise Affiliation Request
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                Submission acknowledges agreement to Hansora Skills inspection and territorial guidelines.
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FranchiseApplyView;