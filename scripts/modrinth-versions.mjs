// Records which Minecraft versions + loaders each mod has actually published on Modrinth
// (and the newest version ID for each), so new Minecraft versions show up on the site without
// editing src/data/mods.js, and download buttons can link straight to the right file.
// Shape: mods[slug][mcVersion][loader] = Modrinth version ID.
// Output: src/data/versions.json. If Modrinth can't be reached, the committed file is kept.
import {readFile, writeFile} from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "src/data/versions.json");

// mods.js imports images, so read the Modrinth slugs from its source instead of importing it.
const source = await readFile(path.join(root, "src/data/mods.js"), "utf8");
const slugs = [...source.matchAll(/^\s*modrinth: "([^"/]+)",/gm)].map((m) => m[1]);

const isRelease = (v) => /^\d+(\.\d+)+$/.test(v);
const LOADERS = ["forge", "neoforge", "fabric"];

try {
    const mods = {};
    for (const slug of slugs) {
        const res = await fetch(`https://api.modrinth.com/v2/project/${encodeURIComponent(slug)}/version?include_changelog=false`, {
            headers: {"user-agent": "coolerpromc.com-build (github.com/CoolerProYT/CoolerProMC-Mods)"},
        });
        if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
        const found = {};
        // Newest first, so the first ID we see for a version/loader is its latest file.
        const versions = (await res.json()).sort((a, b) => b.date_published.localeCompare(a.date_published));
        for (const v of versions) {
            for (const gv of v.game_versions.filter(isRelease)) {
                const byLoader = (found[gv] ??= {});
                for (const l of v.loaders) if (LOADERS.includes(l)) byLoader[l] ??= v.id;
            }
        }
        mods[slug] = found;
    }
    await writeFile(out, JSON.stringify({generatedAt: new Date().toISOString(), mods}, null, 2) + "\n");
    console.log(`modrinth-versions: updated ${slugs.length} projects`);
} catch (e) {
    console.warn(`modrinth-versions: failed (${e.message}), keeping the committed file`);
}
