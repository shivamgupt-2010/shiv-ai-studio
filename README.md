# SHIV AI Web Studio & Developer Platform

The official web platform and developer studio for **SHIV AI**, directly comparable to industry benchmarks such as **Google AI Studio** and **Mistral Platform**.

Built by SHIV Systems as an uncompromised, sovereign intelligence platform.

---

## 🌟 Features

- **Sovereign Brand Architecture**: Integrates the official animated SHIV brand signature with glowing squircle, cyber monogram "S", and smooth startup intro.
- **Unified Multi-Service AI Playground**:
  - **Chat Studio**: High-reasoning conversational intelligence with live parameter controls (Temperature, System Prompt), SSE streaming tokens, and memory inspector.
  - **Image Studio**: Photorealistic and anime text-to-image synthesis powered by SHIV-Vision-FLUX with variable aspect ratios (1:1, 16:9, 9:16).
  - **Voice Studio**: Zero-latency neural voice synthesis with multilingual English and Hindi voices (Christopher, Jenny, Madhur, Swara), pitch modulation, and MP3 download.
  - **Reel Studio**: Autonomous storyboard and script generation for narrative video reels.
  - **Live SDK Hub**: Real-time code snippets in cURL, Python (`openai` SDK drop-in), and TypeScript for every studio action.
- **Cryptographic API Key Management**:
  - Instant generation of `shiv_sk_free_...` and `shiv_sk_live_...` credentials.
  - **Credit Protection Engine**: Hard-capped rate limiting on free keys (**10 RPM / 250 daily requests**) to safeguard against credit exhaustion.
  - Real-time key revocation and quota tracking.
- **SHIV Native Auth**:
  - Deeply integrated with centralized SQLite `shiv_dev.db` using Argon2id password hashing and HS256 JWT sessions.
- **SEO & Social Optimization**:
  - Full Schema.org JSON-LD structured data (`SoftwareApplication`, `Organization`, `WebSite`).
  - OpenGraph cards, Twitter cards, dynamic `sitemap.xml`, and `robots.txt`.
- **Zero-Config Vercel Hosting**:
  - Pre-configured `vercel.json` with security headers and caching policies.

---

## 🚀 Quickstart (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run the Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access SHIV AI Studio.

---

## 📦 Deployment to Vercel

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial commit of SHIV AI Studio"
   gh repo create shivamgupt-2010/shiv-ai-studio --public --source=. --push
   ```
2. Import the repository in your [Vercel Dashboard](https://vercel.com/new).
3. Set the environment variable:
   - `NEXT_PUBLIC_SHIV_API_URL`: Your live FastAPI backend URL (e.g. `https://shiv-ai-server.onrender.com`).
4. Click **Deploy**.

---

## 🛡️ License & Sovereign Rights

Copyright © 2026 SHIV Systems. All rights reserved.
