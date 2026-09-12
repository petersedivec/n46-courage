/**
 * Courage — single-file brand config.
 * Edit values here to update contact info, price, and nav across every page.
 * Follows the same one-file config pattern used on sailingwithsage.com and
 * Wired & Wrenched — never hard-code these values into individual pages.
 */
window.COURAGE_CONFIG = {
  boatName: "Courage",
  boatType: "2023 Nautitech 46 Open",
  tagline: "A one-owner, bluewater-ready 2023 Nautitech 46 Open",
  askingPrice: "$725,000 USD",
  email: "svcourage46@gmail.com",
  phone: "+1 310-462-1343",
  phoneHref: "+13104621343",
  location: "Hartman Cove, Grenada",

  // TODO: replace with a real Formspree endpoint (same pattern as Wired & Wrenched)
  formAction: "https://formspree.io/f/REPLACE_WITH_FORM_ID",

  links: {
    googlePhotos: "https://photos.app.goo.gl/ojap5grEndkuaxhN7",
    kindredCourage: "https://www.kindredcourage.com",
    youtubeChannel: "https://www.youtube.com/@kindredcourage",
    instagram: "https://www.instagram.com/kindred.courage"
  },

  nav: [
    { label: "Description", href: "index.html", page: "description" },
    { label: "Specs & Inventory", href: "specs.html", page: "specs" },
    { label: "Photos & Videos", href: "photos.html", page: "photos" },
    { label: "N46 Open Info", href: "info.html", page: "info" },
    { label: "Contact", href: "contact.html", page: "contact" }
  ]
};
