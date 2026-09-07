import React, { useState } from 'react';
import { usePortalContext } from '../../context/PortalContext';
import { MapPin, Phone, Mail, Building2, CheckCircle2 } from 'lucide-react';

const CenterLocatorView = () => {
  const { centers } = usePortalContext();
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const uniqueStates = [...new Set((centers || []).map(c => c.state))];
  const uniqueDistricts = [...new Set((centers || []).filter(c => !selectedState || c.state === selectedState).map(c => c.district))];

  const filtered = (centers || []).filter(c => 
    (!selectedState || c.state === selectedState) &&
    (!selectedDistrict || c.district === selectedDistrict)
  );

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 font-sans text-slate-800 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Authorized Study Center Network</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Locate approved Hansora Skills institutes and examination test centers in your area.
        </p>
      </div>

      {/* Filter Dropdowns */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Select State</label>
          <select 
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500"
            value={selectedState} 
            onChange={e => { setSelectedState(e.target.value); setSelectedDistrict(''); }}
          >
            <option value="">All States</option>
            {uniqueStates.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Select District</label>
          <select 
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500"
            value={selectedDistrict} 
            onChange={e => setSelectedDistrict(e.target.value)}
          >
            <option value="">All Districts</option>
            {uniqueDistricts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div className="flex items-end">
          <p className="text-xs text-slate-500 pb-2">
            Showing <strong className="text-slate-900">{filtered.length}</strong> verified training centers
          </p>
        </div>
      </div>

      {/* Centers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(c => (
          <div key={c.id || c.center_code} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                  {c.center_code}
                </span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                  {c.status || 'Active'}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">{c.center_name}</h3>
              <p className="text-xs text-slate-500 mb-3">Director: {c.director_name}</p>
              
              <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{c.full_address || `${c.district}, ${c.state}`}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{c.phone}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CenterLocatorView;