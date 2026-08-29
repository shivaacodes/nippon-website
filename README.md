# Nippon Toyota

Customer-facing Nippon Toyota website built with the Next.js App Router.

## Getting started

```powershell
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Local validation

With the development server running:

```powershell
node scripts/verify-parity.mjs
node scripts/verify-assets.mjs
node scripts/verify-routes.mjs
npm.cmd run lint
npm.cmd run build
```

Set `NEXT_PUBLIC_SITE_URL` when the deployed origin is not `https://www.nippon-toyota.com`. Lead persistence is intentionally not enabled in this customer-experience pass; configure the database provider before production lead capture.
