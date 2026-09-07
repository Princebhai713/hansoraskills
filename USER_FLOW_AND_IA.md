Markdown
# USER FLOW & INFORMATION ARCHITECTURE (IA)

**Project Name:** Hansora Skills Portal  
**Platform:** Multi-Tier Web Application  
**Coverage:** Public Visitors, Authorized Study Centers, Super Admin, and Sub-Admin Staff

---

## 1. INFORMATION ARCHITECTURE (SITEMAP & ROUTE TREE)

Root (/)
│
├── PUBLIC ROUTES
│   ├── / ............................ Hero, Live Result Verifier, Value Props, Franchise CTA
│   ├── /courses ..................... 350+ Categorical Course Explorer (Filter by Category/Duration)
│   ├── /centers ..................... Interactive Center Locator (State & District Dual Filter)
│   ├── /franchise/apply ............. New Center Application Form (Infrastructure Intake)
│   ├── /verify ...................... Dedicated Verification Page (Direct Roll No. Lookup)
│   └── /login ....................... Unified Authentication Gateway (Role Switcher)
│
├── STUDY CENTER PORTAL (/center)
│   ├── /center/dashboard ............ Live Wallet Card, Quick Stats, Inbound Alerts
│   ├── /center/admissions ........... New Student Admission Engine (Smart 2-Column Form)
│   ├── /center/students
│   │   ├── ?tab=applied ............. Pending Acceptance Queue (Accept & Auto-Debit / Reject)
│   │   ├── ?tab=registered .......... Active Candidates (ID Cards & Admit Cards Queue)
│   │   └── ?tab=certified ........... Certified Students (Final Marksheet/Diploma Downloads)
│   ├── /center/marks-entry .......... Theory & Practical Score Entry Dialogs
│   ├── /center/wallet ............... Passbook Ledger, Transaction History, Dynamic QR Top-up
│   └── /center/settings ............. Center Profile, Notice Board, Password Update
│
└── SUPER ADMIN CONSOLE (/admin)
├── /admin/dashboard ............. Network-wide Metrics, Total Wallet Reserves, Revenue
├── /admin/audit-results ......... Pending Result Queue (Review, Modify Marks, Final Approve)
├── /admin/centers ............... Franchise Credentials Table (Plaintext Passwords, Status)
├── /admin/leads ................. Franchise Territory Requests (Review & Convert)
├── /admin/courses ............... Dynamic Course Fee Configuration & Syllabus Manager
└── /admin/finance ............... System-wide Audit Logs and Wallet Recharge Approvals


---

## 2. DETAILED STEP-BY-STEP USER FLOWS

### FLOW 1: Franchise Registration, Student Admission & Auto-Debit Flow

[Study Center Login]
│
▼
[Check Dashboard Wallet] ───────(Balance < Course Fee)───────► [Open Dynamic QR Recharge Modal]
│                                                                   │
│ (Balance Sufficient)                                              ▼
▼                                                     [Enter UTR & Submit to Admin]
[Open "New Admission" Form]                                                 │
│                                                                   ▼
├─ Enter Name, Father's Name, DOB, Photo                    [Admin Approves Deposit]
└─ Select Course (e.g., ADCA, Fee: ₹200)                            │
│                                                                   │
▼                                                                   │
[Submit Form]                                                               │
│                                                                   │
▼                                                                   │
(Student placed in "Applied" Queue) ◄───────────────────────────────────────┘
│
▼
[Center clicks "Accept Student"]
│
├─► System debits course fee (₹200) from Wallet
├─► Transaction recorded in immutable ledger
├─► Sequential Roll Number generated (e.g., 26101001)
└─► Student status updated to: "Accepted"
│
▼
[Unlock Tools: Generate Student ID Card & Admit Card]


---

### FLOW 2: Examination, Marks Entry & Two-Tier Admin Approval

[Offline/Online Exam Administered]
│
▼
[Center opens "Marks Entry" Modal]
│
├─ 1-Year Course: Input Theory Obtained + Practical Obtained
└─ 2-Year Course: Input Subject-wise Scores across Semesters
│
▼
[System calculates: Total, Percentage, and Auto-Grade]
│
▼
[Center clicks "Submit for Certification"]
│
▼
(Student status flagged as: "Pending Admin Verification")
(Marksheet & Certificate downloads REMAIN LOCKED)
│
▼
[Super Admin opens "Result Audit Queue"]
│
├─ Admin inspects scores against benchmarks
│
├──► [Scores Suspicious/Faulty] ──► [Admin edits scores directly / Clicks "Reject"]
│                                                     │
└──► [Scores Validated]                               ▼
│                               (Returned to Center for re-entry)
▼
[Admin clicks "Approve & Issue Certificate"]
│
▼
(Status changes to: "Certified")
(Verification link activated on public gateway)
│
▼
[Download Unlocked on Center Portal & Student Portal]
├─ Official Marksheet (A4 Portrait with QR)
└─ Official Diploma Certificate (A4 Landscape with Guilloche Border & QR)


---

### FLOW 3: Public Instant Verification Flow (Student & Third-Party Employers)

[User visits Homepage or scans Certificate QR Code]
│
▼
[Enters Roll Number (e.g., 26101001) + DOB]
│
▼
[Clicks "Verify Academic Record"]
│
├──► [Record Not Found / Unapproved]
│           │
│           ▼
│    Show Warning: "No authentic record found or pending approval"
│
└──► [Record Approved & Genuine]
│
▼
[Open Verified Modal Preview]
├─ Student Photograph & Center Identifier
├─ Course Name, Duration & Completion Date
├─ Subject-wise Marks & Official Grade Badge
├─ Cryptographic Verification Seal
└─ Direct "Download Authentic PDF" Trigger


---

### FLOW 4: Franchise Locator & Territory Exclusivity Flow

[User visits Study Centers Section]
│
▼
[Selects State (e.g., Uttar Pradesh)] ──► Auto-populates District Dropdown
│
▼
[Selects District (e.g., Gorakhpur)]
│
▼
[System queries Centers matching Region]
│
▼
[Displays Official Center Cards]
├─ Center Code (e.g., HS-UP-101)
├─ Institution Name & Director Name
├─ Complete Physical Address & Pin Code
└─ Verified Center Badge


---

## 3. ROLE-BASED ACCESS CONTROL (RBAC) LOGIC

| Capability / Route | Public Visitor | Study Center | Sub-Admin Staff | Super Admin |
| :--- | :---: | :---: | :---: | :---: |
| View Landing Page & Course Explorer | Yes | Yes | Yes | Yes |
| Run Public Result Verification (QR) | Yes | Yes | Yes | Yes |
| Apply for Franchise Lead | Yes | No | No | No |
| Access Prepaid Wallet & Add Balance | No | Yes (Own Center) | No | Yes (All Centers) |
| Enroll Student & Deduct Course Fee | No | Yes (Own Center) | No | Yes (Any Center) |
| Input Theory & Practical Scores | No | Yes (Own Center) | No | Yes (Audit Override) |
| Approve Marks & Unlock Certificates | No | No | No | **Yes (Master Switch)** |
| View Franchise Plaintext Passwords | No | No | No | **Yes** |
| Access All-India Financial Totals | No | No | No | **Yes** |