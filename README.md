# ianlloyd.com

Single-page personal site: four sticky-scroll cards — Ian Lloyd, About me, Track record, Work with me.

## Structure

```
index.html                           markup, styles and script (all inline)
assets/img/ian-lloyd-portrait.webp   portrait in the framed panel on the first card
CNAME                                tells GitHub Pages the custom domain
.github/workflows/deploy.yml         deploys the site to GitHub Pages on push to main
```

Palette: petrol, chalk and white, with burnt orange as the single accent. Type: Bricolage Grotesque for headings, Instrument Sans for everything else.

The booking link (`https://calendly.com/ian-ianlloyd/30min`) is on the "Book a call" buttons on the first, About and Work with me cards.

## Deploying to ianlloyd.com

1. **GitHub Pages**: in the repo's Settings → Pages, set Source to "GitHub Actions" (the included workflow handles the build/deploy — there's no build step, it just publishes the repo as-is). Done.
2. `main` is the default branch, and the `github-pages` environment allows deploys from it — the workflow deploys automatically on every push. Done.
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
