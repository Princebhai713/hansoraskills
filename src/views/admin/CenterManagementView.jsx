import React from 'react';
import { usePortalContext } from '../../context/PortalContext';

const CenterManagementView = () => {
  const { centers } = usePortalContext();
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-base font-semibold text-slate-800">Active Centers</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Center Name & Director</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Wallet</th>
              <th className="px-4 py-3 bg-amber-50 text-amber-800">Plain Password</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {centers.map(center => (
              <tr key={center.id} className="hover:bg-slate-50/75">
                <td className="px-4 py-3.5 font-medium text-slate-700">{center.center_code}</td>
                <td className="px-4 py-3.5">
                  <div className="font-medium text-slate-800">{center.center_name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{center.director_name}</div>
                </td>
                <td className="px-4 py-3.5 text-slate-600">{center.district}, {center.state}</td>
                <td className="px-4 py-3.5 font-semibold text-emerald-600">₹{center.wallet_balance.toLocaleString()}</td>
                <td className="px-4 py-3.5 font-mono text-xs font-bold text-slate-800 bg-amber-50/50">{center.plain_password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CenterManagementView;
