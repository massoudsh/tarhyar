# طرح‌یار — Task List

Traceable to [ARCHITECTURE.md](./ARCHITECTURE.md) and [ROADMAP.md](./ROADMAP.md). Use for sprint planning or GitHub Issues.

---

## M1 — Foundation

- [ ] **M1.1** Project setup: Next.js (App Router), TypeScript, Tailwind, ESLint
- [ ] **M1.2** Design system: palette (warm white, charcoal, warm grey, olive/bronze), typography (Persian-friendly), 12-col grid, spacing
- [ ] **M1.3** Layout: root layout, Navbar, Footer, max-width container
- [ ] **H1** Home Hero: full-width image, brand statement, one CTA
- [ ] **H2** Home Services summary: Design, Technical Development, Execution Management
- [ ] **H3** Home Featured projects: max 6, grid
- [ ] **H4** Home Authority block: years experience, number of projects
- [ ] **H5** Home CTA section: «درخواست جلسه مشاوره»

---

## M2 — Projects

- [ ] **M2.1** Data: projects JSON/Markdown (slug, title, location, year, area, role, type: built|concept, images, description)
- [ ] **P1** Projects page: grid layout
- [ ] **P2** Filter: Built / Concept (client-side)
- [ ] **P3** Project cards link to detail
- [ ] **D1–D6** Project detail: title+meta, concept (≤120 words), vertical gallery, materials, role clarification, CTA

---

## M3 — Services, About, Contact

- [ ] **S1–S5** Services page: Design process, Technical development, Execution management, Workflow timeline, CTA
- [ ] **A1–A5** About: Biography, Philosophy, Experience, Awards (opt), Image (opt)
- [ ] **C1** Contact form: Name, Phone, Email, Project Type, Message
- [ ] **C2** WhatsApp link (optional)
- [ ] **C3** Validation (Zod) client + server
- [ ] **C4** API route → email (Resend/SendGrid/etc.)
- [ ] **C5** Success/error UI, basic spam protection

---

## M4 — Optimization & launch

- [ ] **X3** Lazy load images, WebP, CDN-ready
- [ ] **X4** Meta tags, clean URLs
- [ ] **X5** Schema (LocalBusiness or appropriate)
- [ ] **X6** Semantic HTML, contrast, keyboard access
- [ ] **X7** Form rate limiting / spam protection
- [ ] **X8** Lighthouse > 90
- [ ] Deploy to ArvanCloud, verify form and performance

---

## Acceptance (final sign-off)

- [ ] Load < 2s on typical Iranian mobile
- [ ] All pages responsive
- [ ] Form sends email successfully
- [ ] Projects + filter work
- [ ] UI: calm, authoritative, minimal (no flashy/cluttered)
