// Generates small WebP thumbnails for every top-level logo in /public so
// cards and menus don't download multi-megabyte PNGs.
// Output: public/thumbs/<name>.webp (git-ignored, regenerated on dev/build).
import {readdir, mkdir, stat} from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const pub = path.resolve(import.meta.dirname, "../public");
const out = path.join(pub, "thumbs");
await mkdir(out, {recursive: true});

const files = (await readdir(pub)).filter((f) => f.endsWith(".png"));
let made = 0;
for (const f of files) {
    const src = path.join(pub, f);
    const dest = path.join(out, f.replace(/\.png$/, ".webp"));
    const [s, d] = await Promise.all([stat(src), stat(dest).catch(() => null)]);
    if (d && d.mtimeMs >= s.mtimeMs) continue;
    await sharp(src).resize(256, 256, {fit: "inside", withoutEnlargement: true}).webp({quality: 82}).toFile(dest);
    made++;
}
console.log(`thumbs: ${made} generated, ${files.length - made} up to date`);
