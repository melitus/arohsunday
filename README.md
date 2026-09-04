# Aroh Sunday — Personal Website

Intent-driven personal portfolio site for [Aroh Sunday](https://github.com/melitus), hosted on GitHub Pages.

**Live site:** https://melitus.github.io/sunday.aroh/

## Deploy to GitHub Pages

1. Push this repository to GitHub (`melitus/sunday.aroh`).
2. Go to **Settings → Pages** in the repository.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select branch **`main`** and folder **`/ (root)`**.
5. Save — your site will be live at `https://melitus.github.io/sunday.aroh/` within a few minutes.
6. Enable **Enforce HTTPS** under Pages settings.

## SEO & Google Search Console

After deploying, register the site with Google:

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add property: `https://melitus.github.io/sunday.aroh/`
3. Verify ownership (HTML file upload or meta tag method).
4. Submit sitemap: `https://melitus.github.io/sunday.aroh/sitemap.xml`
5. Use **URL Inspection** → **Request indexing** on the homepage.

**Also link this site from your profiles** (critical for name searches):

- [LinkedIn](https://www.linkedin.com/in/arohsunday) — Website field in Contact & About
- [GitHub](https://github.com/melitus) — Profile URL / bio
- [Google Scholar](https://scholar.google.com/citations?user=jzp04ekAAAAJ) — Homepage if available

**Optional — custom domain:** A domain like `arohsunday.com` improves ranking for name searches. Add a `CNAME` file in the repo root and configure DNS in GitHub Pages settings.

### SEO files included

| File | Purpose |
|------|---------|
| `robots.txt` | Allows crawlers, points to sitemap |
| `sitemap.xml` | Submitted to Google Search Console |
| JSON-LD in `index.html` | Person + WebSite + ProfilePage schema |
| Open Graph / Twitter tags | Rich previews when shared on social |
| `rel="canonical"` | Prevents duplicate URL issues |
| `rel="me"` | Links site to GitHub, LinkedIn, Scholar |

## Local preview

Open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Structure

```
├── index.html              # Main page (SEO meta + JSON-LD)
├── robots.txt              # Crawler instructions
├── sitemap.xml             # URL map for search engines
├── css/styles.css
├── js/main.js
├── assets/
│   └── images/
│       ├── profile.jpg     # Optimized profile photo
│       ├── profile.webp    # WebP variant
│       ├── favicon.jpg     # Favicon
│       ├── background.png  # Hero banner
│       └── CM5_CONTRIBUTOR_VISUAL_1_TWITTER.png
└── data/
    └── profile.json
```
