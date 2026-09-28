// Makes every route a real page on GitHub Pages.
//
// Pages only knows about files, so /more-gears would otherwise fall through to 404.html. That still
// renders the app, but with HTTP status 404 – which Google Search and AdSense treat as "page not found".
// So for each route we write <route>.html (Pages serves /more-gears from more-gears.html with a 200),
// with its own <title>, description, canonical URL and Open Graph tags. Plus sitemap.xml and robots.txt.
import {readFile, writeFile} from "node:fs/promises";
import path from "node:path";

const SITE = "https://coolerpromc.com";
const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const template = await readFile(path.join(dist, "index.html"), "utf8");

// mods.js imports images, so read what we need from its source.
const source = await readFile(path.join(root, "src/data/mods.js"), "utf8");
const mods = [...source.matchAll(/slug: "([^"]+)",\s*name: "([^"]+)",[\s\S]*?tagline: "([^"]+)",\s*logo: "([^"]+)"/g)].map(
    ([, slug, name, tagline, logo]) => ({slug, name, tagline, logo}),
);
if (mods.length === 0) throw new Error("postbuild: couldn't read any mods from src/data/mods.js");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function page({title, description, url, image}) {
    let html = template;
    const set = (re, value) => {
        if (!re.test(html)) throw new Error(`postbuild: index.html is missing ${re}`);
        html = html.replace(re, value);
    };
    set(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
    set(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`);
    set(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
    set(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
    set(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
    set(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
    if (image) set(/(<meta property="og:image" content=")[^"]*(")/, `$1${SITE}${image}$2`);
    return html;
}

const routes = [
    ...mods.map((m) => ({
        file: `${m.slug}.html`,
        url: `${SITE}/${m.slug}`,
        html: page({title: `${m.name} · CoolerProMC Mods`, description: m.tagline, url: `${SITE}/${m.slug}`, image: m.logo}),
    })),
    {
        file: "versions.html",
        url: `${SITE}/versions`,
        html: page({
            title: "Version support · CoolerProMC Mods",
            description: "Which CoolerProMC mods run on which Minecraft version and loader (Forge, NeoForge, Fabric).",
            url: `${SITE}/versions`,
        }),
    },
];

for (const r of routes) await writeFile(path.join(dist, r.file), r.html);

// Unknown URLs still get the app (which shows its own "not found" page), with a real 404 status.
await writeFile(path.join(dist, "404.html"), template);

const today = new Date().toISOString().slice(0, 10);
const urls = [`${SITE}/`, ...routes.map((r) => r.url)];
await writeFile(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`)
        .join("\n")}\n</urlset>\n`,
);
await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`postbuild: ${routes.length} pages, 404.html, sitemap.xml (${urls.length} URLs), robots.txt`);
