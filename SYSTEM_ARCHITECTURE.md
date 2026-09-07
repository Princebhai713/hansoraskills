# SYSTEM ARCHITECTURE & TECH STACK

**Project Name:** Hansora Skills Portal  
**Architecture Pattern:** Component-Driven Single Page Application (SPA) with In-Memory Demo Store  
**Target Environment:** Web (Mobile-Responsive, Desktop-First Admin/Center Views)

---

## 1. HIGH-LEVEL ARCHITECTURE OVERVIEW

The application follows a role-segmented architecture designed to scale seamlessly from an in-memory client prototype to a full-stack production deployment.

+------------------------------------------------------------------------------------+
|                                    PUBLIC ROUTE                                    |
|   Landing Page  |  Course Catalog  |  Center Locator  |  Verification Widget (QR)  |
+------------------------------------------------------------------------------------+
|
Role Switcher
|
+-----------------------------+-----------------------------+
|                                                           |
+---------------------------+                               +---------------------------+
|    STUDY CENTER PORTAL    |                               |    SUPER ADMIN CONSOLE    |
| - Prepaid Wallet & Ledger |                               | - Master Network Metrics  |
| - Student Enrollment      |           SHARED STORE        | - Franchise Lead Intake   |
| - Admit / ID Card Gen     | <===========================> | - Center Key Management   |
| - Theory / Practical Mark |   (Zustand / React Context)   | - Marks Auditing Engine   |
| - Certificate Print Lock  |                               | - Final Approval Trigger  |
+---------------------------+                               +---------------------------+
|                                                           |
+-----------------------------+-----------------------------+
|
+-----------------------+
|   PRINT & PDF ENGINE  |
| - A4 Dynamic Marksheet|
| - Guilloche Diploma   |
| - Instant QR Engine   |
+-----------------------+


---

## 2. PRODUCTION & PROTOTYPE TECH STACK

### 2.1. Core Application Layer
- **Runtime & Bundler:** Vite + React 18+ (High-speed HMR, lightweight bundle).
- **Styling Architecture:** Tailwind CSS (utility-first, zero runtime overhead).
- **Icons & Visuals:** `lucide-react` (standardized iconography across dashboards).
- **Client-Side Routing:** `react-router-dom` (v6) with declarative role-based layouts.

### 2.2. State Management & Data Flow
- **Prototype Store:** Zustand or React Context with `localStorage` synchronization.
  - Ensures wallet balance deductions, student registrations, marks entry, and admin approvals persist across page refreshes during client evaluation.
- **Production Path:** REST / GraphQL APIs connecting to Node.js/Express or Next.js backend with MongoDB.

### 2.3. Document Generation & Verification Engine
- **Vector QR Generation:** `qrcode.react` (encodes verifiable URL: `https://hansoraskills.com/verify?roll=[ROLL_NO]`).
- **Print Fidelity:** Tailwind Print Stylesheets (`@media print`) paired with `html2canvas` + `jspdf` for deterministic PDF downloads.

---

## 3. PROJECT DIRECTORY STRUCTURE

```text
hansora-skills-portal/
├── docs/                               # Architecture and Planning Documentation
│   ├── PRD.md                          # Master Product Requirements Document
│   ├── SYSTEM_ARCHITECTURE.md          # System Design & Code Structure (This file)
│   ├── DATABASE_SCHEMA.md              # Schemas, Relationships, & Types
│   ├── USER_FLOW_AND_IA.md             # Visual Journeys and Page Hierarchies
│   └── DESIGN_SYSTEM.md                # 2026 SaaS UI Standards & Print Styles
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg                        # Hansora Skills Emblem
│   └── watermark-seal.png              # 6% Opacity Security Seal for Diplomas
│
├── src/
│   ├── assets/                         # SVG Badges, Guilloche Borders, Signatures
│   │
│   ├── components/                     # Modular Component Library
│   │   ├── common/                     # Reusable Atomic UI Blocks
│   │   │   ├── Badge.jsx               # Status indicators (Applied, Certified, etc.)
│   │   │   ├── Button.jsx              # Primary, Outline, and Danger variants
│   │   │   ├── Modal.jsx               # Backdrop-blurred accessible dialogs
│   │   │   ├── Navbar.jsx              # Universal responsive navigation bar
│   │   │   └── Table.jsx               # High-density data grid with pagination
│   │   │
│   │   ├── verification/               # Student Result Validation Engine
│   │   │   ├── VerificationSearch.jsx  # Hero section Roll No + DOB search widget
│   │   │   └── VerificationModal.jsx   # Live modal showing genuine academic records
│   │   │
│   │   ├── documents/                  # Production-Grade Printable Documents
│   │   │   ├── MarksheetPrint.jsx      # A4 Portrait Subject-wise Scorecard
│   │   │   ├── CertificatePrint.jsx    # A4 Landscape Official Diploma with QR & Seal
│   │   │   ├── AdmitCardPrint.jsx      # Examination Hall Ticket layout
│   │   │   └── IdCardPrint.jsx         # Pocket-sized Student ID format
│   │   │
│   │   ├── center/                     # Study Center Dashboard Components
│   │   │   ├── WalletCard.jsx          # Live balance display with recharge modal
│   │   │   ├── AdmissionModal.jsx      # New candidate entry form
│   │   │   ├── MarksEntryModal.jsx     # Theory/Practical scoring dialog
│   │   │   └── StudentQueueTable.jsx   # Applied vs. Accepted management table
│   │   │
│   │   └── admin/                      # Super Admin Console Components
│   │       ├── ResultAuditQueue.jsx    # Review theory/practical marks from centers
│   │       ├── CenterCredentialList.jsx# Plaintext password visibility & codes
│   │       └── FranchiseLeadTable.jsx  # Inbound application management
│   │
│   ├── context/                        # Unified Data & State Handlers
│   │   ├── AuthContext.jsx             # Active role switcher (Admin / Center / Public)
│   │   └── PortalDataContext.jsx       # In-memory reactive state (Stores, Wallet, Students)
│   │
│   ├── data/
│   │   └── mockData.json               # Seed records for centers, courses, and students
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx               # Protected and public route declarations
│   │
│   ├── views/                          # Route-Level Page Views
│   │   ├── public/
│   │   │   ├── HomeView.jsx            # Landing page, hero, verified search, and locator
│   │   │   ├── CoursesView.jsx         # 350+ course categorical explorer
│   │   │   └── FranchiseInquiryView.jsx# Public territory application page
│   │   │
│   │   ├── center/
│   │   │   └── CenterDashboardView.jsx # Operations command center for franchises
│   │   │
│   │   └── admin/
│   │       └── AdminDashboardView.jsx  # Super Admin control room
│   │
│   ├── index.css                       # Tailwind layers and print utility styles
│   ├── main.jsx                        # React root mounting
│   └── App.jsx                         # Main container with Role Switcher Toolbar
│
├── .cursorrules                        # AI Agent Directives for Vibe Coding
├── index.html                          # Root HTML with SEO headers
├── package.json                        # Dependencies and build scripts
├── tailwind.config.js                  # Color palette and print media configurations
└── vite.config.js                      # Build and optimization flags
4. INTEGRATION & ENGINE SPECIFICATIONS4.1. Wallet Calculation EngineInitial Balance: Defined in center seed object (e.g., 5,000 INR).Transaction Flow:$$\text{Closing Balance} = \text{Opening Balance} - \text{Course Enrollment Fee}$$Safety Lock: If $\text{Wallet Balance} < \text{Course Enrollment Fee}$, the interface automatically disables the confirmation button and shifts focus to the dynamic QR recharge dialog.4.2. Roll Number Sequential Integrity EngineTo prevent sequence corruption during back-dated enrollments:$$\text{Roll Number} = \text{Center Prefix} + \text{Year Identifier} + \text{Zero-Padded Incremental Index}$$(Example: Center 101 in year 2026 yielding 26101001, 26101002)Back-dated records reserve specific index pools without shifting active session indexes.4.3. Print Engine Security RulesPrint layouts enforce strict CSS @media print directives:Disables browser headers, footers, target URLs, and timestamps.Fixes page dimensions to exact A4 sizes (210mm x 297mm portrait for marksheet, 297mm x 210mm landscape for certificates).Unapproved results automatically inject a fixed CSS overlay:CSS.watermark-unapproved {
  content: "PROVISIONAL / PREVIEW - NOT VALID FOR LEGAL USE";
  color: rgba(220, 38, 38, 0.15);
  transform: rotate(-45deg);
}

---

अगली फाइल **`DATABASE_SCHEMA.md`** होगी जिसमें पूरे प्रोजेक्ट के डेटा मॉडल्स, फील्ड्स, रिलेशनशिप्स और TypeScript डेफिनिशन्स शामिल हैं। क्या उसे तैयार करें?