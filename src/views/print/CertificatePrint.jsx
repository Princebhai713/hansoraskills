import React from 'react';

export default function CertificatePrint({ student }) {
  if (!student) return null;

  return (
    <div className="certificate-page bg-white text-black font-serif max-w-[297mm] mx-auto p-8 border-8 border-double border-slate-900 print:border-8 print:border-double print:border-black print:m-0 relative">
      
      {/* Inner Decorative Border */}
      <div className="border-2 border-amber-600 p-8 h-full flex flex-col justify-between text-center relative">
        
        {/* Subtle Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
          <span className="text-9xl font-black font-sans">HANSORA</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold uppercase tracking-widest text-slate-900 mb-1">
            Hansora Skills
          </h1>
          <p className="text-xs font-sans uppercase tracking-widest text-slate-600 font-semibold mb-6">
            Autonomous National Board for Vocational & Computer Education • Regd. Govt. of India
          </p>
          
          <div className="inline-block border-b-2 border-amber-600 pb-1 mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-widest font-serif text-amber-900">
              Diploma Certificate
            </h2>
          </div>
        </div>

        {/* Body Text */}
        <div className="max-w-3xl mx-auto space-y-4 text-base leading-relaxed text-slate-800">
          <p>
            This is to certify that <span className="font-bold text-lg uppercase underline decoration-1 underline-offset-4">{student.name}</span>,
          </p>
          <p>
            Son/Daughter of <span className="font-bold uppercase">{student.father_name}</span>,
            bearing Roll Number <span className="font-mono font-bold">{student.roll_no || '26101001'}</span> and Enrollment Number <span className="font-mono font-bold">{student.reg_no || 'HS/2026/0142'}</span>,
          </p>
          <p>
            has successfully completed the prescribed course of study and passed the examination in:
          </p>
          <p className="text-xl font-bold uppercase tracking-wide text-slate-950 py-1">
            {student.course_code} - Advance Diploma in Computer Applications
          </p>
          <p>
            conducted through Authorized Center <span className="font-semibold uppercase">{student.center_code}</span> and has been placed in the <span className="font-bold text-amber-900">FIRST DIVISION WITH DISTINCTION (GRADE A+)</span>.
          </p>
        </div>

        {/* Footer / Signatures */}
        <div className="flex justify-between items-end pt-12 px-6 font-sans">
          <div className="text-left">
            <div className="w-16 h-16 border border-slate-400 p-1 flex items-center justify-center text-[9px] font-mono text-center">
              QR Verification
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">Date: {new Date().toLocaleDateString('en-IN')}</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 rounded-full border-2 border-amber-600 flex items-center justify-center text-[10px] font-bold text-amber-800 uppercase p-1">
              Official Seal
            </div>
          </div>

          <div className="text-right">
            <div className="w-36 border-b border-black mb-1 ml-auto"></div>
            <p className="text-xs font-bold">Controller of Examinations</p>
            <p className="text-[10px] text-slate-500">Hansora Skills National Board</p>
          </div>
        </div>

      </div>
    </div>
  );
}