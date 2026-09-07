# PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Project Title:** Hansora Skills Portal (Multi-Tier Vocational & Franchise Management System)  
**Target Organization:** Hansora Skills Private Limited  
**Target Domains:** `hansoraskills.com` / `hansora.com`  
**Tech Stack:** React (Vite) + Tailwind CSS + Lucide Icons + React-PDF / HTML2Canvas  
**Scope of Operation:** All-India Operations (Pan-India Multi-Center Network)

---

## 1. PROJECT OBJECTIVE & BUSINESS CONTEXT

The goal of this platform is to build an all-India multi-tier franchise management and academic operating system for Hansora Skills Pvt. Ltd. It handles vocational, computer, and health science training across nationwide authorized study centers.

The system replaces legacy, obsolete portals (reference models: NBCE, Shaheed Bhagat Singh Health & Education, Digify) with a modern, high-speed, secure web platform supporting 150–350+ courses, pre-funded center wallets, batch admissions, manual/online examinations, strict two-step result verification, automated certificate and marksheet generation, and public digital validation.

---

## 2. USER ROLES & ACCESS CONTROL MATRIX

### 2.1. Super Admin (Master Owner)
- Full visibility and control across entire database, all franchises, transactions, courses, and operational parameters.
- Review and approve new franchise applications; generate unique Center Codes (e.g., `HS-UP-101`) and default credentials.
- **Center Password Visibility Rule:** In the admin console, franchise passwords must be visible as plain readable text (not masked with dots or hashes) so the master admin can troubleshoot or log in on behalf of any center without resetting their credentials.
- **Marks Auditing & Override Rule:** 
  - Complete control to edit, correct, or reject theory and practical marks submitted by centers.
  - No certificate or marksheet can be downloaded until Super Admin marks the result as `Approved`.
- Financial intelligence view: All-center wallet deposits, admission revenue, ledger statements, and platform balance.

### 2.2. Sub-Admin (Staff / Regional Managers)
- State- or trade-wise segmented access (e.g., UP, UK, Bihar, Jharkhand).
- Functional roles: Student record verification, document scrutiny, franchise initial screening.
- **Financial Restriction:** System-wide financial metrics (aggregate wallet reserves, platform profit/loss, corporate bank figures) are completely hidden.

### 2.3. Center / Franchise Login (Study Center Portal)
- Dedicated dashboard authenticated by unique Center Code and Password.
- **Prepaid Wallet Ledger:** Displays live balance; maintains auto-debit triggers for student admissions.
- **Student Enrollment Engine:** Detailed registration (student details, guardian name, date of birth, photo upload, course selection).
- **Applied vs. Accepted Flow:**
  - Form submission moves student to `Applied` queue with zero deduction.
  - When center clicks `Accept`, course fee (e.g., ₹200–₹500) auto-debits from wallet.
  - Dropout or absconding students can be marked `Rejected` without loss of center wallet funds.
- **Print Utility:** One-click generation of student ID cards and examination Hall Tickets/Admit Cards.
- **Marks Upload:** Submission of internal/external theory and practical scores.
- **Certificate Issuance:** Download and print original marksheets and diploma certificates only after Super Admin approval.

### 2.4. Student Portal & Public User
- **Public Instant Verification:** Clean home-screen widget accepting Registration Number / Roll Number and Date of Birth to display genuine verifiable digital marksheets.
- Download Admit Cards and Identity Cards.
- Online exam/mock test interface access.
- Study Center Locator tool by State and District.

### 2.5. SEO & Marketing Access (Technical Provision)
- Clean repository structure and decoupled metadata files (`robots.txt`, open graph tags, JSON-LD schemas, sitemap generators) enabling marketing team edits without touching core business logic.

---

## 3. CORE BUSINESS LOGIC & WORKFLOWS

### 3.1. Wallet & Auto-Debit Mechanism
1. Franchise dashboard displays real-time wallet balance (`₹X,XXX`) with quick `+ Recharge Wallet` option.
2. Centers recharge via integrated Razorpay gateway or corporate dynamic UPI QR. For manual QR payments, center inputs UTR reference for instant admin validation.
3. **Dynamic Fee Structure:** 
   - Course fees are dynamically configurable per course (e.g., 6-Month DCA = ₹200; 1-Year Paramedical = ₹500).
4. **Debit Trigger:** Wallet deduction happens **only** upon executing `Accept Student` or processing for examination, never upon basic enrollment form saving.
5. If wallet balance is lower than the required course fee, system blocks `Accept` action and prompts an instant recharge modal.
6. Full transactional ledger logging: Date, Student Roll Number, Course Code, Transaction Type (Debit/Credit), and Closing Balance.

### 3.2. Course Management & Multi-Year Evaluation
- Course registry spanning Computer Education, Vocational Crafts, Paramedical/Health Science, Agriculture, Veterinary, and Beauty/Wellness trades.
- **Evaluation Tiers:**
  - **1-Year / Short-Term Courses (<= 12 Months):** Single combined marksheet (Theory + Practical + Total + Percentage + Grade) + 1 Diploma Certificate.
  - **2-Year / Semester Courses (24 Months):** Semester/Year-wise separate marksheets (e.g., Year 1 Marksheet, Year 2 Marksheet) + 1 Final Comprehensive Diploma Certificate.
- Auto-calculation formulas:
  - $\text{Total Marks} = \text{Theory Obtained} + \text{Practical Obtained}$
  - $\text{Percentage} = (\text{Total Marks} / \text{Max Marks}) \times 100$
  - Dynamic Grading: $\ge 85\% \rightarrow \text{A+}$, $75\text{--}84\% \rightarrow \text{A}$, $60\text{--}74\% \rightarrow \text{B}$, $40\text{--}59\% \rightarrow \text{C}$.
- **Back-Dated Generation & Roll Number Continuity Rule:** 
  - Ability to register students with past-dated academic sessions without corrupting the center's sequential roll number ordering algorithm.

### 3.3. Marks Entry & Two-Tier Approval Flow
1. Center enters marks in `MarksEntryModal`.
2. Student result status flags as `Pending Admin Verification`.
3. Marks appear in Super Admin's `Result Audit Queue`.
4. Admin audits marks against submitted copies or institutional criteria:
   - If invalid: Admin directly modifies marks or clicks `Reject Back to Center`.
   - If valid: Admin clicks `Approve & Issue Certificate`.
5. Upon approval, status converts to `Certified`.
6. Center portal and student verification portals unlock full download access for original marksheets and certificates.

---

## 4. FUNCTIONAL MODULE SPECIFICATIONS

### 4.1. Public Landing Page & Center Locator
- **Header:** Brand Logo (Hansora Skills), Courses Directory, Study Centers, Franchise Inquiry, Verify Result, Portal Login CTA (Admin / Center / Student).
- **Public Verification Widget:**
  - Inputs: Roll Number / Reg Number + Date of Birth.
  - Output: Responsive modal showing authentic student details, course, center name, grade badge, and verified digital certificate preview.
- **Interactive Franchise Locator:**
  - Dual dropdown: State -> District (e.g., Uttar Pradesh -> Gorakhpur).
  - Center Cards: Center Name, Center Code, Director, Address, Contact details.
  - **Exclusivity Enforcement:** Pincode search validating franchise territory rules (single center allocation per targeted operational zone).
- **Franchise Application Form:**
  - Institution Name, Director Name, Phone, Email, Infrastructure Details (Computer count, premises area).
  - Submissions route straight into Super Admin's `Franchise Leads` management queue.

### 4.2. Franchise / Study Center Portal
- **Header Overview:** Center Code, Franchise Title, Location, Current Wallet Balance with `Add Funds` trigger.
- **Student Admissions:** 
  - Two-column smart form: Personal details, Guardian details, Photo upload (file dropzone), Course selector.
- **Enrollment Lists:**
  - Tab 1: `Applied Students` (Action: Accept [auto-debits wallet] / Reject).
  - Tab 2: `Accepted / Registered Students` (Action: Generate Admit Card / Generate ID Card).
  - Tab 3: `Completed / Certified Students` (Action: Download Final Certificate / Marksheet).
- **Admit Card & ID Card Generation:**
  - Formatted printable components with student photo, barcode, center code, exam timetable, and reporting instructions.

### 4.3. Super Admin Management Console
- **Analytics Overview:** Total Active Centers, Total Enrolled Students, Total Wallet Balance Across Network, Pending Result Approvals.
- **Center Administration:**
  - Searchable data table: Center Code, Director, Plain Text Password, Wallet Balance, Action (Add Funds, Suspend, Edit).
- **Result Audit Center:**
  - Detailed table of marks submitted by centers.
  - Inline editing fields for Theory and Practical inputs.
  - Primary triggers: `Approve Result`, `Bulk Approve`, `Flag for Correction`.
- **Franchise Leads Viewer:** Track application status, contact candidates, and convert to active centers.

### 4.4. LMS & Examination Engine
- **Video Lecture Directory:** Admin uploads course-specific video modules (streaming URLs, unlisted links) accessible to enrolled students.
- **Exam Module (Dual Engine):**
  - **Offline Center Exam:** Center downloads question papers, administers test physically, feeds marks online.
  - **Online Mock / Term Exam:** Scheduled MCQ tests accessible via student registration number; auto-timer, randomized question pool, and auto-submission scoring.

---

## 5. DOCUMENT & PRINT LAYOUT SPECIFICATIONS

All generated documents must comply with strict physical certification standards using `@media print` rules:

### 5.1. Official Marksheet Layout
- **Header:** Corporate Header ("Hansora Skills Private Limited"), Regd. Office, Trademark/ISO identifiers.
- **Metadata Section:** Student Name, Father's Name, Enrollment Number, Roll Number, Course Name, Center Name & Code.
- **Tabular Data:** Subject Columns (Subject Name, Max Theory, Max Practical, Min Pass, Obtained Theory, Obtained Practical, Total Marks).
- **Summary Footer:** Grand Total, Percentage, Final Grade/Division, Issue Date.
- **Signatures:** Left: Signature of Center Director; Right: Controller of Examinations.
- **Security Elements:** Background watermark, verification URL string, and dynamic QR code resolving to public verification URL.

### 5.2. Diploma Certificate Layout
- **Dimensions:** Standard A4 Landscape.
- **Design Elements:** Dual-layer guilloche security border (Gold/Navy Blue styling).
- **Watermark:** Center corporate seal at 6% opacity.
- **Certificate Text:** Standard formal accreditation text confirming candidate completion of the prescribed program.
- **Validation Blocks:**
  - Bottom Left: Dynamic QR Code resolving to `https://hansoraskills.com/verify?roll=XXXXX`.
  - Bottom Center: Official Corporate Embossed Seal / Barcode.
  - Bottom Right: Director & Examination Controller Signatures.
- **Protection Logic:** Before Super Admin approval, any view of this document enforces a prominent diagonal `PROVISIONAL / PREVIEW - NOT VALID` watermark.

---

## 6. DATA DICTIONARY & CORE SCHEMAS

### 6.1. Centers
```typescript
interface Center {
  id: string;
  center_code: string;       // Unique, e.g., "HS-UP-101"
  center_name: string;
  director_name: string;
  phone: string;
  email: string;
  plain_password: string;    // Explicit business requirement for admin recovery
  state: string;
  district: string;
  pincode: string;
  address: string;
  wallet_balance: number;    // In INR
  status: "Active" | "Pending" | "Suspended";
  created_at: string;
}

### 6.2 Courses
interface Course {
  id: string;
  code: string;              // e.g., "DCA", "ADCA", "CHM"
  name: string;
  category: "Computer" | "Vocational" | "Health Science" | "Agriculture" | "Other";
  duration: string;          // e.g., "6 Months", "1 Year", "2 Years"
  tier: "1-Year" | "2-Year"; // Determines marksheet and evaluation structure
  enrollment_fee: number;    // Wallet debit amount, e.g., 200, 500
  subjects: Array<{
    name: string;
    max_theory: number;
    max_practical: number;
    pass_marks: number;
  }>;
}

### 6.3. Students
interface Student {
  id: string;
  reg_no: string;            // e.g., "HS/2026/0142"
  roll_no: string;           // e.g., "26101001"
  center_code: string;       // Foreign key referencing Center
  name: string;
  father_name: string;
  dob: string;               // YYYY-MM-DD
  gender: "Male" | "Female" | "Other";
  course_code: string;
  photo_url: string;
  status: "Applied" | "Accepted" | "Pending Approval" | "Certified" | "Rejected";
  admission_date: string;
  marks?: {
    semester_1?: Array<{ subject: string; theory: number; practical: number }>;
    semester_2?: Array<{ subject: string; theory: number; practical: number }>;
    total_obtained: number;
    max_marks: number;
    percentage: number;
    grade: string;
  };
  is_approved: boolean;
}

### 6.4. Transactions

interface Transaction {
  id: string;
  center_code: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
  description: string;
  timestamp: string;
  balance_after: number;
}

7. NON-FUNCTIONAL REQUIREMENTS & UI PRINCIPLES
Visual Language (2026 SaaS Paradigm):

Palette: Deep Slate (#0F172A, #1E293B), Accent Royal Blue (#2563EB), Emerald Green (#059669), Soft Slate backgrounds (#F8FAFC).

Cards with soft multi-layer drop shadows (shadow-sm, hover:shadow-md) and gentle 12px rounded radii (rounded-xl).

Clean tabular records featuring explicit status pills (e.g., Applied [Gray], Accepted [Blue], Certified [Green]).

Speed & Efficiency:

Lightweight zero-lag bundle via Vite.

Clean modal flows for Marks Entry and Student Registration without full-page reloads.

Print Fidelity:

Print stylesheet eliminating headers, footers, margins, and page URLs.

Crisp vector scaling for barcode and QR code blocks on A4 media.

Client Demo Completeness:

Prototype must contain functional in-memory state allowing live interaction: Adding a student, deducting from wallet, modifying marks, approving from admin view, and previewing the final print-ready certificate.