# ianlloyd.com

Single-page personal site: five sticky-scroll cards — Ian Lloyd, About Me, Projects, Sectors, Work With Me.

## Structure

```
index.html                       markup, styles and script (unchanged design, all inline)
assets/img/ian-lloyd-portrait.webp   portrait on the "Ian Lloyd" card
assets/img/work-with-me-poster.jpg   poster frame for the background video
assets/video/work-with-me-bg.mp4     background video on "Work With Me"
CNAME                             tells GitHub Pages the custom domain
.github/workflows/deploy.yml      builds + deploys the site to GitHub Pages on push to main
```

The booking link (`https://calendly.com/ian-ianlloyd/30min`) is wired on both the "Book a call" circle and the About Me CTA.

## Deploying to ianlloyd.com

1. **GitHub Pages**: in the repo's Settings → Pages, set Source to "GitHub Actions" (the included workflow handles the build/deploy — there's no build step, it just publishes the repo as-is).
2. Merge this branch into `main` — the workflow deploys automatically on every push to `main`.
3. **DNS** — at your domain registrar/DNS provider, add these records for ianlloyd.com. Do **not** touch your existing MX records — email keeps working exactly as it does today.
   - Apex domain (`ianlloyd.com`): four `A` records pointing at GitHub Pages' IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
     (If your DNS provider supports ALIAS/ANAME records instead, you can use one of those pointed at `<your-github-username>.github.io` instead of the four A records.)
   - `www` subdomain: a `CNAME` record pointing at `<your-github-username>.github.io`.
4. Back in Settings → Pages, enter `ianlloyd.com` as the custom domain (this repo's `CNAME` file already has it set) and wait for DNS to verify, then enable "Enforce HTTPS".

## Later

- Add client logos to the Sectors tiles (`.sectors .nodes li`) — no changes made yet, noted for a follow-up.
