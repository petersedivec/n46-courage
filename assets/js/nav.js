/**
 * Courage — shared header/nav + footer injection.
 * Mirrors the sailingwithsage.com / Wired & Wrenched pattern: every page
 * carries empty #site-header / #site-footer mounts, and this file fills
 * them in from config.js so nav + contact info only ever live in one place.
 */
(function () {
  var CFG = window.COURAGE_CONFIG;
  if (!CFG) return;

  var activePage = document.body.getAttribute("data-page") || "";

  function navLinksHtml() {
    return CFG.nav
      .map(function (item) {
        var current = item.page === activePage ? ' aria-current="page" class="active"' : "";
        return '<a href="' + item.href + '"' + current + ">" + item.label + "</a>";
      })
      .join("");
  }

  var headerHtml =
    '<div class="topbar-inner">' +
    '<a href="index.html" class="brand">' +
    '<span class="brand-name">' + CFG.boatName + "</span>" +
    '<span class="brand-tag">' + CFG.boatType + "</span>" +
    "</a>" +
    '<nav class="primary-nav" aria-label="Site sections">' + navLinksHtml() + "</nav>" +
    '<span class="price-pill">' + CFG.askingPrice + "</span>" +
    '<button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">&#9776;</button>' +
    "</div>";

  var footerHtml =
    CFG.boatName + " — " + CFG.boatType + " &middot; " + CFG.location +
    " &middot; Details believed accurate but not warranted; buyer to verify via survey and sea trial.";

  var headerMount = document.getElementById("site-header");
  var footerMount = document.getElementById("site-footer");
  if (headerMount) {
    headerMount.innerHTML = headerHtml;
    headerMount.classList.add("topbar");
  }
  if (footerMount) {
    footerMount.innerHTML = footerHtml;
  }

  // Mobile nav toggle
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Fill in every element with data-cfg="path.to.value"
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var path = el.getAttribute("data-cfg").split(".");
    var val = CFG;
    for (var i = 0; i < path.length; i++) val = val ? val[path[i]] : undefined;
    if (val == null) return;
    if (el.tagName === "A" && el.hasAttribute("data-cfg-href")) {
      el.setAttribute("href", val);
    }
    el.textContent = val;
  });
  document.querySelectorAll("[data-cfg-href]").forEach(function (el) {
    var path = el.getAttribute("data-cfg-href").split(".");
    var val = CFG;
    for (var i = 0; i < path.length; i++) val = val ? val[path[i]] : undefined;
    if (val != null) el.setAttribute("href", val);
  });
})();
