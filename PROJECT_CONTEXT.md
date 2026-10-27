# BNB Enterprises: Project Context

Paste this file into any AI tool or give it to a developer to continue the work.

## 1. Business

- **Company:** BNB Enterprises, a rooftop solar EPC vendor (survey → install → net-metering → subsidy).
- **Region:** All 33 districts of **Chhattisgarh, India**. Head office is assumed to be **Raipur** (not yet confirmed).
- **DISCOM:** CSPDCL (Chhattisgarh State Power Distribution Co.), which handles feasibility, net meter and inspection.
- **Customers:** Residential (main), plus shops, rice mills and steel units, schools/hospitals, housing colonies.
- **Subsidy:**
  - Central, PM Surya Ghar Muft Bijli Yojana: ₹30,000/kW for the first 2 kW, capped at **₹78,000 for 3 kW+**. Residential only.
  - Chhattisgarh state top-up: **"up to ₹30,000"**. The exact slabs are unconfirmed; sources say either ₹15k (1 kW) / ₹30k (2 kW+) or ₹10k/kW up to 3 kW.
  - Combined: **up to ₹1,08,000**.
  - Vendor may need to be CSPDCL-empanelled (unconfirmed).
- **How the vendor makes money:** installation margin per kW, commercial projects, AMC contracts, referrals.
- **Pain points the software solves:** leads lost without follow-up, subsidy/net-meter delays, pending customer payments (material is paid upfront), field-staff tracking.
- **Language/tone:** Customer-facing copy is in **Hinglish** (Hindi in Roman script, mixed with English). The owner communicates in Hindi/Hinglish.

## 2. Tech stack

- **Next.js 16.4 (App Router, Turbopack), React 19, TypeScript**, no Tailwind (plain CSS).
- `next.config.ts` has **`cacheComponents: true`** and `partialPrefetching: true`. Consequences:
  - Pages that read runtime-changing data must `await connection()` (from `next/server`) **inside a component wrapped in `<Suspense>`**. See `src/app/admin/page.tsx`.
  - Avoid `new Date()` / `Date.now()` in server components. Use the fixed `TODAY` constant from `src/lib/data.ts`.
  - `PageProps` / `LayoutProps` are global type helpers.
- This Next version has breaking changes. Read `node_modules/next/dist/docs/` before using unfamiliar APIs (see `AGENTS.md`).
- Fonts via `next/font/google`: **Bricolage Grotesque** (display, `--font-display`) and **Hind** (body, `--font-body`, includes Devanagari).
- **No database yet.** Dummy data lives in `src/lib/data.ts`. Leads use an in-memory store (`src/lib/store.ts`, on `globalThis`), which **resets on server restart**.
- **No auth yet.** `/admin` is open to anyone with the link.

Run it:

```
cd C:\Users\Asus\bnb-enterprises
npm run dev     # http://localhost:3000  and  /admin
npm run build   # production build check
```

## 3. File map

```
src/
  app/
    layout.tsx               root: fonts, metadata (SEO title mentions Raipur & Chhattisgarh)
    globals.css              design tokens (:root vars), .btn, .eyebrow, .logo
    (site)/                  PUBLIC WEBSITE (route group, URL "/")
      layout.tsx             imports site.css
      page.tsx               landing page: all sections
      site.css               landing styles + hero scene animations
    admin/                   ADMIN PANEL
      layout.tsx             sidebar + main, imports admin.css, noindex
      admin.css
      page.tsx               Dashboard
      leads/page.tsx         Leads (server shell → LeadsTable client)
      projects/page.tsx      Projects & Subsidy tracker
      staff/page.tsx         Staff
      accounts/page.tsx      Accounts
    api/leads/route.ts       POST create lead (validates name + 10-digit Indian mobile + city), PATCH status
  components/
    Logo.tsx                 SVG logo (sun + panel + leaf)
    site/Header.tsx          sticky nav, mobile menu (client)
    site/HeroScene.tsx       animated SVG: house with rooftop panels, rotating sun rays, energy flow, swaying trees, floating leaves
    site/Calculator.tsx      savings calculator (client)
    site/LeadForm.tsx        "Book Free Survey" form → POST /api/leads (client)
    site/Effects.tsx         RevealOnScroll (adds .in to .fade), CountUp
    admin/Sidebar.tsx        nav with active state (client)
    admin/ui.tsx             Pill/LeadPill/AttendancePill, PageHead, Kpi, Card, BarChart (hover tooltip + table view), HBars
    admin/LeadsTable.tsx     filters (status tabs, search, source, district, staff), inline status change, call/WhatsApp, "New lead" modal
  lib/
    data.ts                  ALL dummy data + types + constants
    store.ts                 in-memory leads: getLeads, addLead (round-robin assigns sales execs), updateLeadStatus
    format.ts                inr(), inrShort() (₹23.1 L / ₹1.2 Cr), shortDate()
legacy/index.html            original single-file HTML version (reference only)
```

## 4. Design system (solar theme)

- **Concept:** night-sky navy with a photovoltaic-cell grid pattern, sun amber accents, eco green.
- **Tokens** (`globals.css`):
  - `--night #0b1a2e`, `--cell-line #1f3d66`
  - `--sun #ffb21a`, `--sun-deep #f07b0e`, `--sun-text #b45309` (amber that passes contrast on light backgrounds)
  - `--leaf #2fbf71`, `--leaf-deep #16955a`
  - `--paper #fbf8f1` (page background), `--ink #10202f`, `--muted #5b6b7a`, `--line #e6dfcf`
  - Status: `--good`, `--warn`, `--bad`, `--info`, `--neutral`, each with a `-bg` variant
- **Rules:**
  - Status pills always show text plus color.
  - Charts are single-series. Bars have 4px rounded ends and a hover tooltip.
  - Respect `prefers-reduced-motion`.
  - Mobile-first breakpoints are 960px and 560px for the site, 1100px and 800px for admin.
- **Landing sections, in order:** Header → Hero (headline "Bijli ka bill zero karo, sooraj se kamao", HeroScene, eco chip "140+ ped", subsidy card) → Savings Calculator → Services (Residential, Commercial, Hybrid/Off-grid, AMC) → Service Area (33 district chips) → How it works (5 steps) → Why Us → Request Demo / Free Survey form → FAQ → Footer → floating WhatsApp button.

## 5. Data model (`src/lib/data.ts`)

- `DISTRICTS`: 33 Chhattisgarh districts. The first 8 are highlighted as hubs.
- `Lead`: id, name, phone, city (= district), type, bill, kw, source, status, assignedTo, createdAt, nextFollowUp, notes.
  - `LEAD_STATUSES`: New → Contacted → Survey Scheduled → Quotation Sent → Negotiation → Won / Lost.
  - `LEAD_SOURCES`: Website, Facebook, Google, Referral, Walk-in, IndiaMART.
- `Staff`: role (Manager / Sales Executive / Site Surveyor / Installer / Technician / Accounts), base, attendance (Present / On Field / Absent / Leave), leadsAssigned, conversions, salary, incentive.
- `Project`: kw, segment, value, subsidy (central), stateSubsidy (CG), paid, materialCost, labourCost, otherCost, stage, stageSince, installer, bookedOn.
  - `PROJECT_STAGES` (8): Booked → Portal Registered → CSPDCL Feasibility → Material Dispatched → Installed → Net Meter → Inspection → Subsidy Credited.
  - A project is "stuck" if it has been in its stage for more than 14 days.
- `Expense`: category (Material / Labour / Transport / Salary / Office / Marketing), amount, optional project.
- `monthlyRevenue`: 6 months, with revenue and install count.
- Helpers: `projectProfit(p)`, `daysBetween(from, to = TODAY)`.
- `TODAY = "2026-10-27"`.

## 6. Calculator assumptions (`Calculator.tsx`)

- Tariff ~₹6/unit (CSPDCL domestic average); generation 125 units per kW per month.
- Cost: ₹60,000/kW for homes, ₹46,000/kW for business.
- kW = bill ÷ tariff ÷ 125, rounded up to the nearest 0.5 kW (minimum 1 kW).
- Subsidy (home only) = central + state. State: ₹15k if under 2 kW, otherwise ₹30k.
- Shows yearly savings, net cost and payback period.

## 7. What is done

- Public landing page with the full solar theme, animated hero, calculator, service-area section, lead form wired to the API.
- Admin panel:
  - **Dashboard:** KPIs (leads this month, conversion, revenue vs last month, pending payment, pending subsidy), revenue chart, lead pipeline, today's/overdue follow-ups, stuck projects, staff attendance, leads by district, lead sources, pending payments.
  - **Leads:** filters, inline status change, call/WhatsApp links, add-lead modal.
  - **Projects:** 8-stage tracker per project, projects by stage, subsidy process steps.
  - **Staff:** team table, attendance, payroll, conversion performance.
  - **Accounts:** order book, received, dues, gross profit, per-project profit and margin, expenses, expenses by category, monthly revenue.
- Build, TypeScript and ESLint all pass.

## 8. Placeholders and open questions for the owner

- Real phone, WhatsApp number (currently `wa.me/919800000000`), email, office address.
- Real stats: "500+ installations" is a placeholder.
- Exact CG state subsidy slabs (check the latest CSPDCL notification).
- Is BNB Enterprises CSPDCL-empanelled / PM Surya Ghar registered? If yes, add a trust badge.
- Is a "48 hrs site survey" promise realistic?
- Logo file, real installation photos (put them in `public/`), panel/inverter brands used.
- The "Add expense" button on Accounts is a non-functional placeholder.

## 9. Roadmap (agreed plan)

| Phase | Module |
|---|---|
| 1 ✅ | Landing page + Request Demo / Free Survey form |
| 2 (next) | **Database** (Supabase or PostgreSQL + Prisma) and **login with roles** (Owner, Manager, Sales, Installer, Accounts). Each role sees only its own work. |
| 2 | Real CRUD for leads, projects, expenses, staff. Lead follow-up reminders. |
| 2 | **Quotation generator** (PDF with subsidy deducted) |
| 2 | Subsidy tracker linked to real project records |
| 3 | Staff attendance via mobile (GPS check-in), task assignment, incentive calculation |
| 3 | Payments/installments, GST invoices, profit per project from real entries |
| 3 | Inventory (panels, inverters, structure, cables), supplier purchases |
| 3 | AMC / service tickets |
| 3 | WhatsApp/SMS alerts (new lead to owner, status updates to customer) |
| Later | More public pages: About, Projects gallery, Contact, blog/SEO pages per district |

## 10. Conventions for whoever continues

- Match the existing code style: TypeScript, function components, server components by default, `"use client"` only for interactive parts, plain CSS with the tokens above.
- Keep customer copy in Hinglish. Keep admin labels short, in English or Hinglish.
- Indian number formatting via `inr()` / `inrShort()`. Phone format: 10 digits starting with 6–9.
- Don't add fake government affiliations or claims without the owner's confirmation.
