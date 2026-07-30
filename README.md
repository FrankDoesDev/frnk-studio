# Frank Zito — Portfolio Site

A single static page: `index.html` + `style.css` + `script.js`. No build step,
no framework, no backend. Open `index.html` directly in a browser to preview,
or drag the folder onto Netlify Drop / GitHub Pages to publish.

## How to update things yourself

**Headshot** — drop a photo into `assets/headshot.jpg` (same filename). It'll
appear automatically in the hero circle. Until then it shows your initials
"FZ" on a gradient.

**Text** — everything is plain text in `index.html`. Search for the section
you want (`id="about"`, `id="results"`, etc.) and edit the wording directly.

**Stats** — in the `id="results"` section, each stat is:
```html
<span class="stat-number" data-count="60" data-suffix="%">0%</span>
```
Change `data-count` (the number it counts up to) and `data-suffix` (the `%`,
`K`, `%+`, etc.) — the count-up animation picks it up automatically.

**Work samples** — in the `id="samples"` section, each slot is a native
`<video>` tag pointing at a file in `assets/` (e.g. `assets/ClientVideo1.mp4`),
with a `poster` image shown before it's played. Videos play right on the page
— no jumping to Instagram/YouTube. To swap one out:
1. Drop the new `.mp4` into `assets/`.
2. Grab a poster still: `ffmpeg -y -i assets/yourvideo.mp4 -ss 00:00:01 -vframes 1 -vf "scale=540:-1" assets/yourvideo-poster.jpg`
3. Update the `src` and `poster` attributes on that `<video>` tag in `index.html`.

**Contact info** — your email is already wired up (`frankzitojr96@gmail.com`).
Update the phone number placeholder `(555) 555-5555` (appears twice: the
visible text and the `tel:` link) with your real number. Fill in the `href="#"`
links in `.social-row` with your actual Instagram/YouTube/TikTok/LinkedIn/X
URLs.

**Colors** — all colors are CSS variables at the top of `style.css`
(`:root { ... }`). Change `--coral`, `--violet`, `--gold`, `--cream`, `--dark`
to restyle the whole site from one place.

## Publishing

Easiest options, no server needed:
- **Netlify Drop**: drag the whole project folder onto https://app.netlify.com/drop
- **GitHub Pages**: push the folder to a GitHub repo, enable Pages on the `main` branch
- **Vercel**: `vercel` CLI in this folder, or drag-and-drop import from GitHub
