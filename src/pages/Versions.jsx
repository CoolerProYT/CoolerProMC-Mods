import {useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {allMcVersions, displayName, LOADERS, mods, STATUS} from "../data/mods.js";
import {ModLogo, StatusLegend, useTitle} from "../components/ui.jsx";

const LOADER_SHORT = {forge: "Fo", neoforge: "Neo", fabric: "Fab"};

export default function Versions() {
    useTitle("Version support");
    const [loader, setLoader] = useState("");
    const [showEol, setShowEol] = useState(true);

    const columns = useMemo(() => {
        return allMcVersions.filter((v) =>
            mods.some((m) => m.versions.some((x) => x.mc === v && (!loader || x.loaders.includes(loader)) && (showEol || x.status !== "eol"))),
        );
    }, [loader, showEol]);

    return (
        <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
            <p className="eyebrow">Compatibility</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Version support</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
                Every mod and every Minecraft version, side by side. Useful when you're building a modpack for a specific version.
            </p>

            <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <StatusLegend/>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex gap-1 rounded-lg border border-white/8 bg-ink-900/70 p-1" role="group" aria-label="Filter by loader">
                        {[["", "All loaders"], ...Object.entries(LOADERS).map(([k, l]) => [k, l.name])].map(([key, label]) => (
                            <button
                                key={key || "all"}
                                type="button"
                                onClick={() => setLoader(key)}
                                aria-pressed={loader === key}
                                className={`inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition ${loader === key ? "bg-white/10 text-white" : "text-muted hover:text-white"}`}
                            >
                                {key && <img src={LOADERS[key].icon} alt="" className="h-4 w-4 object-contain"/>}
                                {label}
                            </button>
                        ))}
                    </div>
                    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                        <input type="checkbox" checked={showEol} onChange={(e) => setShowEol(e.target.checked)} className="h-4 w-4 accent-diamond"/>
                        Show unsupported
                    </label>
                </div>
            </div>

            <div className="card mt-6 overflow-x-auto">
                <table className="w-full border-separate border-spacing-0 text-sm">
                    <thead>
                        <tr>
                            <th scope="col" className="sticky left-0 z-10 border-b border-r border-white/8 bg-ink-900 px-3 py-3 text-left shadow-[6px_0_12px_-6px_rgba(0,0,0,0.6)] sm:px-4 text-xs font-semibold uppercase tracking-wider text-muted">Mod</th>
                            {columns.map((v) => (
                                <th key={v} scope="col" className="whitespace-nowrap border-b border-white/8 px-2 py-3 text-center font-display text-base font-bold text-white">
                                    {v}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {mods.map((m) => (
                            <tr key={m.slug} className="group">
                                <th scope="row" className="sticky left-0 z-10 w-36 min-w-36 border-b border-r border-b-white/6 border-r-white/8 bg-ink-900 px-3 py-2.5 text-left shadow-[6px_0_12px_-6px_rgba(0,0,0,0.6)] group-hover:bg-ink-850 sm:w-auto sm:min-w-0 sm:px-4">
                                    <Link to={`/${m.slug}`} className="flex items-center gap-2 text-sm font-medium leading-tight text-slate-200 hover:text-diamond sm:gap-2.5 sm:whitespace-nowrap sm:text-base">
                                        <ModLogo mod={m} className="h-6 w-6 shrink-0 rounded object-cover sm:h-7 sm:w-7"/>
                                        <span className="min-w-0 break-words">{displayName(m)}</span>
                                    </Link>
                                </th>
                                {columns.map((v) => {
                                    const x = m.versions.find((y) => y.mc === v);
                                    const visible = x && (!loader || x.loaders.includes(loader)) && (showEol || x.status !== "eol");
                                    return (
                                        <td key={v} className="border-b border-white/6 px-1.5 py-2 text-center group-hover:bg-white/2">
                                            {visible ? (
                                                <span
                                                    className="inline-flex min-w-16 flex-col items-center rounded-md px-1.5 py-1"
                                                    style={{background: `${STATUS[x.status].color}1f`, boxShadow: `inset 0 0 0 1px ${STATUS[x.status].color}40`}}
                                                    title={`${displayName(m)} ${v}: ${x.loaders.map((l) => LOADERS[l].name).join(", ")} — ${STATUS[x.status].label}`}
                                                >
                                                    <span className="whitespace-nowrap text-[11px] font-semibold leading-tight" style={{color: STATUS[x.status].color}}>
                                                        {x.loaders.map((l) => LOADER_SHORT[l]).join(" · ")}
                                                    </span>
                                                </span>
                                            ) : (
                                                <span className="text-white/15" aria-label="Not available">—</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-3 text-xs text-muted">Fo = Forge · Neo = NeoForge · Fab = Fabric. Scroll sideways to see older versions.</p>
        </main>
    );
}
