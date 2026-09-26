// GitHub Pages serves 404.html for unknown paths, which lets deep links like /more-gears load the SPA.
// (ads.txt and CNAME live in /public, so Vite copies them into dist automatically.)
import {copyFile} from "node:fs/promises";
import path from "node:path";

const dist = path.resolve(import.meta.dirname, "../dist");
await copyFile(path.join(dist, "index.html"), path.join(dist, "404.html"));
console.log("postbuild: created 404.html");
