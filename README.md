# Aroh Sunday — Personal Website

Intent-driven personal portfolio site for [Aroh Sunday](https://github.com/melitus), hosted on GitHub Pages.

## Deploy to GitHub Pages

1. Push this repository to GitHub (`melitus/sunday.aroh`).
2. Go to **Settings → Pages** in the repository.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select branch **`main`** and folder **`/ (root)`**.
5. Save — your site will be live at `https://melitus.github.io/sunday.aroh/` within a few minutes.

## Local preview

Open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Structure

```
├── index.html              # Main page
├── css/styles.css          # Styles (GameVoc-inspired palette)
├── js/main.js              # Scroll animations & mobile nav
├── assets/
│   └── images/
│       ├── profile.jpg     # Profile photo
│       ├── background.png  # Hero banner
│       └── CM5_CONTRIBUTOR_VISUAL_1_TWITTER.png  # XRPL Magazine visual
└── data/
    └── profile.json        # Source profile data
```
