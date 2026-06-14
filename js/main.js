/* Buzz Cyber Cafe — modern interactions
   Works even though header/footer are injected asynchronously via fetch. */
(function () {
  "use strict";

  /* ---------- Header / footer partials with built-in fallback ----------
     Tries to fetch header.html / footer.html (works on a web server such as
     Live Server). If that fails — e.g. opening the file directly via file:// ,
     or a 404 — it injects the same markup from these constants so the header
     and footer ALWAYS appear. */
  var HEADER_HTML =
    '<header class="site-nav" id="siteNav">' +
      '<div class="site-nav__inner">' +
        '<a href="index.html" class="site-nav__brand">' +
          '<img src="images/LOGO.png" alt="Buzz Cyber Cafe logo">' +
          '<span>Buzz <b>Cyber Cafe</b></span>' +
        '</a>' +
        '<button class="site-nav__toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
            '<line x1="3" y1="6" x2="21" y2="6"></line>' +
            '<line x1="3" y1="12" x2="21" y2="12"></line>' +
            '<line x1="3" y1="18" x2="21" y2="18"></line>' +
          '</svg>' +
        '</button>' +
        '<ul class="site-nav__links" id="navLinks">' +
          '<li><a href="index.html">Home</a></li>' +
          '<li><a href="about.html">About</a></li>' +
          '<li><a href="index.html#Services">Services</a></li>' +
          '<li><a href="index.html#fairs">Pricing</a></li>' +
          '<li><a href="contact.html">Contact</a></li>' +
          '<li><a href="https://wa.me/919558898855" class="site-nav__cta" target="_blank" rel="noopener"><i class="fa fa-whatsapp"></i> WhatsApp</a></li>' +
        '</ul>' +
      '</div>' +
    '</header>';

  var FOOTER_HTML =
    '<footer class="agile-footer"><div class="container"><div class="footer-agileinfo">' +
      '<div class="footer-wthree-grid">' +
        '<h6>Buzz Cyber Cafe</h6>' +
        '<p>Your one-stop digital service centre in Rajkot for government forms, passport &amp; Aadhaar services, printing and 100&nbsp;Mbps high-speed internet.</p>' +
        '<div><span class="glyphicon glyphicon-map-marker"></span> 10-A, Aloukik Building, Kasturba Road, Rajkot, Gujarat 360001, India.</div>' +
        '<div><span class="glyphicon glyphicon-phone-alt"></span> +91-9558898855 &nbsp;|&nbsp; +91-9099784847</div>' +
      '</div>' +
      '<div class="footer-wthree-grid"><h3>Navigation</h3><ul>' +
        '<li><a href="index.html">Home</a></li>' +
        '<li><a href="about.html">About</a></li>' +
        '<li><a href="index.html#Services">Services</a></li>' +
        '<li><a href="index.html#fairs">Pricing</a></li>' +
        '<li><a href="contact.html">Contact</a></li>' +
      '</ul></div>' +
      '<div class="footer-wthree-grid w3social"><h3>Get in touch</h3><ul>' +
        '<li><a href="mailto:buzzcybercafe001@gmail.com"><i class="fa fa-envelope"></i> buzzcybercafe001@gmail.com</a></li>' +
        '<li><a href="https://wa.me/919558898855" target="_blank" rel="noopener"><i class="fa fa-whatsapp"></i> WhatsApp Chat</a></li>' +
        '<li><a href="#"><i class="fa fa-facebook"></i> Facebook</a></li>' +
        '<li><a href="#"><i class="fa fa-twitter"></i> Twitter</a></li>' +
      '</ul></div>' +
    '</div></div></footer>' +
    '<div class="copyw3-agile"><div class="container"><p>© <span id="year"></span> Buzz Cyber Cafe. All Rights Reserved · Design by <span>Dhruvrajsinh Zala</span></p></div></div>' +
    '<a href="https://wa.me/919558898855" class="fab-wa" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><i class="fa fa-whatsapp"></i></a>';

  function fill(el, file, fallback, done) {
    fetch(file)
      .then(function (r) { if (!r.ok) throw new Error("status " + r.status); return r.text(); })
      .then(function (html) { el.innerHTML = html; })
      .catch(function () { el.innerHTML = fallback; })
      .then(function () { if (done) done(); });
  }

  function loadPartials(done) {
    var h = document.getElementById("header");
    var f = document.getElementById("footer");
    var pending = (h ? 1 : 0) + (f ? 1 : 0);
    if (!pending) { if (done) done(); return; }
    var fin = function () { if (--pending <= 0 && done) done(); };
    if (h) fill(h, "header.html", HEADER_HTML, fin);
    if (f) fill(f, "footer.html", FOOTER_HTML, fin);
  }

  function setYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* --- Mobile nav toggle (event delegation so it survives async inject) --- */
  document.addEventListener("click", function (e) {
    var toggle = e.target.closest && e.target.closest("#navToggle");
    if (toggle) {
      var links = document.getElementById("navLinks");
      if (links) {
        var open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      }
      return;
    }
    // close menu when a link is tapped
    if (e.target.closest && e.target.closest("#navLinks a")) {
      var l = document.getElementById("navLinks");
      if (l) l.classList.remove("open");
    }
  });

  /* --- Sticky nav shadow on scroll + highlight active link --- */
  function onScroll() {
    var nav = document.getElementById("siteNav");
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function markActive() {
    var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll("#navLinks a").forEach(function (a) {
      var href = (a.getAttribute("href") || "").toLowerCase();
      if (href === here || (here === "" && href === "index.html")) a.classList.add("active");
    });
  }

  /* --- Scroll reveal --- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* --- Service gallery + list: live search + "Load more" pagination --- */
  function initServices() {
    var container = document.getElementById("galleryContainer");
    if (!container) return;
    var items = Array.prototype.slice.call(container.querySelectorAll(".filtr-item"));
    var input = document.getElementById("svcSearch");
    var empty = document.getElementById("svcEmpty");
    var listItems = Array.prototype.slice.call(document.querySelectorAll(".service-list li"));

    // Flatten the 6 separate list columns into ONE multi-column list, so pagination
    // works cleanly on every screen size (no half-empty columns on desktop).
    var listWrapper = document.querySelector(".service-list-wrapper");
    if (listWrapper && listItems.length) {
      var firstUl = listWrapper.querySelector("ul.service-list");
      listItems.forEach(function (li) { firstUl.appendChild(li); });
      listWrapper.insertBefore(firstUl, listWrapper.firstChild);
      Array.prototype.slice.call(listWrapper.children).forEach(function (ch) {
        if (ch !== firstUl) listWrapper.removeChild(ch);
      });
      listWrapper.classList.add("flat");
      firstUl.classList.add("flat");
    }

    // Smaller batches on phones; the list now paginates on ALL screen sizes.
    var mqG = window.matchMedia("(max-width: 700px)");
    var mqL = window.matchMedia("(max-width: 600px)");
    var GSTEP_D = 12, GSTEP_M = 6, LSTEP_D = 30, LSTEP_M = 15;
    var gLimit, lLimit;
    function resetLimits() {
      gLimit = mqG.matches ? GSTEP_M : GSTEP_D;
      lLimit = mqL.matches ? LSTEP_M : LSTEP_D;
    }
    resetLimits();

    function mkBtn(parent) {
      if (!parent) return null;
      var wrap = document.createElement("div");
      wrap.className = "load-more-wrap";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-modern btn-ghost-m load-more-btn";
      wrap.appendChild(btn);
      parent.appendChild(wrap);
      return { wrap: wrap, btn: btn };
    }
    var gUI = mkBtn(document.getElementById("galleryTab") || container.parentNode);
    var lUI = listItems.length ? mkBtn(document.getElementById("listTab")) : null;

    function query() { return input ? input.value.trim().toLowerCase() : ""; }
    function galleryMatch(item, q) {
      var title = (item.querySelector(".gallery-title") || {}).textContent || "";
      var alt = (item.querySelector("img") || {}).alt || "";
      return (title + " " + alt).toLowerCase().indexOf(q) !== -1;
    }

    function paginate(arr, test, limit, q, ui) {
      var matched = 0, visible = 0;
      arr.forEach(function (el) {
        if (!test(el, q)) { el.style.display = "none"; return; }
        matched++;
        if (q || visible < limit) { el.style.display = ""; visible++; }
        else el.style.display = "none";
      });
      if (ui) {
        var remaining = matched - visible;
        if (q || limit === Infinity || remaining <= 0) {
          ui.wrap.style.display = "none";
        } else {
          ui.wrap.style.display = "";
          ui.btn.textContent = "Load more (" + remaining + " more)";
        }
      }
      return matched;
    }

    function render() {
      var q = query();
      var galleryMatched = paginate(items, galleryMatch, gLimit, q, gUI);
      paginate(listItems, function (li, qq) {
        return li.textContent.toLowerCase().indexOf(qq) !== -1;
      }, lLimit, q, lUI);
      if (empty) empty.style.display = galleryMatched ? "none" : "block";
    }

    if (gUI) gUI.btn.addEventListener("click", function () { gLimit += (mqG.matches ? GSTEP_M : GSTEP_D); render(); });
    if (lUI) lUI.btn.addEventListener("click", function () { lLimit += (mqL.matches ? LSTEP_M : LSTEP_D); render(); });
    if (input) input.addEventListener("input", render);

    // Re-evaluate when the viewport crosses a breakpoint (e.g. rotate / resize / DevTools).
    function onMode() { resetLimits(); render(); }
    [mqG, mqL].forEach(function (mq) {
      if (mq.addEventListener) mq.addEventListener("change", onMode);
      else if (mq.addListener) mq.addListener(onMode);
    });

    render();
  }

  /* --- WhatsApp subscribe form --- */
  function initWaForm() {
    var form = document.getElementById("waForm");
    if (!form) return;
    var field = form.querySelector("input[name='number']");
    // Allow digits only as the user types.
    if (field) field.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "");
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var num = (field || {}).value || "";
      var text = encodeURIComponent(
        "Hi Buzz Cyber Cafe, I'd like to join your WhatsApp updates group. My number: " + num
      );
      window.open("https://wa.me/919558898855?text=" + text, "_blank");
    });
  }

  /* --- Contact form -> open WhatsApp pre-filled --- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form || form.dataset.bound) return;
    form.dataset.bound = "1"; // avoid double-binding on re-init
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var get = function (n) { var el = form.querySelector("[name='" + n + "']"); return el ? el.value.trim() : ""; };
      var msg =
        "New enquiry from the website%0A%0A" +
        "Name: " + encodeURIComponent(get("Name")) + "%0A" +
        "Email: " + encodeURIComponent(get("Email")) + "%0A" +
        "Phone: " + encodeURIComponent(get("Telephone")) + "%0A" +
        "Message: " + encodeURIComponent(get("Message"));
      window.open("https://wa.me/919558898855?text=" + msg, "_blank");
    });
  }

  /* --- Lightbox gallery (click thumbnail -> overlay with prev/next) --- */
  function initLightbox() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".agileits-img a"))
      .filter(function (a) { return /\.(jpe?g|png|webp|gif)$/i.test(a.getAttribute("href") || ""); });
    if (!links.length) return;

    var ov = document.createElement("div");
    ov.className = "lightbox";
    ov.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__nav lightbox__prev" aria-label="Previous image">&#8249;</button>' +
      '<figure class="lightbox__stage"><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lightbox__nav lightbox__next" aria-label="Next image">&#8250;</button>';
    document.body.appendChild(ov);

    var imgEl = ov.querySelector("img");
    var capEl = ov.querySelector("figcaption");
    var group = [];
    var idx = 0;

    function captionFor(a) {
      var item = a.closest ? a.closest(".filtr-item") : null;
      var t = item && item.querySelector(".gallery-title");
      if (t) return t.textContent.trim();
      var im = a.querySelector("img");
      return (im && im.alt) || "";
    }
    function show(i) {
      if (!group.length) return;
      idx = (i + group.length) % group.length;
      var a = group[idx];
      imgEl.src = a.getAttribute("href");
      var cap = captionFor(a);
      capEl.textContent = cap;
      capEl.style.display = cap ? "" : "none";
    }
    function open(a) {
      // Only cycle through images currently visible (respects the search filter).
      group = links.filter(function (l) {
        var host = (l.closest && l.closest(".filtr-item")) || l;
        return host.offsetParent !== null;
      });
      if (group.indexOf(a) === -1) group = links;
      show(group.indexOf(a));
      ov.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      ov.classList.remove("open");
      document.body.style.overflow = "";
      imgEl.src = "";
    }

    links.forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); open(a); });
    });
    ov.querySelector(".lightbox__close").addEventListener("click", close);
    ov.querySelector(".lightbox__prev").addEventListener("click", function (e) { e.stopPropagation(); show(idx - 1); });
    ov.querySelector(".lightbox__next").addEventListener("click", function (e) { e.stopPropagation(); show(idx + 1); });
    ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
    document.addEventListener("keydown", function (e) {
      if (!ov.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(idx - 1);
      else if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  // Page-body interactions (available immediately).
  function initBody() { initReveal(); initServices(); initWaForm(); initContactForm(); initLightbox(); onScroll(); }
  // Things that depend on the header/footer being present.
  function initChrome() { markActive(); setYear(); onScroll(); }

  function boot() {
    initBody();
    loadPartials(initChrome);
  }

  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
