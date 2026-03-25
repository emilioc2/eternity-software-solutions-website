# Deployment Guide

## Platform: Vercel (recommended)

Vercel is the natural fit for Next.js — handles SSR, ISR, and the `/studio` route with zero config.

## Pre-Deployment Checklist

Run tests and confirm they pass:
```bash
npm run test
```

Do a local production build to catch any build-time errors:
```bash
npm run build
```

## Step 1 — Push to GitHub

Ensure the repo is on GitHub (or GitLab/Bitbucket). Vercel deploys directly from it.

## Step 2 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and import your repo
2. Framework will be auto-detected as Next.js
3. No build config changes needed — `npm run build` / `next start` are the defaults

## Step 3 — Set Environment Variables

In Vercel project settings → Environment Variables, add all of the following:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project dashboard |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_TOKEN` | Sanity → API → Tokens (read token) |
| `SANITY_WEBHOOK_SECRET` | Generate a random string |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Formspree dashboard |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp number |
| `RESEND_API_KEY` | Resend dashboard (if used) |
| `RESEND_TO_EMAIL` | Your receiving email |

All required variables are documented in `.env.example`.

## Step 4 — Configure Sanity CORS

In your Sanity project dashboard → API → CORS Origins, add:
```
https://your-project.vercel.app
```
And your custom domain once you have one.

## Step 5 — Set Up the Revalidation Webhook

The app has a `/api/revalidate` route that triggers ISR when content is published in Sanity.

1. In Sanity → API → Webhooks, create a new webhook
2. Set the URL to:
   ```
   https://your-domain.com/api/revalidate
   ```
3. Set the secret to match your `SANITY_WEBHOOK_SECRET` env var
4. Trigger on: document publish/unpublish events

## Step 6 — Custom Domain (optional)

In Vercel → Domains, add your domain and update DNS records as instructed. Vercel provisions SSL automatically.

## Ongoing Deployments

- Every push to `main` triggers an automatic redeploy
- Every content publish in Sanity triggers ISR revalidation via the webhook
- Preview deployments are created automatically for pull requests
