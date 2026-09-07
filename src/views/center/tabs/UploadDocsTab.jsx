import React from 'react';
import { Upload } from 'lucide-react';

export default function UploadDocsTab() {
  return (
    <div className="max-w-3xl bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Upload Institutional Legal Documents</h2>
        <p className="text-xs text-slate-500">Board mandatory verification documents for compliance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {[
          { label: "Center Rent Agreement / Ownership Deed", status: "Verified ✔" },
          { label: "Director Aadhar & PAN Card", status: "Verified ✔" },
          { label: "Computer Lab Infrastructure Photo", status: "Upload Required" },
          { label: "Center Reception & Signboard Photo", status: "Upload Required" }
        ].map((doc, idx) => (
          <div 
            key={idx} 
            onClick={() => alert(`Upload dialog opened for: ${doc.label}`)}
            className="border border-dashed border-slate-300 rounded-xl p-5 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition cursor-pointer"
          >
            <Upload className="w-6 h-6 text-slate-400 mb-2" />
            <p className="font-semibold text-slate-800">{doc.label}</p>
            <span className={`text-[10px] mt-2 px-2 py-0.5 rounded font-bold ${
              doc.status.includes('Verified') 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {doc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}