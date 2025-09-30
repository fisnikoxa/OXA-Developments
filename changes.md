## Rebranding Change Plan (aligned to rebranding.md)

This document lists all required changes to align the website with the new brand positioning and structure. Items are grouped by area and mapped to files/components. Check items off as they’re completed.

### 1) Positioning & Core Messaging
- **Hero messaging (headline/subheadline/CTA)**
  - Update to reflect positioning: "Helping businesses grow smarter: more customers, smoother logistics, and automation that saves time."
  - Proposed:
    - Headline: "Helping businesses grow smarter"
    - Subheadline: "More customers, smoother logistics, and automation that saves time."
    - Primary CTA: "Get a free efficiency audit"
  - Files:
    - `src/components/Hero.tsx` (replace heading/subheading/call-to-action text)
    - `src/components/Navbar.tsx` (right CTA button label/link)

- **Service buckets**
  - Reframe content around 3 pillars:
    - Lead Generation
    - Logistics & Operations
    - Automation & Integrations
  - Files:
    - `src/lib/services.ts` (reduce to 3 items; update titles/descriptions)
    - `src/components/Services.tsx` (ensure layout matches 3-card structure)

### 2) IA / Site Structure
- **Sections on Home**
  - Keep: Hero, Clients, Testimonials, Contact
  - Update: Services → 3-card structure (see above)
  - Add: "How It Works" (Discovery → Implementation → Growth) section between Services and Testimonials
  - Files:
    - `src/components/HowItWorks.tsx` (new component)
    - `src/pages/Index.tsx` (insert component in correct order)

- **Case Studies / Portfolio**
  - Add dedicated page and link in navigation; include at least 2–3 entries (can start as placeholders)
  - Files:
    - `src/pages/Portfolio.tsx` (new)
    - `src/components/Navbar.tsx` (add link)
    - `src/pages/App.tsx` routes (add `/portfolio` route)

- **About the Team**
  - Add section on Home or a separate page (bios/photos for automation/strategy, logistics, lead gen)
  - Files:
    - `src/components/AboutTeam.tsx` (new) or `src/pages/About.tsx` (new)
    - `src/pages/Index.tsx` (insert section if on Home)
    - `src/components/Navbar.tsx` (add link if separate page)

- **CTA / Offer Page**
  - Repurpose or rename Free Automation page to "Free Efficiency Audit"
  - Files:
    - `src/pages/FreeAutomation.tsx` → rename to `src/pages/FreeAudit.tsx` (and update content)
    - `src/App.tsx` (update route from `/free-automation` → `/free-audit`)
    - `src/components/Navbar.tsx` (button link and label)

### 3) Visual Identity
- **Colors** (deep blue, white, green accent)
  - Update Tailwind CSS variables for brand palette
  - Proposed tokens:
    - brand-blue: `#0B3D91` (or similar deep blue)
    - brand-green: `#10B981` (or chosen green accent)
  - Files:
    - `src/index.css` (update `:root` HSL tokens or add brand colors)
    - `tailwind.config.ts` (extend colors with `brandBlue`/`brandGreen` if used directly)

- **Logo**
  - Ensure `Navbar` uses the new `public/oxa-logo.svg` (already referenced). Provide light/dark variants if needed (`public/oxa-logo-light.png`, etc.)
  - Evaluate removing the grayscale blend on client logos only; preserve brand logo as-is
  - Files:
    - `src/components/Navbar.tsx` (confirm logo src)
    - `src/components/ClientLogos.tsx` (optional: adjust `logo-charcoal` effect per brand)

### 4) Navigation
- **Links**
  - Add: Services (scroll), How It Works (scroll), Case Studies (/portfolio), About (section or page), Contact (scroll)
  - Files:
    - `src/components/Navbar.tsx` (add left-side nav items with smooth scroll to sections; route to pages where applicable)
    - `src/pages/Index.tsx` (ensure section anchors/classes exist for scroll targets)

- **Right CTA Button**
  - Label: "Get Free Audit" (or "Free Efficiency Audit")
  - Link: `/free-audit`
  - Files:
    - `src/components/Navbar.tsx`

### 5) Forms & Integrations
- **Contact form**
  - Update heading to emphasize consultation/audit
  - Update Service dropdown to the 3 buckets
  - Optional: add "Company" field (not required)
  - Files:
    - `src/components/Contact.tsx` (texts, dropdown options)
    - `src/lib/services.ts` (source for dropdown options)

- **Email templates**
  - Update messaging in auto-reply and admin notification to match the rebrand
  - Files:
    - `src/emails/auto-reply.html`
    - `src/emails/admin-notification.html`

### 6) Content Updates
- **Hero copy** (see 1)
- **Services copy** (3 buckets)
- **How It Works copy** (3 steps: Discovery → Implementation → Growth)
- **Case Studies** (add 2–3 entries; short paragraph + outcomes)
- **About Team** (roles + short bios; add images later)
- **Contact** (heading/CTA copy)
  - Files:
    - `src/components/Hero.tsx`, `src/components/Services.tsx`, `src/components/HowItWorks.tsx` (new), `src/pages/Portfolio.tsx` (new), `src/components/AboutTeam.tsx` (new), `src/components/Contact.tsx`

### 7) SEO & Meta
- **Meta tags**
  - Update `<title>` and meta description to reflect positioning
  - Add basic Open Graph tags (title/description/image)
  - Files:
    - `index.html`

- **Robots**
  - Confirm `public/robots.txt` is appropriate

### 8) README & Developer Docs
- **README**
  - Update project URL and brief description to reflect the new positioning
  - Files:
    - `README.md`

### 9) Assets & Cleanup
- **Public assets**
  - Confirm presence of final logos: `public/oxa-logo.svg`, `public/oxa-logo.png`, `public/oxa-logo-light.png`
  - Remove unused/deprecated brand assets
  - Files/dirs:
    - `public/` (remove old/unused logos, confirm favicon)

### 10) Routing Summary
- Add/Edit routes:
  - `/` (Home)
  - `/free-audit` (renamed from `/free-automation`)
  - `/portfolio` (case studies)
  - `/about` (optional, if separate page)
  - Files:
    - `src/App.tsx` (define routes)
    - `src/components/Navbar.tsx` (navigate)

### 11) Acceptance Criteria
- Home shows new hero copy and CTA matching rebranding
- Services shows exactly 3 cards aligned to the 3 buckets
- How It Works section appears with 3 steps
- Navbar contains links (Services, How It Works, Case Studies, About, Contact) and right CTA to `/free-audit`
- Contact form dropdown lists the 3 buckets
- Portfolio page exists and is linked from Navbar
- Colors reflect deep blue/white/green accent across components
- Meta title/description updated
- Email templates reflect the new brand voice

---

### Draft Copy (proposed — adjust as needed)
- Hero headline: Helping businesses grow smarter
- Hero subheadline: More customers, smoother logistics, and automation that saves time.
- Primary CTA: Get a free efficiency audit
- Services descriptions:
  - Lead Generation: Market research, outreach systems, and CRM setup that create consistent pipeline.
  - Logistics & Operations: Streamline workflows, scheduling, and resource planning for smooth delivery.
  - Automation & Integrations: No‑code automation, Google Workspace optimization, and tool syncing.


