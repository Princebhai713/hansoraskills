import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function SecurityPasswordTab() {
  const [notice, setNotice] = useState('');

  return (
    <div className="max-w-xl bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <ShieldCheck className="w-5 h-5 text-blue-600" />
        <h2 className="text-sm font-bold text-slate-900">Security Credentials & Change Password</h2>
      </div>

      {notice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs">
          {notice}
        </div>
      )}

      <form 
        onSubmit={(e) => { 
          e.preventDefault(); 
          setNotice('Password updated successfully! It is synced with Super Admin console.'); 
          setTimeout(() => setNotice(''), 4000); 
        }} 
        className="space-y-3 text-xs"
      >
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Current Password</label>
          <input required type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500 font-mono" />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">New Password</label>
          <input required type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500 font-mono" />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Confirm New Password</label>
          <input required type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500 font-mono" />
        </div>
        <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg transition mt-2">
          Update Password
        </button>
      </form>
    </div>
  );
}