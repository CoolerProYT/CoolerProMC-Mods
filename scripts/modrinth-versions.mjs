// Records which Minecraft versions + loaders each mod has actually published on Modrinth,
// so new Minecraft versions show up on the site without editing src/data/mods.js.
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
        for (const v of await res.json()) {
            for (const gv of v.game_versions.filter(isRelease)) {
                const set = (found[gv] ??= new Set());
                for (const l of v.loaders) if (LOADERS.includes(l)) set.add(l);
            }
        }
        mods[slug] = Object.fromEntries(Object.entries(found).map(([gv, set]) => [gv, LOADERS.filter((l) => set.has(l))]));
    }
    await writeFile(out, JSON.stringify({generatedAt: new Date().toISOString(), mods}, null, 2) + "\n");
    console.log(`modrinth-versions: updated ${slugs.length} projects`);
} catch (e) {
    console.warn(`modrinth-versions: failed (${e.message}), keeping the committed file`);
}
