import {Fragment, useMemo, useState} from "react";
import {Link, useParams} from "react-router-dom";
import NotFound from "./NotFound.jsx";
import ModCard from "../components/ModCard.jsx";
import {compareMc, curseforgeFileFor, displayName, downloadLinks, isMaintained, LOADERS, modBySlug, modLoaders, mods, STATUS} from "../data/mods.js";
import {formatCount, timeAgo, useReleases} from "../lib/modrinth.js";
import {useStats} from "../lib/stats.js";
import {BookIcon, ChevronDown, ChevronRight, ClockIcon, DownloadIcon, ExternalIcon, GitHubIcon, HeartIcon, TagIcon} from "../components/Icons.jsx";
import {LoaderChip, LoaderIcons, ModLogo, StatusDot, StatusLegend, useTitle} from "../components/ui.jsx";

export default function ModPage() {
    const {slug} = useParams();
    const mod = modBySlug(slug);
    if (!mod) return <NotFound/>;
    return <ModDetail key={mod.slug} mod={mod}/>;
}

function ModDetail({mod}) {
    useTitle(displayName(mod));
    const {stats, ready} = useStats();
    const live = stats[mod.slug];
    const loading = !ready;

    const versions = useMemo(() => [...mod.versions].sort((a, b) => compareMc(b.mc, a.mc)), [mod]);
    const [openRow, setOpenRow] = useState(null);
    const related = useMemo(
        () =>
            mods
                .filter((m) => m.slug !== mod.slug)
                .map((m) => ({m, score: m.categories.filter((c) => mod.categories.includes(c)).length + (isMaintained(m) ? 10 : 0)}))
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)
                .map((x) => x.m),
        [mod],
    );

    return (
        <main style={{"--accent": mod.accent}}>
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-white/8">
                {mod.banner ? (
                    <img src={mod.banner} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30"/>
                ) : (
                    <div className="pixel-grid absolute inset-0"/>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/80 to-ink-950"/>
                <div className="absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-(--accent) opacity-20 blur-[120px]"/>

                <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:pb-16">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted">
                        <Link to="/" className="hover:text-white">Mods</Link>
                        <ChevronRight width="14" height="14"/>
                        <span className="text-slate-300">{displayName(mod)}</span>
                    </nav>

                    <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
                        <div className="pixel-corners w-28 shrink-0 bg-(--accent) p-1.5 sm:w-36">
                            <ModLogo mod={mod} size="full" loading="eager" className="aspect-square w-full rounded-lg object-cover"/>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap gap-2">
                                {mod.categories.map((c) => (
                                    <span key={c} className="inline-flex items-center gap-1 rounded-md bg-white/8 px-2 py-0.5 text-xs font-medium text-slate-200">
                                        <TagIcon width="12" height="12" className="text-(--accent)"/> {c}
                                    </span>
                                ))}
                                {mod.badge && <span className="rounded-md bg-(--accent)/20 px-2 py-0.5 text-xs font-semibold text-(--accent)">{mod.badge}</span>}
                                {!isMaintained(mod) && <span className="rounded-md bg-red-400/15 px-2 py-0.5 text-xs font-semibold text-red-300">No longer maintained</span>}
                            </div>
                            <h1 className="mt-3 font-display text-4xl font-extrabold leading-none tracking-tight text-white sm:text-6xl">{mod.name}</h1>
                            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">{mod.tagline}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {modLoaders(mod).map((l) => <LoaderChip key={l} loader={l}/>)}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-wrap gap-3">
                            {mod.links.modrinth && (
                                <a href={mod.links.modrinth} target="_blank" rel="noreferrer" className="pixel-corners inline-flex items-center gap-2 bg-[#1bd96a] px-5 py-3 font-semibold text-ink-950 transition hover:brightness-110">
                                    <img src="/modrinth.png" alt="" className="h-5 w-5"/> Modrinth
                                </a>
                            )}
                            {mod.modrinthReview && (
                                <span className="pixel-corners inline-flex cursor-default items-center gap-2 bg-white/5 px-5 py-3 font-semibold text-muted" title="Submitted to Modrinth and waiting for approval">
                                    <img src="/modrinth.png" alt="" className="h-5 w-5 opacity-50 grayscale"/> Modrinth · in review
                                </span>
                            )}
                            {mod.links.curseforge && (
                                <a href={mod.links.curseforge} target="_blank" rel="noreferrer" className="pixel-corners inline-flex items-center gap-2 bg-[#f16436] px-5 py-3 font-semibold text-white transition hover:brightness-110">
                                    <img src="/cf.png" alt="" className="h-5 w-5"/> CurseForge
                                </a>
                            )}
                            {mod.links.wiki && (
                                <a href={mod.links.wiki} target="_blank" rel="noreferrer" className="pixel-corners inline-flex items-center gap-2 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20">
                                    <BookIcon width="18" height="18"/> Wiki
                                </a>
                            )}
                            {mod.links.github && (
                                <a href={mod.links.github} target="_blank" rel="noreferrer" className="pixel-corners inline-flex items-center gap-2 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20">
                                    <GitHubIcon width="18" height="18"/> Source
                                </a>
                            )}
                        </div>
                        <dl className="flex flex-wrap gap-x-10 gap-y-4">
                            <LiveStat
                                icon={<DownloadIcon width="16" height="16"/>}
                                label="Downloads"
                                value={formatCount(live.downloads)}
                                loading={loading}
                                sub={[live.modrinth != null && `Modrinth ${formatCount(live.modrinth)}`, live.curseforge != null && `CurseForge ${formatCount(live.curseforge)}`].filter(Boolean).join(" · ")}
                            />
                            {live.followers != null && <LiveStat icon={<HeartIcon width="16" height="16"/>} label="Followers" value={formatCount(live.followers)} loading={loading}/>}
                            {live.updated && <LiveStat icon={<ClockIcon width="16" height="16"/>} label="Updated" value={timeAgo(live.updated)} loading={loading}/>}
                        </dl>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Features */}
                {mod.features.length > 0 && (
                    <section className="pt-16">
                        <p className="eyebrow !text-(--accent)">What it does</p>
                        <h2 className="section-title mt-2">Features</h2>
                        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {mod.features.map((f) => (
                                <li key={f.title} className="card overflow-hidden">
                                    {f.img ? (
                                        <div className="pixel-grid grid h-44 place-items-center bg-ink-850 p-6">
                                            <img src={f.img} alt="" loading="lazy" className="max-h-full w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"/>
                                        </div>
                                    ) : (
                                        <div className="h-1 bg-(--accent) opacity-70"/>
                                    )}
                                    <div className="p-5">
                                        <h3 className="font-display text-xl font-bold text-white">{f.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-300">{f.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Versions + releases */}
                <div className="grid gap-10 pt-16 lg:grid-cols-[1fr_1.1fr]">
                    <section>
                        <p className="eyebrow !text-(--accent)">Compatibility</p>
                        <h2 className="section-title mt-2">Minecraft versions</h2>
                        <StatusLegend className="mt-4"/>
                        {mod.versionNote && (
                            <p className="mt-4 rounded-lg border border-(--accent)/30 bg-(--accent)/10 px-4 py-3 text-sm text-slate-200">{mod.versionNote}</p>
                        )}
                        <div className="card mt-6 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="border-b border-white/8 bg-white/3 text-left text-xs uppercase tracking-wider text-muted">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 font-semibold">Version</th>
                                        <th scope="col" className="px-4 py-3 font-semibold">Loaders</th>
                                        <th scope="col" className="px-4 py-3 text-right font-semibold">Status</th>
                                        <th scope="col" className="w-0 px-3 py-3"><span className="sr-only">Download</span></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/6">
                                    {versions.map((x) => (
                                        <VersionRow key={x.mc} mod={mod} row={x} open={openRow === x.mc} onToggle={() => setOpenRow(openRow === x.mc ? null : x.mc)}/>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {mod.modrinth ? <Releases mod={mod}/> : <CurseForgeReleases mod={mod}/>}
                </div>

                {/* Related */}
                <section className="pt-20">
                    <h2 className="section-title">More mods</h2>
                    <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((m) => (
                            <li key={m.slug}><ModCard mod={m} stats={ready ? stats[m.slug] : undefined}/></li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
}

function VersionRow({mod, row: x, open, onToggle}) {
    const links = useMemo(() => downloadLinks(mod, x), [mod, x]);
    const hasLinks = links.modrinth.length > 0 || links.curseforge.length > 0;
    const eol = x.status === "eol";
    return (
        <Fragment>
            <tr className={eol ? "text-muted" : ""}>
                <th scope="row" className="px-4 py-3 text-left font-display text-lg font-bold text-white">
                    <span className={eol ? "text-slate-400" : ""}>{x.mc}</span>
                </th>
                <td className="px-4 py-3">
                    <LoaderIcons loaders={x.loaders} size="h-5 w-5" className={eol ? "opacity-50 grayscale" : ""}/>
                    <span className="sr-only">{x.loaders.map((l) => LOADERS[l].name).join(", ")}</span>
                </td>
                <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-2 text-xs font-medium" style={{color: STATUS[x.status].color}}>
                        <StatusDot status={x.status}/> <span className="hidden sm:inline">{STATUS[x.status].label}</span>
                    </span>
                </td>
                <td className="px-3 py-2 text-right">
                    {hasLinks && (
                        <button
                            type="button"
                            onClick={onToggle}
                            aria-expanded={open}
                            aria-label={`Download for Minecraft ${x.mc}`}
                            className={`inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs font-semibold transition ${open ? "bg-(--accent) text-ink-950" : "bg-white/6 text-slate-200 hover:bg-white/12"}`}
                        >
                            <DownloadIcon width="14" height="14"/>
                            <span className="hidden sm:inline">Download</span>
                            <ChevronDown width="14" height="14" className={`transition ${open ? "rotate-180" : ""}`}/>
                        </button>
                    )}
                </td>
            </tr>
            {open && (
                <tr className="bg-white/3">
                    <td colSpan={4} className="px-3 pb-4 pt-2 sm:px-4">
                        <ul className="space-y-2">
                            {x.loaders.map((loader) => {
                                const mr = links.modrinth.find((l) => l.loader === loader);
                                const cf = links.curseforge.find((l) => l.loader === loader);
                                if (!mr && !cf) return null;
                                return (
                                    <li key={loader} className="flex flex-wrap items-center gap-2">
                                        <span className="inline-flex w-[5.5rem] items-center gap-1.5 text-sm font-medium text-slate-200 sm:w-28 sm:gap-2">
                                            <img src={LOADERS[loader].icon} alt="" className="h-4 w-4 object-contain"/> {LOADERS[loader].name}
                                        </span>
                                        {mr && (
                                            <a href={mr.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-[#1bd96a] px-2.5 py-1.5 text-xs font-semibold text-ink-950 transition hover:brightness-110">
                                                <img src="/modrinth.png" alt="" className="h-3.5 w-3.5"/> Modrinth
                                            </a>
                                        )}
                                        {cf && (
                                            <a href={cf.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-[#f16436] px-2.5 py-1.5 text-xs font-semibold text-white transition hover:brightness-110">
                                                <img src="/cf.png" alt="" className="h-3.5 w-3.5"/> CurseForge
                                            </a>
                                        )}
                                        {(mr ?? cf).mc !== x.mc && !x.mc.includes("-") && <span className="text-xs text-muted">({(mr ?? cf).mc})</span>}
                                    </li>
                                );
                            })}
                        </ul>
                    </td>
                </tr>
            )}
        </Fragment>
    );
}

function LiveStat({icon, label, value, loading, sub}) {
    return (
        <div>
            <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted">
                <span className="text-(--accent)">{icon}</span> {label}
            </dt>
            <dd className={`mt-1 font-display text-2xl font-bold text-white sm:text-3xl ${loading ? "animate-pulse text-white/30" : ""}`}>{loading ? "···" : value}</dd>
            {sub && !loading && <dd className="mt-0.5 text-xs text-muted">{sub}</dd>}
        </div>
    );
}

function CurseForgeReleases({mod}) {
    return (
        <section>
            <p className="eyebrow !text-(--accent)">Downloads</p>
            <h2 className="section-title mt-2">Get the mod</h2>
            <div className="card mt-6 p-6">
                <p className="text-slate-300">
                    {mod.name} is out now on CurseForge. The Modrinth release has been submitted and is waiting for review, so
                    changelogs will show up here once it's approved.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                    <a href={`${mod.links.curseforge}/files/all`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#f16436] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110">
                        <DownloadIcon width="16" height="16"/> All files on CurseForge
                    </a>
                    {mod.links.wiki && (
                        <a href={mod.links.wiki} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15">
                            <BookIcon width="16" height="16"/> Read the wiki
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}

function Releases({mod}) {
    const {data, error, loading} = useReleases(mod.modrinth);
    const [open, setOpen] = useState(0);

    return (
        <section>
            <p className="eyebrow !text-(--accent)">Changelog</p>
            <div className="mt-2 flex items-end justify-between gap-4">
                <h2 className="section-title">Latest releases</h2>
                <a href={`${mod.links.modrinth}/versions`} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 text-sm text-muted hover:text-white">
                    All versions <ExternalIcon width="14" height="14"/>
                </a>
            </div>
            <p className="mt-4 text-sm text-muted">Pulled live from Modrinth.</p>

            <div className="mt-6 space-y-3">
                {loading && [0, 1, 2].map((i) => <div key={i} className="card h-[74px] animate-pulse"/>)}
                {error && (
                    <div className="card p-6 text-sm text-muted">
                        Couldn't reach Modrinth right now.{" "}
                        <a href={`${mod.links.modrinth}/versions`} target="_blank" rel="noreferrer" className="text-diamond hover:underline">View releases on Modrinth</a>.
                    </div>
                )}
                {data?.map((r, i) => {
                    const expanded = open === i;
                    return (
                        <article key={r.id} className={`card overflow-hidden transition ${expanded ? "border-(--accent)/40" : ""}`}>
                            <button type="button" onClick={() => setOpen(expanded ? -1 : i)} aria-expanded={expanded} className="flex w-full items-center gap-4 px-4 py-3.5 text-left">
                                <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${r.type === "release" ? "bg-emerald-400/15 text-emerald-300" : r.type === "beta" ? "bg-amber-400/15 text-amber-300" : "bg-red-400/15 text-red-300"}`}>
                                    {r.type === "release" ? "R" : r.type === "beta" ? "B" : "A"}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <div className="truncate font-semibold text-white">v{r.number}</div>
                                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-muted">
                                        <span>MC {r.gameVersions.slice(0, 3).join(", ")}{r.gameVersions.length > 3 ? "…" : ""}</span>
                                        <span>{timeAgo(r.date)}</span>
                                    </div>
                                </div>
                                <LoaderIcons loaders={r.loaders.filter((l) => LOADERS[l])} size="h-4 w-4" className="hidden sm:inline-flex"/>
                                <ChevronDown width="18" height="18" className={`shrink-0 text-muted transition ${expanded ? "rotate-180" : ""}`}/>
                            </button>
                            {expanded && (
                                <div className="border-t border-white/6 px-4 pb-4 pt-3">
                                    <Changelog text={r.changelog}/>
                                    <ReleaseDownloads mod={mod} release={r}/>
                                </div>
                            )}
                        </article>
                    );
                })}
                {data && data.length === 0 && <div className="card p-6 text-sm text-muted">No releases found.</div>}
            </div>
        </section>
    );
}

function ReleaseDownloads({mod, release: r}) {
    const loaders = r.loaders.filter((l) => LOADERS[l] && r.ids[l]);
    const cfLinks = loaders.map((l) => curseforgeFileFor(mod, l, r.ids[l]));
    return (
        <div className="mt-4 space-y-2">
            {loaders.map((loader, i) => (
                <div key={loader} className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex w-[5.5rem] items-center gap-1.5 text-sm font-medium text-slate-200 sm:w-28 sm:gap-2">
                        <img src={LOADERS[loader].icon} alt="" className="h-4 w-4 object-contain"/> {LOADERS[loader].name}
                    </span>
                    <a href={`${mod.links.modrinth}/version/${r.ids[loader]}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-[#1bd96a] px-2.5 py-1.5 text-xs font-semibold text-ink-950 transition hover:brightness-110">
                        <img src="/modrinth.png" alt="" className="h-3.5 w-3.5"/> Modrinth
                    </a>
                    {cfLinks[i] && (
                        <a href={cfLinks[i]} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-[#f16436] px-2.5 py-1.5 text-xs font-semibold text-white transition hover:brightness-110">
                            <img src="/cf.png" alt="" className="h-3.5 w-3.5"/> CurseForge
                        </a>
                    )}
                </div>
            ))}
            {mod.links.curseforge && cfLinks.some((x) => !x) && (
                <a href={`${mod.links.curseforge}/files/all`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-muted hover:text-white">
                    Older files on CurseForge <ExternalIcon width="12" height="12"/>
                </a>
            )}
        </div>
    );
}

// Tiny, safe markdown-ish renderer for changelogs: headings, bullets, `code`, **bold**.
function Inline({text}) {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((p, i) =>
        p.startsWith("`") && p.endsWith("`") ? (
            <code key={i} className="rounded bg-white/8 px-1 py-0.5 text-[0.85em] text-slate-100">{p.slice(1, -1)}</code>
        ) : p.startsWith("**") && p.endsWith("**") ? (
            <strong key={i} className="text-white">{p.slice(2, -2)}</strong>
        ) : (
            p
        ),
    );
}

function Changelog({text}) {
    const lines = text.split(/\r?\n/).map((l) => l.trimEnd()).filter(Boolean);
    if (!lines.length) return <p className="text-sm text-muted">No changelog provided.</p>;
    return (
        <div className="max-h-72 space-y-1.5 overflow-y-auto pr-2 text-sm leading-relaxed text-slate-300">
            {lines.map((l, i) => {
                const h = l.match(/^#{1,6}\s+(.*)/);
                if (h) return <p key={i} className="pt-1 font-semibold text-white"><Inline text={h[1]}/></p>;
                const b = l.match(/^(\s*)[-*]\s+(.*)/);
                if (b)
                    return (
                        <p key={i} className="flex gap-2" style={{paddingLeft: `${Math.min(b[1].length, 8) * 0.5}rem`}}>
                            <span className="mt-2 h-1 w-1 shrink-0 bg-(--accent)"/>
                            <span><Inline text={b[2]}/></span>
                        </p>
                    );
                return <p key={i}><Inline text={l}/></p>;
            })}
        </div>
    );
}
