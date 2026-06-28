# Cloudflare Workers Deployment

Target domain: `scripts.imean.fyi`

Deployment uses Cloudflare Workers Static Assets for the Vite `dist` output. The Worker is assets-only; no Worker entrypoint is required unless server-side behavior or API routes are added later.

Commands:

```sh
npm run deploy:dry-run
npm run deploy
```

`wrangler.jsonc` runs `npm run build` before deploy, serves `./dist`, and uses `not_found_handling = "single-page-application"` so deep links return `index.html`.

Cloudflare requirements:

- `imean.fyi` must be an active Cloudflare zone on the account used by Wrangler.
- `scripts.imean.fyi` must not already have a conflicting CNAME record.
- The deploy command creates the custom domain route and Cloudflare-managed certificate.
