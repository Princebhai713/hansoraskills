import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

const ContactUsView = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-10 font-sans text-slate-800 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Contact National Secretariat</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Have queries regarding Center Affiliation, Marks Verification, or Examination Schedules? Reach our desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Coordinates */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Hansora Skills Private Limited</h2>
            <p className="text-xs text-slate-400">Head Office & Central Evaluation Division</p>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p>Near Hadhwa Phatak, Medical College Road, Gorakhpur, Uttar Pradesh - 273015</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <p>+91 98765 43210 / +91 91637 27610</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <p>support@hansoraskills.com</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <p>Mon - Sat: 10:00 AM - 06:00 PM</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            Official communications for ISO compliance and Ministry filings are monitored 24/7.
          </div>
        </div>

        {/* Right Inquiry Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          {sent ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Message Received!</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Our support desk has logged your ticket. An executive will respond via WhatsApp/Email shortly.
              </p>
              <button onClick={() => setSent(false)} className="text-xs text-blue-600 font-semibold underline">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                  <input required type="text" placeholder="e.g. Rahul Sharma" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input required type="tel" placeholder="+91 98765 43210" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Purpose</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500 bg-white text-slate-700">
                  <option>New Center Affiliation</option>
                  <option>Student Marksheet / Certificate Query</option>
                  <option>CBT Examination Guidelines</option>
                  <option>General Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Question</label>
                <textarea required rows="4" placeholder="Type your query here..." className="w-full border border-slate-300 rounded-lg p-3 text-xs outline-none focus:border-blue-500"></textarea>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs transition flex items-center justify-center gap-1.5">
                <Send className="w-3.5 h-3.5" /> Submit Inquiry
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactUsView;