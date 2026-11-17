# MyRadar 360 — Redesign guide (November 2026)

> **Update (17 Nov 2026): Citizen Support on X.** The site now tells the story from the “Citizen Support on X: Ticketing Use Case” brief. Home: problem → how it works (`flow-diagram.ts`, from the brief’s flow chart) → the Ward 14 water complaint (`story-walkthrough.ts`, 7 steps, swipe/keys/autoplay) → what the team gets (6 features, `insight-panel.ts`) → guardrails → who it’s for → monitoring (supporting) → get started → contact. New hero visual: `ticket-hero.ts`. New logo assets in `public/brand/`. Content: `content.ts` (`PROBLEMS`, `ENTRY_POINTS`, `LANGUAGES`, `TOPICS`, `SLA`, `STORY`, `FEATURES`, `GUARDRAILS`, `INDUSTRIES` as public-sector teams). Figures used are only those in the brief (3 entry points, 13 languages, 60 min / 48 h SLA defaults, 5 named topics + 9 more).

A presentation-layer redesign. Routes, page copy (`content/content.ts`), the contact form and `ContactService`, `SeoService`, `site.config.ts`, icons and all dependencies are unchanged. No packages were added.

Interaction quality and motion language were modelled on the Inbox Media reference source (token-driven theming, a pre-paint theme script, IntersectionObserver reveals, a pointer-drag carousel, flowing SVG beams around a hub). Its code, colours, copy and branding were **not** reused. Every visual here is original to MyRadar 360.

## Final positioning (November 2026)

- TV is not offered: the TV news service and all TV wording were removed (9 core services: 6 major platforms + 3 news & media).
- Brand name in the logo is written **MYRADAR 360** (no space); `logo-full.png` and `og-image.png` were updated to match.
- No count stats or service numbering anywhere in the core services; groups are **Major platforms** and **News & Media**.
- **Intelligent Engagement** replaces “X Messaging” as the name. Page `/engagement`: hero “Beyond channels. Towards intelligent engagement.”, five capability cards + “your next use case”, “Designed to evolve”, how it works with the core services (Listen → Spot → Act → Resolve → Measure), then **Platform in action — Real-world applications** with the citizen support on X application and all its detail.
- Copy for these lives in `CAPABILITIES`, `CONNECT` and `APPLICATIONS` in `content.ts`.

## Restructure (services first)

- The **10 core services** are now the main story. They live in `SERVICES` in `content.ts` (id, name, short label, group, brand logo key, colour, one-line text, short detail).
- **Home** follows the brief: Hero (Explore Services → `#services`, Get Started → `/contact`) → value → services grid (filter: all / social / news & TV) → integrations → X Messaging card → 3-step timeline → why → CTA.
- **/features** is now the Services page: sticky rail of the 10 services, one card per service (anchors `#x`, `#youtube` … `#news-on-x`), tools included with every service, supported platforms, X Messaging card.
- **/x-messaging** holds all the ticketing content that used to be on Home and Features: problem, three entry points, flow diagram, 13 languages, the 7-step walkthrough, the scroll-driven feature showcase, feature details (anchors `#tickets` … `#rating`) and guardrails.
- Nothing was removed: every X Messaging feature, guardrail, language and SLA detail is on the new page.

## Design system — `src/styles.scss`

The stylesheet was rewritten as a single token layer. Every colour is a CSS custom property keyed on `data-theme` on `<html>`.

| Token group | Examples |
|---|---|
| Surfaces | `--bg`, `--bg-alt`, `--surface`, `--surface-2`, `--surface-glass`, `--night` (feature bands) |
| Text | `--fg` (≈16:1), `--fg-2` (≈9:1), `--fg-3` (≥5.7:1) in both themes |
| Accents | `--accent` (decorative mint), `--accent-ink` (text-safe mint), `--violet-ink`, `--focus` |
| Data | `--pos`, `--neu`, `--neg` (sentiment) |
| Shape / motion | `--radius*`, `--shadow*`, `--ease`, `--ease-out`, `--dur*` |
| Type | Manrope (display + UI), Newsreader italic for accent words; `clamp()` scale `--fs-display … --fs-lead` |

There are three scopes: light (default tokens), `[data-theme='dark']`, and `.inverse`. `.inverse` is an always-dark cinematic scope, used for the "Why MyRadar 360" band, the CTA band and the "What happens next" panel.

## Light / Dark theme

- **Pre-paint:** an inline script in `src/index.html` sets `data-theme` before Angular boots, so there is no flash of the wrong theme. The order is: saved choice, then `prefers-color-scheme`, then dark.
- **`core/theme.service.ts`** is the single source of truth. Its `theme` signal, `isDark` and `actionLabel` are computed. The service follows OS changes until the visitor chooses, then persists the choice in `localStorage` (`myradar-theme`). It also updates `<meta name="theme-color">` and adds a short `theme-anim` cross-fade (skipped for reduced motion).
- **`shared/components/theme-toggle.ts`** is one component used in the desktop bar (icon only) and the mobile menu (icon + label). Its accessible name describes the action ("Switch to light theme").

## Motion

- **Reveal (`[mrReveal]`, delay in ms):** fade + rise via IntersectionObserver, once only. The hiding class is only added in the browser, so content is never invisible without JS.
- **Count (`[mrCountTo]`):** used only for real counts taken from the content (6 capabilities, 6 industries, 4 steps).
- **Hero:** six source nodes with data travelling inward along curved beams. The core view pulses, an orbit and radar sweep rotate, and floating insight cards are labelled "Sample view". It pauses off-screen, and cards adapt with container queries.
- **Steps timeline:** a signal line fills with scroll progress and lights each step.
- Only transform/opacity are animated. Under `prefers-reduced-motion: reduce`, animation is removed, autoplay is off and everything shows in its final state.

## Scroll-driven sections (laptop and desktop)

On screens at least 960px wide and 680px tall, the homepage feature list (01–06) and the water-complaint walkthrough (1–7) are scroll-driven: the section pins below the header and each scroll step moves to the next item, then the page continues. Clicking an item, arrow keys and swipes scroll the page to that item. Logic: `shared/interaction/scroll-steps.ts` (sticky pin + a spacer for the scroll length). Phones and short screens keep swipe + autoplay.

## Swipe / drag

`shared/interaction/swipe.ts` holds the shared pointer-event logic for mouse, pen and touch:

- direction lock (vertical gestures fall through to page scroll; `touch-action: pan-y`)
- edge resistance
- release threshold of `min(80px, 12% of width)`
- click suppression after a drag

`Autoplay` in the same file accumulates time only while the component is visible, the tab is in view and nothing holds it (hover, focus, drag). It is disabled for reduced motion.

| Section | Interaction |
|---|---|
| Home → Key features (`feature-showcase.ts`) | Feature list (click / arrow keys / Home / End), swipe or drag the product panel, prev/next, dots, 7 s autoplay |
| Home → Industries (`industry-carousel.ts`) | Industry tabs (roving focus), swipe/drag slides, ← → keys, prev/next, live counter, 6.5 s autoplay; inactive slides are `inert` |
| Features → "Also included" (≤639px) | Native CSS scroll-snap rail (keyboard-focusable region) |
| Features → section nav, Home/Industries tab rails (mobile) | Horizontally scrollable chip rails; Features nav has scroll-spy |

## Product visuals (all sample data, labelled)

`insight-panel.ts` renders one dashboard view per feature:

- a mention stream (including a Hinglish post)
- a sentiment donut with language confidence
- a trend spike vs. baseline
- share of voice
- alerts with severity
- a scheduled executive report

These panels are used on Home and on every Features section.

## Sources we monitor (added)

`SOURCES` in `content/content.ts` is the single list of the ten monitored sources: six social platforms (X/Twitter, YouTube, Instagram, Facebook, Reddit, LinkedIn) and four media streams (News web, Newspapers e-paper, Television, News on X). It feeds:

- the hero radar (ten nodes; social nodes are mint, media nodes violet)
- the new `shared/components/sources-grid.ts` section on Home (`#sources`) and Features
- the hero ticker
- the sample stream panel
- the monitoring feature copy
- the FAQ answer

Platforms are named in text with neutral icons. No third-party logos are used. To change the list, edit `SOURCES`.

## Files

**Added:** `shared/components/{sources-grid, theme-toggle, insight-panel, feature-showcase, steps-timeline, industry-carousel}.ts`, `shared/interaction/swipe.ts`, `shared/directives/count.directive.ts`

**Rewritten / restyled:** `styles.scss`, `index.html` (pre-paint script), `app.ts`, `core/theme.service.ts`, `layout/{header,footer}.ts`, all `pages/*.ts`, `shared/components/{hero-visual, logo, page-hero, section-header, cta-band, spot, faq, contact-form (styles only)}.ts`, `shared/directives/reveal.directive.ts`

## Verification performed

- `npm ci` and `npm run build` (production): success, no warnings. Initial bundle is 425 kB raw / ~113 kB transferred. Below-the-fold home sections load with `@defer (on viewport)`.
- Headless Chrome on all 6 routes × light/dark × 320, 375, 768, 1024, 1440 and 1920 px: no horizontal overflow, no console errors, no content left hidden by reveals. A separate geometric check found no overlap between hero cards, nodes and headline at 12 widths from 320 to 1920 px.
- axe-core (WCAG 2.1 A/AA + best practice) on every route, both themes, desktop and mobile: 0 violations.
- Scripted interaction tests (43 checks) all pass:
  - theme default, toggle, persistence and every route
  - mobile menu (`aria-expanded`, Escape, focus return, inert when closed)
  - mouse drag, touch swipe, threshold snap-back, keyboard, autoplay pause/resume
  - reduced motion
  - form validation and demo submit
  - footer fragment links
  - page titles
- `npm test` is not configured in this project (no test target or spec files existed before the redesign).
