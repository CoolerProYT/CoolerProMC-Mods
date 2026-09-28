import {useEffect, useState} from "react";
import {mods} from "../data/mods.js";

// Live stats from Modrinth's public API (CORS-enabled, no key needed).
// Everything degrades gracefully: if a request fails the UI just hides the numbers.

const API = "https://api.modrinth.com/v2";
const TTL = 10 * 60 * 1000;

function cacheGet(key) {
    try {
        const raw = sessionStorage.getItem(key);
        if (!raw) return null;
        const {t, data} = JSON.parse(raw);
        return Date.now() - t < TTL ? data : null;
    } catch {
        return null;
    }
}

function cacheSet(key, data) {
    try {
        sessionStorage.setItem(key, JSON.stringify({t: Date.now(), data}));
    } catch {
        // storage full or blocked – fine, we just refetch next time
    }
}

const inflight = new Map();

function cachedFetch(key, url, transform = (x) => x) {
    const hit = cacheGet(key);
    if (hit) return Promise.resolve(hit);
    if (inflight.has(key)) return inflight.get(key);
    // Modrinth sends `cache-control: max-age` of 31 days, so without this the browser keeps showing
    // month-old stats. "no-cache" makes it revalidate every time; our own 10-minute cache above covers reuse.
    const p = fetch(url, {cache: "no-cache"})
        .then((r) => {
            if (!r.ok) throw new Error(`Modrinth ${r.status}`);
            return r.json();
        })
        .then((json) => {
            const data = transform(json);
            cacheSet(key, data);
            return data;
        })
        .finally(() => inflight.delete(key));
    inflight.set(key, p);
    return p;
}

function useAsync(fn, deps) {
    const [state, setState] = useState({data: null, error: null, loading: true});
    useEffect(() => {
        let alive = true;
        setState((s) => ({...s, loading: true}));
        fn().then(
            (data) => alive && setState({data, error: null, loading: false}),
            (error) => alive && setState({data: null, error, loading: false}),
        );
        return () => {
            alive = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return state;
}

/** Map of modrinth slug -> {downloads, followers, updated, published, versionIds} */
export function fetchProjects() {
    const ids = JSON.stringify(mods.map((m) => m.modrinth).filter(Boolean));
    return cachedFetch("mr:projects", `${API}/projects?ids=${encodeURIComponent(ids)}`, (list) =>
        Object.fromEntries(
            list.map((p) => [
                p.slug,
                {
                    downloads: p.downloads,
                    followers: p.followers,
                    updated: p.updated,
                    published: p.published,
                    versionIds: p.versions.slice(-16),
                },
            ]),
        ),
    );
}

export const useProjects = () => useAsync(fetchProjects, []);

/** Most recent releases for one project, newest first, changelog included. */
export function useReleases(modrinthSlug, limit = 6) {
    return useAsync(async () => {
        const projects = await fetchProjects();
        const ids = projects[modrinthSlug]?.versionIds ?? [];
        if (!ids.length) return [];
        const list = await cachedFetch(
            `mr:versions:${modrinthSlug}`,
            `${API}/versions?ids=${encodeURIComponent(JSON.stringify(ids))}`,
            (vs) =>
                vs.map((x) => ({
                    id: x.id,
                    name: x.name,
                    number: x.version_number,
                    type: x.version_type,
                    date: x.date_published,
                    gameVersions: x.game_versions,
                    loaders: x.loaders,
                    downloads: x.downloads,
                    changelog: x.changelog ?? "",
                })),
        );
        // One release is usually uploaded once per loader – merge those into a single entry.
        const groups = new Map();
        for (const x of [...list].sort((a, b) => b.date.localeCompare(a.date))) {
            const g = groups.get(x.number);
            if (!g) {
                groups.set(x.number, {...x, loaders: [...x.loaders], gameVersions: [...x.gameVersions]});
                continue;
            }
            g.downloads += x.downloads;
            for (const l of x.loaders) if (!g.loaders.includes(l)) g.loaders.push(l);
            for (const gv of x.gameVersions) if (!g.gameVersions.includes(gv)) g.gameVersions.push(gv);
        }
        return [...groups.values()].slice(0, limit);
    }, [modrinthSlug, limit]);
}

const compact = new Intl.NumberFormat("en", {notation: "compact", maximumFractionDigits: 1});
export const formatCount = (n) => (n == null ? "—" : compact.format(n));

const rtf = new Intl.RelativeTimeFormat("en", {numeric: "auto"});
export function timeAgo(iso) {
    if (!iso) return "—";
    const s = (new Date(iso).getTime() - Date.now()) / 1000;
    const units = [
        ["year", 31536000],
        ["month", 2592000],
        ["week", 604800],
        ["day", 86400],
        ["hour", 3600],
        ["minute", 60],
    ];
    for (const [unit, secs] of units) {
        if (Math.abs(s) >= secs) return rtf.format(Math.round(s / secs), unit);
    }
    return "just now";
}
