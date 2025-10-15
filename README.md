# TBITalk.com

Community for traumatic brain injury survivors, caregivers, clinicians, and researchers to share healing tips.

## Local dev
```bash
npm install
npm run dev
```

## Environment
Copy `.env.example` to `.env` and set:
- NEXTAUTH_URL
- NEXTAUTH_SECRET (use a random 32+ char string)
- DATABASE_URL (SQLite locally is fine; Postgres for prod)
- GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET (optional)

## Database
```bash
npx prisma migrate dev
npm run prisma:generate
```

## Auth
- Sign in at `/signin` (Google or credentials)
- Initialize first admin at `/admin/init`

## Deploy (Vercel + Neon/Supabase)
1) Push repo to GitHub
2) Create a Postgres DB (Neon or Supabase). Get the connection string.
3) In Vercel:
   - Import the repo
   - Set Environment Variables (Production):
     - NEXTAUTH_URL=https://tbitalk.com (or your preview URL)
     - NEXTAUTH_SECRET=generate a strong secret
     - DATABASE_URL=postgres connection string (with sslmode=require)
     - GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET (optional)
   - Build & Deploy
4) After first deploy, run migrations:
   - Vercel auto-runs `npm run build`, but you must run `npm run prisma:deploy` once. Use Vercel CLI or a one-off action (e.g., SSH to a runner) or run migrations from CI against the same DATABASE_URL.

## Post-deploy
- Visit `/admin/init` to promote first admin (if none exists)
- Tips: `/tips`, Create: `/tips/new`, Admin reports: `/admin/reports`

## Tech
- Next.js App Router, TypeScript, Tailwind CSS
- Prisma ORM, Postgres (prod), SQLite (dev)
- Auth.js (NextAuth) with Google + credentials (Prisma adapter)
