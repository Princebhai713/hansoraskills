import React, { useState } from 'react';
import { usePortalContext } from '../../../context/PortalContext';
import { X } from 'lucide-react';

export default function WalletLedgerTab() {
  const { currentCenterCode, centers, wallet_transactions, addFunds } = usePortalContext();
  const center = centers.find(c => c.center_code === currentCenterCode) || centers[0];
  const centerTxs = (wallet_transactions || []).filter(tx => tx.center_code === center?.center_code);

  const [modal, setModal] = useState(false);
  const [amt, setAmt] = useState('1000');
  const [utr, setUtr] = useState('');

  const handleTopUp = (e) => {
    e.preventDefault();
    addFunds(center.center_code, Number(amt));
    setModal(false);
    setUtr('');
    alert(`₹${amt} credited to wallet!`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex justify-between items-center">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase">Available Prepaid Wallet Balance</p>
          <p className="text-3xl font-extrabold text-emerald-700 font-mono mt-1">
            ₹{center?.wallet_balance.toLocaleString()}
          </p>
        </div>
        <button 
          onClick={() => setModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition shadow-xs"
        >
          + Recharge / Top-Up Wallet
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">Wallet Passbook Ledger</h3>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="px-4 py-2.5">Date & Time</th>
              <th className="px-3 py-2.5">Transaction Particulars</th>
              <th className="px-3 py-2.5 text-right">Debit / Credit</th>
              <th className="px-3 py-2.5 text-right">Closing Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {centerTxs.map(tx => (
              <tr key={tx.id} className="hover:bg-slate-50">
                <td className="px-4 py-2 text-slate-500 font-mono text-[11px]">{tx.timestamp}</td>
                <td className="px-3 py-2 font-medium text-slate-800">{tx.description}</td>
                <td className={`px-3 py-2 text-right font-mono font-bold ${tx.type === 'CREDIT' ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount}
                </td>
                <td className="px-3 py-2 text-right font-mono text-slate-700">₹{tx.balance_after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-300 w-full max-w-sm p-5 shadow-lg space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-slate-900">Wallet Recharge / Top-Up</h3>
              <button onClick={() => setModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleTopUp} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Amount (₹)</label>
                <input required type="number" value={amt} onChange={e => setAmt(e.target.value)} className="w-full border border-slate-300 rounded p-1.5 font-mono" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bank UTR / Ref No</label>
                <input required type="text" placeholder="e.g. UTR202688910" value={utr} onChange={e => setUtr(e.target.value)} className="w-full border border-slate-300 rounded p-1.5 font-mono" />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg">
                Submit Top-Up Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}