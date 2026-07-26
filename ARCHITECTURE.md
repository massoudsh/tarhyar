# طرح‌یار — Architectural Resume

**Project:** Luxury Residential Architect Website (Design + Execution Management)
**Product name:** طرح‌یار
**Target market:** High-end domestic Iranian clients  
**Document type:** Architecture + PRD task breakdown

---

## 1. Product vision

A minimal, high-authority website that:

- Positions the architect as a **premium residential specialist**
- Demonstrates capability in **design** and **execution management**
- Builds trust with affluent Iranian clients
- Converts visitors into **consultation requests**

**Positioning:** Credibility and conversion engine, not a portfolio gallery.

**Strategic tone:** Control · Precision · Authority · Calm confidence.  
If the UI becomes flashy, cluttered, or animation-heavy, it fails positioning.

---

## 2. Primary objective & success metrics (MVP)

**Objective:** Convert qualified luxury residential prospects into:

- Consultation requests  
- Direct contact  
- Project discussions  

**MVP success metrics:**

| Metric | Target |
|--------|--------|
| CTA engagement | Clear, measurable |
| Form submission | Working end-to-end |
| Load time | &lt; 2s |
| Mobile | Fully optimized |

---

## 3. Target user persona

**Profile:** Affluent Iranian property owner  

- **Location:** North Tehran, Lavasan, high-end districts  
- **Age:** 35–60  
- **Concerns:** Project risk, budget control, timeline discipline, execution quality, confidentiality  

**Behavior:** Evaluating reliability, not browsing for inspiration.

---

## 4. Core value proposition

> “Bespoke private residences designed and managed with precision from concept to execution.”

**Differentiator:** Design + execution management under one controlled vision.

---

## 5. Scope (MVP) — in scope / out of scope

**In scope:**

- 6 pages: Home, Projects, Project Detail, Services, About, Contact  
- Static content (JSON/Markdown)  
- Consultation form with validation and email integration  
- Client-side project filtering (Built / Concept)  
- No blog, comments, likes, or user accounts  

**Explicitly excluded (MVP):**

- Blog  
- Social features  
- User accounts  
- CMS dashboard (Phase 2 only)  
- Heavy animations (beyond subtle fades)  

**Future phase (not now):** CMS, client login, bilingual support, case study expansion, press section.

---

## 6. System architecture (high level)

```
┌─────────────────────────────────────────────────────────────────┐
│                     ArvanCloud (Container/PaaS)                  │
├─────────────────────────────────────────────────────────────────┤
│  Next.js App Router (SSR/SSG)                                   │
│  ├── Pages: /, /projects, /projects/[slug], /services,           │
│  │          /about, /contact                                     │
│  ├── Design system (Tailwind + tokens)                           │
│  ├── Static data: content/*.json or markdown                      │
│  └── Form: Contact → API route → Email (e.g. Resend/SendGrid)     │
├─────────────────────────────────────────────────────────────────┤
│  Assets: Optimized images (WebP), lazy load, ArvanCloud CDN       │
└─────────────────────────────────────────────────────────────────┘
```

**Data:** Static JSON or Markdown; no database in MVP.  
**Media:** Optimized images; cloud storage optional.  
**Form:** Server-side API route with validation, rate limiting, spam protection.

---

## 7. Technology stack

| Layer | Choice |
|-------|--------|
| Frontend | Next.js (App Router), React, TypeScript |
| Styling | TailwindCSS |
| Motion | Framer Motion (minimal: subtle fades only) |
| Data | Static JSON or Markdown |
| Hosting | ArvanCloud (Docker container via Container/PaaS + CDN) |
| Form/Email | API route + email provider (Resend, SendGrid, etc.) |

---

## 8. Design system requirements

- **Colors:** Warm white background, charcoal text, warm grey sections, one muted accent (olive/bronze).  
- **Typography:** Persian primary, clear hierarchy, large whitespace, minimal bold.  
- **Layout:** 12-column grid, max content width controlled, generous spacing.

---

## 9. Non-functional requirements

| Area | Requirement |
|------|-------------|
| Performance | Lighthouse score &gt; 90; lazy load images; WebP; CDN |
| SEO | Meta tags, Persian content, clean URLs, LocalBusiness schema |
| Accessibility | Contrast, semantic HTML, keyboard accessible |
| Security | Form spam protection, rate limiting on form API |

---

## 10. PRD task breakdown (full)

Tasks are grouped by **page/feature** and by **milestone**. Each item is testable and traceable to the PRD.

---

### 10.1 Home page

| ID | Task | Requirement ref |
|----|------|------------------|
| H1 | Hero: full-width image, brand statement, single CTA button | 8.1 Hero |
| H2 | Services summary: Design, Technical Development, Execution Management | 8.1 Services Summary |
| H3 | Featured projects: max 6, grid layout | 8.1 Featured Projects |
| H4 | Authority block: years of experience, number of built projects | 8.1 Authority Block |
| H5 | CTA section: “درخواست جلسه مشاوره” with link/scroll to contact | 8.1 CTA Section |

---

### 10.2 Projects page

| ID | Task | Requirement ref |
|----|------|------------------|
| P1 | Grid layout for all projects | 8.2 |
| P2 | Filter: Built / Concept (client-side only) | 8.2 |
| P3 | No complex sorting (filter only) | 8.2 |
| P4 | Each card links to project detail page | 8.2 + 8.3 |

---

### 10.3 Project detail page

| ID | Task | Requirement ref |
|----|------|------------------|
| D1 | Title + meta: location, year, area, role | 8.3 Structure 1 |
| D2 | Concept description (max 120 words) | 8.3 Structure 2 |
| D3 | Vertical scroll gallery | 8.3 Structure 3 |
| D4 | Materials section | 8.3 Structure 4 |
| D5 | Role clarification (Design + Execution) | 8.3 Structure 5 |
| D6 | CTA block | 8.3 Structure 6 |

---

### 10.4 Services page

| ID | Task | Requirement ref |
|----|------|------------------|
| S1 | Design process section | 8.4 Section 1 |
| S2 | Technical development section | 8.4 Section 2 |
| S3 | Execution management section | 8.4 Section 3 |
| S4 | Workflow timeline (visual steps) | 8.4 Section 4 |
| S5 | CTA section | 8.4 Section 5 |

---

### 10.5 About page

| ID | Task | Requirement ref |
|----|------|------------------|
| A1 | Biography | 8.5 |
| A2 | Philosophy | 8.5 |
| A3 | Experience | 8.5 |
| A4 | Awards (optional) | 8.5 |
| A5 | Professional image (optional) | 8.5 |

---

### 10.6 Contact page

| ID | Task | Requirement ref |
|----|------|------------------|
| C1 | Consultation form fields: Name, Phone, Email, Project Type, Message | 8.6 |
| C2 | Optional WhatsApp link | 8.6 |
| C3 | Client + server-side form validation (e.g. Zod) | 8.6, NFR Security |
| C4 | Email integration (form → API route → provider) | 8.6 |
| C5 | Success/error feedback and basic spam protection | 8.6, NFR |

---

### 10.7 Cross-cutting (design system, performance, SEO, a11y)

| ID | Task | Requirement ref |
|----|------|------------------|
| X1 | Design system: color palette, typography, 12-col grid, spacing tokens | Design system |
| X2 | Persian typography and RTL support where needed | Design system, SEO |
| X3 | Lazy load images, WebP where possible, CDN | NFR Performance |
| X4 | Meta tags and clean URLs for all pages | NFR SEO |
| X5 | LocalBusiness (or appropriate) schema markup | NFR SEO |
| X6 | Semantic HTML, contrast, keyboard access | NFR Accessibility |
| X7 | Rate limiting / spam protection on contact API | NFR Security |
| X8 | Lighthouse &gt; 90 (performance, a11y, best practices, SEO) | 14 Acceptance |

---

## 11. Development milestones (mapped to PRD)

| Milestone | Scope | PRD tasks |
|-----------|--------|-----------|
| **M1** | Project setup, design system, home static | Project init, X1–X2, H1–H5 |
| **M2** | Projects system, dynamic routing, project detail | P1–P4, D1–D6 |
| **M3** | Services, About, Contact, form integration | S1–S5, A1–A5, C1–C5 |
| **M4** | Optimization, SEO, deployment | X3–X8, deployment, 14 |

---

## 12. Acceptance criteria (summary)

- [ ] Site loads in &lt; 2s on typical Iranian mobile network  
- [ ] All pages responsive (mobile-first)  
- [ ] Contact form submits and sends email successfully  
- [ ] Projects list and detail render correctly; Built/Concept filter works  
- [ ] Lighthouse score &gt; 90 (all four categories where applicable)  
- [ ] UI reflects: control, precision, authority, calm confidence (no flashy/cluttered/animation-heavy design)  

---

## 13. Document control

| Version | Date | Change |
|---------|------|--------|
| 0.1 | 2025-02-23 | Initial architecture + full PRD task breakdown for طرح‌یار |

---

*طرح‌یار — Luxury Residential Architect Website. Architecture and PRD tasks. Not a portfolio gallery; a credibility and conversion engine.*
