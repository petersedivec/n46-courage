# Courage — for-sale site

Static site for Courage, a 2023 Nautitech 46 Open, live at **https://svcourage.com** (GitHub Pages,
`main` / `(root)`, custom domain in `CNAME`). Same pattern as sailingwithsage.com and Wired & Wrenched:
plain HTML pages, one shared `assets/js/nav.js` that injects the header/nav/footer, and a single
`assets/js/config.js` holding every brand value (price, contact info, links).

## Pages
- `index.html` — Overview (hero, summary, key specs, layout diagram)
- `photos.html` — Photos & Videos (gallery lightbox, Instagram, YouTube, Google Photos)
- `specs.html` — Specs & Inventory
- `our-story.html` — Owners' story
- `info.html` — Factory Info (manufacturer PDFs in `docs/`, owners' group, reviews)
- `upgrades.html` — Upgrades & Repair History
- `contact.html` — Contact

See `CLAUDE.md` for working conventions (price/static-text gotcha, image processing, SEO notes,
commit discipline) and current marketing status.
