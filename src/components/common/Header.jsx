import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronDown, LayoutDashboard, FilePlus, LogIn, 
  LogOut, Phone, Mail, Award, Menu, X, Globe, ShieldCheck, UserCheck
} from 'lucide-react';
import { usePortalContext } from '../../context/PortalContext';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFranchiseOpen, setIsFranchiseOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { 
    isCenterLoggedIn, 
    currentCenterCode, 
    logoutCenter, 
    setActiveRole 
  } = usePortalContext();

  const handleDashboardClick = () => {
    setIsFranchiseOpen(false);
    setIsMobileMenuOpen(false);
    if (isCenterLoggedIn) {
      setActiveRole('center');
      navigate('/center');
    } else {
      alert('कृपया सेंटर डैशबोर्ड खोलने से पहले लॉगिन करें!');
      navigate('/login');
    }
  };

  const handleLogout = () => {
    setIsFranchiseOpen(false);
    setIsMobileMenuOpen(false);
    logoutCenter();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 font-sans du-top-border">
      
      {/* 1. SBS / DU Style Top Micro Helpline & Announcement Bar */}
      <div className="bg-[#5A0000] text-white px-4 sm:px-8 py-1.5 text-xs flex flex-wrap justify-between items-center border-b border-[#D4AF37]/30">
        <div className="flex items-center gap-4 text-[11px] font-medium">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-[#D4AF37]" /> Helpline: <strong className="text-[#D4AF37]">+91 63727 61000</strong>
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-[#D4AF37]" /> info@hansoraskills.edu.in
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="bg-[#D4AF37] text-[#5A0000] px-2 py-0.5 rounded-sm font-bold text-[10px] tracking-wide uppercase">
            ISO 9001:2015 Certified
          </span>
          <Link to="/student-zone" className="hover:text-[#D4AF37] transition font-medium hidden sm:inline">
            Student Portal
          </Link>
          <span className="text-[#D4AF37]">|</span>
          <Link to="/login" className="hover:text-[#D4AF37] transition font-medium">
            Portal Access
          </Link>
        </div>
      </div>

      {/* 2. Main Institutional Branding Header (SBS DU Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          {/* Institutional Crest Emblem */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#800000] border-2 border-[#D4AF37] flex flex-col items-center justify-center text-white font-serif shadow-md group-hover:scale-105 transition-transform">
            <span className="text-xl font-black text-[#D4AF37] tracking-wider leading-none">HSP</span>
            <span className="text-[8px] font-sans tracking-widest text-slate-200 uppercase mt-0.5">ESTD 2011</span>
          </div>

          <div className="leading-tight">
            <h2 className="text-xs sm:text-sm font-bold text-[#800000] tracking-widest uppercase font-serif">
              हंसोरा कौशल विकास संस्थान
            </h2>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#800000] font-serif tracking-tight">
              HANSORA SKILLS PORTAL
            </h1>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-600 tracking-wide uppercase">
              An Autonomous National Board of Vocational & Technical Training
            </p>
          </div>
        </Link>

        {/* Quick Action Badge (Right Side) */}
        <div className="hidden lg:flex items-center gap-3 border-l border-slate-200 pl-6">
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Institutional Status</p>
            <p className="text-xs font-bold text-[#800000] flex items-center gap-1 justify-end">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Govt. Recognized
            </p>
          </div>
        </div>
      </div>

      {/* 3. Primary Academic Navigation Menu (Maroon Bar) */}
      <div className="bg-[#800000] text-white shadow-inner border-t border-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-bold uppercase tracking-wider">
            <Link 
              to="/" 
              className={`px-4 py-3 transition border-b-2 ${isActive('/') ? 'border-[#D4AF37] bg-[#5A0000] text-[#D4AF37]' : 'border-transparent hover:bg-[#5A0000] hover:text-[#D4AF37]'}`}
            >
              Home
            </Link>

            <Link 
              to="/about" 
              className={`px-4 py-3 transition border-b-2 ${isActive('/about') ? 'border-[#D4AF37] bg-[#5A0000] text-[#D4AF37]' : 'border-transparent hover:bg-[#5A0000] hover:text-[#D4AF37]'}`}
            >
              About Us
            </Link>

            <Link 
              to="/courses" 
              className={`px-4 py-3 transition border-b-2 ${isActive('/courses') ? 'border-[#D4AF37] bg-[#5A0000] text-[#D4AF37]' : 'border-transparent hover:bg-[#5A0000] hover:text-[#D4AF37]'}`}
            >
              Courses Offered
            </Link>

            <Link 
              to="/centers" 
              className={`px-4 py-3 transition border-b-2 ${isActive('/centers') ? 'border-[#D4AF37] bg-[#5A0000] text-[#D4AF37]' : 'border-transparent hover:bg-[#5A0000] hover:text-[#D4AF37]'}`}
            >
              Study Centers
            </Link>

            <Link 
              to="/student-zone" 
              className={`px-4 py-3 transition border-b-2 ${isActive('/student-zone') ? 'border-[#D4AF37] bg-[#5A0000] text-[#D4AF37]' : 'border-transparent hover:bg-[#5A0000] hover:text-[#D4AF37]'}`}
            >
              Student Zone
            </Link>

            {/* Franchise Dropdown */}
            <div 
              className="relative group"
              onMouseLeave={() => setIsFranchiseOpen(false)}
            >
              <button
                onClick={() => setIsFranchiseOpen(!isFranchiseOpen)}
                onMouseEnter={() => setIsFranchiseOpen(true)}
                className={`flex items-center gap-1 px-4 py-3 transition border-b-2 uppercase ${isFranchiseOpen || isActive('/franchise') ? 'border-[#D4AF37] bg-[#5A0000] text-[#D4AF37]' : 'border-transparent hover:bg-[#5A0000] hover:text-[#D4AF37]'}`}
              >
                <span>Franchise Portal</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>

              {isFranchiseOpen && (
                <div className="absolute left-0 w-56 bg-white text-slate-800 rounded-b-md shadow-2xl border-t-2 border-[#D4AF37] py-2 z-50 animate-in fade-in">
                  {isCenterLoggedIn && (
                    <div className="px-4 py-2 border-b border-slate-100 bg-amber-50">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Active Center Code</p>
                      <p className="text-xs font-bold text-[#800000] font-mono">{currentCenterCode}</p>
                    </div>
                  )}

                  <button
                    onClick={handleDashboardClick}
                    className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#800000] flex items-center justify-between text-left transition"
                  >
                    <span className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4 text-[#800000]" />
                      Center Dashboard
                    </span>
                  </button>

                  <Link
                    to="/franchise"
                    onClick={() => setIsFranchiseOpen(false)}
                    className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#800000] flex items-center gap-2 text-left transition"
                  >
                    <FilePlus className="w-4 h-4 text-emerald-600" />
                    Apply New Franchise
                  </Link>

                  <div className="border-t border-slate-100 my-1"></div>

                  {!isCenterLoggedIn ? (
                    <Link
                      to="/login"
                      onClick={() => setIsFranchiseOpen(false)}
                      className="w-full px-4 py-2 text-xs font-bold text-[#800000] hover:bg-red-50 flex items-center gap-2 text-left transition"
                    >
                      <LogIn className="w-4 h-4 text-[#800000]" />
                      Center Login
                    </Link>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 text-left transition"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Logout Center
                    </button>
                  )}
                </div>
              )}
            </div>

            <Link 
              to="/contact" 
              className={`px-4 py-3 transition border-b-2 ${isActive('/contact') ? 'border-[#D4AF37] bg-[#5A0000] text-[#D4AF37]' : 'border-transparent hover:bg-[#5A0000] hover:text-[#D4AF37]'}`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action Button & Mobile Menu Button */}
          <div className="flex items-center gap-3 py-2">
            {!isCenterLoggedIn ? (
              <Link
                to="/login"
                className="hidden lg:flex bg-[#D4AF37] hover:bg-[#c39e2e] text-[#5A0000] text-xs font-black px-4 py-1.5 rounded-sm uppercase tracking-wider transition shadow-sm items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" /> Center Login
              </Link>
            ) : (
              <button
                onClick={handleDashboardClick}
                className="hidden lg:flex bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-1.5 rounded-sm uppercase tracking-wider transition shadow-sm items-center gap-1.5"
              >
                <LayoutDashboard className="My Dashboard w-4 h-4" /> My Dashboard
              </button>
            )}

            <button 
              className="lg:hidden p-1.5 text-white hover:bg-[#5A0000] rounded transition"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-[#D4AF37]" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sidebar Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-72 bg-white h-full shadow-2xl flex flex-col">
            <div className="p-4 bg-[#800000] text-white flex justify-between items-center border-b border-[#D4AF37]">
              <span className="font-serif font-bold text-sm tracking-wide">Menu Directory</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-[#D4AF37]" />
              </button>
            </div>
            <div className="p-4 space-y-3 flex-1 overflow-y-auto text-sm font-semibold text-slate-800">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b hover:text-[#800000]">Home</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b hover:text-[#800000]">About Us</Link>
              <Link to="/courses" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b hover:text-[#800000]">Courses</Link>
              <Link to="/centers" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b hover:text-[#800000]">Study Centers</Link>
              <Link to="/student-zone" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b hover:text-[#800000]">Student Zone</Link>
              <Link to="/franchise" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b hover:text-[#800000]">Franchise Portal</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-[#800000]">Contact Us</Link>
            </div>
            <div className="p-4 border-t bg-slate-50">
              <Link 
                to="/login" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="w-full bg-[#800000] text-white text-center py-2.5 rounded text-xs font-bold uppercase tracking-wider block"
              >
                Portal Login
              </Link>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}