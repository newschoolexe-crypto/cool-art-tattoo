# Vicious Art Tattoo — Next.js + Sanity CMS

A production-ready website for **Vicious Art Tattoo** (Aprilia, IT), built with Next.js 14 (App Router), React 18, TailwindCSS, and Sanity CMS with an embedded studio at `/studio`.

---

## Quick Start

### 1. Create your Sanity project

```bash
# If you don't have a Sanity account, sign up at https://www.sanity.io/
# Then create a new project:
npx sanity@latest init --bare
```

This gives you a **Project ID**. Copy it.

### 2. Configure environment

Edit `.env.local` in the project root:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID_HERE
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 3. Add CORS origin in Sanity

Go to [https://www.sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **CORS Origins** → Add:

```
http://localhost:3000
```

Check "Allow credentials".

### 4. Install & Run

```bash
npm install
npm run dev
```

Open:
- **Website**: [http://localhost:3000](http://localhost:3000)
- **Sanity Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## What You Get

The site works immediately with **fallback content** matching the real vicious-art-tattoo.com website. Once you configure Sanity and add content via the Studio, it pulls everything from the CMS instead.

### Routes

| Route | Description |
|---|---|
| `/` | Homepage |
| `/services/tatuaggi` | Tattoo service page with category grid |
| `/services/piercing` | Piercing service page |
| `/services/permanent-make-up` | Permanent Make-up service page |
| `/services/tatuaggi/realistico` | Realistico category gallery |
| `/services/tatuaggi/chicano` | Chicano category gallery |
| `/services/tatuaggi/neo-classico` | Neo Classico category gallery |
| `/services/tatuaggi/fineline` | Fine Line category gallery |
| `/studio` | Sanity Studio (CMS) |

### Sanity Schemas

| Schema | Purpose |
|---|---|
| `page` | Pages with dynamic sections (page builder) |
| `service` | Services (Tattoo, Piercing, PMU) |
| `category` | Tattoo categories (references a service) |
| `galleryImage` | Gallery images (references a category) |
| `settings` | Site-wide settings (contact, social, footer) |

### Section Types (Page Builder)

| Type | Component |
|---|---|
| `heroSection` | Full-screen hero with background image |
| `servicesSection` | Service cards grid |
| `aboutSection` | Text + image/gallery layout |
| `ctaSection` | Call-to-action banner |
| `faqSection` | Accordion FAQ |

### Data Hierarchy

```
service → categories → galleryImages
```

Example: **Tatuaggi** → **Realistico** → [gallery images]

---

## Populating Content via Sanity Studio

1. Open `/studio` and log in with your Sanity account
2. Create a **Settings** document with contact info
3. Create **Services**: Tatuaggi, Piercing, Permanent Make-up
4. Create **Categories** under Tatuaggi: Realistico, Chicano, Neo Classico, Fineline
5. Upload **Gallery Images** and link them to categories
6. Create a **Page** with slug `home` and add sections

---

## Tech Stack

- **Next.js 14** (App Router)
- **React 18.3.1** (NOT React 19)
- **TailwindCSS 3.4**
- **Sanity v3** (embedded studio at `/studio`)
- **TypeScript 5.5**
- **GROQ** for data fetching

All dependencies are pinned to stable, compatible versions. The `overrides` field in `package.json` ensures React 18 is used everywhere.

---

## Troubleshooting

**"Missing project ID"**: Make sure `.env.local` has your real Sanity project ID.

**CORS error in Studio**: Add `http://localhost:3000` to CORS origins in Sanity management console.

**Blank content**: The site shows fallback content until you add content in Sanity. Go to `/studio` to start adding.

**Dependency conflicts**: Run `npm install` with the provided `package.json`. The `overrides` field forces React 18 for all packages.
