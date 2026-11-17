# MyRadar 360 — Website

Marketing website for **MyRadar 360**, a social and media intelligence platform.
*See beyond the noise. Understand the signals.*

This is a lightweight product website (not the web application). It has five pages — **Home, Features, Industries, About, Contact** — plus a 404 page.

## Run locally

Requirements: Node.js 22 LTS and npm.

```bash
npm install
npm start          # http://localhost:4200
```

## Production build

```bash
npm run build      # output: dist/myradar-360-website/browser/
```

Upload the contents of `dist/myradar-360-website/browser/` to any static host. Configure an SPA fallback so every path serves `index.html`
(Netlify: `/* /index.html 200` in `_redirects`; Nginx: `try_files $uri /index.html;`; Vercel/Firebase: a rewrite to `/index.html`).

## Before launch

Edit **`src/app/core/site.config.ts`**:

| Setting | What to change |
|---|---|
| `url` | Your real domain (used for canonical and Open Graph tags) |
| `contact.email`, `contact.sales`, `contact.location`, `contact.hours` | Real contact details (currently placeholders) |
| `contactEndpoint` | URL that receives the contact form as a JSON `POST` `{ name, email, company, message }`. While empty, the form runs in **demo mode**: it validates and shows a thank-you message but sends nothing. |

Also replace `https://www.example.com` in `public/robots.txt` and `public/sitemap.xml`. Optionally replace `public/og-image.png` (1200×630 social preview).

## Project structure

```
src/app/
├── core/          site.config.ts (settings), seo.service.ts (titles/meta/canonical), contact.service.ts, theme.service.ts (light/dark)
├── content/       content.ts — all website copy (features, industries, steps, FAQ…) in one place
├── layout/        header (floating bar, mobile menu, theme toggle), footer
├── pages/         home, features, industries, about, contact, not-found
└── shared/
    ├── components/  logo, icon, theme-toggle, hero-visual (radar hub), insight-panel (sample product views),
    │                feature-showcase, steps-timeline, industry-carousel, spot, section-header, page-hero,
    │                cta-band, contact-form, faq
    ├── interaction/ swipe.ts — shared pointer swipe/drag + autoplay controller
    ├── directives/  reveal (scroll fade-in), count (count-up for real values) — both respect reduced motion
    └── icons/       local icon set (Lucide geometry, ISC licence)
src/styles.scss    design tokens (light / dark / inverse), typography, layout, buttons, surfaces, motion
public/            favicon.svg, og-image.png, robots.txt, sitemap.xml
```

To change wording, edit `src/app/content/content.ts` — pages render from it.

## Design

- **Story:** Citizen Support on X. Citizens tag a government office or send it a DM; MyRadar 360 turns each message into a ticket with an owner, a deadline and a reply on X. Monitoring across ten sources is the supporting capability.
- **Logo:** `public/brand/logo-mark.png` (target mark) and `public/brand/logo-full.png` (full logo). The header wordmark “MY RADAR 360®” is set in text so it stays sharp in light and dark themes. Favicons: `public/favicon.png`, `public/apple-touch-icon.png`, `public/brand/icon-*.png`. Social preview: `public/og-image.png`.
- **Colours:** taken from the logo — green/teal → blue → purple — as CSS tokens in `src/styles.scss` for both themes.
- **Visuals:** hand-built HTML/SVG — the hero ticket flow, the animated “how it works” diagram, the 7-step water-complaint walkthrough and the six product panels. All tickets, handles and figures in them are labelled *Sample*.
- Copy lives in `src/app/content/content.ts`. See `REDESIGN-GUIDE.md` for the design system and interactions.

## Quality notes

- Routing with lazy-loaded pages, scroll restoration and anchor links (footer links jump to the right feature/industry).
- SEO: per-page title, description, canonical, Open Graph/Twitter tags, `robots.txt`, `sitemap.xml`.
- Accessibility: semantic landmarks, skip link, keyboard-friendly menu, visible focus, labelled form fields with error messages, native `<details>` FAQ, reduced-motion support.
- Dependencies: Angular only, plus two font packages. Initial load is about 113 kB compressed; below-the-fold homepage sections load on demand.


## Light / Dark theme

A Light / Dark switch sits in the main navigation and inside the mobile menu. On a first visit the site follows the device setting (`prefers-color-scheme`, dark if none); once a visitor uses the switch, the choice is saved in local storage (`myradar-theme`) and applied on every route and reload. An inline script in `src/index.html` applies the theme before the page paints, so there is no flash. All colours are tokens in `src/styles.scss`; the shared state lives in `src/app/core/theme.service.ts`.
