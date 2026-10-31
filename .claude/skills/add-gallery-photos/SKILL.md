---
name: add-gallery-photos
description: Process and add new boat photos to the svcourage.com photos.html gallery — resize convention, gallery file naming, raw-photo folders, placement in the grid, and which shots must not be used as lead images. Use whenever adding, resizing, renaming, or choosing photos for the site.
---

# Adding photos to the Courage gallery

- Raw/unprocessed source photos are **gitignored**, kept locally only: `assets/img/aerial/`, `assets/img/exterior/`, `assets/img/interior/`, `assets/img/systems/`. Only processed output is tracked in git. Rename raw camera files (e.g. `20261019_083346.jpg`) to short descriptive Title Case names (e.g. `Saloon Galley Forward.jpg`) when processing them.
- Processed gallery images live in `assets/img/gallery/` as **pairs**: `<category>-NN.jpg` (thumb) + `<category>-NN-full.jpg` (full). Categories so far: `aerial`, `exterior`, `interior`, `systems`. Continue numbering from the highest existing NN in that category.
- Resize convention (confirmed through interior-31, added 2026-10-23): **full = long side 1800px, thumb = long side 900px**, JPEG `quality=82, optimize=True`, always `ImageOps.exif_transpose()` first to fix phone-photo rotation. Pillow may not be installed on this machine — `python -m pip install pillow`. Example (PIL):
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
- **Boat was hauled out** (out of the water) in late Oct 2026. Haul-out/bottom shots are good for the Specs/Systems section and the Hulls & Bottom video tour (hull condition, bottom paint evidence) but should **not** be used as hero/lead/ad images — they read as "boat out of the water," not aspirational.
- Commit photo additions in their own commit, separate from other site changes.
