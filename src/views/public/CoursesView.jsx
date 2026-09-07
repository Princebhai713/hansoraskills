import React, { useState } from 'react';
import { usePortalContext } from '../../context/PortalContext';
import { Search, BookOpen, Clock, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoursesView = () => {
  const { courses } = usePortalContext();
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Computer Education', 'Health Science', 'Vocational Trades'];

  const filteredCourses = (courses || []).filter(c => {
    const matchesCat = selectedCat === 'All' || c.category === selectedCat;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 font-sans text-slate-800 space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Academic Course Directory</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore certified programs across Computer Technology, Health Science, and Vocational Crafts.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedCat === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by code or title (e.g. ADCA)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredCourses.map(course => (
          <div key={course.id || course.code} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-xs hover:border-blue-400 transition">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                  {course.code}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                  {course.duration}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">{course.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{course.category}</p>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-600 space-y-1 mb-4">
                <p className="font-semibold text-slate-700">Course Curriculum:</p>
                {course.curriculum?.map((sub, idx) => (
                  <p key={idx} className="truncate">• {sub.subject_name}</p>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="font-mono font-bold text-slate-700">Center Fee: ₹{course.enrollment_fee}</span>
              <Link to="/franchise" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
                Apply Center <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesView;