import React, { useState } from 'react';
import { usePortalContext } from '../../../context/PortalContext';
import { CheckCircle2 } from 'lucide-react';

export default function CenterProfileTab() {
  const { currentCenterCode, centers } = usePortalContext();
  const center = centers.find(c => c.center_code === currentCenterCode) || centers[0];
  const [profileData, setProfileData] = useState({ ...center });
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-3xl bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Franchise Center Profile</h2>
          <p className="text-xs text-slate-500">Authorized territorial partner details</p>
        </div>
        <span className="font-mono text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-lg">
          {center?.center_code}
        </span>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Center / Academy Name</label>
            <input 
              type="text" 
              value={profileData.center_name} 
              onChange={e => setProfileData({...profileData, center_name: e.target.value})}
              className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Director Name</label>
            <input 
              type="text" 
              value={profileData.director_name} 
              onChange={e => setProfileData({...profileData, director_name: e.target.value})}
              className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500" 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
            <input 
              type="text" 
              value={profileData.phone} 
              onChange={e => setProfileData({...profileData, phone: e.target.value})}
              className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              value={profileData.email} 
              onChange={e => setProfileData({...profileData, email: e.target.value})}
              className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500" 
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Street Address</label>
          <textarea 
            rows="3" 
            value={profileData.full_address} 
            onChange={e => setProfileData({...profileData, full_address: e.target.value})}
            className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500" 
          />
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition">
          Update Profile Information
        </button>
      </form>
    </div>
  );
}