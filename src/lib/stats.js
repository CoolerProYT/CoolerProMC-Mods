import {useMemo} from "react";
import {mods} from "../data/mods.js";
import cf from "../data/curseforge.json";
import {useProjects} from "./modrinth.js";

// Combines live Modrinth stats with CurseForge stats baked in at build time
// (scripts/curseforge.mjs, refreshed daily by the deploy workflow).

const latest = (...d) => d.filter(Boolean).sort().at(-1) ?? null;
const earliest = (...d) => d.filter(Boolean).sort()[0] ?? null;

export const curseforgeUpdatedAt = cf.generatedAt;

/**
 * Returns {stats, ready}. `stats[slug]` has downloads (both platforms combined),
 * modrinth / curseforge breakdown, followers (Modrinth only), updated and published.
 * While Modrinth is still loading, `ready` is false.
 */
export function useStats() {
    const {data, error, loading} = useProjects();
    const stats = useMemo(
        () =>
            Object.fromEntries(
                mods.map((m) => {
                    const mr = data?.[m.modrinth];
                    const c = cf.mods[m.curseforge];
                    return [
                        m.slug,
                        {
                            downloads: (mr?.downloads ?? 0) + (c?.downloads ?? 0),
                            modrinth: mr?.downloads ?? null,
                            curseforge: c?.downloads ?? null,
                            followers: mr?.followers ?? null,
                            updated: latest(mr?.updated, c?.updated),
                            published: earliest(mr?.published, c?.published),
                        },
                    ];
                }),
            ),
        [data],
    );
    return {stats, ready: !loading, modrinthFailed: !!error};
}
