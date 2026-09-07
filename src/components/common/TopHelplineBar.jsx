import React from 'react';
import { ShieldCheck } from 'lucide-react';

const TopHelplineBar = () => {
  return (
    <div className="bg-slate-100 py-1.5 px-8 flex justify-between items-center text-xs text-slate-600 border-b border-slate-200">
      <div>Customer Support Helpline: +91-829358 8387</div>
      <div className="flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-blue-600" />
        ISO 9001:2015 Certification Ticker Slides
      </div>
    </div>
  );
};

export default TopHelplineBar;
