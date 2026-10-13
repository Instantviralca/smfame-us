# SmFame US

Custom Next.js website for smfame.us — TikTok-first social media growth services for the United States.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production check
```

## Where to edit things

| What | File |
|---|---|
| Business facts: email, phone, city, refund window (72h), follower refill (30 days / 10,000), optional typical start time, review link | `lib/business.js` |
| Services, packages and prices | `lib/services.js` (`quantities`, `prices`, `popular`) |
| Hand-written copy for the top 6 service pages | `lib/service-content.js` |
| Homepage (TikTok-focused) | `app/page.js` |
| Free TikTok tools | `lib/tools.js`, `components/ToolWidgets.js`, `app/free-tools/` |
| Guides | `lib/guides.js` |
| Old WordPress → new URL redirects | `next.config.mjs` |
| Social share images (1200×630) | `public/og/` |

Prices for the 10 services that exist on the current live site were copied from the live shop on 2026-10-07 (`catalog: "live"` in `lib/services.js`). The other 10 services (TikTok comments, shares, auto, LIVE, comment likes; Instagram Story and Live views) still use sample prices — confirm them before launch.

## Before launch

- Connect the checkout to the payment gateway and order API (`components/CheckoutClient.js` is still a placeholder).
- The contact form opens the visitor's email app addressed to the support email; connect it to a form/CRM service if you want messages stored on the server.
- Add a real review source (e.g. Trustpilot) in `lib/business.js` once it exists — never add reviews that cannot be verified.
- Submit `https://smfame.us/sitemap.xml` in Google Search Console after going live.
