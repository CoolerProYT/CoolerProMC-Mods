# CoolerProMC Mods

Source for [coolerpromc.com](https://coolerpromc.com), the hub for CoolerProMC's Minecraft mods.
React + Vite + Tailwind CSS 4.

```bash
npm install
npm run dev      # also generates logo thumbnails
npm run build    # thumbnails + CurseForge stats + vite build
```

## Deploying

Pushing to `master` builds the site and publishes it to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), the same way the mod wikis are deployed.
The workflow also runs once a day to refresh CurseForge download counts.

One-time setup in the repository settings:

1. **Pages** → Source: **GitHub Actions**, custom domain `coolerpromc.com`.
2. **Secrets and variables → Actions** → add `CF_API_KEY` (get one at https://console.curseforge.com).

## Download stats

- **Modrinth**: fetched live in the browser (public API, cached for 10 minutes).
- **CurseForge**: the API needs a secret key, so `scripts/curseforge.mjs` fetches the counts at build time
  and writes them to `src/data/curseforge.json`. Without a key (e.g. locally with no `.env`) the committed
  snapshot is used. Locally you can put `CF_API_KEY=...` in a `.env` file (git-ignored) and run `npm run stats`.

## Adding or updating a mod

Everything lives in [`src/data/mods.js`](src/data/mods.js). The home grid, navbar, search,
footer, mod page and version matrix are all generated from it.

1. Put the logo PNG in `public/` (a 256px WebP thumbnail is generated automatically).
2. Add an entry to `mods` with its `slug` (the URL), `modrinth` and `curseforge` slugs, links, accent color,
   features and versions.
3. For a new CurseForge project, add its project ID to `src/data/curseforge.json` so the build can fetch its stats.
4. Each version is `v("26.3", ["neoforge", "fabric"], status)`, where status is `"active"` (default),
   `"lts"` (bug fixes only) or `"eol"` (unsupported).

### New Minecraft versions are added automatically

At build time `scripts/modrinth-versions.mjs` (and the CurseForge script) record which Minecraft versions
and loaders each mod has published. Any version newer than the newest one in `versions` is added as
**Active**, with patch releases grouped (26.4 + 26.4.1 → one "26.4" row). The daily deploy picks up new
releases within a day. So in `mods.js` you only need to:

- change a status, e.g. move an old version to `"lts"` or `"eol"`;
- add `autoVersions: false` to a mod that shouldn't follow its uploads (e.g. Lake Feature Fix);
- add `versionNote: "..."` to explain something about its versions.
5. A mod that is still waiting for Modrinth approval uses `modrinth: null, modrinthReview: true`.
   Once it's approved, set `modrinth` to its slug and `links.modrinth` to its URL, then remove `modrinthReview`.
