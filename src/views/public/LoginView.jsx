import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortalContext } from '../../context/PortalContext';
import { GraduationCap, Lock, ShieldCheck, AlertCircle } from 'lucide-react';

const LoginView = () => {
  const navigate = useNavigate();
  const { centers, loginCenter, setActiveRole } = usePortalContext();

  const [roleSelect, setRoleSelect] = useState('center');
  const [centerCodeInput, setCenterCodeInput] = useState('HS-UP-101');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (roleSelect === 'center') {
      const foundCenter = centers.find(c => c.center_code.toUpperCase() === centerCodeInput.trim().toUpperCase());

      if (!foundCenter) {
        setErrorMsg('गलत सेंटर कोड! कृपया वैध कोड दर्ज करें (उदा. HS-UP-101)');
        return;
      }

      // पासवर्ड जांचें (यदि पासवर्ड इनपुट खाली न हो तो मैच करें, डेमो में पास करने की सुविधा)
      if (passwordInput && foundCenter.plain_password && passwordInput !== foundCenter.plain_password) {
        setErrorMsg(`गलत पासवर्ड! (हिंट: इस सेंटर का पासवर्ड "${foundCenter.plain_password}" है)`);
        return;
      }

      // 1. स्टेट में सेंटर को लॉगिन मार्क करें
      loginCenter(foundCenter.center_code);
      // 2. सीधे सेंटर डैशबोर्ड पर भेजें
      navigate('/center');
    } else {
      // सुपर एडमिन रोल
      setActiveRole('admin');
      navigate('/admin');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 bg-slate-50 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xs border border-slate-200 w-full max-w-md">
        
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <GraduationCap className="w-7 h-7" />
          </div>
        </div>

        <h1 className="text-2xl font-black text-center text-slate-900 mb-1">Portal Authentication</h1>
        <p className="text-xs text-center text-slate-500 mb-6">
          Authorized Study Centers & Central Administrative Governance
        </p>

        {errorMsg && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-lg text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Access Tier</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500 bg-white text-slate-800"
              value={roleSelect}
              onChange={e => setRoleSelect(e.target.value)}
            >
              <option value="center">Authorized Study Center (Franchise)</option>
              <option value="admin">Super Admin / Central Board Controller</option>
            </select>
          </div>

          {roleSelect === 'center' ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Study Center Code</label>
              <input
                required
                type="text"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500 font-mono"
                placeholder="e.g. HS-UP-101"
                value={centerCodeInput}
                onChange={e => setCenterCodeInput(e.target.value)}
              />
              <p className="text-[11px] text-slate-400 mt-1">
                उपलब्ध सेंटर्स: <span className="text-blue-600 cursor-pointer font-mono" onClick={() => setCenterCodeInput('HS-UP-101')}>HS-UP-101</span> या <span className="text-blue-600 cursor-pointer font-mono" onClick={() => setCenterCodeInput('HS-UP-102')}>HS-UP-102</span>
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Admin Username</label>
              <input
                type="text"
                defaultValue="admin@hansoraskills.com"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500 font-mono"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Secure Password</label>
            <input
              type="password"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500 font-mono"
              placeholder={roleSelect === 'center' ? 'gorakhpur@admin2026' : '••••••••'}
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors mt-2 text-xs flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Lock className="w-3.5 h-3.5" /> Enter Secure Dashboard
          </button>

          <div className="pt-2 text-center text-[11px] text-slate-400">
            {roleSelect === 'center' ? (
              <span>डेमो मोड: आप बिना पासवर्ड डाले भी सीधे लॉगिन कर सकते हैं।</span>
            ) : (
              <span>सुपर एडमिन कंसोल में सीधे प्रवेश के लिए बटन दबाएं।</span>
            )}
          </div>
        </form>

      </div>
    </div>
  );
};

export default LoginView;