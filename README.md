# Kavyanjali biotechnology portfolio — full code package

This is an editable, dependency-free recreation of the public portfolio page. It contains the page markup, styling, interactions, deployed photographs, and favicon.

## Files

- `index.html` — all page sections and accessible navigation markup
- `styles.css` — the public page's deployed styling, formatted for editing
- `script.js` — mobile navigation, learning-roadmap tabs, and contact-form behavior
- `assets/` — the four page images
- `favicon.ico` — site icon

## Preview locally

For a quick preview, open `index.html` in a browser. To serve it at a local URL, run this from the folder:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>. Python is required for that option; any static web server also works. The fonts load from Google Fonts, so the browser needs internet access to use the exact Inter and Manrope faces.

The contact form validates entries and opens a prefilled email to the public address on the site; it does not include a server-side mail service. This package recreates the public page and is not the original Lovable/React project source, which is not exposed by the public deployment.
