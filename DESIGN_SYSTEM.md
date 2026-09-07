Markdown
# UI/UX DESIGN SYSTEM & STYLING GUIDE

**Project Title:** Hansora Skills Portal  
**Design Standard:** 2026 Enterprise SaaS (Clean, Fast, High-Density, Data-First)  
**CSS Framework:** Tailwind CSS (Utility-First)  
**Target Resolution:** Desktop (1440x900 default), Tablet (768px), Mobile (375px)

---

## 1. COLOR PALETTE & TOKEN SPECIFICATIONS

+-------------------------------------------------------------------------------+
| Brand Primary: Slate 900 (#0F172A)    | Brand Secondary: Slate 800 (#1E293B)  |
| Accent / CTA: Blue 600 (#2563EB)      | Accent Hover: Blue 700 (#1D4ED8)      |
| Wallet / Success: Emerald 600 (#059669)| Warning / Pending: Amber 500 (#F59E0B) |
| Danger / Reject: Rose 600 (#E11D48)   | Border Subdued: Slate 200 (#E2E8F0)   |
| Canvas Background: Slate 50 (#F8FAFC) | Card Background: Pure White (#FFFFFF) |
+-------------------------------------------------------------------------------+


### 1.1. Core Tailwind Class Mapping
- **Canvas Background:** `bg-slate-50 text-slate-900`
- **Surface / Card Background:** `bg-white border border-slate-200/80 shadow-sm`
- **Brand Accents:**
  - Primary Action: `bg-blue-600 hover:bg-blue-700 text-white font-medium`
  - Secondary Action: `bg-white border border-slate-300 hover:bg-slate-50 text-slate-700`
  - Destructive Action: `bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100`
- **Operational Status Indicators (Pills/Badges):**
  - Applied (Zero Debit): `bg-slate-100 text-slate-700 border border-slate-200`
  - Accepted (Fee Debited): `bg-blue-50 text-blue-700 border border-blue-200`
  - Pending Admin Approval: `bg-amber-50 text-amber-700 border border-amber-200`
  - Certified (Official Issued): `bg-emerald-50 text-emerald-700 border border-emerald-200`
  - Rejected: `bg-rose-50 text-rose-700 border border-rose-200`

---

## 2. TYPOGRAPHY & SCALE RULES

The system relies on clean sans-serif typography (`Inter`, `Plus Jakarta Sans`, or `system-ui`).

- **Display / Hero Titles:** `text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900`
- **Section Headers:** `text-xl sm:text-2xl font-bold tracking-tight text-slate-900`
- **Card Titles & Group Headers:** `text-base font-semibold text-slate-800`
- **Standard Body:** `text-sm font-normal text-slate-600 leading-relaxed`
- **Data Table Cells:** `text-sm font-medium text-slate-700`
- **Subtext / Metadata:** `text-xs font-normal text-slate-400`
- **Monospace Tokens (Roll No, Center Code, Wallet Balances):** `font-mono tracking-wide`

---

## 3. COMPONENT SPECIFICATIONS

### 3.1. Unified Data Table (`<Table />`)
Replaces obsolete HTML tables with a modern, high-density row system:
- **Container:** `overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm`
- **Header:** `bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500 py-3 px-4`
- **Row:** `border-b border-slate-100 hover:bg-slate-50/75 transition-colors`
- **Cell:** `py-3.5 px-4 text-sm text-slate-700 align-middle`

### 3.2. Wallet Balance Indicator (`<WalletCard />`)
Prominent card featured at the top of the Study Center view:
- **Style:** `rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 via-white to-white p-4 shadow-sm`
- **Balance Callout:** `text-2xl font-extrabold font-mono text-emerald-700`
- **Action Trigger:** Quick button (`+ Top-Up`) opening dynamic payment/QR modal.

### 3.3. Standard Input & Form Elements
- **Input Fields:** `w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`
- **Select Dropdowns:** `rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500`

---

## 4. PRINT STYLES & CERTIFICATE ENGINE GUIDELINES

Official certificates and marksheets must render perfectly when printed or converted to PDF.

### 4.1. Print Stylesheet Directives (`index.css`)
```css
@media print {
  body {
    background: #ffffff !important;
    color: #000000 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Strip all platform navigation and toolbars */
  nav, footer, .no-print, .role-switcher, button {
    display: none !important;
  }

  /* Force exact print layout bounds */
  .marksheet-page {
    width: 210mm !important;
    min-height: 297mm !important;
    padding: 15mm !important;
    page-break-after: always;
    box-shadow: none !important;
    border: none !important;
  }

  .certificate-page {
    width: 297mm !important;
    height: 210mm !important;
    padding: 12mm !important;
    page-break-after: always;
    box-shadow: none !important;
    border: none !important;
  }
}
4.2. Diploma Certificate Aesthetics
Guilloche Border: Dual-line decorative SVG border frame with navy/gold gradients.

Center Watermark: SVG/PNG seal placed absolute center (opacity-5 pointer-events-none select-none).

Dynamic Security QR Code:

Dimensions: 80px x 80px.

Position: Bottom-left margin.

Value: Direct validation URL resolving to verification modal.

Signatures & Seal:

High-resolution SVG placeholders for "Controller of Examinations" and "Authorized Signatory / Director".


---

अब इस सेट की अंतिम दो फाइल्स बचती हैं:
1. **`MOCK_DATA.json`** — पूरा डमी डेटाबेस (गोरखपुर/कुशीनगर सेंटर्स, 10+ कोर्सेज, 5+ छात्र अलग-अलग स्टेटस के साथ)।
2. **`.cursorrules`** — AI कोडिंग एजेंट के लिए मास्टर रूल्स ताकि वह एक बार में सही कोड लिखे।

क्या **`MOCK_DATA.json`** जनरेट करें?