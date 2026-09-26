import {Link} from "react-router-dom";
import {displayName, isMaintained, latestMc, modLoaders} from "../data/mods.js";
import {formatCount} from "../lib/modrinth.js";
import {DownloadIcon} from "./Icons.jsx";
import {LoaderIcons, ModLogo} from "./ui.jsx";

export default function ModCard({mod, stats}) {
    const maintained = isMaintained(mod);
    return (
        <Link
            to={`/${mod.slug}`}
            style={{"--accent": mod.accent}}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-900/70 transition duration-300 hover:-translate-y-1 hover:border-(--accent)/60 hover:shadow-[0_18px_50px_-20px_var(--accent)]"
        >
            <span className="absolute inset-x-0 top-0 h-1 bg-(--accent) opacity-70 transition group-hover:opacity-100"/>
            <div className="flex items-start gap-4 p-5">
                <div className="pixel-corners shrink-0 bg-ink-800 p-1.5">
                    <ModLogo mod={mod} width="72" height="72" className="h-18 w-18 rounded-md object-cover transition duration-300 group-hover:scale-105"/>
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl font-bold leading-tight text-white">{displayName(mod)}</h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                        <span>MC {latestMc(mod)}</span>
                        {mod.badge && <span className="rounded bg-(--accent)/15 px-1.5 py-0.5 font-semibold text-(--accent)">{mod.badge}</span>}
                        {mod.modrinthReview && <span className="rounded bg-white/8 px-1.5 py-0.5 font-medium text-slate-300" title="Available on CurseForge, pending review on Modrinth">New · CurseForge</span>}
                        {!maintained && <span className="rounded bg-red-400/10 px-1.5 py-0.5 font-medium text-red-300">Unmaintained</span>}
                    </div>
                </div>
            </div>
            <p className="line-clamp-2 mb-5 px-5 text-sm leading-relaxed text-slate-300">{mod.tagline}</p>
            <div className="mt-auto flex items-center justify-between border-t border-white/6 px-5 py-3.5">
                <LoaderIcons loaders={modLoaders(mod)} size="h-4.5 w-4.5"/>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-200" title={stats ? `Modrinth ${formatCount(stats.modrinth ?? 0)} · CurseForge ${formatCount(stats.curseforge ?? 0)}` : "Downloads"}>
                    <DownloadIcon width="15" height="15" className="text-(--accent)"/>
                    {stats === undefined ? <span className="inline-block h-3 w-8 animate-pulse rounded bg-white/10"/> : formatCount(stats?.downloads)}
                </span>
            </div>
        </Link>
    );
}
