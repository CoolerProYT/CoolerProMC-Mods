import {useEffect, useState} from "react";
import {LOADERS, STATUS, thumbOf} from "../data/mods.js";

export function useTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} · CoolerProMC Mods` : "CoolerProMC Mods — Minecraft mods for Forge, NeoForge & Fabric";
    }, [title]);
}

/** Mod logo. Uses the generated 256px WebP thumbnail, falls back to the original PNG. */
export function ModLogo({mod, size = "thumb", className = "", ...rest}) {
    const [src, setSrc] = useState(size === "thumb" ? thumbOf(mod.logo) : mod.logo);
    return (
        <img
            src={src}
            onError={() => src !== mod.logo && setSrc(mod.logo)}
            alt={`${mod.name} logo`}
            loading="lazy"
            decoding="async"
            className={className}
            {...rest}
        />
    );
}

export function LoaderIcons({loaders, size = "h-5 w-5", className = ""}) {
    return (
        <span className={`inline-flex items-center gap-1.5 ${className}`}>
            {loaders.map((l) => (
                <img key={l} src={LOADERS[l].icon} alt={LOADERS[l].name} title={LOADERS[l].name} className={`${size} object-contain`}/>
            ))}
        </span>
    );
}

export function LoaderChip({loader}) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-slate-200">
            <img src={LOADERS[loader].icon} alt="" className="h-3.5 w-3.5 object-contain"/>
            {LOADERS[loader].name}
        </span>
    );
}

export function StatusDot({status, className = ""}) {
    return <span className={`inline-block h-2 w-2 rounded-[2px] ${className}`} style={{background: STATUS[status].color}} aria-hidden="true"/>;
}

export function StatusLegend({className = ""}) {
    return (
        <ul className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted ${className}`}>
            {Object.entries(STATUS).map(([key, s]) => (
                <li key={key} className="inline-flex items-center gap-2">
                    <StatusDot status={key}/>
                    <span className="font-medium text-slate-200">{s.label}</span>
                    <span className="hidden sm:inline">— {s.hint}</span>
                </li>
            ))}
        </ul>
    );
}

export function Stat({icon, value, label, loading}) {
    return (
        <div className="flex items-center gap-3">
            <span className="hidden h-10 w-10 place-items-center rounded-lg bg-white/5 text-diamond sm:grid">{icon}</span>
            <div>
                <div className={`font-display text-2xl font-bold leading-none text-white ${loading ? "animate-pulse text-white/40" : ""}`}>{value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted">{label}</div>
            </div>
        </div>
    );
}
