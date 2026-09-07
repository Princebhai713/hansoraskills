# DESIGN.md - HANSORA SKILLS PORTAL (MASTER BLUEPRINT)
## Complete UI/UX, Page Architecture, Component Hierarchy & Design Tokens
**Style Standard:** Google Material Design 3 / Google Workspace Admin (Clean, Flat, 1px Borders, High-Density, Data-First)
**Stakeholder Coverage:** Super Admin, Sub-Admin (Staff), Franchise/Center (Merchant), Enrolled Students, Direct Self-Enrolling Candidates, Public Visitors, and Marketing/SEO Engineers.

---

## 1. DESIGN TOKENS & SYSTEM FOUNDATION

### 1.1. Color System (Flat, High-Trust, Enterprise)
* **Surface Background (Canvas):** `#FFFFFF` (Pure White) & `#F8FAFC` (Slate 50 - Section Zebra Striping)
* **Container / Card Fill:** `#FFFFFF` (Pure White)
* **Structural Borders (Universal):** `1px solid #E2E8F0` (Slate 200) / `#E0E2EC` (Neutral Gray) — *No heavy 3D drop shadows, no glossy skeuomorphism*
* **Typography Primary:** `#0F172A` (Slate 900) / `#1F1F1F` (Google Charcoal)
* **Typography Muted:** `#475569` (Slate 600) / `#5F6368` (Google Muted Gray)
* **Placeholder Text:** `#94A3B8` (Slate 400)
* **Primary Interactive Brand Color:** `#1A73E8` (Google Blue) | Hover: `#1557B0`
* **Success / Wallet Credit / Verified:** `#0F9D58` (Google Emerald) | Soft Tint: `#E6F4EA` | Text: `#137333`
* **Warning / Provisional / Audit Pending:** `#F2994A` (Google Amber) | Soft Tint: `#FEF7E0` | Text: `#B06000`
* **Destructive / Wallet Debit / Rejection:** `#D93025` (Google Crimson) | Soft Tint: `#FCE8E6` | Text: `#C5221F`
* **Accent Purple (Territory / Leads):** `#8430CE` | Soft Tint: `#F3E8FD` | Text: `#681DA8`

### 1.2. Typography Guidelines
* **Display & Primary Font:** `'Google Sans', 'Inter', system-ui, sans-serif`
* **Data Monospace Font:** `'JetBrains Mono', 'Roboto Mono', monospace` (Used for Roll Numbers, Center Codes, Financial Values, and Transaction Hashes)
* **Scale:**
  * **H1 / Page Title:** `28px (1.75rem)`, Weight: 600 (SemiBold), Line Height: `1.2`, Tracking: `-0.02em`
  * **H2 / Section Title:** `20px (1.25rem)`, Weight: 600 (SemiBold), Line Height: `1.3`
  * **H3 / Card Header:** `15px (0.9375rem)`, Weight: 500 (Medium), Color: `#0F172A`
  * **Body Copy:** `14px (0.875rem)`, Weight: 400 (Regular), Line Height: `1.5`, Color: `#334155`
  * **Table Cells & Input Text:** `13px (0.8125rem)`, Weight: 400 / 500
  * **Field Labels & Captions:** `12px (0.75rem)`, Weight: 500, Color: `#64748B`
  * **Status Badges / Micro Badges:** `11px (0.6875rem)`, Weight: 600, All-Caps

### 1.3. Spacing, Borders & Structural Elevation
* **Border Radii:**
  * Inputs, Selects, Buttons: `6px` or `8px` (`rounded-lg`)
  * Cards, Tables, Floating Modals: `12px` (`rounded-xl`)
  * Badges & Pills: `9999px` (`rounded-full`)
* **Borders & Shadows:**
  * Default Border: `1px solid #E2E8F0`
  * Elevation: Strictly flat (`shadow-none` or subtle `shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.05)`)
* **Input States:**
  * Background: `#FFFFFF`
  * Border: `1px solid #CBD5E1`
  * Focus: `border-color: #1A73E8; outline: 2px solid rgba(26,115,232,0.18)`

---

## 2. GLOBAL COMPONENTS & PERSISTENT LAYOUTS

### 2.1. Top Notification & Helpline Ticker
* **Height:** `36px` | **Background:** `#0F172A` | **Text:** `#94A3B8` (`12px font-medium`)
* **Left Segment:**
  * Phone Icon (`#60A5FA`) + `+91 98765 43210`
  * Divider: `|`
  * Mail Icon (`#60A5FA`) + `support@hansoraskills.com`
* **Right Segment:**
  * Chip Badge (`bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded text-[11px] font-bold`): "ISO 9001:2015 Certified"
  * Ticker String: "All-India Center Affiliation & Direct Admissions Open (Academic Session 2026-27)"

### 2.2. Master Identity Header
* **Height:** `68px` | **Background:** `#FFFFFF` | **Border-Bottom:** `1px solid #E2E8F0`
* **Left Segment (Brand Unit):**
  * Emblem Box: `44px x 44px`, `bg-blue-600`, radius `10px`, crisp white lettermark **"H"**
  * Primary Title: **HANSORA SKILLS** (`18px font-extrabold text-slate-900 leading-none`)
  * Subtitle: "PRIVATE LIMITED • NATIONAL SKILL & VOCATIONAL BOARD" (`10px font-semibold text-slate-500 tracking-wider mt-0.5`)
* **Right Segment:**
  * Support Unit: "Affiliation Helpline" (`11px text-slate-400`), "10:00 AM - 6:00 PM" (`13px font-bold text-slate-800`)
  * Vertical Separator
  * Login CTA: `Center Login` (`bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5`)

### 2.3. Universal Navigation Bar (Navbar)
* **Height:** `46px` | **Background:** `#1E293B` | **Text:** `#E2E8F0` (`13px font-medium`)
* **Items (Left-to-Right):**
  1. `Home` (Active: `#38BDF8` text with `2px solid #38BDF8` underline)
  2. `About Us` (Dropdown: Vision, Mission, Legal Affiliations, ISO Norms)
  3. `Courses ▾` (Dropdown: Computer Education, Health Science, Vocational, Agriculture, Beauty)
  4. `Study Center` (Direct Territory Locator)
  5. `Student Zone ▾` (Highlighted Gold `#FBBF24`: Verify Marksheet, Admit Card, Student ID, Online Exam, Video LMS, Direct Admission)
  6. `Franchise ▾` (Dropdown: Benefits, Territory Policy, Franchise Application)
  7. `Gallery` (Convocation & Training Centers)
  8. `Contact Us` (Head Office Coordinates)

---

## 3. PUBLIC WEBSITE ARCHITECTURE (GUEST & APPLICANT EXPERIENCE)

### 3.1. Homepage Layout (`/`)

#### Section A: Hero Two-Column Work Area
* **Background:** `#FFFFFF` | **Padding:** `48px 0` | **Border-Bottom:** `1px solid #E2E8F0`
* **Left Column (60% - Institutional Pitch):**
  * Pill: `bg-blue-50 border border-blue-200 text-blue-700 text-xs px-3 py-1 rounded-full font-medium` ("Autonomous National Board for Vocational Education")
  * H1 Headline: "Empowering India Through Practical Skills & National Certification." (`36px font-bold text-slate-900`)
  * Subtitle: "350+ industry-recognized programs in Computer, Paramedical, Agriculture, and Vocational disciplines. Integrated with verifiable digital validation across all Indian territories."
  * CTA Row:
    * Primary: `Explore 350+ Courses` (`bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm`)
    * Secondary: `Apply for Center Affiliation` (`bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg font-medium text-sm`)
* **Right Column (40% - Instant Student Verification Box):**
  * Container: `bg-white border border-slate-300 rounded-xl p-6 shadow-sm`
  * Header: Shield Icon (`#1A73E8`) + "Online Student Verification" (`16px font-bold text-slate-900`)
  * Field 1: "Roll Number / Registration No." (Outlined input, placeholder: `e.g. 26101001`)
  * Field 2: "Date of Birth" (`type="date"`)
  * Button: `Verify Record` (`bg-blue-600 text-white w-full py-2.5 rounded-lg font-medium text-sm`)
  * Interactive Preview Box (Appears on match):
    * Style: `bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900`
    * Details: "✔ Verified Authentic Record: Amit Kumar | ADCA (HS-UP-101) | 91.67% (Grade A+)"
    * Action Link: `View Verified Digital Marksheet →`

#### Section B: 4 Quick Service Action Cards
* **Grid:** 4-Column responsive grid (`gap-4`, padding: `32px 0`)
* **Card Unit:** `bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 transition-colors`
  1. **Find Study Center:** Pin Icon (`bg-blue-50 text-blue-600`), "Search Authorized Centers by State and District."
  2. **Student Zone:** User Badge Icon (`bg-emerald-50 text-emerald-600`), "Instant Hall Tickets, Digital IDs, and Examination Rules."
  3. **Apply for Franchise:** Building Icon (`bg-purple-50 text-purple-600`), "Start a Training Center with Single Pincode Territory Exclusivity."
  4. **Online Examination:** Timer Icon (`bg-amber-50 text-amber-600`), "Scheduled MCQ Exams with Automated Score Generation."

#### Section C: Categorical Course Tabs & Explorer
* **Filter Tabs:** `[ Computer Education ]` | `[ Health Science ]` | `[ Vocational ]` | `[ Agriculture ]` | `[ Beauty & Wellness ]`
* **Course Card Grid (3 Columns):**
  * Border: `1px solid #E2E8F0` | Radius: `12px` | Padding: `16px`
  * Badges: Course Code (e.g., `ADCA-01`), Category Pill (`bg-slate-100 text-slate-700 text-[11px]`)
  * Title: "Advance Diploma in Computer Applications" (`15px font-semibold`)
  * Metadata: "Duration: 1 Year | Eligibility: 10th/12th Pass" (`12px text-slate-500`)
  * Syllabus Summary: "Tally Prime • IT Tools • Graphic & Web Essentials"
  * Action: `View Detailed Syllabus →` (`text-blue-600 text-xs font-semibold`)

#### Section D: Embedded Center Locator
* **Container:** `bg-slate-50 border border-slate-200 rounded-2xl p-6`
* **Filter Controls:** State Dropdown (`Uttar Pradesh`), District Dropdown (`Gorakhpur`), `Search Centers` Button.
* **Match Row:** Displays Code (`HS-UP-101`), Institute Name, Director, Address, and "Active Verified Center" badge.

---

### 3.2. Direct Student Self-Enrollment Page (`/student/direct-admission`)
*Business Context: Independent candidate direct admission bypassing regional centers; fees route directly to central company accounts.*
* **Form Container:** Centered card (`max-w-3xl mx-auto my-8 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm`)
* **Header:** "Direct Student Admission Portal (Central Board Registration)"
* **Input Matrix:**
  * Candidate Full Name, Father's Name, Mother's Name, DOB, Gender, Mobile, Email, Full Postal Address.
  * Course Selection: Dropdown with explicit public board pricing (e.g., `ADCA - 1 Year | Fee: ₹2,500`).
  * Upload Section: Passport Photo Dropzone and 10th/12th Qualification Marksheet Dropzone.
  * Payment Section: Direct Corporate Gateway (Razorpay) or Dynamic Bank UPI QR.
  * Verification Policy Note: *"Upon submission and payment confirmation, candidate credentials for the Online Exam & LMS will be dispatched via SMS/Email."*

---

## 4. STUDENT ZONE ARCHITECTURE (STUDENTS & CANDIDATES)

### 4.1. Marksheet & Certificate Verification Page (`/student/verify-result`)
* **Search Box Container:** `max-w-2xl mx-auto bg-white border border-slate-300 rounded-xl p-6`
* **Inputs:** Roll Number (`26101001`), Course Selection Dropdown, Date of Birth.
* **Verified Record Card (Rendered Output):**
  * Header Flexbox: Passport Photo (`64px x 64px rounded-lg`), Name: **AMIT KUMAR**, Father: "Ramakant Kumar", Roll No: `26101001`, Enrollment No: `HS/2026/0142`, Center: "Gorakhpur Skill Tech Institute (HS-UP-101)".
  * Verification Badge: `bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold px-3 py-1 rounded-full text-xs` ("✔ Authentic Certified Academic Record").
  * **Marksheet Score Table:**
    * Columns: `Subject Title`, `Max (Th)`, `Max (Pr)`, `Obt (Th)`, `Obt (Pr)`, `Subject Total`
    * Rows:
      * IT Tools & Business Systems: 70 | 30 | 62 | 28 | **90**
      * Financial Accounting (Tally Prime): 70 | 30 | 65 | 29 | **94**
      * Graphic Design & Web Tech: 70 | 30 | 64 | 27 | **91**
  * Summary Bar: "Grand Total: 275 / 300", "Percentage: 91.67%", "Grade: A+ (Distinction)".
  * Download Trigger Rules:
    * If Super Admin Approved: Active `Download Official Marksheet (PDF)` button in emerald green.
    * If Pending Admin Approval: Amber warning pill: *"Provisional Record - Official Downloads Locked Awaiting Super Admin Audit"*.

### 4.2. Admit Card / Hall Ticket Download Page (`/student/admit-card`)
* **Input:** Student Roll Number or Registration Number.
* **Printable Output:** A4 formatted admission hall ticket:
  * Official board seal, photo, registration details, examination center code and full physical address.
  * Subject matrix with scheduled exam dates, reporting times, and candidate rules.
  * Direct action: `Print Admit Card`.

### 4.3. Student Digital ID Card Page (`/student/id-card`)
* **Input:** Enrollment Number.
* **Card Output:** Standard CR80 pocket layout (vertical or horizontal), barcode, center code, authorized signature, and candidate photo.

### 4.4. Online Examination & Mock Test Portal (`/student/exam-portal`)
* **Access Gateway:** Roll Number + DOB authentication.
* **Interface Layout (Split-Screen):**
  * Top Bar: Candidate details, Course code, Live Countdown Timer (`00:58:40 Remaining` in red monospace).
  * Left Workspace (70%): Current Question, 4 Radio-button options, `Previous`, `Next`, and `Mark for Review` buttons.
  * Right Palette (30%): 50-Question color-coded status grid (Green = Answered, Gray = Not Visited, Amber = Review).
  * Submission Dialog: Final tally summary modal and instant score generation trigger.

### 4.5. Video Lectures & LMS Portal (`/student/lms-classes`)
*Business Context: Fulfills client requirement to view structured video lectures per course.*
* **Sidebar:** Categorized curriculum tree (e.g., Module 1: Computer Fundamentals, Module 2: Tally Prime).
* **Workspace:** Unlisted secure video player, chapter progress indicator, and downloadable PDF study notes.

---

## 5. STUDY CENTER / FRANCHISE (MERCHANT) DASHBOARD (`/center`)

### 5.1. Top Navigation Bar
* **Left:** Center Identity ("Gorakhpur Skill Tech Institute") + Code Badge (`HS-UP-101` in monospace).
* **Right:** 
  * Live Prepaid Wallet Widget: `bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 flex items-center gap-2`
  * Balance Display: `Wallet: ₹5,200` (Monospace text)
  * Action: `+ Top-Up` (Opens dynamic payment modal with corporate UPI QR code, bank IFSC, and UTR input field).
  * Director Profile Avatar and Logout Icon.

### 5.2. Side Navigation Sidebar (Google Workspace Density)
* Width: `240px` | Border-Right: `1px solid #E2E8F0`
* Menu Items:
  1. `📊 Dashboard / Overview`
  2. `🏢 My Center Profile`
  3. `📁 Upload Center Documents` (Lease agreements, director KYC, center photos)
  4. `📝 New Student Admission`
  5. `⏳ Applied Students Queue` (Badge counter: `8 New`)
  6. `👥 Registered Students Directory`
  7. `✍️ Theory & Practical Marks Entry`
  8. `🪪 Student ID Cards Generator`
  9. `🎫 Exam Admit Cards / Hall Tickets`
  10. `📜 Print Marksheets & Certificates`
  11. `💳 Wallet Ledger & Passbook`
  12. `🔒 Security & Password Update`
  13. `🚪 Logout`

### 5.3. Dashboard Main Workspace
* **Metric Cards (Row of 4):**
  1. Total Enrolled Students: `142`
  2. Applied Students (Awaiting Center Accept): `08`
  3. Marks Pending Admin Verification: `14`
  4. Certified Students: `120`
* **Split Action Section:**
  * **Left Card: New Student Admission Form:**
    * Inputs: Name, Father's Name, Mother's Name, DOB, Gender, Course Selection (e.g., `ADCA - Fee ₹250`).
    * Photo Upload: Dashed drag-and-drop zone (`1.5px dashed #CBD5E1`).
    * Submit: `Submit to Applied Queue` (Explicit notice: *"Zero wallet deduction at this stage"*).
  * **Right Card: Live Wallet Passbook (Recent Ledger):**
    * Debit/Credit transaction table displaying date, description, student roll number, deduction amount, and closing balance.
* **Master Queue Management Table:**
  * Tabs: `[Applied Students (8)]` | `[Registered Students (14)]` | `[Certified Students (120)]`
  * Row Action for Applied Student:
    * `Accept (Debit ₹200)`: System checks wallet; if sufficient, auto-debits ₹200, generates sequential roll number, moves to Registered tab. If balance insufficient, triggers top-up modal.
    * `Reject`: Moves student to Rejected queue; zero wallet funds deducted.

### 5.4. Marks Entry & Answer-Sheet Module (`/center/marks-entry`)
* Center locates student row and clicks `Enter Marks`.
* Pop-up Modal displays curriculum subjects with inputs for Theory Obtained and Practical Obtained.
* Calculates total, percentage, and division in real time.
* Center submits score to Super Admin; status flags to `Pending Verification`.

### 5.5. Password Recovery & Security Flow (`/center/forgot-password`)
* Input: Registered Center Code and Director Email.
* Issues OTP/Reset Link to registered mobile/email.
* *Enforced Business Rule:* Newly configured password remains readable in plaintext inside the Super Admin Console for recovery and audit.

---

## 6. SUPER ADMIN CONSOLE ARCHITECTURE (`/admin`)

### 6.1. Master Network Dashboard (`/admin/dashboard`)
* Overview Metrics: Total Authorized Franchises, Total Active Students, Aggregate Franchise Wallet Reserves (Institutional Liability), Total Unaudited Exam Results.
* Financial Ledger: Real-time split between Direct Admission Collections and Center Wallet Top-up Deposits.

### 6.2. Marks Audit & Verification Room (`/admin/audit-results`)
*Business Context: Super Admin retains absolute oversight over center-submitted scores before certification.*
* Table Columns: `Student Profile`, `Center Identifier`, `Course & Trade`, `Theory Marks (Inline Editable)`, `Practical Marks (Inline Editable)`, `Percentage`, `Audit Actions`.
* Admin Control:
  * Admin can directly alter inflated theory or practical numbers inside editable input fields.
  * Trigger 1: `Approve & Issue Certificate` (Green button; updates status to `Certified` and unlocks public verification and download).
  * Trigger 2: `Reject / Send Back to Center` (Red button; reverts status to center with revision notes).

### 6.3. Franchise Credentials & Security Directory (`/admin/centers`)
* Table Columns: `Center Code`, `Center Name`, `Director`, `Mobile`, `Wallet Balance`, `Plaintext Password`, `Controls`.
* Password Display Rule: Passwords rendered as readable plaintext inside monospace chips (e.g., `<span class="font-mono bg-slate-100 px-2 py-0.5">gorakhpur@admin2026</span>`).
* Direct Switch: `Login as Center` button allows admin to open any franchise portal in impersonation mode without entering credentials.

### 6.4. Franchise Lead Pipeline (`/admin/franchise-leads`)
* Tracks candidate inquiries: Applicant Name, Institution Title, Pincode, Computer Count, and Application Status (`New`, `Under Review`, `Approved & Onboarded`).

### 6.5. Curriculum & Wallet Fee Configurator (`/admin/courses-config`)
* Course management interface to add/edit programs, define 1-Year vs. 2-Year structures, and set per-course auto-debit fees (e.g., DCA = ₹200; Paramedical = ₹500).

### 6.6. Wallet Deposit Approvals (`/admin/wallet-approvals`)
* Queue of offline center deposits showing Center Code, Deposit Amount, Bank Receipt, and UTR Reference, with one-click `Credit Funds to Wallet` action.

---

## 7. SUB-ADMIN (STAFF) PORTAL (`/staff`)
*Role Context: Regional staff handling operations with complete redaction of corporate financials.*
* **Accessible Modules:** Student Document Verification, Franchise Profile Scrutiny, Examination Schedule Checks.
* **Strict Blacklist (Hidden from Staff):** Platform Revenue totals, Aggregate Wallet Reserve figures, Corporate Banking Passbook, and System Profit/Loss data.

---

## 8. PRINTABLE ASSETS & PDF ENGINE SPECIFICATIONS (CSS `@media print`)

### 8.1. Official Marksheet Layout (A4 Portrait - `210mm x 297mm`)
* **Container:** Fixed `210mm` width, `15mm` padding, clean white canvas.
* **Header Section:**
  * Institution Name: **HANSORA SKILLS PRIVATE LIMITED** (`22px font-bold text-slate-900`)
  * Affiliation Subtitle: "(An Autonomous National Board for Vocational, IT & Paramedical Education)"
  * Registered corporate office, website, email, official logo on left, barcode on right.
* **Candidate Information Matrix (`border: 1px solid #CBD5E1`, padding: `10px`, 2 columns):**
  * `Enrollment No: HS/2026/0142` | `Roll No: 26101001`
  * `Candidate Name: AMIT KUMAR` | `Center Code: HS-UP-101`
  * `Father's Name : RAMAKANT KUMAR` | `Center Name: GORAKHPUR SKILL TECH INSTITUTE`
  * `Course Title  : ADVANCE DIPLOMA IN COMPUTER APPLICATIONS (ADCA - 1 YEAR)`
* **Subject Score Matrix:**
  * Border: `1px solid #94A3B8`
  * Columns: `Subject Title`, `Max (Th)`, `Max (Pr)`, `Obt (Th)`, `Obt (Pr)`, `Subject Total`
  * Grand Total: `275 / 300` | Percentage: `91.67%` | Grade: `A+ (Distinction)`
* **Validation & Security Block:**
  * Bottom-Left: Dynamic Verification QR Code (`70px x 70px`, scans directly to `https://hansoraskills.com/verify?roll=26101001`).
  * Bottom-Center: Corporate Gold Embossed Seal placeholder.
  * Bottom-Right: Authorized Signatures of `Controller of Examinations` and `Director`.
* **Provisional Rule:** If result status is unapproved, injects diagonal background watermark: `"PROVISIONAL / PREVIEW - NOT VALID FOR EMPLOYMENT"` (`opacity: 0.12, color: #DC2626`).

### 8.2. Official Diploma Certificate Layout (A4 Landscape - `297mm x 210mm`)
* **Container:** Fixed `297mm` width, `210mm` height, `12mm` padding.
* **Border:** Dual-layer security Guilloche frame with Navy Blue (`#0F172A`) and Gold (`#D97706`) accents.
* **Watermark:** Centered Hansora Skills corporate crest at 5% opacity.
* **Certificate Script:**
  * Brand: **HANSORA SKILLS** (`26px font-serif font-bold tracking-wide`)
  * Title: **DIPLOMA CERTIFICATE** (`20px font-serif tracking-widest text-blue-900`)
  * Accreditation Statement:
    > "This is to certify that **AMIT KUMAR**, Son of **RAMAKANT KUMAR**, Roll Number **26101001**, Enrollment Number **HS/2026/0142**, has successfully completed the program in **ADVANCE DIPLOMA IN COMPUTER APPLICATIONS (ADCA - 1 YEAR)** at authorized center **GORAKHPUR SKILL TECH INSTITUTE (HS-UP-101)** and has been awarded Grade **A+ (Distinction)** in the examination held in **February 2026**."
* **Footer Security:** Bottom-left dynamic validation QR code, bottom-center official seal, and bottom-right signature seals of the Examination Controller and Director.

---

## 9. PRINT CSS DIRECTIVES (`src/index.css`)

```css
@media print {
  /* Strip all web UI, navigation, and interactive elements */
  nav, footer, .no-print, .role-switcher, button, .sidebar, input, select {
    display: none !important;
  }

  body {
    background: #ffffff !important;
    color: #000000 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Marksheet (A4 Portrait) */
  .marksheet-print-container {
    width: 210mm !important;
    min-height: 297mm !important;
    padding: 15mm !important;
    margin: 0 auto !important;
    page-break-after: always;
    box-shadow: none !important;
    border: none !important;
  }

  /* Certificate (A4 Landscape) */
  .certificate-print-container {
    width: 297mm !important;
    height: 210mm !important;
    padding: 12mm !important;
    margin: 0 auto !important;
    page-break-after: always;
    box-shadow: none !important;
    border: none !important;
  }
}