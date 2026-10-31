# Courage — for-sale site (svcourage.com)

Static marketing site for **Courage**, a 2023 Nautitech 46 Open catamaran for sale FSBO (no broker), currently in Hartman Cove, Grenada. Deployed on GitHub Pages at the custom domain **https://svcourage.com**. This file is the handoff context for working on the site/marketing project locally — read it before making changes.

## Stack & deploy
- One shared `assets/js/nav.js` injects the header/nav/footer on every page.
- `assets/js/config.js` is the **single source of truth** for brand values (price, contact info, location, nav links, external links). Edit values there, not hard-coded per page.
- `CNAME` file holds the custom domain. GitHub Pages serves from `main` / `(root)`.
- Owner pushes to GitHub himself — **do not `git push` unless explicitly asked.** Commit locally; he reviews and pushes.

## Important gotcha: price/contact appear in two places
`config.js` drives the live JS-rendered values via `data-cfg="..."` attributes, **but** the static HTML also contains literal fallback text matching those values (search engine crawlers and the pre-JS paint see the static text, not the JS override). Confirmed locations as of 2026-10:
- `index.html` — hero: `<span data-cfg="askingPrice">$650,000 USD</span>` inside `h1.hero-price`, plus `<s data-cfg="previousPrice">$695,000</s>`
- `contact.html` — same pair inside `.price-amount` / `.price-was`

**Price-reduced treatment (added 2026-10-23):** `config.js` has `previousPrice`. When it is non-empty, the old price shows struck-through above the current price with a brass "Price reduced" badge (elements marked `data-price-reduced`). Set `previousPrice: ""` to remove the badge + struck price everywhere (nav.js strips them); also delete the static `data-price-reduced` markup if retiring it for good.

**When the price (or any config value with a static-text twin) changes, update both `config.js` AND the literal text in the HTML.** Grep for the value first to catch every occurrence:
```
grep -rn "650,000\|695,000" *.html assets/js/config.js
```

## Images
- Adding, resizing, or choosing photos: use the `add-gallery-photos` skill (`.claude/skills/add-gallery-photos/SKILL.md`) — resize convention, naming, gallery placement.
- **Never use haul-out/bottom shots as hero/lead/ad images** — they read as "boat out of the water," not aspirational.

## SEO (done, as of 2026-10)
- `robots.txt` + `sitemap.xml` at repo root. Canonical/Open Graph/Twitter Card meta tags added to every page's `<head>` (self-referencing canonical, e.g. `index.html` → `https://svcourage.com/`).
- Google Search Console: verified, sitemap submitted, indexing requested on all 7 pages.
- Bing Webmaster Tools: verified, all 7 URLs submitted.
- **Known non-issues, don't "fix" these:**
  - GSC sitemap status showing "Couldn't fetch" — a known harmless GitHub Pages quirk; the sitemap is valid and live.
  - GSC "Alternate page with proper canonical tag" / "Validation failed" on `index.html` — expected behavior. `index.html` correctly self-canonicalizes to the root URL `https://svcourage.com/`, so Google folding it in rather than indexing both is working as intended.

## Git/commit discipline
- Always check `git status --porcelain` before editing — the owner sometimes has his own uncommitted edits in progress (e.g. drafts under `Claude outputs/`). Keep his edits and any automated edits in **separate commits**.
- Never `git push` unless asked. Never `--amend` existing commits. Never `-i`/interactive flags.
- `Claude outputs/` holds marketing drafts (FB post text, CatamaranSite write-up, screenshots) — working documents, not site content.
- `docs/` holds manufacturer PDFs (brochure, spec sheet, polars, owner's manual) linked from `info.html`.

## Marketing status (this section is the live copy — keep it current here)
As of 2026-10-24, this repo file is the source of truth for marketing/channel status (the "Courage Marketing Channels - Status & Plan" doc in the "Boat Upgrades & Gear" Claude.ai Project is now a historical snapshot, last updated 2026-10-24, and won't be kept current going forward).

**Approach:** FSBO, no broker. Declined a Cruisers Co pilot deal, a BVI Yacht Sales exclusive-listing pitch (10% commission), and the YachtWorld/boats.com path (confirmed by Boats Group: non-US-located boats require a broker there; a ~$1,000 flat-fee broker-assisted ad is the paid workaround, currently skipped in favor of targeted social ads).

**Live channels:** svcourage.com (this site) · CatamaranSite.com / YachtSite.com · Sailboatlistings.com (syndicated from CatamaranSite, not a separate post) · TheYachtMarket.com (Basic listing, BoatID 3315730) · Facebook groups (Nautitech Owners, Kids4Sail, Catamaran Sale, Catamarans for Sale Worldwide by Owners) · Cruisers Forum · Multihulls-4Sale.com · CatamaransForSale.net.

**Decided against (don't re-research unless something changes):** BoatTrader.com and boats.com/YachtWorld direct (US-location-only policy), Boat24.com (same parent co. as boats.com, redirects into it), BoatsFSBO.com / "Jodie Brooks" cold-email (scam pattern), EasyMLS, Rightboat.com (FSBO capped at $50k boats), Yachtr.com (broker-oriented/IYBA), Scanboat.com (Europe-only audience), Classificadosonline.com (Brazilian general classifieds, not yacht-specific), broad-term Google Ads (budget doesn't compete with brokerage-scale spend), TheYachtMarket/Apollo Duck paid upgrade tiers (skipped in favor of Basic/free tiers).

**In progress / next up:**
- Apollo Duck — post on the free tier (confirmed to exist).
- Facebook/Instagram paid boost — needs a dedicated FB Page for the boat first (ads can't run from a personal profile or boost a group post). Plan: Meta Ads Manager, "Traffic" objective → svcourage.com, interest targeting (sailing/catamaran/liveaboard/Lagoon/Fountaine Pajot/Outremer), US/Canada/UK/Europe geography, Advantage+ placements, ~$15–20/day for 7–10 days as a test.
- Video tours (photos.html `#tours` section): **Interior tour** shot Oct 2026 as a vertical video, linked from Google Photos (`links.interiorTour` in config) because Google Photos can't be embedded and YouTube treated the vertical upload as a Short. Swap to an embedded YouTube player later if re-uploaded. **Topside tour** and **Hulls & Bottom tour** added 2026-10-25 after the wax & polish (`links.topsideTour`, `links.hullsTour`), also Google Photos links; order on the page is Interior, Topside, Hulls. A 4th Google album, "Sailing Videos & Tours" (`links.googlePhotosVideos`), is on the photos page.
- Sort and use the new haul-out-period photos (see "Image conventions" above for where haul-out shots should and shouldn't go).
- **Price dropped from $695,000 to $650,000 on svcourage.com on 2026-10-23** (config + static HTML + "Price reduced" badge; FB post draft in `Claude outputs/` updated). Channels updated to $650K as of 2026-10-24: CatamaranSite/YachtSite, Nautitech Owners group/forum, CatamaransForSale.net. **Still at $695K — update:** TheYachtMarket BoatID 3315730, other FB group posts, Cruisers Forum, Multihulls-4Sale, Apollo Duck (when posted); check whether Sailboatlistings synced from CatamaranSite. Keep public framing neutral/confident, don't editorialize the price change in post copy.
- Marina flyers, location-specific FB groups (Grenada Cruisers, Caribbean Multihull Sailors, ARC+/World ARC alumni), targeted Craigslist posts — all free, not yet done.

---
*Generated 2026-10-24 from the working session on this project. This file (both the site/code conventions and the marketing status section above) is now the live, maintained copy — update it directly as things change rather than relying on the claude.ai Project doc.*
