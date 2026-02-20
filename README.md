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
├── app/                          # Next.js App Router
│   ├── [locale]/                # Internationalized routes
│   │   ├── datenschutz/         # Privacy policy
│   │   ├── familie/             # Family photography page
│   │   ├── faq/                 # FAQ page
│   │   ├── hochzeit/            # Wedding photography page
│   │   ├── impressum/           # Legal notice
│   │   ├── kontakt/             # Contact form
│   │   ├── portrait/            # Portrait photography page
│   │   ├── projekte/            # Projects overview and details
│   │   ├── layout.tsx           # Locale-specific layout
│   │   └── page.tsx             # Homepage
│   ├── api/contact/             # Contact form API endpoint
│   └── globals.css              # Global styles
├── components/                  # React components
│   ├── CategoryCard.tsx         # Category display cards
│   ├── CategoryPage.tsx         # Shared category page renderer
│   ├── ContactForm.tsx          # Contact form with validation
│   ├── ContactInfoSidebar.tsx   # Contact info sidebar
│   ├── FaqPreview.tsx           # FAQ preview component
│   ├── Footer.tsx               # Site footer
│   ├── Gallery.tsx              # Image gallery component
│   ├── Hero.tsx                 # Hero section with video
│   ├── LanguageSwitcher.tsx     # DE/EN language toggle
│   ├── Navigation.tsx           # Main navigation
│   └── PlaceholderBadge.tsx     # Placeholder media indicator
├── content/                     # MDX content files
│   ├── de/                      # German content
│   │   ├── projekte/            # Project pages
│   │   ├── home.mdx             # Homepage content
│   │   ├── hochzeit.mdx         # Wedding category page
│   │   ├── portrait.mdx         # Portrait category page
│   │   ├── familie.mdx          # Family category page
│   │   ├── faq.mdx              # FAQ content
│   │   ├── projekte.mdx         # Projects page content
│   │   ├── kontakt.mdx          # Contact page content
│   │   ├── impressum.mdx        # Legal notice content
│   │   └── datenschutz.mdx      # Privacy policy content
│   └── en/                      # English content (same structure)
├── i18n/                        # Internationalization config
├── lib/                         # Utility functions
│   ├── content-trigger.ts       # Content change detection
│   ├── email.ts                 # Email sending logic
│   ├── images.ts                # Image utilities
│   ├── markdown.tsx             # MDX rendering component
│   ├── mdx.ts                   # MDX parsing and page loading
│   └── placeholders.ts          # Placeholder image utilities
└── messages/                    # Translation files
    ├── de.json                  # German translations
    └── en.json                  # English translations
```

## Features

### Content Management
- **MDX-driven pages**: All pages use MDX files in `src/content/{locale}/` for content and frontmatter
- **Projects**: Stored as `.mdx` files in `src/content/{locale}/projekte/`, each including:
  - Title, date, category
  - Hero image and gallery images
  - Client testimonials
  - Custom content in MDX format
- **Category pages**: Wedding, portrait, and family pages with auto-discovered gallery images
- **FAQ page**: Frequently asked questions with structured Q&A from MDX frontmatter
- **Legal pages**: Impressum and Datenschutz rendered as prose MDX content

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


Projects are fully dynamic — just add a file and it appears on the site. No code changes needed.

**Step 1: Add your images**

Create a folder for your project in `public/images/projekte/` and add your photos:

```
public/images/projekte/my-project/
├── hero.png       ← Main banner image (displayed at the top)
├── 1.png          ← Gallery images (as many as you like)
├── 2.png
├── 3.png
└── ...
```

**Step 2: Create the German content file**

Create a new file `src/content/de/projekte/my-project.mdx` (the filename becomes the URL slug, e.g. `/projekte/my-project`):

```mdx
---
title: "Mein Projekt"
date: "2024-06-15"
category: "hochzeit"
heroImage: "/images/projekte/my-project/hero.png"
gallery:
  - "/images/projekte/my-project/1.png"
  - "/images/projekte/my-project/2.png"
  - "/images/projekte/my-project/3.png"
excerpt: "Eine kurze Beschreibung des Projekts, die auf der Übersichtsseite angezeigt wird."
client: "Kundenname"
location: "Ort"
testimonial: "Ein optionales Kundenzitat."
---
```

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Project title |
| `date` | Yes | Date in `YYYY-MM-DD` format (used for sorting, newest first) |
| `category` | Yes | One of: `hochzeit`, `portrait`, or `familie` |
| `heroImage` | Yes | Path to the hero/banner image |
| `gallery` | Yes | List of gallery image paths |
| `excerpt` | Yes | Description shown on the project detail page |
| `description` | No | Short text shown on the projects overview card |
| `client` | No | Client name |
| `location` | No | Shoot location |
| `testimonial` | No | Client testimonial quote |

**Step 3: Create the English version (recommended)**

Copy the file to `src/content/en/projekte/my-project.mdx` and translate the text fields. Keep the same filename, image paths, date, and category.

That's it — the project will automatically appear on the `/projekte` page and be filterable by category.

### Updating Translations

There are two places where translated text lives:

- **Page content** (titles, descriptions, FAQ, project texts, legal pages, etc.) → MDX files in `src/content/de/` and `src/content/en/`. Each page has a German and English version with the same filename.
- **UI strings** (navigation labels, button text, form labels, error messages, etc.) → JSON files in `src/messages/de.json` and `src/messages/en.json`.

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
NEXT_PUBLIC_SHOW_PLACEHOLDERS=true
```

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | API key for sending contact form emails via Resend |
| `CONTACT_EMAIL` | Yes | Recipient email address for contact form submissions |
| `NEXT_PUBLIC_SHOW_PLACEHOLDERS` | No | Set to `true` to show a badge on images that are placeholders (useful during development). Defaults to off. |

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
