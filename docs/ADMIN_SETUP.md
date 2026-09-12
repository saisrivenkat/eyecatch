# Admin Dashboard — Setup

The admin lives at `/admin`. From there you can create, edit, and delete projects, and upload images / videos directly to Vercel Blob. Public pages (`/`, `/work/[slug]`) read from the same store.

## 1. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
ADMIN_PASSWORD=<your password>
SESSION_SECRET=<random string, 16+ chars>
BLOB_READ_WRITE_TOKEN=<from Vercel Blob>
```

Generate a session secret:

```bash
openssl rand -base64 32
```

## 2. Enable Vercel Blob

1. Open your project on Vercel
2. Storage → Create Database → **Blob**
3. Connect it to the project — Vercel auto-adds `BLOB_READ_WRITE_TOKEN` to all environments
4. Pull the token to your local machine: `vercel env pull .env.local`

## 3. Set the env vars on Vercel

Project Settings → Environment Variables. Add `ADMIN_PASSWORD` and `SESSION_SECRET` (production + preview + development).

## 4. Enable Cloudflare R2 (for video uploads)

Vercel Blob's 1 GB free egress is fine for images and metadata but disappears fast with videos. R2 has 10 GB free storage + **unlimited free egress**, so videos go to R2 while everything else stays in Vercel Blob.

1. cloudflare.com → R2 → **Create bucket** (e.g. `eyecatchmedia`)
2. Bucket → Settings → enable **Public access**, copy the `https://pub-<hash>.r2.dev` URL
3. Bucket → Settings → **CORS Policy** → add:

   ```json
   [
     {
       "AllowedOrigins": [
         "https://<your-vercel-domain>.vercel.app",
         "https://*.vercel.app",
         "http://localhost:3000"
       ],
       "AllowedMethods": ["PUT", "GET", "HEAD"],
       "AllowedHeaders": ["*"],
       "ExposeHeaders": ["ETag"],
       "MaxAgeSeconds": 3000
     }
   ]
   ```

4. R2 → **Manage R2 API Tokens** → Create API Token → "Object Read & Write" scoped to the bucket. Copy the **Access Key ID** and **Secret Access Key** (shown once).
5. Add these to `.env.local`:

   ```
   R2_ACCOUNT_ID=<the subdomain in your S3 endpoint URL>
   R2_BUCKET=eyecatchmedia
   R2_ACCESS_KEY_ID=<from step 4>
   R2_SECRET_ACCESS_KEY=<from step 4>
   R2_PUBLIC_BASE_URL=https://pub-<hash>.r2.dev
   ```

6. Mirror those env vars in Vercel Project Settings → Environment Variables for production + preview.

## 5. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000/admin](http://localhost:3000/admin) — you'll be redirected to `/admin/login`.

## How storage works

- **Project metadata** — single JSON file at `eyecatch/projects.json` in your Vercel Blob store. On first read, the static seed in `src/data/projects.ts` is written into it so existing projects show up immediately.
- **Images** — uploaded directly to Vercel Blob from the browser.
- **Videos** — uploaded directly to Cloudflare R2 from the browser via a presigned PUT URL the server hands out (`/api/admin/r2-sign`). Only the public R2 URL is stored back in `projects.json`. Videos never pass through the Vercel function, so they're not limited by the 4.5 MB serverless body cap.

## Security

Never commit `.env.local` or paste credentials into source files, commit messages, chat tools, or PR descriptions. If a credential leaks, rotate it immediately in the dashboard that issued it (Vercel for Blob, Cloudflare for R2).

## Resetting

To start from scratch, delete `eyecatch/projects.json` from the Vercel Blob dashboard. The next page load will reseed from `src/data/projects.ts`.
