# Lightstories

A modern photography portfolio website for photographer Thorsten Kolb, specializing in wedding, portrait, and family photography.

## Overview

Lightstories is a Next.js-based photography portfolio showcasing professional work across three main categories:
- Wedding Photography (Hochzeitsfotografie)
- Portrait Photography (Portraitfotografie)
- Family Photography (Familienfotografie)

The site enables clients to view portfolios, browse projects, and submit booking inquiries through a contact form.

## Tech Stack

- **Framework**: Next.js 16.1.6 with React 19
- **Internationalization**: next-intl (German and English)
- **Styling**: Tailwind CSS 4 with typography plugin
- **Animations**: Framer Motion
- **Content**: MDX files with gray-matter for frontmatter
- **Email**: Resend API for contact form submissions
- **Forms**: React Hook Form
- **Testing**: Playwright for E2E tests
- **TypeScript**: Full type safety

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── [locale]/            # Internationalized routes
│   │   ├── datenschutz/     # Privacy policy
│   │   ├── familie/         # Family photography page
│   │   ├── hochzeit/        # Wedding photography page
│   │   ├── impressum/       # Legal notice
│   │   ├── kontakt/         # Contact form
│   │   ├── portrait/        # Portrait photography page
│   │   ├── projekte/        # Projects overview and details
│   │   ├── layout.tsx       # Locale-specific layout
│   │   └── page.tsx         # Homepage
│   ├── api/contact/         # Contact form API endpoint
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── CategoryCard.tsx     # Category display cards
│   ├── ContactForm.tsx      # Contact form with validation
│   ├── Footer.tsx           # Site footer
│   ├── Gallery.tsx          # Image gallery component
│   ├── Hero.tsx             # Hero section with video
│   ├── LanguageSwitcher.tsx # DE/EN language toggle
│   └── Navigation.tsx       # Main navigation
├── content/                 # MDX content files
│   ├── de/projekte/         # German project content
│   └── en/projekte/         # English project content
├── i18n/                    # Internationalization config
├── lib/                     # Utility functions
│   ├── email.ts            # Email sending logic
│   ├── images.ts           # Image utilities
│   └── mdx.ts              # MDX parsing and project loading
└── messages/                # Translation files
    ├── de.json             # German translations
    └── en.json             # English translations
```

## Features

### Content Management
- **MDX-based Projects**: Projects are stored as `.mdx` files in `src/content/{locale}/projekte/`
- Each project includes:
  - Title, date, category
  - Hero image and gallery images
  - Client testimonials
  - Custom content in MDX format

### Internationalization
- Full bilingual support (German/English)
- Locale-based routing with `next-intl`
- Default locale: German
- Automatic locale detection

### Contact Form
- React Hook Form with validation
- Server-side email sending via Resend API
- Required fields: name, email, message, privacy consent
- Optional fields: phone, category, preferred date

### Testing
- Comprehensive E2E tests with Playwright
- Tests for: homepage, category pages, projects, contact form, responsive design
- Multi-browser testing (Chrome, Firefox, Safari)
- Mobile device testing (Pixel 5, iPhone 12)

## Getting Started

### Prerequisites
- Node.js 20+ 
- npm or package manager of choice

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000`

### Building

```bash
npm run build
npm start
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run typecheck` - Run TypeScript type checking
- `npm test` - Run Playwright tests
- `npm run test:ui` - Run Playwright tests with UI
- `npm run test:headed` - Run Playwright tests in headed mode
- `npm run generate:placeholders` - Generate image placeholders

## Adding New Content

### Adding a New Project

1. Create a new `.mdx` file in `src/content/de/projekte/` (and optionally `src/content/en/projekte/`)
2. Add frontmatter with required fields:

```mdx
---
title: "Project Title"
date: "2024-06-15"
category: "hochzeit"  # or "portrait" or "familie"
heroImage: "/images/projekte/your-project/hero.png"
gallery:
  - "/images/projekte/your-project/1.png"
  - "/images/projekte/your-project/2.png"
excerpt: "Brief description"
client: "Client Name"
location: "Location"
testimonial: "Optional client testimonial"
---

Project description in MDX format...
```

3. Add images to `public/images/projekte/your-project/`

### Updating Translations

Edit translation files in `src/messages/`:
- `de.json` for German
- `en.json` for English

## Testing

Tests are written with Playwright and cover:
- Homepage functionality
- Category page navigation
- Project listing and detail pages
- Contact form submission
- Responsive design across devices

Run tests:
```bash
npm test
```

## Environment Variables

Create a `.env.local` file for local development:

```
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your@email.com
```

## Design Philosophy

- Minimalist, elegant design
- Full-screen hero with video background
- Parallax effects for visual interest
- Focus on photography with clean presentation
- Mobile-first responsive design

## Inspiration

Design inspired by:
- [annalorek.de](https://www.annalorek.de) - Full-screen banner with parallax
- [josefsutter.ch](https://www.josefsutter.ch) - Three-category layout on landing page
