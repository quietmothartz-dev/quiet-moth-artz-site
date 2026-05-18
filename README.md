# Quiet Moth Artz Website

Launch-ready Quiet Moth Artz website built with Vite + React, hosted for free on Cloudflare Pages, and editable through Sveltia CMS at `/admin`.

## Local Development

```bash
npm install
npm run dev
```

The local site usually opens at:

```text
http://127.0.0.1:5173/
```

## Build

```bash
npm run build
```

The production build outputs to:

```text
dist
```

## Cloudflare Pages Deployment

Use these Cloudflare Pages settings:

- Build command: `npm run build`
- Build output directory: `dist`

Deployment steps:

1. Push this project to GitHub.
2. Go to the Cloudflare dashboard.
3. Go to Workers & Pages.
4. Create application.
5. Choose Pages.
6. Connect your GitHub repository.
7. Select the Quiet Moth Artz repo.
8. Set build command to `npm run build`.
9. Set build output directory to `dist`.
10. Deploy.
11. Add custom domain `quietmothartz.org`.
12. Follow Cloudflare DNS instructions.
13. Verify SSL is active.

Cloudflare Pages will redeploy the site whenever content changes are committed to GitHub.

## Admin Editor

After deployment, open:

```text
https://quietmothartz.org/admin
```

or, before the custom domain is connected:

```text
https://YOUR-PROJECT.pages.dev/admin
```

For local development with Vite, open:

```text
http://127.0.0.1:5173/admin/index.html
```

The admin editor is powered by Sveltia CMS and reads:

```text
public/admin/config.yml
```

The editable website content lives in:

```text
src/content/siteContent.json
```

## Required GitHub + Sveltia CMS Auth Setup

The CMS config uses the Sveltia GitHub backend:

```yaml
backend:
  name: github
  repo: quietmothartz-dev/quiet-moth-artz-site
  branch: main
```

Because this site is hosted on Cloudflare Pages, not Netlify, you also need a Sveltia CMS Authenticator Worker for normal GitHub OAuth login.

If `base_url` is missing from `public/admin/config.yml`, Sveltia can fall back to the old Netlify-compatible OAuth flow. That is why the current popup goes to:

```text
api.netlify.com/auth?provider=github...
```

That Netlify popup is expected to fail on this Cloudflare Pages site. Do not add Netlify Identity, do not use `git-gateway`, and do not switch to `branch: master`.

## Deploy Sveltia CMS Authenticator on Cloudflare Workers

Follow these steps once, then the `/admin` login can use your Cloudflare Worker instead of Netlify.

1. Open the official Sveltia CMS Authenticator repo:
   https://github.com/sveltia/sveltia-cms-auth

2. Deploy it to Cloudflare Workers.
   Use the repo's Deploy to Cloudflare Workers button, or clone the repo and run:

   ```bash
   wrangler deploy
   ```

3. After deployment, copy the Worker URL from Cloudflare.
   It will look like:

   ```text
   https://YOUR-SVELTIA-AUTH-WORKER.workers.dev
   ```

4. Register a new GitHub OAuth App:
   https://github.com/settings/applications/new

5. Use these GitHub OAuth App values:

   - Application name: `Quiet Moth Artz CMS Auth`
   - Homepage URL: your Worker URL, for example `https://YOUR-SVELTIA-AUTH-WORKER.workers.dev`
   - Authorization callback URL: your Worker URL plus `/callback`, for example `https://YOUR-SVELTIA-AUTH-WORKER.workers.dev/callback`

6. After creating the GitHub OAuth App, copy:

   - Client ID
   - Client Secret

7. In Cloudflare, open the deployed Worker.

8. Go to Settings, then Variables.

9. Add these Worker environment variables:

   - `GITHUB_CLIENT_ID`: the GitHub OAuth App Client ID
   - `GITHUB_CLIENT_SECRET`: the GitHub OAuth App Client Secret
   - `ALLOWED_DOMAINS`: `quiet-moth-artz-site.pages.dev, quietmothartz.org`

10. Save the variables and redeploy the Worker if Cloudflare asks you to.

11. Update `public/admin/config.yml` by adding your real Worker URL under `backend`:

   ```yaml
   backend:
     name: github
     repo: quietmothartz-dev/quiet-moth-artz-site
     branch: main
     base_url: https://YOUR-SVELTIA-AUTH-WORKER.workers.dev
   ```

12. Commit and push that config change to GitHub.

13. Wait for Cloudflare Pages to redeploy the site.

14. Open:

   ```text
   https://quiet-moth-artz-site.pages.dev/admin/
   ```

15. Sign in with GitHub.

The CMS should now authenticate through your Cloudflare Worker instead of Netlify.

## Temporary Token Login Option

Sveltia also supports GitHub personal access token login. That can work for a solo owner, but for the clean Cloudflare Pages setup, use the Sveltia CMS Authenticator Worker above.

Reference docs:

- Sveltia GitHub backend: https://sveltiacms.app/en/docs/backends/github
- Sveltia CMS Authenticator: https://github.com/sveltia/sveltia-cms-auth
- Cloudflare React Pages guide: https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/

## What You Can Edit

Open `/admin`, choose `Website Content`, then open `Edit Quiet Moth Artz Site`.

Editable groups include:

- SEO title and meta description
- Site name
- Business tagline
- Email address
- Social links
- Navigation labels and links
- Hero headline
- Hero subheadline
- Hero buttons
- Services section title and intro
- All 6 service cards
- Portfolio section title and intro
- All 6 portfolio cards
- Hook Generator section title and promo copy
- Website package section title and intro
- All 3 website packages
- Why Work With Me title, paragraph, and checklist
- Contact section title and copy
- Footer copy

## How CMS Saves Changes to GitHub

When you save in Sveltia CMS:

1. Sveltia edits `src/content/siteContent.json`.
2. Sveltia commits that change to GitHub.
3. Cloudflare Pages detects the GitHub commit.
4. Cloudflare runs `npm run build`.
5. Cloudflare publishes the new version.

Most edits should appear live after the Cloudflare build finishes.

## Replacing Portfolio Images

In `/admin`:

1. Open `Website Content`.
2. Open `Portfolio`.
3. Open the portfolio card you want to edit.
4. Upload or choose `Project Image`.
5. Save.

Images are stored under:

```text
public/uploads
```

They are served from:

```text
/uploads/your-image-name.jpg
```

If a portfolio card has no image, the site shows the styled gradient placeholder.

## Updating Services, Packages, and Prices

In `/admin`:

1. Open `Website Content`.
2. Go to `Services` to edit service cards.
3. Go to `Website Packages` to edit package titles, descriptions, included items, and prices.
4. Save.

Keep package price fields as short text, for example:

- `Intro pricing available`
- `Contact for quote`
- `$500 starter special`

## Contact Form

The contact form does not use Netlify Forms or any backend service.

It opens a prefilled email to the address in:

```text
src/content/siteContent.json -> site.email
```

Current email:

```text
quietmothartz@gmail.com
```

## Hook Generator

The Hook Generator still runs in the browser with preset templates and randomization.

It does not use:

- Paid APIs
- OpenAI API keys
- Cloudflare Workers AI
- Netlify Functions
- Any backend

The visible Hook Generator copy is editable in `/admin`. The actual writing templates currently live in `src/main.jsx`.

## Troubleshooting `/admin`

### `/admin` does not load

Check:

- The project was built and deployed through Cloudflare Pages.
- `public/admin/index.html` exists.
- `public/admin/config.yml` exists.
- `public/_redirects` exists and includes the `/admin` rewrite.
- The deployed URL is `/admin`, not `/admin/config.yml`.
- Locally, use `/admin/index.html` because Vite may show the React app at `/admin`.

### `/admin` loads but cannot save

Check:

- `public/admin/config.yml` has the real GitHub repo value.
- The branch name matches your GitHub branch.
- `base_url` has been added under `backend` after deploying Sveltia CMS Authenticator.
- The Worker URL is correct and ends with `.workers.dev` or your custom Worker domain.
- Your GitHub OAuth App callback URL is the Worker URL plus `/callback`.
- The Worker has `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` set.
- `ALLOWED_DOMAINS` includes `quiet-moth-artz-site.pages.dev` and `quietmothartz.org`.
- The GitHub repo is not archived.
- You have permission to commit to the repo.

### Login opens `api.netlify.com/auth`

This means Sveltia is still using the default Netlify-compatible OAuth fallback because `base_url` is missing from the GitHub backend config.

Fix:

1. Deploy Sveltia CMS Authenticator to Cloudflare Workers.
2. Add your Worker URL as `base_url` under `backend` in `public/admin/config.yml`.
3. Commit and push.
4. Wait for Cloudflare Pages to redeploy.

### Edits save but the live site does not change

Check:

- Cloudflare Pages is connected to the same GitHub repo.
- Cloudflare build command is `npm run build`.
- Cloudflare build output directory is `dist`.
- The latest Cloudflare deployment finished successfully.
- You are not viewing an old cached browser tab.

### Portfolio image does not show

Check:

- The image was uploaded through the CMS.
- The image path starts with `/uploads/`.
- The file exists in `public/uploads`.
- The latest Cloudflare build completed.

## Important Limitations

- This is a free Git-based CMS setup. Saving content requires GitHub access.
- The first launch uses GitHub token login because it is the simplest reliable setup.
- OAuth login can be added later with the Sveltia CMS Authenticator on Cloudflare Workers.
- The Hook Generator templates are still code-based. The page copy is CMS-editable, but the random writing template logic is not exposed in the admin editor yet.
