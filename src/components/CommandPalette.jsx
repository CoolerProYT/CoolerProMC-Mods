import {useEffect, useMemo, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {displayName, mods} from "../data/mods.js";
import {ArrowRight, SearchIcon, TableIcon, GridIcon} from "./Icons.jsx";
import {ModLogo} from "./ui.jsx";

const pages = [
    {kind: "page", label: "All mods", to: "/#mods", icon: <GridIcon width="18" height="18"/>},
    {kind: "page", label: "Version support matrix", to: "/versions", icon: <TableIcon width="18" height="18"/>},
];

export default function CommandPalette({open, onClose}) {
    const [q, setQ] = useState("");
    const [active, setActive] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const navigate = useNavigate();

    const results = useMemo(() => {
        const needle = q.trim().toLowerCase();
        const modItems = mods
            .filter((m) => !needle || [m.name, m.tagline, ...m.categories].join(" ").toLowerCase().includes(needle))
            .map((m) => ({kind: "mod", label: displayName(m), sub: m.tagline, to: `/${m.slug}`, mod: m}));
        const pageItems = pages.filter((p) => !needle || p.label.toLowerCase().includes(needle));
        return [...modItems, ...pageItems];
    }, [q]);

    useEffect(() => {
        if (!open) return;
        setQ("");
        setActive(0);
        requestAnimationFrame(() => inputRef.current?.focus());
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    useEffect(() => setActive(0), [q]);

    useEffect(() => {
        listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({block: "nearest"});
    }, [active]);

    if (!open) return null;

    const go = (item) => {
        onClose();
        navigate(item.to);
    };

    const onKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => Math.min(i + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter" && results[active]) {
            e.preventDefault();
            go(results[active]);
        } else if (e.key === "Escape") {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink-950/70 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={onClose}>
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Search mods"
                className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/60"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 border-b border-white/8 px-4">
                    <SearchIcon className="shrink-0 text-muted"/>
                    <input
                        ref={inputRef}
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder="Search mods…"
                        className="h-14 w-full bg-transparent text-base text-white placeholder:text-muted focus:outline-none"
                        role="combobox"
                        aria-expanded="true"
                        aria-controls="palette-list"
                        aria-activedescendant={`palette-${active}`}
                    />
                    <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[11px] text-muted sm:block">Esc</kbd>
                </div>
                <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[60vh] overflow-y-auto p-2">
                    {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No mods match “{q}”.</li>}
                    {results.map((item, i) => (
                        <li
                            key={item.to}
                            id={`palette-${i}`}
                            data-index={i}
                            role="option"
                            aria-selected={i === active}
                            onMouseMove={() => setActive(i)}
                            onClick={() => go(item)}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 ${i === active ? "bg-white/8" : ""}`}
                        >
                            {item.mod ? (
                                <ModLogo mod={item.mod} className="h-9 w-9 shrink-0 rounded-md object-cover"/>
                            ) : (
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white/5 text-diamond">{item.icon}</span>
                            )}
                            <div className="min-w-0 flex-1">
                                <div className="truncate text-sm font-medium text-white">{item.label}</div>
                                {item.sub && <div className="truncate text-xs text-muted">{item.sub}</div>}
                            </div>
                            {i === active && <ArrowRight width="16" height="16" className="shrink-0 text-diamond"/>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
