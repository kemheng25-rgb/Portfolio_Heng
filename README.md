# Kem Heng CHENG — Portfolio

A production-ready personal portfolio for a full-stack software developer, built with
Next.js 16 (App Router), TypeScript, Tailwind CSS, Prisma, PostgreSQL, and Resend.

## Stack

- **Framework:** Next.js 16 (App Router, React Server Components by default)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Animation:** [motion](https://motion.dev) (the maintained successor to Framer Motion),
  used only in a small `<Reveal>` client wrapper and respecting
  `prefers-reduced-motion`
- **Icons:** lucide-react
- **Forms:** React Hook Form + Zod
- **Database:** PostgreSQL via Prisma ORM 6
- **Email:** Resend (contact-form notifications)
- **Tests:** Vitest + React Testing Library

## Getting started

### 1. Install dependencies

```bash
npm install
```

`npm install` also runs `prisma generate` via the `postinstall` script, so the Prisma
Client is always in sync with `prisma/schema.prisma`.

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable             | Required | Description                                              |
| -------------------- | -------- | ---------------------------------------------------------|
| `DATABASE_URL`       | Yes\*    | PostgreSQL connection string used by Prisma.              |
| `RESEND_API_KEY`     | No       | Resend API key. Without it, submissions are still saved to the database, just not emailed. |
| `CONTACT_FROM_EMAIL` | No       | Sender address (must be on a domain verified with Resend). |
| `CONTACT_TO_EMAIL`   | No       | Inbox that receives contact-form notifications.            |

\* `DATABASE_URL` is only required to actually run/submit the contact form. The app
type-checks, lints, tests, and builds (`next build`) successfully with **no `.env` file
at all** — the contact form's server action validates its environment lazily at request
time, not at build time, and reports a friendly error if the database or email isn't
configured yet.

### 3. Set up PostgreSQL

Create a database, then point `DATABASE_URL` at it, e.g.:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/ckh_portfolio?schema=public"
```

### 4. Run the database migration

```bash
npx prisma migrate deploy
```

This applies the single `ContactSubmission` migration in `prisma/migrations/`. (It was
generated with `prisma migrate diff --from-empty` against the schema, without a live
database, so `prisma migrate deploy` is the first thing that actually touches a real
one.)

For local development you can use `npx prisma migrate dev` instead, which also keeps the
migration history in sync as you change `prisma/schema.prisma`.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command              | Description                                      |
| --------------------- | ------------------------------------------------ |
| `npm run dev`         | Start the dev server                              |
| `npm run build`       | `prisma generate` + production build              |
| `npm run start`       | Start the production server (after `build`)       |
| `npm run lint`        | ESLint                                            |
| `npm run typecheck`   | `tsc --noEmit`                                    |
| `npm run test`        | Run the Vitest suite once                         |
| `npm run test:watch`  | Run Vitest in watch mode                          |

All four gates (`typecheck`, `lint`, `test`, `build`) pass in this repository with no
`.env` file present.

## Deploying to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket and import it in Vercel.
2. Add the environment variables from `.env.example` in the Vercel project settings
   (`DATABASE_URL`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`).
3. Use a managed Postgres instance reachable from Vercel (e.g. Neon, Supabase, or
   Vercel Postgres) and run `npx prisma migrate deploy` against it once (locally, or as
   part of your deploy pipeline) before the contact form is used in production.
4. Deploy. The build command is already `prisma generate && next build`.

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
2. **Add PostgreSQL.** In the project, click **+ New → Database → Add PostgreSQL**.
   This creates a `Postgres` service with its own `DATABASE_URL`.
3. **Set environment variables** on the web service (Settings → Variables):
   - `DATABASE_URL` → reference the Postgres service: `${{Postgres.DATABASE_URL}}`
   - `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` → your Resend values
   - (optional) `NEXT_PUBLIC_SITE_URL` if you want it separate from Railway's generated domain
4. **Expose it publicly.** Railway services aren't public by default: go to
   **Settings → Networking → Generate Domain** (or attach a custom domain) on the web
   service.
5. **Deploy.** Railway builds with Nixpacks (`npm install` → `prisma generate && next build`)
   and starts with `npx prisma migrate deploy && npm run start` (from `railway.toml`), so the
   database schema is created/updated automatically on first deploy and kept in sync on
   every deploy after — `migrate deploy` is idempotent, so this is safe to run every time.

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

- **Prisma version:** pinned to `6.19.3`. `prisma@latest` is now a major-version-7
  CLI rebuilt around a hosted "Prisma Platform" (`prisma deploy`, `prisma db`, a
  `contract`/`migration` workflow) rather than the classic self-hosted
  `schema.prisma` + `prisma migrate` workflow this project needs, so 6.x was chosen
  deliberately.
- **Rate limiting:** implemented as a count query against `ContactSubmission` in
  Postgres (same hashed IP, last 15 minutes, max 3), not an in-memory counter — an
  in-memory limiter wouldn't hold up across multiple serverless instances.
- **Honeypot:** a hidden `companyWebsite` field. Zod intentionally does **not** reject
  it at the schema level; the server action checks it after validation and returns a
  generic success response without writing to the database, so a bot never learns why
  its submission was dropped.
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

## Known limitations / not exercised in this environment

- The Prisma migration and the Resend email path were written and reviewed carefully,
  but **never run against a live PostgreSQL database or a real Resend API key** in this
  environment. Run `npx prisma migrate deploy` and submit the contact form against a
  real database/API key before relying on it in production.
- `npm audit` reports 3 high-severity advisories in `deepmerge-ts`, pulled in
  transitively by Prisma's own CLI tooling (`@prisma/config`). It's a build-time
  devDependency, not part of the deployed application, so the practical risk is low;
  `npm audit fix --force` would downgrade Prisma to an older 6.x release and wasn't
  applied.
- Lighthouse scores were not measured in this environment (no browser available here).
  The implementation follows the practices that typically produce 95+ scores (Server
  Components by default, `next/font`, no client JS beyond nav/contact-form/reveal, no
  layout-shifting images), but this should be verified with Lighthouse/PageSpeed
  Insights once deployed.
