import React from 'react';

export default function MarksheetPrint({ student }) {
  if (!student) return null;

  const marks = student.marks || {
    scores: [
      { subject_name: "IT Tools & Business Systems", max_theory: 70, max_practical: 30, theory_obtained: 62, practical_obtained: 28 },
      { subject_name: "Financial Accounting (Tally Prime)", max_theory: 70, max_practical: 30, theory_obtained: 65, practical_obtained: 29 },
      { subject_name: "Graphic Design & Web Technology", max_theory: 70, max_practical: 30, theory_obtained: 64, practical_obtained: 27 }
    ],
    total_max: 300,
    total_obtained: 275,
    percentage: 91.67,
    grade: "A+"
  };

  return (
    <div className="marksheet-page bg-white text-black font-serif max-w-[210mm] mx-auto p-8 border border-slate-300 print:border-none print:m-0 print:p-6">
      
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-4">
        <div className="flex justify-between items-center px-4 mb-2">
          <div className="w-16 h-16 border border-black flex items-center justify-center font-bold text-2xl">
            H
          </div>
          <div className="text-center flex-1 px-4">
            <h1 className="text-2xl font-black uppercase tracking-wide">
              Hansora Skills Private Limited
            </h1>
            <p className="text-xs font-sans tracking-tight text-slate-700 font-semibold">
              (An Autonomous National Board for Vocational & Computer Education)
            </p>
            <p className="text-[10px] font-sans text-slate-600">
              Regd. Under the Companies Act, Govt. of India Norms • ISO 9001:2015 Certified
            </p>
          </div>
          <div className="w-16 h-16 border border-dashed border-slate-400 flex items-center justify-center text-[10px] text-center p-1">
            Barcode / Seal
          </div>
        </div>
        <div className="bg-black text-white font-sans text-xs font-bold py-1 uppercase tracking-widest">
          Official Statement of Marks
        </div>
      </div>

      {/* Student Details Grid */}
      <div className="border border-black p-3 mb-4 font-sans text-xs grid grid-cols-2 gap-y-1.5 gap-x-4">
        <div><span className="font-bold">Roll Number:</span> <span className="font-mono">{student.roll_no || '26101001'}</span></div>
        <div><span className="font-bold">Enrollment No:</span> <span className="font-mono">{student.reg_no || 'HS/2026/0142'}</span></div>
        <div><span className="font-bold">Candidate Name:</span> <span className="uppercase font-semibold">{student.name}</span></div>
        <div><span className="font-bold">Center Code:</span> <span className="font-mono">{student.center_code}</span></div>
        <div><span className="font-bold">Father's Name:</span> <span className="uppercase">{student.father_name}</span></div>
        <div><span className="font-bold">Date of Birth:</span> {student.dob || '15/08/2004'}</div>
        <div className="col-span-2"><span className="font-bold">Course Title:</span> <span className="uppercase font-semibold">{student.course_code} - 1 Year Program</span></div>
      </div>

      {/* Marks Matrix Table */}
      <table className="w-full border-collapse border border-black font-sans text-xs mb-4">
        <thead>
          <tr className="bg-slate-100 text-center font-bold">
            <th className="border border-black p-1.5 text-left">Subject Description</th>
            <th className="border border-black p-1.5 w-16">Max (Th)</th>
            <th className="border border-black p-1.5 w-16">Max (Pr)</th>
            <th className="border border-black p-1.5 w-16">Obt (Th)</th>
            <th className="border border-black p-1.5 w-16">Obt (Pr)</th>
            <th className="border border-black p-1.5 w-20">Total</th>
          </tr>
        </thead>
        <tbody>
          {marks.scores.map((s, idx) => {
            const subTotal = Number(s.theory_obtained) + Number(s.practical_obtained);
            return (
              <tr key={idx} className="text-center">
                <td className="border border-black p-1.5 text-left font-medium">{s.subject_name}</td>
                <td className="border border-black p-1.5 font-mono">{s.max_theory}</td>
                <td className="border border-black p-1.5 font-mono">{s.max_practical}</td>
                <td className="border border-black p-1.5 font-mono">{s.theory_obtained}</td>
                <td className="border border-black p-1.5 font-mono">{s.practical_obtained}</td>
                <td className="border border-black p-1.5 font-mono font-bold">{subTotal}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="font-bold bg-slate-50 text-center">
            <td className="border border-black p-1.5 text-right uppercase">Grand Total:</td>
            <td colSpan="2" className="border border-black p-1.5 font-mono">{marks.total_max}</td>
            <td colSpan="2" className="border border-black p-1.5 text-right uppercase">Total Obtained:</td>
            <td className="border border-black p-1.5 font-mono font-bold">{marks.total_obtained}</td>
          </tr>
        </tfoot>
      </table>

      {/* Summary Row */}
      <div className="border border-black p-2 mb-8 font-sans text-xs flex justify-between items-center bg-slate-50 font-bold">
        <span>Percentage: {marks.percentage}%</span>
        <span>Grade Awarded: {marks.grade}</span>
        <span>Result: PASSED IN FIRST DIVISION</span>
      </div>

      {/* Footer / Signatures & QR */}
      <div className="flex justify-between items-end font-sans pt-6">
        <div className="text-center">
          <div className="w-20 h-20 border border-black p-1 flex flex-col items-center justify-center text-[9px] mx-auto mb-1">
            <div className="font-mono font-bold text-[10px]">QR CODE</div>
            <div className="text-slate-500">Scan to Verify</div>
          </div>
          <p className="text-[10px] text-slate-600 font-mono">Date: {new Date().toLocaleDateString('en-IN')}</p>
        </div>

        <div className="text-center">
          <div className="w-24 h-12 border-b border-black mb-1 mx-auto"></div>
          <p className="text-xs font-bold">Center Director</p>
          <p className="text-[10px] text-slate-500">Authorized Study Center</p>
        </div>

        <div className="text-center">
          <div className="w-28 h-12 border-b border-black mb-1 mx-auto flex items-end justify-center text-xs italic font-serif">
            H. Controller
          </div>
          <p className="text-xs font-bold">Controller of Examinations</p>
          <p className="text-[10px] text-slate-500">Hansora Skills Board</p>
        </div>
      </div>

    </div>
  );
}