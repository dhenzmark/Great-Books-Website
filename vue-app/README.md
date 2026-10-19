# Epic Voices (Vue version)

The same portfolio as the HTML site one folder up, rebuilt with Vue 3, Vue Router and Vite.

## Run it

```
npm install      # first time only
npm run dev      # opens a local server with live reload
npm run build    # makes the finished site in dist/
npm run preview  # serves dist/ to check the build
```

Upload the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages). The build also writes `dist/404.html` so that links like `/analyses` still work on GitHub Pages; `vercel.json` does the same on Vercel.

## Where things are

| Folder | What it holds |
|--------|---------------|
| `src/views/` | One file per page: Home, Analyses, Masterpiece, Learning, Reflection, Profile |
| `src/components/layout/` | Nav, footer, page title with the painted O, "next page" link, painting viewer |
| `src/components/ui/` | Reusable pieces: framed painting (`ArtPlate`), tabs, quote + insight, counter |
| `src/components/<page>/` | Sections used by only one page |
| `src/data/` | The text: the seven analyses (`works.js`), exhibits, timeline, credits, lessons, reflection |
| `src/directives/` | `v-reveal` (fade in on scroll) and `v-parallax` (images drift as you scroll) |
| `src/styles/style.css` | The original design |
| `src/styles/motion.css` | All animation |
| `public/assets/img/` | The paintings and your photo (`me.jpeg`) |

## Common edits

- **Your photo crop:** `src/components/profile/ProfileWelcome.vue`, change `photoPosition`. The second number moves the photo up (higher) or down (lower).
- **Analysis text:** `src/data/works.js`.
- **Animation speed:** `src/styles/motion.css`. Visitors with "reduce motion" turned on get no movement.
