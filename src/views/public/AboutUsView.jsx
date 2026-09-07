import React from 'react';
import { ShieldCheck, Award, GraduationCap, CheckCircle, Target, Compass } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="w-full font-sans bg-[#F8FAFC] text-slate-800 pb-16">
      
      {/* 1. Header Banner */}
      <div className="bg-[#0F172A] text-white py-8 border-b-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            About Our Institution
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Autonomous National Board for Skill, Vocational & Technical Education
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">

        {/* 2. Institutional Profile Section (Background: #f0f0f0) */}
        <div className="bg-[#f0f0f0] border border-slate-300 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-slate-300 text-slate-700 text-xs font-bold mb-3">
            <GraduationCap className="w-4 h-4 text-[#6B0000]" /> Institutional Profile
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 mb-3">
            About Hansora Skills Portal
          </h2>
          
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Autonomous National Board for Skill, Vocational & Technical Education established to standardize skill certifications across India.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-300">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-[#6B0000] shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900 uppercase">ISO Certified</p>
                <p className="text-[11px] text-slate-600">9001:2015 Standards</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-[#D4AF37] shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900 uppercase">National Board</p>
                <p className="text-[11px] text-slate-600">Autonomous Council</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900 uppercase">Online Verification</p>
                <p className="text-[11px] text-slate-600">Instant Certificate Check</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="w-10 h-10 bg-amber-50 text-[#D4AF37] rounded-lg flex items-center justify-center mb-4 border border-amber-200">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To empower students across urban and rural India with accredited, employment-ready skill training programs and globally recognizable certifications.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 border border-blue-200">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Establishing a transparent, tech-enabled affiliation and examination network to support study centers, skill providers, and corporate partners.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}