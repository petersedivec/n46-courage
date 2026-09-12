# Courage — for-sale site

Static site for Courage, a 2023 Nautitech 46 Open, built to deploy on GitHub Pages —
same pattern as sailingwithsage.com and Wired & Wrenched: plain HTML pages, one shared
`assets/js/nav.js` that injects the header/nav/footer, and a single `assets/js/config.js`
holding every brand value (price, contact info, links) so nothing is hard-coded per page.

## Pages
- `index.html` — Description (summary, layout diagram, owner's write-up)
- `specs.html` — Specs & Inventory
- `photos.html` — Photos & Videos (Google Photos, Kindred Courage, YouTube embeds, Instagram embeds)
- `info.html` — N46 Open Information (manufacturer documents, video reviews)
- `contact.html` — Contact

## To deploy on GitHub Pages
1. Push this folder's contents to a new repo, e.g. `petersedivec/courage-for-sale`.
2. Repo Settings → Pages → Deploy from branch → `main` / `(root)`.
3. Site goes live at `https://petersedivec.github.io/courage-for-sale/`.

## Custom domain later
Same pattern as sailingwithsage.com:
1. Buy the domain (Squarespace, or wherever).
2. Add a `CNAME` file at the repo root containing just the domain, e.g. `sellcourage.com`.
3. DNS: A records for the apex domain → GitHub Pages IPs
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (and a `CNAME` record for `www` → `<username>.github.io` if using a `www` subdomain).
4. In GitHub Pages settings, set the custom domain and enable "Enforce HTTPS" once DNS propagates.

## Still open
- [ ] Documents on the N46 Open Info page — drop the 4 PDFs in a `docs/` folder and swap the
      "Upload pending" placeholders in `info.html` for real download links (see the note on that page)
- [ ] Owner's write-up on the Description page — replace the placeholder once the text is ready
- [ ] Contact form — replace `REPLACE_WITH_FORM_ID` in `contact.html` (and `formAction` in
      `assets/js/config.js`) with a real Formspree endpoint
- [ ] Official Nautitech general-arrangement plan — swap in for the schematic diagram on the
      Description page once available
