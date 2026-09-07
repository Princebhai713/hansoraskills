import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Users, Store, FileText, CheckCircle, Award, 
  ArrowRight, Download, Search, ShieldCheck, Bell, BookOpen, Clock, Calendar, ExternalLink 
} from 'lucide-react';
import { usePortalContext } from '../../context/PortalContext';

export default function HomeView() {
  const navigate = useNavigate();
  const { centers, students, setPrintDocument, isCenterLoggedIn } = usePortalContext();

  const [filterState, setFilterState] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [verifyRoll, setVerifyRoll] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  const uniqueStates = [...new Set(centers.map(c => c.state))];
  const uniqueDistricts = [...new Set(centers.filter(c => !filterState || c.state === filterState).map(c => c.district))];

  const filteredCenters = centers.filter(c => 
    (!filterState || c.state === filterState) && 
    (!filterDistrict || c.district === filterDistrict)
  );

  const handleVerify = (e) => {
    e.preventDefault();
    const student = students.find(s => 
      (s.roll_no === verifyRoll.trim() || s.reg_no === verifyRoll.trim()) && 
      s.status === 'Certified'
    );
    setVerifyResult(student || 'not_found');
  };

  const handleCenterAction = (e) => {
    e.preventDefault();
    if (isCenterLoggedIn) {
      navigate('/center/dashboard');
    } else {
      alert('कृपया सेंटर डैशबोर्ड खोलने से पहले अपने सेंटर क्रेडेंशियल से लॉगिन करें!');
      navigate('/login');
    }
  };

  return (
    <div className="w-full font-sans bg-[#FAF8F5] text-slate-800 pb-16">
      
      {/* 1. Official SBS-Style Live Ticker / News Bulletin */}
      
      {/* 2. Main Banner Hero & Student Verification Widget */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Main Academic Banner */}
          <div className="lg:col-span-8 bg-white border-2 border-[#800000]/20 rounded-lg p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-bl-full pointer-events-none"></div>
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-50 border border-[#D4AF37] text-[#800000] text-xs font-bold mb-4">
                <Award className="w-4 h-4 text-[#D4AF37]" /> Accredited Skill Development Board
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#800000] leading-tight mb-4">
                Empowering India Through Certified Vocational & Technical Education
              </h1>
              
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Hansora Skills Portal operates under strict national academic guidelines, providing standardized skill assessment, certification, and center affiliation across Computer Science, Healthcare, Vocational Trades, and Management disciplines.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
              <Link
                to="/student-zone"
                className="bg-[#800000] hover:bg-[#5A0000] text-[#D4AF37] px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center gap-2"
              >
                Student Zone <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleCenterAction}
                className="bg-white border border-[#800000] text-[#800000] hover:bg-red-50 px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition"
              >
                Study Center Login
              </button>
            </div>
          </div>

          {/* Right Official Student Result Verification Portal */}
          <div className="lg:col-span-4 bg-white border-2 border-[#800000] rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="bg-[#800000] text-white p-4 border-b border-[#D4AF37] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <h2 className="text-sm font-serif font-bold tracking-wide">Academic Verification</h2>
                <p className="text-[10px] text-amber-200">Official Board Marksheet & Certificate Check</p>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <form onSubmit={handleVerify} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#800000] uppercase mb-1">
                    Enrollment / Roll No
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Roll No (e.g. 26101001)"
                    className="w-full border-2 border-slate-200 rounded px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#800000] font-mono bg-slate-50"
                    value={verifyRoll}
                    onChange={e => setVerifyRoll(e.target.value)}
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Demo verified roll: <strong className="text-[#800000] cursor-pointer font-mono underline" onClick={() => setVerifyRoll('26101001')}>26101001</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#800000] uppercase mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="w-full border-2 border-slate-200 rounded px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#800000] bg-slate-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#800000] hover:bg-[#5A0000] text-white font-bold py-2.5 rounded transition text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Search className="w-4 h-4 text-[#D4AF37]" /> Verify Credential
                </button>
              </form>

              {/* Verification Output */}
              {verifyResult === 'not_found' && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded p-2.5 text-xs text-red-700 font-medium">
                  ⚠️ No certified record found for this Roll Number.
                </div>
              )}

              {verifyResult && verifyResult !== 'not_found' && (
                <div className="mt-3 bg-emerald-50 border-2 border-emerald-300 rounded p-3 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 text-xs">{verifyResult.name}</p>
                      <p className="text-[10px] text-emerald-800 font-mono">
                        Roll: {verifyResult.roll_no} | Grade: {verifyResult.marks?.grade}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-emerald-200">
                    <button
                      type="button"
                      onClick={() => setPrintDocument && setPrintDocument(verifyResult, 'marksheet')}
                      className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-1.5 rounded text-[10px] uppercase flex items-center justify-center gap-1"
                    >
                      <Download className="w-3 h-3" /> Marksheet
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrintDocument && setPrintDocument(verifyResult, 'certificate')}
                      className="flex-1 bg-[#800000] hover:bg-[#5A0000] text-white font-bold py-1.5 rounded text-[10px] uppercase flex items-center justify-center gap-1"
                    >
                      <Award className="w-3 h-3 text-[#D4AF37]" /> Certificate
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 3. SBS DU Style Two-Column Layout (Chairman Desk & Quick Notice Board) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Chairman / Director Message Section */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
            <div className="border-b-2 border-[#800000] pb-2 mb-4 flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-[#800000]">From the Director's Desk</h3>
              <span className="text-[10px] bg-amber-100 text-[#800000] px-2 py-0.5 rounded font-bold uppercase">Vision & Mission</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
              <div className="w-24 h-28 bg-slate-200 border-2 border-[#D4AF37] rounded shrink-0 flex items-center justify-center text-slate-400 font-bold text-xs uppercase">
                Director Photo
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Technical and vocational education forms the backbone of standard economic growth. At Hansora Skills Portal, our institutional focus remains anchored on providing verifiable, employment-oriented certifications to students across suburban and rural centers."
              </p>
            </div>

            <div className="text-right border-t border-slate-100 pt-2">
              <p className="text-xs font-bold text-[#800000] font-serif">Prof. H. S. Sharma</p>
              <p className="text-[10px] text-slate-500 uppercase">Director Academic Affairs, HSP</p>
            </div>
          </div>

          {/* Institutional Notice Board */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="border-b-2 border-[#800000] pb-2 mb-4 flex items-center justify-between">
                <h3 className="text-lg font-serif font-bold text-[#800000] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#800000]" /> Notice Board
                </h3>
                <Link to="/student-zone" className="text-[11px] font-bold text-[#800000] hover:underline flex items-center gap-1">
                  View All <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <ul className="space-y-3">
                {[
                  { title: "Verification Guidelines for 2026 Batches", date: "02 Sep 2026" },
                  { title: "Franchise Center Renewal Procedures", date: "28 Aug 2026" },
                  { title: "Syllabus Revision for Advanced Diploma Courses", date: "15 Aug 2026" }
                ].map((item, idx) => (
                  <li key={idx} className="pb-2 border-b border-slate-100 flex items-start justify-between text-xs">
                    <span className="font-semibold text-slate-700 hover:text-[#800000] cursor-pointer">
                      • {item.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-3 bg-amber-50 rounded p-2 text-center text-[11px] font-bold text-[#800000] border border-amber-200">
              For Helpline or Academic Queries: Call +91 63727 61000
            </div>
          </div>

        </div>
      </div>

      {/* 4. Four Core Academic Quick Links (SBS Cards Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <MapPin className="text-[#800000]" />, title: "Study Center Locator", desc: "Search authorized skill centers by state and district.", link: "/centers" },
            { icon: <Users className="text-[#800000]" />, title: "Student Services", desc: "Download admit cards, digital IDs & course curriculum.", link: "/student-zone" },
            { icon: <Store className="text-[#800000]" />, title: "Franchise Application", desc: "Apply for single-pincode authorized center rights.", link: "/franchise" },
            { icon: <FileText className="text-[#800000]" />, title: "CBT Exam Portal", desc: "Scheduled online examinations and instant scorecards.", link: "/student-zone" }
          ].map((feat, i) => (
            <Link 
              to={feat.link} 
              key={i} 
              className="bg-white rounded border-2 border-slate-200 hover:border-[#800000] p-5 transition-all block shadow-xs group"
            >
              <div className="w-10 h-10 bg-amber-50 border border-[#D4AF37] rounded flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="font-serif font-bold text-[#800000] text-sm mb-1">{feat.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* 5. Center Directory Inline Locator Widget */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="bg-white rounded-lg border-2 border-[#800000]/20 p-6 shadow-xs">
          <div className="border-b border-slate-200 pb-3 mb-4">
            <h3 className="text-base font-serif font-bold text-[#800000]">Authorized Affiliated Centers Search</h3>
            <p className="text-xs text-slate-500">Filter official centers registered under Hansora Board</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">State</label>
              <select 
                className="w-full border border-slate-300 rounded px-3 py-2 text-xs bg-slate-50 outline-none focus:border-[#800000]"
                value={filterState} 
                onChange={e => { setFilterState(e.target.value); setFilterDistrict(''); }}
              >
                <option value="">All States...</option>
                {uniqueStates.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">District</label>
              <select 
                className="w-full border border-slate-300 rounded px-3 py-2 text-xs bg-slate-50 outline-none focus:border-[#800000]"
                value={filterDistrict} 
                onChange={e => setFilterDistrict(e.target.value)}
              >
                <option value="">All Districts...</option>
                {uniqueDistricts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredCenters.map(c => (
              <div key={c.id || c.center_code} className="bg-slate-50 border border-slate-200 rounded p-3.5 flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] font-bold bg-[#800000] text-[#D4AF37] px-2 py-0.5 rounded">
                    {c.center_code}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 mt-1.5">{c.center_name}</h4>
                  <p className="text-[11px] text-slate-600">{c.director_name} • {c.phone}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{c.full_address}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}