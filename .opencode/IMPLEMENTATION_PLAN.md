# Lightstories - Implementation Plan
**Photography Portfolio Website for Thorsten Kolb**

## Technology Stack

### Core Framework
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript** (for better AI maintenance and type safety)

### Content Management
- **MDX** (Markdown + JSX) for content files
- **Git-based** content storage (version controlled)
- **next-mdx-remote** for rendering MDX content

### Styling & Animations
- **Tailwind CSS** (utility-first styling)
- **Framer Motion** (parallax effects, smooth animations)

### Image Handling
- **Next.js Image Component** (built-in optimization)
- **Local storage** initially (can migrate to Cloudinary later if needed)

### Forms & Email
- **React Hook Form** (form validation)
- **Resend** (free tier: 100 emails/day) or **Nodemailer** (with Gmail SMTP)

### Internationalization
- **next-intl** (i18n routing and translations)
- **AI-assisted translation** workflow for German → English

### Testing
- **Playwright** (end-to-end testing)
- **TypeScript** type checking

### Deployment
- **Vercel** (free tier, optimal for Next.js)
- **GitHub** (repository and CI/CD)

---

## Project Structure

```
lightstories/
├── .opencode/
│   └── IMPLEMENTATION_PLAN.md (this file)
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx (Homepage)
│   │   │   ├── hochzeit/ (Wedding category)
│   │   │   ├── portrait/ (Portrait category)
│   │   │   ├── familie/ (Family category)
│   │   │   ├── projekte/ (Case studies)
│   │   │   ├── kontakt/ (Contact page)
│   │   │   └── impressum/ (Legal)
│   │   └── api/
│   │       └── contact/ (Form submission endpoint)
│   ├── components/
│   │   ├── Hero.tsx (Full-screen parallax banner)
│   │   ├── Navigation.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── Gallery.tsx
│   │   ├── ContactForm.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── lib/
│   │   ├── mdx.ts (MDX utilities)
│   │   └── email.ts (Email sending)
│   └── content/
│       ├── de/ (German content)
│       │   ├── home.mdx
│       │   ├── hochzeit/
│       │   ├── portrait/
│       │   ├── familie/
│       │   └── projekte/
│       └── en/ (English content - AI translated)
│           └── ... (same structure)
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── hochzeit/
│   │   ├── portrait/
│   │   └── familie/
│   └── ...
├── tests/
│   └── e2e/ (Playwright tests)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Implementation Phases

### Phase 1: Project Setup & Foundation (Day 1-2)
**Goal:** Initialize project with all dependencies and basic configuration

#### Tasks:
1. **Initialize Next.js project**
   ```bash
   npx create-next-app@latest lightstories --typescript --tailwind --app --src-dir
   ```

2. **Install core dependencies**
   ```bash
   npm install next-mdx-remote framer-motion next-intl react-hook-form
   npm install -D @playwright/test sharp
   ```

3. **Configure TypeScript** (tsconfig.json)
   - Enable strict mode
   - Configure path aliases (@/components, @/lib, etc.)

4. **Configure Tailwind CSS**
   - Custom colors (photographer brand colors)
   - Typography plugin for MDX content
   - Custom animations for parallax

5. **Setup i18n with next-intl**
   - Configure routing for /de and /en
   - Setup middleware for locale detection
   - Create translation structure

6. **Create basic folder structure**
   - All directories as shown above
   - Placeholder files

**Deliverables:**
- Working Next.js app with TypeScript
- Tailwind CSS configured
- i18n routing working (empty pages)
- Project builds without errors

---

### Phase 2: Core Components & Layout (Day 3-4)
**Goal:** Build reusable UI components and layout structure

#### Tasks:
1. **Root Layout** (app/[locale]/layout.tsx)
   - HTML structure with i18n
   - Font loading (consider professional photography fonts)
   - Navigation component integration
   - Footer with language switcher

2. **Navigation Component**
   - Responsive menu (mobile hamburger menu)
   - Active state for current page
   - Language switcher integration
   - Smooth scroll behavior

3. **Hero Component** (Full-screen parallax banner)
   - Full viewport height
   - Background image with parallax effect using Framer Motion
   - Overlay text/logo
   - Scroll indicator
   - Responsive behavior

4. **CategoryCard Component**
   - Image + title + description
   - Hover effects
   - Link to category pages
   - Optimized Next.js Image

5. **Gallery Component**
   - Masonry or grid layout
   - Lightbox functionality (click to expand)
   - Lazy loading
   - Responsive columns

6. **ContactForm Component**
   - Fields: Name, Email, Phone, Category (dropdown), Message, Date preference
   - Client-side validation with react-hook-form
   - Success/error states
   - GDPR checkbox

**Deliverables:**
- All core components built and styled
- Responsive design working
- Components accept props and are reusable

---

### Phase 3: Homepage & Category Pages (Day 5-6)
**Goal:** Build main public-facing pages

#### Tasks:
1. **Homepage** (app/[locale]/page.tsx)
   - Hero section with parallax banner
   - 3 category cards (Hochzeit, Portrait, Familie)
   - Brief "About" section
   - CTA to contact form
   - Testimonials section (optional)

2. **Category Pages** (hochzeit/, portrait/, familie/)
   - Category hero image
   - Description text (from MDX)
   - Gallery of best works from that category
   - Link to relevant case studies
   - CTA for booking

3. **MDX Content Integration**
   - Create utility functions to read MDX files
   - Render MDX content with next-mdx-remote
   - Support for frontmatter (title, description, date, images, etc.)
   - Custom MDX components (Image, Gallery, etc.)

4. **Content Files**
   - Create sample MDX files for each section
   - German content first
   - Proper frontmatter structure

**Deliverables:**
- Homepage fully functional with real design
- All 3 category pages working
- MDX content rendering correctly
- German content in place

---

### Phase 4: Case Studies & Projects (Day 7-8)
**Goal:** Build project/case study pages with dynamic routing

#### Tasks:
1. **Projects Index Page** (/projekte)
   - Grid of all case studies
   - Filter by category
   - Sort by date
   - Preview cards

2. **Dynamic Project Pages** (/projekte/[slug])
   - Dynamic routing based on MDX files
   - Full project showcase
   - Hero image
   - Project details (date, category, description)
   - Full gallery
   - Client testimonial (optional)
   - "Next project" navigation

3. **MDX Project Files**
   - Create 2-3 sample projects per category
   - Frontmatter: title, date, category, heroImage, gallery[], description
   - Rich text content with MDX

4. **generateStaticParams**
   - Pre-render all project pages at build time
   - SEO optimization

**Deliverables:**
- Projects index page working
- Dynamic project pages rendering
- 6-9 sample case studies created
- Category filtering working

---

### Phase 5: Contact Form & Email Integration (Day 9)
**Goal:** Functional booking inquiry system

#### Tasks:
1. **Contact Page** (/kontakt)
   - ContactForm component integration
   - Success page/modal
   - Contact information display

2. **API Route** (/api/contact)
   - Form data validation (server-side)
   - Rate limiting (prevent spam)
   - Email sending via Resend or Nodemailer

3. **Email Template**
   - HTML email template for inquiries
   - Include all form data
   - Professional formatting

4. **Email Configuration**
   - Setup Resend account (free tier) OR Gmail SMTP
   - Environment variables for API keys
   - Test email delivery

5. **Confirmation Email** (optional)
   - Auto-reply to customer confirming receipt
   - Set expectations for response time

**Deliverables:**
- Contact form fully functional
- Emails delivered successfully
- Error handling in place
- User feedback on success/failure

---

### Phase 6: English Translation & i18n (Day 10)
**Goal:** Complete bilingual website

#### Tasks:
1. **Translation Workflow**
   - Create all English MDX files (content/en/)
   - Use AI (ChatGPT/Claude) to translate German → English
   - Maintain same frontmatter structure
   - Translate all UI strings

2. **UI Translations**
   - Create translation files (messages/de.json, messages/en.json)
   - Translate: navigation, buttons, form labels, etc.
   - Use next-intl's useTranslations hook

3. **Language Switcher**
   - Preserve current page when switching languages
   - Update all links to include locale
   - Browser locale detection

4. **SEO for i18n**
   - hreflang tags for both languages
   - Separate metadata for de/en pages
   - Proper sitemap with locales

**Deliverables:**
- Full English version of website
- Language switcher working
- All content translated
- SEO tags for both languages

---

### Phase 7: SEO & Performance Optimization (Day 11)
**Goal:** Production-ready performance and SEO

#### Tasks:
1. **Metadata & SEO**
   - Page titles and descriptions (dynamic)
   - Open Graph tags (for social sharing)
   - JSON-LD structured data (LocalBusiness, Photographer)
   - Favicon and app icons

2. **Image Optimization**
   - Properly sized images (use sharp or Squoosh)
   - WebP/AVIF formats
   - Proper alt texts
   - Loading priority for above-fold images

3. **Performance**
   - Code splitting (automatic with App Router)
   - Font optimization
   - Reduce bundle size
   - Lazy load components

4. **Analytics** (optional but recommended)
   - Vercel Analytics (free tier)
   - Cookie consent banner (GDPR)

5. **Legal Pages**
   - Impressum (required in Germany)
   - Datenschutz (Privacy Policy)
   - Basic MDX pages

**Deliverables:**
- Lighthouse score: 90+ on all metrics
- All SEO tags in place
- Legal pages created
- Analytics configured

---

### Phase 8: Testing with Playwright (Day 12)
**Goal:** Automated testing for AI-driven maintenance

#### Tasks:
1. **Setup Playwright**
   ```bash
   npm init playwright@latest
   ```

2. **Test Suites**
   - Homepage loads correctly
   - Navigation works (all pages accessible)
   - Language switching works
   - Category pages render
   - Contact form submission (mock email)
   - Image loading and gallery
   - Responsive design (mobile, tablet, desktop)

3. **CI Integration** (GitHub Actions)
   - Run tests on every push
   - Block merge if tests fail

4. **Visual Regression** (optional)
   - Screenshot comparison tests
   - Detect unintended visual changes

**Deliverables:**
- Comprehensive Playwright test suite
- All tests passing
- CI/CD pipeline configured

---

### Phase 9: Deployment & Launch (Day 13)
**Goal:** Live production website

#### Tasks:
1. **Environment Variables**
   - Setup on Vercel
   - Email API keys
   - Any other secrets

2. **Deploy to Vercel**
   - Connect GitHub repo
   - Configure build settings
   - Setup custom domain (if available)

3. **Post-Deployment Testing**
   - Test all functionality on production
   - Test contact form with real emails
   - Check both de and en versions
   - Mobile testing on real devices

4. **Performance Monitoring**
   - Verify Vercel Analytics working
   - Check Core Web Vitals

5. **Documentation**
   - README.md with setup instructions
   - Content editing guide for photographer
   - Deployment guide for updates

**Deliverables:**
- Live website on Vercel
- Custom domain configured (if applicable)
- All functionality verified on production
- Documentation complete

---

### Phase 10: Content Management Workflow (Day 14)
**Goal:** Enable easy content updates by photographer and AI

#### Tasks:
1. **Content Editing Guide**
   - How to add new images to galleries
   - How to create new case studies
   - How to edit text on pages
   - Markdown/MDX syntax guide

2. **AI Maintenance Guide**
   - How to prompt AI to add content
   - How to update translations
   - How to test changes locally
   - How to deploy changes

3. **Example Prompts**
   - "Add a new wedding project with these images..."
   - "Update the homepage hero image to..."
   - "Translate this new case study to English..."
   - "Run tests and deploy if everything passes"

4. **Git Workflow**
   - Simple branch → test → merge → deploy workflow
   - Preview deployments on Vercel

**Deliverables:**
- Content management documentation
- AI workflow documented
- Example prompts for common tasks
- Git workflow explained

---

## Content Structure (MDX Frontmatter)

### Homepage (home.mdx)
```yaml
---
title: "Lightstories - Fotografie von Thorsten Kolb"
heroImage: "/images/hero/main.jpg"
heroTitle: "Momente, die bleiben"
heroSubtitle: "Hochzeits-, Portrait- und Familienfotografie"
aboutTitle: "Über mich"
aboutText: "..."
---
```

### Category Pages
```yaml
---
title: "Hochzeitsfotografie"
description: "Euer besonderer Tag in einzigartigen Bildern"
heroImage: "/images/hochzeit/hero.jpg"
gallery:
  - "/images/hochzeit/1.jpg"
  - "/images/hochzeit/2.jpg"
  - ...
---
```

### Case Studies/Projects
```yaml
---
title: "Sarah & Michael - Hochzeit im Schloss"
date: "2024-06-15"
category: "hochzeit"
heroImage: "/images/projekte/sarah-michael/hero.jpg"
gallery:
  - "/images/projekte/sarah-michael/1.jpg"
  - "/images/projekte/sarah-michael/2.jpg"
  - ...
excerpt: "Eine romantische Sommerhochzeit im historischen Schloss"
client: "Sarah & Michael"
location: "Schloss Heidelberg"
testimonial: "Thorsten hat unseren Tag perfekt eingefangen..."
---
```

---

## AI-Friendly Maintenance

### Key Principles:
1. **Clear File Organization** - Content in `/content`, components in `/components`
2. **TypeScript** - Type safety helps AI understand data structures
3. **Consistent Naming** - Clear, descriptive file and variable names
4. **Comments** - Document complex logic and MDX structure
5. **Test Coverage** - Playwright tests catch issues before deployment

### Common AI Tasks:
- **Add new project:** Create MDX file in `/content/de/projekte/`, add images, translate to English
- **Update homepage:** Edit `/content/de/home.mdx`
- **Change styles:** Modify Tailwind classes in components
- **Deploy:** Git commit → Vercel auto-deploys

---

## Environment Variables Required

```env
# Email (Resend)
RESEND_API_KEY=re_xxx

# Or Email (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Contact form recipient
CONTACT_EMAIL=thorsten@lightstories.de

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS=1
```

---

## Estimated Timeline

- **Phase 1-3:** Days 1-4 (Foundation & Core)
- **Phase 4-6:** Days 5-10 (Content & Features)
- **Phase 7-9:** Days 11-13 (Optimization & Launch)
- **Phase 10:** Day 14 (Documentation)

**Total: ~14 working days** (can be compressed or extended based on scope)

---

## Success Criteria

✅ Homepage loads with full-screen parallax hero
✅ All 3 category pages display galleries
✅ 6-9 case studies created and accessible
✅ Contact form sends emails successfully
✅ German and English versions both work
✅ Language switcher functions correctly
✅ Responsive on mobile, tablet, desktop
✅ Lighthouse score 90+ on all metrics
✅ Playwright tests pass
✅ Deployed on Vercel
✅ Photographer can edit content via MDX files
✅ AI can modify, test, and deploy changes

---

## Future Enhancements (Post-Launch)

- Blog section (separate from case studies)
- Instagram feed integration
- Client portal for photo delivery
- Booking calendar integration (Calendly)
- E-commerce (sell prints)
- Advanced CMS (Payload/Sanity) if needed
- PWA features (offline viewing)
- Advanced animations and transitions

---

## Notes

- **Free Tier Limits:**
  - Vercel: 100GB bandwidth/month, unlimited sites
  - Resend: 100 emails/day (3,000/month)
  - GitHub: Unlimited public repos

- **AI Translation Workflow:**
  - Create content in German first
  - Use AI (ChatGPT/Claude) with context about photography and brand voice
  - Review translations for accuracy
  - Maintain consistent terminology

- **Image Guidelines:**
  - Hero images: 1920x1080px minimum
  - Gallery images: 1200px wide minimum
  - Optimize before adding to repo (use Squoosh.app)
  - WebP format preferred

---

**Last Updated:** 2026-02-07
**Status:** Ready for Implementation
