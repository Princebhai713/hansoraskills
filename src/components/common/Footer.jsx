import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, ExternalLink, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#f0f0f0] text-slate-800 border-t-4 border-[#D4AF37] font-sans">
      
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Col 1: About Institution */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#6B0000] text-[#D4AF37] font-serif font-black flex items-center justify-center text-xs border border-[#D4AF37]">
              HSP
            </div>
            <div>
              <h3 className="font-serif font-black text-slate-900 text-sm leading-tight">
                HANSORA SKILLS PORTAL
              </h3>
              <p className="text-[10px] text-slate-600 font-bold uppercase">
                Autonomous Vocational Board
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            National Vocational & Technical Education Portal providing verified certifications, course affiliations, and student services across India.
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-300 rounded text-[11px] font-semibold text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> ISO 9001:2015 Certified
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider mb-3 border-b border-slate-300 pb-1">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <Link to="/about" className="hover:text-[#6B0000] flex items-center gap-1 transition">
                <ChevronRight className="w-3 h-3 text-[#D4AF37]" /> About Institution
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-[#6B0000] flex items-center gap-1 transition">
                <ChevronRight className="w-3 h-3 text-[#D4AF37]" /> Approved Courses
              </Link>
            </li>
            <li>
              <Link to="/centers" className="hover:text-[#6B0000] flex items-center gap-1 transition">
                <ChevronRight className="w-3 h-3 text-[#D4AF37]" /> Authorized Study Centers
              </Link>
            </li>
            <li>
              <Link to="/franchise" className="hover:text-[#6B0000] flex items-center gap-1 transition">
                <ChevronRight className="w-3 h-3 text-[#D4AF37]" /> Franchise Application
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#6B0000] flex items-center gap-1 transition">
                <ChevronRight className="w-3 h-3 text-[#D4AF37]" /> Contact & Helpline
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Student Services */}
        <div>
          <h4 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider mb-3 border-b border-slate-300 pb-1">
            Student Services
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <Link to="/student-zone" className="hover:text-[#6B0000] flex items-center gap-1 transition">
                <ChevronRight className="w-3 h-3 text-[#D4AF37]" /> Certificate Verification
              </Link>
            </li>
            <li>
              <Link to="/student-zone" className="hover:text-[#6B0000] flex items-center gap-1 transition">
                <ChevronRight className="w-3 h-3 text-[#D4AF37]" /> Download Marksheet
              </Link>
            </li>
            <li>
              <Link to="/student-zone" className="hover:text-[#6B0000] flex items-center gap-1 transition">
                <ChevronRight className="w-3 h-3 text-[#D4AF37]" /> Download Admit Card
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-[#6B0000] flex items-center gap-1 transition">
                <ChevronRight className="w-3 h-3 text-[#D4AF37]" /> Center Login Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact Info */}
        <div>
          <h4 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider mb-3 border-b border-slate-300 pb-1">
            Head Office
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#6B0000] shrink-0 mt-0.5" />
              <span>Hansora Skills Portal, Main Institutional Zone, New Delhi, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#6B0000] shrink-0" />
              <span className="font-mono font-bold text-slate-900">+91 63727 61000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#6B0000] shrink-0" />
              <span>info@hansoraskills.edu.in</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-slate-300 text-slate-700 border-t border-slate-300 py-3 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 font-medium text-[11px]">
          <p>© {new Date().getFullYear()} Hansora Skills Portal. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:underline">Terms of Affiliation</a>
            <span>|</span>
            <a href="#" className="hover:underline">Disclaimer</a>
          </div>
        </div>
      </div>

    </footer>
  );
}