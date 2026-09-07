import React, { useState } from 'react';
import { Search, FileText, CreditCard, Clock, BookOpen, Download, AlertCircle, CheckCircle2, Award } from 'lucide-react';
import { usePortalContext } from '../../context/PortalContext';

const StudentZoneHubView = () => {
  const { students, setPrintDocument } = usePortalContext();
  const [activeTab, setActiveTab] = useState('verification');
  const [searchQuery, setSearchQuery] = useState('');
  const [foundStudent, setFoundStudent] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    const s = students.find(item => item.roll_no === searchQuery || item.reg_no === searchQuery);
    setFoundStudent(s || null);
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Academic Gateway</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Instant verification, digital ID cards, admit cards, and examination schedules.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-slate-200 mb-8 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('verification'); setSearched(false); }}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 'verification' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          <Search className="w-3.5 h-3.5" /> Result Verification
        </button>
        <button
          onClick={() => { setActiveTab('admit-card'); setSearched(false); }}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 'admit-card' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          <FileText className="w-3.5 h-3.5" /> Admit Card
        </button>
        <button
          onClick={() => { setActiveTab('id-card'); setSearched(false); }}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 'id-card' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          <CreditCard className="w-3.5 h-3.5" /> Digital ID Card
        </button>
        <button
          onClick={() => { setActiveTab('exam'); setSearched(false); }}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 'exam' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          <Clock className="w-3.5 h-3.5" /> Online Exam Rules
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab !== 'exam' ? (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Enter Roll Number or Registration No
              </label>
              <div className="flex gap-2">
                <input
                  required
                  type="text"
                  placeholder="e.g. 26101001"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                >
                  Search
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Test Roll No: <span className="text-blue-600 cursor-pointer font-mono" onClick={() => setSearchQuery('26101001')}>26101001</span>
              </p>
            </div>
          </form>

          {searched && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              {foundStudent ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm text-slate-900">{foundStudent.name}</p>
                      <p className="text-slate-500 font-mono text-[11px]">Roll: {foundStudent.roll_no || foundStudent.reg_no}</p>
                    </div>
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 font-bold px-2 py-0.5 rounded text-[10px]">
                      {foundStudent.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-0.5">
                    <p><span className="text-slate-400">Course:</span> {foundStudent.course_code}</p>
                    <p><span className="text-slate-400">Study Center:</span> {foundStudent.center_code}</p>
                  </div>

                  {activeTab === 'verification' && foundStudent.status === 'Certified' && (
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setPrintDocument && setPrintDocument(foundStudent, 'marksheet')}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-1.5 rounded text-xs transition flex items-center justify-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Marksheet
                      </button>
                      <button
                        onClick={() => setPrintDocument && setPrintDocument(foundStudent, 'certificate')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 rounded text-xs transition flex items-center justify-center gap-1"
                      >
                        <Award className="w-3.5 h-3.5" /> Certificate
                      </button>
                    </div>
                  )}

                  {activeTab === 'admit-card' && (
                    <button
                      onClick={() => alert(`Admit Card generated for Roll: ${foundStudent.roll_no}. Ready to print.`)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-1.5 rounded text-xs transition"
                    >
                      Print Official Admit Card
                    </button>
                  )}

                  {activeTab === 'id-card' && (
                    <button
                      onClick={() => alert(`CR80 Student ID generated for Roll: ${foundStudent.roll_no}.`)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 rounded text-xs transition"
                    >
                      Download Digital ID Card
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>No student found with this Roll / Registration number.</span>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-xs text-xs sm:text-sm text-slate-700 space-y-4">
          <h2 className="font-bold text-slate-900 text-base">Online CBT Examination Protocol</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed">
            <li>Examinations are conducted online through authorized centers or scheduled board sessions.</li>
            <li>The test contains 50 Multiple Choice Questions (MCQs) with a 60-minute countdown timer.</li>
            <li>No negative marking is applied unless explicitly indicated in trade-specific evaluation.</li>
            <li>Scorecards and provisional evaluations are published upon supervisor submission.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentZoneHubView;