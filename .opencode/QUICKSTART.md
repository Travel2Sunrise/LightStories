# Lightstories - Quick Start Guide

## Development

### Start the development server
```bash
npm run dev
```
Visit: http://localhost:3000

### Build for production
```bash
npm run build
npm run start
```

### Run tests
```bash
npm run test        # Run all tests
npm run test:ui     # Open Playwright UI
npm run test:headed # Run tests with browser visible
```

### Type checking
```bash
npm run typecheck
```

---

## Project Structure

```
src/
├── app/[locale]/          # Pages (German/English)
│   ├── page.tsx           # Homepage
│   ├── hochzeit/          # Wedding page
│   ├── portrait/          # Portrait page
│   ├── familie/           # Family page
│   ├── projekte/          # Projects index + [slug]
│   ├── kontakt/           # Contact page
│   ├── impressum/         # Imprint
│   └── datenschutz/       # Privacy
├── components/            # Reusable UI components
├── content/               # MDX content files
│   ├── de/projekte/       # German projects
│   └── en/projekte/       # English projects
├── lib/                   # Utility functions
├── messages/              # Translation strings
└── i18n/                  # Internationalization config

public/images/             # Image assets
tests/e2e/                 # Playwright tests
```

---

## Common Tasks

### Add a new project/case study

1. Create MDX file in `src/content/de/projekte/your-project.mdx`:
```yaml
---
title: "Project Title"
date: "2024-12-01"
category: "hochzeit" # or "portrait" or "familie"
heroImage: "/images/projekte/your-project/hero.jpg"
gallery:
  - "/images/projekte/your-project/1.jpg"
  - "/images/projekte/your-project/2.jpg"
excerpt: "Brief description of the project"
client: "Client Name"
location: "Location"
testimonial: "Client testimonial quote"
---

Optional longer description in markdown...
```

2. Add images to `public/images/projekte/your-project/`
3. Create English version in `src/content/en/projekte/your-project.mdx`
4. Rebuild: `npm run build`

### Update homepage text

Edit the translation files:
- German: `src/messages/de.json`
- English: `src/messages/en.json`

### Change styling/colors

Edit `src/app/globals.css`:
```css
:root {
  --primary: #8b7355;      /* Main brand color */
  --primary-dark: #6b5a47; /* Darker shade */
  --secondary: #d4c4b0;    /* Secondary color */
  /* ... */
}
```

### Add new images to galleries

1. Add images to appropriate folder in `public/images/`
2. Update the gallery array in the relevant MDX file or page

---

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel: https://vercel.com/import
3. Configure environment variables:
   - `RESEND_API_KEY` - For email functionality
   - `CONTACT_EMAIL` - Recipient for contact form

### Environment Variables

Create `.env.local` for development:
```env
CONTACT_EMAIL=hello@lightstories.de
RESEND_API_KEY=re_your_api_key  # Optional, logs to console without it
```

---

## AI Maintenance

### Example prompts for common tasks:

**Add a new wedding project:**
```
Add a new wedding project called "Lisa & Thomas" with the following details:
- Date: March 15, 2025
- Location: Villa am See
- Description: An elegant lakeside wedding
- Client testimonial: "Absolutely wonderful photography!"
Create both German and English versions.
```

**Update the about section:**
```
Update the "About Me" section on the homepage to include information about 
10 years of experience and specialization in outdoor photography.
```

**Run tests and deploy:**
```
Run the Playwright tests. If they pass, tell me the results.
If they fail, fix the issues and run again.
```

**Translate new content:**
```
The German project file at src/content/de/projekte/new-project.mdx needs 
to be translated to English. Create the English version.
```

---

## Troubleshooting

### Build fails
```bash
npm run typecheck  # Check for TypeScript errors
npm run lint       # Check for linting issues
```

### Images not showing
- Ensure images are in `public/images/` directory
- Check file paths start with `/images/` (not `./images/`)
- Supported formats: JPG, PNG, WebP, AVIF

### Contact form not working
- Check `RESEND_API_KEY` is set in environment
- In development, form submissions are logged to console
- Check API route at `/api/contact`

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Playwright](https://playwright.dev/)
