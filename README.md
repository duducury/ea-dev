# EA Dev

Premium developer studio portfolio site for **EA Dev**, built by Eduardo & Auler. Next.js (App Router) + TypeScript + Tailwind CSS v4 + GSAP.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

Everything content-related lives in `src/data/`:

- `src/data/projects.ts` — portfolio projects (Favela Store, United Flooring America, Dois Amores)
- `src/data/developers.ts` — Eduardo & Auler profiles (bios, GitHub/LinkedIn links)
- `src/data/technologies.ts` — the tech stack shown in the marquee

## Outstanding TODOs

Search the codebase for `TODO` to find every placeholder that needs a real value before launch: real screenshots for each portfolio project, real photos for Eduardo & Auler, real GitHub/LinkedIn URLs, the real contact email/social handles, the production domain in `src/app/layout.tsx`, and an `og-image.png` in `/public`.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Geist (via `next/font/google`)

## Deploy

Deploys to [Vercel](https://vercel.com/new) with zero configuration — `next build` runs cleanly out of the box.
