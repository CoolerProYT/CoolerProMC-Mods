import {useMemo} from "react";
import {Link, useSearchParams} from "react-router-dom";
import ModCard from "../components/ModCard.jsx";
import {allMcVersions, displayName, LOADERS, mods} from "../data/mods.js";
import {formatCount, timeAgo} from "../lib/modrinth.js";
import {useStats} from "../lib/stats.js";
import {ArrowRight, ClockIcon, DownloadIcon, GridIcon, HeartIcon, SearchIcon, TableIcon, CloseIcon} from "../components/Icons.jsx";
import {ModLogo, Stat, useTitle} from "../components/ui.jsx";

const SORTS = {
    popular: "Most downloaded",
    updated: "Recently updated",
    newest: "Newest",
    name: "A–Z",
};

const mcOptions = allMcVersions;

export default function Home() {
    useTitle(null);
    const {stats, ready} = useStats();
    const [params, setParams] = useSearchParams();

    const q = params.get("q") ?? "";
    const loader = params.get("loader") ?? "";
    const mc = params.get("mc") ?? "";
    const sort = params.get("sort") ?? "popular";
    const hideEol = params.get("maintained") === "1";

    const set = (key, value) => {
        const next = new URLSearchParams(params);
        if (value) next.set(key, value);
        else next.delete(key);
        setParams(next, {replace: true, preventScrollReset: true});
    };

    const stat = (m) => (ready ? stats[m.slug] : undefined);

    const filtered = useMemo(() => {
        const needle = q.trim().toLowerCase();
        const list = mods.filter((m) => {
            if (needle && ![m.name, m.tagline, ...m.categories].join(" ").toLowerCase().includes(needle)) return false;
            const vs = m.versions.filter((x) => (!mc || x.mc === mc) && (!loader || x.loaders.includes(loader)) && (!hideEol || x.status !== "eol"));
            return vs.length > 0;
        });
        if (!ready && sort !== "name") return list; // keep curated order until stats arrive
        const by = {
            popular: (a, b) => stats[b.slug].downloads - stats[a.slug].downloads,
            updated: (a, b) => (stats[b.slug].updated ?? "").localeCompare(stats[a.slug].updated ?? ""),
            newest: (a, b) => (stats[b.slug].published ?? "").localeCompare(stats[a.slug].published ?? ""),
            name: (a, b) => displayName(a).localeCompare(displayName(b)),
        }[sort];
        return [...list].sort(by);
    }, [q, loader, mc, sort, hideEol, stats, ready]);

    const totals = useMemo(() => {
        if (!ready) return null;
        const vals = Object.values(stats);
        return {
            downloads: vals.reduce((s, p) => s + p.downloads, 0),
            followers: vals.reduce((s, p) => s + (p.followers ?? 0), 0),
        };
    }, [stats, ready]);

    const recent = useMemo(() => {
        if (!ready) return [];
        return [...mods].filter((m) => stats[m.slug].updated).sort((a, b) => stats[b.slug].updated.localeCompare(stats[a.slug].updated)).slice(0, 5);
    }, [stats, ready]);

    const newestMc = mcOptions[0];
    const filtersActive = q || loader || mc || hideEol;
    const loading = !ready;

    return (
        <main>
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="pixel-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"/>
                <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pb-24 lg:pt-20">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-diamond/30 bg-diamond/10 px-3 py-1 text-xs font-semibold text-diamond">
                            <span className="h-1.5 w-1.5 rounded-full bg-diamond"/>
                            Now supporting Minecraft {newestMc}
                        </span>
                        <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Mods that make <br className="hidden sm:block"/>
                            <span className="bg-gradient-to-r from-diamond to-sky-400 bg-clip-text text-transparent">Minecraft better.</span>
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                            {mods.length} mods for Forge, NeoForge and Fabric, from uncrafting and new gear tiers to resource trees and Cobblemon add-ons.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href="#mods" className="pixel-corners inline-flex items-center gap-2 bg-diamond px-5 py-3 font-semibold text-ink-950 transition hover:bg-white">
                                <GridIcon width="18" height="18"/> Browse mods
                            </a>
                            <Link to="/versions" className="pixel-corners inline-flex items-center gap-2 bg-white/8 px-5 py-3 font-semibold text-white transition hover:bg-white/15">
                                <TableIcon width="18" height="18"/> Version support
                            </Link>
                        </div>
                        <div className="mt-12 grid max-w-lg grid-cols-3 gap-6">
                            <Stat icon={<DownloadIcon/>} value={totals ? formatCount(totals.downloads) : "000K"} label="Downloads" loading={loading}/>
                            <Stat icon={<HeartIcon/>} value={totals ? formatCount(totals.followers) : "000"} label="Followers" loading={loading}/>
                            <Stat icon={<GridIcon/>} value={mods.length} label="Mods"/>
                        </div>
                        <p className="mt-4 flex items-center gap-2 text-xs text-muted">
                            <img src="/modrinth.png" alt="" className="h-3.5 w-3.5"/>
                            <img src="/cf.png" alt="" className="h-3.5 w-3.5"/>
                            Downloads across Modrinth and CurseForge
                        </p>
                    </div>

                    {/* Showcase collage */}
                    <div className="relative hidden lg:block" aria-hidden="true">
                        <div className="absolute -inset-10 rounded-full bg-diamond/10 blur-3xl"/>
                        <div className="relative grid grid-cols-4 gap-3 [transform:perspective(1200px)_rotateY(-14deg)_rotateX(6deg)]">
                            {mods.slice(0, 12).map((m, i) => (
                                <Link
                                    key={m.slug}
                                    to={`/${m.slug}`}
                                    tabIndex={-1}
                                    style={{"--accent": m.accent, transitionDelay: `${i * 20}ms`}}
                                    className={`pixel-corners aspect-square bg-ink-800 p-1.5 transition duration-300 hover:-translate-y-1 hover:bg-(--accent) ${i % 4 === 1 || i % 4 === 3 ? "translate-y-6" : ""}`}
                                >
                                    <ModLogo mod={m} className="h-full w-full rounded-md object-cover"/>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Recently updated */}
            {recent.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="card flex flex-col gap-3 p-4 md:flex-row md:items-center md:gap-6">
                        <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-white">
                            <ClockIcon width="18" height="18" className="text-diamond"/> Recently updated
                        </div>
                        <ul className="flex gap-2 overflow-x-auto pb-1 md:pb-0 [scrollbar-width:none]">
                            {recent.map((m) => (
                                <li key={m.slug} className="shrink-0">
                                    <Link to={`/${m.slug}`} className="flex items-center gap-2 rounded-lg bg-white/5 py-1.5 pl-1.5 pr-3 text-sm transition hover:bg-white/10">
                                        <ModLogo mod={m} className="h-6 w-6 rounded object-cover"/>
                                        <span className="font-medium text-slate-200">{displayName(m)}</span>
                                        <span className="text-xs text-muted">{timeAgo(stats[m.slug].updated)}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* Catalogue */}
            <section id="mods" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-20 sm:px-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <p className="eyebrow">The collection</p>
                        <h2 className="section-title mt-2">All mods</h2>
                    </div>
                    <p className="text-sm text-muted">
                        Showing <span className="font-semibold text-white">{filtered.length}</span> of {mods.length}
                    </p>
                </div>

                <div className="card mt-6 flex flex-col gap-3 p-3 lg:flex-row lg:items-center">
                    <label className="relative flex-1">
                        <span className="sr-only">Search mods</span>
                        <SearchIcon width="18" height="18" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"/>
                        <input
                            type="search"
                            value={q}
                            onChange={(e) => set("q", e.target.value)}
                            placeholder="Search by name, feature or category…"
                            className="h-11 w-full rounded-lg border border-white/8 bg-ink-950/60 pl-10 pr-3 text-sm text-white placeholder:text-muted focus:border-diamond/60 focus:outline-none"
                        />
                    </label>
                    <div className="flex flex-wrap gap-1 rounded-lg border border-white/8 bg-ink-950/60 p-1" role="group" aria-label="Filter by loader">
                        {[["", "All"], ...Object.entries(LOADERS).map(([k, l]) => [k, l.name])].map(([key, label]) => (
                            <button
                                key={key || "all"}
                                type="button"
                                onClick={() => set("loader", key)}
                                aria-pressed={loader === key}
                                className={`inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition ${loader === key ? "bg-white/10 text-white" : "text-muted hover:text-white"}`}
                            >
                                {key && <img src={LOADERS[key].icon} alt="" className="h-4 w-4 object-contain"/>}
                                {label}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:flex">
                        <select value={mc} onChange={(e) => set("mc", e.target.value)} aria-label="Minecraft version" className="h-11 rounded-lg border border-white/8 bg-ink-950/60 px-3 text-sm text-white focus:border-diamond/60 focus:outline-none">
                            <option value="">Any version</option>
                            {mcOptions.map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                        <select value={sort} onChange={(e) => set("sort", e.target.value === "popular" ? "" : e.target.value)} aria-label="Sort" className="h-11 rounded-lg border border-white/8 bg-ink-950/60 px-3 text-sm text-white focus:border-diamond/60 focus:outline-none">
                            {Object.entries(SORTS).map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                        </select>
                    </div>
                    <label className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap px-1 text-sm text-slate-300">
                        <input type="checkbox" checked={hideEol} onChange={(e) => set("maintained", e.target.checked ? "1" : "")} className="h-4 w-4 accent-diamond"/>
                        Maintained only
                    </label>
                </div>

                {filtered.length > 0 ? (
                    <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((m) => (
                            <li key={m.slug}><ModCard mod={m} stats={stat(m)}/></li>
                        ))}
                    </ul>
                ) : (
                    <div className="card mt-6 flex flex-col items-center px-6 py-16 text-center">
                        <p className="font-display text-2xl font-bold text-white">No mods match those filters</p>
                        <p className="mt-2 text-sm text-muted">Try another Minecraft version or loader.</p>
                        <button type="button" onClick={() => setParams({}, {replace: true, preventScrollReset: true})} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/8 px-4 py-2 text-sm font-medium text-white hover:bg-white/15">
                            <CloseIcon width="16" height="16"/> Clear filters
                        </button>
                    </div>
                )}
                {filtersActive && filtered.length > 0 && (
                    <div className="mt-4 text-center">
                        <button type="button" onClick={() => setParams({}, {replace: true, preventScrollReset: true})} className="text-sm text-muted underline-offset-4 hover:text-white hover:underline">Clear filters</button>
                    </div>
                )}
            </section>

            {/* Matrix teaser */}
            <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
                <Link to="/versions" className="group card relative flex flex-col items-start gap-6 overflow-hidden p-8 transition hover:border-diamond/40 md:flex-row md:items-center md:justify-between">
                    <div className="pixel-grid absolute inset-0 opacity-60"/>
                    <div className="relative">
                        <p className="eyebrow">For modpack makers</p>
                        <h2 className="mt-2 font-display text-3xl font-bold text-white">Which mods run on my version?</h2>
                        <p className="mt-2 max-w-xl text-slate-300">See every mod, Minecraft version and loader in one table, including which versions are still maintained.</p>
                    </div>
                    <span className="relative inline-flex items-center gap-2 font-semibold text-diamond">
                        Open version matrix <ArrowRight width="18" height="18" className="transition group-hover:translate-x-1"/>
                    </span>
                </Link>
            </section>
        </main>
    );
}
