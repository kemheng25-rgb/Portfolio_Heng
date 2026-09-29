# Kem Heng CHENG — Portfolio

A production-ready personal portfolio for a full-stack software developer, built with
Next.js 16 (App Router), TypeScript, and Tailwind CSS.

## Stack

- **Framework:** Next.js 16 (App Router, React Server Components by default)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Animation:** [motion](https://motion.dev) (the maintained successor to Framer Motion),
  used only in small client wrappers (`<Reveal>`, the header, the case-study toggle) and
  respecting `prefers-reduced-motion`
- **Icons:** lucide-react
- **Tests:** Vitest + React Testing Library

There is no backend/database in this project — the Contact section links directly to an
email address (`mailto:`), and all portfolio content is static, typed data.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command              | Description                                      |
| --------------------- | ------------------------------------------------ |
| `npm run dev`         | Start the dev server                              |
| `npm run build`       | Production build                                  |
| `npm run start`       | Start the production server (after `build`)       |
| `npm run lint`        | ESLint                                            |
| `npm run typecheck`   | `tsc --noEmit`                                    |
| `npm run test`        | Run the Vitest suite once                         |
| `npm run test:watch`  | Run Vitest in watch mode                          |

All four gates (`typecheck`, `lint`, `test`, `build`) pass with no environment
configuration required — there's nothing to set up.

## Deploying to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket and import it in Vercel.
2. Deploy. No environment variables or database are needed.

## Deploying to Railway

This repo includes `railway.toml`, so Railway's Nixpacks builder picks up the right
build/start commands automatically — no Dockerfile needed.

1. **Get the code onto Railway.** Either:
   - Push this directory to its own GitHub repo, then in the Railway dashboard:
     **New Project → Deploy from GitHub repo** and pick it, **or**
   - Install the CLI and deploy this folder directly, no GitHub required:
     ```bash
     npm i -g @railway/cli
     railway login
     railway init
     railway up
     ```
2. **Expose it publicly.** Railway services aren't public by default: go to
   **Settings → Networking → Generate Domain** (or attach a custom domain) on the web
   service.
3. **Deploy.** Railway builds with Nixpacks (`npm install` → `next build`) and starts
   with `npm run start` (from `railway.toml`). No database or other environment
   variables are required.

> **Monorepo note:** this project lives inside `Project Innovation/`, which has other,
> unrelated projects as siblings. If you ever push the whole `Project Innovation` folder
> as one repo instead of just this one, set the web service's **Root Directory** to
> `Next Js Portfio` in Railway's Settings so it only builds this project.

## Content customization checklist

All portfolio content lives in two typed data files — no component needs to change when
the content does:

- `src/data/portfolio.ts` — personal details, contact info, social links, brand
  copy, stats, summary, skills, business domains, experience, education, languages,
  and navigation.
- `src/data/projects.ts` — the six featured project case studies.

Remaining TODOs (marked in `src/data/portfolio.ts`):

- [x] **LinkedIn URL** — `social.linkedin` is set to `https://www.linkedin.com/in/cheng-kemheng`
      (from the résumé), so the LinkedIn icon now shows in the header/footer.
- [ ] **Graduation date** — set `education[0].graduationDate` (currently omitted from
      the Education section).
- [x] **Résumé file** — `public/resume.pdf` is in place and `personal.resumeAvailable`
      is `true`, so the "Download Résumé" buttons are live.
- [ ] **Phone visibility** — `contact.showPhone` in `src/data/portfolio.ts` controls
      whether the phone number renders in the Contact section; set it to `false` to
      hide it without touching any component.
- [ ] **Production domain** — update `siteConfig.url` once the site has a real domain
      (used for canonical URLs, Open Graph, and the sitemap).

## Notable implementation decisions

- **Content Security Policy:** the security headers in `next.config.ts` are static
  (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`, `Strict-Transport-Security`). A strict nonce-based CSP was
  deliberately left out — it forces every response to be dynamically rendered, which
  conflicts with statically generating the home page and all six project case studies.
- **Diagrams:** the hero "system map" and the per-project architecture/workflow
  diagrams are plain inline SVG driven by typed data in `src/data/projects.ts`
  (`architecture.nodes` / `architecture.edges` / `workflowSteps`), not screenshots —
  these are private employer systems, so no real UI, code, or data is shown.
- **404 for unknown project slugs:** `dynamicParams = false` on
  `/projects/[slug]` — the six case studies are a fixed, enumerable set, so an unknown
  slug 404s immediately instead of being rendered on demand.
- **Theme:** dark is the site's default regardless of OS preference; a header toggle
  switches to a light palette and persists the choice in `localStorage`, applied via an
  inline script before hydration to avoid a flash of the wrong theme.

## Known limitations / not exercised in this environment

- Lighthouse scores were not measured in this environment (no browser available here).
  The implementation follows the practices that typically produce 95+ scores (Server
  Components by default, `next/font`, minimal client JS, no layout-shifting images),
  but this should be verified with Lighthouse/PageSpeed Insights once deployed.
