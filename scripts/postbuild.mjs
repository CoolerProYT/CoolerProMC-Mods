// Cross-platform replacement for the old Windows `copy` postbuild (so it also runs in GitHub Actions).
import {copyFile} from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");

for (const f of [".gitignore", ".htaccess", "ads.txt"]) {
    await copyFile(path.join(root, "build-templates", f), path.join(dist, f));
}
// GitHub Pages serves 404.html for unknown paths, which lets deep links like /more-gears load the SPA.
await copyFile(path.join(dist, "index.html"), path.join(dist, "404.html"));
console.log("postbuild: copied templates and 404.html");
