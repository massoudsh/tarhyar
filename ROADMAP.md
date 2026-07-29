# طرح‌یار — Full Project Roadmap

**Product:** AI architectural design & compliance copilot for Iranian design offices (طرح‌یار)
**Target:** Architecture and design-build offices in Tehran
**Principle:** Control · Precision · Authority · Calm confidence
**Repo:** [github.com/massoudsh/tarhyar](https://github.com/massoudsh/tarhyar)

---

## Vision & success

- **Vision:** Minimal, high-authority site that positions the architect as a premium residential specialist and converts visitors into consultation requests.
- **Success (MVP):** CTA engagement, working form, &lt; 2s load, mobile-optimized, Lighthouse &gt; 90.

---

## Phase 1 — MVP

### M1 — Foundation ✅ (in progress)

| # | Deliverable | Status |
|---|-------------|--------|
| M1.1 | Project setup: Next.js (App Router), TypeScript, Tailwind, ESLint | ✅ |
| M1.2 | Design system: palette, typography (Dana), 12-col grid, spacing, radius, shadows | ✅ |
| M1.3 | Layout: root layout, Navbar, Footer, max-width container | ✅ |
| H1 | Home Hero: full-width area, brand statement, one CTA | ✅ |
| H2 | Home Services summary: Design, Technical Development, Execution Management | ✅ |
| H3 | Home Featured projects: max 6, grid | ✅ |
| H4 | Home Authority block: years experience, number of projects | ✅ |
| H5 | Home CTA section: «درخواست جلسه مشاوره» | ✅ |

**Outcome:** Static Home page, modern UI, design system in place.

---

### M2 — Projects

| # | Deliverable | Status |
|---|-------------|--------|
| M2.1 | Data: projects JSON/Markdown (slug, title, location, year, area, role, type: built\|concept, images, description) | ⬜ |
| P1 | Projects page: grid layout | ⬜ |
| P2 | Filter: Built / Concept (client-side) | ⬜ |
| P3 | Project cards link to detail | ⬜ |
| D1 | Project detail: title + meta (location, year, area, role) | ⬜ |
| D2 | Project detail: concept description (max 120 words) | ⬜ |
| D3 | Project detail: vertical scroll gallery | ⬜ |
| D4 | Project detail: materials section | ⬜ |
| D5 | Project detail: role clarification (Design + Execution) | ⬜ |
| D6 | Project detail: CTA | ⬜ |

**Outcome:** Projects list, dynamic `[slug]` page, filtering.

---

### M3 — Services, About, Contact

| # | Deliverable | Status |
|---|-------------|--------|
| S1 | Services: Design process section | ⬜ |
| S2 | Services: Technical development section | ⬜ |
| S3 | Services: Execution management section | ⬜ |
| S4 | Services: Workflow timeline (visual steps) | ⬜ |
| S5 | Services: CTA section | ⬜ |
| A1–A5 | About: Biography, Philosophy, Experience, Awards (opt), Image (opt) | ⬜ |
| C1 | Contact form: Name, Phone, Email, Project Type, Message | ⬜ |
| C2 | Contact: WhatsApp link (optional) | ⬜ |
| C3 | Form validation (Zod) client + server | ⬜ |
| C4 | API route → email (Resend/SendGrid/etc.) | ⬜ |
| C5 | Success/error UI, basic spam protection | ⬜ |

**Outcome:** All six pages live, form submits and sends email.

---

### M4 — Optimization & launch

| # | Deliverable | Status |
|---|-------------|--------|
| X3 | Lazy load images, WebP, CDN-ready | ⬜ |
| X4 | Meta tags, clean URLs | ⬜ |
| X5 | Schema (LocalBusiness or appropriate) | ⬜ |
| X6 | Semantic HTML, contrast, keyboard access | ⬜ |
| X7 | Form rate limiting / spam protection | ⬜ |
| X8 | Lighthouse &gt; 90 | ⬜ |
| — | Deploy to ArvanCloud, verify form and performance | ⬜ |

**Outcome:** Production-ready, fast, accessible, SEO-friendly.

---

## Phase 2 — Growth (future)

- CMS for content (projects, copy) without code deploys  
- Client login (optional) for project updates  
- Bilingual (FA/EN) if needed  
- Case studies expansion  
- Press / media section  

---

## Timeline (MVP)

| Week | Milestone | Focus |
|------|-----------|--------|
| 1 | M1 | Repo, design system, Home (Hero, Services, Featured, Authority, CTA) |
| 2 | M2 | Projects data, list page, [slug] detail, Built/Concept filter |
| 3 | M3 | Services, About, Contact, form + validation + email |
| 4 | M4 | Images (WebP), meta, schema, a11y, Lighthouse, deploy |

---

## Out of scope (MVP)

- Blog, comments, likes  
- User accounts  
- Heavy animations  
- CMS dashboard  

---

## References

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Full architecture and PRD task breakdown  
- [TASKS.md](./TASKS.md) — Task checklist for sprints  
- [README.md](./README.md) — Run instructions and repo link  

---

*طرح‌یار — AI architectural design & compliance copilot. Control · Precision · Authority · Calm confidence.*
