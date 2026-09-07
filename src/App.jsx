import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { usePortalContext } from './context/PortalContext';

// 1. Header Component
import Header from './components/common/Header';

// 2. Public Views (सीधे src/views/public से)
import HomeView from './views/public/HomeView';
import AboutUsView from './views/public/AboutUsView';
import CoursesView from './views/public/CoursesView';
import CenterLocatorView from './views/public/CenterLocatorView';
import StudentZoneHubView from './views/public/StudentZoneHubView';
import FranchiseApplyView from './views/public/FranchiseApplyView';
import ContactUsView from './views/public/ContactUsView';
import LoginView from './views/public/LoginView';

// 3. Admin & Center Master Views (src/views/ से)
import AdminDashboardView from './views/admin/AdminDashboardView';
import CenterDashboardView from './views/center/CenterDashboardView';

// 4. Center Sub-Tabs (src/views/center/tabs/ से)
import DashboardOverviewTab from './views/center/tabs/DashboardOverviewTab';
import CenterProfileTab from './views/center/tabs/CenterProfileTab';
import UploadDocsTab from './views/center/tabs/UploadDocsTab';
import AdmissionFormTab from './views/center/tabs/AdmissionFormTab';
import AppliedQueueTab from './views/center/tabs/AppliedQueueTab';
import RegisteredDirectoryTab from './views/center/tabs/RegisteredDirectoryTab';
import MarksEntryTab from './views/center/tabs/MarksEntryTab';
import IdCardGeneratorTab from './views/center/tabs/IdCardGeneratorTab';
import AdmitCardTab from './views/center/tabs/AdmitCardTab';
import PrintCertificatesTab from './views/center/tabs/PrintCertificatesTab';
import WalletLedgerTab from './views/center/tabs/WalletLedgerTab';
import SecurityPasswordTab from './views/center/tabs/SecurityPasswordTab';

// 5. Print Views (src/views/print/ से)
import MarksheetPrint from './views/print/MarksheetPrint';
import CertificatePrint from './views/print/CertificatePrint';

import Footer from './components/common/Footer';

// Public Common Layout: Header + Page Content + Footer
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-800">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const { printDocumentType, selectedStudentForPrint, setPrintDocument } = usePortalContext();

  // Print Isolated View
  if (printDocumentType && selectedStudentForPrint) {
    return (
      <div>
        <div className="no-print bg-slate-900 text-white px-4 py-2.5 flex justify-between items-center shadow-md">
          <button
            onClick={() => setPrintDocument(null, null)}
            className="text-xs font-semibold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded transition cursor-pointer"
          >
            ← Back
          </button>
          <span className="text-xs text-slate-300 font-mono">
            Print Preview: {printDocumentType.toUpperCase()} (Roll: {selectedStudentForPrint.roll_no})
          </span>
          <button
            onClick={() => window.print()}
            className="text-xs font-semibold bg-blue-600 hover:bg-blue-500 px-3.5 py-1.5 rounded transition cursor-pointer"
          >
            Print / Save as PDF
          </button>
        </div>

        {printDocumentType === 'marksheet' && <MarksheetPrint student={selectedStudentForPrint} />}
        {printDocumentType === 'certificate' && <CertificatePrint student={selectedStudentForPrint} />}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Unified Header */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/about" element={<AboutUsView />} />
          <Route path="/courses" element={<CoursesView />} />
          <Route path="/centers" element={<CenterLocatorView />} />
          <Route path="/student-zone" element={<StudentZoneHubView />} />
          <Route path="/franchise" element={<FranchiseApplyView />} />
          <Route path="/contact" element={<ContactUsView />} />
          <Route path="/login" element={<LoginView />} />
        </Route>

        {/* Super Admin Console */}
        <Route path="/admin" element={<AdminDashboardView />} />

        {/* Center Portal Nested Routes */}
        <Route path="/center" element={<CenterDashboardView />}>
          <Route index element={<Navigate to="/center/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardOverviewTab />} />
          <Route path="profile" element={<CenterProfileTab />} />
          <Route path="upload-docs" element={<UploadDocsTab />} />
          <Route path="admission" element={<AdmissionFormTab />} />
          <Route path="applied-queue" element={<AppliedQueueTab />} />
          <Route path="registered" element={<RegisteredDirectoryTab />} />
          <Route path="marks-entry" element={<MarksEntryTab />} />
          <Route path="id-card" element={<IdCardGeneratorTab />} />
          <Route path="admit-card" element={<AdmitCardTab />} />
          <Route path="certificates" element={<PrintCertificatesTab />} />
          <Route path="wallet" element={<WalletLedgerTab />} />
          <Route path="security" element={<SecurityPasswordTab />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}