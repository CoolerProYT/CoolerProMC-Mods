// Refreshes src/data/curseforge.json from the official CurseForge API.
// Needs CF_API_KEY or CURSEFORGE_API_KEY (a GitHub Actions secret in CI, or a local .env file).
// Without a key it keeps the committed snapshot, so builds never fail because of this.
import {readFile, writeFile} from "node:fs/promises";
import path from "node:path";

const file = path.resolve(import.meta.dirname, "../src/data/curseforge.json");
const envFile = path.resolve(import.meta.dirname, "../.env");

let key = process.env.CF_API_KEY || process.env.CURSEFORGE_API_KEY;
if (!key) {
    try {
        key = (await readFile(envFile, "utf8")).match(/^(?:CF_API_KEY|CURSEFORGE_API_KEY)\s*=\s*"?([^"\r\n]+)"?/m)?.[1];
    } catch {
        // no .env – fine
    }
}

if (!key) {
    console.log("curseforge: no CF_API_KEY / CURSEFORGE_API_KEY, keeping the committed snapshot");
    process.exit(0);
}

const current = JSON.parse(await readFile(file, "utf8"));
const bySlug = current.mods;
const ids = Object.values(bySlug).map((m) => m.id);

try {
    const res = await fetch("https://api.curseforge.com/v1/mods", {
        method: "POST",
        headers: {"x-api-key": key, "content-type": "application/json", accept: "application/json", "user-agent": "coolerpromc.com-build (github.com/CoolerProYT/CoolerProMC-Mods)"},
        body: JSON.stringify({modIds: ids, filterPcOnly: false}),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${(await res.text()).replace(/\s+/g, " ").slice(0, 200)}`);
    const {data} = await res.json();
    const LOADER = {1: "forge", 4: "fabric", 6: "neoforge"};
    for (const p of data) {
        // versions[mcVersion][loader] = newest file ID, from the latest file per version/loader.
        const versions = {};
        for (const f of p.latestFilesIndexes ?? []) {
            const loader = LOADER[f.modLoader];
            if (!loader || !/^\d+(\.\d+)+$/.test(f.gameVersion)) continue;
            const byLoader = (versions[f.gameVersion] ??= {});
            byLoader[loader] = Math.max(byLoader[loader] ?? 0, f.fileId);
        }
        bySlug[p.slug] = {
            id: p.id,
            downloads: Math.round(p.downloadCount),
            updated: p.dateReleased ?? p.dateModified ?? null,
            published: p.dateCreated ?? null,
            versions,
        };
    }
    await writeFile(file, JSON.stringify({generatedAt: new Date().toISOString(), source: "api", mods: bySlug}, null, 2) + "\n");
    console.log(`curseforge: refreshed ${data.length} projects`);
} catch (e) {
    // Don't break the deploy over stats – the snapshot is still usable.
    console.warn(`curseforge: refresh failed (${e.message}), keeping the committed snapshot`);
}
