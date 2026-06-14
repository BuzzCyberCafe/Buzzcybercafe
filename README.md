# Buzz Cyber Cafe

Website for **Buzz Cyber Cafe**, Rajkot — a digital service centre offering
government form filling, passport & Aadhaar registration, PAN, scholarships,
printing/scanning, and 100 Mbps high-speed internet (90+ services in total).

It is a static, multi-page website (HTML, CSS, vanilla JS) with a modern,
fully responsive UI.

---

## Tech stack

- **HTML5** — static pages, no build step
- **CSS** — `css/modern.css` (the modern design layer) on top of the legacy
  `css/style.css` + `css/bootstrap.css`
- **Vanilla JavaScript** — `js/main.js` (no framework)
- **Bootstrap 3 + jQuery** — used only for the Services tabs (loaded via CDN)
- **Font Awesome 4.6.3** — icons

---

## Project structure

```
Buzzcybercafe/
├── index.html          # Home: hero, features, services, pricing, news, CTA
├── about.html          # Gallery + owners
├── services.html       # Full services page (gallery + list)
├── contact.html        # Map, contact form, contact info
├── header.html         # Shared navbar (injected at runtime)
├── footer.html         # Shared footer (injected at runtime)
├── css/
│   ├── modern.css      # Modern design system (edit this for styling)
│   ├── style.css       # Legacy template styles
│   ├── bootstrap.css   # Bootstrap 3 (tabs/grid)
│   └── font-awesome.css
├── js/
│   └── main.js         # Nav, search, load-more, lightbox, forms, reveal
├── images/             # Photos + service gallery (images/services/)
├── icons/              # Misc icons
└── fonts/              # Font Awesome / Glyphicons
```

---

## Running locally

The shared header/footer load via `fetch()`, so the site should be served
over **HTTP**. (A JavaScript fallback also renders them when opened directly,
but a server is recommended for development.)

**Option 1 — VS Code Live Server (recommended)**
1. Install the *Live Server* extension.
2. Right-click `index.html` → **Open with Live Server**.

**Option 2 — Python**
```bash
python -m http.server 8000
# then open http://localhost:8000
```

**Option 3 — Node**
```bash
npx serve
```

---

## Features

- **Responsive** across desktop, tablet and mobile (breakpoints down to 480px).
- **Sticky glass navbar** with a mobile hamburger menu.
- **Live service search** that filters both the Gallery and Services List tabs.
- **"Load more" pagination** for the gallery and list on all screen sizes.
- **Lightbox gallery** — click any image for a full-screen view with
  prev/next, captions, and keyboard support (Esc / ← / →).
- **Lazy-loaded** gallery images for faster page loads.
- **WhatsApp-first contact** — the contact form and the "join updates" form
  open WhatsApp pre-filled; a floating WhatsApp button is on every page.
- **SEO** — meta description, Open Graph tags, and LocalBusiness JSON-LD.

---

## Customization

- **Colors / theme** — edit the CSS variables in the `:root` block at the top
  of `css/modern.css` (e.g. `--brand` cyan, `--accent` orange). Changing these
  re-themes the whole site.
- **Navigation & footer** — edit `header.html` / `footer.html` once; they apply
  to every page. (If you change the markup, also update the matching fallback
  strings in `js/main.js`.)
- **Services** — add a card in the Gallery tab and/or an item in the Services
  List in `index.html` and `services.html`.
- **Contact details / phone numbers** — update in `header.html`, `footer.html`,
  `contact.html`, and the `wa.me/91...` links.