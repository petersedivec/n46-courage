# Courage — for-sale site (svcourage.com)

Static marketing site for **Courage**, a 2023 Nautitech 46 Open catamaran for sale FSBO (no broker), currently in Hartman Cove, Grenada. Deployed on GitHub Pages at the custom domain **https://svcourage.com**. This file is the handoff context for working on the site/marketing project locally — read it before making changes.

## Stack & deploy
- Plain static HTML/CSS/JS, no build step, no framework.
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

## Pages
- `index.html` — Overview/description, hero, layout diagram, owner's write-up
- `specs.html` — Specs & Inventory
- `photos.html` — Photos & Videos gallery (lightbox), Google Photos / YouTube / Instagram embeds
- `our-story.html` — Owner's story
- `info.html` — N46 Open factory info, manufacturer PDFs (in `docs/`)
- `upgrades.html` — Upgrades & Repair History (chronological log)
- `contact.html` — Contact

## Image / gallery conventions
- Raw/unprocessed source photos are **gitignored**, kept locally only: `assets/img/aerial/`, `assets/img/exterior/`, `assets/img/interior/`, `assets/img/systems/`. Only processed output is tracked in git. Rename raw camera files (e.g. `20261019_083346.jpg`) to short descriptive Title Case names (e.g. `Saloon Galley Forward.jpg`) when processing them.
- Processed gallery images live in `assets/img/gallery/` as **pairs**: `<category>-NN.jpg` (thumb) + `<category>-NN-full.jpg` (full). Categories so far: `aerial`, `exterior`, `interior`, `systems`.
- Resize convention (confirmed through interior-31, added 2026-10-23): **full = long side 1800px, thumb = long side 900px**, JPEG `quality=82, optimize=True`, always `ImageOps.exif_transpose()` first to fix phone-photo rotation. Example (PIL):
  ```python
  from PIL import Image, ImageOps
  im = ImageOps.exif_transpose(Image.open(src))
  w, h = im.size
  full = im.resize((round(w*1800/max(w,h)), round(h*1800/max(w,h))), Image.LANCZOS)
  full.save(f'{cat}-{n}-full.jpg', quality=82, optimize=True)
  thumb = im.resize((round(w*900/max(w,h)), round(h*900/max(w,h))), Image.LANCZOS)
  thumb.save(f'{cat}-{n}.jpg', quality=82, optimize=True)
  ```
- Add new photos to the gallery grid in `photos.html` as a `<button class="gallery-thumb" data-full="..." data-alt="...">` entry, grouped near thematically related existing entries (e.g. the two starboard-head photos were placed right after the master-head photo).
- `assets/img/social-share.jpg` is the Open Graph / Twitter Card image (1200×900, from the aerial-06 shot) — referenced in every page's `<head>`.
- **Boat is currently hauled out** (out of the water) as of late Oct 2026 — new photos from this period exist but haven't been sorted/posted yet. Haul-out/bottom shots are good for the Specs/Systems section (hull condition, bottom paint evidence) but should **not** be used as hero/lead/ad images — they read as "boat out of the water," not aspirational.

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
- Sort and use the new haul-out-period photos (see "Image conventions" above for where haul-out shots should and shouldn't go).
- **Price dropped from $695,000 to $650,000 on svcourage.com on 2026-10-23** (config + static HTML + "Price reduced" badge; FB post draft in `Claude outputs/` updated). Still to do the same day: update every live channel (CatamaranSite/YachtSite — note Sailboatlistings may or may not auto-sync from it, check — TheYachtMarket BoatID 3315730, FB posts, Cruisers Forum, Multihulls-4Sale, CatamaransForSale.net, Apollo Duck). Keep public framing neutral/confident, don't editorialize the price change in post copy.
- Marina flyers, location-specific FB groups (Grenada Cruisers, Caribbean Multihull Sailors, ARC+/World ARC alumni), targeted Craigslist posts — all free, not yet done.

---
*Generated 2026-10-24 from the working session on this project. This file (both the site/code conventions and the marketing status section above) is now the live, maintained copy — update it directly as things change rather than relying on the claude.ai Project doc.*
